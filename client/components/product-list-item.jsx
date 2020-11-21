import React from 'react';

function ProductListItem(props) {
  const priceNum = props.product.price;
  const pr = priceNum.toString().split('');
  pr.splice((pr.length - 2), 0, '.');
  const priceActual = pr.join('');

  function handleClick(event) {

    props.setView('details', { productId: props.product.productId });
  }

  return (

    <div className="card mb-4 mx-1 card-list-item" onClick={handleClick}>
      <div className="img-container m-auto">
        <img className="card-img-top pt-2 product-img" src={props.product.image} alt={props.product.name}/>
      </div>
      <div className="card-body">
        <p className="card-title">{props.product.name}</p>
        <p className="card-price">${priceActual}</p>
        <p className="card-text">{props.product.shortDescription}</p>
      </div>
    </div>
  );
}
export default ProductListItem;
