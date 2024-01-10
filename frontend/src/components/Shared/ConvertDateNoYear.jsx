export default function ConvertDateNoYear(date) {
  const originalDate = new Date(date);

  const day = originalDate.getDate();
  const month = originalDate.getMonth() + 1; // Months are zero-indexed, so we add 1

  // Pad single-digit day, month, and hours with leading zeros
  const formattedDay = day < 10 ? `0${day}` : day;
  const formattedMonth = month < 10 ? `0${month}` : month;
  // const formattedHours = hours < 10 ? `0${hours}` : hours;

  const formattedDate = `${formattedDay}/${formattedMonth}`;

  return formattedDate;
}
