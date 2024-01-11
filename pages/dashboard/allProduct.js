import DashboardLayout from "@/components/layout/DashboardLayout";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const allProduct = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("/api/user/product")
      .then((res) => setProducts(res.data.products));
  }, []);

  const handleDelete = (id) => {
    axios
      .delete(`/api/admin/product?id=${id}`)
      .then((res) => {
        const restProduct = products.filter((p) => p._id != id);
        setProducts(restProduct);
      })
      .catch((err) => console.log(err));
  };

  return (
    <DashboardLayout>
      <div>
        <h1 className="text-2xl text-[#D700E2] font-semibold mb-3 border-b border-[#A5009B] pb-4">
          All Product
        </h1>
        <table className="w-full text-sm text-left rtl:text-right text-white dark:text-gray-400">
          <thead className="textarea-xl sticky top-0 text-white uppercase bg-[#1F82BA] dark:bg-blue-600 dark:text-white">
            <tr>
              <th scope="col" className="px-6 py-3 text-center">
                Photo
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Title
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Price
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Description
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr
                key={product._id}
                className="bg-[#1D0D41] border-b dark:bg-gray-800 dark:border-gray-700">
                <td className="px-6 py-4 text-xl font-semibold text-center">
                  <img
                    src={product?.image}
                    alt={product?.title}
                    className="w-[80px] h-[80px] rounded-full"
                  />
                </td>
                <td className="px-6 py-4 text-xl font-semibold text-center">
                  {product?.title}
                </td>
                <td className="px-6 py-4 text-xl font-semibold text-center">
                  {product?.price}
                </td>
                <td className="px-6 py-4 text-xl font-semibold text-center">
                  {product?.description}
                </td>
                <td>
                  <div className="flex gap-4 px-2">
                    <Link
                      href={`/dashboard/editProduct/${product._id}`}
                      className="bg-green-500 p-2 rounded-lg text-black">
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(product._id)}
                      className="bg-red-500 p-2 rounded-lg text-black">
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
};

export default allProduct;
