import DashboardLayout from "@/components/layout/DashboardLayout";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const albumDetailsPage = () => {
  const [album, setAlbum] = useState({});
  const router = useRouter();
  const { id } = router.query;
  //   useEffect(() => {
  //     if (id) {
  //       axios
  //         .get(`/api/user/classroom?id=${id[0]}`)
  //         .then((res) => setAlbum(res.data.course));
  //     }
  //   }, [id]);
  return <DashboardLayout></DashboardLayout>;
};

export default albumDetailsPage;
