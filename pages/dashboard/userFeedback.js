import DashboardLayout from "@/components/layout/DashboardLayout";
import axios from "axios";
import React, { useEffect, useState } from "react";

const userFeedback = () => {
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    axios
      .get("/api/user/feedback")
      .then((res) => setFeedbacks(res.data.feedbacks));
  }, []);
  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold ">Users Experiences:</h1>
      <div className="relative overflow-x-auto max-h-screen overflow-y-auto mt-5">
        <table className="w-full text-sm text-left rtl:text-right text-white dark:text-gray-400">
          <thead className="text-xs sticky top-0 text-white uppercase bg-[#1F82BA] dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3 text-center">
                User Name
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                User Email
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Feedback
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Rating
              </th>
            </tr>
          </thead>
          <tbody>
            {feedbacks.map((feedback) => (
              <tr
                key={feedback._id}
                className="bg-[#1D0D41] border-b dark:bg-gray-800 dark:border-gray-700">
                <td className="px-6 py-4 text-xl font-semibold text-center">
                  {feedback.name}
                </td>
                <td className="px-6 py-4 text-xl font-semibold text-center">
                  {feedback.email}
                </td>
                <td className="px-6 py-4 text-xl font-semibold text-center">
                  {feedback.feedback}
                </td>
                <td className="px-6 py-4 text-xl font-semibold text-center">
                  {feedback.rating}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
};

export default userFeedback;
