import React, { useState } from "react";
import Icon from "../../../components/AppIcon";

const AchievementBadges = ({ badges }) => {
  const [showAllBadges, setShowAllBadges] = useState(false);
  const earnedBadges = badges.filter(badge => badge.earned);
  const displayBadges = showAllBadges ? badges : earnedBadges.slice(0, 3);

  return (
    <div>
      <h3 className="heading-2 text-gray-900 mb-3">Recent Achievements</h3>
      <div className="flex items-center">
        <div className="flex -space-x-2 mr-3">
          {displayBadges.map((badge) => (
            <div
              key={badge.id}
              className={`w-10 h-10 rounded-full flex items-center justify-center border-2 border-white ${
                badge.earned
                  ? "bg-primary-500 bg-opacity-10" :"bg-gray-200 bg-opacity-50"
              }`}
              title={badge.name}
            >
              <Icon
                name={badge.icon}
                size={18}
                color={
                  badge.earned
                    ? "var(--color-primary)" :"var(--color-gray-400)"
                }
              />
            </div>
          ))}
        </div>
        <button
          onClick={() => setShowAllBadges(!showAllBadges)}
          className="button-text text-primary-500 hover:text-primary-600 transition-colors"
        >
          {showAllBadges ? "Show Less" : `+${badges.length - displayBadges.length} More`}
        </button>
      </div>
    </div>
  );
};

export default AchievementBadges;