import React, { useEffect } from "react";
import { createContext, useReducer } from "react";
import { getData } from "../untils/fetchData";
import reducers from "./Reducer";

export const DataContext = createContext();

export const Dataprovider = ({ children }) => {
  const initalState = { notify: {}, auth: {}, cart: [], orders: [],users:[],categories:[] };
  const [state, dispath] = useReducer(reducers, initalState);

  const { cart, auth } = state;

  useEffect(() => {
    const firstLogin = localStorage.getItem("FirstLogin");
    if (firstLogin) {
      getData("auth/accessToken").then((res) => {
        if (res.err) return localStorage.removeItem("FirstLogin");
        dispath({
          type: "AUTH",
          payload: {
            token: res.access_token,
            user: res.user,
          },
        });
      });
      getData('categories').then(res=>{
        if(res.err) return dispath({type:"NOTIFY",payload:{err:res.err}})
        dispath({type:"ADD_CATEGORIES",payload:res.categories})
      })
    }
  }, []);

  useEffect(() => {
    const _add_cart = JSON.parse(localStorage.getItem("_add_cart"));
    if (_add_cart) dispath({ type: "ADD_CART", payload: _add_cart });
  }, []);

  useEffect(() => {
    localStorage.setItem("_add_cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    if (auth.token) {
      getData("order", auth.token).then((res) => {
        if (res.err) {return dispath({type:"NOTIFY",payload:{err:res.err}})
        }
        dispath({type:"ADD_ORDER",payload:res.orders})
      });
      if(auth.user.isAdmin ){
        getData('user',auth.token)
        .then(res=>{
          if(res.err) return dispath({type:"NOTIFY",payload:{err:res.err}})
          dispath({type:"ADD_USER",payload:res.users})
        })
      }
    }
  }, [auth.token]);
  return (
    <DataContext.Provider value={[state, dispath]}>
      {children}
    </DataContext.Provider>
  );
};
