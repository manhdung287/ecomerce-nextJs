import React from "react";
import { ACTION } from "./Actions";

const reducers = (state, action) => {
  switch (action.type) {
    case ACTION.NOTIFY:
      return { ...state, notify: action.payload };
    case ACTION.AUTH:
      return { ...state, auth: action.payload };
    case ACTION.ADD_CART:
      return { ...state, cart: action.payload };
    case ACTION.ADD_ORDER:
      return { ...state, orders: action.payload };
    case ACTION.ADD_USER:
      return { ...state, users: action.payload };
    case ACTION.ADD_CATEGORIES:
      return { ...state, categories: action.payload };
    default:
      return state;
  }
};
export default reducers;
