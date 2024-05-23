export const formatDate = (isoDate: string): string => {
  const date = new Date(isoDate);

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const dayOfWeek = daysOfWeek[date.getDay()];

  const hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";
  const formattedHours = hours % 12 || 12;
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  const formattedDate = `${dayOfWeek}, ${formattedHours}:${formattedMinutes} ${ampm} - ${year}-${
    month < 10 ? `0${month}` : month
  }-${day < 10 ? `0${day}` : day}`;

  return formattedDate;
};
