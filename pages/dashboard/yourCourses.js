import DashboardLayout from "@/components/layout/DashboardLayout";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const YourCoursesPage = () => {
  const [yourCourses, setYourCourses] = useState([]);
  const user = useSelector((state) => state.userReducer.user);

  useEffect(() => {
    axios
      .get(`/api/user/order?email=${user.email}`)
      .then((res) => {
        setYourCourses(res.data.courses);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <DashboardLayout>
      <h1>Your Courses:</h1>

      <div>
        {yourCourses.map((c) => (
          <div key={c._id}>{c.title}</div>
        ))}
      </div>
    </DashboardLayout>
  );
};

export default YourCoursesPage;
