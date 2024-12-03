import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../components/AuthProvider";

// ItemCard Component
const ItemCard = ({ item }) => {
    const API_URL = import.meta.env.VITE_API_URL;
  const [inventoryDetails, setInventoryDetails] = useState([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const { auth } = useAuth();
  const navigate = useNavigate();

  const randomImages = [
    "/images/gift1.jpg",
    "/images/gift2.jpg",
    "/images/gift3.jpg",
    "/images/gift4.jpg",
    "/images/gift5.jpg",
    "/images/gift6.jpg",
    "/images/gift7.jpg",
    "/images/gift8.jpg",
    "/images/gift9.jpg",
    "/images/gift10.jpg",
    "/images/gift11.jpg",
    "/images/gift12.jpg",
    "/images/gift13.jpg",
    "/images/gift14.jpg",
    "/images/gift15.jpg",
  ];

  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    // Calculate the image URL only once when the component is mounted
    if (item.urlImg === "random") {
      const randomImage = randomImages[Math.floor(Math.random() * randomImages.length)];
      setImageUrl(randomImage);
    } else {
      setImageUrl(item.urlImg);
    }
  }, [item.urlImg]); // Only re-run when item.urlImg changes

  // Fetch inventory details
  useEffect(() => {
    const fetchInventoryDetails = async () => {
      const details = await Promise.all(
        item.templateDetails.map(async (detail) => {
          try {
            const response = await axios.get(
              `${API_URL}/v1/inventory-items/${detail.inventoryItemId}`,
              {
                headers: {
                  Authorization: `Bearer ${auth?.accessToken}`,
                  "Content-Type": "application/json",
                },
              }
            );
            if (response.data.result) {
              return {
                name: response.data.data.name,
                stock: response.data.data.stock,
              };
            }
          } catch (error) {
            console.error(
              `Error fetching inventory item ${detail.inventoryItemId}:`,
              error
            );
            return null;
          }
        })
      );
      setInventoryDetails(details.filter((detail) => detail !== null));
    };

    fetchInventoryDetails();
  }, [item.templateDetails, auth?.accessToken]);

  const handlePlaceOrder = () => {
    // Pass item data and imageUrl to the PlaceOrder component
    navigate("/place-order", {
      state: { template: item, selectedImage: imageUrl },
    });
  };

  return (
    <div className="border rounded-lg shadow p-4 flex flex-col items-center">
      <img
        src={imageUrl}
        alt={item.description}
        className="w-32 h-32 rounded-lg mb-4"
      />
      <h3 className="text-lg font-bold text-center">{item.description}</h3>
      <p className="text-gray-700 font-semibold mt-2">
        Price: {item.price.toLocaleString("en-US")} VND
      </p>
      <p className="text-gray-500 text-sm mt-1">Total Sales: {item.totalSales}</p>

      <div className="mt-4 text-sm w-full">
        <button
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-all"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? "Hide Combo Items" : "Show Combo Items"}
        </button>
        {isExpanded && (
          <div className="bg-gray-100 mt-3 p-3 rounded-lg">
            <p className="font-semibold mb-2 text-center">Items in Combo:</p>
            <ul className="space-y-2">
              {inventoryDetails.map((detail, index) => (
                <li
                  key={index}
                  className="bg-white shadow rounded p-2 flex justify-between items-center"
                >
                  <span>{detail.name}</span>
                  <span className="text-gray-600">Stock: {detail.stock}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <button
        onClick={handlePlaceOrder}
        className="mt-4 bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600"
      >
        Place Order
      </button>
    </div>
  );
};

export default ItemCard;
