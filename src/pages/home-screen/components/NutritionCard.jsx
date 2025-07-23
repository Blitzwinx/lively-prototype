import React from "react";
import Icon from "../../../components/AppIcon";

const NutritionCard = ({ nutrition }) => {
  const { calories, macros, meals } = nutrition;
  const caloriePercentage = Math.round((calories.consumed / calories.target) * 100);

  return (
    <div className="bg-white rounded-card shadow-card p-4 h-full">
      {/* Calories Progress */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <h3 className="heading-2 text-gray-900">Calories</h3>
          <div className="flex items-center">
            <span className="body-medium text-gray-900 font-medium">{calories.consumed}</span>
            <span className="body-small text-gray-500 ml-1">/ {calories.target} kcal</span>
          </div>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div 
            className="h-2.5 rounded-full bg-warning" 
            style={{ width: `${caloriePercentage}%` }}
          ></div>
        </div>
      </div>

      {/* Macronutrients */}
      <div className="mb-4">
        <h3 className="heading-2 text-gray-900 mb-3">Macronutrients</h3>
        <div className="space-y-3">
          {macros.map((macro, index) => {
            const percentage = Math.round((macro.value / macro.target) * 100);
            return (
              <div key={index}>
                <div className="flex justify-between items-center mb-1">
                  <span className="body-medium text-gray-700">{macro.name}</span>
                  <div className="flex items-center">
                    <span className="body-medium text-gray-900 font-medium">{macro.value}</span>
                    <span className="body-small text-gray-500 ml-1">/ {macro.target} {macro.unit}</span>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1.5">
                  <div 
                    className={`h-1.5 rounded-full bg-${macro.color}`}
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Meals */}
      <div>
        <h3 className="heading-2 text-gray-900 mb-3">Today's Meals</h3>
        <div className="space-y-2">
          {meals.map((meal) => (
            <div key={meal.id} className="flex justify-between items-center p-2 hover:bg-gray-50 rounded-md transition-colors">
              <div className="flex items-center">
                <Icon name="UtensilsCrossed" size={16} color="var(--color-gray-500)" className="mr-2" />
                <div>
                  <p className="body-medium text-gray-900">{meal.name}</p>
                  <p className="body-small text-gray-500">{meal.time}</p>
                </div>
              </div>
              <span className="body-medium text-gray-700">{meal.calories} kcal</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NutritionCard;