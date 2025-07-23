import React from 'react';
import Icon from './AppIcon';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center p-8 bg-red-50 rounded-card">
          <div className="bg-red-100 p-3 rounded-full mb-4">
            <Icon name="AlertTriangle" size={32} color="var(--color-error)" />
          </div>
          <h2 className="heading-1 text-gray-900 mb-2">Something went wrong</h2>
          <p className="body-medium text-gray-700 text-center mb-4">
            We encountered an error while loading this content. Please try refreshing the page.
          </p>
          <button 
            onClick={() => window.location.reload()}
            className="button-text bg-primary-500 text-white px-4 py-2 rounded-button hover:bg-primary-600 transition-colors"
          >
            Refresh Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;