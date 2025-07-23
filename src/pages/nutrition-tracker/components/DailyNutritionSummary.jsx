import React from "react";
import Icon from "../../../components/AppIcon";

const DailyNutritionSummary = ({ calories }) => {
  const caloriePercentage = Math.round((calories.consumed / calories.goal) * 100);
  
  // Determine color based on percentage
  let calorieColor = "var(--color-success)";
  if (caloriePercentage > 100) {
    calorieColor = "var(--color-error)";
  } else if (caloriePercentage > 90) {
    calorieColor = "var(--color-warning)";
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h3 className="heading-2 text-gray-900">Calories</h3>
        <div className="flex items-center">
          <Icon name="Info" size={16} color="var(--color-gray-500)" className="mr-1" />
          <span className="body-small text-gray-500">Daily Goal</span>
        </div>
      </div>
      
      <div className="flex items-end mb-4">
        <span className="display-large text-gray-900 mr-2">{calories.consumed}</span>
        <span className="body-medium text-gray-500 mb-1">/ {calories.goal} kcal</span>
      </div>
      
      <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
        <div 
          className="h-3 rounded-full" 
          style={{ 
            width: `${Math.min(caloriePercentage, 100)}%`,
            backgroundColor: calorieColor
          }}
        ></div>
      </div>
      
      <div className="flex justify-between items-center">
        <span className="body-small text-gray-500">0 kcal</span>
        <span className="body-small text-gray-700 font-medium">{caloriePercentage}%</span>
        <span className="body-small text-gray-500">{calories.goal} kcal</span>
      </div>
      
      <div className="mt-4 flex items-center">
        <div className="bg-info bg-opacity-10 p-2 rounded-full mr-2">
          <Icon name="Utensils" size={16} color="var(--color-info)" />
        </div>
        <span className="body-medium text-gray-700">
          {calories.goal - calories.consumed > 0 
            ? `${calories.goal - calories.consumed} kcal remaining` 
            : `${calories.consumed - calories.goal} kcal over goal`}
        </span>
      </div>
    </div>
  );
};

export default DailyNutritionSummary;