export const formatMoney = (amount) => {
  if (typeof amount !== "number") return amount; // Return as is if not a number
  return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","); // Format the number
};

export const formatDate = (date) => {
  if (!(date instanceof Date)) {
    throw new Error("Input must be a Date object");
  }

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

export const getHoursAndMinutesFromDate = (dateString) => {
  const date = new Date(dateString);
  const hours = String(date.getHours()).padStart(2, "0"); // Get hours and pad with leading zero
  const minutes = String(date.getMinutes()).padStart(2, "0"); // Get minutes and pad with leading zero
  return `${hours}:${minutes}`;
};

export const convertMinutesNumberToString = (minutes) => {
  if (minutes < 60) {
    return `${minutes} minutes`;
  } else {
    return `${Math.floor(minutes / 60)} hrs ${minutes % 60} min`;
  }
};
