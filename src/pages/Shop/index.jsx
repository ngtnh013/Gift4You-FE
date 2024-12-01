import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// ItemCard Component
const ItemCard = ({ item, onClick }) => {
  return (
    <div
      className="border rounded-lg shadow p-4 flex flex-col items-center cursor-pointer"
      onClick={() => onClick(item.id)}
    >
      <div className="w-32 h-32 bg-[#f4d7b2] flex items-center justify-center rounded-lg mb-4">
        <span className="text-gray-600 font-bold">{item.name[0]}</span>
      </div>
      <h3 className="text-lg font-bold">{item.name}</h3>
      <p className="text-gray-500 text-sm mt-1">{item.description}</p>
      <p className="text-gray-700 font-semibold mt-2">${item.price}</p>
    </div>
  );
};

const ShopPage = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();


  // Check if the user is logged in
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      // Redirect to login if not logged in
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    // Fetch items from the API
    const fetchItems = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const response = await axios.get("/api/v1/inventory-items?page=0&size=10", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.data.result) {
          setItems(response.data.data.content);
        }
      } catch (error) {
        console.error("Error fetching items:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchItems();
  }, []);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  // Navigate to Product Detail Page
  const handleItemClick = (itemId) => {
    navigate(`/product/${itemId}`);
  };

  return (
    <div className="min-h-screen p-6">
      <h1 className="text-2xl font-bold mb-6">Shop Items</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {items.length > 0 ? (
          items.map((item) => (
            <ItemCard key={item.id} item={item} onClick={handleItemClick} />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">No items available.</p>
        )}
      </div>
    </div>
  );
};

export default ShopPage;
