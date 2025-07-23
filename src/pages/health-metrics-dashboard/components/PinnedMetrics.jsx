import React from "react";
import Icon from "../../../components/AppIcon";
import MetricChart from "./MetricChart";

const PinnedMetrics = ({ metrics, onMetricSelect, onTogglePin }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {metrics.map((metric) => (
        <div 
          key={metric.id}
          className="bg-white rounded-card shadow-card p-4 cursor-pointer hover:shadow-elevated transition-shadow"
          onClick={() => onMetricSelect(metric)}
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center">
              <div 
                className="p-2 rounded-full mr-2" 
                style={{ backgroundColor: `var(--color-${metric.color})20` }}
              >
                <Icon name={metric.icon} size={20} color={`var(--color-${metric.color})`} />
              </div>
              <span className="heading-2 text-gray-900">{metric.name}</span>
            </div>
            <button 
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                onTogglePin(metric.id);
              }}
            >
              <Icon 
                name="Pin" 
                size={16} 
                color="var(--color-primary)" 
              />
            </button>
          </div>
          
          <div className="flex items-baseline mb-3">
            <span className="display-medium text-gray-900">{metric.value}</span>
            <span className="body-medium text-gray-500 ml-1">{metric.unit}</span>
          </div>
          
          <div className="h-32 mb-2">
            <MetricChart metric={metric} />
          </div>
          
          <div className="flex justify-between items-center">
            <span 
              className={`label px-2 py-1 rounded-full text-white`}
              style={{ backgroundColor: `var(--color-${metric.color})` }}
            >
              {metric.status.toUpperCase()}
            </span>
            <div className="flex items-center">
              {metric.changeType === "up"&& ( <Icon name="TrendingUp" size={16} color="var(--color-success)" className="mr-1" />
              )}
              {metric.changeType === "down" && (
                <Icon 
                  name="TrendingDown" 
                  size={16} 
                  color={metric.change.includes("-") ? "var(--color-error)" : "var(--color-success)"} 
                  className="mr-1" 
                />
              )}
              {metric.changeType === "stable" && ( <Icon name="Minus" size={16} color="var(--color-gray-500)" className="mr-1" />
              )}
              <span className="body-small text-gray-700">{metric.change} from last week</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PinnedMetrics;