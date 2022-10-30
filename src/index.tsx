import * as esbuild from 'esbuild-wasm';
import { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom/client';
import { unpkgPathPlugin } from './plugins/unpkg-path-plugin';
import { fetchPlugin } from './plugins/fetch-plugin';
import CodeEditor from './components/code-editor';

const App = () => {
  const ref = useRef<any>();
  const iframe = useRef<any>();
  const [input, setInput] = useState('input');

  const startService = async () => {
    ref.current = await esbuild.startService({
      worker: true,
      wasmURL: 'https://unpkg.com/esbuild-wasm@0.8.27/esbuild.wasm',
    });
  };

  useEffect(() => {
    startService();
  }, []);

  const onClick = async () => {
    if (!ref.current) {
      return;
    }
    // Is users accidentally deletes the div of id root to render react application, below
    // code ensure to reload the iframe contents completely for the next execution
    iframe.current.srcdoc = html;
    const result = await ref.current.build({
      entryPoints: ['index.js'],
      bundle: true,
      write: false,
      // plugins will run from left-to-right or top-to-bottom
      plugins: [unpkgPathPlugin(), fetchPlugin(input)],
      define: {
        'process.env.NODE_ENV': '"production"',
        global: 'window',
      },
    });

    // setCode(result.outputFiles[0].text);
    iframe.current.contentWindow.postMessage(result.outputFiles[0].text, '*');
  };

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

  const initialValue = `// please type in some JavaScript to see the magic
const a = 1;`;

  return (
    <div>
      <CodeEditor initialValue={initialValue} />
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
      ></textarea>
      <div>
        <button onClick={onClick}>Submit</button>
      </div>
      <iframe
        title="preview"
        ref={iframe}
        srcDoc={html}
        sandbox="allow-scripts allow-modals"
      />
    </div>
  );
};

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(<App />);
