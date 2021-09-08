import connectDB from "../../../untils/connectDB";
import Products from "../../../models/productModel";
import auth from "../../../middleware/auth";

connectDB();

export default async (req, res) => {
  switch (req.method) {
    case "GET":
      await getProductDetail(req, res);
      break;
    case "PUT":
      await updateProduct(req, res);
      break;
    case "DELETE":
      await deleteProduct(req, res);
      break;
  }
};

const getProductDetail = async (req, res) => {
  try {
    const { id } = req.query;

    const product = await Products.findById(id);

    if (!product) return res.status(500).json({ err: "Product not exits" });

    res.json({
      product,
    });
  } catch (error) {
    res.status(500).json({
      err: error.message,
    });
  }
};

const updateProduct = async (req, res) => {
  try {
    const result = await auth(req, res);
    if (!result.isAdmin)
      return res.status(400).json({ err: "Authentication not valid" });

    const { id } = req.query;
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
    if (
      !title ||
      !description ||
      !content ||
      category === "all" ||
      !price ||
      !price1 ||
      !inStock ||
      images.length === 0
    )
      return res.status(400).json({ err: "Please add all the fells" });

    await Products.findOneAndUpdate(
      { _id: id },
      {
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
      }
    );
    res.json({ msg: "Success! Update a product" });
  } catch (error) {
    res.status(500).json({ err: error.message });
  }
};

const deleteProduct = async(req,res)=>{
  try {
    const result = await auth(req,res);
    if(!result.isAdmin) return res.status(400).json({err:'Authotication not valid'})
    const {id} = req.query;
    await Products.findByIdAndDelete(id);
    res.json({msg: 'Delete a Product'})
  } catch (error) {
    res.status(500).json({ err: error.message });
  }
}