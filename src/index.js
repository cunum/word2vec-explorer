import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import * as serviceWorker from './utils/serviceWorker';
import { Route, BrowserRouter } from "react-router-dom";
import ExploreSection from './components/ExploreSection';
import CompareSection from './components/CompareSection';
import { withRouter } from 'react-router'

const Application = withRouter(props => <App {...props}/>);

ReactDOM.render(
  <BrowserRouter>
    <Application>
      <Route exact path='/' component={ExploreSection} />
      <Route path='/explore' component={ExploreSection} />
      <Route path='/compare' component={CompareSection} />
    </Application>
  </BrowserRouter>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
