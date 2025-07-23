import { useState, useEffect } from 'react';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';

// Get auth token from localStorage
const getAuthToken = () => {
  return localStorage.getItem('token');
};

// Create authenticated fetch function
const authenticatedFetch = async (url, options = {}) => {
  const token = getAuthToken();
  
  console.log('Making authenticated request to:', `${API_BASE_URL}${url}`);
  
  const config = {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
  };

  const response = await fetch(`${API_BASE_URL}${url}`, config);
  
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    console.error('API request failed:', response.status, errorData);
    throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
  }
  
  return response.json();
};

// Custom hook for fetching health metrics
export const useHealthMetrics = (metricType = null, timeRange = '7d') => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        setLoading(true);
        setError(null);
        
        console.log('Fetching health metrics...');
        
        const params = new URLSearchParams();
        if (metricType) params.append('metric_type', metricType);
        params.append('limit', '50');
        
        const response = await authenticatedFetch(`/health/metrics?${params}`);
        console.log('Health metrics response:', response);
        setData(response.data || []);
      } catch (err) {
        console.error('Error fetching health metrics:', err);
        setError(err.message);
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMetrics();
  }, [metricType, timeRange]);

  const addMetric = async (metricData) => {
    try {
      const response = await authenticatedFetch('/health/metrics', {
        method: 'POST',
        body: JSON.stringify(metricData),
      });
      
      // Refresh data after adding
      setData(prev => [response.data, ...prev]);
      return response.data;
    } catch (err) {
      console.error('Error adding health metric:', err);
      throw err;
    }
  };

  return { data, loading, error, addMetric };
};

// Custom hook for fetching activities
export const useActivities = (limit = 20) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await authenticatedFetch(`/health/activities?limit=${limit}`);
        setData(response.data || []);
      } catch (err) {
        console.error('Error fetching activities:', err);
        setError(err.message);
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, [limit]);

  const addActivity = async (activityData) => {
    try {
      const response = await authenticatedFetch('/health/activities', {
        method: 'POST',
        body: JSON.stringify(activityData),
      });
      
      // Refresh data after adding
      setData(prev => [response.data, ...prev]);
      return response.data;
    } catch (err) {
      console.error('Error adding activity:', err);
      throw err;
    }
  };

  return { data, loading, error, addActivity };
};

// Custom hook for fetching sleep data
export const useSleepData = (limit = 30) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSleepData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await authenticatedFetch(`/health/sleep?limit=${limit}`);
        setData(response.data || []);
      } catch (err) {
        console.error('Error fetching sleep data:', err);
        setError(err.message);
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSleepData();
  }, [limit]);

  const addSleepSession = async (sleepData) => {
    try {
      const response = await authenticatedFetch('/health/sleep', {
        method: 'POST',
        body: JSON.stringify(sleepData),
      });
      
      // Refresh data after adding
      setData(prev => [response.data, ...prev]);
      return response.data;
    } catch (err) {
      console.error('Error adding sleep session:', err);
      throw err;
    }
  };

  return { data, loading, error, addSleepSession };
};

// Custom hook for fetching nutrition data
export const useNutritionData = (date = null, limit = 100) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNutritionData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const params = new URLSearchParams();
        params.append('limit', limit.toString());
        if (date) params.append('date', date);
        
        const response = await authenticatedFetch(`/health/nutrition?${params}`);
        setData(response.data || []);
      } catch (err) {
        console.error('Error fetching nutrition data:', err);
        setError(err.message);
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchNutritionData();
  }, [date, limit]);

  const addNutritionEntry = async (nutritionData) => {
    try {
      const response = await authenticatedFetch('/health/nutrition', {
        method: 'POST',
        body: JSON.stringify(nutritionData),
      });
      
      // Refresh data after adding
      setData(prev => [response.data, ...prev]);
      return response.data;
    } catch (err) {
      console.error('Error adding nutrition entry:', err);
      throw err;
    }
  };

  return { data, loading, error, addNutritionEntry };
};

// Custom hook for fetching water intake
export const useWaterIntake = (date = null) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWaterIntake = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const params = new URLSearchParams();
        if (date) params.append('date', date);
        
        const response = await authenticatedFetch(`/health/water?${params}`);
        setData(response.data || []);
      } catch (err) {
        console.error('Error fetching water intake:', err);
        setError(err.message);
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchWaterIntake();
  }, [date]);

  const addWaterIntake = async (waterData) => {
    try {
      const response = await authenticatedFetch('/health/water', {
        method: 'POST',
        body: JSON.stringify(waterData),
      });
      
      // Refresh data after adding
      setData(prev => [response.data, ...prev]);
      return response.data;
    } catch (err) {
      console.error('Error adding water intake:', err);
      throw err;
    }
  };

  return { data, loading, error, addWaterIntake };
};

// Custom hook for fetching goals
export const useGoals = (status = null, category = null) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGoals = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const params = new URLSearchParams();
        if (status) params.append('status', status);
        if (category) params.append('category', category);
        
        const response = await authenticatedFetch(`/health/goals?${params}`);
        setData(response.data || []);
      } catch (err) {
        console.error('Error fetching goals:', err);
        setError(err.message);
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchGoals();
  }, [status, category]);

  const addGoal = async (goalData) => {
    try {
      const response = await authenticatedFetch('/health/goals', {
        method: 'POST',
        body: JSON.stringify(goalData),
      });
      
      // Refresh data after adding
      setData(prev => [response.data, ...prev]);
      return response.data;
    } catch (err) {
      console.error('Error adding goal:', err);
      throw err;
    }
  };

  const updateGoalProgress = async (goalId, currentValue) => {
    try {
      const response = await authenticatedFetch(`/health/goals/${goalId}/progress`, {
        method: 'PATCH',
        body: JSON.stringify({ current_value: currentValue }),
      });
      
      // Update the goal in the data array
      setData(prev => prev.map(goal => 
        goal.id === goalId ? response.data : goal
      ));
      
      return response.data;
    } catch (err) {
      console.error('Error updating goal progress:', err);
      throw err;
    }
  };

  return { data, loading, error, addGoal, updateGoalProgress };
};

// Custom hook for fetching user dashboard data
export const useDashboard = (userId) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboard = async () => {
      if (!userId) return;
      
      try {
        setLoading(true);
        setError(null);
        
        const response = await authenticatedFetch(`/users/${userId}/dashboard`);
        setData(response.data);
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
        setError(err.message);
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, [userId]);

  return { data, loading, error, refetch: () => fetchDashboard() };
};

// Custom hook for fetching user profile
export const useUserProfile = (userId) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!userId) return;
      
      try {
        setLoading(true);
        setError(null);
        
        const response = await authenticatedFetch(`/users/${userId}`);
        setData(response.data);
      } catch (err) {
        console.error('Error fetching user profile:', err);
        setError(err.message);
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [userId]);

  const updateProfile = async (profileData) => {
    try {
      const response = await authenticatedFetch(`/users/${userId}`, {
        method: 'PATCH',
        body: JSON.stringify(profileData),
      });
      
      setData(response.data);
      return response.data;
    } catch (err) {
      console.error('Error updating user profile:', err);
      throw err;
    }
  };

  return { data, loading, error, updateProfile };
};