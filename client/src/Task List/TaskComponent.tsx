import React, { useState } from "react";
import styles from "./task-list.module.css";

interface TaskProps {
  task: {
    _id: String;
    task_name: string;
    task_description: string;
    is_finished: Boolean;
  };
  reloadTasks: () => void;
}

const deleteTask = (_id: String, reloadTasks: () => void) => {
  fetch("http://localhost:5000/api/tasks/delete", {
    //TODO:put currect url
    method: "Post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ _id }),
    credentials: "include", // Include cookies in the request
  })
    .then(async (response) => {
      if (!response.ok) {
        throw new Error("error trying to delete task");
      }
      reloadTasks();
    })
    .catch((error) => {
      console.error("There has been a problem with your Get operation:", error);
    });
};

const markTask = (
  _id: String,
  is_finished: Boolean,
  reloadTasks: () => void
) => {
  fetch("http://localhost:5000/api/tasks/mark", {
    method: "Post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ _id, is_finished }),
    credentials: "include", // Include cookies in the request
  })
    .then(async (response) => {
      if (!response.ok) {
        throw new Error("error trying to delete task");
      }
      reloadTasks();
    })
    .catch((error) => {
      console.error("There has been a problem with your Get operation:", error);
    });
};

const TaskComponent = ({ task, reloadTasks }: TaskProps) => {
  const { task_name, task_description, _id } = task;
  return (
    <div className={styles.task_card}>
      <div className={styles.task_name}>{task_name}</div>
      <div className={styles.task_description}>{task_description}</div>
      <div className={styles.buttons_container}>
        <div
          className={styles.trash_can}
          onClick={() => deleteTask(_id, reloadTasks)}
        ></div>
        {task.is_finished && (
          <div
            className={styles.mark_unfinished}
            onClick={() => markTask(_id, false, reloadTasks)}
          />
        )}
        {!task.is_finished && (
          <div
            className={styles.mark_finished}
            onClick={() => markTask(_id, true, reloadTasks)}
          />
        )}
      </div>
    </div>
  );
};

export default TaskComponent;
