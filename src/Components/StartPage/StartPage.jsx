import React from "react";
import styles from "./StartPage.module.css";
import { FaUser, FaLock } from "react-icons/fa";
import logo from "../../assets/logo.jpg";

const RegisterPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.leftPanel}>
        <div className={styles.welcome}>Welcome</div>
        <img src={logo} alt="Logo" className={styles.logo} />
        <p className={styles.intro}>
          Система управління благодійними заходами HopeHub
        </p>
      </div>

      <div className={styles.rightPanel}>
        <h2 className={styles.loginHeader}>REGISTER</h2>
        <div className={styles.inputGroup}>
          <FaUser className={styles.icon} />
          <input type="text" placeholder="Username" />
        </div>
        <div className={styles.inputGroup}>
          <FaLock className={styles.icon} />
          <input type="password" placeholder="Password" />
        </div>
        <div className={styles.inputGroup}>
          <FaLock className={styles.icon} />
          <input type="password" placeholder="Confirm Password" />
        </div>
        <button className={styles.loginBtn}>Register</button>
        <div className={styles.links}>
          <a href="#">Login</a>
          <a href="#">Help</a>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
