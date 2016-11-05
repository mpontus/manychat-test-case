import React, {Component} from 'react';
import CommentError from '../components/CommentError';
import TextareaWithCounter from '../components/TextareaWithCounter';

class CommentForm extends Component {

  static propTypes = {
    maxTextLength: React.PropTypes.number,
    onSubmit: React.PropTypes.func.isRequired,
  }

  static defaultProps = {
    maxTextLength: 10,
  }

  constructor() {
    super();
    this.state = {
      text: "",
      error: null,
    };
  }

  handleChange(text) {
    this.setState({
      text: text,
    });
  }

  handleSubmit() {
    const { text } = this.state;
    const trimmedText = text.trim();

    this.setState({
      text: text,
      error: null,
    });

    if (trimmedText.length === 0) {
      return this.setState({
        error: "Comment text must not be empty",
      });
    }

    if (this.props.maxTextLength !== undefined) {
      const maxTextLength = this.props.maxTextLength;
      if (trimmedText.length > maxTextLength) {
        return this.setState({
          error: `Comment must not exceed ${maxTextLength} characters`,
        });
      }
    }

    this.props.onSubmit({
      text: trimmedText
    });

    this.setState({
      text: "",
    });
  }

  render() {
    const { maxTextLength } = this.props;
    return (
      <div className="comment-form">
        {this.state.error &&
         <CommentError
           message={this.state.error}
         />
        }
        <TextareaWithCounter
          className="comment-textarea"
          counterClassName="comment-textarea-counter"
          value={this.state.text}
          maxLength={maxTextLength}
          onChange={(e) => this.handleChange(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && this.handleSubmit()}
        />
      </div>
    );
  }
};

export default CommentForm;
