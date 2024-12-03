import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../components/AuthProvider";

const ViewMyOrder = () => {
  const { auth } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0); // Pagination state
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `/api/v1/accounts/${auth?.userId}/orders?page=${page}&size=10`,
          {
            headers: {
              Authorization: `Bearer ${auth?.accessToken}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (response.data.result) {
          setOrders(response.data.data.content);
          setTotalPages(response.data.data.page.totalPages);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    if (auth?.userId) {
      fetchOrders();
    }
  }, [auth?.userId, auth?.accessToken, page]);

  return (
    <div className="min-h-screen p-6">
      <h1 className="text-2xl font-bold mb-6">My Orders</h1>
      {loading ? (
        <p>Loading orders...</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="bg-white shadow p-4 rounded-lg">
              <p><strong>Address:</strong> {order.address}</p>
              <p><strong>Description:</strong> {order.description}</p>
              <p><strong>Phone Number:</strong> {order.phoneNumber}</p>
              <p><strong>Total Price:</strong> {order.totalPrice.toLocaleString("en-US")} VND</p>
              <p><strong>Status:</strong> {order.status}</p>
            </div>
          ))}

          <div className="flex justify-between mt-4">
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded"
              disabled={page === 0}
              onClick={() => setPage(page - 1)}
            >
              Previous
            </button>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded"
              disabled={page === totalPages - 1}
              onClick={() => setPage(page + 1)}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewMyOrder;
