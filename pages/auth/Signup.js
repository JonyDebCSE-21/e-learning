import React, { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/slice/userSlice/userSlice";

const Signup = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    setLoading(true);
    if (data.password !== data.confirmPassword) {
      setError("confirmPassword", {
        type: "manual",
        message: "Passwords do not match",
      });
      setLoading(false);
      return;
    }
    if (data) {
      axios
        .post("/api/auth/register", {
          name: data.name,
          email: data.email,
          password: data.password,
          role: "user",
        })
        .then((res) => {
          if (res.data.user) {
            dispatch(setUser(res.data.user));
            localStorage.setItem("user", JSON.stringify(res.data.user));
            setLoading(false);
            router.push("/");
          }
        })
        .catch((err) => {
          setLoading(false);
          // toast.error(`${err.response.data.message}`);
        });
    }
  };

  return (
    <section className="bg-gray-50">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <Link
          href="#"
          className="flex items-center mb-2 text-2xl font-semibold text-gray-900 dark:text-white">
          <img className="w-8 h-6 mr-2" src="/images/EQ-logo.png" alt="logo" />
          EduQuanta
        </Link>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0  dark:bg-gray-800 dark:border-gray-400">
          <div className="p-6 space-y-2 md:space-y-4 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Create your account
            </h1>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-2 md:space-y-4">
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
                  Name
                </label>
                <input
                  {...register("name", {
                    required: { value: true, message: "Name is required" },
                  })}
                  type="text"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Enter Your Name"
                />
                {errors.name && (
                  <p className="text-red-500">{errors.name.message}</p>
                )}
              </div>
              {/* <div>
                <label
                  for="birthdate"
                  className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
                  Birthday
                </label>
                <input
                  type="date"
                  name="date"
                  id="date"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Enter Birth Year"
                  required=""
                />
              </div> */}
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
                  Your email
                </label>
                <input
                  {...register("email", {
                    required: { value: true, message: "Email is required" },
                  })}
                  type="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@gmail.com"
                />
                {errors.email && (
                  <p className="text-red-500">{errors.email.message}</p>
                )}
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
                  Password
                </label>
                <input
                  type="password"
                  {...register("password", {
                    required: { value: true, message: "Password is required" },
                  })}
                  placeholder="Don't mind to Keep it secret"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required=""
                />
                {errors.password && (
                  <p className="text-red-500">{errors.password.message}</p>
                )}
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
                  Confirm password
                </label>
                <input
                  type="password"
                  {...register("confirmPassword", {
                    required: {
                      value: true,
                      message: "Confirm password is required",
                    },
                  })}
                  placeholder="Comfirm it please"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
                {errors.confirmPassword && (
                  <p className="text-red-500">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>
              <div className="flex items-start space-x-2">
                <div className="flex items-center h-5">
                  <input
                    id="terms"
                    aria-describedby="terms"
                    type="checkbox"
                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                    required=""
                  />
                </div>
                <div className="text-sm">
                  <label
                    htmlFor="terms"
                    className="font-light text-gray-500 dark:text-gray-300">
                    I accept the{" "}
                    <Link
                      className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                      href="/termsCondition">
                      Terms and Conditions
                    </Link>
                  </label>
                </div>
              </div>
              <input
                type="submit"
                value="Create an account"
                className="inline-flex justify-center rounded-lg text-sm font-semibold py-2 px-4 bg-slate-900 text-white hover:bg-slate-700 w-full"
              />

              <div className="text-sm font-light text-gray-500 dark:text-gray-400">
                Already have an account?{" "}
                <Link
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  href="/auth/Signin">
                  Login here
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signup;
