/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext';

export default function Card(props) {

  const currentUser = React.useContext(CurrentUserContext);

  const isOwn = props.card.owner === currentUser._id;
  const isLiked = props.card.likes.some(i => i === currentUser._id);
  const cardLikeButtonClassName = ( 
    `photo__heart ${isLiked && 'photo__heart_active'}` 
  );
  
  function handleClick() {
    props.onCardClick(props.card);
  } 

  function handleLikeClick() {
    props.onCardLike(props.card);
  } 

  function handleDeleteClick() {
    props.onCardDeletePopup();
    props.setCard(props.card);
  }

  return (
    <div className="photo__item">
      <img className="photo__img" src={props.card.link} onClick={handleClick} />
      {isOwn && <button className='photo__button-delete' onClick={handleDeleteClick} />} 
      <div className="photo__text">
        <h2 className="photo__name">{props.card.name}</h2>
        <div className="photo__fame">
          <button className={cardLikeButtonClassName} type="button" onClick={handleLikeClick}></button>
          <span className="photo__number-like">{props.card.likes.length}</span>
        </div>
      </div>
    </div>
  )
}