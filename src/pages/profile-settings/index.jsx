import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Icon from "../../components/AppIcon";
import Image from "../../components/AppImage";
import ProfileHeader from "./components/ProfileHeader";
import SettingsSection from "./components/SettingsSection";
import ConnectedDevices from "./components/ConnectedDevices";
import MedicalInformation from "./components/MedicalInformation";
import { useUser } from "UserContext";

const ProfileSettings = ({ setUser }) => {
  const { user } = useUser();
  const navigate = useNavigate();
  const userId = user?.id;

  const [userData, setUserData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    avatar: user?.picture_url || "https://cdn.rafled.com/anime-icons/images/u05vyKyGsL73WKPM1iFIkoW7tQ05Ghk8.jpg",
    dateOfBirth: user?.date_of_birth || "",
    gender: user?.sex || "",
    height: user?.height_cm ? `${user.height_cm} cm` : "",
    weight: user?.weight_kg ? `${user.weight_kg} kg` : "",
    bloodType: user?.blood_type || "",
    emergencyContact: {
      name: user?.emergency_contact_name || "",
      relationship: user?.emergency_contact_relationship || "",
      phone: user?.emergency_contact_phone || ""
    },
    healthMetrics: {
      bmi: "22.4",
      restingHeartRate: "68",
      averageSteps: 8243
    }
  });

  const [devices, setDevices] = useState([]);
  const [medicalInfo, setMedicalInfo] = useState({
    conditions: [],
    medications: [],
    allergies: []
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!userId) {
        setLoading(false);
        return;
      }

      try {
        // Fetch user profile
        const userResponse = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:4000/api'}/users/${userId}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
          },
        });

        if (userResponse.ok) {
          const userData = await userResponse.json();
          const user = userData.data || userData;
          
          setUserData(prev => ({
            ...prev,
            name: user.name || prev.name,
            email: user.email || prev.email,
            avatar: user.picture_url || prev.avatar,
            dateOfBirth: user.date_of_birth || prev.dateOfBirth,
            gender: user.sex || prev.gender,
            height: user.height_cm ? `${user.height_cm} cm` : prev.height,
            weight: user.weight_kg ? `${user.weight_kg} kg` : prev.weight,
            bloodType: user.blood_type || prev.bloodType,
            emergencyContact: {
              name: user.emergency_contact_name || prev.emergencyContact.name,
              relationship: user.emergency_contact_relationship || prev.emergencyContact.relationship,
              phone: user.emergency_contact_phone || prev.emergencyContact.phone
            }
          }));
        }

        // Set default devices if none exist
        setDevices([
          {
            id: 1,
            name: "Apple Watch Series 8",
            type: "Smartwatch",
            icon: "Watch",
            status: "Connected",
            batteryLevel: 85,
            lastSync: "2 minutes ago"
          },
          {
            id: 2,
            name: "Fitbit Charge 5",
            type: "Fitness Tracker",
            icon: "Activity",
            status: "Connected",
            batteryLevel: 42,
            lastSync: "1 hour ago"
          },
          {
            id: 3,
            name: "Smart Scale Pro",
            type: "Scale",
            icon: "Scale",
            status: "Disconnected",
            batteryLevel: null,
            lastSync: "3 days ago"
          }
        ]);

        // Set default medical info if none exists
        setMedicalInfo({
          conditions: [
            {
              id: 1,
              name: "Hypertension",
              since: "2020",
              severity: "Mild"
            }
          ],
          medications: [
            {
              id: 1,
              name: "Lisinopril",
              dosage: "10mg",
              frequency: "Once daily",
              purpose: "Blood pressure"
            },
            {
              id: 2,
              name: "Vitamin D3",
              dosage: "2000 IU",
              frequency: "Once daily",
              purpose: "Bone health"
            }
          ],
          allergies: [
            {
              id: 1,
              name: "Peanuts",
              reaction: "Hives, swelling",
              severity: "Moderate"
            },
            {
              id: 2,
              name: "Pollen",
              reaction: "Sneezing, runny nose",
              severity: "Mild"
            }
          ]
        });

      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);
    navigate('/login');
  };

  const accountSettings = [
    {
      id: 1,
      title: "Personal Information",
      description: "Update your name, email, and basic details",
      icon: "User",
      action: "Edit"
    },
    {
      id: 2,
      title: "Health Profile",
      description: "Manage your health information and metrics",
      icon: "Heart",
      action: "Update"
    },
    {
      id: 3,
      title: "Privacy & Security",
      description: "Control your data sharing and account security",
      icon: "Shield",
      action: "Manage"
    },
    {
      id: 4,
      title: "Change Password",
      description: "Update your account password",
      icon: "Lock",
      action: "Change"
    }
  ];

  const appSettings = [
    {
      id: 1,
      title: "Notifications",
      description: "Manage push notifications and reminders",
      icon: "Bell",
      action: "Configure"
    },
    {
      id: 2,
      title: "Units & Preferences",
      description: "Set your preferred units and display options",
      icon: "Settings",
      action: "Customize"
    },
    {
      id: 3,
      title: "Data Export",
      description: "Download your health data",
      icon: "Download",
      action: "Export"
    },
    {
      id: 4,
      title: "Sync Settings",
      description: "Manage device synchronization",
      icon: "RefreshCw",
      action: "Configure"
    }
  ];

  const supportSettings = [
    {
      id: 1,
      title: "Help Center",
      description: "Find answers to common questions",
      icon: "HelpCircle",
      action: "Visit"
    },
    {
      id: 2,
      title: "Contact Support",
      description: "Get help from our support team",
      icon: "MessageCircle",
      action: "Contact"
    },
    {
      id: 3,
      title: "Privacy Policy",
      description: "Review our privacy policy",
      icon: "FileText",
      action: "Read"
    },
    {
      id: 4,
      title: "Terms of Service",
      description: "Review terms and conditions",
      icon: "FileText",
      action: "Read"
    }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-card sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <Link to="/home-screen" className="mr-3">
              <Icon name="ChevronLeft" size={24} color="var(--color-gray-700)" />
            </Link>
            <h2 className="heading-1 text-gray-900">Profile & Settings</h2>
          </div>
          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
              <Icon name="Bell" size={20} color="var(--color-gray-700)" />
            </button>
            <button 
              onClick={handleLogout}
              className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              <Icon name="LogOut" size={20} color="var(--color-gray-700)" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        {/* Profile Header */}
        <section className="mb-8">
          <ProfileHeader userData={userData} />
        </section>

        {/* Connected Devices */}
        <section className="mb-8">
          <ConnectedDevices devices={devices} />
        </section>

        {/* Medical Information */}
        <section className="mb-8">
          <MedicalInformation medicalInfo={medicalInfo} />
        </section>

        {/* Account Settings */}
        <section className="mb-8">
          <SettingsSection 
            title="Account Settings" 
            icon="User" 
            items={accountSettings} 
          />
        </section>

        {/* App Settings */}
        <section className="mb-8">
          <SettingsSection 
            title="App Settings" 
            icon="Settings" 
            items={appSettings} 
          />
        </section>

        {/* Support & Legal */}
        <section className="mb-8">
          <SettingsSection 
            title="Support & Legal" 
            icon="HelpCircle" 
            items={supportSettings} 
          />
        </section>

        {/* Danger Zone */}
        <section className="mb-8">
          <div className="bg-white rounded-card shadow-card p-6">
            <div className="flex items-center mb-4">
              <div className="bg-error bg-opacity-10 p-2 rounded-full mr-3">
                <Icon name="AlertTriangle" size={20} color="var(--color-error)" />
              </div>
              <h2 className="heading-1 text-gray-900">Danger Zone</h2>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border border-error border-opacity-20 rounded-card">
                <div>
                  <h3 className="heading-2 text-gray-900">Delete Account</h3>
                  <p className="body-small text-gray-500">Permanently delete your account and all data</p>
                </div>
                <button className="button-text bg-error text-white px-4 py-2 rounded-button hover:bg-red-600 transition-colors">
                  Delete Account
                </button>
              </div>
              
              <div className="flex items-center justify-between p-4 border border-warning border-opacity-20 rounded-card">
                <div>
                  <h3 className="heading-2 text-gray-900">Sign Out</h3>
                  <p className="body-small text-gray-500">Sign out of your account on this device</p>
                </div>
                <button 
                  onClick={handleLogout}
                  className="button-text bg-warning text-white px-4 py-2 rounded-button hover:bg-yellow-600 transition-colors"
                >
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white shadow-elevated px-4 py-3 flex justify-around items-center">
        <Link to="/home-screen" className="flex flex-col items-center">
          <Icon name="Home" size={24} color="var(--color-gray-500)" />
          <span className="label text-gray-500 mt-1">Home</span>
        </Link>
        <Link to="/activity-tracking" className="flex flex-col items-center">
          <Icon name="Activity" size={24} color="var(--color-gray-500)" />
          <span className="label text-gray-500 mt-1">Activity</span>
        </Link>
        <Link to="/nutrition-tracker" className="flex flex-col items-center">
          <Icon name="Apple" size={24} color="var(--color-gray-500)" />
          <span className="label text-gray-500 mt-1">Nutrition</span>
        </Link>
        <Link to="/sleep-analysis" className="flex flex-col items-center">
          <Icon name="Moon" size={24} color="var(--color-gray-500)" />
          <span className="label text-gray-500 mt-1">Sleep</span>
        </Link>
        <Link to="/profile-settings" className="flex flex-col items-center">
          <Icon name="User" size={24} color="var(--color-primary)" />
          <span className="label text-primary-500 mt-1">Profile</span>
        </Link>
      </nav>

      {/* Padding to account for fixed bottom nav */}
      <div className="h-20"></div>
    </div>
  );
};

export default ProfileSettings;