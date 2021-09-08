import auth from "../../../middleware/auth";
import Users from "../../../models/userModel";
import connectDB from "../../../untils/connectDB";
import bcrypt from "bcrypt";

connectDB();

export default async (req, res) => {
  switch (req.method) {
    case "PATCH":
      await resetPassword(req, res);
      break;
  }
};
const resetPassword = async (req, res) => {
  try {
    const result = await auth(req, res);
    const { password } = req.body;
    const passHash = await bcrypt.hash(password, 12);
    await Users.findOneAndUpdate({ _id: result.id }, { password: passHash });
    res.json({ msg: "Update success!" });
  } catch (error) {
    return res.status(500).json({ err: error.message });
  }
};
