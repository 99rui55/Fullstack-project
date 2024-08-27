import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import logo from "./logo.svg";
import { useEffect } from "react";
import { json } from "stream/consumers";
import LoginComponent from "./Login/LoginComponent";
import RegisterComponent from "./Register/RegisterComponent";
import NavigationComponent from "./Task Navigation/NavigationComponent";
import TaskManagerComponent from "./Create Task/CreateTaskComponent";
import HomeComponent from "./Home/HomeComponent";
import TaskListComponent from "./Task List/TaskListComponent";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<HomeComponent />} />
          <Route path="login" element={<LoginComponent />} />
          <Route path="register" element={<RegisterComponent />} />
          <Route path="tasks" element={<NavigationComponent />}>
            <Route path="create" element={<TaskManagerComponent />} />
            <Route path="all" element={<TaskListComponent mode="all" />} />
            <Route
              path="finished"
              element={<TaskListComponent mode="finished" />}
            />
            <Route
              path="unfinished"
              element={<TaskListComponent mode="unfinished" />}
            />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
