import React from 'react';

function PageSelector({ page, updatePageNumber, lastPage }) {

  const leftButtonDisabled = page <= 1;
  const rightButtonDisabled = page >= lastPage;

  function handleInputFieldChange(event) {
    updatePageNumber(parseInt(event.target.value));
  }

  function handleFocus(event) {
    event.target.select();
  }

  return (
    <div className="page-selector-container">
      <div className="page-selector">
        <button
          onClick={() => updatePageNumber(Number(page) - Number(1))}
          className={leftButtonDisabled ? "button-disabled arrow-button-left" : "button arrow-button-left"}
          title="Previous page"
          disabled={leftButtonDisabled}
        >
          <span className="arrow-left-icon"></span>
        </button>
        <input
          className="page-input"
          type="text"
          value={page}
          onChange={handleInputFieldChange}
          onFocus={handleFocus}
          inputMode="numeric"
          pattern="[0-9]*"
          title="Enter page number"
        />
        <button
          onClick={() => updatePageNumber(Number(page) + Number(1))}
          className={rightButtonDisabled ? "button-disabled arrow-button-right" : "button arrow-button-right"}
          title="Next page"
          disabled={rightButtonDisabled}
        >
          <span className="arrow-right-icon"></span>
        </button>
      </div>
    </div>
  );
}

export default PageSelector;