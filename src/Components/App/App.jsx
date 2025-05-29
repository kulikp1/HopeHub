import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import StartPage from "../StartPage/StartPage";
import HomePage from "../HomePage/HomePage";
import EventsPage from "../EventsPage/EventsPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/events" element={<EventsPage />} />
      </Routes>
    </Router>
  );
};

export default App;
