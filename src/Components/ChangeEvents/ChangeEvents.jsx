import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./ChangeEvents.module.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ChangeEvents = () => {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const userEmail = localStorage.getItem("userEmail");

    fetch("https://683765a02c55e01d1849bbe3.mockapi.io/events")
      .then((res) => res.json())
      .then((data) => {
        const filteredEvents = data.filter(
          (event) => event.email === userEmail
        );
        setEvents(filteredEvents);
      })
      .catch(() => toast.error("Помилка завантаження подій"));
  }, []);

  const handleDelete = async (id) => {
    try {
      await fetch(`https://683765a02c55e01d1849bbe3.mockapi.io/events/${id}`, {
        method: "DELETE",
      });
      setEvents((prevEvents) => prevEvents.filter((e) => e.id !== id));
      toast.success("Подію видалено");
    } catch {
      toast.error("Помилка при видаленні");
    }
  };

  return (
    <div className={styles.eventsContainer}>
      <button className={styles.backButton} onClick={() => navigate(-1)}>
        ⬅ Повернутись назад
      </button>

      {events.length > 0 ? (
        events.map((event) => (
          <div key={event.id} className={styles.eventModal}>
            <h2 className={styles.eventTitle}>{event.title}</h2>
            <p className={styles.eventDescription}>{event.description}</p>
            <button
              className={styles.removeButton}
              onClick={() => handleDelete(event.id)}
            >
              Видалити
            </button>
          </div>
        ))
      ) : (
        <p>У вас ще немає доданих подій.</p>
      )}

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default ChangeEvents;
