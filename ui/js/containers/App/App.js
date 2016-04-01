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
    return <span >
      <FlatButton label="Frontpage" href="" containerElement={<Link to="/ui/" />} linkButton={true}/>
      <FlatButton label="Shell" href="" containerElement={<Link to="/ui/Shell" />} linkButton={true}/>
    </span>
  }

  render() {
    return (
      <div>
        <AppBar
          onLeftIconButtonTouchTap={() => console.log('jee')}
          iconClassNameRight="muidocs-icon-navigation-expand-more"
          title={this.menuButtons()} />

        <main className="container">
          {this.props.children}
        </main>
      </div>
    );
  }
}

