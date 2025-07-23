import React from "react";
import Icon from "../../../components/AppIcon";

const SettingsSection = ({ title, icon, items }) => {
  return (
    <div className="bg-white rounded-card shadow-card p-6">
      <div className="flex items-center mb-4">
        <div className="bg-primary-500 bg-opacity-10 p-2 rounded-full mr-3">
          <Icon name={icon} size={20} color="var(--color-primary)" />
        </div>
        <h2 className="heading-1 text-gray-900">{title}</h2>
      </div>
      
      <div className="space-y-1">
        {items.map((item) => (
          <div 
            key={item.id} 
            className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-md transition-colors cursor-pointer"
          >
            <div className="flex items-center">
              <div className="bg-gray-100 p-2 rounded-full mr-3">
                <Icon name={item.icon} size={18} color="var(--color-gray-700)" />
              </div>
              <div>
                <h3 className="heading-2 text-gray-900">{item.title}</h3>
                <p className="body-small text-gray-500">{item.description}</p>
                {item.secondaryDescription && (
                  <p className="body-small text-gray-500">{item.secondaryDescription}</p>
                )}
              </div>
            </div>
            <div className="flex items-center">
              <span className="button-text text-primary-500 mr-1">{item.action}</span>
              <Icon name="ChevronRight" size={16} color="var(--color-primary)" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SettingsSection;