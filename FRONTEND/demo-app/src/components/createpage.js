import React, { useState, useEffect } from "react";

function Createpage() {
  const [customers, setCustomers] = useState([]);
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pincode, setPincode] = useState("");

  useEffect(() => {
    fetchData();
    
  }, []);

  const fetchData = () => {
    fetch("http://localhost:3000/items")
      .then((response) => response.json())
      .then((data) => setCustomers(data))
      .catch((error) => console.error("Error fetching data:", error));
  };

  const handleCreate = () => {
    fetch("http://localhost:3000/items", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, number, city, state, pincode }),
    })
      .then(() => {
        fetchData();
        setName("");
        setNumber("");
        setCity("");
        setState("");
        setPincode("");
		//setMessage("Item created successfully!");
        alert("Item created successfully!"); // Use alert for success
      })
      .catch((error) => {
        console.error("Error creating item:", error);
        alert("Error creating item. Please try again."); // Use alert for error
      });
  };

  return (
    <div>
      <div>
        <h2>Create Item</h2>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Customer Number"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
        />
        <input
          type="text"
          placeholder="City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <input
          type="text"
          placeholder="State"
          value={state}
          onChange={(e) => setState(e.target.value)}
        />
        <input
          type="text"
          placeholder="Pincode"
          value={pincode}
          onChange={(e) => setPincode(e.target.value)}
        />
        <button onClick={handleCreate}>Create</button>
      </div>
    </div>
  );
}

export default Createpage;

