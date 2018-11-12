
// External Libraries
import React, {Component} from 'react';

// Internal Libraries
import './Bill.css';
import '../../global/global.css';
import Participant from '../../components/Participant/Participant';

let cssClassName = 'Bill';

class Bill extends Component {

	constructor(props) {
		super(props);
		
		this.state = {
            products: {},
            participants: {}
        };
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
			<p className="text">Keep It SimBill!</p>
			<p style={{fontSize: '1.6em'}} className="text">The Simple Bill Splitting App that works Offline too. 
			No seriously, switch off your internet and enter this URL, it will still work</p>
			<Participant participants={this.state.participants} setParticipants={this.setParticipants}/>
		</div>;
	}
	
}

export default Bill;