import React from 'react';

function PageNumberInput({ count, setCount, onPageChange }) {

  function handleInputFieldChange(event) {
    handleNumberChange(parseInt(event.target.value));
  }

  function handleNumberChange(number) {
    setCount(clamp(number, 1, 500));
  }

  function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
  }

  return (
    <div>
      <button onClick={() => handleNumberChange(count - 1)}>Prev</button>
      <input type="text" value={count} onChange={handleInputFieldChange} inputMode="numeric" pattern="[0-9]* browsers" />
      <button onClick={() => handleNumberChange(count + 1)}>Next</button>
    </div>
  );
}

export default PageNumberInput;