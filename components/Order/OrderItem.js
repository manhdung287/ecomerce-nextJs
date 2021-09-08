import React from "react";
import { DateTimeFormat } from "../../untils/Timeformat";
import TextPrice from "../TextPrice";
import ProductOrder from './ProductOrder';
import styles from './oderItem.module.scss';
import NavLink from "../NavLink";
import { ROUTER } from "../../untils/router";

function OrderItem({ data }) {
  

  return (
    <div className={styles.item} >
      <p><NavLink text={data._id} to={ROUTER.ordertLink(data._id)} /></p>
      {data.product.map((itemp) => (
        <ProductOrder data={itemp} key={itemp._id} />
      ))}
      <TextPrice value={data.total} />
      <p>Time:{DateTimeFormat(data.createdAt)}</p>
      <p>{data.delivered?'Đã chuyển':'Chưa Chuyển'}</p>
      <p>{data.paid?'Đã thanh toán':'Chưa thanh toán'}</p>
      
    </div>
  );
}
export default OrderItem;
