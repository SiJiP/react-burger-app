import React, { useState } from "react";
import Button from "../../../components/UI/Button/Button";
import classses from "./ContactData.module.scss";
import axios from "../../../axios-orders";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";
import FormConfig from "../../../formConfig";
import { connect } from 'react-redux';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions/index';
import { updateObject, checkValidity } from '../../../shared/utility';

const  ContactData = props => {

  const [orderForm, setOrderForm] = useState(FormConfig);
  const [formIsValid, setFormIsValid] = useState(false);

  const orderHandler = event => {
    event.preventDefault();

    const formData = {};

    for (let formElId in orderForm) {
      formData[formElId] = orderForm[formElId].value;
    }

    const order = {
      ingredients: props.ings,
      price: props.price.toFixed(2),
      orderData: formData,
      userId: props.userId
    };

    props.onOrderBurger(order, props.token);
  };

  const inputChangedHandler = (event, inputIdentifier) => {

    const updatedFormElement = updateObject(orderForm[inputIdentifier], {
      value: event.target.value,
      valid: checkValidity(event.target.value, orderForm[inputIdentifier].validation),
      touched: true
    });

    const updatedOrderForm = updateObject(orderForm, {
      [inputIdentifier]: updatedFormElement
    })

    updatedOrderForm[inputIdentifier] = updatedFormElement;

    let formIsValid = true;
    Object.keys(updatedOrderForm).forEach(inputId => {
      formIsValid = updatedOrderForm[inputId].valid && formIsValid;
    });
    setOrderForm(updatedOrderForm);
    setFormIsValid(formIsValid)
  };

    const formElementsArray = Object.keys(orderForm).reduce(
      (accum, key) => [
        ...accum,
        {
          id: key,
          config: orderForm[key]
        }
      ],
      []
    );

    let form = (
      <form onSubmit={orderHandler}>
        {formElementsArray.map(formElement => {
          return (
            <Input
              key={formElement.id}
              elementType={formElement.config.elementType}
              elementConfig={formElement.config.elementConfig}
              value={formElement.config.value}
              invalid={!formElement.config.valid}
              touched={formElement.config.touched}
              errorMessage={formElement.config.errorText}
              shouldValidate={formElement.config.validation}
              changed={event => inputChangedHandler(event, formElement.id)}
            />
          );
        })}

        <Button btnType="Success" disabled={!formIsValid}>
          ORDER
        </Button>
      </form>
    );

    if (props.loading) {
      form = <Spinner />;
    }

    return (
      <div className={classses.ContactData}>
        <h4>Enter your Contact Data</h4>
        {form}
      </div>
    );
}

const mapstateToProps = state => ({
  ings: state.burgerBuilder.ingredients,
  price: state.burgerBuilder.totalPrice,
  loading: state.order.loading,
  token: state.auth.token,
  userId: state.auth.userId
});

const mapDispatchToProps = dispatch => {
  return {
    onOrderBurger: (orderData, token) => dispatch(actions.purchaseBurger(orderData, token))
  };
};

export default connect(
  mapstateToProps,
  mapDispatchToProps
)(withErrorHandler(ContactData, axios));
