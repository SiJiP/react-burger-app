import React, { Component } from 'react';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal'; 
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions'



class BurgerBuilder extends Component{
    state = {
        purchasing: false,
        loading: false,
        erorr: false
    }

    componentDidMount(){
        // axios.get('https://burger-app-f681b.firebaseio.com/ingredients.json')
        //     .then( response => {
        //         this.setState({ingredients: response.data})
        //     })
        //     .catch( error => {
        //         this.setState({ error: true })
        //     })
    }

    updatePurchase (ingredients) {
        const sum = Object.values(ingredients)
            .reduce((accum, current) => {
                return accum + current
            }, 0);
            return sum > 0
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false})
    }

    purchaseContinueHandler = () => {
        this.props.history.push('/checkout')
    }

    purchaseHandler = () => {
        this.setState({purchasing: true});
    }

    render() {
        const disabledInfo = {
            ...this.props.ings
        }

        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <=0 
        }

        let orderSummary = null;

        let burger = this.state.error ? <p> Ingredients can't be load </p> : <Spinner />

        if(this.props.ings){
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ings} />
                    <BuildControls 
                        ingredientAdded={this.props.onIngredientAdd} 
                        ingredientRemove={this.props.onIngredientRemove}
                        disabled={disabledInfo}
                        price={this.props.price}
                        purchaseable={this.updatePurchase(this.props.ings)}
                        ordered={this.purchaseHandler}/>
                </Aux>
            );
            orderSummary = <OrderSummary
                            price={this.props.price} 
                            purchaseCancelled={this.purchaseCancelHandler}
                            purchaseContinued={this.purchaseContinueHandler}
                            ingredients={this.props.ings} />
        }
            
        if (this.state.loading){
            orderSummary = <Spinner />
        }

        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    { orderSummary }
                </Modal>
                { burger }
            </Aux>
        );
    }
}

const mapStateToProps = state => ({
    ings: state.ingredients,
    price: state.totalPrice
})

const mapDispatchToProps = dispatch => ({
    onIngredientAdd: (ingName) => dispatch({type: actionTypes.ADD_INGREDIENT, ingredientName: ingName}),
    onIngredientRemove: (ingName) => dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingName})
})

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));