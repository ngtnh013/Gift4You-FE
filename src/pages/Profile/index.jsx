import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../components/AuthProvider";
import DefaultAvatar from "../../assets/character.png"; // Replace with your default avatar image path

function ProfilePage() {
  const { auth } = useAuth();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    gender: "",
  });

  // Fetch user data
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`/api/v1/accounts/${auth?.userId}`, {
          headers: {
            Authorization: `Bearer ${auth?.accessToken}`,
          },
        });
        const user = response.data.data;
        setUserData(user);
        setFormData({
          fullName: user.fullName || "",
          email: user.email || "",
          gender: user.gender || "",
        });
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch profile.");
      } finally {
        setLoading(false);
      }
    };

    if (auth?.userId) {
      fetchProfile();
    } else {
      setError("User ID not found. Please log in again.");
      setLoading(false);
    }
  }, [auth]);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSave = async () => {
    try {
      const response = await axios.put(
        `/api/v1/accounts/${auth?.userId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${auth?.accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      setUserData(response.data.data); // Update local data
      setIsEditing(false); // Exit edit mode
    } catch (err) {
      console.error("Error updating profile:", err.response?.data || err.message);
      alert("Failed to update profile.");
    }
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (error) {
    return <div className="min-h-screen flex items-center justify-center text-red-500">{error}</div>;
  }

  return (
    <div className="min-h-screen p-6 flex flex-col items-center">
      <div className="max-w-xl w-full bg-white shadow-md rounded-lg p-6">
        <div className="flex flex-col items-center mb-6">
          <img
            src={userData.urlImg || DefaultAvatar}
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover border"
          />
          {isEditing ? (
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              className="text-center font-bold text-xl border-b mt-4 focus:outline-none focus:border-blue-500 bg-blue-50"
              placeholder="Full Name"
            />
          ) : (
            <h2 className="text-xl font-bold mt-4">{userData.fullName}</h2>
          )}
        </div>
        <div className="space-y-4">
          {/* Editable fields */}
          {["email", "gender"].map((field) => (
            <div key={field} className="flex justify-between items-center">
              <span className="font-medium text-gray-600 capitalize">{field}:</span>
              {isEditing ? (
                <input
                  type="text"
                  name={field}
                  value={formData[field]}
                  onChange={handleInputChange}
                  className="text-gray-800 border-b focus:outline-none focus:border-blue-500 bg-blue-50"
                  placeholder={userData[field]}
                />
              ) : (
                <span className="text-gray-800">{userData[field]}</span>
              )}
            </div>
          ))}

          {/* Non-editable status field */}
          <div className="flex justify-between items-center">
            <span className="font-medium text-gray-600">Status:</span>
            <span
              className={`text-gray-800 capitalize ${
                userData.status === "active" ? "text-green-500" : "text-red-500"
              }`}
            > 
              {userData.status}
            </span>
          </div>
        </div>
        <div className="flex justify-end mt-6">
          {isEditing ? (
            <>
              <button
                className="px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400 text-black mr-2"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white"
                onClick={handleSave}
              >
                Save
              </button>
            </>
          ) : (
            <button
              className="px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white"
              onClick={() => setIsEditing(true)}
            >
              Edit
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
