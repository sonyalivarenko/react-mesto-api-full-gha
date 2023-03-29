import PopupWithForm from "./PopupWithForm";
import { useRef, useEffect } from "react";

export default function EditAvatarPopup(props) {

  const avatarRef = useRef();

  useEffect(() => {
    avatarRef.current.value = "";
  }, [props.isOpen]); 

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  } 

  return(
  <PopupWithForm name="avatar" 
                 title="Обновить аватар" 
                 isOpen={props.isOpen} 
                 onClose={props.onClose} 
                 buttonText="Сохранить"  
                 onSubmit={handleSubmit}>
    <input type="url" 
           className="popup__item popup__item_value_avatar" 
           id="popup__item-avatar" 
           name="avatar" 
           placeholder="Фото профиля"  
           ref={avatarRef} />
    <span className="popup__item-error popup__item-avatar-error"></span>
  </PopupWithForm>)
}

