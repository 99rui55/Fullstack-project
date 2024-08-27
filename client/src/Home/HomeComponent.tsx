import { useEffect } from "react";
import styles from "./home.module.css";
import { Link } from "react-router-dom";

const HomeComponent = () => {
  useEffect(() => {
    if (document.cookie.includes("token=")) {
      document.cookie = "token=;";
    }
  });
  return (
    <div className={styles.screen}>
      <div className={styles.headline_container}>
        <div className={styles.heade_text}>MANAGE</div>
        <div className={styles.heade_text}>YOUR</div>
        <div className={styles.heade_text}>TASKS.</div>
      </div>
      <div className={styles.link_information_container}>
        <div className={styles.link_container}>
          <Link to={"login"} className={styles.page_link}>
            {"<Login>"}
          </Link>
          <Link to={"register"} className={styles.page_link}>
            {"<Register>"}
          </Link>
        </div>
        <div className={styles.info_container}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </div>
      </div>
    </div>
  );
};

export default HomeComponent;
