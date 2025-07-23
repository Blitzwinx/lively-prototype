import React, { useState, useEffect } from "react";
import Icon from "../../../components/AppIcon";

const CreateGoalModal = ({ goal, onClose }) => {
  const isEditing = !!goal;
  
  const initialFormState = {
    category: goal?.category || "activity",
    title: goal?.title || "",
    description: goal?.description || "",
    currentValue: goal?.currentValue || 0,
    targetValue: goal?.targetValue || 0,
    unit: goal?.unit || "steps",
    startDate: goal?.startDate || new Date().toISOString().split("T")[0],
    endDate: goal?.endDate || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
    icon: goal?.icon || "Activity",
    color: goal?.color || "primary-500",
    notifications: goal?.notifications !== undefined ? goal.notifications : true,
    milestones: goal?.milestones || []
  };

  const [formData, setFormData] = useState(initialFormState);
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState({});

  const categories = [
    { id: "activity", name: "Activity", icon: "Activity" },
    { id: "nutrition", name: "Nutrition", icon: "Apple" },
    { id: "sleep", name: "Sleep", icon: "Moon" },
    { id: "wellness", name: "Wellness", icon: "Heart" }
  ];

  const unitOptions = {
    activity: ["steps", "minutes", "kilometers", "sessions"],
    nutrition: ["grams", "calories", "servings", "liters"],
    sleep: ["hours", "minutes", "cycles"],
    wellness: ["minutes", "sessions", "points"]
  };

  const iconOptions = {
    activity: ["Activity", "Footprints", "Running", "Bike", "Dumbbell"],
    nutrition: ["Apple", "Salad", "Cookie", "Droplets", "UtensilsCrossed"],
    sleep: ["Moon", "BedDouble", "Clock", "ZZZ"],
    wellness: ["Heart", "Brain", "Smile", "Sun", "Yoga"]
  };

  const colorOptions = [
    { id: "primary-500", name: "Teal", value: "var(--color-primary)" },
    { id: "success", name: "Green", value: "var(--color-success)" },
    { id: "warning", name: "Amber", value: "var(--color-warning)" },
    { id: "error", name: "Red", value: "var(--color-error)" },
    { id: "info", name: "Blue", value: "var(--color-info)" },
    { id: "purple", name: "Purple", value: "var(--color-purple)" }
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value
    });
  };

  const handleCategoryChange = (category) => {
    setFormData({
      ...formData,
      category,
      unit: unitOptions[category][0],
      icon: iconOptions[category][0]
    });
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    }
    
    if (formData.targetValue <= 0) {
      newErrors.targetValue = "Target value must be greater than 0";
    }
    
    if (new Date(formData.endDate) <= new Date(formData.startDate)) {
      newErrors.endDate = "End date must be after start date";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateForm()) {
      setStep(step + 1);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Goal data:", formData);
      onClose();
    }
  };

  useEffect(() => {
    if (step === 2 && formData.milestones.length === 0) {
      const target = parseFloat(formData.targetValue);
      const current = parseFloat(formData.currentValue);
      const diff = target - current;
      
      const milestones = [
        { id: 1, value: current + diff * 0.33, completed: false },
        { id: 2, value: current + diff * 0.66, completed: false },
        { id: 3, value: target, completed: false }
      ];
      
      setFormData({
        ...formData,
        milestones: milestones.map(m => ({
          ...m,
          value: Math.round(m.value * 100) / 100 
        }))
      });
    }
  }, [step, formData.targetValue, formData.currentValue]);

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-card shadow-elevated w-full max-w-md max-h-90vh overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="heading-1 text-gray-900">
              {isEditing ? "Edit Goal" : "Create New Goal"}
            </h2>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <Icon name="X" size={20} color="var(--color-gray-500)" />
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            {step === 1 && (
              <div className="space-y-4">
                <div className="mb-6">
                  <label className="block body-medium text-gray-700 mb-2">
                    Goal Category
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {categories.map((category) => (
                      <button
                        key={category.id}
                        type="button"
                        className={`flex items-center justify-center p-3 rounded-button border ${
                          formData.category === category.id
                            ? "border-primary-500 bg-primary-500 bg-opacity-10" :"border-gray-200 hover:bg-gray-50"
                        } transition-colors`}
                        onClick={() => handleCategoryChange(category.id)}
                      >
                        <Icon
                          name={category.icon}
                          size={20}
                          color={
                            formData.category === category.id
                              ? "var(--color-primary)" :"var(--color-gray-500)"
                          }
                          className="mr-2"
                        />
                        <span
                          className={`button-text ${
                            formData.category === category.id
                              ? "text-primary-500" :"text-gray-700"
                          }`}
                        >
                          {category.name}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mb-4">
                  <label htmlFor="title" className="block body-medium text-gray-700 mb-1">
                    Goal Title
                  </label>
                  <input
                    type="text" id="title" name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className={`w-full p-2 border rounded-button focus:ring-primary focus:ring-2 focus:outline-none ${
                      errors.title ? "border-error" : "border-gray-300"
                    }`}
                    placeholder="e.g., Increase Daily Steps"
                  />
                  {errors.title && (
                    <p className="text-error text-xs mt-1">{errors.title}</p>
                  )}
                </div>

                <div className="mb-4">
                  <label htmlFor="description" className="block body-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    id="description" name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows="3" className="w-full p-2 border border-gray-300 rounded-button focus:ring-primary focus:ring-2 focus:outline-none" placeholder="Describe your goal and why it's important to you"
                  ></textarea>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label htmlFor="currentValue" className="block body-medium text-gray-700 mb-1">
                      Current Value
                    </label>
                    <input
                      type="number" id="currentValue" name="currentValue"
                      value={formData.currentValue}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded-button focus:ring-primary focus:ring-2 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label htmlFor="targetValue" className="block body-medium text-gray-700 mb-1">
                      Target Value
                    </label>
                    <input
                      type="number" id="targetValue" name="targetValue"
                      value={formData.targetValue}
                      onChange={handleChange}
                      className={`w-full p-2 border rounded-button focus:ring-primary focus:ring-2 focus:outline-none ${
                        errors.targetValue ? "border-error" : "border-gray-300"
                      }`}
                    />
                    {errors.targetValue && (
                      <p className="text-error text-xs mt-1">{errors.targetValue}</p>
                    )}
                  </div>
                </div>

                <div className="mb-4">
                  <label htmlFor="unit" className="block body-medium text-gray-700 mb-1">
                    Unit
                  </label>
                  <select
                    id="unit" name="unit"
                    value={formData.unit}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-button focus:ring-primary focus:ring-2 focus:outline-none"
                  >
                    {unitOptions[formData.category].map((unit) => (
                      <option key={unit} value={unit}>
                        {unit}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label htmlFor="startDate" className="block body-medium text-gray-700 mb-1">
                      Start Date
                    </label>
                    <input
                      type="date" id="startDate" name="startDate"
                      value={formData.startDate}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded-button focus:ring-primary focus:ring-2 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label htmlFor="endDate" className="block body-medium text-gray-700 mb-1">
                      End Date
                    </label>
                    <input
                      type="date" id="endDate" name="endDate"
                      value={formData.endDate}
                      onChange={handleChange}
                      className={`w-full p-2 border rounded-button focus:ring-primary focus:ring-2 focus:outline-none ${
                        errors.endDate ? "border-error" : "border-gray-300"
                      }`}
                    />
                    {errors.endDate && (
                      <p className="text-error text-xs mt-1">{errors.endDate}</p>
                    )}
                  </div>
                </div>

                <div className="flex justify-end mt-6">
                  <button
                    type="button"
                    onClick={handleNext}
                    className="button-text bg-primary-500 text-white px-4 py-2 rounded-button hover:bg-primary-600 transition-colors"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <div className="mb-6">
                  <label className="block body-medium text-gray-700 mb-2">
                    Choose an Icon
                  </label>
                  <div className="grid grid-cols-5 gap-2">
                    {iconOptions[formData.category].map((icon) => (
                      <button
                        key={icon}
                        type="button"
                        className={`flex items-center justify-center p-3 rounded-full ${
                          formData.icon === icon
                            ? "bg-primary-500 bg-opacity-10" :"bg-gray-100 hover:bg-gray-200"
                        } transition-colors`}
                        onClick={() => setFormData({ ...formData, icon })}
                      >
                        <Icon
                          name={icon}
                          size={20}
                          color={
                            formData.icon === icon
                              ? "var(--color-primary)" :"var(--color-gray-500)"
                          }
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block body-medium text-gray-700 mb-2">
                    Choose a Color
                  </label>
                  <div className="grid grid-cols-6 gap-2">
                    {colorOptions.map((color) => (
                      <button
                        key={color.id}
                        type="button"
                        className={`h-10 rounded-full border-2 ${
                          formData.color === color.id
                            ? "border-gray-900" :"border-transparent"
                        }`}
                        style={{ backgroundColor: color.value }}
                        onClick={() => setFormData({ ...formData, color: color.id })}
                        title={color.name}
                      ></button>
                    ))}
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block body-medium text-gray-700 mb-2">
                    Milestones
                  </label>
                  <p className="body-small text-gray-500 mb-3">
                    Breaking your goal into smaller milestones can help you stay motivated.
                  </p>
                  
                  {formData.milestones.map((milestone, index) => (
                    <div key={milestone.id} className="flex items-center mb-2">
                      <input
                        type="number"
                        value={milestone.value}
                        onChange={(e) => {
                          const newMilestones = [...formData.milestones];
                          newMilestones[index].value = parseFloat(e.target.value);
                          setFormData({ ...formData, milestones: newMilestones });
                        }}
                        className="w-24 p-2 border border-gray-300 rounded-button focus:ring-primary focus:ring-2 focus:outline-none mr-2"
                      />
                      <span className="body-medium text-gray-700 mr-2">
                        {formData.unit}
                      </span>
                      <span className="body-small text-gray-500">
                        Milestone {index + 1}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mb-4">
                  <div className="flex items-center">
                    <input
                      type="checkbox" id="notifications" name="notifications"
                      checked={formData.notifications}
                      onChange={handleChange}
                      className="h-4 w-4 text-primary-500 border-gray-300 rounded focus:ring-primary"
                    />
                    <label htmlFor="notifications" className="ml-2 block body-medium text-gray-700">
                      Enable Notifications
                    </label>
                  </div>
                  <p className="body-small text-gray-500 mt-1 ml-6">
                    Receive reminders and updates about your goal progress
                  </p>
                </div>

                <div className="flex justify-between mt-6">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="button-text bg-gray-100 text-gray-700 px-4 py-2 rounded-button hover:bg-gray-200 transition-colors"
                  >
                    Back
                  </button>
                  <button
                    type="submit" className="button-text bg-primary-500 text-white px-4 py-2 rounded-button hover:bg-primary-600 transition-colors"
                  >
                    {isEditing ? "Save Changes" : "Create Goal"}
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateGoalModal;