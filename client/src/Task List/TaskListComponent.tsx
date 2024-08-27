import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./task-list.module.css";
import TaskComponent from "./TaskComponent";
interface task {
  _id: String;
  task_name: string;
  task_description: string;
  is_finished: Boolean;
}

interface TaskListProps {
  mode: "all" | "unfinished" | "finished";
}

const TaskListComponent = ({ mode }: TaskListProps) => {
  const [taskList, setTaskList] = useState<task[]>([]);
  const inputUsernameRef = useRef<HTMLTextAreaElement>(null);
  const inputPasswordRef = useRef<HTMLTextAreaElement>(null);

  const fetchTasks = async () => {
    fetch("http://localhost:5000/api/tasks/get", {
      method: "Get",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // Include cookies in the request
    })
      .then(async (response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        if (Array.isArray(data.tasks)) {
          setTaskList(data.tasks);
        } else {
          console.error("Unexpected data format:", data);
        }
      })
      .catch((error) => {
        console.error(
          "There has been a problem with your Get operation:",
          error
        );
      });
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const getTasks = () => {
    return taskList.filter((task) => {
      if (mode === "unfinished" && !task.is_finished) return true;
      else if (mode === "finished" && task.is_finished) return true;
      else if (mode === "all") return true;
      else return false;
    });
  };

  return (
    <div className={styles.task_list_container}>
      {getTasks() &&
        getTasks().map((task) => {
          return (
            <TaskComponent
              reloadTasks={fetchTasks}
              task={{
                _id: task._id,
                task_name: task.task_name,
                task_description: task.task_description,
                is_finished: task.is_finished,
              }}
            />
          );
        })}
      {getTasks().length === 0 && (
        <div className={styles.no_tasks_text}>
          There are no tasks to show here.
        </div>
      )}
    </div>
  );
};

export default TaskListComponent;
