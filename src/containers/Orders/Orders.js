import React, { Component } from 'react';
import Order from '../../components/Order/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';


class Orders extends Component {
    state = {
        orders: [],
        loading: true
    }

    componentDidMount(){
        axios.get('/orders.json')
            .then(res => {
              const fetchedOrders = Object.keys(res.data)
                    .reduce((accum, keyId) => {
                        return [...accum, {...res.data[keyId], id: keyId}]
                    }, [])
                this.setState({loading: false, orders: fetchedOrders})
            })
            .catch( err => {
                this.setState({loading: false})
            })
    }

    render(){
        return (
            <div>
               { this.state.orders.map( order => {
                return (  <Order key={order.id}
                          ingredients={order.ingredients}
                          price={order.price}/> )
                })}
            </div>
        );
    }
}

export default withErrorHandler(Orders, axios);