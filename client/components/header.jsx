import React from 'react';

function Header(props) {
  function handleClick() {
    props.setView('cart', {});
  }
  return (
    <header className="mb-30 mt-0 d-flex align-items-center">
      <h2 className="ml-5"><i className="fas fa-football-ball"></i> Sports Treasures</h2>
      <div className ="cart row justify-content-end col-9 align-items-center">
        <p className ="m-0">{props.cartCount} Items</p>
        <i className ="fas fa-shopping-cart" onClick={handleClick}></i>
      </div>
    </header>
  );
}

export default Header;
