import React from "react";
import Icon from "../../../components/AppIcon";

const EnvironmentalFactors = ({ factors }) => {
  return (
    <div className="bg-white rounded-card shadow-card p-4 h-full">
      <div className="space-y-4">
        {factors.map((factor) => {
          // Determine status color
          let statusColor = "var(--color-error)";
          if (factor.status === "optimal") {
            statusColor = "var(--color-success)";
          } else if (factor.status === "good") {
            statusColor = "var(--color-warning)";
          }
          
          return (
            <div key={factor.id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-md transition-colors">
              <div className="flex items-center">
                <div 
                  className="p-2 rounded-full mr-3 flex-shrink-0" 
                  style={{ backgroundColor: `var(--color-${factor.color})20` }}
                >
                  <Icon name={factor.icon} size={20} color={`var(--color-${factor.color})`} />
                </div>
                <div>
                  <h3 className="body-medium text-gray-900">{factor.name}</h3>
                  <p className="body-small text-gray-500">Ideal: {factor.ideal}</p>
                </div>
              </div>
              <div className="flex items-center">
                <span className="body-medium text-gray-900 mr-2">{factor.value}</span>
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: statusColor }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default EnvironmentalFactors;