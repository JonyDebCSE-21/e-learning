import DashboardLayout from "@/components/layout/DashboardLayout";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const yourProduct = () => {
  const [products, setProducts] = useState([]);
  const user = useSelector((state) => state.userReducer.user);

  useEffect(() => {
    if (user) {
      axios
        .get(`/api/user/order?email=${user.email}&&product=true`)
        .then((res) => {
          setProducts(res.data.orders);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [user]);

  return (
    <DashboardLayout>
      <div className="text-white">
        <h1 className="text-2xl text-[#D700E2] font-semibold mb-3 border-b border-[#A5009B] pb-4">
          {" "}
          Your Purchased Tools
        </h1>
        <div className="flex flex-wrap justify-center gap-5">
          {products.map((product, index) => {
            return (
              <div
                key={index}
                className="bg-[#160030] rounded p-5 my-5 w-[200px]">
                <img
                  src={product?.image}
                  alt={product?.title}
                  className="w-[200px] h-[200px]"
                />
                <p className="text-2xl font-semibold">{product?.title}</p>
                <p className="text-xl font-semibold">
                  Price : {product?.price}
                </p>
                <p className="text-xl font-semibold">
                  Quantity : {product?.quantity}
                </p>
                <p className="text-xl font-semibold">{product?.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default yourProduct;
