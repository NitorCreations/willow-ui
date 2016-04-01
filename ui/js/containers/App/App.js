import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import FlatButton from 'material-ui/lib/flat-button';
import { LeftMenu } from 'components';
import AppBar from 'material-ui/lib/app-bar';
import * as menuActions from 'menu/MenuActions';
import { bindActionCreators } from 'redux';
import './App.scss'

class App extends Component {
  static propTypes = {
    children: React.PropTypes.any
  };

  constructor(props) {
    super(props);
    this.menuActions = bindActionCreators(menuActions, this.props.dispatch);
  }

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
          onLeftIconButtonTouchTap={() => this.menuActions.open() }
          iconClassNameRight="muidocs-icon-navigation-expand-more"
          title={this.menuButtons()} />

        <LeftMenu/>
        <main className="container">
          {this.props.children}
        </main>
      </div>
    );
  }
}

export default connect( () => {
  return {};
} ) (App);
