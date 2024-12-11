import React from "react";


const getDaysInMonth = (year, month) => {
  const days = [];
  const firstDay = new Date(year, month, 1).getDay();
  const lastDate = new Date(year, month + 1, 0).getDate();


  for (let i = 0; i < firstDay; i++) {
    days.push(null);
  }

 
  for (let date = 1; date <= lastDate; date++) {
    days.push(date);
  }

  return days;
};

const CalendarGrid = ({ events, setSelectedDate, setModalOpen }) => {
  const [currentMonth, setCurrentMonth] = React.useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = React.useState(new Date().getFullYear());

  const days = getDaysInMonth(currentYear, currentMonth);

  const handleDateClick = (date) => {
    if (date) {
      const selected = `${currentYear}-${String(currentMonth + 1).padStart(
        2,
        "0"
      )}-${String(date).padStart(2, "0")}`;
      setSelectedDate(selected);
      setModalOpen(true);
    }
  };

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-6">
        {/* Previous Month Button */}
        <button
          onClick={handlePrevMonth}
          className="text-white bg-indigo-700 hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 px-6 py-2 rounded-lg shadow-md transform hover:scale-105 transition-all duration-300"
        >
          &lt;
        </button>

        {/* Month and Year Display */}
        <h2 className="text-3xl font-semibold text-white text-center">
          {new Date(currentYear, currentMonth).toLocaleString("default", {
            month: "long",
          })}{" "}
          {currentYear}
        </h2>

        {/* Next Month Button */}
        <button
          onClick={handleNextMonth}
          className="text-white bg-indigo-700 hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 px-6 py-2 rounded-lg shadow-md transform hover:scale-105 transition-all duration-300"
        >
          &gt;
        </button>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-4 text-lg font-semibold text-gray-300">
        {/* Days of the Week Header */}
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className="text-center text-gray-500">{day}</div>
        ))}
        {/* Calendar Days */}
        {days.map((date, index) => (
          <div
            key={index}
            className={`p-4 relative rounded-xl transition-all duration-200 cursor-pointer ${
              date ? "bg-gray-700 hover:bg-gray-600" : "bg-transparent"
            } ${date && events[`${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(date).padStart(2, "0")}`] ? "border-2 border-indigo-500" : ""}`}
            onClick={() => handleDateClick(date)}
          >
            {date}
            {date &&
              events[
                `${currentYear}-${String(currentMonth + 1).padStart(
                  2,
                  "0"
                )}-${String(date).padStart(2, "0")}`
              ] && (
                <div className="absolute top-0 right-0 mt-1 mr-1 bg-indigo-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  !
                </div>
              )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CalendarGrid;
