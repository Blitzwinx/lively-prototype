import React, { useState } from "react";
import Icon from "../../../components/AppIcon";

const AddFoodModal = ({ onClose, mealId, recentFoods, favoriteFoods, meals }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("search");
  
  // Get meal name if mealId is provided
  const getMealName = () => {
    if (!mealId) return "Add Food";
    const meal = meals.find(m => m.id === mealId);
    return meal ? `Add Food to ${meal.name}` : "Add Food";
  };

  // Filter foods based on search query
  const filteredRecentFoods = recentFoods.filter(food => 
    food.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const filteredFavoriteFoods = favoriteFoods.filter(food => 
    food.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-card shadow-elevated w-full max-w-md max-h-[80vh] flex flex-col">
        {/* Modal Header */}
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <h3 className="heading-1 text-gray-900">{getMealName()}</h3>
          <button 
            className="p-1 rounded-full hover:bg-gray-100 transition-colors"
            onClick={onClose}
          >
            <Icon name="X" size={20} color="var(--color-gray-700)" />
          </button>
        </div>
        
        {/* Search Bar */}
        <div className="p-4 border-b border-gray-200">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Icon name="Search" size={16} color="var(--color-gray-500)" />
            </div>
            <input
              type="text" className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-button focus:ring-primary focus:ring-2 focus:outline-none" placeholder="Search foods..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        
        {/* Tabs */}
        <div className="flex border-b border-gray-200">
          <button
            className={`flex-1 py-3 button-text ${activeTab === 'search' ? 'text-primary-500 border-b-2 border-primary-500' : 'text-gray-500'}`}
            onClick={() => setActiveTab('search')}
          >
            Search
          </button>
          <button
            className={`flex-1 py-3 button-text ${activeTab === 'recent' ? 'text-primary-500 border-b-2 border-primary-500' : 'text-gray-500'}`}
            onClick={() => setActiveTab('recent')}
          >
            Recent
          </button>
          <button
            className={`flex-1 py-3 button-text ${activeTab === 'favorites' ? 'text-primary-500 border-b-2 border-primary-500' : 'text-gray-500'}`}
            onClick={() => setActiveTab('favorites')}
          >
            Favorites
          </button>
        </div>
        
        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4">
          {activeTab === 'search' && (
            <div>
              {searchQuery.length > 0 ? (
                <div className="space-y-3">
                  {filteredRecentFoods.length > 0 ? (
                    filteredRecentFoods.map(food => (
                      <FoodItem key={food.id} food={food} />
                    ))
                  ) : (
                    <div className="text-center py-6">
                      <Icon name="Search" size={40} color="var(--color-gray-300)" className="mx-auto mb-2" />
                      <p className="body-medium text-gray-500">No foods found matching "{searchQuery}"</p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-6">
                  <Icon name="Search" size={40} color="var(--color-gray-300)" className="mx-auto mb-2" />
                  <p className="body-medium text-gray-500">Search for foods to add to your meal</p>
                </div>
              )}
            </div>
          )}
          
          {activeTab === 'recent' && (
            <div className="space-y-3">
              {filteredRecentFoods.length > 0 ? (
                filteredRecentFoods.map(food => (
                  <FoodItem key={food.id} food={food} />
                ))
              ) : (
                <div className="text-center py-6">
                  <Icon name="Clock" size={40} color="var(--color-gray-300)" className="mx-auto mb-2" />
                  <p className="body-medium text-gray-500">No recent foods found</p>
                </div>
              )}
            </div>
          )}
          
          {activeTab === 'favorites' && (
            <div className="space-y-3">
              {filteredFavoriteFoods.length > 0 ? (
                filteredFavoriteFoods.map(food => (
                  <FoodItem key={food.id} food={food} />
                ))
              ) : (
                <div className="text-center py-6">
                  <Icon name="Heart" size={40} color="var(--color-gray-300)" className="mx-auto mb-2" />
                  <p className="body-medium text-gray-500">No favorite foods found</p>
                </div>
              )}
            </div>
          )}
        </div>
        
        {/* Footer */}
        <div className="p-4 border-t border-gray-200">
          <button 
            className="w-full bg-primary-500 text-white py-3 rounded-button hover:bg-primary-600 transition-colors button-text"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

// Food Item Component
const FoodItem = ({ food }) => {
  return (
    <div className="flex justify-between items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
      <div>
        <p className="body-medium text-gray-900">{food.name}</p>
        <p className="body-small text-gray-500">{food.quantity}</p>
      </div>
      <div className="text-right">
        <p className="body-medium text-gray-900">{food.calories} kcal</p>
        <p className="body-small text-gray-500">
          P: {food.protein}g • C: {food.carbs}g • F: {food.fat}g
        </p>
      </div>
    </div>
  );
};

export default AddFoodModal;