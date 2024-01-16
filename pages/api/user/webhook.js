// server.js
//
// Use this sample code to handle webhook events in your integration.
//
// 1) Paste this code into a new file (server.js)
//
// 2) Install dependencies
//   npm install stripe
//   npm install express
//
// 3) Run the server on http://localhost:4242
//   node server.js

// The library needs to be configured with your account's secret key.
// Ensure the key is kept out of any version control system you might be using.
import { dbConnect } from "@/lib/mongoose";
import { Cart } from "@/models/cart";
import { Order } from "@/models/order";
import { buffer } from "micro";
const stripe = require("stripe")(process.env.STRIPE_API_KEY);

// This is your Stripe CLI webhook secret for testing your endpoint locally.
// const endpointSecret =
//   "whsec_2e9640b4df87e26b0b14e3ac4718ade9fd243f68f6e2b159b27b685b182e7235";

const endpointSecret = "whsec_U6UJW3GdrrYpTlP8dZ7qiayiSgRm3deD";

export default async function handler(req, res) {
  await dbConnect();

  const sig = req.headers["stripe-signature"];

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      await buffer(req),
      sig,
      endpointSecret
    );
  } catch (err) {
    res.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  // Handle the event
  switch (event.type) {
    case "checkout.session.completed":
      const data = event.data.object;
      const orderId = data.metadata.orderId;
      const cartId = data.metadata.cartId;
      const paid = data.payment_status === "paid";
      if (orderId && paid) {
        await Order.findByIdAndUpdate(orderId, {
          paid: true,
        });
        await Cart.deleteOne({ _id: cartId });
      }
      break;

    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.status(200).send("ok");
}

export const config = {
  api: { bodyParser: false },
};
