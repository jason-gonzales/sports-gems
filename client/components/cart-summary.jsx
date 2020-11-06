import React from 'react';
import CartSummaryItem from './cart-summary-item';

function CartSummary(props) {
  let cartTotal = 0;
  let cartStr = null;
  let actualTotal = null;
  if (props.cartItem1.length === 0) {
    return (
      <div className="container">
        <div className="row">
          <div className="catalog" onClick={() => props.setView('catalog', null)}>Back to catalog</div>
          <h3 className="col-12">My Cart</h3>
        </div>
        <div className="cart-empty"><h3>Your cart is empty</h3>
        </div>
        <div className="cart-total-price"><h4>{'Item total $0'}</h4></div>
      </div>
    );
  } else {
    return (
      <div className ="container">
        <div className="row">
          <div className ="catalog" onClick={() => props.setView('catalog', null)}>Back to catalog</div>
          <h3 className="col-12">My Cart</h3>
        </div>
        <div>
          {
            props.cartItem1.map(item => {
              cartTotal += item.price;
              cartStr = cartTotal.toString().split('');
              cartStr.splice((cartStr.length - 2), 0, '.');
              actualTotal = cartStr.join('');
              return <CartSummaryItem key={item.cartItemId} item={item}/>;
            })
          }
        </div>
        <div>
          <div><h4>{`Item Total $${actualTotal}`}</h4></div>
        </div>
      </div>
    );
  }
}

export default CartSummary;