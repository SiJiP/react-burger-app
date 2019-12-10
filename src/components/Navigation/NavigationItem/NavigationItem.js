import React from 'react';
import { NavLink } from 'react-router-dom';

import classes from './Navigationitem.module.scss';


const navigationItem = props => (
  <li className={classes.NavigationItem}>
    <NavLink
      exact={props.exact}
      to={props.link}
      activeClassName={classes.active}
    >
      {props.children}
    </NavLink>
  </li>
);

export default navigationItem;
