import React from 'react';
import Icon from './AppIcon';

const LoadingSpinner = ({ size = 'medium', message = 'Loading...' }) => {
  const sizeClasses = {
    small: 'w-4 h-4',
    medium: 'w-8 h-8',
    large: 'w-12 h-12'
  };

  return (
    <div className="flex flex-col items-center justify-center p-8">
      <div className={`${sizeClasses[size]} animate-spin text-primary-500 mb-2`}>
        <Icon name="Loader2" size={size === 'small' ? 16 : size === 'medium' ? 32 : 48} />
      </div>
      <p className="text-gray-500 text-sm">{message}</p>
    </div>
  );
};

export default LoadingSpinner;