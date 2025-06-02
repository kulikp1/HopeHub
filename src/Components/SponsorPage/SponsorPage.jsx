import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./SponsorPage.module.css";
import Header from "../Header/Header";
import donatePhoto from "../../assets/qrDonate.jpg";

const SponsorPage = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`https://683765a02c55e01d1849bbe3.mockapi.io/events/${id}`)
      .then((res) => res.json())
      .then((data) => setEvent(data))
      .catch((err) => console.error("Помилка при завантаженні події", err));
  }, [id]);

  if (!event) return <p className={styles.loading}>Завантаження...</p>;

  return (
    <>
      <Header />
      <div className={styles.container}>
        <div className={styles.contentWrapper}>
          <div className={styles.left}>
            <img className={styles.image} src={event.image} alt={event.title} />
            <div className={styles.info}>
              <h2>{event.title}</h2>
              <p>
                <strong>Опис:</strong> {event.description}
              </p>
              <p>
                <strong>Мета:</strong> {event.goal}
              </p>
              <p>
                <strong>Категорія:</strong> {event.category}
              </p>
              <p>
                <strong>Місце:</strong> {event.location}
              </p>
              <p>
                <strong>Дата:</strong>{" "}
                {new Date(event.date).toLocaleDateString()}
              </p>
              <p>
                <strong>Час:</strong> {event.time}
              </p>
              <p>
                <strong>Контактний email:</strong> {event.email}
              </p>

              <button
                className={styles.backButton}
                onClick={() => navigate("/events")}
              >
                ← Повернутися
              </button>
            </div>
          </div>

          <div className={styles.right}>
            <h2 className={styles.subheading}>Підтримайте ініціативу</h2>
            <p>
              Скористайтесь QR-кодом або перейдіть за посиланням для донату:
            </p>
            <img
              className={styles.qr}
              src={donatePhoto}
              alt="QR code for donation"
            />
            <a
              className={styles.donateLink}
              href="https://send.monobank.ua/jar/8p1GN7Jv1H/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Перейти до сторінки донату
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default SponsorPage;
