import React, { Component } from 'react';
import axios from 'axios';
import Product from './Product';

class Products extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: [],
			deleteInfo: []
		};
		this.handler = this.handler.bind(this);
	}
	componentDidMount() {
		setTimeout(() => {
			this.getProducts();
		}, 500);
	}
	getProducts() {
		axios
			.get('https://scandiwebshop.000webhostapp.com/all-products.php')
			.then((res) => this.setState({ data: res.data.products }));
	}
	deleteSelected() {
		const deleteInfo = {
			info: this.state.deleteInfo
		};
		axios
			.post(
				'https://scandiwebshop.000webhostapp.com/delete-products.php',
				JSON.stringify(deleteInfo)
			)
			.then((res) => this.setState({ deleteInfo: [] }))
			.finally(() => this.getProducts());
	}
	handler(sku) {
		let newDeleteArray = this.state.deleteInfo.slice();
		if (newDeleteArray.includes(sku)) {
			newDeleteArray = newDeleteArray.filter((item) => {
				return item !== sku;
			});
		} else {
			newDeleteArray.push(sku);
		}
		this.setState({
			deleteInfo: newDeleteArray
		});
	}

	render() {
		const products = this.state.data;
		return (
			<div>
				<div style={{ display: 'flex' }}>
					<button
						className="form_button"
						style={{ marginLeft: 'auto' }}
						onClick={(e) => this.deleteSelected(e)}>
						MASS DELETE
					</button>
				</div>
				<ul className="listing">
					{products.map((item) => (
						<div key={item.sku}>
							<li>
								<Product data={item} handler={this.handler} />
							</li>
						</div>
					))}
				</ul>
			</div>
		);
	}
}
export default Products;
