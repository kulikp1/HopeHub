import React from "react";
import styles from "./Header.module.css";
import { Instagram, Send } from "lucide-react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.jpg";

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className={styles.header}>
      <div className={styles.logo} onClick={() => navigate("/")}>
        <img src={logo} alt="Logo" className={styles.logo} />
      </div>
      <div className={styles.contactInfo}>
        <p className={styles.email}>
          <a href="mailto:charity@example.com">charity@example.com</a>
        </p>
        <p className={styles.phone}>
          <a href="tel:+380971234567">+38 (097) 123-45-67</a>
        </p>

        <div className={styles.icons}>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Instagram size={20} />
          </a>
          <a href="https://t.me" target="_blank" rel="noopener noreferrer">
            <Send size={20} />
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
