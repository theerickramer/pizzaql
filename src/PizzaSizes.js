import React from 'react';
import styles from './App.module.css';

const PizzaSizes = ({ data, selected, selectedToppings, toggleSelected, toggleTopping }) => {
  return data.pizzaSizes.map(
    ({ name, maxToppings, basePrice, toppings }, index) => (
      <div key={index}>
        <input
          checked={selected === name}
          className={styles.pizzaSizeSelect}
          type="checkbox"
          onChange={() =>
            selected === name ? toggleSelected(null) : toggleSelected(name)
          }
        />
        <h3 className={styles.pizzaSize}>{name}</h3>
        <p>{!maxToppings ? 'Unlimited' : maxToppings} Toppings</p>
        <p>Price: {basePrice}</p>
        {selected === name
          ? toppings.map((topping, index) => (
              <div key={index}>
                <input
                  type="checkbox"
                  checked={topping.defaultSelected || selectedToppings.includes(topping.topping.name)}
                  onChange={() => toggleTopping(topping.topping.name)}
                />
                {topping.topping.name}
                {' $'}
                {topping.topping.price.toFixed(2)}
              </div>
            ))
          : null}
        <hr />
      </div>
    )
  );
};

export default PizzaSizes;
