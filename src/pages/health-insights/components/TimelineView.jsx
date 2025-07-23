import React from "react";
import Icon from "../../../components/AppIcon";

const TimelineView = ({ events }) => {
  return (
    <div className="bg-white rounded-card shadow-card p-4">
      <div className="relative">
        {/* Vertical timeline line */}
        <div className="absolute top-0 bottom-0 left-6 w-0.5 bg-gray-200"></div>
        
        {/* Timeline events */}
        <div className="space-y-6">
          {events.map((event, index) => {
            let iconBgColor = "var(--color-primary-light)";
            let iconColor = "var(--color-primary-dark)";
            
            if (event.icon === "Heart" || event.icon === "HeartPulse") {
              iconBgColor = "rgba(239, 68, 68, 0.2)";
              iconColor = "var(--color-error)";
            } else if (event.icon === "Moon") {
              iconBgColor = "rgba(168, 85, 247, 0.2)";
              iconColor = "var(--color-purple)";
            } else if (event.icon === "Utensils") {
              iconBgColor = "rgba(245, 158, 11, 0.2)";
              iconColor = "var(--color-warning)";
            } else if (event.icon === "Dumbbell") {
              iconBgColor = "rgba(59, 130, 246, 0.2)";
              iconColor = "var(--color-info)";
            }
            
            return (
              <div key={event.id} className="relative flex items-start">
                {/* Timeline dot */}
                <div 
                  className="absolute left-4 w-5 h-5 rounded-full border-4 border-white" style={{ backgroundColor: iconColor, top:"12px" }}
                ></div>
                
                {/* Event icon */}
                <div 
                  className="relative z-10 flex items-center justify-center w-12 h-12 rounded-full mr-4"
                  style={{ backgroundColor: iconBgColor }}
                >
                  <Icon name={event.icon} size={20} color={iconColor} />
                </div>
                
                {/* Event content */}
                <div className="flex-grow pt-1">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-1">
                    <h3 className="heading-2 text-gray-900">{event.title}</h3>
                    <span className="body-small text-gray-500 sm:ml-4">{event.date}</span>
                  </div>
                  <p className="body-medium text-gray-700 mb-2">{event.description}</p>
                  
                  {/* Metrics */}
                  <div className="flex flex-wrap gap-2">
                    {event.metrics.map((metric, metricIndex) => {
                      // Determine if change is positive or negative
                      const isPositive = metric.change.startsWith("+");
                      const changeColor = isPositive ? "var(--color-success)" : "var(--color-error)";
                      
                      return (
                        <div 
                          key={metricIndex}
                          className="bg-gray-100 rounded-md px-3 py-1.5 flex items-center"
                        >
                          <span className="body-small text-gray-700 mr-2">{metric.name}:</span>
                          <span className="body-small font-medium text-gray-900">{metric.value}</span>
                          <span 
                            className="body-small ml-2"
                            style={{ color: changeColor }}
                          >
                            {metric.change}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TimelineView;