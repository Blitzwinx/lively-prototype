import React from "react";
import Icon from "../../../components/AppIcon";

const ActivityMetric = ({ icon, name, current, target, unit, progress, color }) => {
  // Determine metric color
  const metricColor = `var(--color-${color})`;

  // Calculate the circumference of the circle
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  
  // Calculate the dash offset based on the progress
  const dashOffset = circumference * (1 - progress / 100);

  return (
    <div className="bg-white rounded-card shadow-card p-4 h-full">
      <div className="flex flex-col items-center">
        <div className="relative w-24 h-24 mb-3">
          {/* Background circle */}
          <svg className="absolute w-full h-full" viewBox="0 0 100 100">
            <circle
              cx="50" cy="50"
              r={radius}
              fill="none" stroke="var(--color-gray-200)" strokeWidth="8"
            />
            {/* Progress circle */}
            <circle
              cx="50" cy="50"
              r={radius}
              fill="none"
              stroke={metricColor}
              strokeWidth="8" strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={dashOffset}
              transform="rotate(-90 50 50)"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div 
              className="p-2 rounded-full mb-1" 
              style={{ backgroundColor: `${metricColor}20` }}
            >
              <Icon name={icon} size={16} color={metricColor} />
            </div>
            <span className="heading-1 text-gray-900">{current}</span>
            <span className="body-small text-gray-500">{unit}</span>
          </div>
        </div>
        
        <div className="text-center">
          <h3 className="body-medium text-gray-700 mb-1">{name}</h3>
          <p className="body-small text-gray-500">Goal: {target} {unit}</p>
        </div>
      </div>
    </div>
  );
};

export default ActivityMetric;