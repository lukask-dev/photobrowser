import React, { useState } from 'react';

function PageSelector({ page, setNewPageNumber, lastPage }) {

  const leftButtonDisabled = page <= 1;
  const rightButtonDisabled = page >= lastPage;
  const [inputFieldValue, setInputFieldValue] = useState(page);
  const [inputFieldHasValidInput, setInputFieldHasValidInput] = useState(true);  

  function handleInputFieldChange(event) {
    const newValue = event.target.value;
    setInputFieldValue(newValue);
    const parsedValue = parseInt(newValue);
    if (parsedValue && parsedValue >= 1 && parsedValue <= lastPage) {
      setNewPageNumber(parseInt(newValue));
      setInputFieldHasValidInput(true);
    }
    else setInputFieldHasValidInput(false);
  }

  function handeArrowClick(newPageNumber) {
    setInputFieldValue(newPageNumber);
    setNewPageNumber(newPageNumber);
  }

  function handleInputFieldFocus(event) {
    event.target.select();
  }

  function handleInputFieldBlur(event) {
    updatePageNumberToInputField();
  }

  function handleInputFieldKeyDown(event) {
    if (event.key === 'Enter') {
      updatePageNumberToInputField();
    }
  }

  function updatePageNumberToInputField () {
    if (inputFieldValue !== page) {
      setInputFieldValue(page);
      setInputFieldHasValidInput(true);
    }
  }

  return (
    <div className="page-selector-container">
      <div className="page-selector">
        <button
          onClick={() => handeArrowClick(Number(page) - Number(1))}
          className={leftButtonDisabled ? "button-disabled arrow-button-left" : "button arrow-button-left"}
          title="Previous page"
          disabled={leftButtonDisabled}
        >
          <span className="arrow-left-icon"></span>
        </button>
        <input
          className={inputFieldHasValidInput ? 'page-input' : 'page-input page-input-invalid'}
          type="text"
          value={inputFieldValue}
          onChange={handleInputFieldChange}
          onFocus={handleInputFieldFocus}
          onBlur={handleInputFieldBlur}
          onKeyDown={handleInputFieldKeyDown}
          inputMode="numeric"
          pattern="[0-9]*"
          title="Enter page number"
        />
        <button
          onClick={() => handeArrowClick(Number(page) + Number(1))}
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