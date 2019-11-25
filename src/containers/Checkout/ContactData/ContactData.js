import React, { Component } from "react";
import Button from "../../../components/UI/Button/Button";
import classses from "./ContactData.module.scss";
import axios from "../../../axios-orders";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";
import FormConfig from "../../../formConfig";
import { connect } from 'react-redux'

class ContactData extends Component {
  state = {
    orderForm: FormConfig,
    loading: false,
    formIsValid: false
  };

  orderHandler = event => {
    event.preventDefault();

    this.setState({ loading: true });

    const formData = {};

    for (let formElId in this.state.orderForm) {
      formData[formElId] = this.state.orderForm[formElId].value;
    }

    const order = {
      ingredients: this.props.ings,
      price: this.props.price.toFixed(2),
      orderData: formData
    };

    axios
      .post("/orders.json", order)
      .then(response => {
        this.setState({ loading: false });
        this.props.history.push("/");
      })
      .catch(error => {
        this.setState({ loading: false });
      });
  };

  inputChangedHandler = (event, inputIdentifier) => {
    const updatedOrderForm = {
      ...this.state.orderForm
    };
    const updatedFormElement = {
      ...updatedOrderForm[inputIdentifier]
    };
    updatedFormElement.value = event.target.value;
    updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation)
    updatedFormElement.touched = true; 
    updatedOrderForm[inputIdentifier] = updatedFormElement;

    let formIsValid = true;
    Object.keys(updatedOrderForm).forEach(inputId => {
      formIsValid = updatedOrderForm[inputId].valid && formIsValid
    })

    this.setState({ orderForm: updatedOrderForm, formIsValid: formIsValid });
  };

  checkValidity = (value, rules) => {
      let isValid = true;

      if(rules.required) {
          isValid = value.trim() !== '' && isValid;
      }

      if(rules.minLength){
          isValid = value.length >= rules.minLength && isValid
      }

      if(rules.maxLength){
        isValid = value.length <= rules.maxLength && isValid
      };
      return isValid
}

  render() {
    const formElementsArray = Object.keys(this.state.orderForm).reduce(
      (accum, key) => [
        ...accum,
        {
          id: key,
          config: this.state.orderForm[key]
        }
      ],
      []
    );

    let form = (
      <form onSubmit={this.orderHandler}>
        {formElementsArray.map(formElement => {
          return (
          <Input
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            invalid={!formElement.config.valid}
            touched = {formElement.config.touched}
            errorMessage = {formElement.config.errorText}
            shouldValidate={formElement.config.validation}
            changed={event => this.inputChangedHandler(event, formElement.id)}
          />
        )})}

        <Button btnType="Success" disabled={ !this.state.formIsValid }>ORDER</Button>
      </form>
    );

    if (this.state.loading) {
      form = <Spinner />;
    }

    return (
      <div className={classses.ContactData}>
        <h4>Enter your Contact Data</h4>
        {form}
      </div>
    );
  }
  }

  const mapstateToProps = state => ({
    ings: state.ingredients,
    price: state.totalPrice
  })

export default connect(mapstateToProps)(ContactData);
