import Header from "../components/Header";
import AddTask from "../components/AddTask";
import TaskList from "../components/TaskList";
import StateCard from "../components/StateCard";

const Dashboard = ({
  tasks,
  loading,
  error,
  requesting,
  onRetry,
  onAddTask,
  onToggleTask,
  onDeleteTask,
}) => {
  const completedCount = tasks.filter(
    (task) => task.completed
  ).length;

  return (
    <main className="app-container">
      <div className="dashboard">
        <Header
          completedCount={completedCount}
          totalCount={tasks.length}
        />

        <section className="content-card">
          <div className="section-heading">
            <div>
              <h2>My Tasks</h2>

              <p>
                Manage your daily tasks and keep your progress
                on track.
              </p>
            </div>

            <span className="task-count">
              {tasks.length} {tasks.length === 1 ? "task" : "tasks"}
            </span>
          </div>

          <AddTask
            onAddTask={onAddTask}
            disabled={requesting}
          />

          {loading ? (
            <StateCard type="loading" />
          ) : error ? (
            <StateCard type="error" onRetry={onRetry} />
          ) : (
            <TaskList
              tasks={tasks}
              requesting={requesting}
              onToggleTask={onToggleTask}
              onDeleteTask={onDeleteTask}
            />
          )}
        </section>
      </div>
    </main>
  );
};

export default Dashboard;