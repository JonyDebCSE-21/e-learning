import DashboardLayout from "@/components/layout/DashboardLayout";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const YourCoursesPage = () => {
  const [yourCourses, setYourCourses] = useState([]);
  const user = useSelector((state) => state.userReducer.user);

  useEffect(() => {
    if (user) {
      axios
        .get(`/api/user/order?email=${user.email}&&course=true`)
        .then((res) => {
          setYourCourses(res.data.courses);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [user]);

  return (
    <DashboardLayout>
      <h1 className="text-2xl text-[#D700E2] font-semibold mb-3 border-b border-[#A5009B] pb-4">
        Welcome {user?.name} , Ready For Your Next Lesson?
      </h1>

      <div className="flex flex-col gap-10 my-5">
        {yourCourses.map((c) => (
          <div
            key={c._id}
            className="flex bg-[#160030] border-2 border-[#A5009B] rounded-md p-3 h-[300px]">
            <div className="self-center w-[40%]">
              <img src={c?.thumbnail} alt="" />
            </div>
            <div className="w-[60%] flex flex-col justify-evenly">
              <div className="text-3xl text-[#A300B0] font-bold">
                {c?.title}
              </div>
              <div className="text-[#D400F7] text-[20px]">
                <span className="text-base">Instructed By :</span>
                {c?.instructor}
              </div>
              <div className="flex items-center justify-evenly self-start gap-10">
                <Link
                  href={`/dashboard/yourCourses/${c._id}`}
                  className="cursor-pointer bg-[#D700E2] px-5 py-2 text-white rounded-md font-semibold">
                  Continue
                </Link>
                <span className="cursor-pointer border border-[#A5009B] px-5 py-2 text-white rounded-md font-semibold">
                  Outline
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
};

export default YourCoursesPage;
