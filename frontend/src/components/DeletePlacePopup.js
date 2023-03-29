import PopupWithForm from "./PopupWithForm";

export default function DeletePlacePopup(props) {

  function handleSubmit(e) {
    e.preventDefault();
    props.onDeletePlace(props.card);
  }

  return(
    <PopupWithForm name="delete" title="Вы уверены?" buttonText="Да" onClose={props.onClose} isOpen={props.isOpen} onSubmit={handleSubmit} />
    )
}