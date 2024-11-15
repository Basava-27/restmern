import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import "./restaurant.css";

const Restaurant = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [restaurantId, setRestaurantId] = useState("");
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch all restaurants
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/getall");
        setRestaurants(response.data);
      } catch (error) {
        console.log(error);
        toast.error("Failed to load restaurants", { position: "top-right" });
      }
    };

    fetchData();
  }, []);

  // Delete a restaurant
  const deleteRestaurant = async (restaurantId) => {
    try {
      const response = await axios.delete(`http://localhost:8000/api/delete/${restaurantId}`);
      toast.success(response.data.msg, { position: "top-right" });
      setRestaurants((prevRestaurants) =>
        prevRestaurants.filter((restaurant) => restaurant._id !== restaurantId)
      );
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete restaurant", { position: "top-right" });
    }
  };

  // Fetch restaurant by ID
  const getRestaurantById = async () => {
    if (!restaurantId.trim()) {
      toast.error("Please enter a valid Restaurant ID", { position: "top-right" });
      return;
    }

    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:8000/api/getone/${restaurantId}`);
      setSelectedRestaurant(response.data);
      toast.success("Restaurant fetched successfully", { position: "top-right" });
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch the restaurant", { position: "top-right" });
      setSelectedRestaurant(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="restaurantManager">
      <h1>Restaurant Manager</h1>

      {/* Section for fetching restaurant by ID */}
      <div className="getOneByIdSection">
        <h2>Get Restaurant by ID</h2>
        <div className="inputContainer">
          <input
            type="text"
            placeholder="Enter Restaurant ID"
            value={restaurantId}
            onChange={(e) => setRestaurantId(e.target.value)}
            className="inputField"
          />
          <button onClick={getRestaurantById} className="getButton">
            {loading ? "Loading..." : "Get Restaurant"}
          </button>
        </div>

        {selectedRestaurant && (
          <div className="restaurantDetails">
            <h3>Restaurant Details</h3>
            <p><b>Name:</b> {selectedRestaurant.name}</p>
            <p><b>Type:</b> {selectedRestaurant.type}</p>
            <p><b>Rating:</b> {selectedRestaurant.rating}</p>
            <p><b>Location:</b> {selectedRestaurant.location}</p>
            <p><b>Top Food:</b> {selectedRestaurant.top_food}</p>
          </div>
        )}

        {!loading && !selectedRestaurant && restaurantId.trim() && (
          <p className="noResult">No restaurant found with the given ID.</p>
        )}
      </div>

      {/* Section for displaying all restaurants */}
      <div className="restaurantTable">
        <h2>All Restaurants</h2>
        <table border={1} cellPadding={10} cellSpacing={2}>
          <thead>
            <tr>
              <th>S.No.</th>
              <th>Restaurant Name</th>
              <th>Type</th>
              <th>Rating</th>
              <th>Location</th>
              <th>Top Items</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {restaurants.map((restaurant, index) => (
              <tr key={restaurant._id}>
                <td>{index + 1}</td>
                <td>{restaurant.name}</td>
                <td>{restaurant.type}</td>
                <td>{restaurant.rating}</td>
                <td>{restaurant.location}</td>
                <td>{restaurant.top_food}</td>
                <td className="actionButtons">
                  <Link to={`/edit/${restaurant._id}`} className="editButton">
                    Edit
                  </Link>
                  <button
                    onClick={() => deleteRestaurant(restaurant._id)}
                    className="deleteButton"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Link to={"/add"} className="addButton">
          Add Restaurant
        </Link>
      </div>
    </div>
  );
};

export default Restaurant;
