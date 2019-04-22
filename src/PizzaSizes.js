import React from 'react';
import styles from './App.module.css';

const PizzaSizes = ({
  data,
  selected,
  toggleSelected,
  toggleTopping,
  addToCart
}) => {
  const isSelectedSize = pizzaSize => selected.size === pizzaSize;
  const isSelectedTopping = toppingName =>
    selected.toppings.find(topping => topping.topping.name === toppingName);

  return data.pizzaSizes.map(
    ({ name, maxToppings, basePrice, toppings }, index) => (
      <div key={index}>
        <input
          checked={isSelectedSize(name)}
          className={styles.pizzaSizeSelect}
          type="checkbox"
          onChange={() =>
            isSelectedSize(name) ? toggleSelected(null) : toggleSelected(name, basePrice)
          }
        />
        <h3 className={styles.pizzaSize}>{name}</h3>
        <p>{!maxToppings ? 'Unlimited' : maxToppings} Toppings</p>
        <p>Base Price: {basePrice}</p>
        {isSelectedSize(name) &&
          toppings.map((topping, index) => {
            if (
              topping.defaultSelected &&
              !isSelectedTopping(topping.topping.name)
            ) {
              toggleTopping(topping);
            }
            return (
              <div key={index}>
                <input
                  checked={
                    topping.defaultSelected ||
                    isSelectedTopping(topping.topping.name)
                  }
                  disabled={
                    !isSelectedTopping(topping.topping.name) &&
                    selected.toppings.length === maxToppings
                  }
                  onChange={() => toggleTopping(topping)}
                  type="checkbox"
                />
                {topping.topping.name}
                {' $'}
                {topping.topping.price.toFixed(2)}
              </div>
            );
          })}
        {isSelectedSize(name) && (
          <button onClick={addToCart}>Add To Cart</button>
        )}
        <hr />
      </div>
    )
  );
};

export default PizzaSizes;
