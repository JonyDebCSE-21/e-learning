import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { RiDeleteBin6Line } from "react-icons/ri";

const CommentModal = ({
  openModal,
  setOpenModal,
  comments,
  setComments,
  handleDeleteComment,
}) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get("/api/user/user")
      .then((res) => setUsers(res.data.users))
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      {openModal.id && (
        <div
          onClick={(e) => {
            setOpenModal(false);
          }}
          className={`fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-40 transition-opacity duration-700 ease-in-out ${
            openModal.id ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}>
          <div
            onClick={(e) => e.stopPropagation()}
            className=" bg-[#F8F5FA] h-auto border-none rounded-[20px] py-4 px-6">
            {comments.length > 0 ? (
              comments.map((comment) => {
                return (
                  <div
                    key={comment._id}
                    className="flex justify-between space-x-5 my-3">
                    {users.map((user) => {
                      if (user._id == comment.userId) {
                        return (
                          <div
                            key={user._id}
                            className="flex space-x-4 items-center ">
                            <img
                              src={user.profilePic}
                              alt=""
                              className="w-10 h-10 rounded-full"
                            />
                            <div>
                              <p className="font-semibold">{user.name}</p>
                              <p>{comment.comment}</p>
                            </div>
                          </div>
                        );
                      }
                    })}
                    <button
                      onClick={() =>
                        handleDeleteComment(comment._id, openModal.id)
                      }
                      className="text-red-500">
                      <RiDeleteBin6Line />
                    </button>
                  </div>
                );
              })
            ) : (
              <p>No comment found</p>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default CommentModal;
