import React from 'react';

function Header(props) {
  function handleClick() {
    props.setView('cart', {});
  }
  return (
    <header className="sticky-top">
      <div className="pt-2 d-flex">
        <h2 className="col head-name" onClick={() => props.setView('catalog', null)} ><img className="trophy" src="/images/trophy-logo.png"/>Sports Gems</h2>
        <div className="d-flex align-items-center pb-2">
          <p className ="m-0 cart">{props.cartCount} Items</p>
          <i className ="cart fas fa-shopping-cart mr-4 pl-2" onClick={handleClick}></i>
        </div>
      </div>
    </header>
  );
}

export default Header;
