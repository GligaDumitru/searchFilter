import React from 'react';
import PropTypes from 'prop-types';
import noop from 'lodash/noop';

const Input = React.forwardRef(
  (
    {
      onChange,
      onClick,
      onBlur,
      onFocus,
      onKeyDown,
      type,
      value,
      name,
      className,
      placeholder,
    },
    ref
  ) => (
    <input
      ref={ref}
      onChange={onChange}
      onBlur={onBlur}
      onClick={onClick}
      onFocus={onFocus}
      onKeyDown={onKeyDown}
      type={type}
      value={value}
      name={name}
      className={className}
      placeholder={placeholder}
    />
  )
);

Input.propTypes = {
  onChange: PropTypes.func,
  onClick: PropTypes.func,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  onKeyDown: PropTypes.func,
  type: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  name: PropTypes.string,
  className: PropTypes.string,
  placeholder: PropTypes.string,
};

Input.defaultProps = {
  onChange: noop,
  onClick: noop,
  onBlur: noop,
  onFocus: noop,
  onKeyDown: noop,
  type: 'text',
  value: '',
  name: '',
  className: '',
  placeholder: '',
};
export default Input;
