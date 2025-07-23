import React from "react";
import Icon from "../../../components/AppIcon";

const MetricCard = ({ metric, isPinned, onTogglePin, onSelect }) => {
  let trendIcon = "Minus";
  let trendColor = "var(--color-gray-500)";
  
  if (metric.changeType === "up") {
    trendIcon = "TrendingUp";
    trendColor = "var(--color-success)";
  } else if (metric.changeType === "down") {
    trendIcon = "TrendingDown";
    trendColor = metric.change.includes("-") ? "var(--color-error)" : "var(--color-success)";
  }

  const metricColor = `var(--color-${metric.color})`;

  return (
    <div 
      className="bg-white rounded-card shadow-card p-4 h-full transition-transform hover:shadow-elevated cursor-pointer"
      onClick={onSelect}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center">
          <div 
            className="p-2 rounded-full mr-2" 
            style={{ backgroundColor: `${metricColor}20` }}
          >
            <Icon name={metric.icon} size={20} color={metricColor} />
          </div>
          <span className="heading-2 text-gray-900">{metric.name}</span>
        </div>
        <button 
          className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          onClick={(e) => {
            e.stopPropagation();
            onTogglePin();
          }}
        >
          <Icon 
            name={isPinned ? "Pin" : "PinOff"} 
            size={16} 
            color={isPinned ? "var(--color-primary)" : "var(--color-gray-500)"} 
          />
        </button>
      </div>
      
      <div className="flex items-baseline mb-2">
        <span className="display-medium text-gray-900">{metric.value}</span>
        <span className="body-medium text-gray-500 ml-1">{metric.unit}</span>
        <div className="flex items-center ml-3">
          <Icon name={trendIcon} size={16} color={trendColor} />
          <span className="body-small ml-1" style={{ color: trendColor }}>{metric.change}</span>
        </div>
      </div>
      
      <div className="body-small text-gray-700 mb-3">{metric.description}</div>
      
      <div className="flex justify-between items-center">
        <span 
          className={`label px-2 py-1 rounded-full text-white`}
          style={{ backgroundColor: metricColor }}
        >
          {metric.status.toUpperCase()}
        </span>
        <button className="flex items-center text-primary-500 button-text">
          Details
          <Icon name="ChevronRight" size={16} className="ml-1" />
        </button>
      </div>
    </div>
  );
};

export default MetricCard;