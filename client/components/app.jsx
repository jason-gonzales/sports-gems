import React from 'react';
import Header from './header';
import ProductList from './product-list';
import ProductDetails from './product-details';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: {
        name: 'catalog',
        params: {}
      },
      cart: []
    };
    this.setView = this.setView.bind(this);
    this.getCartItems = this.getCartItems.bind(this);
    this.addToCart = this.addToCart.bind(this);
  }

  componentDidMount() {
    this.getCartItems();
  }

  setView(name, params) {
    this.setState({
      view: {
        name: name,
        params: params
      }
    });
  }

  getCartItems() {
    fetch('api/cart')
      .then(res => res.json())
      .then(cart => {
        this.setState({ cart: cart });
      })
      .catch(err => console.error(err));
  }

  addToCart(product) {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product)
    };
    fetch('api/cart', requestOptions)
      .then(result => result.json())
      .then(data => {
        const updateCart = this.state.cart.slice();
        updateCart.push(data);
        this.setState({ cart: updateCart });
      })
      .catch(err => console.error(err));
  }

  render() {

    if (this.state.view.name === 'catalog') {
      return (
        <>
          <Header cartCount ={this.state.cart.length}/>
          <ProductList
            setView={this.setView} />
        </>
      );
    }

    if (this.state.view.name === 'details') {
      return (
        <>
          <Header cartCount = {this.state.cart.length}/>
          <ProductDetails
            setView={this.setView}
            params={this.state.view.params}
            addToCart={this.addToCart} />
        </>
      );
    }
  }
}
