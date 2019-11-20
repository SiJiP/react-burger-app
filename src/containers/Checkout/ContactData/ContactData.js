import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import classses from './ContactData.module.scss';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner'

class ContactData extends Component{
     state = {
         name: '',
         email: '',
         adress: {
             street: '',
             postalCode: ''
         },
         loading: false
     }

     orderHandler = (event) => {
        event.preventDefault();

        this.setState({ loading: true });

        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price.toFixed(2),
            customer: {
                name: 'Anton Petrov',
                address: {
                    street: 'Teststreet',
                    zipCode: '45364',
                    country: 'Ukraine'
                },
                email: 'test@test.com',
            },
            deliveryMethod: 'fastest',
        }

        axios.post('/orders.json', order)
            .then( response => {
                this.setState({loading: false });
                this.props.history.push('/')
            })
            .catch( error => {
                this.setState({loading: false });
            })
     }

     render() {
         let form = (
            <form>
            <input className={classses.Input} type="text" name="name" placeholder="Your Name" />
            <input className={classses.Input} type="text" name="email" placeholder="Your Mail" />
            <input className={classses.Input} type="text" name="street" placeholder="Street" />
            <input className={classses.Input} type="text" name="postal" placeholder="Postal Code" />
            <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
        </form>
         );
         if (this.state.loading) {
             form = <Spinner />
         }

         return (
             <div className={classses.ContactData}>
                 <h4>Enter your Contact Data</h4>
                  { form }
             </div>
         )
     }
}

export default ContactData;