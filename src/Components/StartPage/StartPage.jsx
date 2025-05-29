import React, { useState } from "react";
import styles from "./StartPage.module.css";
import { FaUser, FaLock, FaKey } from "react-icons/fa";
import logo from "../../assets/logo.jpg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import Loader from "../Loader/Loader";

const StartPage = () => {
  const [isRegistering, setIsRegistering] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    volunteerKey: "",
  });
  const [validation, setValidation] = useState({
    emailValid: true,
    passwordValid: true,
    confirmPasswordValid: true,
    volunteerKeyValid: true,
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      setValidation((prev) => ({
        ...prev,
        emailValid: emailRegex.test(value),
      }));
    }

    if (name === "password") {
      setValidation((prev) => ({
        ...prev,
        passwordValid: value.length >= 6,
        confirmPasswordValid: value === formData.confirmPassword,
      }));
    }

    if (name === "confirmPassword") {
      setValidation((prev) => ({
        ...prev,
        confirmPasswordValid: value === formData.password,
      }));
    }

    if (name === "volunteerKey") {
      setValidation((prev) => ({
        ...prev,
        volunteerKeyValid: value === "1234",
      }));
    }

    setError("");
  };

  const handleRegister = async () => {
    const { email, password, confirmPassword, volunteerKey } = formData;

    if (!email || !password || !confirmPassword || !volunteerKey) {
      setError("Please fill in all fields.");
      return;
    }

    if (!validation.emailValid) {
      setError("Please enter a valid email.");
      return;
    }

    if (!validation.passwordValid) {
      setError("Password must be at least 6 characters.");
      return;
    }

    if (!validation.confirmPasswordValid) {
      setError("Passwords do not match.");
      return;
    }

    if (volunteerKey !== "1234") {
      setError("Invalid volunteer key.");
      return;
    }

    try {
      const response = await fetch(
        "https://683765a02c55e01d1849bbe3.mockapi.io/users"
      );
      const users = await response.json();

      const existingUser = users.find((u) => u.email === email);
      if (existingUser) {
        setError("Email is already registered.");
        return;
      }

      const registerResponse = await fetch(
        "https://683765a02c55e01d1849bbe3.mockapi.io/users",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );

      if (!registerResponse.ok) throw new Error("Registration failed.");

      toast.success("Registration successful!");
      setFormData({
        email: "",
        password: "",
        confirmPassword: "",
        volunteerKey: "",
      });
      setIsRegistering(false);
    } catch (err) {
      setError("Failed to register. Try again later.");
      console.log(err);
    }
  };

  const handleLogin = async () => {
    const { email, password } = formData;

    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }

    if (!validation.emailValid) {
      setError("Please enter a valid email.");
      return;
    }

    if (!validation.passwordValid) {
      setError("Password must be at least 6 characters.");
      return;
    }

    try {
      const response = await fetch(
        "https://683765a02c55e01d1849bbe3.mockapi.io/users"
      );
      const users = await response.json();

      const user = users.find(
        (u) => u.email === email && u.password === password
      );

      if (user) {
        toast.success("Login successful!");
        setIsLoading(true);
        setTimeout(() => navigate("/home"), 1000);
      } else {
        setError("Invalid email or password.");
      }
    } catch (err) {
      setError("Login failed. Try again later.");
      console.log(err);
    }
  };

  return (
    <div className={styles.container}>
      {isLoading && <Loader />}

      <div className={styles.leftPanel}>
        <div className={styles.welcome}>Welcome</div>
        <img src={logo} alt="Logo" className={styles.logo} />
        <p className={styles.intro}>
          Система управління благодійними заходами HopeHub
        </p>
        <button
          className={styles.eventButton}
          onClick={() => navigate("/events")}
        >
          Прийняти участь у події
        </button>
      </div>

      <div className={styles.rightPanel}>
        <h2 className={styles.loginHeader}>
          {isRegistering ? "REGISTER" : "LOGIN"}
        </h2>

        <div className={styles.inputGroup}>
          <FaUser className={styles.icon} />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />
          {!validation.emailValid && (
            <span className={styles.validationMsg}>Invalid email format</span>
          )}
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
          {!validation.passwordValid && (
            <span className={styles.validationMsg}>
              Password must be at least 6 characters
            </span>
          )}
        </div>

        {isRegistering && (
          <>
            <div className={styles.inputGroup}>
              <FaLock className={styles.icon} />
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
              {!validation.confirmPasswordValid &&
                formData.confirmPassword.length > 0 && (
                  <span className={styles.validationMsg}>
                    Passwords do not match
                  </span>
                )}
            </div>

            <div className={styles.inputGroup}>
              <FaKey className={styles.icon} />
              <input
                type="text"
                name="volunteerKey"
                placeholder="Volunteer Key"
                value={formData.volunteerKey}
                onChange={handleChange}
              />
              {!validation.volunteerKeyValid &&
                formData.volunteerKey.length > 0 && (
                  <span className={styles.validationMsg}>
                    Invalid volunteer key
                  </span>
                )}
            </div>
          </>
        )}

        {error && (
          <div style={{ color: "red", marginTop: "10px" }}>{error}</div>
        )}

        <button
          className={styles.loginBtn}
          onClick={isRegistering ? handleRegister : handleLogin}
          disabled={
            isRegistering
              ? !validation.emailValid ||
                !validation.passwordValid ||
                !validation.confirmPasswordValid ||
                !validation.volunteerKeyValid
              : !validation.emailValid || !validation.passwordValid
          }
        >
          {isRegistering ? "Register" : "Login"}
        </button>

        <div className={styles.links}>
          {!isRegistering && (
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setIsRegistering(true);
                setError("");
              }}
            >
              Register
            </a>
          )}
          {isRegistering && (
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setIsRegistering(false);
                setError("");
              }}
            >
              Login
            </a>
          )}
        </div>
      </div>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default StartPage;
