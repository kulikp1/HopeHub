import React, { useEffect, useState } from "react";
import styles from "./EventsPage.module.css";
import Header from "../Header/Header";
import EventModal from "../EventModal/EventModal";

const categoryOptions = [
  { label: "Усі події", value: "all" },
  { label: "Екологічні", value: "екологічні" },
  { label: "Соціальні", value: "соціальні" },
  { label: "Медичні", value: "медичні" },
  { label: "Освітні", value: "освітні" },
];

const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState(["all"]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("uk-UA");
  };

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const [eventsRes, registrationsRes] = await Promise.all([
          fetch("https://683765a02c55e01d1849bbe3.mockapi.io/events"),
          fetch("https://683a251d43bb370a8671f70a.mockapi.io/registerUser"),
        ]);

        if (!eventsRes.ok || !registrationsRes.ok)
          throw new Error("Помилка при завантаженні даних");

        const eventsData = await eventsRes.json();
        const registrationsData = await registrationsRes.json();

        // Підрахунок реєстрацій по назві події
        const registrationCounts = {};
        registrationsData.forEach((r) => {
          const title = r.eventTitle;
          registrationCounts[title] = (registrationCounts[title] || 0) + 1;
        });

        // Додаємо кількість реєстрацій до кожної події
        const enrichedEvents = eventsData.map((event) => ({
          ...event,
          registrationCount: registrationCounts[event.title] || 0,
        }));

        setEvents(enrichedEvents);
      } catch (err) {
        setError("Не вдалося завантажити події.");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const filteredEvents = selectedCategories.includes("all")
    ? events
    : events.filter((event) =>
        selectedCategories.includes(event.category?.toLowerCase().trim())
      );

  const handleCheckboxChange = (value) => {
    if (value === "all") {
      setSelectedCategories(["all"]);
    } else {
      setSelectedCategories((prev) => {
        const isSelected = prev.includes(value);
        let updated = isSelected
          ? prev.filter((v) => v !== value)
          : [...prev.filter((v) => v !== "all"), value];

        if (updated.length === 0) {
          updated = ["all"];
        }

        return updated;
      });
    }
  };

  const openModal = (event) => {
    setSelectedEvent(event);
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedEvent(null);
    setShowModal(false);
  };

  return (
    <div>
      <Header />
      <div className={styles.eventsWrapper}>
        <aside className={styles.sidebar}>
          <h2 className={styles.filterTitle}>Категорії</h2>
          <div className={styles.filterList}>
            {categoryOptions.map((cat) => (
              <label key={cat.value} className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  value={cat.value}
                  checked={selectedCategories.includes(cat.value)}
                  onChange={() => handleCheckboxChange(cat.value)}
                  className={styles.customCheckboxInput}
                />
                <span className={styles.checkboxCustom}></span>
                {cat.label}
              </label>
            ))}
          </div>
        </aside>

        <main className={styles.mainContent}>
          {isLoading ? (
            <p className={styles.loading}>Завантаження...</p>
          ) : error ? (
            <p className={styles.error}>{error}</p>
          ) : filteredEvents.length === 0 ? (
            <p className={styles.noEvents}>Немає подій у цій категорії.</p>
          ) : (
            <div className={styles.grid}>
              {filteredEvents.map((event) => (
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
                      <button
                        className={styles.detailsButton}
                        onClick={() => openModal(event)}
                      >
                        Деталі
                      </button>
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
                      <span className={styles.participants}>
                        {event.registrationCount} учасник
                        {event.registrationCount === 1 ? "" : "ів"}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>

      {showModal && selectedEvent && (
        <EventModal
          event={selectedEvent}
          onClose={closeModal}
          formatDate={formatDate}
        />
      )}
    </div>
  );
};

export default EventsPage;
