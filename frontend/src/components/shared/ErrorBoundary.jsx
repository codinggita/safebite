import React from 'react';
import { Button } from '../ui';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // In production, log to Sentry or similar service here
    console.error('ErrorBoundary caught an error', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="w-full min-h-[400px] flex flex-col items-center justify-center p-8 text-center bg-gray-50 dark:bg-background-dark rounded-xl">
          <div className="text-6xl mb-6">⚠️</div>
          <h2 className="text-2xl font-display font-bold text-gray-900 dark:text-white mb-3">
            Something went wrong
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md">
            We apologize for the inconvenience. An unexpected error occurred.
          </p>
          <div className="flex gap-4">
            <Button onClick={() => window.location.reload()}>
              Reload Page
            </Button>
            <Button variant="outline" onClick={() => (window.location.href = '/')}>
              Go Home
            </Button>
          </div>
          {import.meta.env.MODE === 'development' && (
            <pre className="mt-8 p-4 bg-red-50 dark:bg-red-900/10 text-red-600 dark:text-red-400 text-sm overflow-auto max-w-3xl rounded-lg text-left w-full">
              {this.state.error?.stack}
            </pre>
          )}

        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
