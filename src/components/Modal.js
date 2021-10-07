import React, { useState } from "react";
import Button from "./Button";
import styles from "./Modal.module.scss";

function Modal({ title, onClose, onClick, closed }) {
  const _classModal = closed ? styles.openModal : styles.closeModal;

  return (
    <div className={styles.modal + " " + _classModal}>
      <div className={styles.overflow} onClick={onClose} />
      <div className={styles.detail}>
        <div className={styles.header}>Xóa</div>
        <div className={styles.content}>
          Bạn muốn xóa <span className={styles.title}>{title}</span> không?
        </div>
        <div className={styles.bottom}>
          <Button
            onClick={onClick}
            text="Xác Nhận"
            className={styles.btnConfirm}
            textStyle={styles.textWhite}
          />
          <Button
            onClick={onClose}
            text="Hủy"
            className={styles.btnCancle}
            textStyle={styles.textWhite}
          />
        </div>
      </div>
    </div>
  );
}
export default Modal;
