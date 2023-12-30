import DashboardLayout from "@/components/layout/DashboardLayout";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const yourCoursesDetailsPage = () => {
  const [course, setCourse] = useState({});
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      axios
        .get(`/api/user/course?id=${id[0]}`)
        .then((res) => setCourse(res.data.course));
    }
  }, [id]);

  return (
    <DashboardLayout>
      <div>
        <h1 className="text-2xl font-bold text-[#A300B0] my-3 p-3 border-b border-[#A5009B]">
          {course.title}
        </h1>
        <div className=" w-[80%] mx-auto ">
          <iframe
            className="mx-auto"
            width="560"
            height="315"
            src={course.video}
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen></iframe>
        </div>
        <div className="my-3 border border-[#A5009B] p-3 rounded-md w-[30%]">
          <span className="text-white">Instructed By: {course.instructor}</span>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default yourCoursesDetailsPage;
