import React, { useState } from "react";
import { RxCrossCircled } from "react-icons/rx";
import Link from "next/link";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setCart } from "@/redux/slice/cartSlice/cartSlice";

const Product = ({ product, onAddToCart }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [quantityLimitMessage, setQuantityLimitMessage] = useState("");
  const user = useSelector((state) => state.userReducer.user);
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    //
    axios
      .put("/api/user/cart", {
        userId: user._id,
        productId: product._id,
        quantity: 1,
      })
      .then((res) => dispatch(setCart(res.data.cart)));
  };

  const incrementQuantity = () => {
    if (quantity < 20) {
      setQuantity((prevQuantity) => prevQuantity + 1);
      setQuantityLimitMessage("");
    } else {
      setQuantityLimitMessage("Maximum quantity reached (5)");
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
      setQuantityLimitMessage("");
    } else {
      setQuantityLimitMessage("Minimum quantity reached (1)");
    }
  };
  return (
    <div className="relative w-[80%] h-[20rem] rounded overflow-hidden shadow-lg ml-3">
      <Link href={`webstore/product/${product?._id}`}>
        <img
          className="w-full h-40 object-cover mb-2 cursor-pointer"
          src={product?.image}
          alt={product?.title}
          // onClick={() => setModalOpen(true)}
        />
        <div className="px-6 py-2 bg-gray-800 text-white transition duration-300 ease-in-out transform hover:scale-105 hover:bg-gray-600">
          <div className="font-semibold text-center text-lg mb-2 truncate">
            {product?.title}
          </div>
          <p className="text-center text-base h-12">
            Price: {product?.price} BDT
          </p>
          <button
            onClick={handleAddToCart}
            className="w-full inline-flex justify-center rounded-lg text-sm font-semibold py-2.5 px-4 bg-white text-black hover:bg-blue-500">
            Add To Cart
          </button>
        </div>
      </Link>

      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 max-w-md">
            <h2 className="text-xl font-semibold mb-4">
              {product?.title}
              <button
                onClick={() => {
                  setModalOpen(false);
                  setQuantityLimitMessage("");
                }}
                className="mt-1 ml-[12rem] inline-flex justify-center items-center rounded-lg text-sm font-semibold py-1 px-1 bg-red-500 text-white hover:bg-red-700">
                <RxCrossCircled className="text-lg items-center" />
              </button>
            </h2>

            <img
              className="w-full h-64 object-cover mb-4"
              src={product?.image}
              alt={product?.title}
            />
            <p>ID: {product?.id}</p>
            <p>Price: {product?.price} BDT</p>
            <p>Product Code: {product?.productCode}</p>
            {quantityLimitMessage && (
              <div className="text-red-500 mb-2">{quantityLimitMessage}</div>
            )}
            <div className="flex items-center mb-2">
              <label className="mr-2 text-sm font-semibold">Quantity:</label>
              <button
                onClick={decrementQuantity}
                className="text-sm font-semibold py-1 px-2 bg-yellow-300 hover:bg-yellow-400 rounded transition duration-300 ease-in-out">
                -
              </button>
              <span className="mx-2 text-lg font-semibold">{quantity}</span>
              <button
                onClick={incrementQuantity}
                className="text-sm font-semibold py-1 px-2 bg-yellow-300 hover:bg-yellow-400 rounded transition duration-300 ease-in-out">
                +
              </button>
            </div>

            <div className="flex items-center mb-2"></div>

            <button className="mt-2 inline-flex justify-center rounded-lg text-sm font-semibold py-2.5 px-4 bg-blue-500 text-white hover:bg-blue-700">
              <Link href="/webstore/order">
                <h2 className="text-sm mb-0 ml-2">Order Now</h2>
              </Link>
            </button>
            <button className="mt-2 ml-2 inline-flex justify-center rounded-lg text-sm font-semibold py-2.5 px-4 bg-blue-500 text-white hover:bg-blue-700">
              <Link href="">
                <h2 className="text-sm mb-0 ml-2">Add To Cart</h2>
              </Link>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Product;
