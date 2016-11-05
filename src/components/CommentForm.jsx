import React, {Component} from 'react';
import CommentError from '../components/CommentError';
import TextareaWithCounter from '../components/TextareaWithCounter';

class CommentForm extends Component {

  static propTypes = {
    maxTextLength: React.PropTypes.number,
    disabled: React.PropTypes.bool,
    onSubmit: React.PropTypes.func.isRequired,
  }

  static defaultProps = {
    maxTextLength: 10,
    disabled: false,
  }

  constructor() {
    super();
    this.state = {
      text: "",
      error: null,
    };
  }

  handleChange(e) {
    this.setState({
      text: e.target.value,
    });
  }

  handleKeyPress(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      this.handleSubmit();
    }
  }

  isValid(displayError = false) {
    const { text } = this.state;
    const trimmedText = text.trim();

    if (trimmedText.length === 0) {
      displayError && this.setState({
        error: "Comment text must not be empty",
      });
      return false;
    }

    if (this.props.maxTextLength) {
      const maxTextLength = this.props.maxTextLength;
      if (trimmedText.length > maxTextLength) {
        displayError && this.setState({
          error: `Comment must not exceed ${maxTextLength} characters`,
        });
        return false;
      }
    }

    return true;
  }

  handleSubmit() {
    const { text } = this.state;
    const trimmedText = text.trim();

    if (this.isValid(true)) {
      this.props.onSubmit({
        text: trimmedText
      });

      this.setState({
        text: "",
      });
    }
  }

  render() {
    const { maxTextLength, disabled } = this.props;
    return (
      <div className="comment-form">
        {this.state.error &&
         <CommentError
           message={this.state.error}
         />
        }
        <TextareaWithCounter
          disabled={disabled}
          className="comment-textarea"
          counterClassName="comment-textarea-counter"
          value={this.state.text}
          maxLength={maxTextLength}
          onChange={(e) => this.handleChange(e)}
          onKeyPress={(e) => this.handleKeyPress(e)}
        />
        <div className="comment-form-actions">
          <button
            disabled={disabled || !this.isValid()}
            onClick={(e) => this.handleSubmit()}>
            Send
          </button>
        </div>
      </div>
    );
  }
};

export default CommentForm;
