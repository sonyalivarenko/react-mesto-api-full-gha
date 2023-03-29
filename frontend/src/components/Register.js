import React, {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import Header from './Header';
import * as auth from '../utils/Auth';

export default function Register(props) {

  const [formValue, setFormValue] = useState({
    email: '',
    password: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormValue({
      ...formValue,
      [name]: value
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = formValue;
    auth.register(email, password)
    .then(() => {
      props.handleState();
      props.onError(true);
      navigate('/sign-in', {replace: true});
      })
    .catch(err => {
      props.handleState();
      props.onError(false);
      console.log(err);
      });
  }

  return (
    <>
    <Header><Link to="/sign-in" className="header__link">Войти</Link></Header>
    <div className="login">
      <h2 className="login__title">Регистрация</h2>
      <form className="login__form" name="register" onSubmit={handleSubmit}>
        <fieldset className="login__data">
          <input type="email" 
                 className="login__item login__item_value_email" 
                 id="login__item-email" 
                 name="email" 
                 placeholder="Email" 
                 required 
                 value={formValue.email} 
                 onChange={handleChange} />
          <span className="login__item-error login__item-name-error"></span>
          <input type="password" 
                 className="login__item login__item_value_password" 
                 id="login__item-password" 
                 name="password" 
                 placeholder="Пароль" 
                 required 
                 minLength="5" 
                 maxLength="200" 
                 value={formValue.password} 
                 onChange={handleChange} />
          <span className="login__item-error login__item-password-error"></span>
          <button className="login__button" type="submit">Зарегистрироваться</button>
        </fieldset>
      </form>
      <div className="login__signup">
        <p className="login__text">Уже зарегистрированы?</p>
        <Link to="/sign-in" className="login__link">Войти</Link>
      </div>
    </div>
    </>
  )
}