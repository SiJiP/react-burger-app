import React, { useEffect, Suspense } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actions from './store/actions/index';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Logout from './containers/Auth/Logout/Logout';
import Spinner from './components/UI/Spinner/Spinner'


const Checkout = React.lazy(() => import('./containers/Checkout/Checkout'));

const Orders = React.lazy(() => import('./containers/Orders/Orders'));

const Auth = React.lazy(() => import('./containers/Auth/Auth'));


const App = props => {

  const { onTryAutoSignUp } = props

  useEffect(() => {
   onTryAutoSignUp();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onTryAutoSignUp]);

    let routes = (
      <Switch> 
        <Route path="/auth" render={(props) => (<Suspense fallback={ <Spinner /> }> 
                                                    <Auth {...props} /> 
                                                   </Suspense>) } />
        <Route path="/"  exact component={ BurgerBuilder } />
        <Redirect to="/" />
      </Switch>
      )
    if (props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/logout" component={ Logout } /> 
          <Route path="/orders" render={ (props) => (<Suspense fallback={ <Spinner /> }> 
                                                      <Orders {...props} /> 
                                                     </Suspense>) } />
          <Route path="/checkout" render={ (props) => <Suspense fallback={ <Spinner /> }> 
                                                          <Checkout {...props}/> 
                                                         </Suspense> } />
          <Route path="/auth" render={(props) => (<Suspense fallback={ <Spinner /> }> 
                                                      <Auth {...props}/> 
                                                     </Suspense>) } />
          <Route path="/"  exact component={ BurgerBuilder } />
          <Redirect to="/" />
       </Switch>
      )
 
    }
    return ( 
      <div>
        <Layout>
          { routes }
        </Layout>
      </div>
    );

}
const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
     onTryAutoSignUp: () => dispatch(actions.authCheckState())
  }
}

export default withRouter(
  connect(
    mapStateToProps, 
    mapDispatchToProps 
    )(App)
  );
