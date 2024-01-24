// dataService.js
export const getEvents = () => {
  const events = localStorage.getItem("events");
  return events ? JSON.parse(events) : [];
};

export const addEvent = (event) => {
  const events = getEvents();
  events.push(event);
  localStorage.setItem("events", JSON.stringify(events));
};
