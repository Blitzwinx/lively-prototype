import React from "react";
import Icon from "../../../components/AppIcon";

const GoalCard = ({ goal, onClick }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  const calculateDaysRemaining = (endDate) => {
    const today = new Date();
    const end = new Date(endDate);
    const diffTime = end - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  const daysRemaining = calculateDaysRemaining(goal.endDate);

  const goalColor = goal.color.startsWith("primary") ?"var(--color-primary)"
    : `var(--color-${goal.color})`;

  let statusText = "In Progress";
  let statusColor = "var(--color-info)";

  if (goal.progress >= 1) {
    statusText = "Completed";
    statusColor = "var(--color-success)";
  } else if (daysRemaining === 0) {
    statusText = "Overdue";
    statusColor = "var(--color-error)";
  } else if (daysRemaining <= 3) {
    statusText = "Ending Soon";
    statusColor = "var(--color-warning)";
  }

  return (
    <div
      className="bg-white rounded-card shadow-card p-4 cursor-pointer hover:shadow-elevated transition-shadow"
      onClick={onClick}
    >
      <div className="flex justify-between items-start mb-3">
        <div
          className="p-2 rounded-full"
          style={{ backgroundColor: `${goalColor}20` }}
        >
          <Icon name={goal.icon} size={20} color={goalColor} />
        </div>
        <div className="flex items-center">
          <span
            className="text-xs px-2 py-1 rounded-full"
            style={{
              backgroundColor: `${statusColor}20`,
              color: statusColor,
            }}
          >
            {statusText}
          </span>
          {goal.notifications && (
            <div className="ml-2">
              <Icon name="Bell" size={16} color="var(--color-gray-500)" />
            </div>
          )}
        </div>
      </div>

      <h3 className="heading-2 text-gray-900 mb-1">{goal.title}</h3>
      <p className="body-small text-gray-500 mb-3 line-clamp-2">{goal.description}</p>

      <div className="mb-3">
        <div className="flex justify-between items-center mb-1">
          <span className="body-small text-gray-700">Progress</span>
          <span className="body-small text-gray-900 font-medium">
            {Math.round(goal.progress * 100)}%
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="h-2 rounded-full"
            style={{
              width: `${goal.progress * 100}%`,
              backgroundColor: goalColor,
            }}
          ></div>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <Icon name="Target" size={14} color="var(--color-gray-500)" className="mr-1" />
          <span className="body-small text-gray-700">
            {goal.currentValue} / {goal.targetValue} {goal.unit}
          </span>
        </div>
        <div className="flex items-center">
          <Icon name="Calendar" size={14} color="var(--color-gray-500)" className="mr-1" />
          <span className="body-small text-gray-700">
            {daysRemaining} days left
          </span>
        </div>
      </div>
    </div>
  );
};

export default GoalCard;