export const ACTION = {
  NOTIFY: "NOTIFY",
  AUTH: "AUTH",
  ADD_CART: "ADD_CART",
  ADD_ORDER: "ADD_ORDER",
  ADD_USER: "ADD_USER",
  ADD_CATEGORIES: "ADD_CATEGORIES",
};
export const AddToCart = (product, cart) => {
  if (product.inStock === 0) {
    return { type: "NOTIFY", payload: { err: "This product is out of stock" } };
  }
  const check = cart.every(item => item._id !== product._id);
  if (!check) {
    const newCart = [...cart];
    newCart.forEach((item) => {
      if (item._id === product._id) item.quantity += 1;
    });
    return { type: "ADD_CART", payload: newCart };
  }
  return { type: "ADD_CART", payload: [...cart, { ...product, quantity: 1 }] };
};

export const RemoveCart = (cart, id) => {
  const newData = [...cart];
  var findId = cart.indexOf(id);
  if (findId > -1) {
    newData.splice(findId, 1);
  }
  return { type: "ADD_CART", payload: newData };
};

export const createCategory = async(value) => {

  if (!value) dispath({ type: "NOTIFY", payload: { err: "Name not blank" } });
  dispath({ type: "NOTIFY", payload: { loading: true } });

  let res;
  res = await postData("categories", { value }, auth.token);
  if (res.err)
    return dispath({ type: "NOTIFY", payload: { err: res.err } });
  dispath({
    type: "ADD_CATEGORIES",
    payload: [...categories, res.newCate],
  });

  setName("");
  setId("");
  dispath({ type: "NOTIFY", payload: { success: res.msg } });
  dispath({ type: "NOTIFY", payload: { loading: false } });
};

export const decrease = (data, id) => {
  const newData = [...data];
  newData.forEach((item) => {
    if (item._id === id) item.quantity -= 1;
  });
  return { type: "ADD_CART", payload: newData };
};

export const increase = (data, id) => {
  const newData = [...data];
  newData.forEach((item) => {
    if (item._id === id) item.quantity += 1;
  });
  return { type: "ADD_CART", payload: newData };
};

export const UpdateItem = (data, id, post, type) => {
  const newData = data.map(item => (item._id === id ? post : item))
  return ({ type, payload: newData })
}
export const DeleteItem = (data, id, type) => {
  const newData = data.filter(item => (item._id !== id))
  return ({ type, payload: newData })
}