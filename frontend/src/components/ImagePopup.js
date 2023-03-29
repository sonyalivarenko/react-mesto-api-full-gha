import React from 'react';

export default function ImagePopup(props) {
  return (
    <div className={`popup popup-image ${props.isOpen ? 'popup_active' : ''}`}>
        <div className="popup-image__container">
          <button className="popup__close popup-image__close" type="button" onClick={props.onClose}></button>
          <img className="popup-image__content" src={props.card.link} alt={props.card.name} />
          <p className="popup-image__name">{props.card.name}</p>
        </div>
    </div>
  );
}