import connectDB from "../../../untils/connectDB";
import Products from "../../../models/productModel";
import auth from "../../../middleware/auth";

connectDB();

export default async (req, res) => {
  switch (req.method) {
    case "GET":
      await getProducts(req, res);
      break;
    case "POST":
      await createProduct(req, res);
      break;
  }
};

const getProducts = async (req, res) => {
  try {
    const products = await Products.find();

    res.json({
      status: "success",
      result: products.length,
      products,
    });
  } catch (error) {
    res.status(500).json({
      err: error.message,
    });
  }
};

const createProduct = async (req, res) => {
  try {
    const result = auth(req, res);
    if (result.isAdmin)
     { return res.status(400).json({ err: "Authentocation is not valid" })};

    const {
      title,
      description,
      content,
      size,
      category,
      price,
      price1,
      sold,
      inStock,
      images,
    } = req.body;

    const newProduct = new Products({
      title:title.toLowerCase(),
      description,
      content,
      size,
      category,
      price,
      price1,
      sold,
      inStock,
      images,
    });

    await newProduct.save();

    res.json({
      msg: "Crete Success",
    });
  } catch (error) {
    res.status(500).json({ err: error.message });
  }
};
