import React, { useContext } from "react";
import { DataContext } from "../../store/GlobaState";
import { ROUTER } from "../../untils/router";
import NavLink from "../NavLink";
import TextPrice from "../TextPrice";
import styles from './oderItem.module.scss';

function ProductOrder({ data }) {
  const[state,dispatch] = useContext(DataContext);
  const {auth,user,orders} = state;
  return (
      <div className={styles.product} >
        <img src={data.images[0].url} className={styles.images} alt="null" />
        <NavLink to={ROUTER.productLink(data._id)} text={data.title} />
        <TextPrice value={data.price1} />
        <p>SL :{data.quantity}</p>
       <p>Total: <TextPrice value={data.quantity * data.price1}/></p>
      </div>
  );
}
export default ProductOrder;
