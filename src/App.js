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
  state = { selected: null, toppings: [], cart: [] };
  toggleSelectedPizzaSize = pizzaSize => {
    this.setState({ selected: pizzaSize });
  };
  toggleToppingSelected = toppingSelected => {
    const toppings = this.state.toppings;
    const isAddedAt = toppings.findIndex(
      topping => topping.topping.name === toppingSelected.topping.name
    );
    if (isAddedAt === -1) {
      toppings.push(toppingSelected);
    } else {
      toppings.splice(isAddedAt, 1);
    }
    this.setState({
      toppings: toppings
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
                  selectedToppings={this.state.toppings}
                  toggleSelected={this.toggleSelectedPizzaSize}
                  toggleTopping={this.toggleToppingSelected}
                />
              );
            }}
          </Query>
        </ApolloProvider>
      </div>
    );
  }
}

export default App;
