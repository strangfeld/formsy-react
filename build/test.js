var React = require('react');
var ReactDOM = require('react-dom');
var Formsy = require('./../src/main.js');

class Input extends Formsy.Component {
  constructor(props) {
    super(props);
  }

  onChange(event) {
    this.setValue(event.currentTarget.value);
  }

  render() {
    return (
      <div>
      {this.showRequired() ? 'required' : ''}
      <input disabled={this.isFormDisabled()} value={this.getValue()} onChange={this.onChange}/>
      </div>
    );
  }
}

class SomeComp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isRequired: false
    }
  }

  toggleRequired() {
    this.setState({
      isRequired: !this.state.isRequired
    });
  }

  render() {
    return (
      <div>
        <Input name="foo[0]" value={''} validations="isEmail" validationError="No email" required={this.state.isRequired}/>
        <button onClick={this.toggleRequired.bind(this)}>Test</button>
      </div>
    )
  }
}

class FormApp extends React.Component{
  constructor(props) {
    super(props);
  }

  onSubmit(model) {
    console.log('model', model);
  }

  render() {
    return (
      <Formsy.Form ref="form" onSubmit={this.onSubmit}>
        <SomeComp/>
      </Formsy.Form>
    );
  }
}

ReactDOM.render(<FormApp />, document.getElementById('app'));
