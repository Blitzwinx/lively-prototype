import React, { useState } from "react";
import { Link } from "react-router-dom";
import Icon from "../../components/AppIcon";

import DailyNutritionSummary from "./components/DailyNutritionSummary";
import MacronutrientChart from "./components/MacronutrientChart";
import MealSection from "./components/MealSection";
import WaterIntakeTracker from "./components/WaterIntakeTracker";
import NutritionalInsights from "./components/NutritionalInsights";
import AddFoodModal from "./components/AddFoodModal";

const NutritionTracker = () => {
  const [showAddFoodModal, setShowAddFoodModal] = useState(false);
  const [selectedMeal, setSelectedMeal] = useState(null);
  
  const nutritionData = {
    date: new Date(),
    calories: {
      consumed: 1840,
      goal: 2200
    },
    macros: [
      { name: "Protein", value: 95, goal: 120, unit: "g", color: "success" },
      { name: "Carbs", value: 210, goal: 250, unit: "g", color: "warning" },
      { name: "Fat", value: 55, goal: 70, unit: "g", color: "error" }
    ],
    meals: [
      {
        id: 1,
        name: "Breakfast",
        time: "8:00 AM",
        totalCalories: 420,
        foods: [
          { id: 101, name: "Oatmeal with Berries", calories: 240, protein: 8, carbs: 40, fat: 5, quantity: "1 bowl" },
          { id: 102, name: "Greek Yogurt", calories: 120, protein: 15, carbs: 8, fat: 2, quantity: "1 cup" },
          { id: 103, name: "Black Coffee", calories: 5, protein: 0, carbs: 1, fat: 0, quantity: "1 cup" },
          { id: 104, name: "Almonds", calories: 55, protein: 2, carbs: 2, fat: 5, quantity: "10g" }
        ]
      },
      {
        id: 2,
        name: "Lunch",
        time: "12:30 PM",
        totalCalories: 640,
        foods: [
          { id: 201, name: "Grilled Chicken Salad", calories: 350, protein: 35, carbs: 15, fat: 18, quantity: "1 bowl" },
          { id: 202, name: "Whole Grain Bread", calories: 180, protein: 6, carbs: 30, fat: 3, quantity: "2 slices" },
          { id: 203, name: "Olive Oil Dressing", calories: 110, protein: 0, carbs: 0, fat: 12, quantity: "1 tbsp" }
        ]
      },
      {
        id: 3,
        name: "Snack",
        time: "3:30 PM",
        totalCalories: 180,
        foods: [
          { id: 301, name: "Apple", calories: 95, protein: 0, carbs: 25, fat: 0, quantity: "1 medium" },
          { id: 302, name: "Peanut Butter", calories: 85, protein: 4, carbs: 3, fat: 7, quantity: "1 tbsp" }
        ]
      },
      {
        id: 4,
        name: "Dinner",
        time: "7:00 PM",
        totalCalories: 600,
        foods: [
          { id: 401, name: "Salmon Fillet", calories: 280, protein: 35, carbs: 0, fat: 15, quantity: "150g" },
          { id: 402, name: "Brown Rice", calories: 150, protein: 3, carbs: 32, fat: 1, quantity: "1 cup" },
          { id: 403, name: "Steamed Broccoli", calories: 55, protein: 4, carbs: 10, fat: 0, quantity: "1 cup" },
          { id: 404, name: "Olive Oil", calories: 115, protein: 0, carbs: 0, fat: 13, quantity: "1 tbsp" }
        ]
      }
    ],
    water: {
      consumed: 1.8,
      goal: 2.5,
      unit: "L"
    },
    recentFoods: [
      { id: 501, name: "Banana", calories: 105, protein: 1, carbs: 27, fat: 0, quantity: "1 medium" },
      { id: 502, name: "Egg", calories: 70, protein: 6, carbs: 0, fat: 5, quantity: "1 large" },
      { id: 503, name: "Avocado", calories: 240, protein: 3, carbs: 12, fat: 22, quantity: "1 medium" },
      { id: 504, name: "Chicken Breast", calories: 165, protein: 31, carbs: 0, fat: 3.6, quantity: "100g" },
      { id: 505, name: "Spinach", calories: 23, protein: 2.9, carbs: 3.6, fat: 0.4, quantity: "100g" }
    ],
    favoriteFoods: [
      { id: 601, name: "Greek Yogurt", calories: 120, protein: 15, carbs: 8, fat: 2, quantity: "1 cup" },
      { id: 602, name: "Oatmeal", calories: 150, protein: 5, carbs: 27, fat: 2.5, quantity: "1 cup" },
      { id: 603, name: "Grilled Chicken Breast", calories: 165, protein: 31, carbs: 0, fat: 3.6, quantity: "100g" },
      { id: 604, name: "Salmon", calories: 280, protein: 35, carbs: 0, fat: 15, quantity: "150g" }
    ],
    insights: [
      {
        id: 1,
        title: "Protein Intake Trending Low",
        description: "Your protein intake has been below target for the past 3 days. Consider adding more lean protein sources to your meals.",
        type: "warning"
      },
      {
        id: 2,
        title: "Great Hydration Streak!",
        description: "You\'ve met your water intake goals 5 days in a row. Keep up the good work!",
        type: "success"
      },
      {
        id: 3,
        title: "Balanced Macros Today",
        description: "Your macronutrient distribution today is well-balanced and aligns with your fitness goals.",
        type: "info"
      }
    ]
  };

  const handleAddFood = (mealId) => {
    setSelectedMeal(mealId);
    setShowAddFoodModal(true);
  };

  const handleCloseModal = () => {
    setShowAddFoodModal(false);
    setSelectedMeal(null);
  };

  // Format date
  const formatDate = (date) => {
    const options = { weekday: 'long', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-card sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <Link to="/home-screen" className="mr-3">
              <Icon name="ChevronLeft" size={24} color="var(--color-gray-700)" />
            </Link>
            <div>
              <h2 className="heading-1 text-gray-900">Nutrition Tracker</h2>
              <p className="body-small text-gray-500">{formatDate(nutritionData.date)}</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
              <Icon name="Calendar" size={20} color="var(--color-gray-700)" />
            </button>
            <Link to="/goal-setting" className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
              <Icon name="Target" size={20} color="var(--color-gray-700)" />
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        {/* Daily Summary */}
        <section className="mb-8">
          <div className="bg-white rounded-card shadow-card p-6">
            <h2 className="heading-1 text-gray-900 mb-4">Daily Summary</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <DailyNutritionSummary calories={nutritionData.calories} />
              <MacronutrientChart macros={nutritionData.macros} />
            </div>
          </div>
        </section>

        {/* Water Intake */}
        <section className="mb-8">
          <WaterIntakeTracker water={nutritionData.water} />
        </section>

        {/* Meals */}
        <section className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="heading-1 text-gray-900">Today's Meals</h2>
            <button 
              className="button-text bg-primary-500 text-white px-4 py-2 rounded-button hover:bg-primary-600 transition-colors flex items-center"
              onClick={() => handleAddFood(null)}
            >
              <Icon name="Plus" size={16} className="mr-1" />
              Add Food
            </button>
          </div>
          
          <div className="space-y-4">
            {nutritionData.meals.map((meal) => (
              <MealSection 
                key={meal.id} 
                meal={meal} 
                onAddFood={() => handleAddFood(meal.id)} 
              />
            ))}
          </div>
        </section>

        {/* Nutritional Insights */}
        <section className="mb-8">
          <NutritionalInsights insights={nutritionData.insights} />
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
          <Icon name="Apple" size={24} color="var(--color-primary)" />
          <span className="label text-primary-500 mt-1">Nutrition</span>
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

      {/* Add Food Modal */}
      {showAddFoodModal && (
        <AddFoodModal 
          onClose={handleCloseModal} 
          mealId={selectedMeal}
          recentFoods={nutritionData.recentFoods}
          favoriteFoods={nutritionData.favoriteFoods}
          meals={nutritionData.meals}
        />
      )}

      {/* Padding to account for fixed bottom nav */}
      <div className="h-20"></div>
    </div>
  );
};

export default NutritionTracker;