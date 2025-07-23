import React from "react";
import Icon from "../../../components/AppIcon";

const NutritionalInsights = ({ insights }) => {
  // Get icon based on insight type
  const getInsightIcon = (type) => {
    switch (type) {
      case "success":
        return "CheckCircle";
      case "warning":
        return "AlertTriangle";
      case "info":
        return "Info";
      default:
        return "Info";
    }
  };

  // Get color based on insight type
  const getInsightColor = (type) => {
    switch (type) {
      case "success":
        return "var(--color-success)";
      case "warning":
        return "var(--color-warning)";
      case "info":
        return "var(--color-info)";
      default:
        return "var(--color-info)";
    }
  };

  return (
    <div className="bg-white rounded-card shadow-card p-4">
      <div className="flex items-center mb-4">
        <div className="bg-primary-500 bg-opacity-10 p-2 rounded-full mr-3">
          <Icon name="LineChart" size={20} color="var(--color-primary)" />
        </div>
        <h3 className="heading-2 text-gray-900">Nutritional Insights</h3>
      </div>
      
      <div className="space-y-3">
        {insights.map((insight) => (
          <div 
            key={insight.id} 
            className="p-3 rounded-lg"
            style={{ backgroundColor: `${getInsightColor(insight.type)}10` }}
          >
            <div className="flex items-start">
              <div 
                className="p-1 rounded-full mr-2 mt-0.5"
                style={{ backgroundColor: `${getInsightColor(insight.type)}20` }}
              >
                <Icon 
                  name={getInsightIcon(insight.type)} 
                  size={16} 
                  color={getInsightColor(insight.type)} 
                />
              </div>
              <div>
                <h4 className="heading-2 text-gray-900">{insight.title}</h4>
                <p className="body-medium text-gray-700">{insight.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NutritionalInsights;