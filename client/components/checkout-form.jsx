import React from 'react';

export default class CheckoutForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      creditCard: '',
      shippingAddress: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleOrder = this.handleOrder.bind(this);
    this.orderTotal = this.orderTotal.bind(this);
  }

  handleChange(event) {
    const inputName = event.target.name;
    const value = event.target.value;
    const newState = {};
    newState[inputName] = value;
    this.setState(newState);

  }

  handleOrder(event) {
    event.preventDefault();
    this.props.placeOrder(this.state);
    this.setState({ name: '', creditCard: '', shippingAddress: '' });
    this.props.setView('catalog', {});
  }

  orderTotal(props) {
    const items = this.props.cartItem;
    const priceArr = [];
    items.forEach(item => {
      priceArr.push(item.price);
    });
    const add = (price, value) => price + value;
    const total = priceArr.reduce(add, 0);

    const cartStr = total.toString().split('');
    cartStr.splice((cartStr.length - 2), 0, '.');
    const actualTotal = cartStr.join('');
    return actualTotal;

  }

  render() {
    return (
      <div className="checkout-bg">
        <form className="container">
          <div className="row justify-content-center">
            <div className="col-10 col-lg-7 py-4 m-auto">
              <h3 className="mt-8">Checkout</h3>
              <h5>Order Total: $<span>{this.orderTotal()}</span></h5>

              <div className="form-group">
                <label htmlFor="formGroupExampleInput">Name</label>
                <input name="name" value={this.state.name} onChange={this.handleChange} type="text" className="form-control" id="formGroupExampleInput" />
              </div>
              <div className="form-group">
                <label htmlFor="formGroupExampleInput2">Credit</label>
                <input name="creditCard" value={this.state.creditCard} onChange={this.handleChange} type="number" className="form-control" id="formGroupExampleInput2" />
              </div>
              <div className="form-group">
                <label htmlFor="formGroupExampleInput2">Shipping Address</label>
                <textarea name="shippingAddress" value={this.state.shippingAddress} onChange={this.handleChange} type="text" className="form-control" id="formGroupExampleInput2" />
              </div>
              <div className="d-flex">
                <p onClick={() => this.props.setView('catalog', null)}>Continue Shopping</p>
                <button type="submit" className="btn btn-primary ml-auto" onClick={this.handleOrder}>Place Order</button>
              </div>
              <div className="mt-5">
                <h5>Reminder: This website is for demo purposes only. Please DO NOT enter any private or sensitive information!</h5>
              </div>
            </div>
          </div>
        </form>
      </div>

    );
  }
}
