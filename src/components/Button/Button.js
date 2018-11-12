
// External Libraries
import React, {Component} from 'react';
import Ink from 'react-ink';

let Style = {
    padding: "8px",
    backgroundColor: "var(--green-dark)",
    color: "var(--white)",
    borderRadius: "4px",
    fontFamily: "'Fira Sans', sans-serif",
    cursor: "pointer",
    outline: "none",
    fontweight: "bold",
    boxShadow: "var(--material-btn)",
    border: "none",
    position: 'relative'
};

class Button extends Component {
    render() {
        let ripple = <Ink background={true}/>;
        if ('color' in this.props) {
            Style.color = this.props.color;
        }

        if ('tint' in this.props) {
            Style.backgroundColor = this.props.tint;
        }

        return <button style={Style} {...this.props}>{this.props.children}{ripple}</button>;
    }
}

export default Button;