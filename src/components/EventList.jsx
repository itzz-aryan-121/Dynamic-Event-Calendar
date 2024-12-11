import React from "react";
import { saveAs } from "file-saver";

const EventList = ({ events, onEdit, onDelete }) => {
  // Convert events to CSV format
  const convertToCSV = (events) => {
    const headers = ["Event Name", "Start Time", "End Time", "Description"];
    const rows = events.map((event) => [
      event.eventName,
      event.startTime,
      event.endTime,
      event.description || "",
    ]);

    // Combine headers and rows
    const csvContent = [
      headers.join(","),
      ...rows.map((row) => row.join(",")),
    ].join("\n");

    return csvContent;
  };

  // Export events to JSON file
  const exportToJSON = () => {
    const blob = new Blob([JSON.stringify(events, null, 2)], {
      type: "application/json",
    });
    saveAs(blob, "events.json");
  };

  // Export events to CSV file
  const exportToCSV = () => {
    const csvContent = convertToCSV(events);
    const blob = new Blob([csvContent], { type: "text/csv" });
    saveAs(blob, "events.csv");
  };

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
      <div className="flex justify-end space-x-4 mb-6">
        <button
          onClick={exportToJSON}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Export as JSON
        </button>
        <button
          onClick={exportToCSV}
          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
        >
          Export as CSV
        </button>
      </div>
      {events.map((event, index) => (
        <div
          key={index}
          className="border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
        >
          <div className="flex justify-between items-center p-4 border-b">
            <h3 className="text-lg font-semibold text-gray-900">{event.eventName}</h3>
            <div className="flex space-x-2">
              <button
                className="px-3 py-1 text-sm text-blue-600 border border-blue-600 rounded hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                onClick={() => onEdit(index)}
              >
                Edit
              </button>
              <button
                className="px-3 py-1 text-sm text-red-600 border border-red-600 rounded hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500"
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
