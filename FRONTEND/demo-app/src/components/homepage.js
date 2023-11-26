import React, { useState, useEffect } from "react";
import {  Route,Routes,Link} from 'react-router-dom';

import Displaypage from "./createpage";

function HomePage() {
	//CustomerName, CustomerNumber (Unique for a customer), City, State and Pincode.  
	const [customers, setCustomers] = useState([]);
	const [name, setName] = useState("");
	const [number, setNumber] = useState("");
	const [city,setCity]=useState("");
	const [state,setState]=useState("");
	const [pincode,setPincode]=useState("");
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
			})
			.catch((error) => console.error("Error creating item:", error));
	};

	const handleDelete = (id) => {
		fetch(`http://localhost:3000/items/${id}`, {
			method: "DELETE",
		})
			.then(() => fetchData())
			.catch((error) => console.error("Error deleting item:", error));
	};

	return (
		<div>
			
			<nav>
			<Link to="/">Home</Link>
			<Link to="/createpage">Create</Link>
			<Link to="/displaypage">Display</Link>
        		<Link to="/deletepage">Delete</Link>
      		</nav>
				<Routes>
					<Route path="/" /><Route  />
					<Route path="/createpage" element={<Displaypage/>}/><Route  />
					<Route path="/displaypage" element={<Displaypage/>}/><Route  />
					<Route path="/deletepage" element={<Displaypage/>}/><Route  />
				</Routes>
			
		    
			<h1>CRUD Application</h1>
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
			<div>
				<h2>Cutomers</h2>

				<ul>
					<li><strong>Name        </strong><strong>City        </strong><strong>Number        </strong><strong>state        </strong><strong>Pincode        </strong></li>
					{customers.map((item) => (
						<li key={item._id}>
							{item.name}   {item.city} {item.number} {item.state} {item.pincode}
							<button onClick={() => handleDelete(item._id)}>Delete</button>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
}

/*
function App() {
	const [items, setCustomers] = useState([]);
	const [name, setName] = useState("");
	const [description, setDescription] = useState("");
	const [editItemId, setEditItemId] = useState(null); // Track the item being edited

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
			body: JSON.stringify({ name, description }),
		})
			.then(() => {
				fetchData();
				setName("");
				setDescription("");
			})
			.catch((error) => console.error("Error creating item:", error));
	};

	const handleEdit = (id) => {
		const itemToEdit = items.find((item) => item._id === id);
		if (itemToEdit) {
			setEditItemId(id);
			setName(itemToEdit.name);
			setDescription(itemToEdit.description);
		}
	};

	const handleUpdate = () => {
		fetch(`http://localhost:3000/items/${editItemId}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ name, description }),
		})
			.then(() => {
				fetchData();
				setName("");
				setDescription("");
				setEditItemId(null);
			})
			.catch((error) => console.error("Error updating item:", error));
	};

	const handleCancelEdit = () => {
		setEditItemId(null);
		setName("");
		setDescription("");
	};

	const handleDelete = (id) => {
		fetch(`http://localhost:3000/items/${id}`, {
			method: "DELETE",
		})
			.then(() => fetchData())
			.catch((error) => console.error("Error deleting item:", error));
	};

	return (
		<div>
			<h1>CRUD Application</h1>
			<div>
				<h2>Create/Edit Item</h2>
				<input
					type="text"
					placeholder="Name"
					value={name}
					onChange={(e) => setName(e.target.value)}
				/>
				<input
					type="text"
					placeholder="Description"
					value={description}
					onChange={(e) => setDescription(e.target.value)}
				/>
				{editItemId ? (
					<div>
						<button onClick={handleUpdate}>Update</button>
						<button onClick={handleCancelEdit}>Cancel</button>
					</div>
				) : (
					<button onClick={handleCreate}>Create</button>
				)}
			</div>
			<div>
				<h2>Items</h2>
				<ul>
					{items.map((item) => (
						<li key={item._id}>
							<strong>{item.name}</strong> - {item.description}
							<button onClick={() => handleEdit(item._id)}>Edit</button>
							<button onClick={() => handleDelete(item._id)}>Delete</button>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
}
*/
export default HomePage;
