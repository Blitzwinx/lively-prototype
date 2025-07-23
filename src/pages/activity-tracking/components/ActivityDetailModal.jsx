import React from "react";
import Icon from "../../../components/AppIcon";

const ActivityDetailModal = ({ activity, onClose }) => {
  // Determine activity color
  const activityColor = activity.color.startsWith("primary") ?"var(--color-primary)" 
    : `var(--color-${activity.color})`;

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-card shadow-elevated w-full max-w-md max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="p-4 border-b border-gray-200 flex justify-between items-center sticky top-0 bg-white z-10">
          <div className="flex items-center">
            <div 
              className="p-2 rounded-full mr-3" 
              style={{ backgroundColor: `${activityColor}20` }}
            >
              <Icon name={activity.icon} size={20} color={activityColor} />
            </div>
            <h2 className="heading-1 text-gray-900">{activity.type}</h2>
          </div>
          <button 
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <Icon name="X" size={20} color="var(--color-gray-700)" />
          </button>
        </div>
        
        {/* Content */}
        <div className="p-4">
          {/* Basic Info */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-gray-50 p-3 rounded-card">
              <p className="body-small text-gray-500">Duration</p>
              <p className="heading-2 text-gray-900">{activity.duration}</p>
            </div>
            <div className="bg-gray-50 p-3 rounded-card">
              <p className="body-small text-gray-500">Calories</p>
              <p className="heading-2 text-gray-900">{activity.calories} kcal</p>
            </div>
            {activity.distance && (
              <div className="bg-gray-50 p-3 rounded-card">
                <p className="body-small text-gray-500">Distance</p>
                <p className="heading-2 text-gray-900">{activity.distance}</p>
              </div>
            )}
            {activity.pace && (
              <div className="bg-gray-50 p-3 rounded-card">
                <p className="body-small text-gray-500">Pace</p>
                <p className="heading-2 text-gray-900">{activity.pace}</p>
              </div>
            )}
          </div>
          
          {/* Heart Rate */}
          {activity.heartRate && (
            <div className="mb-6">
              <h3 className="heading-2 text-gray-900 mb-3">Heart Rate</h3>
              <div className="flex space-x-4">
                <div className="bg-gray-50 p-3 rounded-card flex-1">
                  <p className="body-small text-gray-500">Average</p>
                  <div className="flex items-center">
                    <Icon name="Heart" size={16} color="var(--color-error)" className="mr-1" />
                    <p className="heading-2 text-gray-900">{activity.heartRate.avg} bpm</p>
                  </div>
                </div>
                <div className="bg-gray-50 p-3 rounded-card flex-1">
                  <p className="body-small text-gray-500">Maximum</p>
                  <div className="flex items-center">
                    <Icon name="Heart" size={16} color="var(--color-error)" className="mr-1" />
                    <p className="heading-2 text-gray-900">{activity.heartRate.max} bpm</p>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Activity Specific Details */}
          {activity.laps && (
            <div className="mb-6">
              <h3 className="heading-2 text-gray-900 mb-2">Swimming Details</h3>
              <div className="bg-gray-50 p-3 rounded-card mb-2">
                <p className="body-small text-gray-500">Laps</p>
                <p className="heading-2 text-gray-900">{activity.laps}</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-card">
                <p className="body-small text-gray-500">Pool</p>
                <p className="heading-2 text-gray-900">{activity.pool}</p>
              </div>
            </div>
          )}
          
          {activity.program && (
            <div className="mb-6">
              <h3 className="heading-2 text-gray-900 mb-2">Yoga Details</h3>
              <div className="bg-gray-50 p-3 rounded-card mb-2">
                <p className="body-small text-gray-500">Program</p>
                <p className="heading-2 text-gray-900">{activity.program}</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-card">
                <p className="body-small text-gray-500">Instructor</p>
                <p className="heading-2 text-gray-900">{activity.instructor}</p>
              </div>
            </div>
          )}
          
          {/* Route Map */}
          {activity.route && (
            <div className="mb-6">
              <h3 className="heading-2 text-gray-900 mb-3">Route</h3>
              <div className="bg-gray-50 p-3 rounded-card mb-3">
                <div className="flex justify-between">
                  <div>
                    <p className="body-small text-gray-500">Start</p>
                    <p className="body-medium text-gray-900">{activity.route.startLocation}</p>
                  </div>
                  <div className="text-right">
                    <p className="body-small text-gray-500">End</p>
                    <p className="body-medium text-gray-900">{activity.route.endLocation}</p>
                  </div>
                </div>
              </div>
              <div className="h-48 bg-gray-200 rounded-card overflow-hidden">
                <iframe
                  width="100%" height="100%" loading="lazy"
                  title={`${activity.type} Route`}
                  referrerPolicy="no-referrer-when-downgrade"
                  src={`https://www.google.com/maps?q=${activity.route.coordinates.lat},${activity.route.coordinates.lng}&z=14&output=embed`}>
                </iframe>
              </div>
            </div>
          )}
          
          {/* Time */}
          <div>
            <p className="body-small text-gray-500 text-center">{activity.time}</p>
          </div>
        </div>
        
        {/* Actions */}
        <div className="p-4 border-t border-gray-200 flex justify-between">
          <button className="flex items-center justify-center bg-gray-100 text-gray-700 px-4 py-2 rounded-button hover:bg-gray-200 transition-colors button-text flex-1 mr-2">
            <Icon name="Edit" size={16} className="mr-2" />
            Edit
          </button>
          <button className="flex items-center justify-center bg-primary-500 text-white px-4 py-2 rounded-button hover:bg-primary-600 transition-colors button-text flex-1">
            <Icon name="Share2" size={16} className="mr-2" />
            Share
          </button>
        </div>
      </div>
    </div>
  );
};

export default ActivityDetailModal;