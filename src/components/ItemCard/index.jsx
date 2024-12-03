import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../components/AuthProvider";
import gift1 from "../../assets/images/gift1.jpg";
import gift2 from "../../assets/images/gift2.jpg";
import gift3 from "../../assets/images/gift3.jpg";
import gift4 from "../../assets/images/gift4.jpg";
import gift5 from "../../assets/images/gift5.jpg";
import gift6 from "../../assets/images/gift6.jpg";
import gift7 from "../../assets/images/gift7.jpg";
import gift8 from "../../assets/images/gift8.jpg";
import gift9 from "../../assets/images/gift9.jpg";
import gift10 from "../../assets/images/gift10.jpg";
import gift11 from "../../assets/images/gift11.jpg";
import gift12 from "../../assets/images/gift12.jpg";
import gift13 from "../../assets/images/gift13.jpg";
import gift14 from "../../assets/images/gift14.jpg";
import gift15 from "../../assets/images/gift15.jpg";

// ItemCard Component
const ItemCard = ({ item }) => {
  const API_URL = import.meta.env.VITE_API_URL;
  const [inventoryDetails, setInventoryDetails] = useState([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const { auth } = useAuth();
  const navigate = useNavigate();

  const randomImages = [
    gift1,
    gift2,
    gift3,
    gift4,
    gift5,
    gift6,
    gift7,
    gift8,
    gift9,
    gift10,
    gift11,
    gift12,
    gift13,
    gift14,
    gift15,
  ];

  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    // Calculate the image URL only once when the component is mounted
    if (item.urlImg === "random") {
      const randomImage =
        randomImages[Math.floor(Math.random() * randomImages.length)];
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
    const selectedImageKey = "gift1"; // Replace with logic to select an image dynamically
    navigate("/place-order", {
      state: {
        template: item,
        selectedImageKey,
      },
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
      <p className="text-gray-500 text-sm mt-1">
        Total Sales: {item.totalSales}
      </p>

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
