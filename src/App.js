import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Form from './forms/Form';
import Products from './forms/Products';

export default function App() {
	return (
		<div id="container">
			<Router>
				<div>
					<Link to="/">
						<button className="form_button">All products</button>
					</Link>
					<Link to="/add-product">
						<button className="form_button">ADD</button>
					</Link>
					<Switch>
						<Route exact path="/">
							<Products />
						</Route>
						<Route path="/add-product">
							<Form />
						</Route>
					</Switch>
				</div>
			</Router>
		</div>
	);
}
