import DashboardLayout from "@/components/layout/DashboardLayout";
import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";

const imgStorageApi = "3f67787d6399449802b3d820607b790d";
const imgUploadUrl = `https://api.imgbb.com/1/upload?key=${imgStorageApi}`;

const createEvent = () => {
  const {
    register,
    handleSubmit,
    watch,
    setError,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);

    if (data.thumbnail[0]) {
      const formData = new FormData();
      formData.append("image", data.thumbnail[0]);

      axios.post(imgUploadUrl, formData).then((res) => {
        if (res.data) {
          axios
            .post("/api/admin/event", {
              title: data.title,
              date: data.date,
              image: res.data.data.display_url,
            })
            .then((res) => {
              console.log(res.data);
              reset();
              toast.success("Succesfully added Event", {
                duration: 3000,
              });
            })
            .catch((err) => {
              console.log(err);
              reset();
            });
        }
      });
    }
  };
  return (
    <DashboardLayout>
      <div>
        <div className="border border-[#D700E2] rounded-md  p-5 m-1 ">
          <span className="text-2xl font-bolder text-white">
            Create New Event
          </span>

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
                    {...register("title", {
                      required: { value: true, message: "Title is required" },
                    })}
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
                    Event Date
                  </label>
                  <input
                    {...register("date", {
                      required: {
                        value: true,
                        message: "date is required",
                      },
                    })}
                    type="text"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Enter Event Date"
                  />
                  {errors.duration && (
                    <p className="text-red-500">{errors.duration.message}</p>
                  )}
                </div>

                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
                    Add Event Thumbnail
                  </label>
                  <input
                    type="file"
                    {...register("thumbnail")}
                    placeholder=""
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                </div>

                <input
                  type="submit"
                  value="Create New Event"
                  className="inline-flex justify-center rounded-lg text-sm font-semibold py-2 px-4 bg-slate-900 text-white hover:bg-slate-700 w-full"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default createEvent;
