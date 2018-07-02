import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import { Link } from 'react-router-dom';

const MainMenu = () => (
  <nav>
    <List>
      <ListItem>
        <Link to='/'>
          <ListItemText primary='Home' />
        </Link>
      </ListItem>
      <ListItem>
        <Link to='/technique-select'>
          <ListItemText primary='Technique Select' />
        </Link>
      </ListItem>
      <ListItem>
        <Link to='/add-technique'>
          <ListItemText primary='Add Technique' />
        </Link>
      </ListItem>
    </List>
  </nav>
);

export default MainMenu;