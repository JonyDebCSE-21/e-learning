import { dbConnect } from "@/lib/mongoose";
import { Course } from "@/models/course";

export default async function handler(req, res) {
  await dbConnect();

  if (req.method == "GET") {
    const { id } = req.query;
    if (id) {
      const course = await Course.findOne({ _id: id });

      return res.status(200).send({
        error: false,
        course: course,
      });
    } else {
      const courseDoc = await Course.find({});

      return res.status(200).send({
        error: false,
        course: courseDoc,
      });
    }
  }

  if (req?.method == "POST") {
    const { _id, opinion } = req.body;

    // console.log(_id, opinion);

    try {
      const course = await Course.findById({ _id });

      if (!course) {
        return res.status(404).send({ error: "course not found" });
      }

      course.opinions.push(opinion);
      await course.save();
      return res.status(200).send({
        error: false,
        course: course,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}
