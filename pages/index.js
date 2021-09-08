import React from "react";
import ProductItem from "../components/Products/productItem";
import { getData } from "../untils/fetchData";
import styles from "./home.module.scss";

export default function Home(props) {
  const listProduct = props.products;
  return (
    <div className={styles.wrapper}>
      <div className={styles.productList}>
        {listProduct.map((item) => (
          <ProductItem data={item} key={item._id} />
        ))}
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  const res = await getData("product");

  //server side rendering
  return {
    props: {
      products: res.products,
      result: res.result,
    }, // will be passed to the page component as props
  };
}
