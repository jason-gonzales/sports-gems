import React from 'react';

function Header(props) {

  return (
    <header className="mb-30 mt-0 d-flex align-items-center">
      <h2 className="ml-5"><i className="fas fa-dollar-sign"></i>Wicked Sales</h2>
      <div className ="cart row justify-content-end col-9 align-items-center">
        <p className ="m-0">{props.cartCount} Items</p>
        <i className ="fas fa-shopping-cart"></i>
      </div>
    </header>
  );
}

export default Header;
