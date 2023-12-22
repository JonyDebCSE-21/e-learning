import Layout from "@/components/layout/Layout";
import { setCart } from "@/redux/slice/cartSlice/cartSlice";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const SignleProductPage = () => {
  const user = useSelector((state) => state.userReducer.user);
  const dispatch = useDispatch();
  const [rating, setRating] = useState(null);
  const [opinion, setOpinion] = useState("");
  const [product, setProduct] = useState({});
  const ratings = [1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5];

  const router = useRouter();
  const { id } = router.query;

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      slidesToSlide: 3, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 2, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
  };

  const fetchProducts = () => {
    if (id) {
      axios
        .get("/api/user/product?id=" + id)
        .then((res) => setProduct(res.data.product));
    } else {
      return;
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [id]);

  const updateProductWithReview = async () => {
    console.log(opinion, rating);
    axios
      .post("/api/user/product/", { _id: product._id, opinion })
      .then((res) => {
        if (res.data) {
          setOpinion("");
          fetchProducts();
        }
      });
  };

  const handleAddToCart = () => {
    //
    axios
      .put("/api/user/cart", {
        userId: user?._id,
        productId: product._id,
        quantity: 1,
      })
      .then((res) => dispatch(setCart(res.data.cart)));
  };
  return (
    <Layout>
      <div className="p-10">
        {/* Product Details Section start */}
        <div className="flex  items-center gap-10">
          {/* product image */}
          <div className=" w-[30%] flex flex-col gap-10">
            <img src={product.image} alt="" />
            {/* <span className="text-xl">
              Stock:{" "}
              <span className="bg-black px-3 py-2 rounded text-white">
                {product.quantity}
              </span>
            </span> */}
          </div>
          {/* product details */}
          <div className="flex flex-col gap-4 self-start w-[60%] ">
            <h1 className="text-2xl font-bold tracking-wider">
              {product.title}
            </h1>
            <span className="bg-gray-400 px-2 py-2 w-[30%] rounded text-base">
              Price: BDT {product.price}{" "}
            </span>
            <div className="w-[20%]">
              <h3 className="text-lg border-b-2 border-black font-bold">
                Description
              </h3>
              <p>{product.description}</p>
            </div>

            <span
              onClick={handleAddToCart}
              className="bg-black px-3 py-1 text-white w-[30%] text-center rounded cursor-pointer">
              Add to cart
            </span>
          </div>
        </div>
        {/* Product Details Section end */}

        {/* Review add section start */}

        <div className="mt-5 p-2">
          <div className="p-2">
            <span className="text-xl font-bold ">Product Review</span>

            {product.reviews?.length > 0 ? (
              <Carousel
                swipeable={true}
                draggable={true}
                showDots={true}
                responsive={responsive}
                ssr={true} // means to render carousel on server-side.
                infinite={true}
                autoPlay={true}
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
                {product.reviews.map((review) => (
                  <div
                    style={{
                      backgroundColor: "#DBDCD9",
                      boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                    }}
                    className="text-black min-h-[300px] mx-2 p-3 mb-10">
                    <div className="flex justify-center items-center">
                      <img
                        className="w-[150px]"
                        src="https://png.pngtree.com/png-vector/20190223/ourmid/pngtree-profile-glyph-black-icon-png-image_691589.jpg"
                      />
                    </div>
                    <div className="text-center font-bold italic mt-2">
                      <span>&quot;{review}&quot;</span>
                    </div>
                  </div>
                ))}
              </Carousel>
            ) : (
              <div>No reviews available</div>
            )}
          </div>
          {/* <div className="flex items-center gap-3">
            <span>Rating: </span>
            <select
              name=""
              id=""
              value={rating}
              onChange={(e) => setRating(e.target.value)}>
              {ratings.map((r) => (
                <option className="p-2" value={rating}>
                  {r}
                </option>
              ))}
            </select>
          </div> */}
          <span className="text-xl font-bold block ">
            Say something about this Product?
          </span>
          <textarea
            className="mt-2 p-2 block w-[100%] md:w-[50%] resize-none"
            rows={4}
            cols={40}
            placeholder="Type your review"
            name="review"
            value={opinion}
            onChange={(e) => setOpinion(e.target.value)}
            onKeyPress={(e) => {
              if (e.key == "Enter") {
                document.getElementById("save-button").click();
              }
            }}></textarea>
          <button
            id="save-button"
            className="bg-black text-white rounded px-5 py-2 mt-2 mb-5"
            onClick={() => {
              updateProductWithReview();
              // notify()
            }}>
            Save
          </button>
          <Toaster position="top-right" reverseOrder={false} />
        </div>
        {/* Review add section end */}
      </div>
    </Layout>
  );
};

export default SignleProductPage;
