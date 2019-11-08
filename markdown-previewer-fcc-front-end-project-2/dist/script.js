var renderer = new marked.Renderer();

marked.setOptions({
  breaks: true });


renderer.link = function (href, title, text) {
  return '<a target="_blank" href="' + href + '" title="' + title + '">' + text + '</a>';
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: text };

    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
    this.setState({
      input: event.target.value });

  }
  render() {
    return (
      React.createElement("div", { className: "container" },
      React.createElement("div", { className: "element" },
      React.createElement("div", { className: "toolbar" }, "Editor"),
      React.createElement("textarea", { id: "editor", value: this.state.input, onChange: this.handleChange })),


      React.createElement("div", { className: "element" },
      React.createElement("div", { className: "toolbar" }, "Preview"),
      React.createElement("div", { id: "preview", dangerouslySetInnerHTML: { __html: marked(this.state.input, { renderer: renderer }) } }))));



  }}


let text = `# example text

## example 2 

[Link](http://www.freecodecamp.org) 
some code presented \`inline\` and it's not out of line
\`\`\`
//here is a code block
function(var) {
  if (var == true) {
    return 'Yay!'
  } else {
    return 'No!'
  }
}
\`\`\`
- list
  - with
    - indents

> Block my quote!

**Bold and beautiful**

![Shamelessly Stolen React Logo](https://goo.gl/Umyytc "Shamelessly Stolen React Logo")
`;

ReactDOM.render(React.createElement(App, null), document.getElementById('app'));