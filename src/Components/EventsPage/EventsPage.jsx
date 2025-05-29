import React, { useEffect, useState } from "react";
import styles from "./EventsPage.module.css";

const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("uk-UA");
  };

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(
          "https://683765a02c55e01d1849bbe3.mockapi.io/events"
        );
        const data = await response.json();
        setEvents(data);
      } catch (err) {
        setError("Не вдалося завантажити події.");
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
        <p className={styles.loading}>Завантаження...</p>
      ) : error ? (
        <p className={styles.error}>{error}</p>
      ) : (
        <div className={styles.grid}>
          {events.map((event) => (
            <div key={event.id} className={styles.card}>
              <div
                className={styles.image}
                style={{
                  backgroundImage: `url(${
                    event.image ||
                    "https://via.placeholder.com/500x200.png?text=Подія"
                  })`,
                }}
              />
              <div className={styles.content}>
                <div className={styles.headerRow}>
                  <h2 className={styles.eventTitle}>{event.title}</h2>
                  <button className={styles.detailsButton}>Деталі</button>
                </div>
                <div className={styles.priceRow}>
                  <div>
                    <p className={styles.label}>Дата</p>
                    <p className={styles.price}>{formatDate(event.date)}</p>
                  </div>
                  <div>
                    <p className={styles.label}>Категорія</p>
                    <p className={styles.price}>{event.category}</p>
                  </div>
                </div>
                <div className={styles.footer}>
                  <span className={styles.author}>
                    {event.email || "Ім’я невідоме"}
                  </span>
                  <span className={styles.participants}>47 учасників</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EventsPage;
