import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../components/AuthProvider";
import ItemCard from "../../components/ItemCard";
import { FaGift } from "react-icons/fa"; // Example icon, you can change this to any other icon

const ShopPage = () => {
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0); // Pagination state
  const [totalPages, setTotalPages] = useState(0); // Total number of pages
  const { auth } = useAuth();

  useEffect(() => {
    const fetchTemplates = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`/api/v1/template?page=${page}&size=10`, {
          headers: {
            Authorization: `Bearer ${auth?.accessToken}`,
            "Content-Type": "application/json",
          },
        });

        if (response.data.result) {
          const validTemplates = await Promise.all(
            response.data.data.content.map(async (template) => {
              const allItemsAvailable = await Promise.all(
                template.templateDetails.map(async (detail) => {
                  try {
                    const itemResponse = await axios.get(
                      `/api/v1/inventory-items/${detail.inventoryItemId}`,
                      {
                        headers: {
                          Authorization: `Bearer ${auth?.accessToken}`,
                          "Content-Type": "application/json",
                        },
                      }
                    );
                    return (
                      itemResponse.data.result &&
                      itemResponse.data.data.stock > 0
                    );
                  } catch (error) {
                    console.error(
                      `Error checking inventory item ${detail.inventoryItemId}:`,
                      error
                    );
                    return false;
                  }
                })
              );
              return allItemsAvailable.every((isAvailable) => isAvailable)
                ? template
                : null;
            })
          );
          setTemplates(validTemplates.filter((template) => template !== null));
          setTotalPages(response.data.data.page.totalPages);
        }
      } catch (error) {
        console.error("Error fetching templates:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTemplates();
  }, [auth?.accessToken, page]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen p-6">
      <h1 className="text-2xl font-bold mb-6 flex items-center">
        <FaGift className="mr-2" />
        Gift Combos
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {templates.length > 0 ? (
          templates.map((template) => (
            <div key={template.id}>
              <ItemCard item={template} />
            </div>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">
            No gift combos available.
          </p>
        )}
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
    </div>
  );
};

export default ShopPage;
