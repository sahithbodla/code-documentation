import { useEffect, useRef } from 'react';

interface PreviewProps {
  code: string;
}

const html = `
    <html>
      <head></head>
      <body>
        <!-- This is for rendering users react application -->
        <div id="root"></div>
        <script>
          window.addEventListener(
            'message',
            (event) => {
              try { 
                eval(event.data);
               } catch(err) {
                const root = document.querySelector('#root');
                root.innerHTML = '<div style="color: red;"> <h4>Runtime Error:</h4>' + err + '</div>';
                console.error(err);
               }
              
            },
            false
          );
        </script>
      </body>
    </html>
  `;

const Preview: React.FC<PreviewProps> = ({ code }) => {
  const iframe = useRef<any>();
  useEffect(() => {
    // Is users accidentally deletes the div of id root to render react application, below
    // code ensure to reload the iframe contents completely for the next execution
    iframe.current.srcdoc = html;
    iframe.current.contentWindow.postMessage(code, '*');
  }, [code]);
  return (
    <iframe
      style={{ backgroundColor: 'white' }}
      title="preview"
      ref={iframe}
      srcDoc={html}
      sandbox="allow-scripts allow-modals"
    />
  );
};

export default Preview;
