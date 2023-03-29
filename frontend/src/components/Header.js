import React from 'react';
import headerLogo from '../images/Vector_logo.svg';

export default function Header(props) {
  return (
    <div className="header">
         <img className="header__logo" src={headerLogo} alt="Векторный логотип" />
         <div className="header__text">{props.children}</div>
    </div>
  );
}