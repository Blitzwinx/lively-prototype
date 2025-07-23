import React from "react";
import Icon from "../../../components/AppIcon";

const SleepDateSelector = ({ selectedDate, setSelectedDate }) => {
  // Mock dates for the selector
  const dates = [
    "May 9, 2023",
    "May 10, 2023",
    "May 11, 2023",
    "May 12, 2023",
    "May 13, 2023",
    "May 14, 2023",
    "May 15, 2023"
  ];
  
  // Find the index of the currently selected date
  const currentIndex = dates.indexOf(selectedDate);
  
  // Handle navigation
  const goToPrevious = () => {
    if (currentIndex > 0) {
      setSelectedDate(dates[currentIndex - 1]);
    }
  };
  
  const goToNext = () => {
    if (currentIndex < dates.length - 1) {
      setSelectedDate(dates[currentIndex + 1]);
    }
  };
  
  return (
    <div className="flex justify-between items-center bg-white rounded-card shadow-card p-3">
      <button 
        onClick={goToPrevious}
        disabled={currentIndex === 0}
        className={`p-2 rounded-full ${currentIndex === 0 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-100'}`}
      >
        <Icon name="ChevronLeft" size={20} />
      </button>
      
      <div className="flex items-center">
        <Icon name="Calendar" size={18} color="var(--color-primary)" className="mr-2" />
        <span className="body-medium text-gray-900">{selectedDate}</span>
      </div>
      
      <button 
        onClick={goToNext}
        disabled={currentIndex === dates.length - 1}
        className={`p-2 rounded-full ${currentIndex === dates.length - 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-100'}`}
      >
        <Icon name="ChevronRight" size={20} />
      </button>
    </div>
  );
};

export default SleepDateSelector;