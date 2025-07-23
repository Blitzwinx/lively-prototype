import React from "react";
import Icon from "../../../components/AppIcon";

const GoalMilestones = ({ goal, isVisible, onClose }) => {
  if (!isVisible) return null;

  const formatDate = (dateString) => {
    if (!dateString) return "Not completed";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric"
    });
  };

  const goalColor = goal.color.startsWith("primary") ?"var(--color-primary)"
    : `var(--color-${goal.color})`;

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-card shadow-elevated w-full max-w-md">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="heading-1 text-gray-900">Goal Milestones</h2>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <Icon name="X" size={20} color="var(--color-gray-500)" />
            </button>
          </div>

          <div className="mb-4">
            <div className="flex items-center mb-3">
              <div
                className="p-2 rounded-full mr-3"
                style={{ backgroundColor: `${goalColor}20` }}
              >
                <Icon name={goal.icon} size={20} color={goalColor} />
              </div>
              <h3 className="heading-2 text-gray-900">{goal.title}</h3>
            </div>
            <p className="body-medium text-gray-700 mb-4">{goal.description}</p>

            <div className="flex justify-between items-center mb-2">
              <span className="body-medium text-gray-700">Overall Progress</span>
              <span className="body-medium text-gray-900 font-medium">
                {Math.round(goal.progress * 100)}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
              <div
                className="h-2 rounded-full"
                style={{
                  width: `${goal.progress * 100}%`,
                  backgroundColor: goalColor
                }}
              ></div>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="heading-2 text-gray-900 mb-3">Milestones</h3>
            <div className="space-y-4">
              {goal.milestones.map((milestone) => (
                <div
                  key={milestone.id}
                  className="flex items-center p-3 border rounded-card"
                >
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center mr-3 ${
                      milestone.completed
                        ? "bg-success" :"bg-gray-200"
                    }`}
                  >
                    {milestone.completed && (
                      <Icon name="Check" size={14} color="white" />
                    )}
                  </div>
                  <div className="flex-grow">
                    <div className="flex justify-between items-center">
                      <span className="body-medium text-gray-900">
                        {milestone.value} {goal.unit}
                      </span>
                      <span className="body-small text-gray-500">
                        {formatDate(milestone.date)}
                      </span>
                    </div>
                    <div className="body-small text-gray-500">
                      {milestone.completed
                        ? "Completed" :"Not completed yet"}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end">
            <button
              onClick={onClose}
              className="button-text bg-gray-100 text-gray-700 px-4 py-2 rounded-button hover:bg-gray-200 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoalMilestones;