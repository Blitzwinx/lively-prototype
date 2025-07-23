import React from "react";
import Icon from "../../../components/AppIcon";

const SleepMetrics = ({ metric }) => {
  // Determine trend icon and color
  let trendIcon = "Minus";
  let trendColor = "var(--color-gray-500)";
  
  if (metric.trend === "up") {
    trendIcon = "TrendingUp";
    trendColor = "var(--color-success)";
  } else if (metric.trend === "down") {
    trendIcon = "TrendingDown";
    trendColor = metric.change.includes("-") ? "var(--color-error)" : "var(--color-success)";
  }

  // Determine metric color
  const metricColor = `var(--color-${metric.color})`;

  // Cap progress at 100% for display purposes
  const displayProgress = Math.min(metric.progress, 1) * 100;

  return (
    <div className="bg-white rounded-card shadow-card p-4 h-full">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center">
          <div 
            className="p-2 rounded-full mr-2" 
            style={{ backgroundColor: `${metricColor}20` }}
          >
            <Icon name={metric.icon} size={18} color={metricColor} />
          </div>
          <span className="body-medium text-gray-700">{metric.name}</span>
        </div>
        <div className="flex items-center">
          <Icon name={trendIcon} size={16} color={trendColor} />
          <span className="body-small ml-1" style={{ color: trendColor }}>{metric.change}</span>
        </div>
      </div>
      
      <div className="mt-3">
        <div className="flex items-baseline">
          <span className="heading-1 text-gray-900">{metric.value}</span>
          {metric.unit && <span className="body-small text-gray-500 ml-1">{metric.unit}</span>}
        </div>
        <div className="mt-2">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="h-2 rounded-full" 
              style={{ 
                width: `${displayProgress}%`,
                backgroundColor: metricColor
              }}
            ></div>
          </div>
          <div className="flex justify-between mt-1">
            <span className="body-small text-gray-500">Target: {metric.target}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SleepMetrics;