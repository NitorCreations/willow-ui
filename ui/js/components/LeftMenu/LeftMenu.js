import React from 'react';
import { connect } from 'react-redux';

import PureComponent from 'react-pure-render/component';
import LeftNav from 'material-ui/lib/left-nav';
import MenuItem from 'material-ui/lib/menus/menu-item';
import RaisedButton from 'material-ui/lib/raised-button';
import * as actionCreators from 'menu/MenuActions';
import { bindActionCreators } from 'redux';

class LeftMenu extends PureComponent {

  constructor(props) {
    super(props);
    this.actions = bindActionCreators(actionCreators, this.props.dispatch);
  }

  render() {
    return (
      <div>
        <LeftNav
          docked={false}
          width={200}
          open={this.props.open}
          onRequestChange={() => {this.actions.close();}}
        >
          <MenuItem onTouchTap={this.actions.close}>Menu Item</MenuItem>
          <MenuItem onTouchTap={this.actions.close}>Menu Item 2</MenuItem>
        </LeftNav>
      </div>
    );
  }
}

export default connect( state => {
  return {open: state.get('menus').get('open')};
} ) (LeftMenu);
