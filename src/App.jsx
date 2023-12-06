// App.js
import React from "react";
import "./App.css";
import Calendar from "./components/Calendar";
import Events from "./components/Events";
import Header from "./components/Header";
import AddEventButton from "./components/AddEvent";
import AddEventModal from "./components/AddEventModal";

function App() {
  return (
    <div className="App">
      <Header />
      <div className="master-container">
        <Calendar />
        <Events />
        <AddEventButton />
      </div>
      <AddEventModal />
    </div>
  );
}

export default App;
