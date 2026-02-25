import { useEffect, useState } from "react";
import axios from "axios";
import "./Dashboard.css";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  const token = localStorage.getItem("token");

  // fetch tasks
  const fetchTasks = async () => {
    const res = await axios.get("http://localhost:5000/api/tasks", {
      headers: { Authorization: `Bearer ${token}` }
    });
    setTasks(res.data);
  };

  // add task
  const addTask = async () => {
    if (!title) return;

    await axios.post(
      "http://localhost:5000/api/tasks",
      { title },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    setTitle("");
    fetchTasks();
  };

  // delete
  const deleteTask = async (id) => {
    await axios.delete(`http://localhost:5000/api/tasks/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    fetchTasks();
  };

  // toggle complete
  const toggleTask = async (task) => {
    await axios.put(
      `http://localhost:5000/api/tasks/${task._id}`,
      { completed: !task.completed },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    fetchTasks();
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="dashboard-page">

      {/* SIDEBAR */}
      <div className="sidebar">
        <h2 className="brand">TaskFlow</h2>

        <div className="menu">
          <p className="active">📜 My Tasks</p>
          <p>⭐ Important</p>
          <p>🕯 Focus Mode</p>
        </div>

        <button
          className="logout"
          onClick={() => {
            localStorage.removeItem("token");
            window.location.href = "/";
          }}
        >
          Logout
        </button>
      </div>


      {/* MAIN AREA */}
      <div className="main-area">

        <div className="header">
          <h1>Your Tasks</h1>
          <p>Plan your day deliberately.</p>
        </div>

        {/* ADD TASK */}
        <div className="add-box">
          <input
            type="text"
            placeholder="Write a new task..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <button onClick={addTask}>Add</button>
        </div>

        {/* TASK LIST */}
        <div className="task-container">
          {tasks.map((task) => (
            <div
              key={task._id}
              className={`task ${task.completed ? "completed" : ""}`}
            >
              <span onClick={() => toggleTask(task)}>
                {task.title}
              </span>

              <button onClick={() => deleteTask(task._id)}>✕</button>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}