import React from 'react';
import Modal from 'react-modal';

export default class ProductDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: null,
      modalOpen: false
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleCart = this.handleCart.bind(this);
  }

  componentDidMount() {
    fetch(`/api/products/${this.props.params.productId}`)
      .then(res => res.json())
      .then(product =>
        this.setState({
          product: product
        }))
      .catch(err => console.error(err));
  }

  handleClick(event) {
    if (event.target.id) {
      this.props.setView('catalog', null);
    }
  }

  handleCart() {
    this.props.addToCart(this.state.product);
    this.setState({
      modalOpen: true
    });
    setTimeout(() => {
      this.setState({
        modalOpen: false
      });
    }, 2000);

  }

  priceFormat() {
    if (this.state.product) {
      const priceNum = this.state.product.price;
      const pr = priceNum.toString().split('');
      pr.splice((pr.length - 2), 0, '.');
      const priceActual = pr.join('');
      return priceActual;
    }
  }

  render() {
    if (this.state.product) {
      return (
        <>
          <Modal isOpen={this.state.modalOpen}
            className="modal-add"
            style={{
              overlay: {
                position: 'fixed',
                backgroundColor: 'rgba(0,0,0,0)'
              }
            }}>
            <h2>Item added to cart</h2>

          </Modal>
          <div className="product-detail-bg">
            <div className="container" onClick={this.handleClick}>
              <div className="d-flex justify-content-center pt-5 pb-5">
                <div className="card card-detail-products">
                  <div className="row ml-3 mb-3 cursor" id="catalog">Back to catalog</div>
                  <div className="row no-gutters detail-img">
                    <div className="col-6">
                      <img src={this.state.product.image} className="card-img" alt={this.state.product.name} />
                    </div>
                    <div className="shake col-md-6">
                      <div className="card-body">
                        <h5 className="card-title">{this.state.product.name}</h5>
                        <p>${this.priceFormat()}</p>
                        <p className="card-text">{this.state.product.shortDescription}</p>
                        <button className="btn btn-primary" onClick={this.handleCart}>Add To Cart</button>
                      </div>
                    </div>
                    <div className="row mt-n4">
                      <div className="col-12">
                        <p className="card-text col-12 my-4">{this.state.product.longDescription}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      );
    } else {
      return null;
    }
  }
}
