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
      toppings: []
    },
    cart: {
      items: [],
      total: 0
    }
  };

  toggleSelectedPizzaSize = pizzaSize => {
    this.setState({ selected: { size: pizzaSize, toppings: [] } });
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

  addToCart = () => {
    const cart = this.state.cart;
    cart.items.push({
      size: this.state.selected,
      toppings: this.state.toppings
    });
    this.setState({
      cart
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
            <p>{item.size}</p>
            <ul>
              {item.toppings.map(topping => (
                <li>
                  {topping.topping.name} ${topping.topping.price.toFixed(2)}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    );
  }
}

export default App;
