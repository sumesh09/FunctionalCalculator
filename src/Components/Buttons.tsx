import React from "react";
import "../Calculator.css";
import $ from 'jquery';

interface Iprops  {
    handleOnPress : (value: string) => void
}
const Buttons = ({handleOnPress}: Iprops) => {
    const onPressClick = (event: any) => {
        const value: string = $(event.target).text();
        handleOnPress(value);
    };
    return(
        <div className="buttons-contanier">
            <div className="button-row">
                <button className="top" onClick={onPressClick}>C</button>
                <button className="top" onClick={onPressClick}>+/-</button>
                <button className="top" onClick={onPressClick}>%</button>
                <button className="last-button" onClick={onPressClick}>÷</button>
            </div>
            <div className="button-row">
                <button onClick={onPressClick}>7</button>
                <button onClick={onPressClick}>8</button>
                <button onClick={onPressClick}>9</button>
                <button className="last-button" onClick={onPressClick}>*</button>
            </div>
            <div className="button-row">
                <button onClick={onPressClick}>4</button>
                <button onClick={onPressClick}>5</button>
                <button onClick={onPressClick}>6</button>
                <button className="last-button" onClick={onPressClick}>-</button>
            </div>
            <div className="button-row">
                <button onClick={onPressClick}>1</button>
                <button onClick={onPressClick}>2</button>
                <button onClick={onPressClick}>3</button>
                <button className="last-button" onClick={onPressClick}>+</button>
            </div>
            <div className="button-row">
                <button className="zero-btn" onClick={onPressClick}>0</button>
                <button className="decimal-btn" onClick={onPressClick}>.</button>
                <button className="last-button equal-sign-btn" onClick={onPressClick}>=</button>
            </div>
        </div>
    )
};
export default Buttons;