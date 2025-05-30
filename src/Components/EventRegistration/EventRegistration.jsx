import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../Header/Header";
import styles from "./EventRegistration.module.css";

const EventRegistration = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [eventTitle, setEventTitle] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await fetch(
          `https://683765a02c55e01d1849bbe3.mockapi.io/events/${eventId}`
        );
        if (!response.ok) {
          throw new Error("Не вдалося завантажити подію.");
        }
        const data = await response.json();
        setEventTitle(data.title);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [eventId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Реєстрація успішна!");
    // Тут можна реалізувати відправку даних на сервер
  };

  const handleBackClick = () => {
    navigate("/events");
  };

  return (
    <>
      <Header />
      <div className={styles.container}>
        {loading ? (
          <p>Завантаження...</p>
        ) : error ? (
          <p className={styles.error}>{error}</p>
        ) : (
          <>
            <h2 className={styles.title}>
              Реєстрація на подію: <br />
              {eventTitle}
            </h2>
            <form onSubmit={handleSubmit} className={styles.form}>
              <input
                className={styles.formInput}
                type="text"
                name="name"
                placeholder="Ім’я"
                required
              />
              <input
                className={styles.formInput}
                type="email"
                name="email"
                placeholder="Email"
                required
              />
              <select className={styles.formInput} name="role" required>
                <option value="" disabled selected>
                  Оберіть роль
                </option>
                <option value="Водій">Водій</option>
                <option value="Кухар">Кухар</option>
                <option value="Швея">Швея</option>
                <option value="Журналіст">Журналіст</option>
                <option value="Медійна особа">Медійна особа</option>
                <option value="Вільні руки">"Вільні руки"</option>
              </select>
              <input
                className={styles.formInput}
                type="text"
                name="comment"
                placeholder="Коментар (необов’язково)"
              />
              <button className={styles.registrationBtn} type="submit">
                Зареєструватися
              </button>
            </form>
          </>
        )}
      </div>
      <button onClick={handleBackClick} className={styles.backBtn}>
        ← Повернутися
      </button>
    </>
  );
};

export default EventRegistration;
