let lhs = "";
let rhs = "";
let currentOperator = "";
let preview = "";
let display = "";

const previewDiv = document.querySelector("#preview");
const displayDiv = document.querySelector("#display");

// When a digit is clicked
const digit = (num) => {
    if (preview.includes("="))
        clr();    
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
    if (lhs == "")
        return;
    
    if (currentOperator != "" && rhs != "" && !preview.includes("=")) {
        operate();
    }
    currentOperator = op;
    updatePreview(lhs + " " + currentOperator);
    updateDisplay("");
    rhs = "";
}

// Operates with current number and previous number
const operate = () => {
    switch(currentOperator) {
        case "+":
            lhs = parseFloat(lhs) + parseFloat(rhs);
            updateDisplay(lhs);
            break;
        case "-":
            lhs = parseFloat(lhs) - parseFloat(rhs);
            updateDisplay(lhs);
            break;
        case "*":
            lhs = parseFloat(lhs) * parseFloat(rhs);
            updateDisplay(lhs);
            break;
        case "/":
            if (rhs == 0) {
                window.alert('bruh');
                clr();
            }
            else {
                lhs = parseFloat(lhs) / parseFloat(rhs);
                updateDisplay(lhs);
            }
            break;
    }
}

// When equals is clicked
const equals = () => {
    if (lhs == "" || rhs == "")
        return;
    updatePreview(lhs + " " + currentOperator + " " + rhs + " =");
    operate();
}

// When backspace is clicked
const backspace = () => {
    if (preview.includes("="))
        clr();
    else if (currentOperator == "") {
        lhs = lhs.slice(0, -1);
        updateDisplay(lhs);
    }
    else {
        rhs = rhs.slice(0, -1);
        updateDisplay(rhs);
    }   
}

// When clear is clicked
const clr = () => {
    lhs = "";
    rhs = "";
    currentOperator = "";
    updatePreview("");
    updateDisplay("");
}

// Updates the display
const updateDisplay = (s) => {
    display = s;
    displayDiv.textContent = display;
}

// Updates the preview
const updatePreview = (s) => {
    preview = s;
    previewDiv.textContent = preview;
}