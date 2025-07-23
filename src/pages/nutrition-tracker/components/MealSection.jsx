import React, { useState } from "react";
import Icon from "../../../components/AppIcon";

const MealSection = ({ meal, onAddFood }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-white rounded-card shadow-card overflow-hidden">
      {/* Meal Header */}
      <div 
        className="p-4 flex justify-between items-center cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center">
          <div className="bg-primary-500 bg-opacity-10 p-2 rounded-full mr-3">
            <Icon 
              name={
                meal.name === "Breakfast" ? "Coffee" : meal.name ==="Lunch"? "Utensils" : meal.name ==="Dinner" ? "UtensilsCrossed" : "Apple"
              } 
              size={20} 
              color="var(--color-primary)" 
            />
          </div>
          <div>
            <h3 className="heading-2 text-gray-900">{meal.name}</h3>
            <p className="body-small text-gray-500">{meal.time}</p>
          </div>
        </div>
        <div className="flex items-center">
          <span className="body-medium text-gray-900 mr-3">{meal.totalCalories} kcal</span>
          <Icon 
            name={isExpanded ? "ChevronUp" : "ChevronDown"} 
            size={20} 
            color="var(--color-gray-500)" 
          />
        </div>
      </div>
      
      {/* Meal Details */}
      {isExpanded && (
        <div className="px-4 pb-4">
          <div className="border-t border-gray-200 pt-3 mb-3">
            {meal.foods.map((food) => (
              <div key={food.id} className="flex justify-between items-center py-2">
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
            ))}
          </div>
          
          <button 
            className="w-full flex items-center justify-center p-2 border border-primary-500 text-primary-500 rounded-button hover:bg-primary-500 hover:bg-opacity-10 transition-colors button-text"
            onClick={(e) => {
              e.stopPropagation();
              onAddFood();
            }}
          >
            <Icon name="Plus" size={16} className="mr-1" />
            Add Food to {meal.name}
          </button>
        </div>
      )}
    </div>
  );
};

export default MealSection;