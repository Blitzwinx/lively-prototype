import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Icon from "../../components/AppIcon";
import Image from "../../components/AppImage";
import GoalCategorySection from "./components/GoalCategorySection";
import GoalCard from "./components/GoalCard";
import CreateGoalModal from "./components/CreateGoalModal";
import AchievementBadges from "./components/AchievementBadges";
import GoalMilestones from "./components/GoalMilestones";
import { useGoals } from "../../hooks/useHealthData";
import { useUser } from "UserContext";

const GoalSetting = () => {
  const { user } = useUser();
  const userId = user?.id;

  // Fetch real goals and achievements data
  const { data: goals, loading: goalsLoading, error: goalsError } = useGoals();

  const [userData, setUserData] = useState({
    name: user?.name || "",
    avatar: user?.picture_url || "",
    streakDays: 0,
    badges: [],
    goals: []
  });

  const [activeCategory, setActiveCategory] = useState("all");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
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
          const userInfo = userData.data || userData;
          
          setUserData(prev => ({
            ...prev,
            name: userInfo.name || user?.name || "",
            avatar: userInfo.picture_url || user?.picture_url || "",
          }));
        }

        // Transform goals data from useGoals hook
        if (goals && goals.length > 0) {
          const transformedGoals = goals.map(goal => ({
            id: goal.id,
            category: goal.category,
            title: goal.title,
            description: goal.description || "",
            currentValue: goal.current_value || 0,
            targetValue: goal.target_value,
            unit: goal.unit,
            progress: goal.target_value > 0 ? (goal.current_value || 0) / goal.target_value : 0,
            startDate: goal.start_date,
            endDate: goal.end_date,
            icon: getIconForCategory(goal.category),
            color: getColorForCategory(goal.category),
            notifications: goal.notifications_enabled || false,
            milestones: goal.goal_milestones || []
          }));

          setUserData(prev => ({
            ...prev,
            goals: transformedGoals
          }));
        }

        // Set default badges (would come from achievements table)
        setUserData(prev => ({
          ...prev,
          badges: [
            { id: 1, name: "Early Bird", icon: "Sunrise", earned: true },
            { id: 2, name: "Step Master", icon: "Footprints", earned: true },
            { id: 3, name: "Nutrition Pro", icon: "Apple", earned: false },
            { id: 4, name: "Sleep Champion", icon: "Moon", earned: false },
            { id: 5, name: "Hydration Hero", icon: "Droplets", earned: false }
          ],
          streakDays: 12 // Would be calculated from consistent tracking
        }));

      } catch (error) {
        console.error('Error fetching goal data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId, goals]);

  // Helper functions
  const getIconForCategory = (category) => {
    const iconMap = {
      activity: "Activity",
      nutrition: "Apple", 
      sleep: "Moon",
      wellness: "Heart",
      fitness: "Dumbbell",
      weight_loss: "Scale",
      weight_gain: "TrendingUp",
      health_metric: "BarChart2"
    };
    return iconMap[category] || "Target";
  };

  const getColorForCategory = (category) => {
    const colorMap = {
      activity: "info",
      nutrition: "success",
      sleep: "purple", 
      wellness: "primary-500",
      fitness: "warning",
      weight_loss: "error",
      weight_gain: "success",
      health_metric: "info"
    };
    return colorMap[category] || "primary-500";
  };

  const filteredGoals = activeCategory === "all" 
    ? userData.goals 
    : userData.goals.filter(goal => goal.category === activeCategory);

  const categories = [
    { id: "all", name: "All Goals", icon: "LayoutGrid" },
    { id: "activity", name: "Activity", icon: "Activity" },
    { id: "nutrition", name: "Nutrition", icon: "Apple" },
    { id: "sleep", name: "Sleep", icon: "Moon" },
    { id: "wellness", name: "Wellness", icon: "Heart" }
  ];

  const handleGoalClick = (goal) => {
    setSelectedGoal(goal);
    setShowCreateModal(true);
  };

  const handleCreateGoal = () => {
    setSelectedGoal(null);
    setShowCreateModal(true);
  };

  const handleCloseModal = () => {
    setShowCreateModal(false);
    setSelectedGoal(null);
  };

  if (loading || goalsLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading goals...</p>
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
              <h2 className="heading-2 text-gray-900">Hi, {userData.name.split(" ")[0] || "User"}</h2>
              <p className="body-small text-gray-500">Let's achieve your health goals</p>
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
        {/* Page Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="display-medium text-gray-900">Goal Setting</h1>
            <p className="body-medium text-gray-500 mt-1">Track and manage your health objectives</p>
          </div>
          <button 
            onClick={handleCreateGoal}
            className="button-text bg-primary-500 text-white px-4 py-2 rounded-button hover:bg-primary-600 transition-colors flex items-center"
          >
            <Icon name="Plus" size={18} className="mr-1" color="white" />
            New Goal
          </button>
        </div>

        {/* Streak and Achievements Section */}
        <section className="mb-8">
          <div className="bg-white rounded-card shadow-card p-6">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
              <div className="mb-4 md:mb-0">
                <div className="flex items-center">
                  <div className="bg-primary-500 bg-opacity-10 p-3 rounded-full mr-4">
                    <Icon name="Flame" size={24} color="var(--color-primary)" />
                  </div>
                  <div>
                    <h3 className="heading-1 text-gray-900">Current Streak</h3>
                    <div className="flex items-baseline">
                      <span className="display-medium text-primary-500">{userData.streakDays}</span>
                      <span className="body-medium text-gray-500 ml-2">days</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <AchievementBadges badges={userData.badges} />
            </div>
          </div>
        </section>

        {/* Category Tabs */}
        <GoalCategorySection 
          categories={categories} 
          activeCategory={activeCategory} 
          setActiveCategory={setActiveCategory} 
        />

        {/* Goals Grid */}
        <section className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredGoals.map(goal => (
              <GoalCard 
                key={goal.id} 
                goal={goal} 
                onClick={() => handleGoalClick(goal)} 
              />
            ))}
          </div>
          
          {filteredGoals.length === 0 && (
            <div className="bg-white rounded-card shadow-card p-8 text-center">
              <div className="bg-gray-100 p-4 rounded-full inline-block mb-4">
                <Icon name="Search" size={32} color="var(--color-gray-500)" />
              </div>
              <h3 className="heading-1 text-gray-900 mb-2">No goals found</h3>
              <p className="body-medium text-gray-500 mb-4">You don't have any goals in this category yet.</p>
              <button 
                onClick={handleCreateGoal}
                className="button-text bg-primary-500 text-white px-4 py-2 rounded-button hover:bg-primary-600 transition-colors"
              >
                Create New Goal
              </button>
            </div>
          )}
        </section>

        {/* Goal Suggestions */}
        <section className="mb-8">
          <h2 className="heading-1 text-gray-900 mb-4">Suggested Goals for You</h2>
          <div className="bg-white rounded-card shadow-card p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 border border-gray-200 rounded-card hover:shadow-card transition-shadow cursor-pointer" onClick={handleCreateGoal}>
                <div className="flex items-center mb-3">
                  <div className="bg-info bg-opacity-10 p-2 rounded-full mr-3">
                    <Icon name="Heart" size={20} color="var(--color-info)" />
                  </div>
                  <h3 className="heading-2 text-gray-900">Lower Resting Heart Rate</h3>
                </div>
                <p className="body-small text-gray-500">Improve cardiovascular fitness through regular aerobic exercise</p>
              </div>
              
              <div className="p-4 border border-gray-200 rounded-card hover:shadow-card transition-shadow cursor-pointer" onClick={handleCreateGoal}>
                <div className="flex items-center mb-3">
                  <div className="bg-success bg-opacity-10 p-2 rounded-full mr-3">
                    <Icon name="Salad" size={20} color="var(--color-success)" />
                  </div>
                  <h3 className="heading-2 text-gray-900">Increase Vegetable Intake</h3>
                </div>
                <p className="body-small text-gray-500">Add one additional serving of vegetables to each meal</p>
              </div>
              
              <div className="p-4 border border-gray-200 rounded-card hover:shadow-card transition-shadow cursor-pointer" onClick={handleCreateGoal}>
                <div className="flex items-center mb-3">
                  <div className="bg-purple bg-opacity-10 p-2 rounded-full mr-3">
                    <Icon name="BedDouble" size={20} color="var(--color-purple)" />
                  </div>
                  <h3 className="heading-2 text-gray-900">Consistent Sleep Schedule</h3>
                </div>
                <p className="body-small text-gray-500">Go to bed and wake up at the same time every day</p>
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
        <Link to="/goal-setting" className="flex flex-col items-center">
          <Icon name="Target" size={24} color="var(--color-primary)" />
          <span className="label text-primary-500 mt-1">Goals</span>
        </Link>
      </nav>

      {/* Create/Edit Goal Modal */}
      {showCreateModal && (
        <CreateGoalModal 
          goal={selectedGoal} 
          onClose={handleCloseModal} 
        />
      )}

      {/* Selected Goal Milestones Modal */}
      {selectedGoal && (
        <GoalMilestones 
          goal={selectedGoal} 
          isVisible={false} 
          onClose={() => setSelectedGoal(null)} 
        />
      )}

      {/* Padding to account for fixed bottom nav */}
      <div className="h-20"></div>
    </div>
  );
};

export default GoalSetting;