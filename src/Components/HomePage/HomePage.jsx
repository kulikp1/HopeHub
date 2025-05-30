import React, { useState } from "react";
import Calendar from "react-calendar";
import logo from "../../assets/logo.jpg";
import "react-calendar/dist/Calendar.css";
import styles from "./HomePage.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const [formType, setFormType] = useState("event");

  const navigate = useNavigate();

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

  const [newsData, setNewsData] = useState({
    title: "",
    content: "",
  });

  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "time") validateTime(value);
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNewsChange = (e) => {
    const { name, value } = e.target;
    setNewsData((prev) => ({ ...prev, [name]: value }));
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
    uploadData.append("upload_preset", "hopehub_unsigned_upload");

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

    const userEmail = localStorage.getItem("userEmail");

    if (formType === "event") {
      // Валідація для події
      if (timeError || !formData.time) {
        toast.error("Будь ласка, введіть коректний час.");
        return;
      }

      if (!image) {
        toast.error("Будь ласка, завантажте зображення.");
        return;
      }

      const eventData = {
        ...formData,
        date,
        image,
        email: userEmail,
      };

      try {
        const response = await fetch(
          "https://683765a02c55e01d1849bbe3.mockapi.io/events", // Події
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(eventData),
          }
        );

        if (!response.ok) throw new Error("Помилка при надсиланні даних");

        toast.success("Захід успішно створено!");
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
        toast.error("Помилка при створенні заходу.");
      }
    } else {
      // Валідація для новини
      if (!newsData.title || !newsData.content) {
        toast.error("Заповніть всі поля новини.");
        return;
      }

      const newsPayload = {
        ...newsData,
        image,
        date: new Date().toISOString(),
        email: userEmail,
      };

      try {
        const response = await fetch(
          "https://683a251d43bb370a8671f70a.mockapi.io/news",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newsPayload),
          }
        );

        if (!response.ok) throw new Error("Помилка при надсиланні новини");

        toast.success("Новину додано!");
        setNewsData({ title: "", content: "" });
        setImage(null);
      } catch (error) {
        console.error("News submit error:", error);
        toast.error("Помилка при створенні новини.");
      }
    }
  };

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.container}>
        <div className={styles.leftPanel}>
          <div className={styles.welcome}>HopeHub</div>
          <img src={logo} alt="Logo" className={styles.logo} />
          <p className={styles.intro}>
            {formType === "event"
              ? "Додайте новий благодійний захід до платформи"
              : "Додайте актуальну новину"}
          </p>
          <div className={styles.switchContainer}>
            <button
              className={`${styles.switchBtn} ${
                formType === "event" ? styles.activeBtn : ""
              }`}
              onClick={() => setFormType("event")}
            >
              Додати захід
            </button>
            <button
              className={`${styles.switchBtn} ${
                formType === "news" ? styles.activeBtn : ""
              }`}
              onClick={() => setFormType("news")}
            >
              Додати новину
            </button>
          </div>
          <div className={styles.actionsContainer}>
            <button
              className={styles.actionBtn}
              onClick={() =>
                toast.info("Редагування заходів ще не реалізовано.")
              }
            >
              Редагувати заходи
            </button>
            <button
              className={styles.actionBtn}
              onClick={() => toast.info("Редагування новин ще не реалізовано.")}
            >
              Редагувати новини
            </button>
            <button
              className={styles.logoutBtn}
              onClick={() => {
                toast.success("Ви вийшли з системи");
                localStorage.removeItem("userEmail");
                setTimeout(() => navigate("/"), 1000);
              }}
            >
              Вийти
            </button>
          </div>
        </div>

        <div className={styles.rightPanel}>
          <form className={styles.form} onSubmit={handleSubmit}>
            {formType === "event" ? (
              <>
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
                  {timeError && (
                    <div className={styles.errorText}>{timeError}</div>
                  )}
                </div>
                <div className={styles.calendarWrapper}>
                  <label className={styles.calendarLabel}>
                    Дата проведення:
                  </label>
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
              </>
            ) : (
              <>
                <div className={styles.inputGroup}>
                  <input
                    type="text"
                    name="title"
                    placeholder="Заголовок новини"
                    value={newsData.title}
                    onChange={handleNewsChange}
                    required
                  />
                </div>
                <div className={styles.inputGroup}>
                  <input
                    name="content"
                    placeholder="Текст новини"
                    value={newsData.content}
                    onChange={handleNewsChange}
                    required
                    rows={6}
                  />
                </div>
              </>
            )}

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

            <button
              className={styles.loginBtn}
              type="submit"
              disabled={uploading || (formType === "event" && !!timeError)}
            >
              {formType === "event" ? "Додати захід" : "Додати новину"}
            </button>
          </form>
          <ToastContainer position="top-right" autoClose={3000} />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
