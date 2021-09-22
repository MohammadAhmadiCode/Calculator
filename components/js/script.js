
var buttons = document.getElementsByTagName("button"),
    result = document.querySelector("#display"),
    clear = document.querySelector("#btn-clear"),
    numbers = document.querySelectorAll(".btn-number"),
    equation = [],
    operator = false;
for (var i = 0; i < buttons.length; i += 1) {
    if (buttons[i].innerHTML === "=") {
        buttons[i].addEventListener("click", calculate(i));
    } else if (buttons[i].innerHTML === "AC") {
        equation = [];
    } else {
        buttons[i].addEventListener("click", addValue(i));
    }
}
clear.onclick = function () {
    result.innerHTML = "0";
    equation = [];
    operator = false;
};
function numberVal(){
    if(result.innerHTML.length > 9){
        alert("Can not enter more than 9 digit");
    }
}
function addValue(i) {
    return function () {
    if (buttons[i].innerHTML === "/") {
        clicked(this);
        ifOperatorThanSwap("/");
    } else if (buttons[i].innerHTML === "×") {
        clicked(this);
        ifOperatorThanSwap("*");
    } else if (buttons[i].innerHTML === "+") {
        clicked(this);
     ifOperatorThanSwap("+");
    } else if (buttons[i].innerHTML === "-") {
        clicked(this);
        ifOperatorThanSwap("-");
    } else {
        removeClicked();
        if (checkIfNum(equation[equation.length - 1])) {
            equation = [];
             equation.push(buttons[i].innerHTML);
            operator = true;
        } else {
            equation.push(buttons[i].innerHTML);
        }
            if (result.innerHTML === "0") {
                result.innerHTML = buttons[i].innerHTML;
            } else if (operator) {
                result.innerHTML = buttons[i].innerHTML;
            } else {
                result.innerHTML += buttons[i].innerHTML;
            }
            if (result.innerHTML === "0") {
                result.innerHTML = buttons[i].innerHTML;
            }
            operator = false;
        }
    };
}
function clicked(i) {
    removeClicked(i);
    i.classList.add("clicked");
}
function removeClicked(i) {
    var elems = document.querySelectorAll(".clicked");
    [].forEach.call(elems, function (el) {
    el.classList.remove("clicked");
    });
}
function calculate(i) {
    var answer;
    return function () {
        if (equation.length == 0) {
            return;
        } 
        else {
            answer = eval(equation.join(""));
        }
        if (answer % 1 === 0) {
            result.innerHTML = answer;
        } 
        else {
            result.innerHTML = answer.toFixed(10);
        }
        equation = [];
        equation.push(answer);
        operator = false;
    };
}
function ifOperatorThanSwap(str) {
    if (!operator) {
        equation.push(str);
        operator = true;
    } else {
        equation.pop();
        equation.push(str);
    }
}
function checkIfNum(v) {
    if (typeof v == "string") {
        return false;
    } else if (typeof v == "number") {
        return true;
    }
}
