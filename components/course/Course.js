import React, { useState } from "react";
import { RxCrossCircled } from "react-icons/rx";
const Course = ({ course, onAddToCart }) => {
  const [modalOpen, setModalOpen] = useState(false);

  const handleAddToCart = () => {
    onAddToCart(course);
  };

  return (
    <div className="relative w-full max-w-[15rem] h-[20rem] rounded overflow-hidden shadow-lg ml-3">
      <img
        className="w-full h-40 object-cover mb-2 cursor-pointer"
        src={course?.thumbnail}
        alt={course?.title}
        onClick={() => setModalOpen(true)}
      />
      <div className="px-6 py-2 bg-gray-800 text-white transition duration-300 ease-in-out transform hover:scale-105 hover:bg-gray-600">
        <div className="font-semibold text-center text-lg mb-2 truncate">
          {course?.title}
        </div>
        <p className="text-center text-base h-12">Price: {course?.price} BDT</p>
        <button
          onClick={handleAddToCart}
          className="w-full inline-flex justify-center rounded-lg text-sm font-semibold py-2.5 px-4 bg-white text-black hover:bg-blue-500">
          Enroll Now
        </button>
      </div>

      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 max-w-md">
            <h2 className="text-xl font-semibold mb-4">{course?.title}</h2>
            <button
              onClick={() => {
                setModalOpen(false);
              }}
              className="mt-1 ml-[12rem] inline-flex justify-center items-center rounded-lg text-sm font-semibold py-1 px-1 bg-red-500 text-white hover:bg-red-700">
              <RxCrossCircled className="text-lg items-center" />
            </button>
            <img
              className="w-full h-64 object-cover mb-4"
              src={course?.image}
              alt={course?.title}
            />
            <p>ID: {course?.id}</p>
            <p>Price: {course?.price} BDT</p>
            <p>course Code: {course?.courseCode}</p>
            <button
              onClick={() => setModalOpen(false)}
              className="mt-2 inline-flex justify-center rounded-lg text-sm font-semibold py-2.5 px-4 bg-blue-500 text-white hover:bg-blue-700">
              <h2 className="text-sm mb-0">Buy Now</h2>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Course;
