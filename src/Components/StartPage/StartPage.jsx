import React, { useState } from "react";
import styles from "./StartPage.module.css";
import { FaEnvelope, FaLock, FaUser } from "react-icons/fa";
import logo from "../../assets/logo.jpg";

export default function StartPage() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className={styles.container}>
      <div
        className={`${styles.leftPanel} ${
          isLogin ? styles.loginActive : styles.signinActive
        }`}
      >
        <div className={styles.leftContent}>
          <h2
            className={`${styles.leftButton} ${isLogin ? styles.active : ""}`}
            onClick={() => setIsLogin(true)}
          >
            LOGIN
          </h2>
          <h2
            className={`${styles.leftButton} ${!isLogin ? styles.active : ""}`}
            onClick={() => setIsLogin(false)}
          >
            SIGN IN
          </h2>
        </div>
      </div>

      <div className={styles.rightPanel}>
        <div className={styles.formWrapper}>
          <img src={logo} alt="Logo" className={styles.logo} />
          <h2 className={styles.formTitle}>{isLogin ? "LOGIN" : "SIGN IN"}</h2>

          <form className={styles.form}>
            {!isLogin && (
              <div className={styles.inputGroup}>
                <FaUser className={styles.icon} />
                <input type="text" placeholder="Username" required />
              </div>
            )}

            <div className={styles.inputGroup}>
              <FaEnvelope className={styles.icon} />
              <input type="email" placeholder="Email" required />
            </div>

            <div className={styles.inputGroup}>
              <FaLock className={styles.icon} />
              <input type="password" placeholder="Password" required />
            </div>

            {isLogin && (
              <div className={styles.forgotPassword}>
                <a href="#">Forgot Password?</a>
              </div>
            )}

            <button type="submit" className={styles.loginButton}>
              {isLogin ? "LOGIN" : "SIGN UP"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
