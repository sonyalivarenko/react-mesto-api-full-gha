import React from 'react';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import apiExemplar from '../utils/Api';
import CurrentUserContext from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import DeletePlacePopup from './DeletePlacePopup';
import Login from './Login';
import Register from './Register';
import ProtectedRouteElement from './ProtectedRoute';
import InfoTooltip from './InfoTooltip';
import * as auth from '../utils/Auth';
import { Route, Routes, useNavigate } from 'react-router-dom';

function App() {
  
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);
  const [isDeleteImagePopupOpen, setIsDeleteImagePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [isSignUpPopup, setIsSignUpPopup] = React.useState(false);

  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [card, setCard]  = React.useState({});

  const [loggedIn, setLoggedIn] = React.useState(false);

  const [userEmail, setUserEmail] = React.useState("");
  const [errorOrNot, setErrorOrNot] = React.useState(true);

  const navigate = useNavigate();

  const isOpen = isAddPlacePopupOpen || isDeleteImagePopupOpen || isEditAvatarPopupOpen || isEditProfilePopupOpen || isImagePopupOpen;

  function handleKeyDown (evt) {
    if (evt.key === 'Escape') {
      closeAllPopups();
    }
  }

  React.useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }
    else {
      document.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen])

  React.useEffect(() => {
    if (loggedIn) {
      apiExemplar.getProfileInfo()
      .then((res) => {
        setCurrentUser(res.data)
      })
      .catch((err) => {
        console.log(err); 
      }); 

      apiExemplar.getInitialCards()
      .then((res) => {
        setCards(res.data)
      })
      .catch((err) => {
        console.log(err); 
      }); 
    }
  }, [loggedIn])
  
  function handleCardLike(card) {
    const isLiked = card.likes.some(user => user === currentUser._id);
    apiExemplar.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((cards) => cards.map((c) => c._id === card._id ? newCard.data : c));
      })
      .catch((err) => {
        console.log(err); 
      });
  }

  function handleCardDelete(card) {
    apiExemplar.deleteCard(card._id)
      .then(() => {
        setCards((cards) => cards.filter((c) => c._id !== card._id ));
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err); 
      });
  }

  function handleUpdateUser({name, about}) {
    apiExemplar.setProfileInfo({name, about})
    .then((res) => {
      setCurrentUser(res.data);
      closeAllPopups();
    })
    .catch((err) => {
      console.log(err); 
    });
  }
 
  function handleUpdateAvatar({avatar}) {
    apiExemplar.getNewAvatar(avatar)
    .then((res) => {
      setCurrentUser(res.data);
      closeAllPopups();
    })
    .catch((err) => {
      console.log(err); 
    });
  } 

  function handleAddCard({title, link}) {
    apiExemplar.getNewCard({title, link})
    .then((res) => {
      setCards((cards) => [res.data, ...cards]);
      closeAllPopups();
    })
    .catch((err) => {
      console.log(err); 
    });
  } 

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleDeleteCardClick() {
    setIsDeleteImagePopupOpen(true);
  }

  function handleSignUpClick() {
    setIsSignUpPopup(true);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsImagePopupOpen(false);
    setIsDeleteImagePopupOpen(false);
    setIsSignUpPopup(false);
  }

  function handleCardClick(card) {
    setIsImagePopupOpen(true);
    setSelectedCard({
      name: card.name,
      link: card.link
    });
  }

  function handleLogin() {
    setLoggedIn(true);
  }

  React.useEffect(() => {
    tokenCheck();
  }, [])

  function tokenCheck () {
    const jwt = localStorage.getItem('token');
    if (jwt) {
      auth.getContent(jwt).then((res) => {
          if (res) {
            apiExemplar.getToken(jwt);
            setUserEmail(res.data.email);
            setLoggedIn(true);
            navigate("/", {replace: true})
          }
        });
    }
  }

  function signOut() {
    localStorage.removeItem('token');
    setLoggedIn(false)
  }

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
      <Routes>
          <Route path="/" element=
          {<ProtectedRouteElement loggedIn={loggedIn}>
            <Main onEditProfile={handleEditProfileClick} 
                  isAddPlacePopupOpen={handleAddPlaceClick} 
                  isEditAvatarPopupOpen={handleEditAvatarClick} 
                  onCardClick={handleCardClick} 
                  cards={cards} 
                  onCardLike={handleCardLike} 
                  isDeleteCardPopupOpen={handleDeleteCardClick} 
                  setCard={setCard} 
                  email={userEmail} 
                  signOut={signOut} />
          </ProtectedRouteElement>} />
          <Route path="/sign-up" element={<Register handleState={handleSignUpClick} onError={setErrorOrNot} />} />
          <Route path='/sign-in' element={<Login handleLogin={handleLogin} onEmail={setUserEmail} />} />
        </Routes>
        <Footer />
        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
        <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddCard} />
        <DeletePlacePopup isOpen={isDeleteImagePopupOpen} onClose={closeAllPopups} onDeletePlace={handleCardDelete} card={card} />
        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar}  />
        <ImagePopup card={selectedCard} onClose={closeAllPopups} isOpen={isImagePopupOpen} />
        <InfoTooltip isOpen={isSignUpPopup} onClose={closeAllPopups} onError={errorOrNot} />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
