import { useMemo, useState } from "react";
import Buttons from "./Components/Buttons";
import React from "react";
import Inputs from "./Components/Inputs";
import { Operators } from "./Operation";
import "./Calculator.css"

const Calculator = () => {
    const [input, setInput] = useState<string | null>(null);
    const [total, setTotal] = useState<number>(0);
    const [hasError, setError] = useState<boolean>(false);
    const [oldInput, setoldInput] = useState<string | null>(null);
    const [showOldInput, setShowOldInput] = useState<boolean>(false);
    const [prevSymbol, setPrevSymbol] = useState<string | null>(null);
    const [equalSignPressed, setEqualSignPressed] = useState<boolean>(false);
    const currentInput: string | null = useMemo <string | null> (
        () => ( showOldInput ? oldInput : input), 
        [input, showOldInput]
    );
    
    const operations : Operators = {
        '+': (n1, n2) => n1 + n2,
        '-': (n1, n2) => n1 - n2,
        "*": (n1, n2) => n1*n2,
        "/": (n1, n2) => n1/n2,
        "%": (_n1, n2) => n2/100,
        "+/-":(_n1, n2) => n2*-1,
    };

    const clear = () => {
        setInput('0');
        setTotal(0);
        setError(false);
        setoldInput(null);
        setShowOldInput(false);
        setPrevSymbol(null);
        setEqualSignPressed(false);
    };

    const calculate = (
        buffer: number,
        currentTotal: number,
        symbol: string
    ): number => {
        return operations[symbol as keyof typeof operations](currentTotal, buffer);
    };

    const prepareNextOperation = (symbol: string) => {
        setPrevSymbol(symbol);
        setShowOldInput(true);
        setoldInput(input);
        setInput(null);
    };

    const handleOnClickPress = ( value: string) => {
        if(showOldInput) {
            setShowOldInput(false);
        } 
        const numValue: number = parseInt(value);
        if(Number.isNaN(numValue)) {
            handleSymbol(value);
        } else {
            storeNumToScreen(value);
            if(equalSignPressed) {
                setTotal(0);
            }
        }
        if(value !== '=') {
            setEqualSignPressed((value === '+/-' && equalSignPressed) 
                || value === '%' 
                || (value === '.' && equalSignPressed));
        }
    };

    const handleSymbol = (symbol: string) => {
        switch(symbol) {
            case 'C': 
                clear();
                break;
            case '=': 
                setEqualSignPressed(true);
                if(input === null || prevSymbol == null) return;
                const finalTotal: number = calculate(
                    parseFloat(input),
                    total,
                    prevSymbol
                );
                if(input === '0' && prevSymbol === '/') {
                    setError(true);
                    return;
                }
                setInput(finalTotal.toString());
                setPrevSymbol(null);
                if(showOldInput) setShowOldInput(false);
                break;
            case '%':
            case '+/-':
                if(input === null) {
                    return;
                }
                const changedValue : number = calculate (
                    parseFloat(input),
                    total, 
                    symbol
                );
                setInput(changedValue.toString());
                break;
            case '.': 
                if(!input?.includes(".")) {
                    storeNumToScreen(symbol);
                }
                break;
            case '+': 
            case '-':
            case '*':
            case '/':
                if(input === null || prevSymbol === null) {
                    if(prevSymbol === null) {
                        if(input !== null) setTotal(parseFloat(input));
                        prepareNextOperation(symbol);
                    }
                    return;
                }
                const newTotal: number = calculate(
                    parseFloat(input),
                    total,
                    prevSymbol
                );
                setTotal(newTotal);
                prepareNextOperation(symbol);
                break;
            default:
                break;
        }
    };

    const storeNumToScreen = (num: string) => {
        setInput(prev => prev === '0' || prev=== null || equalSignPressed && input?.charAt(0) !== '.' ? num : prev + num );
    };

    return(
        <div className="calculator-container">
            <Inputs input={currentInput  ?? "0"} hasError={hasError ?? false} />
            <Buttons handleOnPress={handleOnClickPress}/>
        </div>
    )
};

export default Calculator;