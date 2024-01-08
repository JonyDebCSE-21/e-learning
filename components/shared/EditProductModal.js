import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const imgStorageApi = "3f67787d6399449802b3d820607b790d";
const imgUploadUrl = `https://api.imgbb.com/1/upload?key=${imgStorageApi}`;

const EditProductModal = ({ openModal, setOpenModal, product, setProduct }) => {
  const {
    register,
    handleSubmit,
    watch,
    setError,
    reset,
    formState: { errors },
  } = useForm({ title: null, description: null, image: null, price: null });

  const onSubmit = (data) => {
    // console.log(data);

    // const file = data.thumbnail[0];

    // console.log(file);

    console.log(data);
    if (data.image[0]) {
      //   const formData = new FormData();
      //   formData.append("image", data.image[0]);
      //   axios.post(imgUploadUrl, formData).then((res) => {
      //     if (res.data) {
      //       axios
      //         .post("/api/admin/product", {
      //           title: data.title,
      //           description: data.description,
      //           image: res.data.data.display_url,
      //           price: data.price,
      //           quantity: data.quantity,
      //         })
      //         .then((res) => {
      //           console.log(res.data);
      //           reset();
      //           toast.success("Succesfully added product", {
      //             duration: 3000,
      //           });
      //         })
      //         .catch((err) => {
      //           console.log(err);
      //           reset();
      //         });
      //     }
      //   });
    }

    // const result = await response.json();

    // console.log(response);
  };
  return (
    <>
      {openModal.id && (
        <div
          onClick={(e) => {
            setOpenModal({ id: null, value: false });
          }}
          className={`fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-40 transition-opacity duration-700 ease-in-out ${
            openModal.id ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}>
          <div
            onClick={(e) => e.stopPropagation()}
            className=" bg-[#F8F5FA] h-auto border-none rounded-[20px] py-4 px-6">
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
                      type="text"
                      //   defaultValue={product.title || ""}
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Enter Product Title"
                    />
                    {errors.title && (
                      <p className="text-red-500">{errors.title.message}</p>
                    )}
                  </div>
                  <div>
                    <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
                      Description
                    </label>
                    <input
                      {...register("description")}
                      type="text"
                      //   defaultValue={product.description || ""}
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Enter Description"
                    />
                    {errors.description && (
                      <p className="text-red-500">
                        {errors.description.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
                      Product Photo
                    </label>
                    <input
                      type="file"
                      {...register("image")}
                      //   defaultValue={product.image || ""}
                      placeholder=""
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                  </div>

                  {/* <div>
                    <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
                      Quantity
                    </label>
                    <input
                      type="number"
                      {...register("quantity", {
                        required: {
                          value: true,
                          message: "Quantity is required",
                        },
                      })}
                      placeholder="Enter product"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                    {errors.quantity && (
                      <p className="text-red-500">{errors.quantity.message}</p>
                    )}
                  </div> */}
                  <div>
                    <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
                      Price
                    </label>
                    <input
                      type="number"
                      {...register("price")}
                      //   defaultValue={product.price || ""}
                      placeholder="Enter price"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                    {errors.price && (
                      <p className="text-red-500">{errors.price.message}</p>
                    )}
                  </div>
                  <input
                    type="submit"
                    value="Update Product"
                    className="inline-flex justify-center rounded-lg text-sm font-semibold py-2 px-4 bg-slate-900 text-white hover:bg-slate-700 w-full"
                  />
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EditProductModal;
