import Layout from "@/components/layout/Layout";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdOutlineFavoriteBorder } from "react-icons/md";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { setCart } from "@/redux/slice/cartSlice/cartSlice";
import axios from "axios";
import { useRouter } from "next/router";

const Cart = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const cart = useSelector((state) => state.cartReducer.cart);
  const user = useSelector((state) => state.userReducer.user);

  const handleClearAll = () => {
    if (!user) return toast.error("Please login to continue", { id: "1" });
    axios
      .delete(`/api/user/cart?cartId=${cart[0]._id}`)
      .then((res) => {
        toast.success(res.data.message, { id: "1" });
        dispatch(setCart(null));
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  const handleIncreaseItem = (item) => {
    if (!user) return toast.error("Please login to continue");
    // setLoading(true);
    let data;
    const course = cart[0].courseList.find((course) => item._id === course._id);
    if (course) {
      data = {
        userId: user?._id,
        courseId: item._id,
        quantity: 1,
      };
    } else {
      data = {
        userId: user?._id,
        productId: item._id,
        quantity: 1,
      };
    }
    axios
      .put("/api/user/cart", data)
      .then((res) => {
        // setLoading(false);
        toast.success(res.data.message, { id: "1" });
        dispatch(setCart(res.data.cart));
      })
      .catch((err) => {
        // setLoading(false);
      });
  };
  const handleDecreaseItem = (item) => {
    if (!user) return toast.error("Please login to continue");
    // setLoading(true);
    let data;
    const course = cart[0].courseList.find((course) => item._id === course._id);
    if (course) {
      data = {
        userId: user?._id,
        courseId: item._id,
        quantity: 1,
      };
    } else {
      data = {
        userId: user?._id,
        productId: item._id,
        quantity: 1,
      };
    }
    axios
      .put("/api/user/cart", {
        userId: user?._id,
        productId: item._id,
        quantity: -1,
      })
      .then((res) => {
        // setLoading(false);
        toast.success(res.data.message, { id: "1" });
        dispatch(setCart(res.data.cart));
      })
      .catch((err) => {
        // setLoading(false);
      });
  };

  const handleCourseDelete = (item) => {
    if (!user) return toast.error("Please login to continue");
    // setLoading(true);
    // const course = cart.productList.find((item) => item._id === id);
    axios
      .put("/api/user/cart", {
        userId: user?._id,
        courseId: item._id,
        quantity: -1,
      })
      .then((res) => {
        // setLoading(false);
        toast.success("Course Removed", { id: "1" });
        dispatch(setCart(res.data.cart));
      })
      .catch((err) => {
        // setLoading(false);
      });
  };

  const handleProductDelete = (item) => {
    if (!user) return toast.error("Please login to continue");
    // setLoading(true);
    // const course = cart.productList.find((item) => item._id === id);
    axios
      .put("/api/user/cart", {
        userId: user?._id,
        productId: item._id,
        quantity: -1,
      })
      .then((res) => {
        // setLoading(false);
        toast.success("Product Removed", { id: "1" });
        dispatch(setCart(res.data.cart));
      })
      .catch((err) => {
        // setLoading(false);
      });
  };

  const onSubmit = (data) => {
    axios
      .post("/api/user/order", {
        name: data.name,
        city: data.city,
        email: data.email,
        postalCode: data.postalCode,
        streetAddress: data.streetAddress,
        phone: data.phone,
        cart: cart[0],
      })
      .then((res) => {
        if (res.data.url) {
          window.location = res.data.url;
        }
        // console.log(res.data);
      });
  };

  return (
    <Layout>
      <div className="container mx-auto grid grid-cols-2 gap-10 mt-10">
        {cart && cart[0] && !cart[0].totalQuantity == 0 ? (
          <>
            <div className="col-span-2 md:col-span-1">
              <div className="bg-white flex justify-between items-center px-3 py-2 mb-4">
                <p className="text-common-gray-text">Your cart item </p>
                <button
                  onClick={handleClearAll}
                  className="text-common-gray-text hover:text-danger flex gap-3 items-center">
                  <RiDeleteBin6Line /> Clear All
                </button>
              </div>
              <div className="">
                <div className="">
                  {cart &&
                    cart[0].courseList.map((item) => {
                      return (
                        <div
                          key={item?._id}
                          className="mb-3 p-3 relative flex justify-between gap-4 bg-white">
                          <div className="flex space-x-4">
                            {item?.thumbnail && (
                              <img
                                style={{ width: "120px", height: "80px" }}
                                className="rounded-md"
                                src={item.thumbnail}
                                alt=""
                              />
                            )}
                            <div>
                              <p className="">{item?.title}</p>
                              {item.properties && item.properties[0] && (
                                <p className="text-common-gray-text mt-1">
                                  {item.properties[0].propertyName}:
                                  {item.properties[0].propertyValue}
                                </p>
                              )}
                              <p className="text-xs mt-1">
                                Only {item.quantity} item in stock
                              </p>
                            </div>
                          </div>
                          <div className="max-w-[200px]">
                            <div className="text-center">${item?.price}</div>
                            <div className="flex justify-between my-2">
                              <button
                                type="button"
                                onClick={() => handleCourseDelete(item)}
                                className="text-2xl text-common-gray-text hover:text-danger">
                                <RiDeleteBin6Line />
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                </div>
                <div className="">
                  {cart &&
                    cart[0].productList.map((item) => {
                      return (
                        <div
                          key={item?._id}
                          className="mb-3 p-3 relative flex justify-between gap-4 bg-white">
                          <div className="flex space-x-4">
                            {item?.image && (
                              <img
                                style={{ width: "120px", height: "80px" }}
                                className="rounded-md"
                                src={item.image}
                                alt=""
                              />
                            )}
                            <div>
                              <p className="">{item?.title}</p>
                              {item.properties && item.properties[0] && (
                                <p className="text-common-gray-text mt-1">
                                  {item.properties[0].propertyName}:
                                  {item.properties[0].propertyValue}
                                </p>
                              )}
                              <p className="text-xs mt-1">
                                Only {item.quantity} item in stock
                              </p>
                            </div>
                          </div>
                          <div className="max-w-[200px]">
                            <div className="text-center">${item?.price}</div>
                            <div className="flex gap-4 my-2">
                              <button
                                onClick={() => item && handleDecreaseItem(item)}
                                className="cursor-pointer px-2 bg-[#9e9e9e] text-base">
                                -
                              </button>
                              <p>{item?.quantity}</p>
                              <button
                                onClick={() => item && handleIncreaseItem(item)}
                                className="cursor-pointer px-2 bg-[#9e9e9e] text-base">
                                +
                              </button>
                            </div>

                            <div className="flex justify-between my-2">
                              <button
                                type="button"
                                onClick={() => handleProductDelete(item)}
                                className="text-2xl text-common-gray-text hover:text-danger">
                                <RiDeleteBin6Line />
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
            <div className="col-span-2 md:col-span-1 bg-white p-3 ">
              <p>Order Summary</p>
              <div className="mt-3 flex justify-between">
                <p className="text-common-gray-text">
                  Subtotal ({cart[0].totalQuantity} item)
                </p>
                <p>${cart[0].totalPrice}</p>
              </div>
              <div className="h-[1px] bg-common-gray-text my-5"></div>
              <form onSubmit={handleSubmit(onSubmit)} className="my-5">
                <input
                  type="text"
                  placeholder="Your Name"
                  {...register("name", {
                    required: {
                      value: true,
                      message: "Name is required",
                    },
                  })}
                  className="w-full mb-3 block px-4 py-2 border border-[#86868b] rounded-md focus:outline-none focus:ring focus:border-[#0071e3] placeholder-gray-400"
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  value={user?.email}
                  readOnly
                  {...register("email")}
                  className="w-full mb-3 block px-4 py-2 border border-[#86868b] rounded-md focus:outline-none focus:ring focus:border-[#0071e3] placeholder-gray-400"
                />
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="City"
                    {...register("city", {
                      required: { value: true, message: "City is required" },
                    })}
                    className="w-full mb-3 col-span-1 block px-4 py-2 border border-[#86868b] rounded-md focus:outline-none focus:ring focus:border-[#0071e3] placeholder-gray-400"
                  />
                  <input
                    type="text"
                    placeholder="Postal Code"
                    {...register("postalCode", {
                      required: {
                        value: true,
                        message: "Postal Code is required",
                      },
                    })}
                    className="w-full mb-3 col-span-1 block px-4 py-2 border border-[#86868b] rounded-md focus:outline-none focus:ring focus:border-[#0071e3] placeholder-gray-400"
                  />
                </div>
                <input
                  type="text"
                  placeholder="Street Address"
                  {...register("streetAddress", {
                    required: {
                      value: true,
                      message: "Street address is required",
                    },
                  })}
                  className="w-full mb-3 block px-4 py-2 border border-[#86868b] rounded-md focus:outline-none focus:ring focus:border-[#0071e3] placeholder-gray-400"
                />
                <input
                  type="text"
                  placeholder="Phone Number"
                  {...register("phone", {
                    required: {
                      value: true,
                      message: "Phone number is required",
                    },
                  })}
                  className="w-full mb-3 block px-4 py-2 border border-[#86868b] rounded-md focus:outline-none focus:ring focus:border-[#0071e3] placeholder-gray-400"
                />
                <input
                  type="submit"
                  value="Proceed To Checkout"
                  className="w-full bg-secondary text-white cursor-pointer hover:bg-opacity-80 block px-4 py-2 border border-[#86868b] rounded-md focus:outline-none focus:ring focus:border-[#0071e3] placeholder-gray-400"></input>
              </form>
            </div>
          </>
        ) : (
          <p className="text-secondary text-2xl text-center col-span-2">
            Your cart is empty. Add something to your cart.
          </p>
        )}
      </div>
    </Layout>
  );
};

export default Cart;
