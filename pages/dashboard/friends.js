import DashboardLayout from "@/components/layout/DashboardLayout";
import { setUser } from "@/redux/slice/userSlice/userSlice";
import axios from "axios";
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
    // const user = localStorage.getItem("user");
    // console.log(user);
    // if (user) {
    //   axios.get(`/api/user/user?id=${user._id}`).then((res) => {
    //     dispatch(setUser(res.data.user));
    //   });
    // }
    const fetchData = async () => {
      axios.get(`/api/user/user?id=${user._id}`).then((res) => {
        dispatch(setUser(res.data.user));
      });
    };
    // if (user) {
    //   setInterval(function () {
    //     axios.get(`/api/user/user?id=${user._id}`).then((res) => {
    //       dispatch(setUser(res.data.user));
    //     });
    //   }, 5000);
    // }
    let intervalId;
    if (user) {
      fetchData();
    }
    intervalId = setInterval(fetchData, 10000);
    return () => clearInterval(intervalId);

    // Clean up the interval when the component unmounts
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
            <p>Friends</p>
            <div>{user?.friends?.length === 0 && <p>No friends</p>}</div>
            <div>
              {user?.friends?.map((friend) => {
                return users.map((user) => {
                  if (user._id == friend) {
                    return (
                      <p key={user._id} className="font-semibold">
                        {user.name}
                      </p>
                    );
                  }
                });
              })}
            </div>
          </div>
          <p>Friend Request</p>
          <div>
            {user?.friendRequestRecieved?.length === 0 && <p>No request</p>}
            {user?.friendRequestRecieved?.map((req) => {
              return users?.map((singleUser) => {
                if (singleUser._id == req) {
                  return (
                    <div className="w-full flex justify-between bg-gray-200 p-3 rounded-lg">
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
          <p>Suggested Friends</p>
          {users.map((singleUser) => {
            return (
              <>
                {singleUser._id !== user._id && (
                  <div
                    key={singleUser._id}
                    className="bg-gray-200 p-3 rounded-lg w-full flex justify-between mb-2">
                    <h2 className="text-xl font-bold">{singleUser.name}</h2>
                    {!user?.friendRequestSent?.includes(singleUser._id) ? (
                      <button
                        onClick={() => handleAddFriend(singleUser._id)}
                        className="bg-green-400 p-2 rounded-lg">
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
              </>
            );
          })}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Friends;
