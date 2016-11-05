import { Component, PropTypes, Children, createElement } from 'react';

class Provider extends Component {
  static propTypes = {
    settings: PropTypes.object.isRequired,
    children: PropTypes.element.isRequired,
  }

  static childContextTypes = {
    settings: PropTypes.object,
  }

  getChildContext() {
    return {
      settings: this.props.settings,
    };
  }

  render() {
    return Children.only(this.props.children);
  }
}

const connect = mapSettingsToProps => ComposedCompnent => {
  class WithConfiguration extends Component {
    static contextTypes = {
      settings: PropTypes.object,
    }

    render() {
      const { settings } = this.context;
      return createElement(ComposedCompnent, {
        ...mapSettingsToProps(settings),
        ...this.props,
      });
    }
  }
  return WithConfiguration;
};

export {
  Provider as ConfigurationProvider,
  connect as connectToConfiguration,
};
