import React from 'react';
import PropTypes from 'prop-types';

const Chip = ({ value, onClick }) => {
  const handleOnClick = () => onClick(value);
  return (
    <div className='chip_container'>
      <span className='chip_value'>{value}</span>
      <span className='chip_close' onClick={handleOnClick}>
        &#10005;
      </span>
    </div>
  );
};

Chip.propTypes = {
  value: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Chip;
