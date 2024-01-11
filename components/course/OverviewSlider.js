import React from "react";

const OverviewSlider = () => {
  return (
    <div className="carousel h-60 w-full mb-30 rounded-md">
      <div id="slide1" className="carousel-item relative w-full">
        <img src="/images/Carousel1.gif" className="w-full" />
        <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
          <a href="#slide5" className="btn btn-circle hover:bg-white">
            ❮
          </a>
          <a
            href="#slide2"
            className="btn btn-circle bg-blue-600 hover:bg-white">
            ❯
          </a>
        </div>
      </div>
      <div id="slide2" className="carousel-item relative w-full">
        <img src="/images/Carousel2.jpg" className="w-full" />
        <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
          <a href="#slide1" className="btn btn-circle hover:bg-white">
            ❮
          </a>
          <a
            href="#slide3"
            className="btn btn-circle bg-blue-600 hover:bg-white">
            ❯
          </a>
        </div>
      </div>
      <div id="slide3" className="carousel-item relative w-full">
        <img src="/images/Carousel3.jpg" className="w-full" />
        <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
          <a href="#slide2" className="btn btn-circle hover:bg-white">
            ❮
          </a>
          <a
            href="#slide4"
            className="btn btn-circle bg-blue-600 hover:bg-white">
            ❯
          </a>
        </div>
      </div>
      <div id="slide4" className="carousel-item relative w-full">
        <img src="/images/Carousel4.jpg" className="w-full" />
        <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
          <a href="#slide3" className="btn btn-circle hover:bg-white">
            ❮
          </a>
          <a
            href="#slide5"
            className="btn btn-circle bg-blue-600 hover:bg-white">
            ❯
          </a>
        </div>
      </div>
      <div id="slide5" className="carousel-item relative w-full">
        <img src="/images/Carousel5.jpg" className="w-full" />
        <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
          <a href="#slide4" className="btn btn-circle hover:bg-white">
            ❮
          </a>
          <a
            href="#slide1"
            className="btn btn-circle bg-blue-600 hover:bg-white">
            ❯
          </a>
        </div>
      </div>
    </div>
  );
};

export default OverviewSlider;
