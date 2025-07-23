import React, { useState } from "react";
import Icon from "../../../components/AppIcon";

const MedicalInformation = ({ medicalInfo }) => {
  const [activeTab, setActiveTab] = useState("conditions");
  
  const tabs = [
    { id: "conditions", label: "Conditions", icon: "Stethoscope" },
    { id: "medications", label: "Medications", icon: "Pill" },
    { id: "allergies", label: "Allergies", icon: "AlertTriangle" }
  ];

  return (
    <div className="bg-white rounded-card shadow-card p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <div className="bg-primary-500 bg-opacity-10 p-2 rounded-full mr-3">
            <Icon name="HeartPulse" size={20} color="var(--color-primary)" />
          </div>
          <h2 className="heading-1 text-gray-900">Medical Information</h2>
        </div>
        <button className="button-text text-primary-500 flex items-center">
          <Icon name="Edit" size={16} color="var(--color-primary)" className="mr-1" />
          Edit
        </button>
      </div>
      
      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-4">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`flex items-center py-2 px-4 border-b-2 ${
              activeTab === tab.id
                ? "border-primary-500 text-primary-500" :"border-transparent text-gray-500 hover:text-gray-700"
            } transition-colors`}
            onClick={() => setActiveTab(tab.id)}
          >
            <Icon 
              name={tab.icon} 
              size={16} 
              color={activeTab === tab.id ? "var(--color-primary)" : "var(--color-gray-500)"} 
              className="mr-2" 
            />
            {tab.label}
          </button>
        ))}
      </div>
      
      {/* Tab Content */}
      <div className="space-y-3">
        {activeTab === "conditions" && (
          <>
            {medicalInfo.conditions.length > 0 ? (
              medicalInfo.conditions.map((condition) => (
                <div key={condition.id} className="flex justify-between items-center p-3 border border-gray-200 rounded-md">
                  <div>
                    <h3 className="heading-2 text-gray-900">{condition.name}</h3>
                    <p className="body-small text-gray-500">Since: {condition.since}</p>
                  </div>
                  <div className="bg-gray-100 px-2 py-1 rounded-full">
                    <span className="body-small text-gray-700">{condition.severity}</span>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-6">
                <Icon name="ClipboardCheck" size={40} color="var(--color-gray-300)" className="mx-auto mb-2" />
                <p className="body-medium text-gray-500">No medical conditions recorded</p>
              </div>
            )}
          </>
        )}
        
        {activeTab === "medications" && (
          <>
            {medicalInfo.medications.length > 0 ? (
              medicalInfo.medications.map((medication) => (
                <div key={medication.id} className="flex justify-between items-center p-3 border border-gray-200 rounded-md">
                  <div>
                    <h3 className="heading-2 text-gray-900">{medication.name}</h3>
                    <p className="body-small text-gray-500">{medication.dosage} • {medication.frequency}</p>
                  </div>
                  <div className="bg-primary-500 bg-opacity-10 px-2 py-1 rounded-full">
                    <span className="body-small text-primary-500">{medication.purpose}</span>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-6">
                <Icon name="Pill" size={40} color="var(--color-gray-300)" className="mx-auto mb-2" />
                <p className="body-medium text-gray-500">No medications recorded</p>
              </div>
            )}
          </>
        )}
        
        {activeTab === "allergies" && (
          <>
            {medicalInfo.allergies.length > 0 ? (
              medicalInfo.allergies.map((allergy) => (
                <div key={allergy.id} className="flex justify-between items-center p-3 border border-gray-200 rounded-md">
                  <div>
                    <h3 className="heading-2 text-gray-900">{allergy.name}</h3>
                    <p className="body-small text-gray-500">Reaction: {allergy.reaction}</p>
                  </div>
                  <div className={`px-2 py-1 rounded-full ${
                    allergy.severity === "Severe" ?"bg-error bg-opacity-10 text-error" : allergy.severity ==="Moderate" ?"bg-warning bg-opacity-10 text-warning" :"bg-info bg-opacity-10 text-info"
                  }`}>
                    <span className="body-small">{allergy.severity}</span>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-6">
                <Icon name="AlertTriangle" size={40} color="var(--color-gray-300)" className="mx-auto mb-2" />
                <p className="body-medium text-gray-500">No allergies recorded</p>
              </div>
            )}
          </>
        )}
      </div>
      
      <button className="w-full mt-4 button-text bg-gray-100 text-primary-500 py-2 rounded-button hover:bg-gray-200 transition-colors flex items-center justify-center">
        <Icon name="Plus" size={16} color="var(--color-primary)" className="mr-2" />
        Add New {activeTab === "conditions" ? "Condition" : activeTab === "medications" ? "Medication" : "Allergy"}
      </button>
    </div>
  );
};

export default MedicalInformation;