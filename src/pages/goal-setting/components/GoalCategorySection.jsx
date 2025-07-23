import React from "react";
import Icon from "../../../components/AppIcon";

const GoalCategorySection = ({ categories, activeCategory, setActiveCategory }) => {
  return (
    <section className="mb-6">
      <div className="bg-white rounded-card shadow-card p-2 overflow-x-auto">
        <div className="flex space-x-2 min-w-max">
          {categories.map((category) => (
            <button
              key={category.id}
              className={`flex items-center px-4 py-2 rounded-button transition-colors ${
                activeCategory === category.id
                  ? "bg-primary-500 text-white" :"bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
              onClick={() => setActiveCategory(category.id)}
            >
              <Icon
                name={category.icon}
                size={18}
                color={activeCategory === category.id ? "white" : "var(--color-gray-700)"}
                className="mr-2"
              />
              <span className="button-text whitespace-nowrap">{category.name}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GoalCategorySection;