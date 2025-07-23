import React from "react";

const WeeklyTrends = ({ data }) => {
  // Find max hours for scaling
  const maxHours = Math.max(...data.map(day => day.hours)) + 1;
  
  return (
    <div className="bg-white rounded-card shadow-card p-4">
      <div className="flex justify-between items-center mb-4">
        <div>
          <span className="body-medium text-gray-500">Average Sleep Duration</span>
          <div className="heading-1 text-gray-900">
            {(data.reduce((sum, day) => sum + day.hours, 0) / data.length).toFixed(1)} hours
          </div>
        </div>
        <div>
          <span className="body-medium text-gray-500">Average Sleep Quality</span>
          <div className="heading-1 text-gray-900">
            {Math.round(data.reduce((sum, day) => sum + day.quality, 0) / data.length)}%
          </div>
        </div>
      </div>
      
      {/* Weekly Bar Chart */}
      <div className="mt-6 flex items-end justify-between h-40">
        {data.map((day, index) => {
          // Calculate bar height based on hours
          const barHeight = (day.hours / maxHours) * 100;
          
          // Determine color based on quality
          let barColor = "bg-error";
          if (day.quality >= 80) {
            barColor = "bg-success";
          } else if (day.quality >= 65) {
            barColor = "bg-warning";
          } else if (day.quality >= 50) {
            barColor = "bg-info";
          }
          
          // Check if it's the current day
          const isCurrentDay = index === data.length - 1;
          
          return (
            <div key={index} className="flex flex-col items-center w-1/7">
              <div className="text-xs text-gray-500 mb-1">{day.hours}h</div>
              <div 
                className={`w-8 ${barColor} rounded-t-md ${isCurrentDay ? 'ring-2 ring-primary-500' : ''}`}
                style={{ height: `${barHeight}%` }}
              ></div>
              <div className="mt-2 text-center">
                <div className={`body-medium ${isCurrentDay ? 'text-primary-500 font-medium' : 'text-gray-900'}`}>
                  {day.day}
                </div>
                <div className="body-small text-gray-500">{day.date}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WeeklyTrends;