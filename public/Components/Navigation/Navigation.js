import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
// import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
// import List from '@material-ui/core/List';
// import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/core/Menu';
// import { Icon } from '@material-ui/core';

const drawerWidth = 240;

const styles = theme => ({
  root: {
    flexGrow: 1,
    height: 430,
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
    width: '100%'
  },
  appBar: {
    position: 'absolute',
    marginLeft: drawerWidth,
    [theme.breakpoints.up('md')]: {
      width: `calc(100% - ${drawerWidth}px`
    }
  },
  navIconHide: {
    [theme.breakpoints.up('md')]: {
      display: 'none'
    }
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
    [theme.breakpoints.up('md')]: {
      position: 'relative'
    }
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 2
  }
})

class Navigation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isMobileOpen: false
    }
    this.toggleDrawer = this.toggleDrawer.bind(this);
  }
  toggleDrawer() {
    this.setState(state => ({ isMobileOpen: !this.state.isMobileOpen }));
  }
  render() {
    const { classes, theme } = this.props;
    console.log(classes, theme, 'drawer')
    const drawer = (
      <div>
        <div className={classes.toolbar}>
        <Divider />
        <p>something</p>
        </div>
      </div>
    );

    return (
      <div className={classes.root}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={this.toggleDrawer}
              className={classes.navIconHide}>
              <MenuIcon />
            </IconButton>
            <Typography variant="title" color="inherit" noWrap>
              Menu
            </Typography>
          </Toolbar>
          
        </AppBar>
      </div>
    )
  }
}

export default withStyles(styles, { withTheme: true })(Navigation);