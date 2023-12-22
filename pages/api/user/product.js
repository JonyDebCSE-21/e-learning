import { dbConnect } from "@/lib/mongoose";
import { Product } from "@/models/product";

export default async function handler(req, res) {
  await dbConnect();

  if (req.method == "GET") {
    const { id } = req.query;
    if (id) {
      const product = await Product.findOne({ _id: id });

      console.log(product);
      return res.status(200).send({
        error: false,
        product: product,
      });
    } else {
      const products = await Product.find({});

      return res.status(200).send({
        error: false,
        products: products,
      });
    }
  }

  if (req?.method == "POST") {
    const { _id, opinion } = req.body;

    const product = await Product.findById({ _id });

    product.reviews.push(opinion);
    await product.save();
    return res.status(200).send({
      error: false,
      product: product,
    });
  }
}
