import DashboardLayout from "@/components/layout/DashboardLayout";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const albumDetailsPage = () => {
  const [album, setAlbum] = useState({});
  const router = useRouter();
  const { id } = router.query;
  useEffect(() => {
    if (id) {
      axios
        .get(`/api/user/classroom?albumId=${id[0]}`)
        .then((res) => setAlbum(res.data.course))
        .catch((err) => {
          console.log(err);
        });
    }
  }, [id]);
  console.log(album);
  return (
    <DashboardLayout>
      <div>Hello</div>
    </DashboardLayout>
  );
};

export default albumDetailsPage;
