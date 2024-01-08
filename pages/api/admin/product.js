import { dbConnect } from "@/lib/mongoose";
import { Product } from "@/models/product";

export default async function handler(req, res) {
  await dbConnect();

  if (req.method == "POST") {
    const { title, description, price, image, quantity } = req.body;
    const product = await Product.create({
      title,
      description,
      price,
      image,
      quantity,
    });
    return res.status(200).send({
      error: false,
      product: product,
      message: "Product added successfully",
    });
  }
  if (req.method == "PUT") {
    const { title, description, price, image, _id } = req.body;
    const updatedProduct = await Product.updateOne(
      { _id },
      {
        title,
        description,
        price,
        image,
      }
    );
    const product = await Product.findOne({ _id });
    return res.status(200).send({
      error: false,
      product: product,
      message: "Product Updated successfully",
    });
  }
  if (req.method == "DELETE") {
    const { id } = req.query;
    const product = await Product.deleteOne({ _id: id });
    return res.status(200).send({
      error: false,
      message: "Product Deleted Successful",
    });
  }
}
