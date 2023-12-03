import Image from "next/image";
import { Inter } from "next/font/google";
import { useRouter } from "next/router";
import Course from "@/components/course/Course";
import OverviewSlider from "@/components/course/OverviewSlider";
import { useDispatch, useSelector } from "react-redux";
import { decrement, increment } from "@/redux/slice/counterSlice/counterSlice";
import { useEffect } from "react";
import { setUser } from "@/redux/slice/userSlice/userSlice";
const courses = [
  {
    id: 1,
    title:
      "Online batch admission is going on for class 6 to 12. Get ready for the upcoming interactive courses.",
    price: "1000",
    courseCode: "JS2023",
    image: "/images/Admission.jpg",
  },
  {
    id: 2,
    title: "Collect more interactive notes for your child.",

    price: "1000",
    courseCode: "JS2023",
    image: "/images/children.jpg",
  },
  {
    id: 3,
    title:
      "Join in our regular skill development courses and grow your future.",
    price: "1000",
    courseCode: "JS2023",
    image: "/images/skills.webp",
  },
];
export default function Home() {
  const dispatch = useDispatch();
  // if (!localStorage) return;

  useEffect(() => {
    if (typeof window === "undefined") {
      // Perform localStorage action
      // const item = localStorage.getItem("key");
      return;
    }
    const user = localStorage.getItem("user");
    if (user) {
      dispatch(setUser(JSON.parse(user)));
    }
  }, []);

  return (
    <main>
      <OverviewSlider></OverviewSlider>
      <div className="mx-4 md:mx-0 bg-gray-200 grid grid-cols-2 md:grid-cols-3 gap-3">
        {courses.map((course) => (
          <div key={course.id}>
            <Course course={course} />
          </div>
        ))}
      </div>
    </main>
  );
}
