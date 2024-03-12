import React, {useState} from "react";
import styles from './ChipInput.module.scss'
import {Icon} from "semantic-ui-react";
const ChipInput = ({value, onChange}) => {
  const [text, setText] = useState("");
  const [chips, setChips] = useState(value);
  const [validationError, setValidationError] = useState("");

  function removeChip(chipToRemove) {
    // filtering out the chip that the user wants to remove
    const updatedChips = chips.filter((chip) => chip !== chipToRemove);
    setChips(updatedChips);
    onChange(chips)
  }

  function handlePressEnter(e) {
    // don't submit the form if the user presses 'Enter'
    if (e.key === "Enter") e.preventDefault();
    // return if the user pressed a key that is not 'Enter', or the user hasn't typed anything
    if (e.key !== "Enter" || !text) return;
    // need to show error if the user tries to add the same input more than once
    if (chips.includes(text)) {
      return setValidationError("Cannot add the same input more than once");
    }

    onChange((prevState) => [...prevState, e.target.value])

    // adding the input value to chips array
    setChips((prevState) => [...prevState, e.target.value]);
    // clearing the input box
    setText("");
    // clearing error message
    setValidationError("");
  }


  return (
    <div>
      <div className={styles.inputChipContainer}>
        <ul className={styles.chips}>
          {chips.map((chip) => (
            <li key={chip} className={styles.chip}>
              <span>{chip}</span>
              <span className={styles.deleteIcon}>
                <Icon name="times" onClick={() => removeChip(chip)}/>
              </span>
            </li>
          ))}
        </ul>
        <span style={{display: 'inline'}}>
        <input
          style={{border: "none"}}
          type="text"
          placeholder="Press Enter to add tag"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handlePressEnter}
        />
          </span>
      </div>
      {validationError && <p className={styles.errorMessage}>{validationError}</p>}
    </div>
  );
}

export default ChipInput;