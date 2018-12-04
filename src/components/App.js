import React, { Component } from 'react';
import { Link } from 'react-router-dom'

class App extends Component {

  render() {
    return (
      <div className='app'>

        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <a className="navbar-brand" href="/">Word2Vec Visualizer</a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
                  aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className={this.getClassname(['/explore', '/'])}><Link className="nav-link" to='/explore'>Explore</Link></li>
              <li className={this.getClassname(['/compare'])}><Link className="nav-link" to='/compare'>Compare</Link></li>
            </ul>
          </div>
        </nav>

        <div className='app-view-container container-fluid'>
          {this.props.children}
        </div>
      </div>
    );
  }

  getClassname(routes) {
    return routes.includes(this.props.location.pathname) ? 'nav-item active' : 'nav-item';
  }
}

export default App;
