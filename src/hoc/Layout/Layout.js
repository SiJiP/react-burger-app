import React, { useState } from 'react';
import Aux from '../Auxiliary/Auxiliary'
import classes from './Layout.module.scss';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import { connect } from 'react-redux';

const Layout = props => {
    const [sideDrawerIsVisible, setSideDrawerIsVisible]  = useState(false);

    const sideDrawerToggleHandler = () => {
      setSideDrawerIsVisible(!sideDrawerIsVisible)                    
    }
    
      return (<Aux>
                <Toolbar 
                  isAuth={props.isAuth}
                  drawerToggleClicked={sideDrawerToggleHandler} />
                <SideDrawer 
                  isAuth={props.isAuth}
                  open={sideDrawerIsVisible}
                  closed={sideDrawerToggleHandler} />
                <main className={classes.Content}>
                    {props.children}
                </main>
            </Aux>
        );
      };

const mapStateToProps = state => {
  return {
    isAuth: state.auth.token !== null
  }
}

export default connect(mapStateToProps)(Layout);