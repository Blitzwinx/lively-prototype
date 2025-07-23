const { supabase, supabaseAdmin } = require('../config/supabase');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
  try {
    const { email, password, name, sex, height_cm, weight_kg, date_of_birth } = req.body;

    console.log('Registration attempt for:', email);

    // Register user with Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: undefined // Disable email confirmation for development
      }
    });

    if (authError) {
      console.error('Supabase auth error:', authError);
      return res.status(400).json({ 
        success: false, 
        message: authError.message 
      });
    }

    if (!authData.user) {
      console.error('No user returned from Supabase');
      return res.status(400).json({ 
        success: false, 
        message: 'Failed to create user' 
      });
    }

    console.log('User created in Supabase:', authData.user.id);

    // Create user profile in users table
    const { data: userData, error: userError } = await supabaseAdmin
      .from('users')
      .insert([{
        id: authData.user.id,
        email,
        name,
        sex,
        height_cm: height_cm ? parseInt(height_cm) : null,
        weight_kg: weight_kg ? parseFloat(weight_kg) : null,
        date_of_birth: date_of_birth || null
      }])
      .select()
      .single();

    if (userError) {
      console.error('Error creating user profile:', userError);
      return res.status(500).json({ 
        success: false, 
        message: 'Failed to create user profile' 
      });
    }

    console.log('User profile created:', userData.id);

    // Generate JWT token
    const token = jwt.sign(
      { 
        userId: authData.user.id, 
        email: authData.user.email 
      },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    console.log('Registration successful for:', email);

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      token,
      user: {
        id: userData.id,
        email: userData.email,
        name: userData.name,
        sex: userData.sex,
        height_cm: userData.height_cm,
        weight_kg: userData.weight_kg,
        date_of_birth: userData.date_of_birth,
        picture_url: userData.picture_url
      }
    });

  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Internal server error' 
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log('Login attempt for:', email);

    // Authenticate with Supabase
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError) {
      console.error('Supabase login error:', authError);
      return res.status(401).json({ 
        success: false, 
        message: authError.message || 'Invalid credentials' 
      });
    }

    if (!authData.user) {
      console.error('No user returned from login');
      return res.status(401).json({ 
        success: false, 
        message: 'Authentication failed' 
      });
    }

    console.log('Supabase login successful for:', authData.user.id);

    // Get user profile
    const { data: userData, error: userError } = await supabaseAdmin
      .from('users')
      .select('*')
      .eq('id', authData.user.id)
      .single();

    if (userError) {
      console.error('Error fetching user profile:', userError);
      return res.status(500).json({ 
        success: false, 
        message: 'Failed to fetch user profile' 
      });
    }

    console.log('User profile fetched:', userData.id);

    // Generate JWT token
    const token = jwt.sign(
      { 
        userId: authData.user.id, 
        email: authData.user.email 
      },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    console.log('Login successful for:', email);

    res.json({
      success: true,
      message: 'Login successful',
      token,
      user: {
        id: userData.id,
        email: userData.email,
        name: userData.name,
        sex: userData.sex,
        height_cm: userData.height_cm,
        weight_kg: userData.weight_kg,
        date_of_birth: userData.date_of_birth,
        picture_url: userData.picture_url
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Internal server error' 
    });
  }
};

module.exports = {
  register,
  login
};