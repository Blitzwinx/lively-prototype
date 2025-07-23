import React from "react";
import Icon from "../../../components/AppIcon";

const SleepCycles = ({ data }) => {
  const { bedtime, wakeup, duration, cycles, stagePercentages } = data;
  
  // Colors for different sleep stages
  const stageColors = {
    awake: "#EF4444", // red-500
    light: "#3B82F6", // blue-500
    deep: "#14B8A6", // teal-500
    rem: "#A855F7", // purple-500
  };

  // Calculate total minutes for scaling
  const totalMinutes = cycles.reduce((sum, cycle) => sum + cycle.duration, 0);
  
  return (
    <div className="bg-white rounded-card shadow-card p-4">
      <div className="flex flex-wrap justify-between items-center mb-4">
        <div className="flex items-center mb-2 md:mb-0">
          <Icon name="Moon" size={18} color="var(--color-gray-700)" className="mr-2" />
          <span className="body-medium text-gray-700">Bedtime: {bedtime}</span>
        </div>
        <div className="flex items-center mb-2 md:mb-0">
          <Icon name="Sunrise" size={18} color="var(--color-gray-700)" className="mr-2" />
          <span className="body-medium text-gray-700">Wake up: {wakeup}</span>
        </div>
        <div className="flex items-center">
          <Icon name="Clock" size={18} color="var(--color-gray-700)" className="mr-2" />
          <span className="body-medium text-gray-700">Duration: {duration}</span>
        </div>
      </div>
      
      {/* Sleep Cycle Timeline */}
      <div className="mt-6 mb-4">
        <div className="relative h-16 w-full">
          {cycles.map((cycle, index) => {
            // Calculate position and width based on time and duration
            const widthPercentage = (cycle.duration / totalMinutes) * 100;
            const leftPosition = cycles
              .slice(0, index)
              .reduce((sum, c) => sum + (c.duration / totalMinutes) * 100, 0);
            
            return (
              <div
                key={index}
                className="absolute h-16 rounded-sm"
                style={{
                  left: `${leftPosition}%`,
                  width: `${widthPercentage}%`,
                  backgroundColor: stageColors[cycle.stage],
                  opacity: cycle.stage === "awake" ? 0.7 : 0.9,
                }}
                title={`${cycle.time}: ${cycle.stage} sleep for ${cycle.duration} minutes`}
              ></div>
            );
          })}
        </div>
        
        {/* Time markers */}
        <div className="flex justify-between mt-2">
          <span className="body-small text-gray-500">{bedtime}</span>
          <span className="body-small text-gray-500">{wakeup}</span>
        </div>
      </div>
      
      {/* Sleep Stage Legend */}
      <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-2">
        {Object.entries(stagePercentages).map(([stage, percentage]) => (
          <div key={stage} className="flex items-center">
            <div 
              className="w-3 h-3 rounded-full mr-2"
              style={{ backgroundColor: stageColors[stage] }}
            ></div>
            <div>
              <span className="body-medium text-gray-900 capitalize">{stage}</span>
              <span className="body-small text-gray-500 ml-2">{percentage}%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SleepCycles;