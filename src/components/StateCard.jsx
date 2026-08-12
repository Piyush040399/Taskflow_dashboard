const StateCard = ({ type, onRetry }) => {
  if (type === "loading") {
    return (
      <div className="state-card">
        <div className="loader" />

        <h3>Loading tasks...</h3>

        <p>Please wait while we fetch your tasks.</p>
      </div>
    );
  }

  if (type === "error") {
    return (
      <div className="state-card error-state">
        <div className="state-icon">!</div>

        <h3>Unable to load tasks</h3>

        <p>
          Something went wrong while fetching your tasks.
        </p>

        <button
          type="button"
          className="primary-button retry-button"
          onClick={onRetry}
        >
          Try Again
        </button>
      </div>
    );
  }

  return null;
};

export default StateCard;