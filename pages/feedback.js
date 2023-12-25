import Layout from "@/components/layout/Layout";
import React from "react";

const Feedback = () => {
  return (
    <Layout>
      <div className="container mx-auto my-8 p-8 bg-white shadow-md rounded-md">
        <h1 className="text-2xl font-semibold mb-6">
          Give Feedbcak To EduQuanta
        </h1>

        <form action="#" method="post" className="space-y-4">
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-600">
              Your Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-600">
              Your Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="feedback"
              className="block text-sm font-medium text-gray-600">
              Your Feedback
            </label>
            <textarea
              id="feedback"
              name="feedback"
              rows="4"
              className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
              required></textarea>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">
              Rate Your Experience
            </label>
            <div className="mt-1">
              <input
                type="radio"
                id="star5"
                name="rating"
                value="5"
                className="hidden"
                required
              />
              <label htmlFor="star5" className="text-xl cursor-pointer">
                &#9733;
              </label>

              <input
                type="radio"
                id="star4"
                name="rating"
                value="4"
                className="hidden"
              />
              <label htmlFor="star4" className="text-xl cursor-pointer">
                &#9733;
              </label>

              <input
                type="radio"
                id="star3"
                name="rating"
                value="3"
                className="hidden"
              />
              <label htmlFor="star3" className="text-xl cursor-pointer">
                &#9733;
              </label>

              <input
                type="radio"
                id="star2"
                name="rating"
                value="2"
                className="hidden"
              />
              <label htmlFor="star2" className="text-xl cursor-pointer">
                &#9733;
              </label>

              <input
                type="radio"
                id="star1"
                name="rating"
                value="1"
                className="hidden"
              />
              <label htmlFor="star1" className="text-xl cursor-pointer">
                &#9733;
              </label>
            </div>
          </div>

          <div className="mb-4">
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300">
              Submit Feedback
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default Feedback;
