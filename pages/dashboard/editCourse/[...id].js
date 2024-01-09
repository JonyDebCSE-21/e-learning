import DashboardLayout from "@/components/layout/DashboardLayout";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const index = () => {
  const [course, setCourse] = useState();
  const router = useRouter();
  const { id } = router.query;
  const {
    register,
    handleSubmit,
    watch,
    setError,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (id) {
      axios
        .get(`/api/user/course?id=${id[0]}`)
        .then((res) => setCourse(res.data.course));
    }
  }, [id]);

  const onSubmit = (data) => {
    // console.log(data);
    // const file = data.thumbnail[0];
    // console.log(file);
    if (data.thumbnail[0]) {
      const formData = new FormData();
      formData.append("image", data.thumbnail[0]);
      axios.post(imgUploadUrl, formData).then((res) => {
        if (res.data) {
          axios
            .put("/api/admin/course", {
              _id: course._id,
              title: data.title == "" ? course.title : data.title,
              duration: data.duration == "" ? course.duration : data.duration,
              thumbnail: res.data.data.display_url,
              instructor:
                data.instructor == "" ? course.instructor : data.instructor,
              price: data.price == "" ? course.price : data.price,
              details: data.details == "" ? course.details : data.details,
              video: data.video == "" ? course.video : data.video,
            })
            .then((res) => {
              toast.success("Succesfully update course", {
                duration: 3000,
              });
            })
            .catch((err) => {
              console.log(err);
              reset();
            });
        }
      });
    } else {
      axios
        .put("/api/admin/course", {
          _id: course._id,
          title: data.title == "" ? course.title : data.title,
          duration: data.duration == "" ? course.duration : data.duration,
          thumbnail: course.thumbnail,
          instructor:
            data.instructor == "" ? course.instructor : data.instructor,
          price: data.price == "" ? course.price : data.price,
          details: data.details == "" ? course.details : data.details,
          video: data.video == "" ? course.video : data.video,
        })
        .then((res) => {
          toast.success("Succesfully update course", {
            duration: 3000,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
    // const result = await response.json();
    // console.log(response);
  };

  return (
    <DashboardLayout>
      <h1 className="text-2xl text-[#D700E2] font-semibold mb-3 border-b border-[#A5009B] pb-4">
        <Link className="" href={`/dashboard/allCourse`}>
          Back
        </Link>
        <p>Edit Course</p>
      </h1>
      <div className="">
        <div className="p-6 space-y-2 md:space-y-4 sm:p-8">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-2 md:space-y-4">
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
                Title
              </label>
              <input
                {...register("title")}
                defaultValue={course?.title}
                type="text"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Enter Course Title"
              />
              {errors.title && (
                <p className="text-red-500">{errors.title.message}</p>
              )}
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
                Course Duration
              </label>
              <input
                {...register("duration")}
                defaultValue={course?.duration}
                type="text"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Enter Course Duration"
              />
              {errors.duration && (
                <p className="text-red-500">{errors.duration.message}</p>
              )}
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
                Add Thumbnail
              </label>
              <input
                type="file"
                {...register("thumbnail")}
                defaultValue={course?.thumbnail}
                placeholder=""
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
                Course Instructor
              </label>
              <input
                type="text"
                {...register("instructor")}
                defaultValue={course?.instructor}
                placeholder="Enter course instructor name"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
              {errors.instructor && (
                <p className="text-red-500">{errors.instructor.message}</p>
              )}
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
                Price
              </label>
              <input
                type="number"
                {...register("price")}
                defaultValue={course?.price}
                placeholder="Enter course price"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
              {errors.price && (
                <p className="text-red-500">{errors.price.message}</p>
              )}
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
                Course Details
              </label>
              <input
                type="text"
                {...register("details")}
                defaultValue={course?.details}
                placeholder="Enter course details"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
              {errors.details && (
                <p className="text-red-500">{errors.details.message}</p>
              )}
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
                Video Link
              </label>
              <input
                type="text"
                {...register("video")}
                defaultValue={course?.video}
                placeholder="Enter course video link"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
              {errors.video && (
                <p className="text-red-500">{errors.video.message}</p>
              )}
            </div>

            <input
              type="submit"
              value="Update Course"
              className="inline-flex justify-center rounded-lg text-sm font-semibold py-2 px-4 bg-slate-900 text-white hover:bg-slate-700 w-full"
            />
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default index;
