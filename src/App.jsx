/* eslint-disable preserve-caught-error */
import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import TaskDetails from "./pages/TaskDetails";

import {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
} from "./services/api";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [requesting, setRequesting] = useState(false);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getTodos();

      setTasks(data);
    } catch (error) {
      setError(error.message || "Failed to load tasks.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchTasks();
  }, []);

  const handleAddTask = async (title) => {
    try {
      setRequesting(true);

      const newTask = await createTodo({
        title,
        completed: false,
        userId: 1,
      });

      setTasks((prev) => [newTask, ...prev]);
    } catch (error) {
      throw new Error(error.message || "Failed to add task.");
    } finally {
      setRequesting(false);
    }
  };

  const handleToggleTask = async (id, completed) => {
    try {
      setRequesting(true);

      const updatedTask = await updateTodo(id, {
        completed,
      });

      setTasks((prev) =>
        prev?.map((task) =>
          task.id === id
            ? {
                ...task,
                completed: updatedTask.completed,
              }
            : task
        )
      );
    } catch (error) {
      throw new Error(error.message || "Failed to update task.");
    } finally {
      setRequesting(false);
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      setRequesting(true);

      await deleteTodo(id);

      setTasks((prev) =>
        prev?.filter((task) => task.id !== id)
      );
    } catch (error) {
      throw new Error(error.message || "Failed to delete task.");
    } finally {
      setRequesting(false);
    }
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Dashboard
              tasks={tasks}
              loading={loading}
              error={error}
              requesting={requesting}
              onRetry={fetchTasks}
              onAddTask={handleAddTask}
              onToggleTask={handleToggleTask}
              onDeleteTask={handleDeleteTask}
            />
          }
        />

        <Route
          path="/tasks/:id"
          element={
            <TaskDetails
              tasks={tasks}
              requesting={requesting}
              onDeleteTask={handleDeleteTask}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;