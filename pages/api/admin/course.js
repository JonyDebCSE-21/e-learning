import { dbConnect } from "@/lib/mongoose";
import { Course } from "@/models/course";

export default async function handler(req, res) {
  await dbConnect();

  if (req.method == "POST") {
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
  if (req.method == "PUT") {
    const {
      _id,
      title,
      duration,
      thumbnail,
      instructor,
      price,
      details,
      video,
    } = req.body;
    const updatedCourse = await Course.updateOne(
      { _id },
      {
        title,
        duration,
        thumbnail,
        instructor,
        price,
        details,
        video,
      }
    );
    const course = await Course.findOne({ _id });
    return res.status(200).send({
      error: false,
      course,
      message: "Course Updated successfully",
    });
  }

  if (req.method == "DELETE") {
    const { id } = req.query;
    const course = await Course.deleteOne({ _id: id });
    return res.status(200).send({
      error: false,
      message: "Course Deleted Successful",
    });
  }
}
