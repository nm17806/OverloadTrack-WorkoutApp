import clsx from "clsx";
import { eachDayOfInterval, endOfMonth, format, getDay, isToday, startOfMonth, subMonths, addMonths } from "date-fns";
import { useMemo, useState } from "react";
import "./EventCalendar.css";
import ConvertDate from "../Shared/ConvertDate";

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const SessionCalendar = ({ sessions }) => {
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
      console.log(sessions);
      const map = {};
      // eslint-disable-next-line no-unused-vars
      Object.entries(sessions).forEach(([recordId, sessions]) => {
        const date = ConvertDate(sessions[0].workout_date);
        map[date] = { template_name: sessions[0].template_name, record_id: recordId };
      });
      console.log(map);
      return map;
    } else {
      return {};
    }
  }, [sessions]);

  const handleSessionSelection = (recordId) => {
    console.log(recordId);
  };

  const goToPreviousMonth = () => {
    setCurrentDate(subMonths(currentDate, 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1));
  };

  return (
    <div className="container">
      <div className="mb-4">
        <h2 className="text-center">{format(currentDate, "MMMM yyyy")}</h2>
        <button onClick={goToPreviousMonth}>&lt;</button>
        <button onClick={goToNextMonth}>&gt;</button>
      </div>
      <div className="grid">
        {WEEKDAYS.map((day) => {
          return (
            <div key={day} className="font-bold text-center">
              {day}
            </div>
          );
        })}
        {Array.from({ length: startingDayIndex }).map((_, index) => {
          return <div key={`empty-${index}`} className="border rounded-md p-2 text-center" />;
        })}
        {daysInMonth.map((day, index) => {
          const formattedDate = ConvertDate(day);
          const templateName = dateSessionMap[formattedDate];
          return (
            <div
              key={index}
              className={clsx("border rounded-md p-2 text-center", {
                "bg-gray-200": isToday(day),
                "text-gray-900": isToday(day),
              })}
            >
              {format(day, "d")}
              {templateName && (
                <div
                  onClick={() => handleSessionSelection(templateName.record_id)}
                  style={{ cursor: "pointer" }}
                  className="border rounded-md bg-secondary text-light"
                >
                  {templateName.template_name}
                </div>
              )}
              {!templateName ||
                (!templateName.template_name && <div>{templateName ? templateName.template_name : "\u00A0"}</div>)}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SessionCalendar;
