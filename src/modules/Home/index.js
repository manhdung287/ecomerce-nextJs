import React from "react";
import { getData } from "../../untils/fetchData";
import ProductItem from "../Product/Products/productItem";


import styles from "./home.module.scss";

export default function Home({products}) {
  console.log(products)
  if(!products) return null;
  return (
    <div className={styles.wrapper}>
      <div className={styles.productList}>
        {products.map((item) => (
          <ProductItem data={item} key={item._id} />
        ))}
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const res = await getData("product");
  if(!res) return {props:{}};
  //server side rendering
  return {
    props: {
      products: res.products,
      result: res.result,
    },
  };
}
