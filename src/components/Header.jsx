const Header = ({ completedCount, totalCount }) => {
  return (
    <header className="app-header">
      <div>
        <p className="eyebrow">TASK MANAGEMENT</p>

        <h1>TaskFlow</h1>

        <p className="header-subtitle">
          Stay organized. Get things done.
        </p>
      </div>

      <div className="completion-card">
        <span className="completion-label">Completed</span>

        <strong>
          {completedCount}/{totalCount}
        </strong>
      </div>
    </header>
  );
};

export default Header;