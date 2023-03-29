import React from 'react';

export default function PopupWithForm(props) {
  return (
    <div className={`popup-${props.name} popup ${props.isOpen ? 'popup_active' : ''}`}>
        <div className="popup__container">
          <button className="popup__close" type="button" onClick={props.onClose}></button>
          <h2 className="popup__title">{props.title}</h2>
          <form className="popup__form" name={props.name} onSubmit={props.onSubmit}>
            <fieldset className="popup__data">
              {props.children}
              <button className="popup__button" type="submit">{props.buttonText}</button>
            </fieldset>
          </form>
        </div>
      </div>
  );
}