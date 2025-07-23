import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, ReferenceLine, Tooltip } from "recharts";

const WeeklyActivityChart = ({ data }) => {
  // Custom tooltip component
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const { steps, target, day } = payload[0].payload;
      const percentage = Math.round((steps / target) * 100);
      
      return (
        <div className="bg-white p-3 shadow-card rounded-card border border-gray-200">
          <p className="heading-2 text-gray-900">{day}</p>
          <p className="body-medium text-gray-700">
            <span className="font-medium">{steps.toLocaleString()}</span> steps
          </p>
          <p className="body-small text-gray-500">
            {percentage}% of daily goal
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full h-64" aria-label="Weekly Steps Bar Chart">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 10, right: 10, left: -20, bottom: 5 }}
          barSize={30}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-gray-200)" />
          <XAxis 
            dataKey="day" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: 'var(--color-gray-500)', fontSize: 12 }}
          />
          <YAxis 
            hide={true}
            domain={[0, 'dataMax + 2000']}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'transparent' }} />
          <ReferenceLine 
            y={10000} 
            stroke="var(--color-gray-500)" strokeDasharray="3 3" 
            label={{ 
              value: 'Daily Goal', 
              position: 'right', 
              fill: 'var(--color-gray-500)',
              fontSize: 12
            }} 
          />
          <Bar 
            dataKey="steps" fill="var(--color-primary)" 
            radius={[4, 4, 0, 0]} 
            animationDuration={1500}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default WeeklyActivityChart;