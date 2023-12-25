import { dbConnect } from "@/lib/mongoose";
import { User } from "@/models/user";
import bcrypt from "bcrypt";

export default async function handler(req, res) {
  await dbConnect();
  if (req.method == "POST") {
    const { name, email, password, role } = req.body;
    if (email) {
      const user = await User.findOne({ email });
      if (user) {
        return res.status(400).send({ error: "User already exists" });
      }
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const userDoc = await User.create({
      name,
      email,
      password: hashedPassword,
      mobileNumber: "",
      location: "",
      education: "",
      recentJob: "",
      linkedIn: "",
      profilePic: "",
      friends: [],
      friendRequestSent: [],
      friendRequestRecieved: [],
    });
    res.status(200).send({
      error: false,
      user: {
        _id: userDoc._id,
        name: userDoc.name,
        email: userDoc.email,
        role: userDoc.role,
        mobileNumber: userDoc.mobileNumber,
        location: userDoc.location,
        education: userDoc.education,
        recentJob: userDoc.recentJob,
        linkedIn: userDoc.linkedIn,
        profilePic: userDoc.profilePic,
        friends: userDoc.friends,
        friendRequestSent: userDoc.friendRequests,
        friendRequestRecieved: userDoc.friendRequestRecieved,
      },
      message: "User created successfully",
    });
  }
}
