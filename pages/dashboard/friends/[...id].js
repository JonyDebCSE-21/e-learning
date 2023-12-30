import DashboardLayout from "@/components/layout/DashboardLayout";
import { setUser } from "@/redux/slice/userSlice/userSlice";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Friends = () => {
  const [users, setUsers] = useState([]);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userReducer.user);
  useEffect(() => {
    axios
      .get("/api/user/user")
      .then((res) => setUsers(res.data.users))
      .catch((err) => console.log(err));
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      axios
        .get(
          `/api/user/user?id=${
            window.location.href.split("/")[
              window.location.href.split("/").length - 1
            ]
          }`
        )
        .then((res) => {
          localStorage.setItem("user", JSON.stringify(res.data.user));
          dispatch(setUser(res.data.user));
        })
        .catch((err) => console.log(err));
    };
    fetchData();
    const intervalId = setInterval(fetchData, 10000);
    return () => clearInterval(intervalId);
  }, []);

  const handleAddFriend = (id) => {
    axios
      .put("/api/user/user", { userId: user._id, reqSentId: id })
      .then((res) => {
        localStorage.setItem("user", JSON.stringify(res.data.user));
        dispatch(setUser(res.data.user));
      })
      .catch((err) => console.log(err));
  };

  const handleFriendRequest = (id, reqConfirm) => {
    axios
      .put("/api/user/user", {
        userId: user._id,
        reqConfirmId: id,
        reqConfirm: reqConfirm,
      })
      .then((res) => {
        localStorage.setItem("user", JSON.stringify(res.data.user));
        dispatch(setUser(res.data.user));
      })
      .catch((err) => console.log(err));
  };

  return (
    <DashboardLayout>
      <div className="px-3 w-full">
        <div>
          <div>
            <p className="text-[#A300B0] text-2xl my-2">Friends</p>
            <div>
              {user?.friends?.length === 0 && (
                <p className="text-white">No friends</p>
              )}
            </div>
            <div>
              {user?.friends?.map((friend) => {
                return users.map((user) => {
                  if (user._id == friend) {
                    return (
                      <div className="flex justify-between items-center  px-2 py-2 rounded-md my-3 border border-[#A5009B]">
                        <p key={user._id} className="font-semibold text-white">
                          {user.name}
                        </p>
                        <Link
                          href={`/Classroom/friendClassroom/${friend}`}
                          className="bg-green-400 p-2 rounded-lg">
                          Classroom
                        </Link>
                      </div>
                    );
                  }
                });
              })}
            </div>
          </div>
          <p className="text-[#A300B0] text-2xl my-2">Friend Request</p>
          <div>
            {user?.friendRequestRecieved?.length === 0 && (
              <p className="text-white">No request</p>
            )}
            {user?.friendRequestRecieved?.map((req) => {
              return users?.map((singleUser) => {
                if (singleUser._id == req) {
                  return (
                    <div className="w-full flex justify-between border border-[#A5009B]  p-2 text-white rounded-lg">
                      <p>{singleUser.name}</p>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleFriendRequest(req, true)}
                          className="bg-green-400 p-2 rounded-lg">
                          Confirm
                        </button>
                        <button
                          onClick={() => handleFriendRequest(req, false)}
                          className="bg-red-500 p-2 rounded-lg">
                          Cancel
                        </button>
                      </div>
                    </div>
                  );
                }
              });
            })}
          </div>
        </div>
        <div>
          <p className="text-[#A300B0] text-2xl my-2">Suggested Friends</p>
          {users.map((singleUser) => {
            return (
              <div className="flex  gap-2">
                {!user?.friends?.includes(singleUser._id) &&
                  !user?.friendRequestRecieved?.includes(singleUser._id) &&
                  singleUser._id !== user._id && (
                    <div
                      key={singleUser._id}
                      // className="cursor-pointer flex flex-col gap-2 border border-[#A5009B] px-5 py-2 text-white rounded-md font-semibold"
                      className="text-white w-full p-3 rounded-lg flex justify-between mb-2 border border-[#A5009B]">
                      <h2 className="text-xl font-bold">{singleUser.name}</h2>
                      {!user?.friendRequestSent?.includes(singleUser._id) ? (
                        <button
                          onClick={() => handleAddFriend(singleUser._id)}
                          className="bg-green-400 text-black p-2 rounded-lg">
                          Add Friend
                        </button>
                      ) : (
                        <button
                          onClick={() => handleAddFriend(singleUser._id)}
                          className="bg-red-500 p-2 rounded-lg">
                          Cancel Request
                        </button>
                      )}
                    </div>
                  )}
              </div>
            );
          })}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Friends;
