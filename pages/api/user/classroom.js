import { dbConnect } from "@/lib/mongoose";
import { Classroom } from "@/models/classroom";

export default async function handler(req, res) {
  await dbConnect();
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
