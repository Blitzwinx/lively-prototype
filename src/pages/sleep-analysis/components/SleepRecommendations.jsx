import React from "react";
import Icon from "../../../components/AppIcon";

const SleepRecommendations = ({ recommendations }) => {
  return (
    <div className="bg-white rounded-card shadow-card p-4 h-full">
      <div className="space-y-4">
        {recommendations.map((recommendation) => {
          // Determine priority badge color
          let priorityColor = "bg-gray-100 text-gray-700";
          if (recommendation.priority === "high") {
            priorityColor = "bg-error bg-opacity-10 text-error";
          } else if (recommendation.priority === "medium") {
            priorityColor = "bg-warning bg-opacity-10 text-warning";
          }
          
          return (
            <div key={recommendation.id} className="p-3 hover:bg-gray-50 rounded-md transition-colors">
              <div className="flex items-start">
                <div className="bg-primary-500 bg-opacity-10 p-2 rounded-full mr-3 flex-shrink-0">
                  <Icon name={recommendation.icon} size={20} color="var(--color-primary)" />
                </div>
                <div className="flex-grow">
                  <div className="flex justify-between items-start">
                    <h3 className="heading-2 text-gray-900">{recommendation.title}</h3>
                    <span className={`label px-2 py-1 rounded-full text-xs uppercase ${priorityColor}`}>
                      {recommendation.priority}
                    </span>
                  </div>
                  <p className="body-medium text-gray-700 mt-1">{recommendation.description}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SleepRecommendations;