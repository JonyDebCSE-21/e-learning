import DashboardLayout from "@/components/layout/DashboardLayout";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const FriendClassroom = () => {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };
  const router = useRouter();
  const [userAlbum, setUserAlbum] = useState([]);
  const { id } = router.query;

  useEffect(() => {
    axios
      .get(`/api/user/classroom?id=${id[0]}`)
      .then((res) => {
        setUserAlbum(res.data.classroom);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <DashboardLayout>
      <div className="text-2xl text-[#A300B0] font-bold border-b border-[#A5009B] pb-4">
        Friend Classroom
      </div>
      <div>
        {userAlbum.length > 0 ? (
          <div className="grid grid-cols-3 gap-5 my-5">
            {userAlbum.map((album) => {
              return (
                <div
                  onClick={() => {
                    router.push(
                      `/Classroom/friendClassroom/albumDetails/${album._id}`
                    );
                  }}
                  className="w-[300px] cursor-pointer border border-[#A5009B] p-2 text-white rounded-md">
                  <Carousel
                    swipeable={true}
                    draggable={true}
                    showDots={true}
                    responsive={responsive}
                    ssr={true} // means to render carousel on server-side.
                    // autoPlay={this.props.deviceType !== "mobile" ? true : false}
                    autoPlaySpeed={2000}
                    keyBoardControl={true}
                    customTransition="all .5"
                    transitionDuration={500}
                    containerClass="carousel-container"
                    removeArrowOnDeviceType={["tablet", "mobile"]}
                    // deviceType={this.props.deviceType}
                    dotListClass="custom-dot-list-style"
                    itemClass="carousel-item-padding-40-px"
                    className="mt-3">
                    {album.images.map((image) => {
                      return (
                        <img
                          src={image}
                          alt="Album Cover"
                          className="h-[250px]"
                        />
                      );
                    })}
                  </Carousel>

                  <p>{album.albumName}</p>
                  <p>{album.notes}</p>
                </div>
              );
            })}
          </div>
        ) : (
          <p>No Album Found</p>
        )}
      </div>
    </DashboardLayout>
  );
};

export default FriendClassroom;
