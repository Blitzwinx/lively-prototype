import React from "react";
import Icon from "../../../components/AppIcon";

const DateFilter = ({ selectedRange, onRangeChange }) => {
  const dateRanges = [
    { id: "day", label: "Day" },
    { id: "week", label: "Week" },
    { id: "month", label: "Month" },
    { id: "year", label: "Year" },
  ];

  return (
    <div className="bg-white rounded-card shadow-card p-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <div className="flex space-x-4 mb-4 sm:mb-0">
          {dateRanges.map((range) => (
            <button
              key={range.id}
              className={`px-4 py-2 rounded-button button-text transition-colors ${
                selectedRange === range.id
                  ? "bg-primary-500 text-white" :"bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
              onClick={() => onRangeChange(range.id)}
            >
              {range.label}
            </button>
          ))}
        </div>
        
        <div className="flex items-center space-x-2">
          <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
            <Icon name="Calendar" size={20} color="var(--color-gray-700)" />
          </button>
          <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
            <Icon name="Filter" size={20} color="var(--color-gray-700)" />
          </button>
          <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
            <Icon name="Share2" size={20} color="var(--color-gray-700)" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default DateFilter;