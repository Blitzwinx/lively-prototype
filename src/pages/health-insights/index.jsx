import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Icon from "../../components/AppIcon";
import Image from "../../components/AppImage";
import InsightCard from "./components/InsightCard";
import CorrelationGraph from "./components/CorrelationGraph";
import TimelineView from "./components/TimelineView";
import InsightCategory from "./components/InsightCategory";
import RecommendationCard from "./components/RecommendationCard";
import { useUser } from "UserContext";

const HealthInsights = () => {
  const [activeTab, setActiveTab] = useState("all");
  const { user } = useUser();
  const userId = user?.id;

  const [userData, setUserData] = useState({
    name: "",
    avatar: "",
  });

  const [insightsData, setInsightsData] = useState([
    // Default empty state - will be populated from API
  ]);

  useEffect(() => {
    if (!userId) return;
    axios
      .get(`${import.meta.env.VITE_API_URL || 'http://localhost:4000/api'}/users/${userId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
      })
      .then((res) => {
        const userData = res.data.data || res.data;
        setUserData({
          name: userData.name || user?.name || "",
          avatar: userData.picture_url || user?.picture_url || "https://cdn.rafled.com/anime-icons/images/u05vyKyGsL73WKPM1iFIkoW7tQ05Ghk8.jpg",
        });
      })
      .catch((err) => {
        console.error("Failed to load user:", err);
        setUserData({
          name: user?.name || "",
          avatar: user?.picture_url || "",
        });
      });
  }, [userId]);

  // Mock correlation data
  const correlationData = [
    // Will be populated from database analysis
  ];

  // Mock timeline events
  const timelineEvents = [
    // Will be populated from user activity history
  ];

  const filteredInsights = activeTab === "all" ? insightsData : insightsData.filter(insight => insight.category === activeTab);

  const sortedInsights = [...filteredInsights].sort((a, b) => {
    const priorityOrder = { high: 0, medium: 1, low: 2 };
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  });

  const categories = [
    { id: "all", name: "All Insights", icon: "LayoutDashboard" },
    { id: "cardiovascular", name: "Cardiovascular", icon: "Heart" },
    { id: "sleep", name: "Sleep", icon: "Moon" },
    { id: "nutrition", name: "Nutrition", icon: "Apple" },
    { id: "fitness", name: "Fitness", icon: "Activity" },
    { id: "metabolic", name: "Metabolic", icon: "LineChart" }
  ];

  if (!userData.name && !user?.name) {
    return <div className="p-4 text-center">Loading profile…</div>;
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
              <h2 className="heading-2 text-gray-900">Health Insights</h2>
              <p className="body-small text-gray-500">
                Personalized analysis for {userData.name}
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
        {/* Category Tabs */}
        <section className="mb-6 overflow-x-auto">
          <div className="flex space-x-2 pb-2">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setActiveTab(category.id)}
                className={`flex items-center px-4 py-2 rounded-button whitespace-nowrap ${
                  activeTab === category.id 
                    ? "bg-primary-500 text-white" : "bg-white text-gray-700 hover:bg-gray-100"
                } transition-colors shadow-card`}
              >
                <Icon 
                  name={category.icon} 
                  size={16} 
                  color={activeTab === category.id ? "white" : "var(--color-gray-700)"} 
                  className="mr-2" 
                />
                <span className="button-text">{category.name}</span>
              </button>
            ))}
          </div>
        </section>

        {/* Priority Insights */}
        <section className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="heading-1 text-gray-900">Priority Insights</h2>
            <Link 
              to="/goal-setting" className="flex items-center text-primary-500 hover:text-primary-600 transition-colors button-text"
            >
              Set Health Goals
              <Icon name="ChevronRight" size={16} className="ml-1" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {sortedInsights.slice(0, 2).map(insight => (
              <InsightCard key={insight.id} insight={insight} />
            ))}
          </div>
        </section>

        {/* All Insights */}
        <section className="mb-8">
          <h2 className="heading-1 text-gray-900 mb-4">All Insights</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {sortedInsights.map(insight => (
              <InsightCard key={insight.id} insight={insight} />
            ))}
          </div>
        </section>

        {/* Correlations Section */}
        <section className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="heading-1 text-gray-900">Correlations & Patterns</h2>
            <Link 
              to="/health-metrics-dashboard" className="flex items-center text-primary-500 hover:text-primary-600 transition-colors button-text"
            >
              View All Metrics
              <Icon name="ChevronRight" size={16} className="ml-1" />
            </Link>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {correlationData.map(correlation => (
              <CorrelationGraph key={correlation.id} data={correlation} />
            ))}
          </div>
        </section>

        {/* Health Timeline */}
        <section className="mb-8">
          <h2 className="heading-1 text-gray-900 mb-4">Your Health Journey</h2>
          <TimelineView events={timelineEvents} />
        </section>

        {/* Recommendations */}
        <section className="mb-8">
          <h2 className="heading-1 text-gray-900 mb-4">Personalized Recommendations</h2>
          <div className="bg-white rounded-card shadow-card p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <RecommendationCard 
                title="Optimize Sleep Quality" description="Based on your recent sleep patterns and activity levels, these adjustments could improve your recovery."
                recommendations={[
                  "Maintain consistent sleep and wake times",
                  "Limit caffeine after 2:00 PM",
                  "Consider a magnesium supplement before bed"
                ]}
                icon="Moon" color="purple"
              />
              <RecommendationCard 
                title="Cardiovascular Health" description="Your heart rate variability trends suggest these strategies may improve your cardiovascular resilience."
                recommendations={[
                  "Add 2 zone 2 cardio sessions weekly (30-45 min)",
                  "Practice 5-minute breathing exercises twice daily",
                  "Consider omega-3 supplementation"
                ]}
                icon="Heart" color="error"
              />
            </div>
          </div>
        </section>

        {/* Insight Categories */}
        <section className="mb-8">
          <h2 className="heading-1 text-gray-900 mb-4">Explore Health Dimensions</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {categories.filter(cat => cat.id !== "all").map(category => (
              <InsightCategory 
                key={category.id}
                name={category.name}
                icon={category.icon}
                count={insightsData.filter(insight => insight.category === category.id).length}
                onClick={() => setActiveTab(category.id)}
                isActive={activeTab === category.id}
              />
            ))}
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
        <Link to="/health-insights" className="flex flex-col items-center">
          <Icon name="LineChart" size={24} color="var(--color-primary)" />
          <span className="label text-primary-500 mt-1">Insights</span>
        </Link>
      </nav>

      {/* Padding to account for fixed bottom nav */}
      <div className="h-20"></div>
    </div>
  );
};

export default HealthInsights;