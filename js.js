const screenDisplay = document.querySelector(`.screen`)
const buttons = document.querySelectorAll(`button`)


let calculation = [];
let accumulativeCalculation = " ";

function calculate(button) {
    const value = button.textContent;
    if (value === "C") {
        calculation = [];
        accumulativeCalculation = " ";
        screenDisplay.textContent = '0';
    } else if (value === "=") {
        try {
            const result = eval(accumulativeCalculation);
            screenDisplay.textContent = result;
            accumulativeCalculation = result.toString();
            calculation = [result.toString()];
        } catch (error) {
            screenDisplay.textContent = 'Error';
        }
    } else if (value === "%") {
        if (calculation.length >= 1) {
            const lastValue = parseFloat(accumulativeCalculation);
            const percentValue = lastValue / 100;
            accumulativeCalculation = percentValue.toString();
            calculation = [percentValue.toString()];
            screenDisplay.textContent = accumulativeCalculation;
        }
    } else {
        if (!isNaN(value) || value === "+" || value === "-" || value === "*" || value === "/" || (value === "." && !accumulativeCalculation.endsWith("."))) {
            
            if (calculation.length === 1 && calculation[0] === "0" && !isNaN(value)) {
              calculation.shift() 
            }
            
            calculation.push(value);
            accumulativeCalculation = calculation.join('');
            screenDisplay.textContent = accumulativeCalculation;
        }
    }
}

document.getElementById('back').addEventListener('click', function () {
    if (accumulativeCalculation.length > 0) {
        accumulativeCalculation = accumulativeCalculation.slice(0, -1);
        calculation = [accumulativeCalculation];
        screenDisplay.textContent = accumulativeCalculation;
    }
});

function buttonClickHandler(event) {
    const button = event.target;
    calculate(button);
}

buttons.forEach(function (button) {
    button.addEventListener('click', buttonClickHandler);
});








