
// External Libraries
import React, {Component, Fragment} from 'react';
import Ink from 'react-ink';

// Internal Libraries
import './Participant.css';
import {checkNum} from '../../global/global';
import '../../global/global.css';
import Button from '../Button/Button';

class Participant extends Component {

	constructor(props) {
		super(props);
		
		this.state = {
			name: 'Akhilesh',
			expenditure: 300,
			btnText: 'Add'
		};
	}

	onChange = (e ,name) => {
		if (name==='expenditure') {
			if (checkNum(e.target.value)) {
				this.setState({[name]: e.target.value});
			}
		}
		if (name==='name') {
			if ('participants' in this.props) {
				if (e.target.value in this.props.participants) {
					this.setState({btnText: 'Set'});
				} else {
					this.setState({btnText: 'Add'});
				}
			}
			this.setState({[name]: e.target.value});
		}
	}

	addParticipant = () => {
		let participants = {...this.props.participants};
		let {name, expenditure} = this.state;
		if (name!=='' && expenditure!=='') {
			participants[name] = {name, expenditure: parseFloat(expenditure)};
			this.setState({
				name: '',
				expenditure: 0,
				btnText: 'Add'
			});
			this.props.setParticipants(participants);
		}
	}

	removeParticipant = () => {
		let participants = {...this.props.participants};
		let {name} = this.state;
		delete participants[name];
		this.setState({
			name: '',
			expenditure: 0,
			btnText: 'Add'
		});
		this.props.setParticipants(participants);
	}

	loadParticipant = name => {
		let participant = this.props.participants[name];
		this.setState({
			name, 
			expenditure: participant.expenditure,
			btnText: 'Set'
		});
	}

	render() {

		let removeButton = null;
		let boxes = [];
		if (this.state.btnText==='Set') {
			removeButton = <Fragment><span>  </span><Button onClick={this.removeParticipant}>Remove Participant</Button></Fragment>;
		}

		if ('participants' in this.props) {
			let {participants} = this.props;
			if (Object.keys(participants).length>0) {
				for (let name in participants) {
					boxes.push(<div key={name} onClick={() => this.loadParticipant(name)}>
						<p>{name}</p>
						<p>{participants[name].expenditure}</p>
						<Ink background={true}/>
					</div>);
				}
			}
		}

		return <Fragment> 
			<div className='box'>
				<div className='title'>
					<p>Enter Participant (Friend/Peer) Name: </p>
				</div>
				<div className='input'>
					<input type="text" placeholder="Example: John, Sarah" value={this.state.name} onChange={e => this.onChange(e, 'name')}/>
				</div>
				<div className='title'>
					<p>Enter paid amount (if already paid): </p>
				</div>
				<div className='input'>
					<input type="text" placeholder="This can't be empty" value={this.state.expenditure} onChange={e => this.onChange(e, 'expenditure')}/>
				</div>
				<div className='button'>
					<Button onClick={this.addParticipant}>{this.state.btnText} Participant</Button>
					{removeButton}
				</div>
			</div>
			<div className='boxes'>
				{boxes}
			</div>
		</Fragment>;
	}
	
}

export default Participant;