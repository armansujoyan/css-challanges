document.addEventListener("DOMContentLoaded", function() {
    // General variables to be used
    const buttons = document.querySelectorAll('.ui-button');
    const history = document.querySelector('#history #history-out');
    const current = document.querySelector('#current #output-text');
    let executionLine = "";

    // Fucntion to check if the current input button is an action button.
    const isAction = function(symbol) {
        return symbol === '+' || symbol === '-' || symbol === '/' || symbol === '*'
                || symbol === '%';
    }

    // Generic symbol input for the expression
    const addSymbol = function (symbol) {
        let last = executionLine[executionLine.length-1];
        if (last === '.' && isAction(symbol)) {
            executionLine += '0';
        }
        if (isAction(symbol) && isAction(last)) {
            executionLine = executionLine.replace(/.$/, symbol);
        } else if (last !== symbol) {
            executionLine += symbol;
        }
        else {
            console.error("Symbol is already present")
        }
        history.innerHTML = executionLine;
        if (isAction(symbol)) {
            current.innerHTML = symbol;
        } else {
            current.innerHTML += symbol;
        }
    }

    // Evaluating generated expression
    const evalExp = function (expression){
        console.log("Evaluating.", expression);
        const answer = eval(expression);
        if (history.innerHTML[history.innerHTML.length-1] !== '=')
            history.innerHTML += '=';
        current.innerHTML = answer;
    }

    // Adding numeric values to the expression
    const addNumber = function(number) {
        let last = executionLine[executionLine.length-1];
        let preLast = executionLine[executionLine.length-2];
        if(isAction(current.innerHTML))
            current.innerHTML = '';
        if (last === '0' && preLast !== '.') {
            executionLine = executionLine.replace(/.$/, number)
        } else {
            executionLine += number;
            current.innerHTML += number;
        }
        history.innerHTML = executionLine;
    }

    // Listening for the click events of the control buttonss
    for(let button of buttons){
        button.addEventListener('click', function(event) {
            let btnValue = event.target.dataset.value;
            switch(btnValue) {
                case 'clear':
                    executionLine = "";
                    history.innerHTML = '';
                    current.innerHTML = '';
                    break;
                case '0':
                    addSymbol('0');
                    break;
                case '1':
                case '2':
                case '3':
                case '4':
                case '5':
                case '6':
                case '7':
                case '8':
                case '9':
                    addNumber(btnValue);
                    break;
                case '.':
                case '+':
                case '-':
                case '*':
                case '/':
                case '%':
                    addSymbol(btnValue)
                    break
                case "execute":
                    evalExp(executionLine);
            }
            console.log(btnValue, executionLine)
        })
    }
});