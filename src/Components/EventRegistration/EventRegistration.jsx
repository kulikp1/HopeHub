import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import emailjs from "@emailjs/browser";
import Header from "../Header/Header";
import styles from "./EventRegistration.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EventRegistration = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [eventTitle, setEventTitle] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [comment, setComment] = useState("");

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await fetch(
          `https://683765a02c55e01d1849bbe3.mockapi.io/events/${eventId}`
        );
        if (!response.ok) throw new Error("Не вдалося завантажити подію.");
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

    const templateParams = {
      user_name: name,
      user_email: email,
      user_role: role,
      user_comment: comment,
      event_title: eventTitle,
      to_email: "inn.danilets@gmail.com",
    };

    emailjs
      .send(
        "service_iipo9jf", // замінити на свій ID сервісу
        "template_zmkz95g", // замінити на свій ID шаблону
        templateParams,
        "14JdtebUlkz_ibUbx" // публічний ключ
      )
      .then(() => {
        // Після успішного надсилання листа, зберегти користувача в MockAPI
        fetch("https://683a251d43bb370a8671f70a.mockapi.io/registerUser", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            role,
            comment,
            eventTitle,
          }),
        })
          .then((res) => {
            if (!res.ok) {
              throw new Error("Помилка збереження користувача");
            }
            return res.json();
          })
          .then(() => {
            toast.success("Реєстрація успішна!");
            setName("");
            setEmail("");
            setRole("");
            setComment("");
          })
          .catch((err) => {
            console.error("Помилка при збереженні в MockAPI:", err);
            toast.warning("Реєстрація відправлена, але не збережена.");
          });
      })
      .catch((err) => {
        console.error("Помилка надсилання email:", err);
        toast.error("❌ Щось пішло не так. Спробуйте ще раз.");
      });
  };

  const handleBackClick = () => navigate("/events");

  return (
    <>
      <Header />
      <ToastContainer position="top-right" autoClose={3000} />
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
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <input
                className={styles.formInput}
                type="email"
                name="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <select
                className={styles.formInput}
                name="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                required
              >
                <option value="" disabled>
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
                value={comment}
                onChange={(e) => setComment(e.target.value)}
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
