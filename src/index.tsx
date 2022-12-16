import 'bulmaswatch/superhero/bulmaswatch.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './state';
import CellList from './components/cell-list';
import DocumentList from './components/document-list';
import NavBar from './components/nav-bar';

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <div>
          <NavBar />
          <Routes>
            <Route path="/" element={<DocumentList />}></Route>
            <Route path="/create" element={<CellList />}></Route>
            <Route path="/:id" element={<CellList />}></Route>
          </Routes>
        </div>
      </Router>
    </Provider>
  );
};

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(<App />);
