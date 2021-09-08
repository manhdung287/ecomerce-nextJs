import auth from "../../../../middleware/auth";
import connectDB from "../../../../untils/connectDB";
import Users from '../../../../models/userModel';

connectDB();

export default async (req, res) => {
  switch (req.method) {
    case "PATCH":
      await editUser(req, res);
      break;
  }
};
const editUser = async (req, res) => {
  try {
    const result = await auth(req, res);

    const { checkAdmin, checkContent, checkManager } = req.body;
    
    const newUser = await Users.findOneAndUpdate(
      { _id: result.id },
      {
        isAdmin: checkAdmin,
        isContent: checkContent,
        isManager: checkManager,
      }
    );
    
    res.json({ msg: "Update Role Success",user:newUser });
  } catch (error) {
    return res.status(500).json({ err: error.msg });
  }
};
