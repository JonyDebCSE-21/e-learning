import DashboardLayout from "@/components/layout/DashboardLayout";
import axios from "axios";
import React, { useEffect, useState } from "react";

const YourCoursesPage = () => {
  const [orderItems, setOrderItems] = useState([]);
  const [courses, setCourses] = useState([]);
  const [yourCourses, setYourCourses] = useState([]);

  useEffect(() => {
    axios.get("/api/user/order").then((res) => {
      const line_items = res.data.course[0]?.line_items || [];
      let items = line_items.map(
        (line_item) => line_item.price_data.product_data.name
      );
      setOrderItems(items);
    });

    axios.get("/api/user/course/").then((res) => {
      setCourses(res.data.course);
    });
  }, []);

  useEffect(() => {
    let newArray = courses.filter((obj) => orderItems.includes(obj._id));
    setYourCourses(newArray);
    console.log("new11", yourCourses);
  }, [courses, orderItems]); // Add dependencies to avoid unnecessary re-renders

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
