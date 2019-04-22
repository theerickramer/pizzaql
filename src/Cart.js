import React, { Fragment } from 'react';

const Cart = ({ items, total }) => (
  <Fragment>
    <h3>Cart</h3>
    {items.map(item => (
      <div>
        <p>(1) Size: {item.size}</p>
        <p>Base Price: ${item.basePrice}</p>
        <ul>
          {item.toppings.map(topping => (
            <li>
              {topping.topping.name} ${topping.topping.price.toFixed(2)}
            </li>
          ))}
        </ul>
      </div>
    ))}
    <h4>Total: ${total.toFixed(2)}</h4>
  </Fragment>
);

export default Cart;
