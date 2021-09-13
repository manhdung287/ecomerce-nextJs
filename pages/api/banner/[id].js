import auth from "../../../middleware/auth";
import connectDB from "../../../untils/connectDB";
import Categories from "../../../models/categoriesModel";

connectDB();

export default async (req, res) => {
  switch (req.method) {
    case "PUT":
      await updateCategory(req, res);
      break;
    case "DELETE":
      await deleteCategory(req, res);
      break;
  }
};
const updateCategory = async (req, res) => {
  try {
    const result = await auth(req, res);
    if (!result.isAdmin) return res.status(400).json("Not Authentocation");
    const { id } = req.query;
    const { name } = req.body;
    const updateCategory = await Categories.findOneAndUpdate(
      { _id: id },
      { name }
    );

    res.json({
      msg: "Update Success",
      category: {
        ...updateCategory._doc,
        name,
      },
    });
  } catch (error) {
    if (error) return res.status(500).json({ err: error.msg });
  }
};
const deleteCategory = async (req, res) => {
  try {
    const result = await auth(req, res);
    if (!result.isAdmin) return res.status(400).json("Not Authentocation");
    const { id } = req.query;
    await Categories.findByIdAndDelete(id);
    res.json({ msg: `Delete a Category ` });
  } catch (error) {
    if (error) return res.status(500).json({ err: error.msg });
  }
};
//NOTE