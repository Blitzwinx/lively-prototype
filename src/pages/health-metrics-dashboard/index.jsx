import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Icon from "../../components/AppIcon";
import Image from "../../components/AppImage";
import MetricCard from "./components/MetricCard";
import DateFilter from "./components/DateFilter";
import PinnedMetrics from "./components/PinnedMetrics";
import MetricDetails from "./components/MetricDetails";
import { useHealthMetrics } from "../../hooks/useHealthData";
import { useUser } from "UserContext";

const HealthMetricsDashboard = () => {
  const { user } = useUser();
  const userId = user?.id;

  const [userData, setUserData] = useState({
    name: "",
    avatar: "",
  });

  const [selectedDateRange, setSelectedDateRange] = useState("week");
  const [selectedMetric, setSelectedMetric] = useState(null);
  const [pinnedMetrics, setPinnedMetrics] = useState([1, 3]); 

  // Fetch real health metrics
  const { data: healthMetrics, loading: metricsLoading, error: metricsError } = useHealthMetrics();

  // Transform real data into the format expected by the UI
  const transformHealthMetrics = () => {
    const defaultMetrics = [
      {
        id: 1,
        name: "Heart Rate",
        icon: "Heart",
        value: "-",
        unit: "bpm",
        status: "normal",
        change: "-",
        changeType: "stable",
        color: "error",
        description: "Track your heart rate to monitor cardiovascular health.",
        chartData: [],
        ranges: {
          low: { min: 40, max: 60, label: "Low" },
          normal: { min: 60, max: 100, label: "Normal" },
          high: { min: 100, max: 140, label: "High" },
        },
        insights: ["Start tracking your heart rate to get personalized insights"],
      },
      {
        id: 2,
        name: "Blood Pressure",
        icon: "Activity",
        value: "-/-",
        unit: "mmHg",
        status: "normal",
        change: "-",
        changeType: "stable",
        color: "info",
        description: "Monitor your blood pressure for cardiovascular health.",
        chartData: [],
        ranges: {
          low: { systolic: { min: 70, max: 90 }, diastolic: { min: 40, max: 60 }, label: "Low" },
          normal: { systolic: { min: 90, max: 120 }, diastolic: { min: 60, max: 80 }, label: "Normal" },
          elevated: { systolic: { min: 120, max: 130 }, diastolic: { min: 60, max: 80 }, label: "Elevated" },
          high: { systolic: { min: 130, max: 180 }, diastolic: { min: 80, max: 120 }, label: "High" },
        },
        insights: ["Regular blood pressure monitoring helps detect health changes early"],
      },
      {
        id: 3,
        name: "Weight",
        icon: "Scale",
        value: "-",
        unit: "kg",
        status: "normal",
        change: "-",
        changeType: "stable",
        color: "success",
        description: "Track your weight to monitor health progress.",
        chartData: [],
        ranges: {
          underweight: { min: 0, max: 58.5, label: "Underweight" },
          normal: { min: 58.5, max: 79.0, label: "Normal" },
          overweight: { min: 79.0, max: 95.0, label: "Overweight" },
          obese: { min: 95.0, max: 150, label: "Obese" },
        },
        insights: ["Consistent weight tracking helps maintain healthy lifestyle goals"],
      },
      {
        id: 4,
        name: "Blood Oxygen",
        icon: "Droplets",
        value: "-",
        unit: "%",
        status: "normal",
        change: "-",
        changeType: "stable",
        color: "info",
        description: "Monitor blood oxygen levels for respiratory health.",
        chartData: [],
        ranges: {
          low: { min: 0, max: 92, label: "Low" },
          normal: { min: 92, max: 100, label: "Normal" },
        },
        insights: ["Blood oxygen levels indicate how well your body uses oxygen"],
      },
      {
        id: 5,
        name: "Body Temperature",
        icon: "Thermometer",
        value: "-",
        unit: "°C",
        status: "normal",
        change: "-",
        changeType: "stable",
        color: "warning",
        description: "Track body temperature to monitor overall health.",
        chartData: [],
        ranges: {
          low: { min: 35.0, max: 36.0, label: "Low" },
          normal: { min: 36.0, max: 37.5, label: "Normal" },
          high: { min: 37.5, max: 40.0, label: "High" },
        },
        insights: ["Body temperature changes can indicate health status changes"],
      },
      {
        id: 6,
        name: "Stress Level",
        icon: "Zap",
        value: "-",
        unit: "%",
        status: "low",
        change: "-",
        changeType: "stable",
        color: "success",
        description: "Monitor stress levels for mental health awareness.",
        chartData: [],
        ranges: {
          low: { min: 0, max: 30, label: "Low" },
          moderate: { min: 30, max: 60, label: "Moderate" },
          high: { min: 60, max: 100, label: "High" },
        },
        insights: ["Managing stress levels is important for overall wellbeing"],
      },
      {
        id: 7,
        name: "Hydration",
        icon: "Droplet",
        value: "-",
        unit: "L",
        status: "good",
        change: "-",
        changeType: "stable",
        color: "info",
        description: "Track daily water intake for optimal hydration.",
        chartData: [],
        ranges: {
          low: { min: 0, max: 1.5, label: "Low" },
          moderate: { min: 1.5, max: 2.0, label: "Moderate" },
          good: { min: 2.0, max: 3.0, label: "Good" },
          excellent: { min: 3.0, max: 4.0, label: "Excellent" },
        },
        insights: ["Proper hydration supports all body functions and energy levels"],
      },
    ];

    if (!healthMetrics || healthMetrics.length === 0) {
      return defaultMetrics;
    }

    // Group metrics by type
    const metricsMap = {};
    healthMetrics.forEach(metric => {
      if (!metricsMap[metric.metric_type]) {
        metricsMap[metric.metric_type] = [];
      }
      metricsMap[metric.metric_type].push(metric);
    });

    // Update default metrics with real data
    return defaultMetrics.map(defaultMetric => {
      const metricType = defaultMetric.name.toLowerCase().replace(' ', '_');
      const realData = metricsMap[metricType] || metricsMap[metricType.replace('_', '_')];
      
      if (realData && realData.length > 0) {
        const latest = realData[0]; // Most recent
        const chartData = realData.slice(0, 7).reverse().map((item, index) => ({
          date: new Date(item.measured_at).toLocaleDateString('en-US', { weekday: 'short' }),
          value: parseFloat(item.value),
          ...(item.secondary_value && { 
            systolic: parseFloat(item.value),
            diastolic: parseFloat(item.secondary_value)
          })
        }));
        
        return {
          ...defaultMetric,
          value: metricType === 'blood_pressure_systolic' && latest.secondary_value 
            ? `${latest.value}/${latest.secondary_value}`
            : latest.value.toString(),
          chartData,
          description: `Current ${defaultMetric.name.toLowerCase()} reading.`,
          insights: [`Your ${defaultMetric.name.toLowerCase()} is being tracked.`],
          // Calculate trend based on recent data
          changeType: realData.length > 1 && latest.value > realData[1].value ? "up" : 
                     realData.length > 1 && latest.value < realData[1].value ? "down" : "stable",
          change: realData.length > 1 ? 
            (latest.value - realData[1].value > 0 ? "+" : "") + 
            (latest.value - realData[1].value).toFixed(1) : "0"
        };
      }
      return defaultMetric;
    });
  };

  const metricsData = transformHealthMetrics();

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
        setUserData({
          name: userData.name || user?.name || "User",
          avatar: userData.picture_url || user?.picture_url || ""
        });
      })
      .catch((err) => {
        console.error("Failed to load user:", err);
        // Fallback to user context data
        setUserData({
          name: user?.name || "User",
          avatar: user?.picture_url || ""
        });
      });
  }, [userId]);

  const togglePinMetric = (metricId) => {
    if (pinnedMetrics.includes(metricId)) {
      setPinnedMetrics(pinnedMetrics.filter(id => id !== metricId));
    } else {
      setPinnedMetrics([...pinnedMetrics, metricId]);
    }
  };

  const pinnedMetricsData = metricsData.filter(metric => pinnedMetrics.includes(metric.id));
  const unpinnedMetricsData = metricsData.filter(metric => !pinnedMetrics.includes(metric.id));

  const handleMetricSelect = (metric) => {
    setSelectedMetric(metric);
  };

  const handleCloseDetails = () => {
    setSelectedMetric(null);
  };

  if (metricsLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading health metrics...</p>
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
            <h2 className="heading-1 text-gray-900">Health Metrics Dashboard</h2>
          </div>
          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
              <Icon name="Bell" size={20} color="var(--color-gray-700)" />
            </button>
            <Link to="/profile-settings" className="flex-shrink-0">
              <Image
                src={userData.avatar}
                alt={userData.name}
                className="w-10 h-10 rounded-full object-cover"
              />
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        {/* Date Filter */}
        <section className="mb-6">
          <DateFilter 
            selectedRange={selectedDateRange} 
            onRangeChange={setSelectedDateRange} 
          />
        </section>

        {/* Pinned Metrics */}
        {pinnedMetricsData.length > 0 && (
          <section className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="heading-1 text-gray-900">Pinned Metrics</h2>
            </div>
            <PinnedMetrics 
              metrics={pinnedMetricsData} 
              onMetricSelect={handleMetricSelect}
              onTogglePin={togglePinMetric}
            />
          </section>
        )}

        {/* All Health Metrics */}
        <section className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="heading-1 text-gray-900">All Health Metrics</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {unpinnedMetricsData.map((metric) => (
              <MetricCard 
                key={metric.id} 
                metric={metric} 
                isPinned={pinnedMetrics.includes(metric.id)}
                onTogglePin={() => togglePinMetric(metric.id)}
                onSelect={() => handleMetricSelect(metric)}
              />
            ))}
          </div>
        </section>
      </main>

      {/* Metric Details Modal */}
      {selectedMetric && (
        <MetricDetails 
          metric={selectedMetric} 
          onClose={handleCloseDetails}
          dateRange={selectedDateRange}
        />
      )}

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
        <Link to="/health-metrics-dashboard" className="flex flex-col items-center">
          <Icon name="BarChart2" size={24} color="var(--color-primary)" />
          <span className="label text-primary-500 mt-1">Metrics</span>
        </Link>
        <Link to="/profile-settings" className="flex flex-col items-center">
          <Icon name="User" size={24} color="var(--color-gray-500)" />
          <span className="label text-gray-500 mt-1">Profile</span>
        </Link>
      </nav>

      {/* Padding to account for fixed bottom nav */}
      <div className="h-20"></div>
    </div>
  );
};

export default HealthMetricsDashboard;