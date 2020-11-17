import React from 'react';
import ProductListItem from './product-list-item';

export default class ProductList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: []
    };
    this.getProducts = this.getProducts.bind(this);
  }

  componentDidMount() {
    this.getProducts();

  }

  getProducts() {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        this.setState({
          products: data
        });
      })
      .catch(err => console.error(err));
  }

  render() {
    const products = this.state.products.map(product =>
      <ProductListItem key={product.productId} product={product} setView={this.props.setView} />
    );
    return (
      <div className="product-list-bg">
        <div className="container">
          <div className="row d-flex flex-wrap mb-4 d-flex justify-content-center">{products}</div>
        </div>
      </div>
    );
  }
}
