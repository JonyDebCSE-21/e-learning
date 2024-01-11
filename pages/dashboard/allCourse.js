import DashboardLayout from "@/components/layout/DashboardLayout";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const allCourse = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    axios.get("/api/user/course").then((res) => setCourses(res.data.course));
  }, []);

  const handleDelete = (id) => {
    axios
      .delete(`/api/admin/course?id=${id}`)
      .then((res) => {
        const restCourse = courses.filter((p) => p._id != id);
        setCourses(restCourse);
      })
      .catch((err) => console.log(err));
  };

  return (
    <DashboardLayout>
      <div>
        <h1 className="text-2xl text-[#D700E2] font-semibold mb-3 border-b border-[#A5009B] pb-4">
          All Course
        </h1>
        <table className="w-full text-sm text-left rtl:text-right text-white dark:text-gray-400">
          <thead className="textarea-xl sticky top-0 text-white uppercase bg-[#1F82BA] dark:bg-blue-600 dark:text-white">
            <tr>
              <th scope="col" className="px-6 py-3 text-center">
                Photo
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Title
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Price
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Intructor
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Details
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course) => (
              <tr
                key={course._id}
                className="bg-[#1D0D41] border-b dark:bg-gray-800 dark:border-gray-700">
                <td className="px-6 py-4 text-xl font-semibold text-center">
                  <img
                    src={course?.thumbnail}
                    alt={course?.title}
                    className="w-[80px] h-[80px] rounded-full"
                  />
                </td>
                <td className="px-6 py-4 text-xl font-semibold text-center">
                  {course?.title}
                </td>
                <td className="px-6 py-4 text-xl font-semibold text-center">
                  {course?.price}
                </td>
                <td className="px-6 py-4 text-xl font-semibold text-center">
                  {course?.instructor}
                </td>
                <td className="px-6 py-4 text-xl font-semibold text-center">
                  {course?.details}
                </td>
                <td>
                  <div className="flex gap-4 px-2">
                    <Link
                      href={`/dashboard/editCourse/${course._id}`}
                      className="bg-green-500 p-2 rounded-lg text-black">
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(course._id)}
                      className="bg-red-500 p-2 rounded-lg text-black">
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
};

export default allCourse;
