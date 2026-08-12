import { useState } from "react";

const AddTask = ({ onAddTask, disabled }) => {
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const trimmedTitle = title.trim();

    if (!trimmedTitle) {
      setError("Please enter a task.");
      return;
    }

    if (trimmedTitle.length < 3) {
      setError("Task must contain at least 3 characters.");
      return;
    }

    try {
      setError("");

      await onAddTask(trimmedTitle);

      setTitle("");
    } catch (error) {
      setError(error.message || "Unable to add task.");
    }
  };

  return (
    <form className="add-task-form" onSubmit={handleSubmit}>
      <div className="input-wrapper">
        <input
          type="text"
          value={title}
          placeholder="What needs to be done?"
          onChange={(event) => {
            setTitle(event.target.value);

            if (error) {
              setError("");
            }
          }}
          disabled={disabled}
          aria-label="Task title"
        />

        {error && <p className="field-error">{error}</p>}
      </div>

      <button
        type="submit"
        className="primary-button"
        disabled={disabled}
      >
        {disabled ? "Adding..." : "+ Add Task"}
      </button>
    </form>
  );
};

export default AddTask;