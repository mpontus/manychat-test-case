import React, {Component} from 'react';

const noop = () => {};

class CommentTextarea extends Component {

  static propTypes = {
    defaultText: React.PropTypes.string,
    onChange: React.PropTypes.func,
    onSubmit: React.PropTypes.func,
  }

  static defaultProps = {
    defaultText: "",
    onChange: noop,
    onSubmit: noop,
  }

  constructor(props) {
    super();
    this.state = {
      text: props.defaultText,
    };
  }

  componentWillReceiveProps(props) {
    this.setState({
      text: props.defaultText,
    });
  }

  handleChange(e) {
    const text = e.target.value;
    this.setState({
      text,
    });
    this.props.onChange(text);
  }

  handleKeyPress(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      this.handleSubmit();
    }
  }

  handleSubmit() {
    this.props.onSubmit(this.state.text);
    this.setState({
      text: "",
    });
  }

  render() {
    return (
      <textarea
        value={this.state.text}
        onChange={(e) => this.handleChange(e)}
        onKeyPress={(e) => this.handleKeyPress(e)}
      />
    );
  }
}

export default CommentTextarea;
