const soundButton = [
{ letter: 'Q', src: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3', name: 'Heater-1' },
{ letter: 'W', src: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3', name: 'Heater-2' },
{ letter: 'E', src: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3', name: 'Heater-3' },
{ letter: 'A', src: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3', name: 'Heater-4' },
{ letter: 'S', src: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3', name: 'Clap' },
{ letter: 'D', src: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3', name: 'Kick-n-Hat' },
{ letter: 'Z', src: 'https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3', name: 'Punchy-Kick' },
{ letter: 'X', src: 'https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3', name: 'Side-Stick' },
{ letter: 'C', src: 'https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3', name: 'Brk-Snr' }];


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      display: 'Display me' };

    this.newDisplay = this.newDisplay.bind(this);
  }
  newDisplay(text) {
    this.setState({ display: text });
  }
  render() {
    return (
      React.createElement("div", { className: "container", id: "drum-machine" },
      React.createElement("div", { className: "title" }, React.createElement("h1", null, "Drum Machine")),
      React.createElement("div", { id: "display" }, this.state.display, " "),
      soundButton.map(item => {
        return React.createElement(Button, {
          displayName: item.name,
          src: item.src,
          letter: item.letter,
          newDisplay: this.newDisplay });

      })));


  }}


class Button extends React.Component {
  constructor(props) {
    super(props);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }
  componentDidMount() {
    document.addEventListener("keydown", event => this.handleKeyPress(event));
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", event => this.handleKeyPress(event));
  }

  handleClick() {
    console.log("Reached handleClick");
    console.log(this.props.displayName);
    this.props.newDisplay(this.props.displayName);
    document.getElementById(this.props.letter).play();
  }

  handleKeyPress(event) {
    console.log("Reached handleKeyPress");
    console.log(event.key);
    console.log(this.props.letter);
    if (event.keyCode == this.props.letter.charCodeAt()) {
      this.props.newDisplay(this.props.displayName);
      console.log("Reached inside handleKeyPress");
      document.getElementById(this.props.letter).play();
    }
  }

  render() {
    return (
      React.createElement("button", {
        className: "drum-pad",
        id: this.props.displayName,

        onClick: this.handleClick }, this.props.letter,
      React.createElement("audio", {
        id: this.props.letter,
        className: "clip",
        src: this.props.src })));



  }}


ReactDOM.render(React.createElement(App, null), document.getElementById("app"));