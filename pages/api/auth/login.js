import { dbConnect } from "@/lib/mongoose";
import { User } from "@/models/user";
import bcrypt from "bcrypt";

export default async function handler(req, res) {
  await dbConnect();
  if (req.method == "POST") {
    const { email, password } = req.body;
    if (email) {
      //   const seller = await Seller.findOne({ email });
      //   if (seller) {
      //     const userPassword = await bcrypt.compare(password, seller.password);
      //     if (userPassword)
      //       return res.status(200).send({
      //         error: false,
      //         shop: {
      //           _id: seller._id,
      //           name: seller.name,
      //           email: seller.email,
      //           shopName: seller.shopName,
      //           shopLocation: seller.shopLocation,
      //           shopCategory: seller.shopCategory,
      //           phone: seller.phone,
      //           coverPhoto: seller.coverPhoto,
      //           profilePhoto: seller.profilePhoto,
      //         },
      //         message: "Log in successfull",
      //       });
      //   }
      const user = await User.findOne({ email });
      if (user) {
        const userPassword = await bcrypt.compare(password, user.password);
        if (userPassword)
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
              recentJob: user.recentJob,
              linkedIn: user.linkedIn,
              profilePic: user.profilePic,
              friends: user.friends,
              friendRequestSent: user.friendRequestSent,
              friendRequestRecieved: user.friendRequestRecieved,
            },
            message: "Login successful",
          });
      }
      return res.status(400).send({ error: true, message: "User not found" });
    }
  }
}
