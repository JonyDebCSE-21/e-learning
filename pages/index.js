import Course from "@/components/course/Course";
import OverviewSlider from "@/components/course/OverviewSlider";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { setUser } from "@/redux/slice/userSlice/userSlice";
import axios from "axios";
import Layout from "@/components/layout/Layout";

export default function Home() {
  const [courses, setCourses] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    const user = localStorage.getItem("user");
    if (user) {
      dispatch(setUser(JSON.parse(user)));
    }
  }, []);

  useEffect(() => {
    axios.get("/api/user/course").then((res) => setCourses(res.data.course));
  }, []);

  return (
    <main>
      <Layout>
        <OverviewSlider></OverviewSlider>
        <div className="mx-4 md:mx-0 bg-gray-200 grid grid-cols-2 md:grid-cols-3 gap-3">
          {courses.map((course) => (
            <div key={course.id}>
              <Course course={course} />
            </div>
          ))}
        </div>
      </Layout>
    </main>
  );
}
