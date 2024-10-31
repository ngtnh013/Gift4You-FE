import React, { useState } from 'react';
import { FaFacebook } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { AiFillTwitterCircle } from "react-icons/ai";
const ProductDetailForm = () => {
  const [quantity, setQuantity] = useState(1);

  const increaseQuantity = () => setQuantity(quantity + 1);
  const decreaseQuantity = () => quantity > 1 && setQuantity(quantity - 1);

  return (
    <div className="flex gap-5 font-sans items-start mb-12">
      <div className="flex flex-row gap-5 pl-28 w-1/2">
        <div className="flex flex-col gap-2.5">
          <div className="w-24 h-24 bg-[#f4d7b2] rounded-lg"></div>
          <div className="w-24 h-24 bg-[#f4d7b2] rounded-lg"></div>
          <div className="w-24 h-24 bg-[#f4d7b2] rounded-lg"></div>
          <div className="w-24 h-24 bg-[#f4d7b2] rounded-lg"></div>
        </div>
        <div className="w-[500px] h-[500px] bg-[#f4d7b2] rounded-lg"></div>
      </div>

      <div className="flex flex-col w-1/2">
        <div className="mt-2.5">
          <span>Choose a Template: </span>
          <button className="bg-[#4d3d33] text-white border border-gray-300 px-3 py-2 rounded-full cursor-pointer ml-2">Christmas</button>
          <button className="border border-gray-300 px-3 py-2 rounded-full cursor-pointer ml-2">Birthday</button>
          <button className="border border-gray-300 px-3 py-2 rounded-full cursor-pointer ml-2">New Year</button>
        </div>

        <h2 className="text-3xl font-normal mt-2.5 mb-2.5">Christmas Gift</h2>

        <div className="mt-2.5">
          <div className="flex flex-col gap-1.5 mb-2.5">
            <span>Size</span>
            <div className="flex gap-2">
              <button className="bg-[#4d3d33] text-white border border-gray-300 px-3 py-2 rounded-lg cursor-pointer">L</button>
              <button className="bg-[#f4d7b2] border border-gray-300 px-3 py-2 rounded-lg cursor-pointer">XL</button>
              <button className="bg-[#f4d7b2] border border-gray-300 px-3 py-2 rounded-lg cursor-pointer">XS</button>
            </div>
          </div>

          <div className="flex flex-col gap-1.5 mb-2.5">
            <span>Material</span>
            <div className="flex gap-2">
              <button className="bg-[#4d3d33] text-white border border-gray-300 px-3 py-2 rounded-lg cursor-pointer">Paper</button>
              <button className="bg-[#f4d7b2] border border-gray-300 px-3 py-2 rounded-lg cursor-pointer">Fabric</button>
              <button className="bg-[#f4d7b2] border border-gray-300 px-3 py-2 rounded-lg cursor-pointer">Plastic</button>
            </div>
          </div>

          <div className="flex flex-col gap-1.5 mb-2.5">
            <span>Color</span>
            <div className="flex gap-2">
              <button className="w-5 h-5 rounded-full bg-[#4d3d33]"></button>
              <button className="w-5 h-5 rounded-full bg-black"></button>
              <button className="w-5 h-5 rounded-full bg-[#8c6239]"></button>
              <button className="w-5 h-5 rounded-full bg-white border border-black"></button>
            </div>
          </div>

          <div className="flex flex-col gap-1.5 mb-2.5">
            <span>Decoration</span>
            <div className="flex gap-2">
              <button className="w-12 h-12 bg-[#f4d7b2] border border-[#cd7f32] rounded"></button>
              <button className="w-12 h-12 bg-[#f4d7b2] border border-[#cd7f32] rounded"></button>
              <button className="w-12 h-12 bg-[#f4d7b2] border border-[#cd7f32] rounded"></button>
              <button className="w-12 h-12 bg-[#f4d7b2] border border-[#cd7f32] rounded"></button>
            </div>
          </div>
        </div>

        <div className="flex items-center mt-3.5">
          <div className="flex items-center gap-2.5">
            <button onClick={decreaseQuantity} className="bg-transparent border border-gray-300 px-4 py-0.5 text-2xl cursor-pointer">-</button>
            <span className="px-3">{quantity}</span>
            <button onClick={increaseQuantity} className="bg-transparent border border-gray-300 px-4 py-0.5 text-2xl cursor-pointer">+</button>
          </div>

          <div className="flex gap-2.5 ml-8">
            <button className="bg-transparent border border-gray-300 rounded px-3 py-2 cursor-pointer">Add to Cart</button>
            <button className="bg-transparent border border-gray-300 rounded px-3 py-2 cursor-pointer">+ Compare</button>
          </div>
        </div>

        <div className="flex items-center mt-2.5 font-bold text-lg pb-2">
            <div className="w-2/3 border-b-2 border-amber-400">
                <span className="text-3xl mr-2.5">10$</span>
                <span className="text-gray-500 text-sm pl-5 pt-4">10$ per unit</span>
            </div>
        </div>
        <div className="flex items-center mt-2 text-lg">
          <span className="text-gray-500 text-sm mr-1">SKU</span>
          <span className="text-gray-500 text-sm ml-12 mr-4">:</span>
          <span className="text-gray-500 text-sm">SS001</span>
        </div>
        <div className="flex items-center mt-2 text-lg">
          <span className="text-gray-500 text-sm">Category</span>
          <span className="text-gray-500 text-sm ml-5 mr-4">:</span>
          <span className="text-gray-500 text-sm">Gifts</span>
        </div>
        <div className="flex items-center mt-2 text-lg">
          <span className="text-gray-500 text-sm">Tags</span>
          <span className="text-gray-500 text-sm ml-12 mr-4">:</span>
          <span className="text-gray-500 text-sm">Gift, ChristMas, Home, Shop</span>
        </div>
        <div className="flex items-center mt-2 text-lg">
          <span className="text-gray-500 text-sm">Share</span>
          <span className="text-gray-500 text-sm ml-10 mr-4">:</span>
          <span className="flex text-gray-500 text-sm">
            <span className="text-xl text-[#8B4513] mr-4"><FaFacebook /></span>
            <span className="text-xl text-[#8B4513] mr-4"><FaLinkedin /></span>
            <span className="text-xl text-[#8B4513]"><AiFillTwitterCircle /></span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailForm;
