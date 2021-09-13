import auth from "../../../middleware/auth";
import connectDB from "../../../untils/connectDB";
import Categories from "../../../models/categoriesModel";

connectDB();

export default async (req, res) => {
  switch (req.method) {
    case "POST":
      await createCategory(req, res);
      break;
    case "GET":
      await getCategory(req, res);
      break;
  }
};
const createCategory = async (req, res) => {
  try {
    const result = await auth(req, res);
    if (!result.isAdmin)
      return res.status(400).json({ err: "Athentocation is not valid" });

    const { name } = req.body;
    if (!name) return res.status(400).json({ err: "Name not be blank" });
    const newCate = new Categories({ name });
    await newCate.save();
    res.json({ msg: "Success! Created a new category", newCate });
  } catch (error) {
    return res.status(400).json({ err: error.message });
  }
};

const getCategory = async (req, res) => {
  try {
    const categories = await Categories.find();

    res.json({ categories });
  } catch (error) {
    return res.status(400).json({ err: error.message });
  }
};
//NOTE