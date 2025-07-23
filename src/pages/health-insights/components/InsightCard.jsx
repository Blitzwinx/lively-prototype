import React, { useState } from "react";
import Icon from "../../../components/AppIcon";

const InsightCard = ({ insight }) => {
  const [expanded, setExpanded] = useState(false);

  let priorityColor = "var(--color-gray-500)";
  let priorityBg = "var(--color-gray-100)";
  
  if (insight.priority === "high") {
    priorityColor = "var(--color-error)";
    priorityBg = "rgba(239, 68, 68, 0.1)";
  } else if (insight.priority === "medium") {
    priorityColor = "var(--color-warning)";
    priorityBg = "rgba(245, 158, 11, 0.1)";
  } else if (insight.priority === "low") {
    priorityColor = "var(--color-success)";
    priorityBg = "rgba(34, 197, 94, 0.1)";
  }
  
  let trendIcon = "Minus";
  let trendColor = "var(--color-gray-500)";
  
  if (insight.trend === "up") {
    trendIcon = "TrendingUp";
    trendColor = insight.category === "sleep"|| insight.category === "fitness" ?"var(--color-success)" : insight.category ==="cardiovascular" ?"var(--color-error)" :"var(--color-success)";
  } else if (insight.trend === "down") {
    trendIcon = "TrendingDown";
    trendColor = insight.category === "nutrition"|| insight.category === "sleep" ?"var(--color-error)" : insight.category ==="cardiovascular" ?"var(--color-success)" :"var(--color-error)";
  }

  let categoryColor = "var(--color-primary)";
  if (insight.category === "cardiovascular") categoryColor = "var(--color-error)";
  if (insight.category === "sleep") categoryColor = "var(--color-purple)";
  if (insight.category === "nutrition") categoryColor = "var(--color-warning)";
  if (insight.category === "fitness") categoryColor = "var(--color-info)";
  if (insight.category === "metabolic") categoryColor = "var(--color-success)";

  return (
    <div className="bg-white rounded-card shadow-card overflow-hidden">
      <div className="p-4">
        <div className="flex justify-between items-start mb-3">
          <div 
            className="p-2 rounded-full" 
            style={{ backgroundColor: `${categoryColor}20` }}
          >
            <Icon name={insight.icon} size={20} color={categoryColor} />
          </div>
          <div 
            className="px-2 py-1 rounded-full text-xs font-medium"
            style={{ backgroundColor: priorityBg, color: priorityColor }}
          >
            {insight.priority.charAt(0).toUpperCase() + insight.priority.slice(1)} Priority
          </div>
        </div>
        
        <h3 className="heading-1 text-gray-900 mb-2">{insight.title}</h3>
        
        <p className="body-medium text-gray-700 mb-3">{insight.description}</p>
        
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center">
            <Icon name="Clock" size={14} color="var(--color-gray-500)" className="mr-1" />
            <span className="body-small text-gray-500">{insight.timeframe}</span>
          </div>
          <div className="flex items-center">
            <Icon name={trendIcon} size={16} color={trendColor} className="mr-1" />
            <span className="body-small" style={{ color: trendColor }}>{insight.trendValue}</span>
          </div>
        </div>
        
        <button 
          onClick={() => setExpanded(!expanded)}
          className="button-text text-primary-500 hover:text-primary-600 transition-colors flex items-center"
        >
          {expanded ? "Hide Recommendations" : "View Recommendations"}
          <Icon 
            name={expanded ? "ChevronUp" : "ChevronDown"} 
            size={16} 
            color="var(--color-primary)" className="ml-1" 
          />
        </button>
      </div>
      
      {expanded && (
        <div className="bg-gray-50 p-4 border-t border-gray-200">
          <h4 className="heading-2 text-gray-900 mb-2">Recommendations</h4>
          <ul className="space-y-2">
            {insight.recommendations.map((recommendation, index) => (
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
          <div className="mt-3 flex justify-end">
            <button className="button-text bg-primary-500 text-white px-3 py-1.5 rounded-button hover:bg-primary-600 transition-colors">
              Add to Goals
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default InsightCard;