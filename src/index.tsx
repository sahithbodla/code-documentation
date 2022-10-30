import 'bulmaswatch/superhero/bulmaswatch.min.css';
import ReactDOM from 'react-dom/client';
import CodeCell from './components/code-cell';

const App = () => {
  return (
    <div>
      <CodeCell />
      <CodeCell />
    </div>
  );
};

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(<App />);
