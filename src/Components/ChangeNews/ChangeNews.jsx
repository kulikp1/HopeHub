import React, { useEffect, useState } from "react";
import styles from "./ChangeNews.module.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ChangeNews = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    fetch("https://683a251d43bb370a8671f70a.mockapi.io/news")
      .then((res) => res.json())
      .then(setNews)
      .catch(() => toast.error("Помилка завантаження новин"));
  }, []);

  const handleDelete = async (id) => {
    try {
      await fetch(`https://683a251d43bb370a8671f70a.mockapi.io/news/${id}`, {
        method: "DELETE",
      });
      setNews(news.filter((n) => n.id !== id));
      toast.success("Новину видалено");
    } catch {
      toast.error("Помилка при видаленні");
    }
  };

  return (
    <div className={styles.newsContainer}>
      {news.map((item) => (
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
      ))}
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default ChangeNews;
