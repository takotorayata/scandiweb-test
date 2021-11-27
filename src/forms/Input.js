import React, { Component } from 'react';
import axios from 'axios';

class Input extends Component {
	constructor(props) {
		super(props);
		this.state = {
			nextSku: ''
		};
	}
	componentDidMount() {
		axios
			.get('https://scandiwebshop.000webhostapp.com/next-sku.php')
			.then((nextVal) => this.setState({ nextSku: nextVal.data.sku }));
	}

	render() {
		return (
			<div>
				<label className="tooltip" htmlFor={this.props.name}>
					{this.props.title}
					<span className="tooltiptext">{this.props.tooltip}</span>
				</label>
				<input
					id={this.props.id}
					name={this.props.name}
					type={this.props.type}
					step=".01"
					value={
						this.props.id === 'sku'
							? this.state.nextSku
							: this.props.value
					}
					onChange={(e) => this.props.handleChange(e)}
					placeholder={this.props.placeholder}
					required
				/>
			</div>
		);
	}
}
export default Input;
