import React, { Component } from 'react';

class Product extends Component {
	constructor(props) {
		super(props);
		this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
	}
	handleCheckboxChange() {
		this.props.handler(this.props.data.sku);
	}

	render() {
		const p = this.props.data;

		return (
			<div>
				<h2>{p.name}</h2>
				<div className="body">
					<p>SKU: {p.sku}</p>
					<p>PRICE: ${p.price}</p>
					{p.type === 'Book' && <p>WEIGHT: kg{p.weight}</p>}
					{p.type === 'DVD' && <p>SIZE: MB {p.size}</p>}
					{p.type === 'Furniture' && (
						<p>
							DIM: cm {p.height}x{p.length}x{p.width}
						</p>
					)}
				</div>
				<div className="delete-checkbox">
					Delete:
					<input
						type="checkbox"
						onChange={this.handleCheckboxChange}
					/>
				</div>
			</div>
		);
	}
}
export default Product;
