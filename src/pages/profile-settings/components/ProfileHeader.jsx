import React from "react";
import Icon from "../../../components/AppIcon";
import Image from "../../../components/AppImage";

const ProfileHeader = ({ userData }) => {
  // Calculate age from date of birth
  const calculateAge = (dateOfBirth) => {
    const birthDate = new Date(dateOfBirth);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    return age;
  };

  const age = calculateAge(userData.dateOfBirth);

  return (
    <div className="bg-white rounded-card shadow-card p-6">
      <div className="flex flex-col md:flex-row items-center">
        <div className="relative mb-4 md:mb-0 md:mr-6">
          <Image
            src={userData.avatar}
            alt={userData.name}
            className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-card"
          />
          <button className="absolute bottom-0 right-0 bg-primary-500 p-2 rounded-full shadow-card">
            <Icon name="Camera" size={16} color="white" />
          </button>
        </div>
        
        <div className="flex-grow text-center md:text-left">
          <h2 className="display-small text-gray-900 mb-1">{userData.name}</h2>
          <p className="body-medium text-gray-500 mb-3">
            {userData.dateOfBirth ? `${age} years` : 'Age not set'} 
            {userData.gender && ` • ${userData.gender}`}
          </p>
          
          <div className="flex flex-wrap justify-center md:justify-start gap-3">
            {userData.height && (
              <div className="bg-gray-100 px-3 py-1 rounded-full flex items-center">
                <Icon name="Ruler" size={14} color="var(--color-gray-500)" className="mr-1" />
                <span className="body-small text-gray-700">{userData.height}</span>
              </div>
            )}
            {userData.weight && (
              <div className="bg-gray-100 px-3 py-1 rounded-full flex items-center">
                <Icon name="Scale" size={14} color="var(--color-gray-500)" className="mr-1" />
                <span className="body-small text-gray-700">{userData.weight}</span>
              </div>
            )}
            {userData.bloodType && (
              <div className="bg-gray-100 px-3 py-1 rounded-full flex items-center">
                <Icon name="Droplet" size={14} color="var(--color-error)" className="mr-1" />
                <span className="body-small text-gray-700">{userData.bloodType}</span>
              </div>
            )}
          </div>
        </div>
        
        <button className="mt-4 md:mt-0 button-text bg-primary-500 text-white px-4 py-2 rounded-button hover:bg-primary-600 transition-colors flex items-center">
          <Icon name="Edit" size={16} color="white" className="mr-2" />
          Edit Profile
        </button>
      </div>
      
      <div className="mt-6 grid grid-cols-3 gap-4">
        <div className="bg-gray-50 p-3 rounded-card text-center">
          <p className="body-small text-gray-500">BMI</p>
          <p className="heading-1 text-gray-900">{userData.healthMetrics.bmi}</p>
          <p className="label text-success">Healthy</p>
        </div>
        <div className="bg-gray-50 p-3 rounded-card text-center">
          <p className="body-small text-gray-500">Heart Rate</p>
          <p className="heading-1 text-gray-900">{userData.healthMetrics.restingHeartRate}</p>
          <p className="label text-gray-500">bpm</p>
        </div>
        <div className="bg-gray-50 p-3 rounded-card text-center">
          <p className="body-small text-gray-500">Avg. Steps</p>
          <p className="heading-1 text-gray-900">{userData.healthMetrics.averageSteps.toLocaleString()}</p>
          <p className="label text-gray-500">daily</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;