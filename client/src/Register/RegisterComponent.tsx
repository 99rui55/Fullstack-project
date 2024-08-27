import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./RegisterView.module.css";
import { startJWTSequence } from "../utils/jwtHelper";

const RegisterComponent = () => {
  const inputUsernameRef = useRef<HTMLTextAreaElement>(null);
  const inputPasswordRef = useRef<HTMLTextAreaElement>(null);
  const navigate = useNavigate();

  const handleOnClick = (username: string, password: string) => {
    fetch("http://localhost:5000/api/auth/register", {
      method: "Post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
      credentials: "include", // Include cookies in the request
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        navigate("/tasks/all");
        startJWTSequence();
      })
      .catch((error) => {
        console.error(
          "There has been a problem with your fetch operation:",
          error
        );
      });
  };

  return (
    <div className={styles.screen}>
      <div className={styles.headline_container}>
        <div className={styles.head_text}>WELCOME TO</div>
        <div className={styles.head_text}>THE SITE.</div>
      </div>
      <div className={styles.register_wrapper}>
        <div className={styles.register_container}>
          <div className={styles.field_wrapper}>
            <div className={styles.register_text}>USERNAME</div>
            <textarea
              className={styles.register_field}
              ref={inputUsernameRef}
            ></textarea>
          </div>

          <div className={styles.field_wrapper}>
            <div className={styles.register_text}>PASSWORD</div>
            <textarea
              className={styles.register_field}
              ref={inputPasswordRef}
            ></textarea>
          </div>
        </div>

        <button
          className={styles.register_button}
          onClick={() => {
            handleOnClick(
              inputUsernameRef.current.value,
              inputPasswordRef.current.value
            );
          }}
        >
          {"<REGISTER>"}
        </button>
      </div>
    </div>
  );
};

export default RegisterComponent;
