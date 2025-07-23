import React from "react";
import ActivityCard from "./ActivityCard";

const RecentActivity = ({ activities }) => {
  return (
    <div className="space-y-4">
      {activities.map((activity) => (
        <ActivityCard key={activity.id} activity={activity} />
      ))}
    </div>
  );
};

export default RecentActivity;