import React, { useContext, useEffect, useState } from "react";
import Button from "../Button";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { BsTrash } from "react-icons/bs";
import styles from "./CartItem.module.scss";
import TextPrice from "../TextPrice";
import NavLink from "../NavLink";
import { DataContext } from "../../store/GlobaState";
import { decrease, RemoveCart } from "../../store/Actions";
import { increase } from "../../store/Actions";
import Modal from "../Modal";

function CartItem({ data }) {
  if (!data) return null;

  const [state, dispath] = useContext(DataContext);
  const [closeModal, setCloseModal] = useState(false);
  const { cart } = state;
  const onOpenModalDelete = () => {
    setCloseModal(!closeModal);
  };

  const { title, quantity, _id, inStock, price1 } = data;
  return (
    <div className={styles.wrapper}>
      <img src={data.images[0].url} alt="null" className={styles.img} />
      <NavLink to={`/product/${_id}`} text={title} />
      <TextPrice value={price1} />
      <p>inStock:{inStock}</p>
      <div className={styles.quantityContainer}>
        <Button
          onClick={() => dispath(decrease(cart, _id))}
          icon={<AiOutlineMinus />}
          disabled={quantity <= 1 ? true : false}
        />
        <span className={styles.quantity}>{quantity}</span>
        <Button
          onClick={() => dispath(increase(cart, _id))}
          icon={<AiOutlinePlus />}
          disabled={quantity < 1 || quantity >= inStock ? true : false}
        />
      </div>
      <p>
        Total: <TextPrice value={price1 * quantity} />
      </p>
      {/* <Button icon={<BsTrash />} onClick={()=>dispath(RemoveCart(cart,data))} /> */}
      <Button icon={<BsTrash />} onClick={onOpenModalDelete} />
      <Modal
        closed={closeModal}
        title={title}
        onClose={onOpenModalDelete}
        onClick={() => dispath(RemoveCart(cart, data))}
      />
    </div>
  );
}
export default CartItem;
