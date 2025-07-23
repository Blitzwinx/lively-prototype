import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

const MacronutrientChart = ({ macros }) => {
  // Calculate total macros and percentages
  const totalMacros = macros.reduce((sum, macro) => sum + macro.value, 0);
  
  const chartData = macros.map(macro => {
    const percentage = Math.round((macro.value / totalMacros) * 100);
    return {
      name: macro.name,
      value: macro.value,
      percentage,
      color: `var(--color-${macro.color})`
    };
  });

  // Custom legend component
  const CustomLegend = ({ payload }) => {
    return (
      <div className="flex flex-col space-y-2 mt-2">
        {payload.map((entry, index) => (
          <div key={`legend-${index}`} className="flex items-center">
            <div 
              className="w-3 h-3 rounded-full mr-2" 
              style={{ backgroundColor: entry.color }}
            ></div>
            <span className="body-small text-gray-700">{entry.value}</span>
            <span className="body-small text-gray-500 ml-1">({chartData[index].percentage}%)</span>
            <span className="body-small text-gray-700 ml-auto">{chartData[index].value}g</span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div>
      <h3 className="heading-2 text-gray-900 mb-3">Macronutrients</h3>
      
      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%" cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={2}
              dataKey="value"
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Legend content={<CustomLegend />} />
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
      
      <div className="mt-2 space-y-3">
        {macros.map((macro, index) => {
          const percentage = Math.round((macro.value / macro.goal) * 100);
          return (
            <div key={index}>
              <div className="flex justify-between items-center mb-1">
                <span className="body-small text-gray-700">
                  {macro.name} Goal
                </span>
                <div className="flex items-center">
                  <span className="body-small text-gray-900 font-medium">{macro.value}</span>
                  <span className="body-small text-gray-500 ml-1">/ {macro.goal} {macro.unit}</span>
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-1.5">
                <div 
                  className={`h-1.5 rounded-full bg-${macro.color}`}
                  style={{ width: `${Math.min(percentage, 100)}%` }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MacronutrientChart;