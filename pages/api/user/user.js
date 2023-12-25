import { dbConnect } from "@/lib/mongoose";
import { User } from "@/models/user";

export default async function handler(req, res) {
  dbConnect();
  if (req.method == "PUT") {
    const {
      userId,
      mobileNumber,
      location,
      education,
      recentJob,
      linkedIn,
      profilePic,
      reqSentId,
      reqConfirmId,
      reqConfirm,
    } = req.body;
    if (!reqSentId && !reqConfirmId) {
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
    } else {
      if (reqSentId) {
        const user = await User.findOne({ _id: userId });
        const recivedUser = await User.findOne({ _id: reqSentId });
        const reqExists = user.friendRequestSent.find(
          (req) => reqSentId == req
        );
        const req = user.friendRequestSent;
        if (reqExists) {
          const restReq = req.filter((req) => req != reqSentId);
          const restRecivedReq = recivedUser.friendRequestRecieved.filter(
            (req) => req != userId
          );
          const friendReq = await User.findByIdAndUpdate(
            { _id: userId },
            { friendRequestSent: [...restReq] }
          );
          await User.findByIdAndUpdate(
            { _id: reqSentId },
            { friendRequestRecieved: [...restRecivedReq] }
          );
        } else {
          const friendReq = await User.findByIdAndUpdate(
            { _id: userId },
            { friendRequestSent: [...user.friendRequestSent, reqSentId] }
          );
          await User.findByIdAndUpdate(
            { _id: reqSentId },
            { friendRequestRecieved: [...user.friendRequestRecieved, userId] }
          );
        }
      } else if (reqConfirmId) {
        const user = await User.findOne({ _id: userId });
        const confirmUser = await User.findOne({ _id: reqConfirmId });
        const requests = user.friendRequestRecieved.filter(
          (req) => req != reqConfirmId
        );
        const sentReq = confirmUser.friendRequestSent.filter(
          (req) => req != userId
        );
        if (reqConfirm) {
          await User.findByIdAndUpdate(
            { _id: userId },
            {
              friends: [...user.friends, reqConfirmId],
              friendRequestRecieved: [...requests],
            }
          );
          await User.findByIdAndUpdate(
            { _id: reqConfirmId },
            {
              friends: [...confirmUser.friends, userId],
              friendRequestSent: [...sentReq],
            }
          );
        } else {
          await User.findByIdAndUpdate(
            { _id: userId },
            {
              friendRequestRecieved: [...requests],
            }
          );
          await User.findByIdAndUpdate(
            { _id: reqConfirmId },
            {
              friendRequestSent: [...sentReq],
            }
          );
        }
      }
    }
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
        recentJob: user.recentJob,
        linkedIn: user.linkedIn,
        profilePic: user.profilePic,
        friends: user.friends,
        friendRequestSent: user.friendRequestSent,
        friendRequestRecieved: user.friendRequestRecieved,
      },
      message: "User Profile Updated successfully",
    });
  }

  if (req?.method == "GET") {
    const { id } = req.query;
    if (id) {
      const user = await User.findOne({ _id: id });
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
      });
    }
    const users = await User.find({});

    return res.status(200).send({
      error: false,
      users,
    });
  }
}
