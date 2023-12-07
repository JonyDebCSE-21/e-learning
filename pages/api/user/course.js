import { dbConnect } from "@/lib/mongoose";
import { Course } from "@/models/course";

export default async function handler(req, res) {
  await dbConnect();

  if (req.method == "GET") {
    const courseDoc = await Course.find({});

    return res.status(200).send({
      error: false,
      course: courseDoc,
    });
  }
}
