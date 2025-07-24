import React, { useEffect, useRef, useState } from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';
import './DemoIframe.css';

export default function DemoIframe({ 
  demoName, 
  height = '600px', 
  title = 'Demo',
  className = '',
  allowFullscreen = false 
}) {
  const iframeRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const demoUrl = useBaseUrl(`/demos/${demoName}/`);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    const handleLoad = () => {
      setIsLoading(false);
      setError(null);
    };

    const handleError = () => {
      setIsLoading(false);
      setError(`Failed to load demo: ${demoName}`);
    };

    const handleMessage = (event) => {
      // Handle postMessage communication from iframe
      if (event.source !== iframe.contentWindow) return;
      
      try {
        const message = typeof event.data === 'string' ? JSON.parse(event.data) : event.data;
        
        switch (message.type) {
          case 'demo:height':
            // Auto-resize iframe based on content
            if (typeof message.height === 'number' && message.height > 0) {
              iframe.style.height = `${message.height}px`;
            }
            break;
          case 'demo:error':
            setError(message.error || 'Demo encountered an error');
            break;
          case 'demo:ready':
            setIsLoading(false);
            break;
          default:
            // Unknown message type, ignore
            break;
        }
      } catch (e) {
        // Invalid JSON, ignore
      }
    };

    iframe.addEventListener('load', handleLoad);
    iframe.addEventListener('error', handleError);
    window.addEventListener('message', handleMessage);

    return () => {
      iframe.removeEventListener('load', handleLoad);
      iframe.removeEventListener('error', handleError);
      window.removeEventListener('message', handleMessage);
    };
  }, [demoName]);

  const sendMessageToDemo = (message) => {
    const iframe = iframeRef.current;
    if (iframe && iframe.contentWindow) {
      iframe.contentWindow.postMessage(JSON.stringify(message), '*');
    }
  };

  return (
    <div className={`demo-iframe-container ${className}`} style={{ margin: '1rem 0' }}>
      {isLoading && (
        <div 
          className="demo-loading"
          style={{
            height,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '1px solid var(--ifm-color-emphasis-300)',
            borderRadius: 'var(--ifm-border-radius)',
            backgroundColor: 'var(--ifm-background-color)',
            color: 'var(--ifm-color-content)',
            fontSize: '14px'
          }}
        >
          Loading demo...
        </div>
      )}
      
      {error && (
        <div 
          className="demo-error"
          style={{
            height,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '1px solid var(--ifm-color-danger)',
            borderRadius: 'var(--ifm-border-radius)',
            backgroundColor: 'var(--ifm-color-danger-lightest)',
            color: 'var(--ifm-color-danger-darkest)',
            fontSize: '14px',
            padding: '16px',
            textAlign: 'center'
          }}
        >
          <div>
            <strong>Error:</strong> {error}
            <br />
            <small>Make sure the demo has been built and is available at {demoUrl}</small>
          </div>
        </div>
      )}
      
      <iframe
        ref={iframeRef}
        src={demoUrl}
        title={title}
        style={{
          width: '100%',
          height,
          border: '1px solid var(--ifm-color-emphasis-300)',
          borderRadius: 'var(--ifm-border-radius)',
          display: error ? 'none' : 'block'
        }}
        allow={allowFullscreen ? 'fullscreen' : ''}
        sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
      />
      
    </div>
  );
}

// Convenience wrapper for common use cases
export function ChatDemo({ height = '500px', className = '' }) {
  return (
    <DemoIframe 
      demoName="real-time-chat" 
      title="Real-time Chat Demo"
      height={height}
      className={className}
    />
  );
}