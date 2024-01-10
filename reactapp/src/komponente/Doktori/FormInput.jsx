import React from 'react';

function FormInput({ label, type, name, value, onChange, min, max, step, required }) {
  return (
    <label>
      {label}:
      <input 
        type={type} 
        id={name} 
        name={name} 
        value={value} 
        onChange={onChange} 
        min={min} 
        max={max} 
        step={step} 
        required={required} 
      />
    </label>
  );
}

export default FormInput;
