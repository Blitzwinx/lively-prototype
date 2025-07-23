import React from "react";
import Icon from "../../../components/AppIcon";

const TodaysPlan = ({ plans }) => {
  return (
    <div className="bg-white rounded-card shadow-card p-4 h-full">
      <div className="space-y-4">
        {plans.map((plan) => (
          <div key={plan.id} className="flex items-start p-3 hover:bg-gray-50 rounded-md transition-colors">
            <div className="bg-primary-500 bg-opacity-10 p-2 rounded-full mr-3 flex-shrink-0">
              <Icon name={plan.icon} size={20} color="var(--color-primary)" />
            </div>
            <div className="flex-grow">
              <div className="flex justify-between items-start">
                <div>
                  <span className="label text-primary-500 uppercase">{plan.type}</span>
                  <h3 className="heading-2 text-gray-900">{plan.title}</h3>
                </div>
                {plan.duration && (
                  <span className="body-small text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                    {plan.duration}
                  </span>
                )}
              </div>
              <div className="flex items-center mt-1">
                <Icon name="Clock" size={14} color="var(--color-gray-500)" className="mr-1" />
                <span className="body-small text-gray-500">{plan.time}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodaysPlan;