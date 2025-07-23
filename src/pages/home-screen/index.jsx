// src/pages/home-screen/index.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import Icon from "../../components/AppIcon";
import Image from "../../components/AppImage";
import LoadingSpinner from "../../components/LoadingSpinner";
import ErrorBoundary from "../../components/ErrorBoundary";
import HealthScore from "./components/HealthScore";
import MetricCard from "./components/MetricCard";
import NutritionCard from "./components/NutritionCard";
import TodaysPlan from "./components/TodaysPlan";
import RecentActivity from "./components/RecentActivity";

import { useUser } from "UserContext";
import { useHealthMetrics, useActivities, useNutritionData } from "../../hooks/useHealthData";

const HomeScreen = () => {
  const { user } = useUser();
  
  console.log('HomeScreen - Current user:', user);
  
  // Use custom hooks to fetch real data
  const { data: healthMetrics, loading: metricsLoading, error: metricsError } = useHealthMetrics();
  const { data: activities, loading: activitiesLoading, error: activitiesError } = useActivities(null, 5);
  const { data: nutritionData, loading: nutritionLoading, error: nutritionError } = useNutritionData('1d');
  
  const [userData, setUserData] = useState({
    name: user?.name || "",
    avatar: user?.picture_url || "https://cdn.rafled.com/anime-icons/images/u05vyKyGsL73WKPM1iFIkoW7tQ05Ghk8.jpg",
  });

  console.log('HomeScreen - Health metrics:', { data: healthMetrics, loading: metricsLoading, error: metricsError });
  console.log('HomeScreen - Activities:', { data: activities, loading: activitiesLoading, error: activitiesError });
  console.log('HomeScreen - Nutrition:', { data: nutritionData, loading: nutritionLoading, error: nutritionError });

  // Calculate health score based on real data
  const calculateHealthScore = () => {
    if (!healthMetrics.length && !activities.length) return 75; // Default score
    
    let score = 70; // Base score
    
    // Add points for recent activities
    if (activities.length > 0) {
      score += Math.min(activities.length * 5, 20); // Max 20 points for activities
    }
    
    // Add points for consistent health tracking
    if (healthMetrics.length > 0) {
      score += Math.min(healthMetrics.length * 2, 10); // Max 10 points for tracking
    }
    
    return Math.min(score, 100);
  };

  // Transform real health metrics data
  const transformHealthMetrics = () => {
    const defaultMetrics = [
      { id: 1, name: "Steps",     icon: "Footprints",  value: "8,243", target: "10,000", unit: "steps",  progress: 0.82, trend: "up",     change: "+12%", color: "info"    },
      { id: 2, name: "Calories",  icon: "Flame",       value: "1,840", target: "2,200",  unit: "kcal",   progress: 0.84, trend: "up",     change: "+5%",  color: "warning" },
      { id: 3, name: "Heart Rate",icon: "Heart",       value: "68",     target: "60-100",unit: "bpm",    progress: 0.68, trend: "stable",change: "Normal",color: "error"   },
      { id: 4, name: "Sleep",     icon: "Moon",        value: "7.2",    target: "8",      unit: "hours",  progress: 0.90, trend: "down",   change: "-3%",  color: "purple"  },
    ];

    if (healthMetrics.length === 0) return defaultMetrics;

    // Transform real data to match expected format
    const metricsMap = {};
    healthMetrics.forEach(metric => {
      if (!metricsMap[metric.metric_type]) {
        metricsMap[metric.metric_type] = [];
      }
      metricsMap[metric.metric_type].push(metric);
    });

    // Update default metrics with real data where available
    return defaultMetrics.map(defaultMetric => {
      const realData = metricsMap[defaultMetric.name.toLowerCase().replace(' ', '_')];
      if (realData && realData.length > 0) {
        const latest = realData[0]; // Most recent
        return {
          ...defaultMetric,
          value: latest.value.toString(),
          // Calculate trend based on recent data
          trend: realData.length > 1 && latest.value > realData[1].value ? "up" : "stable"
        };
      }
      return defaultMetric;
    });
  };

  // Transform activities data
  const transformActivities = () => {
    const defaultActivities = [
      { id: 1, type: "Running",  icon: "Running",  duration: "32 min", distance: "4.2 km", calories: "320", time: "Today, 8:30 AM",    color: "info"      },
      { id: 2, type: "Cycling",  icon: "Bike",     duration: "45 min", distance: "12 km",  calories: "280", time: "Yesterday, 6:15 PM", color: "success"   },
      { id: 3, type: "Swimming", icon: "Waves",    duration: "30 min", distance: "1 km",   calories: "240", time: "Yesterday, 7:30 AM", color: "primary-500" },
    ];

    if (activities.length === 0) return defaultActivities;

    return activities.slice(0, 3).map((activity, index) => ({
      id: activity.id,
      type: activity.activity_type.charAt(0).toUpperCase() + activity.activity_type.slice(1),
      icon: getActivityIcon(activity.activity_type),
      duration: `${activity.duration_minutes} min`,
      distance: activity.distance_km ? `${activity.distance_km} km` : null,
      calories: activity.calories_burned ? activity.calories_burned.toString() : "0",
      time: new Date(activity.started_at).toLocaleDateString(),
      color: ["info", "success", "primary-500"][index % 3]
    }));
  };

  // Helper function to get activity icon
  const getActivityIcon = (activityType) => {
    const iconMap = {
      running: "Running",
      cycling: "Bike", 
      swimming: "Waves",
      walking: "Footprints",
      yoga: "Yoga",
      weightlifting: "Dumbbell"
    };
    return iconMap[activityType] || "Activity";
  };

  // Transform nutrition data
  const transformNutritionData = () => {
    const defaultNutrition = {
      calories: { consumed: 1840, target: 2200 },
      macros: [
        { name: "Protein", value: 95,  target: 120, unit: "g", color: "success" },
        { name: "Carbs",   value: 210, target: 250, unit: "g", color: "warning" },
        { name: "Fat",     value: 55,  target: 70,  unit: "g", color: "error"   },
      ],
      meals: [
        { id: 1, name: "Breakfast", time: "8:00 AM",   calories: 420 },
        { id: 2, name: "Lunch",     time: "12:30 PM",  calories: 640 },
        { id: 3, name: "Snack",     time: "3:30 PM",   calories: 180 },
        { id: 4, name: "Dinner",    time: "7:00 PM",   calories: 600 },
      ],
    };

    if (nutritionData.length === 0) return defaultNutrition;

    // Calculate totals from real data
    const totalCalories = nutritionData.reduce((sum, entry) => sum + parseFloat(entry.calories), 0);
    const totalProtein = nutritionData.reduce((sum, entry) => sum + (parseFloat(entry.protein_g) || 0), 0);
    const totalCarbs = nutritionData.reduce((sum, entry) => sum + (parseFloat(entry.carbs_g) || 0), 0);
    const totalFat = nutritionData.reduce((sum, entry) => sum + (parseFloat(entry.fat_g) || 0), 0);

    // Group by meal type
    const mealGroups = nutritionData.reduce((groups, entry) => {
      if (!groups[entry.meal_type]) {
        groups[entry.meal_type] = [];
      }
      groups[entry.meal_type].push(entry);
      return groups;
    }, {});

    const meals = Object.entries(mealGroups).map(([mealType, entries], index) => ({
      id: index + 1,
      name: mealType.charAt(0).toUpperCase() + mealType.slice(1),
      time: new Date(entries[0].consumed_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      calories: entries.reduce((sum, entry) => sum + parseFloat(entry.calories), 0)
    }));

    return {
      calories: { consumed: Math.round(totalCalories), target: 2200 },
      macros: [
        { name: "Protein", value: Math.round(totalProtein), target: 120, unit: "g", color: "success" },
        { name: "Carbs", value: Math.round(totalCarbs), target: 250, unit: "g", color: "warning" },
        { name: "Fat", value: Math.round(totalFat), target: 70, unit: "g", color: "error" },
      ],
      meals: meals.length > 0 ? meals : defaultNutrition.meals,
    };
  };

  const todaysPlan = [
    { id: 1, type: "Workout",     title: "HIIT Training",       time: "5:30 PM",        duration: "30 min", icon: "Dumbbell"      },
    { id: 2, type: "Medication",  title: "Vitamin Supplement",  time: "9:00 AM",        icon: "Pill"          },
    { id: 3, type: "Water",       title: "Hydration Reminder",  time: "Every 2 hours",  icon: "Droplets"      },
    { id: 4, type: "Appointment", title: "Dr. Dottore - Checkup", time: "Tomorrow, 10:00 AM", icon: "CalendarClock" },
  ];

  // Show loading state
  if (metricsLoading || activitiesLoading || nutritionLoading) {
    return <LoadingSpinner size="large" message="Loading your health data..." />;
  }

  // Show error state
  if (metricsError || activitiesError || nutritionError) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-card shadow-card p-8 max-w-md">
          <div className="text-center">
            <Icon name="AlertTriangle" size={48} color="var(--color-error)" className="mx-auto mb-4" />
            <h2 className="heading-1 text-gray-900 mb-2">Unable to Load Data</h2>
            <p className="body-medium text-gray-700 mb-4">
              We're having trouble loading your health data. Please check your connection and try again.
            </p>
            <button 
              onClick={() => window.location.reload()}
              className="button-text bg-primary-500 text-white px-4 py-2 rounded-button hover:bg-primary-600 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Get transformed data
  const healthScore = calculateHealthScore();
  const metrics = transformHealthMetrics();
  const recentActivities = transformActivities();
  const nutrition = transformNutritionData();

  return (
    <ErrorBoundary>
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
              <h2 className="heading-2 text-gray-900">
                Hi, {userData.name.split(" ")[0]}
              </h2>
              <p className="body-small text-gray-500">
                Let's check your health today
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
              <Icon name="Bell" size={20} color="var(--color-gray-700)" />
            </button>
            <Link to="/profile-settings" className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
              <Icon name="Settings" size={20} color="var(--color-gray-700)" />
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        {/* Health Score */}
        <section className="mb-8">
          <HealthScore score={healthScore} />
        </section>

        {/* Key Metrics */}
        <section className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="heading-1 text-gray-900">Key Metrics</h2>
            <Link
              to="/health-metrics-dashboard"
              className="flex items-center text-primary-500 hover:text-primary-600 transition-colors button-text"
            >
              View All
              <Icon name="ChevronRight" size={16} className="ml-1" />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {metrics.map(metric => (
              <MetricCard key={metric.id} metric={metric} />
            ))}
          </div>
        </section>

        {/* Recent Activity */}
        <section className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="heading-1 text-gray-900">Recent Activity</h2>
            <Link
              to="/activity-tracking"
              className="flex items-center text-primary-500 hover:text-primary-600 transition-colors button-text"
            >
              View All
              <Icon name="ChevronRight" size={16} className="ml-1" />
            </Link>
          </div>
          <RecentActivity activities={recentActivities} />
        </section>

        {/* Nutrition & Today's Plan */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Nutrition */}
          <section>
            <div className="flex justify-between items-center mb-4">
              <h2 className="heading-1 text-gray-900">Nutrition</h2>
              <Link
                to="/nutrition-tracker"
                className="flex items-center text-primary-500 hover:text-primary-600 transition-colors button-text"
              >
                View Details
                <Icon name="ChevronRight" size={16} className="ml-1" />
              </Link>
            </div>
            <NutritionCard nutrition={nutrition} />
          </section>

          {/* Today's Plan */}
          <section>
            <div className="flex justify-between items-center mb-4">
              <h2 className="heading-1 text-gray-900">Today's Plan</h2>
              <Link
                to="/goal-setting"
                className="flex items-center text-primary-500 hover:text-primary-600 transition-colors button-text"
              >
                Manage Goals
                <Icon name="ChevronRight" size={16} className="ml-1" />
              </Link>
            </div>
            <TodaysPlan plans={todaysPlan} />
          </section>
        </div>

        {/* Health Insights Banner */}
        <section className="mb-8">
          <div className="bg-primary-500 bg-opacity-10 rounded-card p-4 flex items-center justify-between">
            <div className="flex items-center">
              <div className="bg-primary-500 bg-opacity-20 p-3 rounded-full mr-4">
                <Icon name="LineChart" size={24} color="var(--color-primary)" />
              </div>
              <div>
                <h3 className="heading-2 text-gray-900">Health Insights Available</h3>
                <p className="body-medium text-gray-700">New patterns detected in your sleep data</p>
              </div>
            </div>
            <Link 
              to="/health-insights" className="button-text bg-primary-500 text-white px-4 py-2 rounded-button hover:bg-primary-600 transition-colors"
            >
              View Insights
            </Link>
          </div>
        </section>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white shadow-elevated px-4 py-3 flex justify-around items-center">
        <Link to="/home-screen" className="flex flex-col items-center">
          <Icon name="Home" size={24} color="var(--color-primary)" />
          <span className="label text-primary-500 mt-1">Home</span>
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
          <Icon name="User" size={24} color="var(--color-gray-500)" />
          <span className="label text-gray-500 mt-1">Profile</span>
        </Link>
      </nav>

      {/* Padding to account for fixed bottom nav */}
      <div className="h-20"></div>
    </div>
    </ErrorBoundary>
  );
};

export default HomeScreen;