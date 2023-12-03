import React, { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { setUser } from "@/redux/slice/userSlice/userSlice";
import axios from "axios";

const Signin = () => {
  const dispatch = useDispatch();
  const router = useRouter();
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
    if (data) {
      axios
        .post("/api/auth/login", {
          email: data.email,
          password: data.password,
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
    <section className="bg-gray-50 ">
      <div className="flex flex-col items-center justify-center px-4 py-4 mx-auto md:h-screen lg:py-0">
        <div className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
          <img className="w-8 h-8 mr-2" src="/images/EQ logo.png" alt="logo" />
          EduQuanta
        </div>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign in to your account
            </h1>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-4 md:space-y-6">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Enter email
                </label>
                <input
                  type="email"
                  {...register("email", {
                    required: { value: true, message: "Email is required" },
                  })}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@gmail.com"
                />
                {errors.email && (
                  <p className="text-red-500">{errors.email.message}</p>
                )}
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Password
                </label>
                <input
                  type="password"
                  {...register("password", {
                    required: { value: true, message: "Password is required" },
                  })}
                  placeholder="Enter your password"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
                {errors.password && (
                  <p className="text-red-500">{errors.password.message}</p>
                )}
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="remember"
                      aria-describedby="remember"
                      type="checkbox"
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                      required=""
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label
                      for="remember"
                      className="text-gray-500 dark:text-gray-300">
                      Remember me
                    </label>
                  </div>
                </div>
                <a
                  href="#"
                  className="text-sm font-medium text-primary-600 hover:underline dark:text-gray-300">
                  Forgot password?
                </a>
              </div>
              <button
                type="submit"
                className="inline-flex justify-center rounded-lg text-sm font-semibold py-2.5 px-4 bg-slate-900 text-white hover:bg-slate-700 w-full">
                Sign in
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Don't have an account?{" "}
                <a
                  href="#"
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500">
                  <Link href="/auth/Signup">Sign up here</Link>
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signin;
