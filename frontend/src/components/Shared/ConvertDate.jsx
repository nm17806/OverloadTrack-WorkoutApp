export default function ConvertDate(date) {
  const originalDate = new Date(date);

  const day = originalDate.getDate();
  const month = originalDate.getMonth() + 1; // Months are zero-indexed, so we add 1
  const year = originalDate.getFullYear();

  // let hours = originalDate.getHours();
  // const ampm = hours >= 12 ? "PM" : "AM";

  // Convert hours from 24-hour format to 12-hour format
  // hours = hours % 12;
  // Convert '0' hours (midnight) to '12'
  // hours = hours ? hours : 12;

  // Pad single-digit day, month, and hours with leading zeros
  const formattedDay = day < 10 ? `0${day}` : day;
  const formattedMonth = month < 10 ? `0${month}` : month;
  // const formattedHours = hours < 10 ? `0${hours}` : hours;

  const formattedDate = `${formattedDay}-${formattedMonth}-${year}`;

  return formattedDate;
}
