import React from 'react';
import Header from './header';
import ProductList from './product-list';
import ProductDetails from './product-details';
import CartSummary from './cart-summary';
import CheckoutForm from './checkout-form';

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
    this.placeOrder = this.placeOrder.bind(this);
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
    fetch('/api/cart')
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
    fetch('/api/cart', requestOptions)
      .then(result => result.json())
      .then(data => {
        const updateCart = this.state.cart.slice();
        updateCart.push(data);
        this.setState({ cart: updateCart });
      })
      .catch(err => console.error(err));
  }

  placeOrder(object) {
    const requestOptions = {
      method: 'POST',
      header: { 'Content-Type': 'application/json' },
      body: JSON.stringify(object)
    };
    fetch('/api/orders', requestOptions)
      .then(result => result.json())
      .then(data => this.setState({
        view: { name: 'catalog', params: {} },
        cart: []
      }))
      .catch(err => console.error(err));
  }

  render() {
    let view = null;

    if (this.state.view.name === 'catalog') {
      view = <ProductList setView={this.setView} />;
    } else if (this.state.view.name === 'details') {
      view = <ProductDetails setView={this.setView} params={this.state.view.params} addToCart={this.addToCart} />;
    } else if (this.state.view.name === 'cart') {
      view = <CartSummary cartItem={this.state.cart} setView={this.setView} />;
    } else if (this.state.view.name === 'checkout') {
      view = <CheckoutForm cartItem ={this.state.cart} placeOrder ={this.placeOrder} setView={this.setView} />;
    }
    return (
      <>
        <Header cartCount={this.state.cart.length} setView={this.setView} />
        {view}
      </>
    );
  }
}
