import { dbConnect } from "@/lib/mongoose";
import { UserProfile } from "@/models/userProfile";

export default async function handler(req, res) {
  if (req.method == "POST") {
    dbConnect();
    const {
      userId,
      userName,
      userEmail,
      userRole,
      mobileNumber,
      location,
      education,
      recentJob,
      linkedIn,
      profilePic,
    } = req.body;

    const userProfileDoc = await UserProfile.create({
      userId,
      userName,
      userEmail,
      userRole,
      mobileNumber,
      location,
      education,
      recentJob,
      linkedIn,
      profilePic,
    });

    return res.status(200).send({
      error: false,
      userProfile: userProfileDoc,
      message: "User Profile Updated successfully",
    });
  }
}
