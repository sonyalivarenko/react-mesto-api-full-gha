import PopupWithForm from "./PopupWithForm";
import { useState, useContext, useEffect } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";

export default function EditProfilePopup(props) {

  const currentUser = useContext(CurrentUserContext);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  function handleChangeName(e) {
    setName(e.target.value);
  }
  
  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateUser({
      name,
      about: description,
    });
  }

  return(
  <PopupWithForm name="recording" title="Редактировать профиль" isOpen={props.isOpen} onClose={props.onClose} buttonText="Сохранить" onSubmit={handleSubmit}>
    <input type="text" className="popup__item popup__item_value_name" id="popup__item-name" name="name" placeholder="Имя" required minLength="2" maxLength="40" value={name || ''} onChange={handleChangeName} />
    <span className="popup__item-error popup__item-name-error"></span>
    <input type="text" className="popup__item popup__item_value_job" id="popup__item-job" name="job" placeholder="Профессия" required minLength="2" maxLength="200" value={description || ''} onChange={handleChangeDescription} />
    <span className="popup__item-error popup__item-job-error"></span>
  </PopupWithForm>)
}

