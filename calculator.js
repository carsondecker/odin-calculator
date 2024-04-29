let lhs = "";
let rhs = "";
let currentOperator = "";
let preview = "";
let display = "";

// When a digit is clicked
const digit = (num) => {
    if (preview.includes("="))
        clear();    
    if (currentOperator == "") {
        lhs += num;
        updateDisplay(lhs);
    }
    else {
        rhs += num;
        updateDisplay(rhs);
    }       
}

// When decimal is clicked
const decimal = () => {
    if (currentOperator == "")
        lhs += ".";
    else
        rhs += ".";
}

// When an operator is clicked
const operator = (op) => { 
    if (operator != "" && rhs != "" && !preview.includes("="))
        operate();
    currentOperator = op;
    updatePreview(lhs + " " + currentOperator);
    rhs = "";
}

// Operates with current number and previous number
const operate = () => {
    switch(currentOperator) {
        case "+":
            lhs = parseFloat(lhs) + parseFloat(rhs);
            break;
        case "-":
            lhs = parseFloat(lhs) - parseFloat(rhs);
            break;
        case "*":
            lhs = parseFloat(lhs) * parseFloat(rhs);
            break;
        case "/":
            if (rhs == 0) {
                window.alert('bruh');
                clear();
            }
            else
                lhs = parseFloat(lhs) / parseFloat(rhs);
            break;
    }
}

// When equals is clicked
const equals = () => {
    updatePreview(lhs + " " + currentOperator + " " + rhs + " =");
    operate();
}

// When backspace is clicked
const backspace = () => {
    if (preview.includes("="))
        clear();
    else if (currentOperator == "") {
        lhs.slice(0, -1);
        updateDisplay(lhs);
    }
    else {
        rhs.slice(0, -1);
        updateDisplay(rhs);
    }   
}

// When clear is clicked
const clear = () => {
    lhs = "";
    rhs = "";
    currentOperator = "";
    updatePreview("");
    updateDisplay("");
}

// Updates the display
const updateDisplay = (s) => {
    display = s;
}

// Updates the display
const updatePreview = (s) => {
    preview = s;
}

//Test case
/*
digit(3);
digit(0);
operator("+");
console.log(preview);
digit(1);
digit(5);
equals();
console.log(preview);
console.log(lhs);
equals();
console.log(preview);
console.log(lhs);
operator("-");
console.log(preview);
digit(3);
decimal();
digit(5);
operator("-");
console.log(preview);
digit(3);
decimal();
digit(5);
equals();
console.log(preview);
console.log(lhs);
equals();
console.log(preview);
console.log(lhs);
*/