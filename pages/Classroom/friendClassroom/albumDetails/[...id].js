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
        .then((res) => {
          // console.log(res.data);
          setAlbum(res.data.album);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [id]);
  console.log(album);
  return (
    <DashboardLayout>
      <div className="text-white">
        <div className="my-3">
          <span>Album: {album.albumName}</span>
        </div>

        {/* <div className="flex flex-wrap items-center gap-3 ">
          {album?.images?.length > 0 &&
            album?.images.map((image) => (
              <div className="w-[50%] mx-auto mb-2">
                <img src={image} alt="" />
              </div>
            ))}
        </div> */}

        <div className="img-container">
          {album?.images?.length > 0 &&
            album?.images.map((image) => (
              <div class="box">
                <a href="ttps://oriontralelblog.com/wp-content/uploads/2019/08/IMG_6310.jpg">
                  <img src={image} alt="image" />
                </a>
              </div>
            ))}
        </div>

        <div className="my-5">
          {album?.videos?.length > 0 &&
            album?.videos.map((video) => (
              <iframe
                className="mx-auto"
                width="560"
                height="315"
                src={video}
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowfullscreen></iframe>
            ))}
        </div>

        <div>Notes: {album.notes}</div>
      </div>
    </DashboardLayout>
  );
};

export default albumDetailsPage;
