import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../components/AuthProvider";
import { useNavigate } from "react-router-dom";

const CustomGift = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  const { auth } = useAuth();
  const navigate = useNavigate();

  const [inventoryItems, setInventoryItems] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [totalPrice, setTotalPrice] = useState(150000); // Base fee
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [orderLoading, setOrderLoading] = useState(false);
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  // Fetch inventory items
  useEffect(() => {
    const fetchInventoryItems = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${API_URL}/v1/inventory-items?page=${page}&size=10`, {
          headers: {
            Authorization: `Bearer ${auth?.accessToken}`,
            "Content-Type": "application/json",
          },
        });

        if (response.data.result) {
          setInventoryItems(response.data.data.content);
          setTotalPages(response.data.data.page.totalPages);
        }
      } catch (error) {
        console.error("Error fetching inventory items:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchInventoryItems();
  }, [auth?.accessToken, page]);

  // Fetch user phone number
  useEffect(() => {
    const fetchUserPhoneNumber = async () => {
      try {
        const response = await axios.get(`${API_URL}/v1/accounts/${auth?.userId}`, {
          headers: {
            Authorization: `Bearer ${auth?.accessToken}`,
            "Content-Type": "application/json",
          },
        });

        if (response.data.result) {
          setPhoneNumber(response.data.data.phoneNumber);
        }
      } catch (error) {
        console.error("Error fetching user phone number:", error);
      }
    };

    if (auth?.userId) {
      fetchUserPhoneNumber();
    }
  }, [auth?.userId, auth?.accessToken]);

  // Update total price
  useEffect(() => {
    const newTotalPrice = Object.entries(quantities).reduce((total, [itemId, qty]) => {
      const item = inventoryItems.find((item) => item.id === itemId);
      return total + (item ? item.price * qty : 0);
    }, 150000); // Base fee
    setTotalPrice(newTotalPrice);
  }, [quantities, inventoryItems]);

  const handleQuantityChange = (itemId, quantity) => {
    setQuantities((prev) => ({
      ...prev,
      [itemId]: Math.max(0, quantity),
    }));
  };

  const handlePlaceOrder = async () => {
    setOrderLoading(true);

    const orderDetailsRequest = Object.entries(quantities)
      .filter(([, qty]) => qty > 0)
      .map(([itemId, qty]) => ({
        inventoryItemId: itemId,
        quantity: qty,
      }));

    if (!address.trim()) {
      alert("Please enter your address.");
      setOrderLoading(false);
      return;
    }

    if (orderDetailsRequest.length === 0) {
      alert("Please select at least one item.");
      setOrderLoading(false);
      return;
    }

    const orderData = {
      description: "Custom Gift",
      totalPrice,
      accountId: auth?.userId,
      address,
      phoneNumber, // Add phoneNumber to the request
      orderDetailsRequest,
    };

    try {
      const response = await axios.post(`${API_URL}/v1/orders`, orderData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth?.accessToken}`,
        },
      });

      if (response.data.result) {
        alert("Order placed successfully!");
        navigate("/view-my-order");
      } else {
        alert("Failed to place order.");
      }
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Failed to place order.");
    } finally {
      setOrderLoading(false);
    }
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen p-6">
      <h1 className="text-2xl font-bold mb-6">Customize Your Gift</h1>
      <div className="mb-4">
        <label className="block font-medium mb-2">Address:</label>
        <input
          type="text"
          className="w-full p-2 border rounded"
          placeholder="Enter your address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </div>

      <div className="space-y-4">
        {inventoryItems.map((item) => (
          <div key={item.id} className="flex justify-between items-center border-b py-2">
            <div>
              <p className="font-bold">{item.name}</p>
              <p className="text-sm text-gray-600">{item.description}</p>
              <p className="text-sm">Price: {item.price.toLocaleString("en-US")} VND</p>
              <p className="text-sm">Stock: {item.stock}</p>
            </div>
            <div className="flex items-center space-x-2">
              <label htmlFor={`quantity-${item.id}`} className="font-medium">Qty:</label>
              <input
                id={`quantity-${item.id}`}
                type="number"
                min="0"
                value={quantities[item.id] || 0}
                onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value, 10))}
                className="w-16 p-2 text-center border rounded-md"
              />
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center mt-4">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          disabled={page === 0}
          onClick={() => setPage(page - 1)}
        >
          Previous
        </button>
        <p>
          Page {page + 1} of {totalPages}
        </p>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          disabled={page === totalPages - 1}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>

      <div className="mt-6">
        <p className="text-lg font-bold">Total Price: {totalPrice.toLocaleString("en-US")} VND</p>
        <button
          onClick={handlePlaceOrder}
          className="w-full bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 mt-4"
          disabled={orderLoading}
        >
          {orderLoading ? "Loading..." : "Place Order"}
        </button>
      </div>
    </div>
  );
};

export default CustomGift;
