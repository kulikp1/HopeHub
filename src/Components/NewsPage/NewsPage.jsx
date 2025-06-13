import React, { useEffect, useState } from "react";
import Header from "../Header/Header";
import styles from "./NewsPage.module.css";

const News = () => {
  const [newsList, setNewsList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(
          "https://683a251d43bb370a8671f70a.mockapi.io/news"
        );
        if (!response.ok) throw new Error("Помилка при завантаженні новин");
        const data = await response.json();
        setNewsList(data.reverse());
      } catch (error) {
        console.error("Fetch news error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  return (
    <>
      <Header />
      <div className={styles.newsContainer}>
        <h1 className={styles.title}>Новини</h1>
        {loading ? (
          <p>Завантаження новин...</p>
        ) : newsList.length === 0 ? (
          <p>Новин поки немає.</p>
        ) : (
          <div className={styles.newsList}>
            {newsList.map((news) => (
              <div className={styles.newsItem} key={news.id}>
                {news.image && (
                  <img
                    src={news.image}
                    alt="новина"
                    className={styles.newsImage}
                  />
                )}
                <div className={styles.newsContent}>
                  <div className={styles.textBlock}>
                    <h2>{news.title}</h2>
                    <p>{news.content}</p>
                  </div>
                  <p className={styles.date}>
                    {new Date(news.date).toLocaleString("uk-UA", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default News;
