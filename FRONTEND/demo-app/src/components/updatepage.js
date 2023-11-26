import React, { useState } from "react";

function UpdatePage() {
  const [number, setNumber] = useState("");
  const [fetchedData, setFetchedData] = useState(null);
  const [updatedDetails, setUpdatedDetails] = useState({
    name: "",
    city: "",
    state: "",
    pincode: "",
  });

  const handleFetch = () => {
    fetch(`http://localhost:3000/items/${number}`)
      .then((response) => {
        if (!response.ok) {
          if (response.status === 404) {
            // Customer not found
            alert(`Customer with number ${number} not found.`);
          } else {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
        }
        return response.json();
      })
      .then((data) => {
        setFetchedData(data);
        setUpdatedDetails({
          name: data.name,
          city: data.city,
          state: data.state,
          pincode: data.pincode,
        });
      })
      .catch((error) => {
        setFetchedData(null);
        console.error("Error fetching item:", error);
      });
  };

  const handleUpdate = () => {
    fetch(`http://localhost:3000/items/${number}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedDetails),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setFetchedData(data);
        alert("Item updated successfully!");
      })
      .catch((error) => {
        console.error("Error updating item:", error.message);
        alert("Error updating item. Please try again.");
      });
  };

  return (
    <div>
      <h2>Update</h2>
      <input
        type="text"
        placeholder="Enter Customer Number to Update"
        value={number}
        onChange={(e) => setNumber(e.target.value)}
      />
      <button onClick={handleFetch}>Fetch Data</button>

      {fetchedData && (
        <div>
          <h3>Edit Details</h3>
          {/* Input fields for updated details */}
          <div>
            <label>Name:</label>
            <input
              type="text"
              value={updatedDetails.name}
              onChange={(e) =>
                setUpdatedDetails({
                  ...updatedDetails,
                  name: e.target.value,
                })
              }
            />
          </div>
          <div>
            <label>City:</label>
            <input
              type="text"
              value={updatedDetails.city}
              onChange={(e) =>
                setUpdatedDetails({
                  ...updatedDetails,
                  city: e.target.value,
                })
              }
            />
          </div>
          <div>
            <label>State:</label>
            <input
              type="text"
              value={updatedDetails.state}
              onChange={(e) =>
                setUpdatedDetails({
                  ...updatedDetails,
                  state: e.target.value,
                })
              }
            />
          </div>
          <div>
            <label>Pincode:</label>
            <input
              type="text"
              value={updatedDetails.pincode}
              onChange={(e) =>
                setUpdatedDetails({
                  ...updatedDetails,
                  pincode: e.target.value,
                })
              }
            />
          </div>
          {/* Add other input fields as needed */}
          <button onClick={handleUpdate}>Update</button>
        </div>
      )}
    </div>
  );
}

export default UpdatePage;
