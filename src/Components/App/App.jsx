import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import StartPage from "../StartPage/StartPage";
import HomePage from "../HomePage/HomePage";
import EventsPage from "../EventsPage/EventsPage";
import SponsorPage from "../SponsorPage/SponsorPage";
import EventRegistration from "../EventRegistration/EventRegistration";
import News from "../NewsPage/NewsPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/sponsor/:id" element={<SponsorPage />} />
        <Route
          path="/event/:eventId/register"
          element={<EventRegistration />}
        />
        <Route path="/news" element={<News />} />
      </Routes>
    </Router>
  );
};

export default App;
