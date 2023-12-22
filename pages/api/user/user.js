import { dbConnect } from "@/lib/mongoose";
import { User } from "@/models/user";

export default async function handler(req, res) {
  if (req.method == "PUT") {
    dbConnect();
    const {
      userId,
      mobileNumber,
      location,
      education,
      recentJob,
      linkedIn,
      profilePic,
    } = req.body;

    const userProfileDoc = await User.updateOne(
      { _id: userId },
      {
        mobileNumber,
        location,
        education,
        recentJob,
        linkedIn,
        profilePic,
      }
    );

    const user = await User.findOne({ _id: userId });

    return res.status(200).send({
      error: false,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        mobileNumber: user.mobileNumber,
        location: user.location,
        education: user.education,
        recentJod: user.recentJob,
        linkedIn: user.linkedIn,
        profilePic: user.profilePic,
      },
      message: "User Profile Updated successfully",
    });
  }

  if (req?.method == "GET") {
    const { userEmail } = req.query;

    const UserDoc = await User.findOne({ email });

    return res.status(200).send({
      error: false,
      user: UserDoc,
    });
  }
}
