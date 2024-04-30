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
    if (currentOperator == "" && !(lhs.length >= 7)) {
        lhs += num;
        updateDisplay(lhs);
    }
    else if (currentOperator != "" && !(rhs.length >= 7)) {
        rhs += num;
        updateDisplay(rhs);
    }       
}

// When decimal is clicked
const decimal = () => {
    if (preview.includes("="))
        clr();
    if (currentOperator == "")
        if (!lhs.includes(".") && !(lhs.length >= 7)) {
            lhs += ".";
            updateDisplay(lhs);
        }
    else
    if (!rhs.includes(".") && !(rhs.length >= 7)) {
        rhs += ".";
        updateDisplay(lhs);
    }
}

// When an operator is clicked
const operator = (op) => { 
    if (lhs == "" || lhs == ".")
        return;
    
    if (currentOperator != "" && rhs != "" && rhs != "." && !preview.includes("=")) {
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
            lhs = limitLength(lhs);
            updateDisplay(lhs);
            break;
        case "-":
            lhs = parseFloat(lhs) - parseFloat(rhs);
            lhs = limitLength(lhs);
            updateDisplay(lhs);
            break;
        case "*":
            lhs = parseFloat(lhs) * parseFloat(rhs);
            lhs = limitLength(lhs);
            updateDisplay(lhs);
            break;
        case "/":
            if (rhs == 0) {
                window.alert('bruh');
                clr();
            }
            else {
                lhs = parseFloat(lhs) / parseFloat(rhs);
                lhs = limitLength(lhs);
                updateDisplay(lhs);
            }
            break;
    }
    if (String(lhs).length > 8) {
        window.alert('Your answer is too large! Please try again.');
        clr();
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

// Round to limit the length of decimal answers
const limitLength = (num) => {
    if (!String(num).includes("."))
        return num;
    let beforeDec = String(num).indexOf(".");
    if (String(num).length > 8) {
        return num.toFixed(7-beforeDec);
    }
    return num;
}

// Keyboard support
function handleKeyboardInput(e) {
    const key = e.key;

    if (!isNaN(key))
        digit(key);
    else if (key == ".")
        decimal();
    else if (key == "+" || key == "-" || key == "*" || key == "/")
        operator(key);
    else if (key == "Enter" || key == "=") {
        equals();
    }
    else if (key == "c")
        clr();
    else if (key == "Backspace")
        backspace();
}

document.addEventListener('keydown', handleKeyboardInput);