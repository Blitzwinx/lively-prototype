import React from "react";
import Icon from "../../../components/AppIcon";

const ConnectedDevices = ({ devices }) => {
  return (
    <div className="bg-white rounded-card shadow-card p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <div className="bg-primary-500 bg-opacity-10 p-2 rounded-full mr-3">
            <Icon name="Smartphone" size={20} color="var(--color-primary)" />
          </div>
          <h2 className="heading-1 text-gray-900">Connected Devices</h2>
        </div>
        <button className="button-text text-primary-500 flex items-center">
          <Icon name="PlusCircle" size={16} color="var(--color-primary)" className="mr-1" />
          Add Device
        </button>
      </div>
      
      <div className="space-y-4">
        {devices.map((device) => (
          <div key={device.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-card">
            <div className="flex items-center">
              <div 
                className={`p-3 rounded-full mr-3 ${
                  device.status === "Connected" ?"bg-success bg-opacity-10" :"bg-gray-200"
                }`}
              >
                <Icon 
                  name={device.icon} 
                  size={20} 
                  color={device.status === "Connected" ? "var(--color-success)" : "var(--color-gray-500)"} 
                />
              </div>
              <div>
                <h3 className="heading-2 text-gray-900">{device.name}</h3>
                <div className="flex items-center">
                  <span className="body-small text-gray-500 mr-2">{device.type}</span>
                  {device.status === "Connected"? ( <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-success bg-opacity-10 text-success">
                      Connected
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-500">
                      Disconnected
                    </span>
                  )}
                </div>
              </div>
            </div>
            
            <div className="text-right">
              {device.batteryLevel && (
                <div className="flex items-center justify-end mb-1">
                  <Icon 
                    name={device.batteryLevel > 20 ? "Battery" : "BatteryLow"} 
                    size={14} 
                    color={device.batteryLevel > 20 ? "var(--color-success)" : "var(--color-warning)"} 
                    className="mr-1" 
                  />
                  <span className="body-small text-gray-500">{device.batteryLevel}%</span>
                </div>
              )}
              <p className="body-small text-gray-500">Last sync: {device.lastSync}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ConnectedDevices;