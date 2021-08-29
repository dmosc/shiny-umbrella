import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import Layout from './layouts/main';
import Dashboard from './views/dashboard';
import Reading from './views/reading';

const App = () => {
  return (
    <Layout>
      <Switch>
        <Route exact path="/" component={Dashboard} />
        <Route exact path="/reading" component={Reading} />
        <Redirect to="/" />
      </Switch>
    </Layout>
  );
};

export default App;
