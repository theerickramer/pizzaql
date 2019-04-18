import React, { Component } from 'react';
import ApolloClient from 'apollo-boost';
import gql from 'graphql-tag';
import { ApolloProvider, Query } from 'react-apollo';

const client = new ApolloClient({
  uri: ' https://core-graphql.dev.waldo.photos/pizza'
});

class App extends Component {
  state = { selected: 'small' };
  render() {
    return (
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
            console.log(data)
            return data.pizzaSizes.map(
              (
                { name, maxToppings, basePrice, toppings },
                index
              ) => (
                <div key={index}>
                  <input
                    type="checkbox"
                    checked={this.state.selected === name}
                    onChange={() =>
                      this.state.selected === name
                        ? this.setState({ selected: null })
                        : this.setState({ selected: name })
                    }
                  />
                  <h3>{name}</h3>
                  <p>
                    {!maxToppings ? 'Unlimited' : maxToppings}{' '}
                    Toppings
                  </p>
                  <p>Price: {basePrice}</p>
                  {this.state.selected === name
                    ? toppings.map((topping, index) => (
                        <div key={index}>
                          <input
                            type="checkbox"
                            checked={topping.defaultSelected}
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
          }}
        </Query>
      </ApolloProvider>
    );
  }
}

export default App;
