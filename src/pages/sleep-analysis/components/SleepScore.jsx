import React from "react";
import Icon from "../../../components/AppIcon";

const SleepScore = ({ score, summary }) => {
  // Calculate the circumference of the circle
  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  
  // Calculate the dash offset based on the score
  const dashOffset = circumference * (1 - score / 100);
  
  // Determine color based on score
  let scoreColor = "var(--color-success)";
  if (score < 60) {
    scoreColor = "var(--color-error)";
  } else if (score < 80) {
    scoreColor = "var(--color-warning)";
  }

  return (
    <div className="bg-white rounded-card shadow-card p-6">
      <div className="flex flex-col md:flex-row items-center justify-between">
        <div className="mb-4 md:mb-0 md:mr-6 flex-shrink-0">
          <div className="relative w-36 h-36 flex items-center justify-center">
            {/* Background circle */}
            <svg className="absolute w-full h-full" viewBox="0 0 150 150">
              <circle
                cx="75" cy="75"
                r={radius}
                fill="none" stroke="var(--color-gray-200)" strokeWidth="10"
              />
              {/* Progress circle */}
              <circle
                cx="75" cy="75"
                r={radius}
                fill="none"
                stroke={scoreColor}
                strokeWidth="10" strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={dashOffset}
                transform="rotate(-90 75 75)"
              />
            </svg>
            <div className="text-center">
              <div className="display-large text-gray-900">{score}</div>
              <div className="body-medium text-gray-500">Sleep Score</div>
            </div>
          </div>
        </div>
        
        <div className="flex-grow">
          <h2 className="heading-1 text-gray-900 mb-3">Your Sleep Summary</h2>
          <div className="space-y-3">
            {summary.map((item) => (
              <div key={item.id} className="flex items-center">
                <div className={`bg-${item.color} bg-opacity-10 p-2 rounded-full mr-3`}>
                  <Icon name={item.icon} size={16} color={`var(--color-${item.color})`} />
                </div>
                <span className="body-medium text-gray-700">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SleepScore;