import React from 'react';
import unionOk from '../images/Union_ok.png'
import unionError from '../images/Union.png'

export default function InfoTooltip(props) {

  return (
    <div className={`popup popup-signin ${props.isOpen && 'popup_active'}`}>
      <div className="popup__container">
        <button className="popup__close" type="button" onClick={props.onClose}></button>
        <img className="popup-signin__img" src={props.onError ? unionOk : unionError} />
        <p className="popup-signin__text">{props.onError ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.'}</p>
      </div>
    </div>
  );
}