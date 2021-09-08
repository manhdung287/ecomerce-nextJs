import React, { useContext } from "react";
import NavLink from "../../components/NavLink";
import OrderItem from "../../components/Order/OrderItem";
import ProductOrder from "../../components/Order/ProductOrder";
import TextPrice from "../../components/TextPrice";
import { DataContext } from "../../store/GlobaState";
import { ROUTER } from "../../untils/router";
import { DateFormat, DateTimeFormat, TimeFormat } from "../../untils/Timeformat";
import styles from './oder.module.scss';
const Order = () => {
  const [state, dispath] = useContext(DataContext);
  const { orders } = state;

  if(orders.length < 1) return <p>No thing Here</p>
  return (
    <div className={styles.wrapper}>
      {orders.map((item) => (
       <OrderItem data={item} key={item._id}/>
      ))}
    </div>
  );
};
export default Order;
