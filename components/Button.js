import React from "react";
import styles from "./button.module.scss";

export default function Button({
  text,
  onClick,
  img,
  icon,
  className,
  textStyle,
  disabled,
  type,
}) {
  return (
    <button
      onClick={onClick}
      className={styles.default + " " + className}
      disabled={disabled}
      type={type}
    >
      {text ? (
        <span className={styles.text + " " + textStyle}>{text}</span>
      ) : null}
      {img ? img : null}
      {icon ? icon : null}
    </button>
  );
}
