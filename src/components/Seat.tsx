import React, { useState } from 'react';
import { Tooltip } from 'antd';

const Seat: React.FC<{
  number: number;
  onSelect: (seatNumber: number, isSelected: boolean) => void;
  disabled?: boolean;
}> = ({ number, onSelect, disabled = false }) => {
  const [selected, setSelected] = useState(false);

  const handleClick = () => {
    if (disabled) return;
    const newState = !selected;
    setSelected(newState);
    onSelect(number, newState);
  };


  //handle border color dynamicaly
  const getBorderColor = () => {
    if (disabled) return '#dc3545';
    if (selected) return '#135204ff';
    return '#28a745';
  };

  const seatButton = (
    <button
      onClick={handleClick}
      disabled={disabled}
      className={`seat ${selected ? 'selected' : ''} ${disabled ? 'booked' : ''}`}
      style={{
        cursor: disabled ? 'not-allowed' : 'pointer',
        backgroundColor: disabled
          ? '#eee'
          : selected
            ? '#1fb91fff'
            : '#fff',
        border: `2px solid ${getBorderColor()}`,
        padding: '8px 12px',
        margin: '4px',
        borderRadius: '4px',
        minWidth: '40px',
        transition: '0.2s ease',
      }}
    >
      {number}
    </button>
  );


  return disabled ? (
    <Tooltip title="Already booked">{seatButton}</Tooltip>
  ) : (
    seatButton
  );
}

export default Seat;
