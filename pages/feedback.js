import Layout from "@/components/layout/Layout";
import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";

const Feedback = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [feedback, setFeedback] = useState("");
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);
  const [totalStars, setTotalStars] = useState(5);

  const handleFeedbackForm = (e) => {
    e.preventDefault();
    const data = { name, email, feedback, rating };
    // console.log(data);
    axios.post("/api/user/feedback", data).then((res) => {
      if (res.data) {
        setName("");
        setEmail("");
        setFeedback("");
        setRating(null);
        toast.success("Feedback Sent");
      }
    });
  };

  return (
    <Layout>
      <div className="container mx-auto my-8 p-8 bg-white shadow-md rounded-md">
        <h1 className="text-2xl font-semibold mb-6">
          Give Feedbcak To EduQuanta
        </h1>

        <form onSubmit={handleFeedbackForm} className="space-y-4">
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-600">
              Your Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              rows="4"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
              required></textarea>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">
              Rate Your Experience
            </label>
            {[...Array(totalStars)].map((star, index) => {
              const currentRating = index + 1;

              return (
                <label key={index}>
                  <input
                    type="radio"
                    name="rating"
                    className="hidden"
                    value={currentRating}
                    onChange={() => setRating(currentRating)}
                  />
                  <span
                    className="star text-2xl"
                    style={{
                      color:
                        currentRating <= (hover || rating)
                          ? "#ffc107"
                          : "#e4e5e9",
                    }}
                    onMouseEnter={() => setHover(currentRating)}
                    onMouseLeave={() => setHover(null)}>
                    &#9733;
                  </span>
                </label>
              );
            })}
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
