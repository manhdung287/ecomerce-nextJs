import auth from "../../../middleware/auth";
import connectDB from "../../../untils/connectDB";
import Sizes from "../../../models/sizeModel";

connectDB();

export default async (req, res) => {
  switch (req.method) {
    case "POST":
      await createSize(req, res);
      break;
    case "GET":
      await getSize(req, res);
      break;
  }
};
const createSize = async (req, res) => {
  try {
    const result = await auth(req, res);
    if (!result.isAdmin)
      return res.status(400).json({ err: "Athentocation is not valid" });

    const { name } = req.body;
    if (!name) return res.status(400).json({ err: "Name not be blank" });
    const newCate = new Sizes({ name });
    await newCate.save();
    res.json({ msg: "Success! Created a new Size", newCate });
  } catch (error) {
    return res.status(400).json({ err: error.message });
  }
};

const getSize = async (req, res) => {
  try {
    const Sizes = await Sizes.find();

    res.json({ Sizes });
  } catch (error) {
    return res.status(400).json({ err: error.message });
  }
};
