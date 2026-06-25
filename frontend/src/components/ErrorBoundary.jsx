import React from 'react';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service here
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    this.setState({ errorInfo });
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div className="min-h-screen bg-bg text-text-main flex flex-col items-center justify-center p-6">
          <div className="bg-card border border-coral/50 rounded-xl p-8 max-w-2xl w-full shadow-2xl">
            <div className="flex items-center gap-4 text-coral mb-6">
              <i className="fas fa-exclamation-triangle text-4xl"></i>
              <h1 className="text-2xl font-bold">System Failure Detected</h1>
            </div>
            
            <p className="text-muted mb-4">
              The application encountered an unexpected runtime error and crashed. Don't worry, your stats are safe!
            </p>

            <div className="bg-surface/50 rounded-lg p-4 font-mono text-sm text-coral/80 overflow-auto mb-6 border border-border">
              {this.state.error && this.state.error.toString()}
              <br />
              {this.state.errorInfo && this.state.errorInfo.componentStack}
            </div>

            <button 
              onClick={() => window.location.reload()} 
              className="btn-glow px-6 py-3 bg-accent hover:bg-accent-dim text-bg font-bold rounded-lg transition-colors w-full sm:w-auto"
            >
              <i className="fas fa-rotate-right mr-2"></i> Reboot System
            </button>
          </div>
        </div>
      );
    }

    return this.props.children; 
  }
}
