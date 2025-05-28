import React, { useState } from "react";
import styles from "./StartPage.module.css";
import { FaUser, FaLock } from "react-icons/fa";
import logo from "../../assets/logo.jpg";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    setError("");
    setSuccess("");
  };

  const handleRegister = async () => {
    const { username, password, confirmPassword } = formData;

    if (!username || !password || !confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const response = await fetch(
        "https://683765a02c55e01d1849bbe3.mockapi.io/users",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        }
      );

      if (!response.ok) {
        throw new Error("Registration failed.");
      }

      setSuccess("Registration successful!");
      setFormData({ username: "", password: "", confirmPassword: "" });
    } catch (err) {
      setError("Failed to register. Try again later.");
      console.log(err);
    }
  };

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
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
          />
        </div>
        <div className={styles.inputGroup}>
          <FaLock className={styles.icon} />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <div className={styles.inputGroup}>
          <FaLock className={styles.icon} />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
        </div>

        {error && (
          <div style={{ color: "red", marginTop: "10px" }}>{error}</div>
        )}
        {success && (
          <div style={{ color: "green", marginTop: "10px" }}>{success}</div>
        )}

        <button className={styles.loginBtn} onClick={handleRegister}>
          Register
        </button>

        <div className={styles.links}>
          <a href="#">Login</a>
          <a href="#">Help</a>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
