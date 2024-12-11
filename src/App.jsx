import React, { useState } from "react";
import CalendarGrid from "./components/CalendarGrid";
import EventModal from "./components/EventModal";

const App = () => {
  const [events, setEvents] = useState(
    JSON.parse(localStorage.getItem("events")) || {}
  );
  const [selectedDate, setSelectedDate] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleEventSave = (date, newEvent) => {
    const updatedEvents = {
      ...events,
      [date]: [...(events[date] || []), newEvent],
    };
    setEvents(updatedEvents);
    localStorage.setItem("events", JSON.stringify(updatedEvents));
  };

  const handleEventDelete = (date, eventIndex) => {
    const updatedEvents = { ...events };
    updatedEvents[date].splice(eventIndex, 1);
    if (updatedEvents[date].length === 0) delete updatedEvents[date];
    setEvents(updatedEvents);
    localStorage.setItem("events", JSON.stringify(updatedEvents));
  };

  const handleEventUpdate = (date, eventIndex, updatedEvent) => {
    const updatedEvents = { ...events };
    updatedEvents[date][eventIndex] = updatedEvent;
    setEvents(updatedEvents);
    localStorage.setItem("events", JSON.stringify(updatedEvents));
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <header className="p-6 flex justify-center items-center relative">
        
        <div className="flex justify-center items-center bg-gradient-to-r from-indigo-600 via-indigo-800 to-indigo-600 p-4 rounded-full shadow-xl w-[250px] h-[70px]">
          <h1 className="text-xl font-bold text-white text-center">Event Calendar</h1>
        </div>
      </header>
      <main className="p-6">
        <CalendarGrid
          events={events}
          setSelectedDate={setSelectedDate}
          setModalOpen={setModalOpen}
        />
        {modalOpen && (
          <EventModal
            date={selectedDate}
            events={events[selectedDate] || []}
            onSave={handleEventSave}
            onDelete={handleEventDelete}
            onUpdate={handleEventUpdate} 
            onClose={() => setModalOpen(false)}
          />
        )}
      </main>
    </div>
  );
};

export default App;
