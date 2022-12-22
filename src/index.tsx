import '@fortawesome/fontawesome-free/css/all.min.css';
import React, { Suspense, useState } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './state';
import ThemeProvider from './components/theme-provider';
import { getTheme } from './api';
import { tempUserGoodleId } from './constants';

const App: React.FC = () => {
  const [theme, setTheme] = useState('');
  React.useEffect(() => {
    (async function dummy() {
      const response = await getTheme(tempUserGoodleId);
      if (response.success) setTheme(response.theme);
      else {
        // TODO: error handling while fetching
      }
    })();
  }, []);
  return (
    <Provider store={store}>
      <Router>
        <Suspense>
          <ThemeProvider theme={theme} />
        </Suspense>
      </Router>
    </Provider>
  );
};

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(<App />);
