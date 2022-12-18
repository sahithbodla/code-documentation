import React from 'react';
import { useActions } from '../hooks';

const Solar = React.lazy(() => import('../themes/solar'));
const Slate = React.lazy(() => import('../themes/slate'));
const SuperHero = React.lazy(() => import('../themes/super-hero'));

interface IThemeProviderProps {
  theme: string;
}

const ThemeProvider: React.FC<IThemeProviderProps> = ({ theme }) => {
  const { setTheme } = useActions();
  setTheme(theme);
  switch (theme) {
    case 'slate':
      return <Slate />;
    case 'solar':
      return <Solar />;
    case 'superhero':
      return <SuperHero />;
  }
  return <div></div>;
};

export default ThemeProvider;
