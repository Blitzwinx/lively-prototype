import React from "react";
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Label } from 'recharts';
import Icon from "../../../components/AppIcon";

const CorrelationGraph = ({ data }) => {
  const correlationDisplay = (data.correlation * 100).toFixed(0) + "%";
  
  let strengthText = "Moderate";
  let strengthColor = "var(--color-warning)";
  
  if (data.correlation >= 0.7) {
    strengthText = "Strong";
    strengthColor = "var(--color-success)";
  } else if (data.correlation < 0.5) {
    strengthText = "Weak";
    strengthColor = "var(--color-error)";
  }

  return (
    <div className="bg-white rounded-card shadow-card p-4 h-full">
      <div className="flex justify-between items-start mb-3">
        <h3 className="heading-1 text-gray-900">{data.title}</h3>
        <div 
          className="px-2 py-1 rounded-full text-xs font-medium flex items-center"
          style={{ backgroundColor: `${strengthColor}20`, color: strengthColor }}
        >
          <Icon name="GitMerge" size={14} className="mr-1" />
          {strengthText} Correlation
        </div>
      </div>
      
      <p className="body-medium text-gray-700 mb-4">{data.description}</p>
      
      <div className="h-64 mb-4">
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart
            margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-gray-200)" />
            <XAxis 
              type="number" dataKey="x" 
              name={data.xAxis} 
              stroke="var(--color-gray-500)"
              tick={{ fill: 'var(--color-gray-700)' }}
            >
              <Label 
                value={data.xAxis} 
                position="bottom" 
                style={{ fill: 'var(--color-gray-700)', fontSize: 12 }} 
              />
            </XAxis>
            <YAxis 
              type="number" dataKey="y" 
              name={data.yAxis} 
              stroke="var(--color-gray-500)"
              tick={{ fill: 'var(--color-gray-700)' }}
            >
              <Label 
                value={data.yAxis} 
                angle={-90} 
                position="left" 
                style={{ fill: 'var(--color-gray-700)', fontSize: 12 }} 
              />
            </YAxis>
            <Tooltip 
              cursor={{ strokeDasharray: '3 3' }} 
              contentStyle={{ 
                backgroundColor: 'white', 
                border: '1px solid var(--color-gray-200)',
                borderRadius: '8px',
                boxShadow: 'var(--shadow-card)'
              }}
            />
            <Scatter 
              name={data.title} 
              data={data.data} 
              fill="var(--color-primary)" 
              fillOpacity={0.7}
              strokeWidth={1}
              stroke="var(--color-primary-dark)"
            />
          </ScatterChart>
        </ResponsiveContainer>
      </div>
      
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <Icon name="BarChart2" size={16} color="var(--color-gray-700)" className="mr-2" />
          <span className="body-medium text-gray-700">Correlation Strength:</span>
        </div>
        <div className="flex items-center">
          <div className="w-24 bg-gray-200 rounded-full h-2 mr-2">
            <div 
              className="h-2 rounded-full" 
              style={{ 
                width: `${data.correlation * 100}%`,
                backgroundColor: strengthColor
              }}
            ></div>
          </div>
          <span className="body-medium font-medium" style={{ color: strengthColor }}>
            {correlationDisplay}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CorrelationGraph;