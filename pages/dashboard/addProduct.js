import DashboardLayout from "@/components/layout/DashboardLayout";
import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
<<<<<<< HEAD
=======
import toast, { Toaster } from "react-hot-toast";
>>>>>>> 5943200 (webstore product added)

const imgStorageApi = "3f67787d6399449802b3d820607b790d";
const imgUploadUrl = `https://api.imgbb.com/1/upload?key=${imgStorageApi}`;

const addProduct = () => {
  const {
    register,
    handleSubmit,
    watch,
    setError,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
<<<<<<< HEAD
    // console.log(data);

    // const file = data.thumbnail[0];

    // console.log(file);

=======
>>>>>>> 5943200 (webstore product added)
    if (data.image[0]) {
      const formData = new FormData();
      formData.append("image", data.image[0]);
      axios.post(imgUploadUrl, formData).then((res) => {
        if (res.data) {
          axios
            .post("/api/admin/product", {
              title: data.title,
              description: data.description,
              image: res.data.data.display_url,
              price: data.price,
              quantity: data.quantity,
            })
            .then((res) => {
              console.log(res.data);
              reset();
              toast.success("Succesfully added product", {
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

    // const result = await response.json();

    // console.log(response);
  };

  return (
    <DashboardLayout>
<<<<<<< HEAD
      <div>
        <div className="bg-blue-900 p-5 m-1 rounded-sm">
          <span className="text-2xl font-bolder text-white">
            Add Your Product
          </span>
=======
      <div className="flex justify-center">
        <div
          style={{
            boxShadow:
              "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset",
          }}
          className="bg-blue-900 p-4 w-[70%] rounded-sm">
          <span className="text-2xl font-bolder text-white">Add Product</span>
>>>>>>> 5943200 (webstore product added)

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
                      required: { value: true, message: "Name is required" },
                    })}
                    type="text"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Enter Course Title"
                  />
                </div>
<<<<<<< HEAD
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
                    Description
                  </label>
                  <input
                    {...register("description", {
                      required: {
                        value: true,
                        message: "Description is required",
                      },
                    })}
                    type="text"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Enter Description"
                  />
                </div>

                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
                    Product Photo
=======

                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
                    Add Product Image
>>>>>>> 5943200 (webstore product added)
                  </label>
                  <input
                    type="file"
                    {...register("image")}
                    placeholder=""
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
<<<<<<< HEAD
                    Quantity
                  </label>
                  <input
                    type="text"
                    {...register("quantity", {
                      required: {
                        value: true,
                        message: "Quantity is required",
                      },
                    })}
                    placeholder="Enter course instructor name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
=======
>>>>>>> 5943200 (webstore product added)
                    Price
                  </label>
                  <input
                    type="text"
<<<<<<< HEAD
                    {...register("price", {
                      required: {
                        value: true,
                        message: "Confirm password is required",
                      },
                    })}
                    placeholder="Enter course price"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                </div>
                <input
                  type="submit"
                  value="Add New Product"
=======
                    {...register("price")}
                    placeholder="Enter product price"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                </div>

                <input
                  type="submit"
                  value="Add New Course"
>>>>>>> 5943200 (webstore product added)
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

export default addProduct;
