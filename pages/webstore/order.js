import Link from "next/link";
import React, { useState } from "react";

const OrderPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: +880,
    address: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Order submitted:", formData);
  };

  return (
    <div className="container mx-auto my-8 p-8 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-semibold mb-4">Order Your Product</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-600">
            Full Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-600">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="mobile"
            className="block text-sm font-medium text-gray-600">
            Mobile
          </label>
          <input
            type="number"
            id="mobile"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            required
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="address"
            className="block text-sm font-medium text-gray-600">
            Shipping Address
          </label>
          <textarea
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
            rows="3"
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>

        <div>
          <label
            htmlFor="order"
            className="btn bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">
            Place Order
          </label>
          <input type="checkbox" id="order" className="modal-toggle hidden" />
          <div className="modal" role="dialog">
            <div className="modal-box bg-black text-white">
              <h3 className="font-bold text-center text-lg">
                Congratulations!
              </h3>
              <p className="py-4">
                Your order has been successfully received on our website. You
                will receive your product within the next 5 working days. Thank
                you.
              </p>

              <div className="modal-action">
                <label htmlFor="order" className="btn">
                  Close!
                </label>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default OrderPage;
