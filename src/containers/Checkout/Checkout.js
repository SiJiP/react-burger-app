import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'; 
import { Route } from 'react-router-dom';
import ContactData from './ContactData/ContactData';


class Checkout extends Component{
    state = {
        ingredients: null,
        totalPrice: 0
    }

    componentWillMount() {
        const query = new URLSearchParams(this.props.location.search)
                      .entries()
        const ingredients = {};
        let price = 0;
        for ( let param of query ) {
            if (param[0] === 'price') {
                price = +param[1]
            } else {
                ingredients[param[0]] = +param[1]
            }
            
        }
        this.setState({ ingredients: ingredients, totalPrice: price })
    }

    onCheckoutCancelled = () => {
        this.props.history.goBack()
    }    

    onCheckoutContinued = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    render(){
        return (
            <div>
                <CheckoutSummary 
                    ingredients={this.state.ingredients}
                    onCheckoutCancelled={this.onCheckoutCancelled}
                    onCheckoutContinued={this.onCheckoutContinued} />
                <Route 
                    path={this.props.match.path + '/contact-data'} 
                    render={(props) => (<ContactData
                                        {...props} // or use HOC in ContactData withRouter
                                        ingredients={this.state.ingredients} 
                                        price={this.state.totalPrice}/>)} />
            </div>
        )
    }
}

export default Checkout;