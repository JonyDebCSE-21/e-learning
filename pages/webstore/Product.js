import React from "react";

const Product = ({ product }) => {
  return (
    <div className=" w-full max-w-[15rem] h-[20rem] rounded overflow-hidden shadow-lg ml-3">
      <img
        className="w-full h-40 object-cover mb-2"
        src={product?.image}
        alt={product?.title}
      />
      <div className="px-6 py-4 bg-gray-800 text-white transition duration-300 ease-in-out transform hover:scale-105 hover:bg-gray-600">
        <div className="font-semibold text-center text-lg mb-0">
          {product?.title}
        </div>
        <p className="text-center text-base h-40">
          ID: {product?.id}
          <br />
          Price: ${product?.price}
          <br />
          Promo Code: {product?.promoCode}
          {/* <div className="card-actions">
            <button className="btn btn-primary">Buy Now</button>
          </div> */}
          <button
            type="submit"
            class="inline-flex justify-center rounded-lg text-sm font-semibold py-2.5 px-4 bg-white text-black hover:bg-blue-500 w-3/4">
            Add to cart
          </button>
        </p>

        <div></div>
      </div>
    </div>
  );
};

export default Product;
