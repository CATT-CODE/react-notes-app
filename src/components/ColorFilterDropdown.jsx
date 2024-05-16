import { Dropdown } from 'react-bootstrap';
import './ColorFilterDropdown.css';

const colorOptions = [
  { value: '', label: 'None', color: 'transparent' },
  { value: 'yellow', label: 'Yellow', color: '#fef68a' },
  { value: 'green', label: 'Green', color: '#d4f7d4' },
  { value: 'purple', label: 'Purple', color: '#e4d7f5' },
  { value: 'pink', label: 'Pink', color: '#fbd7f5' },
  { value: 'orange', label: 'Orange', color: '#ffe5b4' },
  { value: 'blue', label: 'Blue', color: '#d4e9f7' }
];

const ColorFilterDropdown = ({ selectedColor, onSelectColor }) => {
  return (
    <Dropdown>
      <Dropdown.Toggle variant="light" id="dropdown-basic">
        {selectedColor ? (
          <span className="color-swatch" style={{ backgroundColor: selectedColor }}></span>
        ) : (
          'Tag Color'
        )}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {colorOptions.map((option) => (
          <Dropdown.Item key={option.value} onClick={() => onSelectColor(option.value)}>
            <span className="color-swatch" style={{ backgroundColor: [option.color] }}></span>
            {option.label}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default ColorFilterDropdown;
