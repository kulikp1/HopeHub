import React from "react";
import styles from "./EventModal.module.css";

const EventModal = ({ event, onClose, formatDate }) => {
  if (!event) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>
          ×
        </button>

        <div
          className={styles.image}
          style={{
            backgroundImage: `url(${
              event.image || "https://via.placeholder.com/600x200?text=Подія"
            })`,
          }}
        ></div>

        <div className={styles.content}>
          <h2 className={styles.title}>{event.title}</h2>
          <p className={styles.description}>
            {event.description || "Опис події тимчасово відсутній."}
          </p>

          <div className={styles.details}>
            <p>Категорія: {event.category}</p>
            <p>Дата: {formatDate(event.date)}</p>
            <p>Контактний email: {event.email || "не вказано"}</p>
          </div>

          <button className={styles.participateButton}>Прийняти участь</button>
          <button className={styles.sponsorButton}>Стати спонсором</button>
        </div>
      </div>
    </div>
  );
};

export default EventModal;
