import "../../assets/css/style.css"; // Importation du CSS global

export function ToggleBar({ activeFilters, onRemoveFilter }) {
  return (
    <div className="toggle-bar">
      {activeFilters.map((filter, index) => (
        <div key={index} className="toggle-chip" onClick={() => onRemoveFilter(filter)}>
          <span>{filter}</span>
          <button 
            className="remove-icon"
            onClick={() => onRemoveFilter(filter)}
        >
            ✕
            </button>
        </div>
      ))}
    </div>
  );
}
