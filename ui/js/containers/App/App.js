import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import FlatButton from 'material-ui/lib/flat-button';

import AppBar from 'material-ui/lib/app-bar';
import './App.scss'

export default class App extends Component {
  static propTypes = {
    children: React.PropTypes.any
  };

  menuButtons() {
    return <span className="menu-buttons" >
      <Link to="/ui/">Frontpage</Link>
      <Link to="/ui/Shell">Shell</Link>
      </span>
  }

  render() {
    return (
      <div>
        <AppBar
          onLeftIconButtonTouchTap={() => console.log('jee')}
          iconClassNameRight="muidocs-icon-navigation-expand-more"
          title={this.menuButtons()}
        >
        </AppBar>

        <ul>
          <li><FlatButton href="/ui/Shell" linkButton={false} label="Frontpage"  /></li>
          <li><FlatButton href="/ui/Shell" linkButton={true} label="Shell"/></li>
        </ul>
        <main className="container">
          {this.props.children}
        </main>
      </div>
    );
  }
}

