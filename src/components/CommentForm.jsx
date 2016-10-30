import React, {Component} from 'react';
import CommentError from '../components/CommentError';
import CommentTextarea from '../components/CommentTextarea';
import CommentCharCounter from '../components/CommentCharCounter';

class CommentForm extends Component {

  static propTypes = {
    maxTextLength: React.PropTypes.number,
    onSubmit: React.PropTypes.func.isRequired,
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

  handleSubmit(text) {
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

    this.props.onSubmit(trimmedText);

    this.setState({
      text: "",
    });
  }

  render() {
    return (
      <div className="comment-form">
        {this.state.error &&
         <CommentError
           message={this.state.error}
         />
        }
        <CommentTextarea
          defaultText={this.state.text}
          onChange={(value) => this.handleChange(value)}
          onSubmit={(value) => this.handleSubmit(value)}
        />
        {this.props.maxTextLength &&
         <CommentCharCounter
           charsLeft={this.props.maxTextLength - this.state.text.length}
         />
        }
      </div>
    );
  }
};

export default CommentForm;
