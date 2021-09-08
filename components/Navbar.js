import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { FaShoppingCart, FaUserAlt } from "react-icons/fa";
import styles from "./Navbar.module.scss";
import { DataContext } from "../store/GlobaState";
import Cookies from "js-cookie";
import Logo from "./Logo";
import NavLink from "./NavLink";
import { ROUTER } from "../untils/router";
import ListCartNavBar from "./ListCartNavBar";

export default function Navbar() {
  const [state, dispath] = useContext(DataContext);
  const [total, setTotal] = useState({});
  const { auth, cart } = state;
  const _cartLink = auth.user ? ROUTER.cart : ROUTER.sigin;
  const router = useRouter();
  const isActive = (r) => {
    if (r === router.pathname) {
      return styles.active;
    } else return "";
  };
  const hanleLogout = () => {
    Cookies.remove("refreshtoken", { path: "/auth/accessToken" });
    localStorage.removeItem("FirstLogin");
    dispath({ type: "AUTH", payload: {} });
    dispath({ type: "NOTIFY", payload: { success: "LogOut!" } });
    router.push(ROUTER.home);
  };

  useEffect(() => {
    const getTotal = () => {
      const totalQuantity = cart.reduce((prev, item) => {
        return prev + item.quantity;
      }, 0);
      const totalPrice = cart.reduce((prev, item) => {
        return prev + item.quantity * item.price1;
      }, 0);
      setTotal({ ...total, totalQuantity, totalPrice });
    };
    getTotal();
  }, [cart]);

  console.log(total);
  return (
    <div className={styles.container}>
      <Logo />
      <div className={styles.elementRight}>
        {/* {auth && auth.user.isAdmin ? (
          <NavLink
            to={ROUTER.admin}
            className={styles.item + " " + isActive(ROUTER.admin)}
            text="Admin"
          />
        ) : null} */}
        <NavLink
          to={ROUTER.about}
          className={styles.item + " " + isActive(ROUTER.about)}
          text="About"
        />
        <NavLink
          to={ROUTER.product}
          className={styles.item + " " + isActive(ROUTER.product)}
          text="Product"
        />
        <NavLink
          to={ROUTER.order}
          className={styles.item + " " + isActive(ROUTER.order)}
          text="Order"
        />
        <div className={styles.cart}>
          <NavLink
            to={ROUTER.cart}
            icon={<FaShoppingCart  className={styles.iconCart}/>}
            children={<span className={styles.quantity}>{total.totalQuantity}</span>}
            className={styles.navtoCart}
          />
          <div className={styles.listCartWrapper}>
            <ListCartNavBar total={total} />
          </div>
        </div>
        {auth.user ? (
          <div className={styles.user}>
            <NavLink to={ROUTER.profile}>
              <img src={auth.user.avartar} className={styles.avartar} />
            </NavLink>
            <div>
              <NavLink
                to={ROUTER.profile}
                className={styles.name}
                text={auth.user.name}
              />
              <p>
                <span onClick={hanleLogout} className={styles.logout}>
                  Logout
                </span>
              </p>
            </div>
          </div>
        ) : (
          <NavLink
            to={ROUTER.sigin}
            className={styles.item + " " + isActive(ROUTER.sigin)}
            text="Signin"
          />
        )}
      </div>
    </div>
  );
}
