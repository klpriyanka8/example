import React, { useState, useEffect } from "react";

function Searchpage() {
  const [customers, setCustomers] = useState([]);
  const [searchResult, setSearchResult] = useState(null);
  const [number, setNumber] = useState("");

  useEffect(() => {
    fetchData();
  }, [number]);

  const fetchData = () => {
    fetch("http://localhost:3000/items")
      .then((response) => response.json())
      .then((data) => setCustomers(data))
      .catch((error) => console.log("Error fetching data:", error));
  };

  const handleSearch = async () => {
    try {
      const response = await fetch(`http://localhost:3000/items/${number}`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setSearchResult(data);
    } catch (error) {
      console.log("Error searching for item:", error);
      setSearchResult(null);
      alert("Customer not found!");
    } finally {
      fetchData();
    }
  };

  return (
    <div>
      <div>
        <h2>Search</h2>

        <input
          type="text"
          placeholder="Enter Customer Number "
          value={number}
          onChange={(e) => setNumber(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <div>
        <h1>Result</h1>
        {searchResult ? (
          <div>
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
                <tr key={searchResult._id}>
                  <td>{searchResult.name}</td>
                  <td>{searchResult.number}</td>
                  <td>{searchResult.city}</td>
                  <td>{searchResult.state}</td>
                  <td>{searchResult.pincode}</td>
                </tr>
              </tbody>
            </table>
          </div>
        ) : (
          console.log("Customer Not found")
        )}
      </div>
    </div>
  );
}

export default Searchpage;
