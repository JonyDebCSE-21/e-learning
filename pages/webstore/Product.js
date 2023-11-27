import React, { useState } from "react";

const Product = ({ product, onAddToCart }) => {
  const [modalOpen, setModalOpen] = useState(false);

  const handleAddToCart = () => {
    onAddToCart(product);
  };

  return (
    <div className="relative w-full max-w-[15rem] h-[20rem] rounded overflow-hidden shadow-lg ml-3">
      <img
        className="w-full h-40 object-cover mb-2 cursor-pointer"
        src={product?.image}
        alt={product?.title}
        onClick={() => setModalOpen(true)}
      />
      <div className="px-6 py-2 bg-gray-800 text-white transition duration-300 ease-in-out transform hover:scale-105 hover:bg-gray-600">
        <div className="font-semibold text-center text-lg mb-2">
          {product?.title}
        </div>
        <p className="text-center text-base h-24">
          Price: {product?.price} BDT
        </p>
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gray-900 opacity-0 hover:opacity-100 transition-opacity">
          <button
            onClick={handleAddToCart}
            className="w-full inline-flex justify-center rounded-lg text-sm font-semibold py-2.5 px-4 bg-white text-black hover:bg-blue-500">
            Add to Cart
          </button>
        </div>
      </div>

      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 max-w-md">
            <h2 className="text-xl font-semibold mb-4">{product?.title}</h2>
            <img
              className="w-full h-64 object-cover mb-4"
              src={product?.image}
              alt={product?.title}
            />
            <p>ID: {product?.id}</p>
            <p>Price: {product?.price} BDT</p>
            <p>Product Code: {product?.productCode}</p>
            <button
              onClick={() => setModalOpen(false)}
              className="mt-4 inline-flex justify-center rounded-lg text-sm font-semibold py-2.5 px-4 bg-blue-500 text-white hover:bg-blue-700 ">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Product;
