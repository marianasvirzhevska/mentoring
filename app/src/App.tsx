import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ThemeProvider from '@material-ui/styles/ThemeProvider';

import theme from './muiTheme';
import PrivateRoute from './components/privateRoute';

import Login from './components/login';
import StartScreen from './components/startScreen';
import Challenge from './components/challenge';
import TaskArchive from './components/taskArchive';

const App: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route path="/login" component={Login} />
        <PrivateRoute path="/challenge" component={Challenge} exact={true} />
        <PrivateRoute
          path="/tasks-archive"
          component={TaskArchive}
          exact={true}
        />
        <Route path="*" component={StartScreen} />
      </Switch>
    </Router>
  );
};

const AppProvider: React.FC = () => (
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>
);

export default AppProvider;
