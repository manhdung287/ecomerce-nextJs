import auth from "../../../middleware/auth";
import Users from "../../../models/userModel";
import connectDB from "../../../untils/connectDB";
import bcrypt from "bcrypt";

connectDB();

export default async (req, res) => {
  switch (req.method) {
    case "PATCH":
      await updateInformation(req, res);
      break;
    case "GET":
      await getUsers(req, res);
      break;
  }
};
const getUsers = async (req, res) => {
    try {
      const result = await auth(req, res);
      
      if(!result.isAdmin) return res.status(400).json({err:"Athentication is not valid"});

      const users =await Users.find().select("-password");
      res.json({ users });
      
    } catch (error) {
      return res.status(500).json({ err: error.message });
    }
  };
  

const updateInformation = async (req, res) => {
  try {
    const result = await auth(req, res);
    const { name, avartar } = req.body;
    console.log(req.body)
    const newUser = await Users.findOneAndUpdate(
      { _id: result.id },
      { name, avartar }
    ).select("-password");

    res.json({
      msg: "Update success",
      user: newUser,
    });
  } catch (error) {
    return res.status(500).json({ err: error.message });
  }
};
