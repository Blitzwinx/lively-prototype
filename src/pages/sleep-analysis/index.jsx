// src/pages/sleep-analysis/index.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import Icon from "../../components/AppIcon";
import Image from "../../components/AppImage";
import SleepScore from "./components/SleepScore";
import SleepCycles from "./components/SleepCycles";
import WeeklyTrends from "./components/WeeklyTrends";
import SleepMetrics from "./components/SleepMetrics";
import EnvironmentalFactors from "./components/EnvironmentalFactors";
import SleepRecommendations from "./components/SleepRecommendations";
import SleepDateSelector from "./components/SleepDateSelector";

import { useSleepData } from "../../hooks/useHealthData";
import { useUser } from "UserContext";

const SleepAnalysis = () => {
  const { user } = useUser();
  const userId = user?.id;

  // Fetch real sleep data
  const { data: sleepSessions, loading: sleepLoading, error: sleepError } = useSleepData();

  const [userData, setUserData] = useState({
    name: "",
    avatar: "",
  });

  const [selectedDate, setSelectedDate] = useState(new Date().toLocaleDateString());

  // Transform sleep data for UI
  const transformSleepData = () => {
    if (!sleepSessions || sleepSessions.length === 0) {
      return {
        sleepScore: 0,
        sleepSummary: [
          { id: 1, icon: "Moon", color: "info", text: "Start tracking your sleep for insights" },
          { id: 2, icon: "Clock", color: "info", text: "Sleep data will appear here once tracked" },
        ],
        sleepCycles: {
          date: new Date().toLocaleDateString(),
          bedtime: "-",
          wakeup: "-",
          duration: "-",
          cycles: [],
          stagePercentages: { deep: 0, light: 0, rem: 0, awake: 0 },
        },
        weeklyTrends: [
          { day: "Mon", date: "Jan 1", hours: 0, quality: 0 },
          { day: "Tue", date: "Jan 2", hours: 0, quality: 0 },
          { day: "Wed", date: "Jan 3", hours: 0, quality: 0 },
          { day: "Thu", date: "Jan 4", hours: 0, quality: 0 },
          { day: "Fri", date: "Jan 5", hours: 0, quality: 0 },
          { day: "Sat", date: "Jan 6", hours: 0, quality: 0 },
          { day: "Sun", date: "Jan 7", hours: 0, quality: 0 },
        ],
        sleepMetrics: [
          { id: 1, name: "Sleep Duration", value: "-", target: "8h 00m", progress: 0, trend: "stable", change: "-", icon: "Clock", color: "info" },
          { id: 2, name: "Sleep Quality", value: "-", target: "80%", progress: 0, trend: "stable", change: "-", icon: "BarChart2", color: "success" },
          { id: 3, name: "Deep Sleep", value: "-", target: "90min", progress: 0, trend: "stable", change: "-", icon: "Repeat", color: "warning" },
          { id: 4, name: "REM Sleep", value: "-", target: "60min", progress: 0, trend: "stable", change: "-", icon: "Heart", color: "error" },
        ],
      };
    }

    const latestSleep = sleepSessions[0];
    const avgQuality = sleepSessions.reduce((sum, session) => sum + (session.quality_score || 0), 0) / sleepSessions.length;
    
    // Create weekly trends from available data
    const weeklyTrends = sleepSessions.slice(0, 7).reverse().map((session, index) => {
      const date = new Date(session.bedtime);
      return {
        day: date.toLocaleDateString('en-US', { weekday: 'short' }),
        date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        hours: parseFloat(session.duration_hours) || 0,
        quality: session.quality_score || 0
      };
    });

    return {
      sleepScore: Math.round(avgQuality) || 0,
      sleepSummary: [
        { 
          id: 1, 
          icon: "Moon", 
          color: latestSleep.duration_hours >= 7 ? "success" : "warning", 
          text: `Sleep duration: ${latestSleep.duration_hours?.toFixed(1) || 0}h` 
        },
        { 
          id: 2, 
          icon: "BarChart2", 
          color: (latestSleep.quality_score || 0) >= 80 ? "success" : "warning", 
          text: `Sleep quality: ${latestSleep.quality_score || 0}%` 
        },
      ],
      sleepCycles: {
        date: new Date(latestSleep.bedtime).toLocaleDateString(),
        bedtime: new Date(latestSleep.bedtime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        wakeup: new Date(latestSleep.wake_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        duration: `${Math.floor(latestSleep.duration_hours)}h ${Math.round((latestSleep.duration_hours % 1) * 60)}m`,
        cycles: [], // Would need more detailed data for sleep cycles
        stagePercentages: {
          deep: Math.round((latestSleep.deep_sleep_minutes / (latestSleep.duration_hours * 60)) * 100) || 0,
          light: Math.round((latestSleep.light_sleep_minutes / (latestSleep.duration_hours * 60)) * 100) || 0,
          rem: Math.round((latestSleep.rem_sleep_minutes / (latestSleep.duration_hours * 60)) * 100) || 0,
          awake: Math.round((latestSleep.awake_minutes / (latestSleep.duration_hours * 60)) * 100) || 0,
        },
      },
      weeklyTrends,
      sleepMetrics: [
        { 
          id: 1, 
          name: "Sleep Duration", 
          value: `${Math.floor(latestSleep.duration_hours)}h ${Math.round((latestSleep.duration_hours % 1) * 60)}m`, 
          target: "8h 00m", 
          progress: (latestSleep.duration_hours / 8), 
          trend: "stable", 
          change: "Current", 
          icon: "Clock", 
          color: "info" 
        },
        { 
          id: 2, 
          name: "Sleep Quality", 
          value: `${latestSleep.quality_score || 0}%`, 
          target: "80%", 
          progress: (latestSleep.quality_score || 0) / 100, 
          trend: "stable", 
          change: "Current", 
          icon: "BarChart2", 
          color: "success" 
        },
        { 
          id: 3, 
          name: "Deep Sleep", 
          value: `${latestSleep.deep_sleep_minutes || 0}min`, 
          target: "90min", 
          progress: (latestSleep.deep_sleep_minutes || 0) / 90, 
          trend: "stable", 
          change: "Current", 
          icon: "Repeat", 
          color: "warning" 
        },
        { 
          id: 4, 
          name: "REM Sleep", 
          value: `${latestSleep.rem_sleep_minutes || 0}min`, 
          target: "60min", 
          progress: (latestSleep.rem_sleep_minutes || 0) / 60, 
          trend: "stable", 
          change: "Current", 
          icon: "Heart", 
          color: "error" 
        },
      ],
    };
  };

  const sleepData = transformSleepData();

  // Static data that doesn't come from database
  const environmentalFactors = [
    { id: 1, name: "Room Temperature", icon: "Thermometer", value: "-", ideal: "65-68°F", status: "unknown", color: "info" },
    { id: 2, name: "Noise Level", icon: "Volume2", value: "-", ideal: "Low", status: "unknown", color: "info" },
    { id: 3, name: "Light Level", icon: "Sun", value: "-", ideal: "Dark", status: "unknown", color: "info" },
    { id: 4, name: "Humidity", icon: "Droplets", value: "-", ideal: "40-60%", status: "unknown", color: "info" },
  ];

  const recommendations = [
    { id: 1, title: "Track your sleep consistently", description: "Regular sleep tracking helps identify patterns and improvements", icon: "Clock", priority: "high" },
    { id: 2, title: "Maintain consistent bedtime", description: "Going to bed at the same time improves sleep quality", icon: "Repeat", priority: "medium" },
    { id: 3, title: "Create optimal sleep environment", description: "Cool, dark, and quiet rooms promote better sleep", icon: "Moon", priority: "medium" },
  ];

  useEffect(() => {
    if (!userId) return;
    fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:4000/api'}/users/${userId}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then((res) => {
        const userData = res.data || res;
        setUserData((prev) => ({
          ...prev,
          name: userData.name || user?.name || "User",
          avatar: userData.picture_url || user?.picture_url || "https://cdn.rafled.com/anime-icons/images/u05vyKyGsL73WKPM1iFIkoW7tQ05Ghk8.jpg",
        }));
      })
      .catch((err) => {
        console.error("Failed to load user:", err);
        setUserData((prev) => ({
          ...prev,
          name: user?.name || "User",
          avatar: user?.picture_url || "",
        }));
      });
  }, [userId]);

  if (sleepLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading sleep data...</p>
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
            <Image
              src={userData.avatar}
              alt={userData.name}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div className="ml-3">
              <h2 className="heading-2 text-gray-900">Sleep Analysis</h2>
              <p className="body-small text-gray-500">
                Track and improve your sleep quality
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
        <section className="mb-6">
          <SleepDateSelector
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
          />
        </section>

        <section className="mb-8">
          <SleepScore
            score={sleepData.sleepScore}
            summary={sleepData.sleepSummary}
          />
        </section>

        <section className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="heading-1 text-gray-900">Sleep Cycles</h2>
            <button className="flex items-center text-primary-500 hover:text-primary-600 transition-colors button-text">
              <Icon name="Info" size={16} className="mr-1" />
              About Sleep Stages
            </button>
          </div>
          <SleepCycles data={sleepData.sleepCycles} />
        </section>

        <section className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="heading-1 text-gray-900">Weekly Trends</h2>
            <Link
              to="/health-metrics-dashboard"
              className="flex items-center text-primary-500 hover:text-primary-600 transition-colors button-text"
            >
              View More
              <Icon name="ChevronRight" size={16} className="ml-1" />
            </Link>
          </div>
          <WeeklyTrends data={sleepData.weeklyTrends} />
        </section>

        <section className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="heading-1 text-gray-900">Sleep Metrics</h2>
            <Link
              to="/goal-setting"
              className="flex items-center text-primary-500 hover:text-primary-600 transition-colors button-text"
            >
              Set Goals
              <Icon name="ChevronRight" size={16} className="ml-1" />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {sleepData.sleepMetrics.map((metric) => (
              <SleepMetrics key={metric.id} metric={metric} />
            ))}
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <section>
            <div className="flex justify-between items-center mb-4">
              <h2 className="heading-1 text-gray-900">Environmental Factors</h2>
              <button className="flex items-center text-primary-500 hover:text-primary-600 transition-colors button-text">
                <Icon name="Settings" size={16} className="mr-1" />
                Configure Sensors
              </button>
            </div>
            <EnvironmentalFactors factors={environmentalFactors} />
          </section>

          <section>
            <div className="flex justify-between items-center mb-4">
              <h2 className="heading-1 text-gray-900">Recommendations</h2>
              <button className="flex items-center text-primary-500 hover:text-primary-600 transition-colors button-text">
                <Icon name="RefreshCw" size={16} className="mr-1" />
                Refresh
              </button>
            </div>
            <SleepRecommendations recommendations={recommendations} />
          </section>
        </div>

        <section className="mb-8">
          <div className="bg-primary-500 bg-opacity-10 rounded-card p-4 flex items-center justify-between">
            <div className="flex items-center">
              <div className="bg-primary-500 bg-opacity-20 p-3 rounded-full mr-4">
                <Icon name="BarChart" size={24} color="var(--color-primary)" />
              </div>
              <div>
                <h3 className="heading-2 text-gray-900">Compare Your Sleep</h3>
                <p className="body-medium text-gray-700">
                  See how your sleep compares to others in your age group
                </p>
              </div>
            </div>
            <button className="button-text bg-primary-500 text-white px-4 py-2 rounded-button hover:bg-primary-600 transition-colors">
              Compare Now
            </button>
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
          <Icon name="Moon" size={24} color="var(--color-primary)" />
          <span className="label text-primary-500 mt-1">Sleep</span>
        </Link>
        <Link to="/profile-settings" className="flex flex-col items-center">
          <Icon name="User" size={24} color="var(--color-gray-500)" />
          <span className="label text-gray-500 mt-1">Profile</span>
        </Link>
      </nav>

      <div className="h-20" />
    </div>
  );
};

export default SleepAnalysis;