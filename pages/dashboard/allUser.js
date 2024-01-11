import DashboardLayout from "@/components/layout/DashboardLayout";
import axios from "axios";
import React, { useEffect, useState } from "react";

const AllUser = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get("/api/user/user")
      .then((res) => {
        setUsers(res.data.users);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <DashboardLayout>
      <div>
        <h1 className="text-2xl text-[#D700E2] font-semibold mb-3 border-b border-[#A5009B] pb-4">
          All User
        </h1>
        <table className="w-full text-sm text-left rtl:text-right text-white dark:text-gray-400">
          <thead className="textarea-xl sticky top-0 text-white uppercase bg-[#1F82BA] dark:bg-blue-600 dark:text-white">
            <tr>
              <th scope="col" className="px-6 py-3 text-center">
                Photo
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Name
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Email
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Location
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Phone
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr
                key={user._id}
                className="bg-[#1D0D41] border-b dark:bg-gray-800 dark:border-gray-700">
                <td className="px-6 py-4 text-xl font-semibold text-center">
                  <img
                    src={
                      user?.profilePic ? user.profilePic : "/images/user.png"
                    }
                    alt={user?.name}
                    className="w-[80px] h-[80px] rounded-full"
                  />
                </td>
                <td className="px-6 py-4 text-xl font-semibold text-center">
                  {user?.name}
                </td>
                <td className="px-6 py-4 text-xl font-semibold text-center">
                  {user?.email}
                </td>
                <td className="px-6 py-4 text-xl font-semibold text-center">
                  {user?.location}
                </td>
                <td>{user?.mobileNumber}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
};

export default AllUser;
