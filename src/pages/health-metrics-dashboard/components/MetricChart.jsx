import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const MetricChart = ({ metric }) => {
  const chartData = metric.chartData;

  const isBloodPressure = chartData.length > 0 && 'systolic' in chartData[0];
  

  const chartColor = `var(--color-${metric.color})`;
  
  if (isBloodPressure) {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-gray-200)" />
          <XAxis 
            dataKey="date" 
            tick={{ fontSize: 10, fill: 'var(--color-gray-500)' }}
            axisLine={{ stroke: 'var(--color-gray-300)' }}
            tickLine={false}
          />
          <YAxis 
            tick={{ fontSize: 10, fill: 'var(--color-gray-500)' }}
            axisLine={false}
            tickLine={false}
            domain={['dataMin - 10', 'dataMax + 10']}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'white', 
              border: 'none', 
              borderRadius: 8, 
              boxShadow: 'var(--shadow-card)' 
            }}
            labelStyle={{ color: 'var(--color-gray-900)', fontWeight: 500 }}
          />
          <Line 
            type="monotone" dataKey="systolic" stroke="var(--color-error)" 
            strokeWidth={2}
            dot={{ r: 3, fill: 'var(--color-error)' }}
            activeDot={{ r: 5 }}
            name="Systolic"
          />
          <Line 
            type="monotone" dataKey="diastolic" stroke="var(--color-info)" 
            strokeWidth={2}
            dot={{ r: 3, fill: 'var(--color-info)' }}
            activeDot={{ r: 5 }}
            name="Diastolic"
          />
        </LineChart>
      </ResponsiveContainer>
    );
  }
  
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={chartData} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-gray-200)" />
        <XAxis 
          dataKey="date" 
          tick={{ fontSize: 10, fill: 'var(--color-gray-500)' }}
          axisLine={{ stroke: 'var(--color-gray-300)' }}
          tickLine={false}
        />
        <YAxis 
          tick={{ fontSize: 10, fill: 'var(--color-gray-500)' }}
          axisLine={false}
          tickLine={false}
          domain={['dataMin - 5', 'dataMax + 5']}
        />
        <Tooltip 
          contentStyle={{ 
            backgroundColor: 'white', 
            border: 'none', 
            borderRadius: 8, 
            boxShadow: 'var(--shadow-card)' 
          }}
          labelStyle={{ color: 'var(--color-gray-900)', fontWeight: 500 }}
        />
        <Line 
          type="monotone" dataKey="value" 
          stroke={chartColor} 
          strokeWidth={2}
          dot={{ r: 3, fill: chartColor }}
          activeDot={{ r: 5 }}
          name={metric.name}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default MetricChart;