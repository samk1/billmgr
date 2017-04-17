import React from 'react'
import {
  BrowserRouter as Router,
  Route, Redirect
} from 'react-router-dom';
import { Setup } from './Setup/Components';

const App = () => (
  <Router>
    <div>
      <Redirect to="/setup" />
      <Route path="/setup" component={Setup} />
    </div>
  </Router>
);

export default App;
