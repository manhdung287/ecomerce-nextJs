import connectDB from "../../../../untils/connectDB";
import Order from "../../../../models/orderModel";
import auth from "../../../../middleware/auth";

connectDB();

export default async (req, res) => {
  switch (req.method) {
    case "PATCH":
      await Delivered(req, res);
      break;
  }
};

const Delivered = async (req, res) => {
  try {
    const { id } = req.query;

    const result = await auth(req, res);

    await Order.findOneAndUpdate(
      { _id: id },
      {
        delivered: true,
      }
    );
    res.json({ msg: "Delivered Success" });
  } catch (error) {
    res.status(500).json({ err: error.message });
  }
};
