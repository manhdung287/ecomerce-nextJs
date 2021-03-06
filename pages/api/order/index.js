import auth from "../../../middleware/auth";
import connectDB from "../../../untils/connectDB";
import Orders from "../../../models/orderModel";
import Products from "../../../models/productModel";
connectDB();

export default async (req, res) => {
  switch (req.method) {
    case "POST":
      await createOrder(req, res);
      break;
    case "GET":
      await getOrder(req, res);
      break;
  }
};
const getOrder = async (req, res) => {
  try {
    const result =await auth(req, res);
    let orders;
    if (!result.isAdmin) {
      orders = await Orders.find({ user: result.id }).populate(
        "user",
        "-password"
      );
    } else {
      orders = await Orders.find().populate("user", "-password");
    }
    res.json({ orders });
  } catch (error) {
    return res.status(400).json({ err: error.message });
  }
};

const createOrder = async (req, res) => {
  try {
    const result = await auth(req, res);
    const { contactData, cart, total } = req.body;

    const newOrder = new Orders({
      user: result.id,
      contact: contactData,
      total: total,
      product: cart,
    });

    cart.filter((item) => {
      return sold(item._id, item.quantity, item.inStock, item.sold);
    });

    await newOrder.save();
    res.json({
      msg: "Order success, We will contact you to confirm the order",
      newOrder,
    });
  } catch (error) {
    return res.status(400).json({ err: error.message });
  }
};

const sold = async (id, quantity, oldInStock, oldSold) => {
  await Products.findOneAndUpdate(
    { _id: id },
    {
      inStock: oldInStock - quantity,
      sold: quantity + oldSold,
    }
  );
};
