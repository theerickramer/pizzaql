import React, { Component } from 'react';
import ApolloClient from 'apollo-boost';
import gql from 'graphql-tag';
import { ApolloProvider, Query } from 'react-apollo';
import PizzaSizes from './PizzaSizes';
import styles from './App.module.css';

const client = new ApolloClient({
  uri: 'https://core-graphql.dev.waldo.photos/pizza'
});

const query = gql`
  {
    pizzaSizes {
      name
      maxToppings
      basePrice
      toppings {
        topping {
          name
          price
        }
        defaultSelected
      }
    }
  }
`;

class App extends Component {
  state = {
    selected: {
      size: null,
      basePrice: null,
      toppings: []
    },
    cart: {
      items: [],
      total: 0
    }
  };

  toggleSelectedPizzaSize = (pizzaSize, basePrice) => {
    this.setState({
      selected: {
        size: pizzaSize,
        basePrice: basePrice,
        toppings: []
      }
    });
  };

  toggleToppingSelected = toppingSelected => {
    const selected = this.state.selected;
    const { toppings } = selected;
    const isAddedAt = toppings.findIndex(
      topping => topping.topping.name === toppingSelected.topping.name
    );
    if (isAddedAt === -1) {
      toppings.push(toppingSelected);
    } else {
      toppings.splice(isAddedAt, 1);
    }
    selected.toppings = toppings;
    this.setState({ selected });
  };

  sumItems = (base, additionalPricesArray) =>
    additionalPricesArray.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      base
    );

  addToCart = () => {
    let { items, total } = this.state.cart;
    const { size, basePrice, toppings } = this.state.selected;

    items.push({
      size,
      basePrice,
      toppings
    });

    total += this.sumItems(
      basePrice,
      toppings.map(topping => topping.topping.price)
    );

    this.setState({
      selected: {},
      cart: {
        items,
        total
      }
    });
  };

  render() {
    return (
      <div className={styles.app}>
        <ApolloProvider client={client}>
          <Query query={query}>
            {({ loading, error, data }) => {
              if (loading) return <p>Loading...</p>;
              if (error) return <p>Error :(</p>;
              return (
                <PizzaSizes
                  data={data}
                  selected={this.state.selected}
                  toggleSelected={this.toggleSelectedPizzaSize}
                  toggleTopping={this.toggleToppingSelected}
                  addToCart={this.addToCart}
                />
              );
            }}
          </Query>
        </ApolloProvider>
        <h3>Cart</h3>
        {this.state.cart.items.map(item => (
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
        <h4>Total: ${this.state.cart.total.toFixed(2)}</h4>
      </div>
    );
  }
}

export default App;
