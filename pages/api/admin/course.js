import { dbConnect } from "@/lib/mongoose";
import { Course } from "@/models/course";

export default async function handler(req, res) {
  await dbConnect();

  if (req.method == "POST") {
    console.log("api hit");
    const { title, duration, thumbnail, instructor, price, details, video } =
      req.body;
    const courseDoc = await Course.create({
      title,
      duration,
      thumbnail,
      instructor,
      price,
      details,
      video,
    });
    return res.status(200).send({
      error: false,
      course: courseDoc,
      message: "Course created successfully",
    });
  }
}
