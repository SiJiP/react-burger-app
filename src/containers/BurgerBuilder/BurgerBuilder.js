import React, { useState, useEffect,  useCallback  } from 'react';
import { useDispatch, useSelector} from 'react-redux';

import Aux from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal'; 
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';



const BurgerBuilder = props =>{

    const [purchasing, setPurchasing] = useState(false);
    const dispatch = useDispatch();

    const ings = useSelector( state => state.burgerBuilder.ingredients);
    const price = useSelector( state => state.burgerBuilder.totalPrice);
    const error = useSelector( state => state.burgerBuilder.error);
    const isAuthenticated = useSelector( state => state.auth.token !== null);

    const onIngredientAdd = (ingName) => dispatch(actions.addIngredient(ingName));
    const onIngredientRemove = (ingName) => dispatch(actions.removeIngredient(ingName));
    const onInitIngredients = useCallback(() => dispatch(actions.initIngredients()), [dispatch]);
    const onInitPurchase = () => dispatch(actions.purchaseInit());
    const onSetAuthRedirectPath = (path) => dispatch(actions.setAuthRedirectPath(path));

    useEffect(() => {
        onInitIngredients()
    }, [onInitIngredients]);

    const updatePurchase = (ingredients) => {
        const sum = Object.values(ingredients)
            .reduce((accum, current) => {
                return accum + current
            }, 0);
            return sum > 0
    }

    const purchaseCancelHandler = () => {
        setPurchasing(false)
    }

    const purchaseContinueHandler = () => {
        onInitPurchase();
        props.history.push("/checkout");
    }

    const purchaseHandler = () => {
        if (isAuthenticated) {
            setPurchasing(true)
        } else {
            onSetAuthRedirectPath('/checkout');
            props.history.push('/auth');
        }
        
    }

        const disabledInfo = {
            ...ings
        }

        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <=0 
        }

        let orderSummary = null;

        let burger = error ? <p> Ingredients can't be load </p> : <Spinner />

        if(ings){
            burger = (
              <Aux>
                <Burger ingredients={ings} />
                <BuildControls
                  ingredientAdded={onIngredientAdd}
                  ingredientRemove={onIngredientRemove}
                  disabled={disabledInfo}
                  price={price}
                  purchaseable={updatePurchase(ings)}
                  ordered={purchaseHandler}
                  isAuth={isAuthenticated}
                />
              </Aux>
            );
            orderSummary = <OrderSummary
                            price={price} 
                            purchaseCancelled={purchaseCancelHandler}
                            purchaseContinued={purchaseContinueHandler}
                            ingredients={ings} />
        }
            

        return (
            <Aux>
                <Modal show={purchasing} modalClosed={purchaseCancelHandler}>
                    { orderSummary }
                </Modal>
                { burger }
            </Aux>
        );
    }

export default withErrorHandler(BurgerBuilder, axios);