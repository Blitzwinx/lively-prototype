import React from "react";
import { useRoutes, Navigate } from "react-router-dom";
import HomeScreen from "./pages/home-screen";
import Register from "./pages/auth/register";
import Login from "./pages/auth/login";
import ActivityTracking from "./pages/activity-tracking";
import SleepAnalysis from "./pages/sleep-analysis";
import NutritionTracker from "./pages/nutrition-tracker";
import HealthMetricsDashboard from "./pages/health-metrics-dashboard";
import GoalSetting from "./pages/goal-setting";
import HealthInsights from "./pages/health-insights";
import ProfileSettings from "./pages/profile-settings";

const ProjectRoutes = ({ user, setUser }) => {
  // Check if user is properly authenticated
  const isAuthenticated = user && user.id;
  
  const routes = [
    {
      path: "/",
      element: isAuthenticated ? <Navigate to="/home-screen" replace /> : <Navigate to="/login" replace />
    },
    {
      path: "/register",
      element: isAuthenticated ? <Navigate to="/home-screen" replace /> : <Register setUser={setUser} />
    },
    {
      path: "/login",
      element: isAuthenticated ? (
        <Navigate to="/home-screen" replace />
      ) : (
        <Login setUser={setUser} />
      )
    },
    {
      path: "/home-screen",
      element: isAuthenticated ? (
        <HomeScreen user={user} />
      ) : (
        <Navigate to="/login" replace />
      )
    },
    {
      path: "/health-metrics-dashboard",
      element: isAuthenticated ? (
        <HealthMetricsDashboard />
      ) : (
        <Navigate to="/login" replace />
      )
    },
    {
      path: "/activity-tracking",
      element: isAuthenticated ? (
        <ActivityTracking />
      ) : (
        <Navigate to="/login" replace />
      )
    },
    {
      path: "/nutrition-tracker",
      element: isAuthenticated ? (
        <NutritionTracker />
      ) : (
        <Navigate to="/login" replace />
      )
    },
    {
      path: "/sleep-analysis",
      element: isAuthenticated ? (
        <SleepAnalysis />
      ) : (
        <Navigate to="/login" replace />
      )
    },
    {
      path: "/goal-setting",
      element: isAuthenticated ? (
        <GoalSetting />
      ) : (
        <Navigate to="/login" replace />
      )
    },
    {
      path: "/health-insights",
      element: isAuthenticated ? (
        <HealthInsights />
      ) : (
        <Navigate to="/login" replace />
      )
    },
    {
      path: "/profile-settings",
      element: isAuthenticated ? (
        <ProfileSettings setUser={setUser} />
      ) : (
        <Navigate to="/login" replace />
      )
    }
  ];

  return useRoutes(routes);
};

const Routes = ({ user, setUser }) => {
  return <ProjectRoutes user={user} setUser={setUser} />;
};

export default Routes;