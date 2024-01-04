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
          setYourCourses(res.data.courses);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [user]);

  return (
    <DashboardLayout>
      <div className="text-white">HEllo form your product</div>
    </DashboardLayout>
  );
};

export default yourProduct;
