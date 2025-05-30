import React from "react";
import Header from "../Header/Header";
import styles from "./NewsPage.module.css";

const News = () => {
  return (
    <>
      <Header />
      <div className={styles.newsContainer}>
        <h1 className={styles.title}>Останні новини</h1>
        <div className={styles.newsList}>
          <div className={styles.newsItem}>
            <h2>🎉 Запуск нового благодійного проєкту</h2>
            <p>
              Ми розпочали нову ініціативу для допомоги дітям у сільських
              регіонах. Приєднуйтесь!
            </p>
          </div>
          <div className={styles.newsItem}>
            <h2>🤝 Партнерство з місцевими волонтерами</h2>
            <p>
              Тепер ми співпрацюємо з волонтерами з 5 міст для ефективнішої
              доставки допомоги.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default News;
