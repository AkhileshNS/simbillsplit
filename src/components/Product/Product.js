
// External Libraries
import React, {Component, Fragment} from 'react';

// Internal Libraries
import './Product.css';
import '../../global/global.css';

class Product extends Component {

	constructor(props) {
		super(props);
		
		this.state = {
			name: '',
			cost: '0',
			amount: '0',
			participants: {}
		};
	}

	onTextChange = (e, name) => {
		this.setState({
			[name]: e.target.value
		})
	}

	render() {
		return <div className='box'>
			
		</div>;
	}
	
}

export default Product;