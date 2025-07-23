// src/pages/activity-tracking/index.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import Icon from "../../components/AppIcon";
import Image from "../../components/AppImage";
import WeeklyActivityChart from "./components/WeeklyActivityChart";
import ActivityMetric from "./components/ActivityMetric";
import ActivityHistoryItem from "./components/ActivityHistoryItem";
import ActivityDetailModal from "./components/ActivityDetailModal";

import { useUser } from "UserContext";

const ActivityTracking = () => {
  const { user } = useUser();
  const userId = user?.id;

  console.log('ActivityTracking - Current user:', user);

  const [userData, setUserData] = useState({
    name: "",
    avatar: "",
    dailyGoals: {
      steps: { current: 8243, target: 10000, unit: "steps" },
      distance: { current: 5.7, target: 8, unit: "km" },
      activeMinutes: { current: 42, target: 60, unit: "min" },
      caloriesBurned: { current: 420, target: 500, unit: "kcal" },
    },
    weeklyActivity: [
      { day: "Mon", steps: 9200, target: 10000 },
      { day: "Tue", steps: 7800, target: 10000 },
      { day: "Wed", steps: 10500, target: 10000 },
      { day: "Thu", steps: 8243, target: 10000 },
      { day: "Fri", steps: 0, target: 10000 },
      { day: "Sat", steps: 0, target: 10000 },
      { day: "Sun", steps: 0, target: 10000 },
    ],
    activityHistory: [
      {
        id: 1,
        type: "Running",
        icon: "Running",
        duration: "32 min",
        distance: "4.2 km",
        calories: "320",
        time: "Today, 8:30 AM",
        intensity: "Moderate",
        heartRate: { avg: 142, max: 165 },
        pace: "7:36 min/km",
        route: {
          startLocation: "Central Park",
          endLocation: "Central Park",
          coordinates: { lat: 40.785091, lng: -73.968285 },
        },
        color: "info",
      },
      {
        id: 2,
        type: "Cycling",
        icon: "Bike",
        duration: "45 min",
        distance: "12 km",
        calories: "280",
        time: "Yesterday, 6:15 PM",
        intensity: "High",
        heartRate: { avg: 138, max: 156 },
        pace: "16.0 km/h",
        route: {
          startLocation: "Home",
          endLocation: "Riverside Park",
          coordinates: { lat: 40.801505, lng: -73.97155 },
        },
        color: "success",
      },
      {
        id: 3,
        type: "Swimming",
        icon: "Waves",
        duration: "30 min",
        distance: "1 km",
        calories: "240",
        time: "Yesterday, 7:30 AM",
        intensity: "High",
        heartRate: { avg: 132, max: 148 },
        laps: 20,
        pool: "Community Center",
        color: "primary-500",
      },
      {
        id: 4,
        type: "Walking",
        icon: "FootPrints",
        duration: "50 min",
        distance: "3.5 km",
        calories: "180",
        time: "Monday, 12:30 PM",
        intensity: "Low",
        heartRate: { avg: 98, max: 112 },
        pace: "14:17 min/km",
        route: {
          startLocation: "Office",
          endLocation: "Lunch Spot",
          coordinates: { lat: 40.712776, lng: -74.005974 },
        },
        color: "purple",
      },
      {
        id: 5,
        type: "Yoga",
        icon: "Yoga",
        duration: "45 min",
        calories: "150",
        time: "Monday, 6:00 AM",
        intensity: "Moderate",
        heartRate: { avg: 85, max: 105 },
        program: "Morning Flow",
        instructor: "Emma Wilson",
        color: "warning",
      },
    ],
  });

  const [selectedActivity, setSelectedActivity] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (!userId) return;
    
    console.log('ActivityTracking - Fetching user data for:', userId);
    
    axios
      .get(`${import.meta.env.VITE_API_URL || 'http://localhost:4000/api'}/users/${userId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
      })
      .then((res) => {
        console.log('ActivityTracking - User data response:', res.data);
        setUserData((prev) => ({
          ...prev,
          name: res.data.data?.name || res.data.name || user?.name || "User",
          avatar: res.data.data?.picture_url || res.data.picture_url || user?.picture_url || "https://cdn.rafled.com/anime-icons/images/u05vyKyGsL73WKPM1iFIkoW7tQ05Ghk8.jpg",
        }));
      })
      .catch((err) => {
        console.error("Failed to load user:", err);
        // Fallback to user data from context
        setUserData((prev) => ({
          ...prev,
          name: user?.name || "User",
          avatar: user?.picture_url || "https://cdn.rafled.com/anime-icons/images/u05vyKyGsL73WKPM1iFIkoW7tQ05Ghk8.jpg",
        }));
      });
  }, [userId]);

  const handleActivityClick = (activity) => {
    setSelectedActivity(activity);
    setShowModal(true);
  };
  const closeModal = () => setShowModal(false);
  const calculateProgress = (current, target) =>
    Math.min(Math.round((current / target) * 100), 100);

  // Don't show loading if we have user data from context
  const displayName = userData.name || user?.name || "User";

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-card sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <Image
              src={userData.avatar}
              alt={userData.name}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div className="ml-3">
              <h2 className="heading-2 text-gray-900">Activity Tracking</h2>
              <p className="body-small text-gray-500">
                Welcome, {userData.name}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
              <Icon name="Bell" size={20} color="var(--color-gray-700)" />
            </button>
            <Link
              to="/profile-settings"
              className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              <Icon name="Settings" size={20} color="var(--color-gray-700)" />
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        {/* Weekly Activity */}
        <section className="mb-8">
          <div className="bg-white rounded-card shadow-card p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="heading-1 text-gray-900">Weekly Activity</h2>
              <Link
                to="/health-metrics-dashboard"
                className="flex items-center text-primary-500 hover:text-primary-600 transition-colors button-text"
              >
                View Details
                <Icon name="ChevronRight" size={16} className="ml-1" />
              </Link>
            </div>
            <WeeklyActivityChart data={userData.weeklyActivity} />
          </div>
        </section>

        {/* Today's Progress */}
        <section className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="heading-1 text-gray-900">Today's Progress</h2>
            <Link
              to="/goal-setting"
              className="flex items-center text-primary-500 hover:text-primary-600 transition-colors button-text"
            >
              Adjust Goals
              <Icon name="ChevronRight" size={16} className="ml-1" />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <ActivityMetric
              icon="Footprints"
              name="Steps"
              current={userData.dailyGoals.steps.current}
              target={userData.dailyGoals.steps.target}
              unit={userData.dailyGoals.steps.unit}
              progress={calculateProgress(
                userData.dailyGoals.steps.current,
                userData.dailyGoals.steps.target
              )}
              color="info"
            />
            <ActivityMetric
              icon="MapPin"
              name="Distance"
              current={userData.dailyGoals.distance.current}
              target={userData.dailyGoals.distance.target}
              unit={userData.dailyGoals.distance.unit}
              progress={calculateProgress(
                userData.dailyGoals.distance.current,
                userData.dailyGoals.distance.target
              )}
              color="success"
            />
            <ActivityMetric
              icon="Clock"
              name="Active Time"
              current={userData.dailyGoals.activeMinutes.current}
              target={userData.dailyGoals.activeMinutes.target}
              unit={userData.dailyGoals.activeMinutes.unit}
              progress={calculateProgress(
                userData.dailyGoals.activeMinutes.current,
                userData.dailyGoals.activeMinutes.target
              )}
              color="purple"
            />
            <ActivityMetric
              icon="Flame"
              name="Calories"
              current={userData.dailyGoals.caloriesBurned.current}
              target={userData.dailyGoals.caloriesBurned.target}
              unit={userData.dailyGoals.caloriesBurned.unit}
              progress={calculateProgress(
                userData.dailyGoals.caloriesBurned.current,
                userData.dailyGoals.caloriesBurned.target
              )}
              color="warning"
            />
          </div>
        </section>

        {/* Activity History */}
        <section className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="heading-1 text-gray-900">Activity History</h2>
            <button className="flex items-center bg-primary-500 text-white px-3 py-2 rounded-button hover:bg-primary-600 transition-colors button-text">
              <Icon name="Plus" size={16} className="mr-1" />
              Add Activity
            </button>
          </div>
          <div className="space-y-4">
            {userData.activityHistory.map((activity) => (
              <ActivityHistoryItem
                key={activity.id}
                activity={activity}
                onClick={() => handleActivityClick(activity)}
              />
            ))}
          </div>
        </section>

        {/* Achievement Banner */}
        <section className="mb-8">
          <div className="bg-primary-500 bg-opacity-10 rounded-card p-4 flex items-center justify-between">
            <div className="flex items-center">
              <div className="bg-primary-500 bg-opacity-20 p-3 rounded-full mr-4">
                <Icon name="Award" size={24} color="var(--color-primary)" />
              </div>
              <div>
                <h3 className="heading-2 text-gray-900">
                  New Achievement Unlocked!
                </h3>
                <p className="body-medium text-gray-700">
                  You've completed 5 workouts this week
                </p>
              </div>
            </div>
            <Link
              to="/goal-setting"
              className="button-text bg-primary-500 text-white px-4 py-2 rounded-button hover:bg-primary-600 transition-colors"
            >
              View Badges
            </Link>
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
          <Icon name="Activity" size={24} color="var(--color-primary)" />
          <span className="label text-primary-500 mt-1">Activity</span>
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
          <Icon name="User" size={24} color="var(--color-gray-500)" />
          <span className="label text-gray-500 mt-1">Profile</span>
        </Link>
      </nav>

      {showModal && selectedActivity && (
        <ActivityDetailModal
          activity={selectedActivity}
          onClose={closeModal}
        />
      )}
      <div className="h-20" />
    </div>
  );
};

export default ActivityTracking;
