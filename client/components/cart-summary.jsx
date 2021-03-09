import React from 'react';
import CartSummaryItem from './cart-summary-item';

function CartSummary(props) {
  let cartTotal = 0;
  let cartStr = null;
  let actualTotal = null;
  if (props.cartItem.length === 0) {
    return (
      <div className="cart-summary-bg">
        <div className="container">
          <div className="row">
            <div className="catalog cursor" onClick={() => props.setView('catalog', null)}>Back to catalog</div>
            <h3 className="col-12 mt-4">My Cart</h3>
          </div>
          <div className="cart-empty"><h3>Your cart is empty</h3>
          </div>
          <div className="cart-total-price"><h4>{'Item total $0'}</h4></div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="cart-summary-bgs">
        <div className="container">
          <div className=" col-11 container">
            <div className="catalog cursor py-2" onClick={() => props.setView('catalog', null)}>Back to catalog</div>
            <div>
              <h3 className="py-2">My Cart</h3>
            </div>
          </div>
          <div className="col-11 m-auto">
            {
              props.cartItem.map(item => {
                cartTotal += item.price;
                cartStr = cartTotal.toString().split('');
                cartStr.splice((cartStr.length - 2), 0, '.');
                actualTotal = cartStr.join('');
                return <CartSummaryItem
                  key={item.cartItemId}
                  item={item}
                  deleteFromCart={props.deleteFromCart} />;
              })
            }
          </div>
          <div className="col-11 container py-5">
            <div>
              <h4>Item Total <span className="float-right">${actualTotal}</span></h4>
            </div>
            <button className="btn btn-primary col-md-3 float-right" onClick={() => props.setView('checkout', {})}>Checkout</button>
          </div>
        </div>
      </div>
    );
  }
}

export default CartSummary;
