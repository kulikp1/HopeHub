import React from "react";
import styles from "./StartPage.module.css";
import { FaEnvelope, FaLock } from "react-icons/fa";
import logo from "../../assets/logo.png";

export default function StartPage() {
  return (
    <div className={styles.container}>
      <div className={styles.leftPanel}>
        <div className={styles.leftContent}>
          <h2 className={styles.loginLabel}>LOGIN</h2>
          <h3 className={styles.signInLabel}>SIGN IN</h3>
        </div>
      </div>

      <div className={styles.rightPanel}>
        <div className={styles.formWrapper}>
          <img src={logo} alt="HopeHub Logo" className={styles.logo} />

          <h2 className={styles.formTitle}>LOGIN</h2>

          <form className={styles.form}>
            <div className={styles.inputGroup}>
              <FaEnvelope className={styles.icon} />
              <input type="email" placeholder="Email" required />
            </div>

            <div className={styles.inputGroup}>
              <FaLock className={styles.icon} />
              <input type="password" placeholder="Password" required />
            </div>

            <div className={styles.forgotPassword}>
              <a href="#">Forgot Password?</a>
            </div>

            <button type="submit" className={styles.loginButton}>
              LOGIN
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
