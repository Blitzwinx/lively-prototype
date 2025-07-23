import React from "react";
import Icon from "../../../components/AppIcon";

const InsightCategory = ({ name, icon, count, onClick, isActive }) => {
  let categoryColor = "var(--color-primary)";
  if (name === "Cardiovascular") categoryColor = "var(--color-error)";
  if (name === "Sleep") categoryColor = "var(--color-purple)";
  if (name === "Nutrition") categoryColor = "var(--color-warning)";
  if (name === "Fitness") categoryColor = "var(--color-info)";
  if (name === "Metabolic") categoryColor = "var(--color-success)";

  return (
    <button 
      onClick={onClick}
      className={`bg-white rounded-card shadow-card p-4 flex flex-col items-center justify-center h-32 transition-all ${
        isActive ? 'ring-2 ring-offset-2' : 'hover:shadow-elevated'
      }`}
      style={{ 
        ringColor: categoryColor,
        transform: isActive ? 'translateY(-2px)' : 'none'
      }}
    >
      <div 
        className="p-3 rounded-full mb-2" 
        style={{ backgroundColor: `${categoryColor}20` }}
      >
        <Icon name={icon} size={24} color={categoryColor} />
      </div>
      <h3 className="heading-2 text-gray-900 text-center">{name}</h3>
      <span className="body-small text-gray-500">{count} insights</span>
    </button>
  );
};

export default InsightCategory;