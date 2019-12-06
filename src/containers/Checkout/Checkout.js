import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'; 
import ContactData from './ContactData/ContactData';


const  Checkout = props => {

  const onCheckoutCancelled = () => {
    props.history.goBack();
  };

  const onCheckoutContinued = () => {
    props.history.replace("/checkout/contact-data");
  };

    let summary = <Redirect to='/'/>
    
    if (props.ings) {
      const purchaseRedirect = props.purchased ? <Redirect to="/"/> : null
      summary = (
        <div>
          { purchaseRedirect }
          <CheckoutSummary
            ingredients={props.ings}
            onCheckoutCancelled={onCheckoutCancelled}
            onCheckoutContinued={onCheckoutContinued}
          />
          <Route
            path={props.match.path + "/contact-data"}
            component={ContactData}
          />
        </div>
      );
    }
    return summary

}

const mapStateToProps = state => ({
    ings: state.burgerBuilder.ingredients,
    purchased: state.order.purchased
})


export default connect(mapStateToProps)(Checkout);