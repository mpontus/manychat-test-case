import React, { Component } from 'react';
import FormattedText from './FormattedText';
import { connectToConfiguration } from '../utils/configuration';

class CommentText extends Component {
  static propTypes = {
    text: React.PropTypes.string.isRequired,
    collapsedLength: React.PropTypes.number,
  };

  static defaultProps = {
    collapsedLength: null,
  }

  constructor(props) {
    super();
    this.state = {
      expanded: false,
    };
  }

  isExpanded() {
    return this.state.expanded;
  }

  canBeExpanded() {
    const { collapsedLength, text } = this.props;
    return collapsedLength && text.length > collapsedLength;
  }

  toggleExpanded() {
    this.setState({
      expanded: !this.isExpanded(),
    });
  }

  getVisibleText() {
    if (!this.canBeExpanded() || this.state.expanded) {
      return this.props.text;
    }
    const { collapsedLength, text } = this.props;
    return text.slice(0, collapsedLength);
  }

  render () {
    return (
      <div className="comment-text">
        <FormattedText text={this.getVisibleText()} />
        {this.canBeExpanded() &&
         <button onClick={() => this.toggleExpanded()}>
           {this.isExpanded() ? 'Show less' : 'Show more'}
         </button>
        }
      </div>
    );
  }
}

export default connectToConfiguration(settings => ({
  collapsedLength: settings.maxVisibleCommentLength,
}))(CommentText)
