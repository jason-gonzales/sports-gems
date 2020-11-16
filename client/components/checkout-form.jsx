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

  render() {
    return (

      <form className="col-7 container">
        <div className="mt-5">
          <h3 className="mt-8">Checkout</h3>

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
        </div>
      </form>

    );
  }
}
