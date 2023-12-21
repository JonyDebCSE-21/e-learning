// import { dbConnect } from "@/lib/mongoose";

// export default async function handler(req, res) {
//   dbConnect();
//   if (req.method == "POST") {
//     const {
//       userId,
//       userName,
//       userEmail,
//       userRole,
//       mobileNumber,
//       location,
//       education,
//       recentJob,
//       linkedIn,
//       profilePic,
//     } = req.body;

//     const userProfileDoc = await UserProfile.create({
//       userId,
//       userName,
//       userEmail,
//       userRole,
//       mobileNumber,
//       location,
//       education,
//       recentJob,
//       linkedIn,
//       profilePic,
//     });

//     return res.status(200).send({
//       error: false,
//       userProfile: userProfileDoc,
//       message: "User Profile Updated successfully",
//     });
//   }

//   if (req?.method == "GET") {
//     const { userEmail } = req.query;

//     const UserDoc = await UserProfile.findOne({ userEmail });

//     return res.status(200).send({
//       error: false,
//       user: UserDoc,
//     });
//   }

//   if (req?.method == "PUT") {
//     const { userEmail, posts } = req.body;

//     console.log(userEmail, posts, "from server");

//     // const updateUserDoc = await UserProfile.updateOne({ userEmail }, { posts });

//     // return res.status(200).send({
//     //   error: false,
//     //   user: updateUserDoc,
//     // });
//   }
// }
