import connectDB from "../../../untils/connectDB";
import Order from "../../../models/orderModel";
import auth from "../../../middleware/auth";

connectDB();

export default async (req, res) => {
  switch (req.method) {
    case "GET":
      await getOrderDetail(req, res);
      break;
    case "PATCH":
      await paymentOrder(req, res);
      break;
  }
};
const getOrderDetail = async (req, res) => {
  try {
    const { id } = req.query;

    const order = await Order.findById(id);

    if (!order) return res.status(500).json({ err: "Order not Exits" });

    res.json({ order });
  } catch (error) {
    res.status(500).json({ err: error.message });
  }
};
const paymentOrder = async (req, res) => {
  try {
    const { id } = req.query;

    const result = await auth(req, res);

    await Order.findOneAndUpdate(
      { _id: id },
      {
        paid: true,
        dayPayment: new Date().toISOString()
      }
    );
    res.json({ msg: "PaymentSuccess" });
  } catch (error) {
    res.status(500).json({ err: error.message });
  }
};
