
// External Libraries
import React, {Component, Fragment} from 'react';

// Internal Libraries
import './Modal.css';
import '../../global/global.css';

let cssClassName = 'Modal';

class Modal extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    calculatePriceToPay = () => {

        /*  no of participant = 3
            cost = 60  | cost = 60  
            amount = 2 | amount = -1 
            price = 120| price = 20  
        */

        /* 
            Akhilesh  : 170 | 300 -> -130 
            Anirudh   : 170 | 200 -> -30
            Anurag    : 170       -> 10 > 170 > Akhilesh(130) > Anirudh(30)
            Anirbhan  : 100       -> 100
            Aishwarya : 70        -> 70
        */

        /* 
            Akhilesh  : 170 | 300 -> -130 > 60
            Anirudh   : 170 | 200 -> -30
            Aishwarya : 70        -> 0 > Akhilesh(70) 
            Anirbhan  : 100       -> 10 > Akhilesh(60) > Anirudh(30) 
            Anurag    : 170       -> 170
        */

        let prices = [];
        let {participants, products} = this.props;

        for (let key in participants) {
            let obj = {name: key, bill: -participants[key].expenditure};
            for (let Key in products) {
                let price;
                if (products[Key].participants[key].amount===-1) {
                    price = products[Key].cost / Object.keys(products[Key].participants).length;
                } else {
                    price = products[Key].cost * products[Key].participants[key].amount;
                }
                obj.bill = obj.bill + price;
            }
            prices.push(obj);
        }

        /*final prices format : [{name :participant, bill: price - expenditure}] */

        let getters = [], payees = [];
        prices.sort((fp, sp) => {
            return fp.bill - sp.bill;
        });

        for (let price of prices) {
            if (price.bill<0) {
                getters.push(price);
            } else {
                payees.push(price);
            }
        } 
        for (let payee of payees) {
            let {bill} = payee; 
            for (let getter of getters) {
                if (bill>0) {
                    let diff = bill + getter.bill; 
                    if (diff<0) {
                        getter.bill += bill; 
                        payee[getter.name] = bill; 
                        bill = 0; 
                    } else {
                        payee[getter.name] = -getter.bill; 
                        getter.bill = 0;
                        bill = diff; 
                    }
                    payee.bill = bill;
                } else {

                }
            }
        }

        prices = [...getters, ...payees];
        console.log(prices);
        return prices;
    }

    render() {

        let prices = this.calculatePriceToPay();
        let Prices = [];

        for (let price of prices) {
            let pay = [];
            for (let key in price) {
                if (key!=='name' && price[key]!==0) {
                    if (key==='bill') {
                        pay.push(<p key={key} className={cssClassName+'subtext'}>
                            Towards Bill: <span className='highlight'>{price[key].toFixed(2)}
                            </span> or roughly <span className='highlight' style={{backgroundColor: 'var(--green-black)'}}>{Math.round(price[key])}</span> 
                        </p>);
                    } else {
                        pay.push(<p key={key} className={cssClassName+'subtext'}>
                            To {key}: <span className='highlight'>{price[key].toFixed(2)}
                            </span> or roughly <span className='highlight' style={{backgroundColor: 'var(--green-black)'}}>{Math.round(price[key])}</span> 
                        </p>);
                    }
                }
            }
            if (pay.length>0) {
                Prices.push(<Fragment key="random">
                    <div>
                        <p className={cssClassName+'subtext'} style={{fontSize: '1.6em', fontWeight: 'bold'}}>{price.name}</p>
                        {pay}
                    </div>
                    <div className='line' />
                </Fragment>);
            }
        }

        if (this.props.open) {
            return <Fragment>
                <div className={cssClassName}>
                    <p className={cssClassName+'title'}>Final Bill Details</p>
                    <p className='hint' style={{fontSize: '1.2em', paddingLeft: '8px'}}>Names that don't appear don't have to pay</p>
                    <div className='line'/>
                    {Prices}
                    <div className={cssClassName+'controls'}>
                        <button onClick={this.props.close} className={cssClassName+'btn whiteripple'}>Close</button>
                    </div>
                </div>
                <div className='backdrop' onClick={this.props.close}/>
            </Fragment>;
        } else {
            return null;
        }
    }
}

export default Modal;