import { dbConnect } from "@/lib/mongoose";
import { Feedback } from "@/models/feedback";

export default async function handler(req, res) {
  await dbConnect();

  if (req?.method == "POST") {
    const { name, email, feedback, rating } = req.body;

    const feedbackDoc = await Feedback.create({
      name,
      email,
      feedback,
      rating,
    });

    return res.status(200).send({
      error: false,
      feedback: feedbackDoc,
    });
  }

  if (req?.method == "GET") {
    const feedbackDoc = await Feedback.find({});

    return res.status(200).send({
      error: false,
      feedbacks: feedbackDoc,
      message: "Thanks for your feedback",
    });
  }
}
