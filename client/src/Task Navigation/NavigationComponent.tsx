import React from "react";
import {
  Link,
  Outlet,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import { getUserName } from "../utils/jwtHelper";
import styles from "./NavigationView.module.css";
import TaskManagerComponent from "../Create Task/CreateTaskComponent";

const NavigationComponent = () => {
  return (
    <div className={styles.screen}>
      <div className={styles.nav_container}>
        <div className={styles.greeting_container}>
          <h1 className={styles.greeting_text}>Hello,</h1>
          <h1 className={styles.name}>{getUserName()}</h1>
        </div>
        <Link to="/tasks/create" className={styles.route}>
          {"<Add A Task>"}
        </Link>
        <div className={styles.seperator} />
        <Link to="/tasks/all" className={styles.route}>
          {"<All Tasks>"}
        </Link>
        <div className={styles.seperator} />

        <Link to="/tasks/finished" className={styles.route}>
          {"<Finished Tasks>"}
        </Link>
        <div className={styles.seperator} />

        <Link to="/tasks/unfinished" className={styles.route}>
          {"<Unfinished Tasks>"}
        </Link>
        <div className={styles.seperator} />

        <Link to="/" className={styles.route}>
          {"<Log out>"}
        </Link>
      </div>
      <Outlet /> {/* This is where nested routes will be rendered */}
    </div>
  );
};

export default NavigationComponent;
