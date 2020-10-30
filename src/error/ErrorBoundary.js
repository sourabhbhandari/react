import React from 'react';
import PropTypes from 'prop-types';
import {Redirect} from 'react-router-dom';

import {Result, Button} from 'antd';

class ErrorBoundary extends React.Component {
  static propTypes = {
    children: PropTypes.node,
    render: PropTypes.func,
  };

  static defaultProps = {
    children: null,
  };

  static defaultProps = {
    render: (error, onReset) => (
      <Result
        status="warning"
        title="Something went wrong. Try again later."
        style={{backgroundColor: '#FFFFFF'}}
        extra={
          <Button type="primary" onClick={onReset}>
            Try Again
          </Button>
        }
      />
    ),
  };

  state = {hasError: false, error: null};

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return {hasError: true, error: error.message};
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    /* eslint no-console: ["error", { allow: ["warn", "error"] }] */
    console.error('componentDidCatch Error: ', error, errorInfo);
  }

  reset = () => {
    return <Redirect to="/dashboard" />;
  };

  render() {
    const {hasError, error} = this.state;
    const {children, render} = this.props;

    if (hasError) {
      // You can render any custom fallback UI
      return render(error, this.reset);
    }

    return children;
  }
}

export default ErrorBoundary;
