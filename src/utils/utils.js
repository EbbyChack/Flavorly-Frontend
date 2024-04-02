export const url = "https://localhost:7074/";

export const token = () => {
  const root = localStorage.getItem("persist:root");
  const auth = JSON.parse(root).auth;
  const token = JSON.parse(auth).loggedProfile;
  return token;
};

export const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based in JavaScript
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  

  return `${day}/${month}/${year} ${hours}:${minutes}`;
};
export const formatDateNoTime = (dateString) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based in JavaScript
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
};
