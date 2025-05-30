import React, { useState } from "react";
import Calendar from "react-calendar";
import logo from "../../assets/logo.jpg";
import "react-calendar/dist/Calendar.css";
import styles from "./HomePage.module.css";

const HomePage = () => {
  const [date, setDate] = useState(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const [timeError, setTimeError] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    goal: "",
    location: "",
    category: "екологічні",
    time: "",
  });

  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "time") validateTime(value);
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateTime = (value) => {
    const timeRegex = /^(?:[0-9]|[01][0-9]|2[0-3]):[0-5][0-9]$/;
    if (value === "") {
      setTimeError("Поле не може бути порожнім");
    } else if (!timeRegex.test(value)) {
      setTimeError(
        "Час має бути у форматі H:MM або HH:MM (наприклад, 7:00 або 17:00)"
      );
    } else {
      setTimeError("");
    }
  };

  const handleDateSelect = (selectedDate) => {
    setDate(selectedDate);
    setShowCalendar(false);
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const uploadData = new FormData();
    uploadData.append("file", file);
    uploadData.append("upload_preset", "hopehub_unsigned_upload"); // <-- ВАЖЛИВО: заміни на правильний upload preset

    setUploading(true);
    setUploadError("");

    try {
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/drzzk5gnc/image/upload",
        {
          method: "POST",
          body: uploadData,
        }
      );

      const data = await res.json();

      if (res.ok && data.secure_url) {
        setImage(data.secure_url);
      } else {
        setUploadError(
          data.error?.message || "Помилка при отриманні зображення."
        );
      }
    } catch (err) {
      console.error("Upload error:", err);
      setUploadError("Не вдалося завантажити фото.");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (timeError || !formData.time) {
      alert("Будь ласка, введіть коректний час.");
      return;
    }

    if (!image) {
      alert("Будь ласка, завантажте зображення.");
      return;
    }

    const userEmail = localStorage.getItem("userEmail");

    const eventData = {
      ...formData,
      date,
      image,
      email: userEmail,
    };

    try {
      const response = await fetch(
        "https://683765a02c55e01d1849bbe3.mockapi.io/events",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(eventData),
        }
      );

      if (!response.ok) throw new Error("Помилка при надсиланні даних");

      alert("Захід успішно створено!");
      setFormData({
        title: "",
        description: "",
        goal: "",
        location: "",
        category: "екологічні",
        time: "",
      });
      setDate(null);
      setImage(null);
    } catch (error) {
      console.error("Error:", error);
      alert("Помилка при створенні заходу.");
    }
  };

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.container}>
        <div className={styles.leftPanel}>
          <div className={styles.welcome}>HopeHub</div>
          <img src={logo} alt="Logo" className={styles.logo} />
          <p className={styles.intro}>
            Додайте новий благодійний захід до платформи
          </p>
        </div>

        <div className={styles.rightPanel}>
          <h2 className={styles.loginHeader}>Створити захід</h2>
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.inputGroup}>
              <input
                type="text"
                name="title"
                placeholder="Назва заходу"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>
            <div className={styles.inputGroup}>
              <input
                type="text"
                name="goal"
                placeholder="Мета заходу"
                value={formData.goal}
                onChange={handleChange}
                required
              />
            </div>
            <div className={styles.inputGroup}>
              <input
                type="text"
                name="location"
                placeholder="Місце проведення"
                value={formData.location}
                onChange={handleChange}
                required
              />
            </div>
            <div className={styles.inputGroup}>
              <input
                name="description"
                placeholder="Опис заходу"
                value={formData.description}
                onChange={handleChange}
                required
              />
            </div>
            <div className={styles.inputGroup}>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
              >
                <option value="екологічні">Екологічні</option>
                <option value="соціальні">Соціальні</option>
                <option value="медичні">Медичні</option>
                <option value="освітні">Освітні</option>
              </select>
            </div>
            <div className={styles.inputGroup}>
              <input
                type="text"
                name="time"
                placeholder="Час проведення: 7:00 або 17:00"
                value={formData.time}
                onChange={handleChange}
                required
              />
              {timeError && <div className={styles.errorText}>{timeError}</div>}
            </div>
            <div className={styles.imageUploadGroup}>
              <label htmlFor="imageUpload" className={styles.customFileUpload}>
                Додати зображення
              </label>
              <input
                id="imageUpload"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className={styles.hiddenFileInput}
              />
              {uploading && <p>Завантаження...</p>}
              {uploadError && (
                <div className={styles.errorText}>{uploadError}</div>
              )}
              {image && (
                <div className={styles.preview}>
                  <img
                    className={styles.previewImage}
                    src={image}
                    alt="Попередній перегляд"
                  />
                </div>
              )}
            </div>
            <div className={styles.calendarWrapper}>
              <label className={styles.calendarLabel}>Дата проведення:</label>
              {showCalendar && (
                <div className={styles.calendarPopupAbove}>
                  <Calendar
                    onChange={handleDateSelect}
                    value={date || new Date()}
                  />
                </div>
              )}
              <button
                type="button"
                className={styles.calendarToggle}
                onClick={() => setShowCalendar((prev) => !prev)}
              >
                {date ? date.toLocaleDateString() : "Обрати дату"}
              </button>
            </div>
            <button
              className={styles.loginBtn}
              type="submit"
              disabled={!!timeError || uploading}
            >
              Додати захід
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
