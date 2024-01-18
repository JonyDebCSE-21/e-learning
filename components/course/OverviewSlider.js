import React from "react";

const OverviewSlider = () => {
  return (
    <div className="carousel h-60 w-[95%] ml-6 mb-1 rounded-md relative">
      <div id="slide1" className="carousel-item relative w-full">
        <img src="/images/Carousel1.jpg" className="w-full" alt="Slide 1" />
        <div className="absolute left-5 right-5 top-0 bottom-0 flex items-center justify-between">
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
        <img src="/images/Carousel2.jpg" className="w-full" alt="Slide 2" />
        <div className="absolute left-5 right-5 top-0 bottom-0 flex items-center justify-between">
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
        <img src="/images/Carousel3.jpg" className="w-full" alt="Slide 3" />
        <div className="absolute left-5 right-5 top-0 bottom-0 flex items-center justify-between">
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
        <img src="/images/Carousel4.jpg" className="w-full" alt="Slide 4" />
        <div className="absolute left-5 right-5 top-0 bottom-0 flex items-center justify-between">
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
        <img src="/images/Carousel5.jpg" className="w-full" alt="Slide 5" />
        <div className="absolute left-5 right-5 top-0 bottom-0 flex items-center justify-between">
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
