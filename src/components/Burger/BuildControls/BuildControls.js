import React from 'react';
import classes from './BuildControls.module.scss';
import BuildControl from './BuildControl/BuildControl'

const controls = [
    {label: 'Salad', type: 'salad'},
    {label: 'Bacon', type: 'bacon'},
    {label: 'Cheese', type: 'cheese'},
    {label: 'Meat', type: 'meat'},
] 

const buildControls = (props) => (
   <div className={classes.BuildControls}>
       <p>Current price: <strong>{props.price.toFixed(2)}</strong></p>
       {controls.map(ctrl => (
           <BuildControl 
              key={ctrl.label} 
              label={ctrl.label}
              added={() => props.ingredientAdded(ctrl.type)}
              remove={() => props.ingredientRemove(ctrl.type)}
              disabled={props.disabled[ctrl.type]}/>
       ))}
       <button 
        className={classes.OrderButton}
        disabled={!props.purchaseable}
        onClick={props.ordered}>{ props.isAuth ? 'ORDER NOW' : 'SIGN UP' }</button>
   </div>
)

export default buildControls;