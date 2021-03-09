import React from 'react';

function CartSummaryItem(props) {
  const price = props.item.price;
  const pr = price.toString().split('');
  pr.splice((pr.length - 2), 0, '.');
  const priceActual = pr.join('');

  function handleDelete() {
    props.deleteFromCart(props.item.cartItemId);
  }

  return (
    <div className="mt-3">
      <div className="row card mb-3 cart-item m-auto">
        <div className="col-md-12 d-flex justify-content-center">
          <img className="cart-img mt-2 pt-2" src={props.item.image} alt={props.item.name} />
        </div>
        <div className="card-body text-center">
          <h5 className="card-title">{props.item.name}</h5>
          <p>${priceActual}</p>
          <button className="btn remove-btn" onClick={handleDelete}>Remove</button>
        </div>
      </div>
    </div>
  );
}

export default CartSummaryItem;
