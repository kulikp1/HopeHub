import React, { useEffect, useState } from "react";
import styles from "./EventsPage.module.css";

const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(
          "https://683765a02c55e01d1849bbe3.mockapi.io/events"
        );
        const data = await response.json();
        setEvents(data);
      } catch (err) {
        setError("Failed to load events.");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Усі благодійні події</h1>
      {isLoading ? (
        <p>Завантаження...</p>
      ) : error ? (
        <p className={styles.error}>{error}</p>
      ) : (
        <div className={styles.grid}>
          {events.map((event) => (
            <div key={event.id} className={styles.card}>
              <h2 className={styles.eventTitle}>{event.title}</h2>
              <p>
                <strong>Дата:</strong> {event.date}
              </p>
              <p>
                <strong>Місце:</strong> {event.location}
              </p>
              <p>
                <strong>Категорія:</strong> {event.category}
              </p>
              <p className={styles.description}>{event.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EventsPage;
