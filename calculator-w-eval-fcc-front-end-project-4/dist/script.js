/*
operators: +-/*
numbers: 0123456789
decimal: .
equals: =
clear: c



*/
let numArray = [];
let currentInput = [];

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      display: '0' };

    this.handleNumbers = this.handleNumbers.bind(this);
    this.handleClear = this.handleClear.bind(this);
    this.handleOperators = this.handleOperators.bind(this);
    this.handleEvaluation = this.handleEvaluation.bind(this);
    this.handleDecimal = this.handleDecimal.bind(this);
  }
  handleNumbers(event) {
    currentInput.push(event.target.value);
    currentInput.join('');
    console.log(currentInput);
    if (currentInput != []) {// this should check for 01 and such, trimming to just 1
      let k = 0;
      while (currentInput.length > 1) {
        if (currentInput[0] == "0") {
          currentInput.shift();
        } else
        {
          break;
        }
      }
    }
    this.setState({
      display: currentInput });

  }
  handleDecimal(event) {
    console.log("reached handleDecimal");
    currentInput.push(".");
    currentInput.join('');
    console.log(currentInput);
    let indexes = [];
    for (var k = 0; k < currentInput.length; k++) {
      console.log(currentInput[k]);
      if (currentInput[k] == ".") {
        indexes.push(k);
        if (indexes.length >= 2) {
          let lastIndex = indexes.pop();
          console.log(lastIndex);
          currentInput.splice(lastIndex, 1);
          console.log(currentInput);
        }
      } else
      {
        console.log(k);
      }
    }
  }
  handleClear(event) {
    numArray = [];
    currentInput = [];
    this.setState({
      display: '0' });

  }
  handleOperators(event) {
    let operator = event.target.value;
    console.log(operator);
    let lastItem = currentInput.slice(-1)[0]; //https://www.codeblocq.com/2016/05/Get-the-last-element-of-an-Array-in-JavaScript/
    currentInput.push(operator);
    numArray.push(...currentInput);
    currentInput = [];
    this.setState({
      display: numArray });


  }
  handleEvaluation(event) {
    //should  make a copy of numArray since the length will change
    console.log(currentInput);
    if (currentInput != []) {
      numArray.push(...currentInput);
    }
    console.log('Reached Evaluation');
    console.log('CurrentInput', currentInput);
    console.log('NumArray', numArray);
    let indexes = [];
    let regex = /\*|\+|\/|\-/;
    for (var i = 0; i < numArray.length - 1; i++) {
      console.log(numArray[i]);
      if (numArray[i] == "-" && numArray[i + 1].match(/[0-9]|\./) != null) {
        //don't do anything with the minus;
      } else
      if (numArray[i].match(regex) != null && numArray[i + 1] == "-" && numArray[i + 2].match(/[0-9]|\./) != null) {
        //don't do anything with operator before minus;
      } else
      if (numArray[i].match(regex) != null && numArray[i + 1].match(/[0-9]|\./) != null) {
        //don't do anything with operator before minus;
      } else
      if (numArray[i].match(regex) != null && numArray[i - 1].match(/[0-9]|\./) != null && numArray[i + 1].match(/[0-9]|\./) != null) {
        //don't do anything with the operator between numbers -- could have bug with decimals?
      } else
      if (numArray[i].match(regex) != null) {
        indexes.push(i);
      }
    }indexes.reverse();
    while (indexes.length != 0) {
      numArray.splice(indexes[0], 1);
      indexes.shift();
    }

    let copyOfNumArray = [...numArray];
    let string = copyOfNumArray.join('');
    let result = eval(string);
    currentInput = [];
    numArray = [];
    numArray[0] = result.toString();
    console.log(result);
    console.log('CurrentInput', currentInput);
    console.log('NumArray', numArray);
    this.setState({
      display: result });

  }
  render() {
    return (
      React.createElement("div", { className: "calc-container" },
      React.createElement("div", { id: "display" }, this.state.display),
      React.createElement("div", null,
      React.createElement(Buttons, {
        numbers: this.handleNumbers,
        clear: this.handleClear,
        operators: this.handleOperators,
        evaluation: this.handleEvaluation,
        decimal: this.handleDecimal }))));




  }}


const Buttons = props => {
  return (
    React.createElement("div", { className: "grid-container" },
    React.createElement("button", {
      id: "clear",
      onClick: props.clear,
      value: "Clear" }, "Clear"),

    React.createElement("button", {
      id: "divide",
      onClick: props.operators,
      value: "/" }, "/"),

    React.createElement("button", {
      id: "multiply",
      onClick: props.operators,
      value: "*" }, "*"),

    React.createElement("button", {
      id: "subtract",
      onClick: props.operators,
      value: "-" }, "-"),
    React.createElement("button", {
      id: "seven",
      onClick: props.numbers,
      value: "7" }, "7"),
    React.createElement("button", {
      id: "eight",
      onClick: props.numbers,
      value: "8" }, "8"),
    React.createElement("button", {
      id: "nine",
      onClick: props.numbers,
      value: "9" }, "9"),
    React.createElement("button", {
      id: "add",
      onClick: props.operators,
      value: "+" }, "+"),
    React.createElement("button", {
      id: "four",
      onClick: props.numbers,
      value: "4" }, "4"),
    React.createElement("button", {
      id: "five",
      onClick: props.numbers,
      value: "5" }, "5"),
    React.createElement("button", {
      id: "six",
      onClick: props.numbers,
      value: "6" }, "6"),
    React.createElement("button", {
      id: "equals",
      onClick: props.evaluation,
      value: "=" }, "="),
    React.createElement("button", {
      id: "one",
      onClick: props.numbers,
      value: "1" }, "1"),
    React.createElement("button", {
      id: "two",
      onClick: props.numbers,
      value: "2" }, "2"),
    React.createElement("button", {
      id: "three",
      onClick: props.numbers,
      value: "3" }, "3"),
    React.createElement("button", {
      id: "decimal",
      onClick: props.decimal,
      value: "." }, "."),
    React.createElement("button", {
      id: "zero",
      onClick: props.numbers,
      value: "0" }, "0")));



};

ReactDOM.render(React.createElement(Calculator, null), document.getElementById("root"));