'use client';
import './styles.css';

export default function Dropdown({
  options,
  value,
  onChange,
  label = 'Seleccionar',
  disabled = false,
  name,
}) {
  const handleChange = (e) => {
    onChange(e.target.value);
  };

  return (
    <div className="dropdown-container">
      <h3>{label}</h3>
      <select name={name} value={value} onChange={handleChange} disabled={disabled}>
        <option value="" disabled>Elegir</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}