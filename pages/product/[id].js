import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import Button from "../../components/Button";
import { getData } from "../../untils/fetchData";
import styles from "./productDetail.module.scss";
import { FaShoppingCart } from "react-icons/fa";
import SliderImage from "../../components/SliderImage";
import TextPrice from "../../components/TextPrice";
import SliderSync from "../../components/SliderSync";
import { DataContext } from "../../store/GlobaState";
import { AddToCart } from "../../store/Actions";
import { ROUTER } from "../../untils/router";

const ProductDetai = (props) => {
  if (!props.product) return null;

  const [state, dispath] = useContext(DataContext);
  const { cart } = state;
  const router = useRouter();
  const onBuy = () => {
    dispath(AddToCart(props.product, cart));
  };

  const onBuyNow = () => {
    dispath(AddToCart(props.product, cart));
    router.push(ROUTER.cart);
  };
  const {
    content,
    description,
    images,
    inStock,
    price,
    price1,
    sold,
    title,
  } = props.product;

  return (
    <div className={styles.warapper}>
      <div className={styles.container}>
        <div className={styles.imageCarosel}>
          <SliderImage
            data={images.map((item) => (
              <img
                src={item.url}
                key={item.public_id}
                className={styles.image}
              />
            ))}
          />
        </div>
        <div className={styles.content}>
          <p className={styles.title}>{title}</p>
          <div className={styles.flex}>
            <p className={styles.sell}>Đã bán: {sold}</p>
            <p className={styles.inStock}>Kho: {inStock}</p>
          </div>
          <p>
            <TextPrice value={price} className={styles.price} />
          </p>
          <p>
            <TextPrice value={price1} className={styles.price1} />
          </p>
          {inStock > 0 ? (
            <div className={styles.buttonzone}>
              <Button
                onClick={onBuy}
                className={styles.buy}
                icon={<FaShoppingCart className={styles.iconBuy} />}
              />
              <Button
                onClick={onBuyNow}
                className={styles.buyNow}
                text={"Mua Ngay"}
                textStyle={styles.textBuyNow}
              />
            </div>
          ) : (
            <p>Out of Stock</p>
          )}
        </div>
      </div>
      <div className={styles.description}>{description}</div>
    </div>
  );
};

export async function getServerSideProps({ params: { id } }) {
  const data = await getData(`product/${id}`);
  return {
    props: {
      product: data.product,
    },
  };
}
export default ProductDetai;
