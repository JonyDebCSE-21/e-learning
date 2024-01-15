import { dbConnect } from "@/lib/mongoose";
import { Event } from "@/models/event";

export default async function handler(req, res) {
  const { method } = req;
  await dbConnect();

  if (method === "POST") {
    const { title, date, image, description } = req.body;

    const eventDoc = await Event.create({
      title,
      date,
      image,
      description,
    });

    return res.status(200).send({
      error: false,
      message: "Event created successfully",
    });
  }

  if (method === "GET") {
    const eventDoc = await Event.find({});

    return res.status(200).send({
      error: false,
      events: eventDoc,
    });
  }

  if (method === "PUT") {
    const { id, userId } = req.body;

    const event = await Event.findOne({ _id: id });
    const alreadyInterested = event.interested.includes(userId);
    if (alreadyInterested) {
      const restInterested = event.interested.filter((item) => item !== userId);
      const updatedEvent = await Event.updateOne(
        { _id: id },
        { interested: [...restInterested] }
      );
    } else {
      const updatedEvent = await Event.updateOne(
        { _id: id },
        {
          interested: [...event.interested, userId],
        }
      );
    }

    // updatedEvent.save();
    // console.log(updatedEvent);

    return res.status(200).send({
      error: false,
      message: "Evenet updated successfully",
    });
  }

  if (method === "DELETE") {
    const { id } = req.query;

    // console.log(id);

    const deletedEvent = await Event.deleteOne({ _id: id });

    return res.status(200).send({
      message: "Deleted suucessfully",
    });
  }
}
