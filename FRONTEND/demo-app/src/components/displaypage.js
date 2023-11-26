import React, { useState, useEffect } from "react";


function Displaypage() {
	//CustomerName, CustomerNumber (Unique for a customer), City, State and Pincode.  
	const [customers, setCustomers] = useState([]);
	
	useEffect(() => {
		fetchData();
	}, []);

	const fetchData = () => {
		fetch("http://localhost:3000/items")
			.then((response) => response.json())
			.then((data) => setCustomers(data))
			.catch((error) => console.error("Error fetching data:", error));
	};

	return (
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
	);
}
export default Displaypage;
