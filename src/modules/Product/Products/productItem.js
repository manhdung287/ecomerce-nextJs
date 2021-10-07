import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import Button from "../../../components/Button";
import TextPrice from "../../../components/TextPrice";
import { ROUTER } from "../../../untils/router";
import { CalculatorSalePrice } from "../../../untils/valid";

import styles from "./productItem.module.scss";

function ProductItem({ data }) {
  if (!data) return null;
  const [categoryname ,setCategoryname] = useState('');
  const [state, dispath] = useContext(DataContext);
  const { cart, auth ,categories} = state;

  const router = useRouter();
  const onBuy = () => {
    dispath(AddToCart(data, cart));
  };

  const onBuyNow = () => {
    dispath(AddToCart(data, cart));
    router.push(ROUTER.cart);
  };
  // const onEditProduct = () => {
  //   router.push(ROUTER.createProductLink(data._id));
  // };
  // const onDeleteProduct = () => {};

  return (
    <div className={styles.wrapper}>
      <a href={ROUTER.productLink(data._id)} className={styles.imgWrapper}>
        <img src={data.images[0].url} alt="null" className={styles.img} />
      </a>
      <div>
        <p className={styles.title}>{data.title}</p>
        <div className={styles.store}>
        {data.inStock > 0 ? (
          <p className={styles.inStock}>Kho:<span className={styles.textColor}>{data.inStock}</span> </p>
        ) : null}
        <p className={styles.sold}>Đã bán:<span className={styles.textColor}>{data.sold}</span> </p>
      
        </div>
        <p className={styles.price}>
          <TextPrice className={styles.priceBe} value={data.price1} />
          {data.price1 < data.price?  <TextPrice className={styles.priceAf} value={data.price} />:null}
          {data.price1 < data.price?<span className={styles.sale}>- <span>{CalculatorSalePrice(data.price,data.price1)}</span> </span>:null}
        </p>
        <p className={styles.size}>Kích thước:<span className={styles.textColor}>{data.size? data.size:'Nosize'}</span></p>
        <p className={styles.description}>{data.description}</p>
        {data.inStock > 0 ? (
          <div className={styles.buttonZone}>
            <Button
              onClick={onBuy}
              className={styles.buy}
              text={"Thêm  giỏ hàng"}
              textStyle={styles.textBuy}
            />
            <Button
              onClick={onBuyNow}
              className={styles.buyNow}
              text={"Mua Ngay"}
              textStyle={styles.textBuyNow}
            />
          </div>
        ) : (
          <p>Out of Stok</p>
        )}
      </div>
    </div>
  );
}
export default ProductItem;
