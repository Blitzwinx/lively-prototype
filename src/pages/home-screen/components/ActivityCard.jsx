import React from "react";
import Icon from "../../../components/AppIcon";

const ActivityCard = ({ activity }) => {
  // Determine activity color
  const activityColor = activity.color.startsWith("primary") ?"var(--color-primary)" 
    : `var(--color-${activity.color})`;

  return (
    <div className="bg-white rounded-card shadow-card p-4 flex items-center">
      <div 
        className="p-3 rounded-full mr-4 flex-shrink-0" 
        style={{ backgroundColor: `${activityColor}20` }}
      >
        <Icon name={activity.icon} size={24} color={activityColor} />
      </div>
      
      <div className="flex-grow">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="heading-2 text-gray-900">{activity.type}</h3>
            <p className="body-small text-gray-500">{activity.time}</p>
          </div>
          <div className="text-right">
            <p className="body-medium text-gray-900">{activity.duration}</p>
            <p className="body-small text-gray-500">{activity.calories} kcal</p>
          </div>
        </div>
        
        <div className="mt-2 flex items-center">
          <Icon name="MapPin" size={14} color="var(--color-gray-500)" />
          <span className="body-small text-gray-500 ml-1">{activity.distance}</span>
        </div>
      </div>
    </div>
  );
};

export default ActivityCard;