import React, { useState } from "react";
import Icon from "../../../components/AppIcon";
import MetricChart from "./MetricChart";

const MetricDetails = ({ metric, onClose, dateRange }) => {
  const [activeTab, setActiveTab] = useState("overview");
  
  const metricColor = `var(--color-${metric.color})`;
  
  let trendIcon = "Minus";
  let trendColor = "var(--color-gray-500)";
  
  if (metric.changeType === "up") {
    trendIcon = "TrendingUp";
    trendColor = "var(--color-success)";
  } else if (metric.changeType === "down") {
    trendIcon = "TrendingDown";
    trendColor = metric.change.includes("-") ? "var(--color-error)" : "var(--color-success)";
  }

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-card shadow-elevated w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <div className="flex items-center">
            <div 
              className="p-2 rounded-full mr-3" 
              style={{ backgroundColor: `${metricColor}20` }}
            >
              <Icon name={metric.icon} size={24} color={metricColor} />
            </div>
            <h2 className="heading-1 text-gray-900">{metric.name}</h2>
          </div>
          <button 
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            onClick={onClose}
          >
            <Icon name="X" size={20} color="var(--color-gray-700)" />
          </button>
        </div>
        
        {/* Tabs */}
        <div className="flex border-b border-gray-200">
          <button 
            className={`px-4 py-3 button-text ${
              activeTab === "overview" ?"text-primary-500 border-b-2 border-primary-500" :"text-gray-700 hover:text-gray-900"
            }`}
            onClick={() => setActiveTab("overview")}
          >
            Overview
          </button>
          <button 
            className={`px-4 py-3 button-text ${
              activeTab === "trends" ?"text-primary-500 border-b-2 border-primary-500" :"text-gray-700 hover:text-gray-900"
            }`}
            onClick={() => setActiveTab("trends")}
          >
            Trends
          </button>
          <button 
            className={`px-4 py-3 button-text ${
              activeTab === "insights" ?"text-primary-500 border-b-2 border-primary-500" :"text-gray-700 hover:text-gray-900"
            }`}
            onClick={() => setActiveTab("insights")}
          >
            Insights
          </button>
        </div>
        
        {/* Content */}
        <div className="p-4">
          {activeTab === "overview" && (
            <div>
              {/* Current Value */}
              <div className="bg-gray-50 rounded-card p-4 mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="body-medium text-gray-700">Current Value</span>
                  <div className="flex items-center">
                    <Icon name={trendIcon} size={16} color={trendColor} />
                    <span className="body-small ml-1" style={{ color: trendColor }}>{metric.change}</span>
                  </div>
                </div>
                <div className="flex items-baseline">
                  <span className="display-large text-gray-900">{metric.value}</span>
                  <span className="body-large text-gray-500 ml-2">{metric.unit}</span>
                </div>
                <div className="mt-2 body-medium text-gray-700">{metric.description}</div>
              </div>
              
              {/* Chart */}
              <div className="mb-6">
                <h3 className="heading-2 text-gray-900 mb-3">{dateRange.charAt(0).toUpperCase() + dateRange.slice(1)} Trend</h3>
                <div className="h-64 bg-white rounded-card shadow-card p-4">
                  <MetricChart metric={metric} />
                </div>
              </div>
              
              {/* Ranges */}
              <div>
                <h3 className="heading-2 text-gray-900 mb-3">Healthy Ranges</h3>
                <div className="bg-white rounded-card shadow-card p-4">
                  {Object.entries(metric.ranges).map(([key, range]) => (
                    <div key={key} className="flex justify-between items-center mb-3 last:mb-0">
                      <div className="flex items-center">
                        <div 
                          className="w-3 h-3 rounded-full mr-2"
                          style={{ 
                            backgroundColor: key === metric.status ? metricColor : "var(--color-gray-300)" 
                          }}
                        ></div>
                        <span className="body-medium text-gray-700">{range.label}</span>
                      </div>
                      <span className="body-medium text-gray-900">
                        {range.min} - {range.max} {metric.unit}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          
          {activeTab === "trends" && (
            <div>
              <div className="bg-white rounded-card shadow-card p-4 mb-6">
                <h3 className="heading-2 text-gray-900 mb-4">Long-term Trends</h3>
                <div className="h-64">
                  <MetricChart metric={metric} />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white rounded-card shadow-card p-4">
                  <h3 className="heading-2 text-gray-900 mb-3">Daily Patterns</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="body-medium text-gray-700">Morning Average</span>
                      <span className="body-medium text-gray-900">
                        {parseInt(metric.value) - 2} {metric.unit}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="body-medium text-gray-700">Afternoon Average</span>
                      <span className="body-medium text-gray-900">
                        {parseInt(metric.value)} {metric.unit}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="body-medium text-gray-700">Evening Average</span>
                      <span className="body-medium text-gray-900">
                        {parseInt(metric.value) + 2} {metric.unit}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-card shadow-card p-4">
                  <h3 className="heading-2 text-gray-900 mb-3">Comparison</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="body-medium text-gray-700">Your Average</span>
                      <span className="body-medium text-gray-900">
                        {metric.value} {metric.unit}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="body-medium text-gray-700">Population Average</span>
                      <span className="body-medium text-gray-900">
                        {parseInt(metric.value) + 5} {metric.unit}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="body-medium text-gray-700">Recommended</span>
                      <span className="body-medium text-gray-900">
                        {metric.ranges.normal.min} - {metric.ranges.normal.max} {metric.unit}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === "insights" && (
            <div>
              <div className="bg-white rounded-card shadow-card p-4 mb-6">
                <h3 className="heading-2 text-gray-900 mb-3">Key Insights</h3>
                <div className="space-y-4">
                  {metric.insights.map((insight, index) => (
                    <div key={index} className="flex items-start">
                      <div 
                        className="p-2 rounded-full mr-3 flex-shrink-0" 
                        style={{ backgroundColor: `${metricColor}20` }}
                      >
                        <Icon name="Lightbulb" size={16} color={metricColor} />
                      </div>
                      <p className="body-medium text-gray-700">{insight}</p>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="bg-white rounded-card shadow-card p-4">
                <h3 className="heading-2 text-gray-900 mb-3">Recommendations</h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="p-2 rounded-full mr-3 flex-shrink-0 bg-success bg-opacity-10">
                      <Icon name="CheckCircle" size={16} color="var(--color-success)" />
                    </div>
                    <div>
                      <p className="body-medium text-gray-900 font-medium">Maintain Current Habits</p>
                      <p className="body-small text-gray-700 mt-1">
                        Your {metric.name.toLowerCase()} is within healthy ranges. Continue your current routine.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="p-2 rounded-full mr-3 flex-shrink-0 bg-info bg-opacity-10">
                      <Icon name="Info" size={16} color="var(--color-info)" />
                    </div>
                    <div>
                      <p className="body-medium text-gray-900 font-medium">Track Consistently</p>
                      <p className="body-small text-gray-700 mt-1">
                        For more accurate insights, try to measure your {metric.name.toLowerCase()} at the same time each day.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="p-2 rounded-full mr-3 flex-shrink-0 bg-primary-500 bg-opacity-10">
                      <Icon name="BookOpen" size={16} color="var(--color-primary)" />
                    </div>
                    <div>
                      <p className="body-medium text-gray-900 font-medium">Learn More</p>
                      <p className="body-small text-gray-700 mt-1">
                        <a href="#" className="text-primary-500 hover:underline">Read our guide</a> on optimizing your {metric.name.toLowerCase()} for better health outcomes.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* Footer */}
        <div className="p-4 border-t border-gray-200 flex justify-between">
          <button className="px-4 py-2 rounded-button button-text bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors">
            Export Data
          </button>
          <button className="px-4 py-2 rounded-button button-text bg-primary-500 text-white hover:bg-primary-600 transition-colors">
            Set Goal
          </button>
        </div>
      </div>
    </div>
  );
};

export default MetricDetails;