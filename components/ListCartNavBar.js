import React, { useContext, useEffect } from "react";
import { DataContext } from "../store/GlobaState";
import TextPrice from "./TextPrice";
import styles from "./ListCartNavBar.module.scss";
import NavLink from "./NavLink";
import { ROUTER } from "../untils/router";
import Button from "./Button";

function ListCartNavBar({ total }) {
  const [state, dispath] = useContext(DataContext);
  const { cart } = state;
  console.log(cart);
  return (
    <div className={styles.wrapper}>
      {cart.map((item) => (
        <div className={styles.item} key={item._id}>
          <img src={item.images[0].url} alt="null" className={styles.img} />
          <div className={styles.content}>
            <NavLink
              to={ROUTER.productLink(item._id)}
              text={item.title}
              className={styles.title}
            />
            <p className={styles.flex}>
              <TextPrice value={item.price1} />
              <span className={styles.quantity}>
                x<span className={styles.textStrong}>{item.quantity}</span>
              </span>
            </p>
          </div>
        </div>
      ))}
      <div className={styles.flex + ' '+ styles.total}>
        <span>Tổng:<TextPrice value={total.totalPrice} className={styles.textStrong}/> </span>
        <span className={styles.textStrong}>x{total.totalQuantity}</span>
      </div>
      <div className={styles.gridWrapper}>
         <NavLink to={ROUTER.cart} text='Giỏ hàng' className={styles.navCart}/>
         <NavLink to={ROUTER.payment} text='Thanh Toán'className={styles.navPayMent}/>
      </div>
    </div>
  );
}
export default ListCartNavBar;
