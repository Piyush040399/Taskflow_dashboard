import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { getTodoById } from "../services/api";
import StateCard from "../components/StateCard";

const TaskDetails = ({
  tasks,
  requesting,
  onDeleteTask,
}) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const existingTask = tasks.find(
      (item) => String(item.id) === String(id)
    );

    if (existingTask) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setTask(existingTask);
      setLoading(false);
      return;
    }

    const fetchTask = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getTodoById(id);

        setTask(data);
      } catch (error) {
        setError(
          error.message || "Failed to load task details."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchTask();
  }, [id, tasks]);

  const handleDelete = async () => {
    try {
      await onDeleteTask(task.id);

      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return (
      <main className="app-container">
        <div className="details-container">
          <StateCard type="loading" />
        </div>
      </main>
    );
  }

  if (error || !task) {
    return (
      <main className="app-container">
        <div className="details-container">
          <StateCard type="error" />

          <button
            type="button"
            className="secondary-button"
            onClick={() => navigate("/")}
          >
            ← Back to Tasks
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="app-container">
      <div className="details-container">
        <button
          type="button"
          className="back-button"
          onClick={() => navigate("/")}
        >
          ← Back to Tasks
        </button>

        <section className="details-card">
          <div className="details-header">
            <div>
              <span className="details-label">
                TASK DETAILS
              </span>

              <h1>{task.title}</h1>
            </div>

            <span
              className={`status-badge ${
                task.completed
                  ? "status-completed"
                  : "status-pending"
              }`}
            >
              {task.completed ? "Completed" : "Pending"}
            </span>
          </div>

          <div className="details-grid">
            <div className="detail-box">
              <span>Task ID</span>
              <strong>#{task.id}</strong>
            </div>

            <div className="detail-box">
              <span>User ID</span>
              <strong>#{task.userId}</strong>
            </div>

            <div className="detail-box">
              <span>Status</span>
              <strong>
                {task.completed ? "Completed" : "Pending"}
              </strong>
            </div>
          </div>

          <div className="description-section">
            <h2>Description</h2>

            <p>
              This is a placeholder description for the selected
              task. In a production application, this section
              could contain additional task information,
              notes, metadata, or other relevant details.
            </p>
          </div>

          <div className="details-actions">
            <button
              type="button"
              className="secondary-button"
              onClick={() => navigate("/")}
            >
              Back
            </button>

            <button
              type="button"
              className="delete-button large-delete"
              onClick={handleDelete}
              disabled={requesting}
            >
              {requesting ? "Deleting..." : "Delete Task"}
            </button>
          </div>
        </section>
      </div>
    </main>
  );
};

export default TaskDetails;