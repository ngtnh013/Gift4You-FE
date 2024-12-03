import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom"; 
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


const PlaceOrder = () => {

    const API_URL = import.meta.env.VITE_API_URL;

    const images = [
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

    const { state } = useLocation();
    const { template, selectedImageKey } = state;
  
    const selectedImage = images[selectedImageKey];

  const { auth } = useAuth(); 
  const navigate = useNavigate(); 

  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [inventoryItems, setInventoryItems] = useState([]); 
  const [quantities, setQuantities] = useState(1); 
  const [totalPrice, setTotalPrice] = useState(0); 
  const [templateDetails, setTemplateDetails] = useState(null); 
  const [phoneNumber, setPhoneNumber] = useState(""); 

  useEffect(() => {
    const fetchTemplateDetails = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${API_URL}/v1/template/${template.id}`, {
          headers: {
            Authorization: `Bearer ${auth?.accessToken}`,
            "Content-Type": "application/json",
          },
        });

        if (response.data.result) {
          setTemplateDetails(response.data.data); 
          const inventoryDetails = await Promise.all(
            response.data.data.templateDetails.map(async (detail) => {
              try {
                const itemResponse = await axios.get(
                  `${API_URL}/v1/inventory-items/${detail.inventoryItemId}`,
                  {
                    headers: {
                      Authorization: `Bearer ${auth?.accessToken}`,
                      "Content-Type": "application/json",
                    },
                  }
                );
                return itemResponse.data.result ? itemResponse.data.data : null;
              } catch (error) {
                console.error(
                  `Error fetching inventory item ${detail.inventoryItemId}:`,
                  error
                );
                return null;
              }
            })
          );
          setInventoryItems(inventoryDetails.filter((item) => item !== null));
        }
      } catch (error) {
        console.error("Error fetching template details:", error);
      } finally {
        setLoading(false);
      }
    };

    if (template.id) {
      fetchTemplateDetails();
    }
  }, [template.id, auth?.accessToken]);

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

  useEffect(() => {
    if (templateDetails && quantities > 0) {
      setTotalPrice(templateDetails.price * quantities);
    }
  }, [templateDetails, quantities]);

  const handlePlaceOrder = async (event) => {
    event.preventDefault();
    setLoading(true);

    const orderDetails = templateDetails?.templateDetails.map((detail) => ({
      quantity: detail.quantity,
      inventoryItemId: detail.inventoryItemId,
    }));

    const orderData = {
      address,
      description: templateDetails?.description,
      totalPrice,
      accountId: auth?.userId,
      phoneNumber,
      templateId: template.id,
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
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-6">
      <h1 className="text-2xl font-bold mb-6">Place Order</h1>
      <div className="flex flex-col items-center bg-white shadow p-6 rounded-lg">
        {templateDetails ? (
          <>
            <img
              src={selectedImage || templateDetails.urlImg}
              alt={templateDetails.description}
              className="w-32 h-32 rounded-lg mb-4"
            />
            <h3 className="text-lg font-bold">{templateDetails.description}</h3>
            <p className="mt-2">
              Price per Combo: {templateDetails.price.toLocaleString("en-US")} VND
            </p>
          </>
        ) : (
          <p>Loading template details...</p>
        )}

        <form onSubmit={handlePlaceOrder} className="w-full max-w-sm mt-4">
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded mb-3"
            placeholder="Enter address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />

          <div className="space-y-4">
            <p className="font-semibold">Items in Combo:</p>
            {inventoryItems.length > 0 ? (
              inventoryItems.map((item, index) => {
                const quantity =
                  templateDetails?.templateDetails[index]?.quantity || 1;
                return (
                  <div
                    key={item.id}
                    className="flex justify-between items-center"
                  >
                    <span>
                      {item.name} x{quantity}
                    </span>
                  </div>
                );
              })
            ) : (
              <p className="text-gray-500">Loading inventory details...</p>
            )}
          </div>

          <p className="mt-4 text-lg">
            Quantity:{" "}
            <div className="flex items-center space-x-2">
              <input
                type="number"
                className="w-12 p-2 text-center border border-gray-300 rounded-md"
                value={quantities}
                min="1"
                onChange={(e) => setQuantities(parseInt(e.target.value, 10))}
              />
            </div>
          </p>
          <p className="mt-4 text-lg font-bold">
            Total Price: {totalPrice.toLocaleString("en-US")} VND
          </p>

          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600"
            disabled={loading}
          >
            {loading ? "Loading..." : "Place Order"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PlaceOrder;
