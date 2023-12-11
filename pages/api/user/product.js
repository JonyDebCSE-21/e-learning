import { dbConnect } from "@/lib/mongoose";
import { Product } from "@/models/product";

export default async function handler(req, res) {
  await dbConnect();

  if (req.method == "GET") {
    const products = await Product.find({});

    return res.status(200).send({
      error: false,
      products: products,
    });
  }
}
