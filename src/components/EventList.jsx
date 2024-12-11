import React from "react";

const EventList = ({ events, onEdit, onDelete }) => {
  if (events.length === 0) {
    return (
      <div className="text-center py-4">
        <p className="text-xl text-gray-500">No events for this day.</p>
      </div>
    );
  }

  const handleDelete = (index) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      onDelete(index);
    }
  };

  return (
    <div className="space-y-6">
      {events.map((event, index) => (
        <div
          key={index}
          className="border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 transform hover:scale-105"
        >
          <div className="flex justify-between items-center p-4 border-b">
            <h3 className="text-lg font-semibold text-white">{event.eventName}</h3>
            <div className="flex space-x-2">
              <button
                className="px-3 py-1 text-sm text-blue-600 border border-blue-600 rounded hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transform transition duration-200 ease-in-out hover:scale-105"
                onClick={() => onEdit(index)}
              >
                Edit
              </button>
              <button
                className="px-3 py-1 text-sm text-red-600 border border-red-600 rounded hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500 transform transition duration-200 ease-in-out hover:scale-105"
                onClick={() => handleDelete(index)}
              >
                Delete
              </button>
            </div>
          </div>
          <div className="p-4">
            <p className="text-gray-700">
              <strong>Time:</strong> <span className="text-blue-600">{event.startTime}</span> -{" "}
              <span className="text-blue-600">{event.endTime}</span>
            </p>
            {event.description && (
              <p className="mt-2 text-gray-600">
                <strong>Description:</strong> {event.description}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default EventList;
