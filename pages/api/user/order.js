import { dbConnect } from "@/lib/mongoose";
import { Course } from "@/models/course";
import { Order } from "@/models/order";
import { Product } from "@/models/product";

const stripe = require("stripe")(process.env.STRIPE_API_KEY);

export default async function handler(req, res) {
  await dbConnect();

  if (req.method == "GET") {
    const email = req.query.email;
    const course = req.query.course;
    const product = req.query.product;
    if (email) {
      const orders = await Order.find({ email: email });
      if (orders.length == 0) {
        return res.status(200).send({
          error: false,
          orders: [],
        });
      }
      if (course) {
        const courses = await Course.find({});
        const lineItems = [];
        orders.map((order) => {
          const item = order.line_items;
          lineItems.push(...item);
        });
        let userCourse = [];
        lineItems.map((item) => {
          const itemId = item.price_data.product_data.name;
          const course = courses.find((course) => course._id == itemId);
          courses.map((item) => {
            if (item._id == itemId) {
              userCourse.push(course);
            }
          });
        });

        return res.status(200).send({
          error: false,
          orders: userCourse,
        });
      } else if (product) {
        const products = await Product.find({});
        const lineItems = [];
        orders.map((order) => {
          const item = order.line_items;
          lineItems.push(...item);
        });
        let userProduct = [];
        lineItems.map((item) => {
          const itemId = item.price_data.product_data.name;
          products.map((p) => {
            if (p._id == itemId) {
              userProduct.push({
                _id: p._id,
                quantity: item.quantity,
                title: p.title,
                description: p.description,
                image: p.image,
                price: p.price * item.quantity,
                opinions: p.opinions,
              });
            }
          });
        });

        return res.status(200).send({
          error: false,
          orders: userProduct,
        });
      }
    }
    // const courseDoc = await Order.find({});

    // return res.status(200).send({
    //   error: false,
    //   course: courseDoc,
    // });
  }

  if (req.method == "POST") {
    const { name, email, city, postalCode, streetAddress, phone, cart } =
      req.body;
    const line_items = [];
    // const courseDoc = await Course.create({ title, description, price, image });
    cart.productList.map((item) => {
      const tempObj = {
        quantity: item.quantity,
        price_data: {
          currency: "USD",
          product_data: { name: item._id },
          unit_amount: (item.price / item.quantity) * 100,
        },
      };
      line_items.push(tempObj);
    });
    cart.courseList.map((item) => {
      const tempObj = {
        quantity: item.quantity,
        price_data: {
          currency: "USD",
          product_data: { name: item._id },
          unit_amount: (item.price / item.quantity) * 100,
        },
      };
      line_items.push(tempObj);
    });

    const orderDoc = await Order.create({
      line_items,
      name,
      email,
      city,
      postalCode,
      streetAddress,
      phone,
      paid: false,
    });

    const session = await stripe.checkout.sessions.create({
      line_items,
      mode: "payment",
      customer_email: email,
      success_url: process.env.PUBLIC_URL + "/cart?success=1",
      cancel_url: process.env.PUBLIC_URL + "/cart?canceled=1",
      metadata: {
        orderId: orderDoc._id.toString(),
        test: "ok",
        cartId: cart._id,
      },
    });
    return res.status(200).send({
      error: false,
      url: session.url,
    });
  }
}
