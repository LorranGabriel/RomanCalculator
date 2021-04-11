import React from "react";
import './Button.css';

const isOperator = val => {
    return (/[a-zA-Z]/).test(val) || val === "." || val === "=";
}

export const Button = props => (
    <div 
        className={`button-wrapper ${
            isOperator(props.children) ? null : "operator"
        }`}
        onClick={() => props.handleClick(props.children)}
    >
        {props.children}
    </div>
)

