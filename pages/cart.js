import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import Button from "../components/Button";
import CartItem from "../components/Cart/CartItem";
import Input from "../components/Input";
import NavLink from "../components/NavLink";
import TextPrice from "../components/TextPrice";
import { DataContext } from "../store/GlobaState";
import { getData, postData } from "../untils/fetchData";
import { ROUTER } from "../untils/router";
import { validateNumber } from "../untils/valid";

export default function Cart() {
  const initalContact = { address: "", number: "" };
  const router = useRouter();
  const [state, dispath] = useContext(DataContext);
  const [contactData, setContactData] = useState(initalContact);
  const { address, number } = contactData;
  const [total, setTotal] = useState(0);

  const { cart, auth,orders } = state;

  const hanldeInputChangeValue = (e) => {
    const { name, value } = e.target;
    setContactData({ ...contactData, [name]: value });
    dispath({ type: "NOTIFY", payload: {} });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    const validNum = validateNumber(number);
    if (!validNum)
      dispath({
        type: "NOTIFY",
        payload: { err: "Số điện thoại không chính xác" },
      });
    if (address.length <= 5) {
      dispath({
        type: "NOTIFY",
        payload: { err: "Bạn chưa nhập địa chỉ" },
      });
    }
    if (validNum && address.length > 5) {
      postData('order',{contactData,cart,total},auth.token)
      .then(res=>{
        if(res.err) return dispath({type:"NOTIFY",payload:{err:res.err}})

        dispath({type:'ADD_CART',payload:[]})
        const newOrder = {...res.newOrder,user:auth.token}
        dispath({type:'ADDD_ORDER',payload:[...orders,newOrder]})
        return dispath({type:'NOTIFY',payload:{success:'Create Order Success'}})
      })
      // const createOrder = postData(
      //   "order",
      //   { contactData, cart, total },
      //   auth.token
      // );
      // if (createOrder) {
      //   dispath({ type: "ADD_CART", payload: [] });

      //   dispath({ type: "ADD_ORDER", payload: [...orders,{contactData, cart, total}] });

      //   dispath({ type: "NOTIFY", payload: { success: "Thanh Cong" } });
      // }
    }
  };

  useEffect(() => {
    const getTotal = () => {
      const res = cart.reduce((prev, item) => {
        return prev + item.price1 * item.quantity;
      }, 0);
      setTotal(res);
    };
    getTotal();
  }, [cart]);

  useEffect(() => {
    const cartLocal = JSON.parse(localStorage.getItem("_add_cart"));
    if (cartLocal && cartLocal.length > 0) {
      let newArr = [];
      const updateCart = async () => {
        for (const item of cartLocal) {
          const res = await getData(`product/${item._id}`);
          const { _id, title, images, price1, inStock, sold } = res.product;
          if (inStock > 0) {
            newArr.push({
              _id,
              title,
              images,
              price1,
              inStock,
              sold,
              quantity: item.quantity > inStock ? 1 : item.quantity,
            });
          }
        }
        dispath({ type: "ADD_CART", payload: newArr });
      };
      updateCart();
    }
  }, []);

  if (cart.length < 1) return <div>Cart Emty</div>;
  // if(!auth.token) return router.push(ROUTER.sigin)
  return (
    <div className="container">
      {cart.map((item) => (
        <CartItem data={item} key={item._id} />
      ))}
      <form onSubmit={onSubmit}>
        <p>Address</p>
        <Input
          type="text"
          placeholder="address"
          name="address"
          value={address}
          onChange={hanldeInputChangeValue}
        />

        <p>Address</p>
        <Input
          placeholder="number"
          id="number"
          name="number"
          value={number}
          onChange={hanldeInputChangeValue}
        />

        <Button type="submit" text="submit" onClick={onSubmit} />
      </form>
      <p>Total:  <TextPrice value={total}/> </p>
      <NavLink to={auth.user ? ROUTER.payment : ROUTER.sigin} text="Payment" />
    </div>
  );
}
