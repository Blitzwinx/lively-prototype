import React, { useState } from "react";
import Icon from "../../../components/AppIcon";

const WaterIntakeTracker = ({ water }) => {
  const [waterAmount, setWaterAmount] = useState(water.consumed);
  
  const waterPercentage = Math.min(Math.round((waterAmount / water.goal) * 100), 100);
  
  const handleAddWater = (amount) => {
    const newAmount = Math.min(waterAmount + amount, water.goal * 1.5);
    setWaterAmount(newAmount);
  };

  return (
    <div className="bg-white rounded-card shadow-card p-4">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <div className="bg-info bg-opacity-10 p-2 rounded-full mr-3">
            <Icon name="Droplets" size={20} color="var(--color-info)" />
          </div>
          <h3 className="heading-2 text-gray-900">Water Intake</h3>
        </div>
        <div className="flex items-center">
          <span className="body-medium text-gray-900 font-medium">{waterAmount.toFixed(1)}</span>
          <span className="body-small text-gray-500 ml-1">/ {water.goal} {water.unit}</span>
        </div>
      </div>
      
      <div className="relative h-16 bg-gray-100 rounded-lg mb-4 overflow-hidden">
        <div 
          className="absolute bottom-0 left-0 right-0 bg-info bg-opacity-20 transition-all duration-500 ease-out"
          style={{ height: `${waterPercentage}%` }}
        >
          <div className="absolute top-0 left-0 right-0 h-2 bg-info bg-opacity-30 rounded-full"></div>
        </div>
        
        <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center">
          <span className="body-large text-gray-900 font-medium">{waterPercentage}%</span>
        </div>
      </div>
      
      <div className="flex justify-between items-center">
        <button 
          className="flex-1 flex items-center justify-center p-2 border border-info text-info rounded-l-button hover:bg-info hover:bg-opacity-10 transition-colors button-text"
          onClick={() => handleAddWater(0.1)}
        >
          <Icon name="Plus" size={16} className="mr-1" />
          100ml
        </button>
        <button 
          className="flex-1 flex items-center justify-center p-2 border-t border-b border-info text-info hover:bg-info hover:bg-opacity-10 transition-colors button-text"
          onClick={() => handleAddWater(0.25)}
        >
          <Icon name="Plus" size={16} className="mr-1" />
          250ml
        </button>
        <button 
          className="flex-1 flex items-center justify-center p-2 border border-info text-info rounded-r-button hover:bg-info hover:bg-opacity-10 transition-colors button-text"
          onClick={() => handleAddWater(0.5)}
        >
          <Icon name="Plus" size={16} className="mr-1" />
          500ml
        </button>
      </div>
    </div>
  );
};

export default WaterIntakeTracker;