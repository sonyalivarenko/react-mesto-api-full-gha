import PopupWithForm from "./PopupWithForm";
import { useState, useEffect } from "react";

export default function AddPlacePopup(props) {

  const [title, setTitle] = useState('');
  const [link, setLink] = useState('');

  function handleChangeTitle(e) {
    setTitle(e.target.value);
  }

  function handleChangeLink(e) {
    setLink(e.target.value);
  }

  useEffect(() => {
    setTitle('');
    setLink('');
  }, [props.isOpen]);

  function handleAddPlaceSubmit(e) {
    e.preventDefault();
    props.onAddPlace({
      title,
      link
    });
  }

  return(
    <PopupWithForm name="add-image" title="Новое место" isOpen={props.isOpen} onClose={props.onClose} buttonText="Создать" onSubmit={handleAddPlaceSubmit}>
                <input type="text" className="popup__item popup__item_value_title" id="popup__item-title" name="title" placeholder="Название" required minLength="2" maxLength="30" value={title} onChange={handleChangeTitle} />
                <span className="popup__item-error popup__item-title-error"></span>
                <input type="url" className="popup__item popup__item_value_url" id="popup__item-url" name="url" placeholder="Ссылка на картинку" required value={link} onChange={handleChangeLink} />
                <span className="popup__item-error popup__item-url-error"></span>
    </PopupWithForm>
  )
}

