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
}
