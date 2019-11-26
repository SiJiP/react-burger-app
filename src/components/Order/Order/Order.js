import React from 'react';
import classes from './Order.module.scss'


const order = (props) => {
    const ingredients = Object.keys(props.ingredients).reduce(
      (accum, keyName) => {
        return [
          ...accum,
          {
            name: keyName,
            amount: props.ingredients[keyName]
          }
        ];
      },
      []
    );
    const ingredientOutput = ingredients.map(ig => {
        return (
        <span 
            style={{
                textTransform: 'capitalize',
                display: 'inline-block',
                margin: '0 8px',
                border: '1px solid #ccc',
                padding: '5px'
            }}
            key={ig.name}>{ig.name}({ig.amount})</span>
        )
    })

    return ( 
        <div className={classes.Order}>
            <p>Ingredients: { ingredientOutput } </p>
            <p>Price: <strong>USD {props.price}</strong></p>
        </div> 
        )
};

export default order;
