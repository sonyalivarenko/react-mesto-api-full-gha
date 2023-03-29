import React, {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import Header from './Header';
import * as auth from '../utils/Auth';

export default function Login(props) {

  const [formValue, setFormValue] = useState({
    email: '',
    password: ''
  })

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
    if (!formValue.email || !formValue.password){
      return;
    }
    auth.authorize(formValue.email, formValue.password)
      .then((data) => {
        if (data.token) {
          props.onEmail(formValue.email)
          setFormValue({email: '', password: ''});
          props.handleLogin();
          navigate('/', {replace: true});
      }})
      .catch(err => {
        console.log(err);
      });
  }

  return (
    <>
      <Header><Link to="/sign-up" className="header__link">Регистрация</Link></Header>
      <div className="login">
        <h2 className="login__title">Вход</h2>
        <form className="login__form" name="login" onSubmit={handleSubmit}>
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
                   placeholder="Пароль" required 
                   minLength="5" 
                   maxLength="200" 
                   value={formValue.password} 
                   onChange={handleChange} />
            <span className="login__item-error login__item-password-error"></span>
            <button className="login__button" type="submit">Войти</button>
          </fieldset>
        </form>
        <p className="login__text"></p>
      </div>
    </>
  )
}