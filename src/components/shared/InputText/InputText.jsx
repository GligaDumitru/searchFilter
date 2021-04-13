import React, { useEffect, useRef } from 'react';

const InputText = ({
  name = 'default_input',
  className = '',
  setFocusBoolean,
  ...otherProps
}) => {
  const textInput = useRef(null);
  useEffect(() => {
    textInput.current.focus();
  }, [setFocusBoolean]);
  return (
    <input
      type='text'
      ref={textInput}
      name={name}
      autoFocus
      className={`input_default ${className}`}
      {...otherProps}
    />
  );
};

export default InputText;
