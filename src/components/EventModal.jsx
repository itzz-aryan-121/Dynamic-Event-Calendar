import React, { useState } from "react";
import EventList from "./EventList";
import EventForm from "./EventForm";

const EventModal = ({
  date,
  events,
  onSave,
  onDelete,
  onUpdate,
  onClose,
}) => {
  const [isAdding, setIsAdding] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleAddClick = () => {
    setIsAdding(true);
    setEditingIndex(null);
  };

  const handleEditClick = (index) => {
    setEditingIndex(index);
    setIsAdding(false);
  };

  const handleDeleteClick = (index) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      setIsLoading(true);
      onDelete(date, index).finally(() => setIsLoading(false));
    }
  };

  const handleSave = (newEvent) => {
    setIsLoading(true);
    if (editingIndex !== null) {
      onUpdate(date, editingIndex, newEvent).finally(() => setIsLoading(false));
    } else {
      onSave(date, newEvent).finally(() => setIsLoading(false));
    }
    setIsAdding(false);
    setEditingIndex(null);
  };

  const handleCancel = () => {
    setIsAdding(false);
    setEditingIndex(null);
  };

  const handleCloseModal = () => {
    if (!isLoading) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
      onClick={handleCloseModal}
    >
      <div
        className="bg-gray-900 text-white p-6 rounded-lg shadow-lg w-96 max-h-full overflow-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-bold mb-4 text-center">Events for {date}</h2>

        {/* Event List */}
        {!isAdding && editingIndex === null && (
          <>
            <EventList
              events={events}
              onEdit={handleEditClick}
              onDelete={handleDeleteClick}
            />
            <div className="mt-4 flex justify-end">
              <button
                onClick={handleAddClick}
                className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 transform transition-all duration-300 ease-in-out hover:scale-105"
                disabled={isLoading}
              >
                {isLoading ? "Loading..." : "Add Event"}
              </button>
            </div>
          </>
        )}

        {/* Event Form for Adding/Editing */}
        {(isAdding || editingIndex !== null) && (
          <div
            className={`${
              isAdding ? "opacity-100 scale-100" : "opacity-0 scale-95"
            } transform transition-all duration-300 ease-out`}
          >
            <EventForm
              initialData={editingIndex !== null ? events[editingIndex] : {}}
              onSave={handleSave}
              onCancel={handleCancel}
              isLoading={isLoading}
            />
          </div>
        )}

        <div className="mt-4 flex justify-end">
          <button
            onClick={handleCloseModal}
            className="px-4 py-2 text-sm text-gray-300 border border-gray-500 rounded-md hover:bg-gray-700"
            disabled={isLoading}
          >
            {isLoading ? "Closing..." : "Close"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventModal;
