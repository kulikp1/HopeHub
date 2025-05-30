import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./ChangeNews.module.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ChangeNews = () => {
  const [news, setNews] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const userEmail = localStorage.getItem("userEmail");

    fetch("https://683a251d43bb370a8671f70a.mockapi.io/news")
      .then((res) => res.json())
      .then((data) => {
        const filteredNews = data.filter((item) => item.email === userEmail);
        setNews(filteredNews);
      })
      .catch(() => toast.error("Помилка завантаження новин"));
  }, []);

  const handleDelete = async (id) => {
    try {
      await fetch(`https://683a251d43bb370a8671f70a.mockapi.io/news/${id}`, {
        method: "DELETE",
      });
      setNews((prevNews) => prevNews.filter((n) => n.id !== id));
      toast.success("Новину видалено");
    } catch {
      toast.error("Помилка при видаленні");
    }
  };

  return (
    <div className={styles.newsContainer}>
      <button className={styles.backButton} onClick={() => navigate(-1)}>
        ⬅ Повернутись назад
      </button>

      {news.length > 0 ? (
        news.map((item) => (
          <div key={item.id} className={styles.newsModal}>
            <h2 className={styles.newsTitle}>{item.title}</h2>
            <p className={styles.newsText}>{item.content}</p>
            <button
              className={styles.deleteButton}
              onClick={() => handleDelete(item.id)}
            >
              Видалити
            </button>
          </div>
        ))
      ) : (
        <p>У вас ще немає доданих новин.</p>
      )}
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default ChangeNews;
