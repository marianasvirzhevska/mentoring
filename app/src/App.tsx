import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ThemeProvider from '@material-ui/styles/ThemeProvider';
import { Provider } from 'react-redux';

import store from './store/index';
import theme from './muiTheme';

import Login from './components/login';
import StartScreen from './components/startScreen';
import Challenge from './components/challenge';

const App: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/challenge" component={Challenge} />
        <Route path="*" component={StartScreen} />
      </Switch>
    </Router>
  );
};

const AppProvider: React.FC = () => (
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <App />
    </Provider>
  </ThemeProvider>
);

export default AppProvider;
