import React, { Component } from 'react';
import { withRouter } from 'react-router';
import axios from 'axios';
import FurnInput from './FurnInput';
import DvdInput from './DvdInput';
import BookInput from './BookInput';
import Input from './Input';
import Select from './Select';

class Form extends Component {
	constructor(props) {
		super(props);
		this.state = {
			typeOptions: ['Book', 'DVD', 'Furniture'],
			name: '',
			price: '',
			type: ''
		};
		this.addProduct = this.addProduct.bind(this);
	}

	cancelAction(e) {
		e.preventDefault();
		this.props.history.push('/');
	}

	addProduct(e) {
		e.preventDefault();
		axios.post(
			'https://scandiwebshop.000webhostapp.com/add-product.php',
			JSON.stringify(this.state)
		);
		this.props.history.push('/');
	}

	render() {
		return (
			<form
				id="product_form"
				className="container"
				onSubmit={(e) => this.addProduct(e)}>
				<Select
					title={'Type *'}
					id={'productType'}
					options={this.state.typeOptions}
					placeholder={'Select Type'}
					tooltip={'Please, select product type'}
					handleChange={(e) =>
						this.setState({ type: e.target.value })
					}
				/>
				<Input
					type={'number'}
					title={'SKU *'}
					id={'sku'}
					placeholder={'#sku'}
					tooltip={'Next available sku'}
					handleChange={(e) => this.setState({ sku: e.target.value })}
				/>
				<Input
					type={'text'}
					title={'NAME *'}
					id={'name'}
					placeholder={'#name'}
					tooltip={'Please, provide name'}
					handleChange={(e) =>
						this.setState({ name: e.target.value })
					}
				/>
				<Input
					type={'number'}
					title={'PRICE ($) *'}
					id={'price'}
					placeholder={'#price'}
					tooltip={'Please, provide price in $ in decimal form'}
					handleChange={(e) =>
						this.setState({ price: e.target.value })
					}
				/>
				<BookInput
					type={'number'}
					title={'WEIGHT (kg) *'}
					id={'weight'}
					placeholder={'#weight'}
					tooltip={'Please, provide weight in kg in decimal form'}
					handleChange={(e) =>
						this.setState({ weight: e.target.value })
					}
					additional={this.state.type}
				/>

				<DvdInput
					type={'number'}
					title={'SIZE (MB) *'}
					id={'size'}
					placeholder={'#size'}
					tooltip={'Please, provide size in MB as whole numbers'}
					handleChange={(e) =>
						this.setState({ size: e.target.value })
					}
					additional={this.state.type}
				/>
				<FurnInput
					type={'number'}
					title={'HEIGHT (cm) *'}
					id={'height'}
					placeholder={'#height'}
					tooltip={'Please, provide height in cm in decimal form'}
					handleChange={(e) =>
						this.setState({ height: e.target.value })
					}
					additional={this.state.type}
				/>
				<FurnInput
					type={'number'}
					title={'WIDTH (cm) *'}
					id={'width'}
					placeholder={'#width'}
					tooltip={'Please, provide width in cm in decimal form'}
					handleChange={(e) =>
						this.setState({ width: e.target.value })
					}
					additional={this.state.type}
				/>
				<FurnInput
					type={'number'}
					title={'LENGTH (cm) *'}
					id={'length'}
					placeholder={'#length'}
					tooltip={'Please, provide length in cm in decimal form'}
					handleChange={(e) =>
						this.setState({ length: e.target.value })
					}
					additional={this.state.type}
				/>
				<button
					className="form_button"
					onClick={(e) => this.cancelAction(e)}>
					CANCEL
				</button>
				<button className="form_button" type="submit">
					Save
				</button>
				<i>
					<p>* All fields are required</p>
				</i>
			</form>
		);
	}
}

export default withRouter(Form);
