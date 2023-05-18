import React from 'react';

function PageSelector({ count, setCount, onPageChange, lastPage }) {

  function handleInputFieldChange(event) {
    handleNumberChange(parseInt(event.target.value));
  }

  function handleNumberChange(number) {
    setCount(clamp(number, 1, lastPage));
  }

  function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
  }

  return (
    <div className="page-selector-container">      
      <div className="page-selector">
        <button onClick={() => handleNumberChange(count - 1)} className="button arrow-button-left" title="Previous page">
          <span className="arrow-left-icon"></span>
        </button>
        <input className="page-input" type="text" value={count} onChange={handleInputFieldChange} inputMode="numeric" pattern="[0-9]* browsers" title="Enter page number" />
        <button onClick={() => handleNumberChange(count + 1)} className="button arrow-button-right" title="Next page">
          <span className="arrow-right-icon"></span>
        </button>
      </div>
    </div>
  );
}

export default PageSelector;