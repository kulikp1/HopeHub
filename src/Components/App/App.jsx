import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import StartPage from "../StartPage/StartPage";
import HomePage from "../HomePage/HomePage";
import EventsPage from "../EventsPage/EventsPage";
import SponsorPage from "../SponsorPage/SponsorPage";
import EventRegistration from "../EventRegistration/EventRegistration";
import News from "../NewsPage/NewsPage";
import ChangeNews from "../ChangeNews/ChangeNews";
import ChangeEvents from "../ChangeEvents/ChangeEvents";

// Приватна маршрутизація
const PrivateRoute = ({ element, isAuthenticated }) => {
  return isAuthenticated ? element : <Navigate to="/" />;
};

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Перевірка логіна через localStorage
  useEffect(() => {
    const userEmail = localStorage.getItem("userEmail");
    setIsAuthenticated(!!userEmail);
  }, []);

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
        <Route
          path="/changeNews"
          element={
            <PrivateRoute
              element={<ChangeNews />}
              isAuthenticated={isAuthenticated}
            />
          }
        />
        <Route
          path="/changeEvents"
          element={
            <PrivateRoute
              element={<ChangeEvents />}
              isAuthenticated={isAuthenticated}
            />
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
