import { dbConnect } from "@/lib/mongoose";
import { Classroom } from "@/models/classroom";

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === "GET") {
    const { id, albumId } = req.query;
    if (albumId) {
      const album = await Classroom.findOne({ _id: albumId });
      return res.status(200).send({
        error: false,
        album,
      });
    } else {
      const classroom = await Classroom.find({ userId: id });
      if (classroom.length === 0) {
        return res.status(200).send({
          error: false,
          classroom: [],
        });
      }
      return res.status(200).send({
        error: false,
        classroom: classroom,
      });
    }
  }

  if (req.method === "POST") {
    const { userId, albumName, images, videos, notes } = req.body;
    const album = await Classroom.create({
      userId,
      albumName,
      images,
      videos,
      notes,
    });
    return res.status(200).send({
      error: false,
      album: album,
      message: "Album created successfully",
    });
  }
}
