import auth from "../../../middleware/auth";
import connectDB from "../../../untils/connectDB";
import Sizes from "../../../models/sizeModel";

connectDB();

export default async (req, res) => {
  switch (req.method) {
    case "PUT":
      await updateSize(req, res);
      break;
    case "DELETE":
      await deleteSize(req, res);
      break;
  }
};
const updateSize = async (req, res) => {
  try {
    const result = await auth(req, res);
    if (!result.isAdmin) return res.status(400).json("Not Authentocation");
    const { id } = req.query;
    const { name } = req.body;
    const updateSize = await Sizes.findOneAndUpdate(
      { _id: id },
      { name }
    );

    res.json({
      msg: "Update Success",
      Size: {
        ...updateSize._doc,
        name,
      },
    });
  } catch (error) {
    if (error) return res.status(500).json({ err: error.msg });
  }
};
const deleteSize = async (req, res) => {
  try {
    const result = await auth(req, res);
    if (!result.isAdmin) return res.status(400).json("Not Authentocation");
    const { id } = req.query;
    await Sizes.findByIdAndDelete(id);
    res.json({ msg: `Delete a Size ` });
  } catch (error) {
    if (error) return res.status(500).json({ err: error.msg });
  }
};
