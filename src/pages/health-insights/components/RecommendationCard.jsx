import React from "react";
import Icon from "../../../components/AppIcon";

const RecommendationCard = ({ title, description, recommendations, icon, color }) => {
  const iconColor = `var(--color-${color})`;
  const bgColor = `${iconColor}20`;

  return (
    <div className="bg-gray-50 rounded-card p-4 border border-gray-200">
      <div className="flex items-start mb-3">
        <div 
          className="p-2 rounded-full mr-3 flex-shrink-0" 
          style={{ backgroundColor: bgColor }}
        >
          <Icon name={icon} size={20} color={iconColor} />
        </div>
        <div>
          <h3 className="heading-1 text-gray-900">{title}</h3>
          <p className="body-medium text-gray-700 mt-1">{description}</p>
        </div>
      </div>
      
      <ul className="space-y-2 mb-3">
        {recommendations.map((recommendation, index) => (
          <li key={index} className="flex items-start">
            <Icon 
              name="CheckCircle" 
              size={16} 
              color="var(--color-success)" className="mr-2 flex-shrink-0 mt-0.5" 
            />
            <span className="body-medium text-gray-700">{recommendation}</span>
          </li>
        ))}
      </ul>
      
      <div className="flex justify-end">
        <button className="button-text bg-primary-500 text-white px-4 py-2 rounded-button hover:bg-primary-600 transition-colors">
          Apply to My Plan
        </button>
      </div>
    </div>
  );
};

export default RecommendationCard;