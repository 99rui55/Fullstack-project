import React, { useRef, useState } from "react";
import TaskComponent from "../Task List/TaskComponent";
import styles from "./create-task.module.css";
import ConfirmAnimationComponent from "./ConfirmAnimationComponent";

interface task {
  name: string;
  description: string;
}

const CreateTaskComponent = () => {
  //#region hooks
  const [isPedning, setIsPending] = useState(false);
  const [playAnimation, setPlayAnimation] = useState(false);
  const inputTaskNameRef = useRef<HTMLTextAreaElement>(null);
  const inputTaskDescriptionRef = useRef<HTMLTextAreaElement>(null);
  //#endregion

  //#region handle Add Task
  const handleAddTask = (task: task) => {
    setIsPending(true);
    fetch("http://localhost:5000/api/tasks/add-task", {
      method: "Post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        task_name: task.name,
        task_description: task.description,
        is_finished: false,
      }),
      credentials: "include",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        setIsPending(false);
        setPlayAnimation(true);
      })
      .catch((error) => {
        console.error(
          "There has been a problem with your fetch operation:",
          error
        );
      });
  };
  //#endregion

  return (
    <div className={styles.create_task_container}>
      <div className={styles.fields_wrapper}>
        <div className={styles.field_container}>
          <div className={styles.text_container}>
            <div className={styles.primary_text}>Task</div>
            <div className={styles.secondary_text}>Name</div>
          </div>
          <textarea
            className={styles.name_text_input}
            id="task_name"
            ref={inputTaskNameRef}
          ></textarea>
        </div>

        <div className={styles.field_container}>
          <div className={styles.text_container}>
            <div className={styles.primary_text}>Task</div>
            <div className={styles.secondary_text}>Description</div>
          </div>
          <textarea
            className={styles.description_text_input}
            id="task_description"
            ref={inputTaskDescriptionRef}
          ></textarea>
        </div>
      </div>

      <div className={styles.add_task_button_wrapper}>
        {isPedning && <h1 className={styles.loading_text}>Loading...</h1>}
        {playAnimation && (
          <ConfirmAnimationComponent
            endAnimationHandler={() => {
              setPlayAnimation(false);
            }}
          />
        )}
        {!isPedning && !playAnimation && (
          <button
            className={styles.add_task_button}
            onClick={(e) => {
              let task: task = {
                name: inputTaskNameRef.current.value,
                description: inputTaskDescriptionRef.current.value,
              };
              handleAddTask(task);
              inputTaskNameRef.current.value = "";
              inputTaskDescriptionRef.current.value = "";
            }}
          >
            {"<ADD TASK>"}
          </button>
        )}
      </div>
    </div>
  );
};

export default CreateTaskComponent;
