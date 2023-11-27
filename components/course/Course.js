import React from "react";
const Course = ({ course }) => {
  return (
    <div className=" w-full max-w-[15rem] h-[20rem] rounded overflow-hidden shadow-lg ml-3">
      <img
        className="w-full h-40 object-cover mb-2"
        src={course.image}
        alt={course.title}
      />
      <div className="px-6 py-4 bg-gray-800 text-white transition duration-300 ease-in-out transform hover:scale-105 hover:bg-gray-600">
        <div className="font-bold text-center text-sm mb-2 truncate">
          {course.title}
        </div>
        <p className="text-center text-base h-20">
          ID: {course.id}
          <br />
          Price: ${course.price}
          <br />
          Promo Code: {course.promoCode}
        </p>
      </div>
    </div>
  );
};

export default Course;
