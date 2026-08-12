import { useNavigate } from "react-router-dom";

const TaskItem = ({
  task,
  requesting,
  onToggleTask,
  onDeleteTask,
}) => {
  const navigate = useNavigate();

  const handleTaskClick = () => {
    navigate(`/tasks/${task.id}`);
  };

  const handleCheckboxChange = async (event) => {
    event.stopPropagation();

    try {
      await onToggleTask(task.id, event.target.checked);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (event) => {
    event.stopPropagation();

    try {
      await onDeleteTask(task.id);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      className={`task-item ${
        task.completed ? "task-completed" : ""
      }`}
      onClick={handleTaskClick}
      role="button"
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === "Enter") {
          handleTaskClick();
        }
      }}
    >
      <div className="task-main">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={handleCheckboxChange}
          disabled={requesting}
          onClick={(event) => event.stopPropagation()}
          aria-label={`Mark ${task.title} as ${
            task.completed ? "incomplete" : "complete"
          }`}
        />

        <span className="task-title">{task.title}</span>
      </div>

      <button
        type="button"
        className="delete-button"
        onClick={handleDelete}
        disabled={requesting}
        aria-label={`Delete ${task.title}`}
      >
        Delete
      </button>
    </div>
  );
};

export default TaskItem;