class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      running: false,
      paused: false,
      timerState: 'Session',
      sessionLength: 25,
      breakLength: 5,
      timer: 'sessionLength',
      runningTimer: 1500 };

    this.startCountdown = this.startCountdown.bind(this);
    this.reset = this.reset.bind(this);
    this.pauseCountdown = this.pauseCountdown.bind(this);
    this.increment = this.increment.bind(this);
    this.decrement = this.decrement.bind(this);
    this.switchTimer = this.switchTimer.bind(this);
    this.displayClock = this.displayClock.bind(this);
  }
  startCountdown() {
    let currentTimer = this.state.timer;
    let thisTimer = this.state[currentTimer];
    if (this.state.running) {
      return;
    } else
    if (this.state.paused) {
      this.setState({
        running: true,
        paused: false });

    } else
    {
      this.setState({
        running: true,
        runningTimer: thisTimer * 60 });

    }
    this.countdown = setInterval(() => {
      this.setState({
        runningTimer: this.state.runningTimer - 1 });

      if (this.state.runningTimer == -1) {
        this.setState({
          running: false });

        clearInterval(this.countdown);
        this.switchTimer();
      }
    }, 1000);
    this.displayClock();
  }
  pauseCountdown() {
    clearInterval(this.countdown);
    this.setState({
      running: false,
      paused: true });

  }
  displayClock() {
    let minutes = Math.floor(this.state.runningTimer / 60);
    let seconds = Math.floor(this.state.runningTimer - minutes * 60);
    if (minutes < 10) {
      minutes = '0' + minutes;
    }
    if (seconds < 10) {
      seconds = '0' + seconds;
    }
    return minutes + ':' + seconds;
  }
  switchTimer() {
    let audio = document.getElementById("beep");
    audio.play();
    if (this.state.timerState == 'Session') {
      this.setState({
        timerState: 'Break',
        timer: 'breakLength' });

    } else
    if (this.state.timerState == 'Break') {
      this.setState({
        timerState: 'Session',
        timer: 'sessionLength' });

    }
    this.startCountdown();
  }

  reset() {
    clearInterval(this.countdown);
    document.getElementById('beep').pause();
    document.getElementById('beep').currentTime = 0;
    this.setState({
      running: false,
      paused: false,
      timerState: 'Session',
      sessionLength: 25,
      breakLength: 5,
      timer: 'sessionLength',
      runningTimer: 1500 });

  }
  increment(e) {
    console.log(event.target.value);
    let operation = event.target.value;
    if (this.state.running == true || this.state.paused == true) {
      return;
    }

    if (operation == "session+") {
      if (this.state.sessionLength == 60 || this.state.sessionLength < 1) {
        return;
      };
      this.setState({
        sessionLength: this.state.sessionLength + 1,
        runningTimer: this.state.runningTimer + 60 });

    } else
    if (operation == "break+") {
      if (this.state.breakLength == 60 || this.state.breakLength < 1) {
        return;
      }
      this.setState({
        breakLength: this.state.breakLength + 1 });

    }
  }
  decrement(e) {
    console.log(event.target.value);
    let operation = event.target.value;
    if (this.state.running == true || this.state.paused == true) {
      return;
    }
    /*add stuff with event.target.value here to allow for inc/dec depending on what it is*/
    if (operation == "session-") {
      if (this.state.sessionLength <= 1) {
        return;
      };
      this.setState({
        sessionLength: this.state.sessionLength - 1,
        runningTimer: this.state.runningTimer - 60 });

    } else
    if (operation == "break-") {
      if (this.state.breakLength <= 1) {
        return;
      }
      this.setState({
        breakLength: this.state.breakLength - 1 });

    }
  }

  render() {
    return (
      React.createElement("div", { className: "container" },
      React.createElement("div", { className: "session" },
      React.createElement("div", { id: "session-label" }, "Session:"),
      React.createElement("div", { id: "session-length" }, this.state.sessionLength),
      React.createElement("button", { onClick: this.increment, value: "session+", id: "session-increment" }, "+"),
      React.createElement("button", { onClick: this.decrement, value: "session-", id: "session-decrement" }, "-")),

      React.createElement("div", { className: "timer" },
      React.createElement("div", { id: "timer-label" }, this.state.timerState),
      React.createElement("div", { id: "time-left" }, this.displayClock()),
      React.createElement("button", { id: "start_stop", onClick: this.state.running ? this.pauseCountdown : this.startCountdown },
      React.createElement("i", { className: "fa fa-play" }), React.createElement("i", { className: "fa fa-pause" })),

      React.createElement("button", { id: "reset", onClick: this.reset }, React.createElement("i", { className: "fa fa-repeat" }))),

      React.createElement("div", { className: "break" },
      React.createElement("div", { id: "break-label" }, "Break:"),
      React.createElement("div", { id: "break-length" }, this.state.breakLength),
      React.createElement("button", { onClick: this.increment, value: "break+", id: "break-increment" }, "+"),
      React.createElement("button", { onClick: this.decrement, value: "break-", id: "break-decrement" }, "-")),





      React.createElement("audio", { id: "beep", src: "https://goo.gl/65cBl1" })));


  }}


ReactDOM.render(React.createElement(Timer, null), document.getElementById("root"));