import React, { useState } from "react";

const EventForm = ({ initialData = {}, onSave, onCancel }) => {
  const [eventName, setEventName] = useState(initialData.eventName || "");
  const [startTime, setStartTime] = useState(initialData.startTime || "");
  const [endTime, setEndTime] = useState(initialData.endTime || "");
  const [description, setDescription] = useState(initialData.description || "");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = () => {
    if (!eventName || !startTime || !endTime) {
      setError("Please fill in all required fields.");
      return;
    }

    if (startTime >= endTime) {
      setError("Start time must be before end time.");
      return;
    }

    setError(""); 
    setIsLoading(true); 

    setTimeout(() => {
      onSave({ eventName, startTime, endTime, description });
      setIsLoading(false); 
    }, 1000); 
  };

  return (
    <div className="space-y-6 max-w-xl mx-auto bg-gray-800 p-6 rounded-lg shadow-lg">
      {error && <p className="text-red-500 text-sm font-medium">{error}</p>}
      <div>
        <label htmlFor="eventName" className="block text-sm font-medium text-gray-300">
          Event Name
        </label>
        <input
          id="eventName"
          className="mt-1 p-3 w-full border border-gray-600 rounded-md focus:ring-2 focus:ring-indigo-500 bg-gray-700 text-white"
          placeholder="Enter event name"
          value={eventName}
          onChange={(e) => setEventName(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="startTime" className="block text-sm font-medium text-gray-300">
          Start Time
        </label>
        <input
          id="startTime"
          type="time"
          className="mt-1 p-3 w-full border border-gray-600 rounded-md focus:ring-2 focus:ring-indigo-500 bg-gray-700 text-white"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="endTime" className="block text-sm font-medium text-gray-300">
          End Time
        </label>
        <input
          id="endTime"
          type="time"
          className="mt-1 p-3 w-full border border-gray-600 rounded-md focus:ring-2 focus:ring-indigo-500 bg-gray-700 text-white"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-300">
          Description (Optional)
        </label>
        <textarea
          id="description"
          className="mt-1 p-3 w-full border border-gray-600 rounded-md focus:ring-2 focus:ring-indigo-500 bg-gray-700 text-white"
          placeholder="Enter event description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div className="flex justify-end space-x-4 mt-6">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-sm text-gray-300 border border-gray-600 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={handleSubmit}
          className={`px-4 py-2 text-sm text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transform transition duration-200 ease-in-out hover:scale-105 ${
            isLoading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={isLoading}
        >
          {isLoading ? (
            <span className="animate-spin text-lg">🌀</span> 
          ) : (
            "Save"
          )}
        </button>
      </div>
    </div>
  );
};

export default EventForm;
