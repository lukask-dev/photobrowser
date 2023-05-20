import React, { useState } from 'react';

function PageSelector({ page, setNewPageNumber, lastPage }) {

  const leftButtonDisabled = page <= 1;
  const rightButtonDisabled = page >= lastPage;
  const [inputFieldValue, setInputFieldValue] = useState(page.toString());  

  function handleInputFieldChange(event) {
    const newValue = event.target.value;
    setInputFieldValue(newValue);
    const parsed = parseInt(newValue);
    if (parsed && parsed > 0)
      setNewPageNumber(parseInt(newValue));
  }

  function handeArrowClick(newPageNumber) {
    setInputFieldValue(newPageNumber);
    setNewPageNumber(newPageNumber);
  }

  function handleFocus(event) {
    event.target.select();
  }

  function handleBlur(event) {
    if (inputFieldValue !== page)
      setInputFieldValue(page);
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
          className="page-input"
          type="text"
          value={inputFieldValue}
          onChange={handleInputFieldChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
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