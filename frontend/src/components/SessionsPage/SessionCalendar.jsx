import { eachDayOfInterval, endOfMonth, format, getDay, isToday, startOfMonth, subMonths, addMonths } from "date-fns";
import React, { useMemo, useState } from "react";
import "./SessionCalendar.css";
import ConvertDate from "../Shared/ConvertDate";

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

// ... (imports)

const SessionCalendar = ({ sessions, onSelectedRecordId }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const firstDayOfMonth = startOfMonth(currentDate);
  const lastDayOfMonth = endOfMonth(currentDate);

  const daysInMonth = eachDayOfInterval({
    start: firstDayOfMonth,
    end: lastDayOfMonth,
  });

  const startingDayIndex = getDay(firstDayOfMonth);

  const dateSessionMap = useMemo(() => {
    if (sessions) {
      const map = {};
      // eslint-disable-next-line no-unused-vars
      Object.entries(sessions).forEach(([recordId, sessions]) => {
        const date = ConvertDate(sessions[0].workout_date);
        map[date] = { template_name: sessions[0].template_name, record_id: recordId };
      });
      return map;
    } else {
      return {};
    }
  }, [sessions]);

  const handleSessionSelection = (recordId) => {
    onSelectedRecordId(recordId);
  };

  const goToPreviousMonth = () => {
    setCurrentDate(subMonths(currentDate, 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1));
  };

  return (
    <React.Fragment>
      <div className="event-calendar-container">
        <div className="header">
          <h2 className="text-center">{format(currentDate, "MMMM yyyy")}</h2>
          <div className="button-container">
            <button className="nav-button" onClick={goToPreviousMonth}>
              &lt;
            </button>
            <button className="nav-button" onClick={goToNextMonth}>
              &gt;
            </button>
          </div>
        </div>
        <div className="grid">
          {WEEKDAYS.map((day) => (
            <div key={day} className="day-label font-bold text-center">
              {day}
            </div>
          ))}
          {Array.from({ length: startingDayIndex }).map((_, index) => (
            <div key={`empty-${index}`} className="empty-day border text-center" />
          ))}
          {daysInMonth.map((day, index) => {
            const formattedDate = ConvertDate(day);
            const templateName = dateSessionMap[formattedDate];
            return (
              <div key={index} className={`day-cell border text-center ${isToday(day) ? "today-cell" : ""}`}>
                {format(day, "d")}
                {templateName && (
                  <div
                    onClick={() => handleSessionSelection(templateName.record_id)}
                    className="event-cell border bg-secondary text-light"
                  >
                    {templateName.template_name}
                  </div>
                )}
                {!templateName && <div>{templateName ? templateName.template_name : "\u00A0"}</div>}
              </div>
            );
          })}
        </div>
      </div>
    </React.Fragment>
  );
};

export default SessionCalendar;
