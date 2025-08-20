import React from 'react';

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
        <div
          style={{
            padding: '20px',
            textAlign: 'center',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              background: 'rgba(255, 255, 255, 0.1)',
              borderRadius: '12px',
              padding: '40px',
              maxWidth: '500px',
              backdropFilter: 'blur(10px)',
            }}
          >
            <h2 style={{ marginBottom: '20px', fontSize: '24px' }}>
              Something went wrong with Gemtry
            </h2>
            <p
              style={{ marginBottom: '30px', fontSize: '16px', opacity: '0.9' }}
            >
              We encountered an unexpected error. Please refresh the page or try
              again later.
            </p>
            {this.state.error && (
              <details style={{ marginBottom: '30px', textAlign: 'left' }}>
                <summary style={{ cursor: 'pointer', marginBottom: '10px' }}>
                  Technical Details
                </summary>
                <code
                  style={{
                    background: 'rgba(0, 0, 0, 0.2)',
                    padding: '10px',
                    borderRadius: '4px',
                    display: 'block',
                    fontSize: '12px',
                  }}
                >
                  {this.state.error.toString()}
                </code>
              </details>
            )}
            <button
              onClick={() => window.location.reload()}
              style={{
                padding: '12px 24px',
                background: 'white',
                color: '#667eea',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '16px',
                fontWeight: '600',
                transition: 'transform 0.2s',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
              }}
              onMouseOver={(e) => (e.target.style.transform = 'scale(1.05)')}
              onMouseOut={(e) => (e.target.style.transform = 'scale(1)')}
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
