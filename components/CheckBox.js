import React from "react";
import styles from "./Checkbox.module.scss";

function CheckBox({ onChange, label,name, value,checked,id }) {
  return (
    <label className={styles.container}>  {label ? <p>{label}</p> : null}
     <input
        type="checkbox"
        id={id}
        className={styles.checkbox}
        value={value}
        onChange={onChange}
        checked={checked}
        name={name}
      />
    <span className={styles.checkmark}></span>
  </label>
  );
}
export default CheckBox;
