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

export const updateEvent = (updatedEvent, setOriginalEvents) => {
  const events = getEvents();
  const index = events.findIndex((event) => event.id === updatedEvent.id);

  if (index !== -1) {
    events[index] = updatedEvent;
    localStorage.setItem("events", JSON.stringify(events));
    setOriginalEvents(events); // Update the state
  }
};
