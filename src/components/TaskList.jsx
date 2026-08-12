import TaskItem from "./TaskItem";

const TaskList = ({
  tasks,
  requesting,
  onToggleTask,
  onDeleteTask,
}) => {
  if (!tasks.length) {
    return (
      <div className="state-card">
        <div className="state-icon">✓</div>

        <h3>No tasks found</h3>

        <p>
          You're all caught up. Add a new task to get started.
        </p>
      </div>
    );
  }

  return (
    <div className="task-list">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          requesting={requesting}
          onToggleTask={onToggleTask}
          onDeleteTask={onDeleteTask}
        />
      ))}
    </div>
  );
};

export default TaskList;