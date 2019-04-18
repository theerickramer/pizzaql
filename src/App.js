import React, { Component } from 'react';
import ApolloClient from 'apollo-boost';
import gql from 'graphql-tag';
import { ApolloProvider, Query } from 'react-apollo';
import PizzaSizes from './PizzaSizes';
import styles from './App.module.css';

const client = new ApolloClient({
  uri: ' https://core-graphql.dev.waldo.photos/pizza'
});

class App extends Component {
  state = { selected: null, cart: [] };
  toggleSelectedPizzaSize = (pizzaSize) => {
    this.setState({ selected: pizzaSize });
  }
  render() {
    return (
      <div className={styles.app}>
        <ApolloProvider client={client}>
          <Query
            query={gql`
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
            `}
          >
            {({ loading, error, data }) => {
              if (loading) return <p>Loading...</p>;
              if (error) return <p>Error :(</p>;
              return (
                <PizzaSizes
                  data={data}
                  selected={this.state.selected}
                  toggleSelected={this.toggleSelectedPizzaSize}
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
