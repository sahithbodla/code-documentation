import { useEffect, useRef } from 'react';
import './preview.css';

interface PreviewProps {
  code: string;
  error: string;
}

const html = `
    <html>
      <head>
        <style>html { background-color: white; }</style>
      </head>
      <body>
        <!-- This is for rendering users react application -->
        <div id="root"></div>
        <script>
          const handleError = (err) => {
            const root = document.querySelector('#root');
            root.innerHTML = '<div style="color: red;"> <h4>Runtime Error:</h4>' + err + '</div>';
            console.error(err);
          };
          window.addEventListener('error', (event) => {
            event.preventDefault();
            handleError(event.error);
          })
          window.addEventListener(
            'message',
            (event) => {
              try { 
                eval(event.data);
               } catch(err) {
                handleError(err);
               } 
            },
            false
          );
        </script>
      </body>
    </html>
  `;

const Preview: React.FC<PreviewProps> = ({ code, error }) => {
  const iframe = useRef<any>();
  useEffect(() => {
    // Is users accidentally deletes the div of id root to render react application, below
    // code ensure to reload the iframe contents completely for the next execution
    iframe.current.srcdoc = html;
    setTimeout(() => {
      iframe.current.contentWindow.postMessage(code, '*');
    }, 50);
  }, [code]);
  return (
    <div className="preview-wrapper">
      <iframe
        title="preview"
        ref={iframe}
        srcDoc={html}
        sandbox="allow-scripts allow-modals"
      />
      {error && <div className="preview-error">{error}</div>}
    </div>
  );
};

export default Preview;
