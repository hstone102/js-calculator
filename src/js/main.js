let display = document.getElementById('display');
let value1 = null; // initializing to null so we can easily check if value1 has been modified
let operator = null;
let value2 = null;
let lastButton = null;

document.onreadystatechange = function () {
    if (document.readyState == "interactive") {
        // "interactive" means that the DOM is ready for us manipulate
        start();
    }
}

function start() {
    // Create event listeners on every button
    let buttons = document.getElementsByClassName("key");
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener("click", buttonLogic);
    }
}

function buttonLogic(event) {

    let button = event.target.innerHTML;

    if (button == "&nbsp;") {
        // this is an empty button; ignore it
        return;
    }

    if ( isDigit(button) ) {
        numberWasEntered(button);
    }
    else if ( isDecimal(button) ) {
        decimalWasEntered(button);
    }
    else if ( isClear(button) ) {
        clearWasEntered();
    }
    else {
        operatorOrEqualWasEntered(button);
    }

    lastButton = button;

}

function numberWasEntered(button) {
    if ( isOperator(lastButton) ) {
        display.value = button;
    }
    else  {
        if (display.value == '0') {
            display.value = button;
        }
        else {
            display.value += button;
        }
    }
}

function decimalWasEntered(button) {

    if (displayAlreadyHasDecimal()) {
        // ignore it
    }
    else {
        display.value += button;
    }

}

function displayAlreadyHasDecimal() {
    return display.value.search(/\./) > -1;
}


function operatorOrEqualWasEntered(button) {


    // TODO: what about pressing an operator immediately after =?
    // Example: the user types 1 + 2 + + + ?

    // TODO: what should happen when = is pressed multiple times?
    // Example: the user types 1 + 2 + 3 = = = =


    // if two operators are pressed successively,
    // all we need (?) to do is overwrite the saved
    // operator with the new one
    if ( isOperator(lastButton) ) {
        operator = button;
        return;
    }

    // do we have enough saved information to make a calculation?

    // if we have value1 and operator
    if (value1 && operator) {

        // we don't actually need to do this
        // we could have calculate() work directly
        // from display.value
        // but it's the author's preference to
        // use all stored values in calculate() :-)
        value2 = display.value;

        if (button == '=') {
            display.value = value1 = calculate();
            operator = null;
            value2 = null;
        }
        else {
            display.value = value1 = calculate();
            operator = button;
            value2 = null;
        }

    }
    else {
        value1 = display.value;
        operator = button;
    }

}

function calculate() {

    let total = 0;

    switch (operator) {

        case "/":
            total = Number(value1) / Number(value2);
            break;
        case "X":
            total = Number(value1) * Number(value2);
            break;
        case "-":
            total = Number(value1) - Number(value2);
            break;
        case "+":
            total = Number(value1) + Number(value2);
            break;
        default:
            alert("No function selected!");
            break;

    }

    return total;

}

function clearWasEntered() {
    display.value = '0';
    value1 = operator = value2 = lastButton = null;
}





function isDigit(candidate) {
    return (0 <= candidate && candidate <= 9);
}

function isDecimal(candidate) {
    return (candidate == '.');
}

function isOperator(candidate) {
    return (candidate == '+' || candidate == '-' || candidate == 'X' || candidate == '/');
}

function isOperatorOrEqual(candidate) {
    return (isOperator(candidate) || candidate == '=');
}

function isClear(candidate) {
    return (candidate == 'C');
}
