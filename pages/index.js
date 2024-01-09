import Course from "@/components/course/Course";
import OverviewSlider from "@/components/course/OverviewSlider";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { setUser } from "@/redux/slice/userSlice/userSlice";
import axios from "axios";
import Layout from "@/components/layout/Layout";

export default function Home() {
  const [courses, setCourses] = useState([]);
  const [allCourses, setAllCourses] = useState([]);
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
    axios.get("/api/user/course").then((res) => {
      setAllCourses(res.data.course);
      setCourses(res.data.course);
    });
  }, []);

  const handleSearch = (e) => {
    const search = e.target.value.trim();
    if (search == "") {
      setCourses(allCourses);
    } else {
      const filtered = courses.filter((course) => {
        const title = course.title.toLowerCase();
        if (title.includes(search.toLocaleLowerCase())) {
          return course;
        }
      });
      setCourses(filtered);
    }
  };

  return (
    <main>
      <Layout>
        <OverviewSlider></OverviewSlider>
        <div className="w-full flex justify-center my-4">
          <input
            type="text"
            placeholder="Search here"
            onChange={(e) => handleSearch(e)}
            className="shadow appearance-none border rounded w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mx-4 md:mx-0   grid grid-cols-2 md:grid-cols-3 gap-3">
          {courses.map((course) => (
            <div key={course?._id}>
              <Course course={course} />
            </div>
          ))}
        </div>
      </Layout>
    </main>
  );
}
