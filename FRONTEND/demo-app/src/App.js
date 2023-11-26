import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route,Routes,Link} from 'react-router-dom';

import Displaypage from "./components/displaypage";
import Createpage from "./components/createpage";
import Deletepage from "./components/deletepage";
import Searchpage from "./components/searchpage";
import UpdatePage from "./components/updatepage";
function App() {
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
			<h1>CRUD Application</h1>
			<Router>
			<nav>
			<Link to="/">Home  </Link><br></br>
			<Link to="/createpage">Create  </Link><br></br>
			<Link to="/displaypage">Display  </Link><br></br>
        	<Link to="/deletepage">Delete</Link><br></br>
			<Link to="/searchpage">Search</Link><br></br>
			<Link to="/updatepage">Update</Link><br></br>
      		</nav>
				<Routes>
					<Route path="/" /><Route  />
					<Route path="/createpage" element={<Createpage/>}/><Route  />
					<Route path="/displaypage" element={<Displaypage/>}/><Route  />
					<Route path="/deletepage" element={<Deletepage/>}/><Route  />
					<Route path="/searchpage" element={<Searchpage/>}/><Route  />
					<Route path="/updatepage" element={<UpdatePage/>}/><Route  />
				</Routes>
			</Router>
		    
			
			
		</div>
	);
}
export default App;
