
// External Libraries
import React, {Component, Fragment} from 'react';
import Ink from 'react-ink';

// Internal Libraries
import './Product.css';
import Button from '../Button/Button';

class Product extends Component {

	constructor(props) {
		super(props);
		
		this.state = {
			name: '',
			cost: '0',
			participant: {
				name: '',
				amount: '0'
			},
			participants: {},
			btn1Text: "Add",
			btn2Text: "Add"
		};
	}

	onChange = (e, name) => {
		if (name==='name') {
			if ('products' in this.props) {
				let {products} = this.props;
				if (e.target.name in products) {
					this.setState({btn2Text: "Set"});
				} else {
					this.setState({btn2Text: "Add"});
				}
			}
		}
		this.setState({
			[name]: e.target.value
		});
	}

	changeParticipant = (e, name) => {
		let {participant} = this.state;
		participant[name] = e.target.value;
		this.setState({participant});
		if (name==='name'){
			if (name in this.state.participants) {
				this.setState({btn1Text: "Set"});
			} else {
				this.setState({btn1Text: "Add"});
			}	
		}
	}

	addProduct = () => {
		let products = {...this.props.products};
		let {name, cost} = this.state;
		let participants = {...this.state.participants};
		if (name!=='' && cost!=='' && Object.keys(participants).length>1) {
			products[name] = {name, cost, participants};
			this.setState({
				name: "",
				cost: '0',
				participants: {},
				btn2Text: "Add"
			});
			this.props.setProducts(products);
		} else {
			alert("name and cost cannot be empty and you need atleast 2 participants");
		}
	}

	loadProduct = Name => {
		let products = {...this.props.products};
		let {name, cost, participants} = products[Name];
		this.setState({name, cost, participants, btn2Text: "Set"});
	}

	removeProduct = () => {
		let products = {...this.props.products};
		let {name} = this.state;
		delete products[name];
		this.setState({
			name: '',
			cost: "0",
			btn2Text: 'Add'
		});
		this.props.setProducts(products);
	}

	addParticipant = () => {
		let participants = {...this.state.participants};
		let {name, amount} = this.state.participant;
		if (name!=='' && amount!=='') {
			if (amount.includes('/')){
				let Amount = amount.split('/');
				amount = parseFloat(Amount[0])/parseFloat(Amount[1]);
			} else {
				amount = parseFloat(amount);
			}
			participants[name] = {
				name,
				amount
			};
			this.setState({participants, btn1Text:"Set"});
		} else {
			alert('name and amount cannot be empty ,and you cannot use duplicate names');
		}
	}

	loadParticipant = name => {
		let participants = {...this.state.participants};
		let participant = participants[name];
		this.setState({participant, btn1Text: "Set"});
	}

	removeParticipant = name => {
		let participants = {...this.state.participants};
		delete participants[name];
		this.setState({participants, participant: {name:'', amount: '0'}, btn1Text: "Add"});
	}

	render() {

		let rmButton = null, button = null, amount = null, options = [], boxes = [], hint = null, Products = [], rmProductButton = null;

		if (this.state.btn1Text==='Set'){
			rmButton = <Fragment><span>   </span><Button onClick={this.removeParticipant}>Remove Participant</Button></Fragment>;
		}
		if (this.state.btn2Text==='Set'){
			rmProductButton = <Fragment><span>   </span><Button onClick={this.removeProduct}>Remove Product</Button></Fragment>;
		}
		options.push(<option value="" key={0} disabled hidden>Select Participant</option>);

		if ('participants' in this.props) {
			let {participants} = this.props;
			if (Object.keys(participants).length>0) {
				for (let name in participants) {
					options.push(<option key={name} value={name}>{name}</option>);
				}
			}
			if (this.state.participant.name!=='') {
				amount = <Fragment>
					<div className='title'>
						<p>Enter amount of product taken by participant: </p>
					</div>
					<div className='input'>
						<input placeholder='Cannot be empty' value={this.state.participant.amount} onChange={e => this.changeParticipant(e, 'amount')}/>
					</div>
				</Fragment>;
				button = <div className='button' style={{marginBottom: '16px'}}>
					<Button onClick={this.addParticipant}>{this.state.btn1Text} Participant</Button>
					{rmButton}
				</div>;
				hint = <div className='hint'>
					<p>type "-1" if you want to split the product expense evenly<br/>you can also enter fractions: for a pizza with 6 slices, if you had 2, type "2/6"</p>
				</div>;
			}
		}

		if ('participants' in this.state) {
			let {participants} = this.state;
			if (Object.keys(participants).length>0) {
				for (let name in participants) {
					boxes.push(<div key={name} onClick={() => this.loadParticipant(name)}>
						<p>{name}</p>
						<p>{participants[name].amount}</p>
						<Ink background={true}/>
					</div>);
				}
			}
		}

		if ('products' in this.props) {
			let {products} = this.props;
			if (Object.keys(products).length>0) {
				for (let name in products) {
					Products.push(<div key={name} onClick={() => this.loadProduct(name)}>
						<p>{name}</p>
						<p>{products[name].cost}</p>
						<Ink background={true}/>
					</div>);
				}
			}
		}

		return <Fragment> 
			<div className='box'>
				<div className='title'>
					<p>Enter a Product (Expense): </p>
				</div>
				<div className='input'>
					<input placeholder="Ex: Pizza, Clothing, Tax" value={this.state.name} onChange={e => this.onChange(e, 'name')}/>
				</div>
				<div className='title'>
					<p>Enter total cost of the product:</p>
				</div>
				<div className='input'>
					<input placeholder='Cannot be empty' value={this.state.cost} onChange={e => this.onChange(e, 'cost')}/>
				</div>
				<div className='line' />
				<div className='title'>
					<p>Choose a participant: </p>
				</div>
				<div className='select'>
					<select value={this.state.participant.name} onChange={e => this.changeParticipant(e, 'name')}>{options}</select>
				</div>
				{hint}
				{amount}
				{button}
				<div className='greenboxes'>
					{boxes}
				</div>
				<div className='line' />
				<div className='button'>
					<Button onClick={this.addProduct}>{this.state.btn2Text} Product</Button>
					{rmProductButton}
				</div>
			</div>
			<div className='boxes'>
				{Products}
			</div>
			<br />
		</Fragment>;
	}
	
}

export default Product;