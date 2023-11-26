import React, { useState, useEffect } from "react";

function Deletepage() {
  const [customers, setCustomers] = useState([]);
  const [number, setNumber] = useState("");
  const [deleteMessage, setDeleteMessage] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    fetch("http://localhost:3000/items")
      .then((response) => response.json())
      .then((data) => setCustomers(data))
      .catch((error) => console.log("Error fetching data:", error));
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:3000/items/${number}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setDeleteMessage(`Customer with number ${number} has been deleted.`);
        fetchData(); // Refresh the customer list after deletion
        alert(`Customer with number ${number} has been deleted.`);
      } else {
        setDeleteMessage(`Error deleting customer with number ${number}.`);
        alert(`Error deleting customer with number ${number}.`);
      }
    } catch (error) {
      console.log("Error deleting item:", error);
    }
  };

  return (
    <div>
      <div>
        <h2>Delete</h2>

        <input
          type="text"
          placeholder="Enter Customer Number to delete"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
        />
        <button onClick={handleDelete}>Delete</button>
      </div>
      <div>
        <p>{deleteMessage}</p>
        <table>
          <thead>
            <tr>
              <th>Customer Name</th>
              <th>Customer Number</th>
              <th>City</th>
              <th>State</th>
              <th>Pincode</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) => (
              <tr key={customer._id}>
                <td>{customer.name}</td>
                <td>{customer.number}</td>
                <td>{customer.city}</td>
                <td>{customer.state}</td>
                <td>{customer.pincode}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Deletepage;
