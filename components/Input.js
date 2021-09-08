import React from "react";
import styles from "./Input.module.scss";

function Input({
  placeholder,
  onChange,
  title,
  className,
  name,
  value,
  id,
  disabled,
  type,
  label,
  multiple,
  ClassNameLabel
}) {
  const _placeholder = placeholder ? placeholder : "Nhập dữ liệu";
  return (
    <>
    {label?  <p className={styles.label + ' ' +ClassNameLabel}>{label}</p>:null}
    <input
      type={type}
      placeholder={_placeholder}
      className={styles.input + " " + className}
      name={name}
      value={value}
      onChange={onChange}
      title={title}
      id={id}
      disabled={disabled}
      data-interception='off'
      multiple={multiple}
    />
    </>
  );
}
export default Input;
