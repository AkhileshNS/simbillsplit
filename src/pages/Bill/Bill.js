
// External Libraries
import React, {Component} from 'react';

// Internal Libraries
import './Bill.css';
import '../../global/global.css';
import Participant from '../../components/Participant/Participant';
import Product from '../../components/Product/Product';
import Modal from '../../components/Modal/Modal';
import Ink from 'react-ink';

let cssClassName = 'Bill';

class Bill extends Component {

	constructor(props) {
		super(props);
		
		this.state = {
            products: {},
			participants: {},
			open: false
        };
	}

	splitTheBill = () => {
		if (Object.keys(this.state.products).length>0 && Object.keys(this.state.participants).length>1) {
		  this.setState({open: true});
		} else {
		  alert('You need alteast two participants and one product to split a bill');
		}
	}

	setParticipants = (participants) => {
		this.setState({participants});
		console.log(participants);
	}

	setProducts = (products) => {
		this.setState({products});
		console.log(products);
	}

	render() {
		return <div className={cssClassName}>
			<Modal 
				open={this.state.open} 
				products={this.state.products} 
				participants={this.state.participants}
				close={() => this.setState({open: false})}
			/>
			<p className="text">Keep It Simple!!</p>
			<p style={{fontSize: '1.6em'}} className="text">The Simple Bill Splitting App that works Offline too. 
			No seriously, switch off your internet and enter this URL, it will still work</p>
			<Participant participants={this.state.participants} setParticipants={this.setParticipants}/>
			<Product participants={this.state.participants} products={this.state.products} setProducts={this.setProducts} />
			<button onClick={this.splitTheBill} className='finalBtn'>Split the Bill!<Ink /></button>
			<br />
		</div>;
	}
	
}

export default Bill;