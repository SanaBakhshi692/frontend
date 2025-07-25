export function TodoFilterForm({
  name,
  setName,
  // unCompleted = false,
  setUncompleted,
  // Completed = false,
  setCompleted,
}) {
  return (
    <>
      <div className="filter-form">
        <button onClick={(e) => setCompleted((completed) => !completed)}>
          Completed
        </button>
        <button onClick={(e) => setUncompleted((unCompleted) => !unCompleted)}>
          unCompleted
        </button>
        <div className="filter-form-group">
          <input
            type="text"
            placeholder="Search..."
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
      </div>
    </>
  );
}
