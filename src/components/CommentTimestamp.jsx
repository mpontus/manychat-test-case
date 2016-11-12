import React, { Component } from 'react';

const SECOND = 1000;
const MINUTE = 1000 * 60;
const HOUR   = 1000 * 60 * 60;
const DAY    = 1000 * 60 * 60 * 24;

const UNIT_PLURALS = {
  'second': 'seconds',
  'minute': 'minutes',
  'hour': 'hours',
  'day': 'days',
};

const pluralizeUnit = (quantity, unit) =>
  quantity === 1 ? unit : UNIT_PLURALS[unit];

const selectUnits = (delta) => {
  if (delta < MINUTE) {
    return 'second';
  }

  if (delta < HOUR) {
    return 'minute';
  }

  if (delta < DAY) {
    return 'hour';
  }

  return 'day';
}

const getUnitDelay = (unit) => {
  switch (unit) {
    case 'second': return SECOND;
    case 'minute': return MINUTE;
    case 'hour': return HOUR;
    case 'day': return DAY;
  }
}

const formatRelative = (delta) => {
  const unit = selectUnits(delta);
  const delay = getUnitDelay(unit);
  const quantity = Math.floor(delta / delay);
  return String(quantity) + ' ' + pluralizeUnit(quantity, unit);
}

class CommentTimestamp extends Component {
  static propTypes = {
    timestamp: React.PropTypes.number.isRequired,
  }

  componentDidMount() {
    this.interval = setInterval(() => this.forceUpdate(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    const { timestamp } = this.props;

    const delta = Date.now() - timestamp;

    const formattedRelative = delta < SECOND
      ? 'now'
      : formatRelative(Date.now() - timestamp) + ' ago';

    return (
      <div className="comment-timestamp">
        {formattedRelative}
      </div>
    );
  }
}

export default CommentTimestamp;
