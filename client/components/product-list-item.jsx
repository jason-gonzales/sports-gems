import React from 'react';

function ProductListItem(props) {
const priceNum = props.product.price;
const pr = priceNum.toString().split('');
pr.splice((pr.length-2),0,'.');
const priceActual = pr.join('');
console.log(priceActual);
  return (

    <div className="card col-3">
      <img className="card-img-top" src={props.product.image} alt={props.product.name}/>
        <div className="card-body">
          <p className="card-text">{props.product.name}</p>
          <p className="card-price">${priceActual}</p>
          <p className="card-text">{props.product.shortDescription}</p>
        </div>
</div>
)
}
export default ProductListItem;
