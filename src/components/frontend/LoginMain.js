import React, { Component } from 'react'
import { Consumer } from '../../Context'
import {Redirect, Link} from 'react-router-dom'

export default class LoginMain extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            loggedIn: false,
            pwIsConfirmed: true

        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    userLogin = (dispatch, e) => {
        e.preventDefault();
        let payload = {email: this.state.email,
                       password: this.state.password };
        const url = "/api/users/login.php";
        fetch(url,{
            method: "POST",
            body: JSON.stringify(payload)
          }).then(response => response.json())
          .then(
          (result) => {
              console.log(result.status);
              if(result.status === 'success')
              {
                this.setState({loggedIn: true, pwIsConfirmed: true});
                dispatch({
                type: 'USER_LOGIN',
                payload : result
                });
              }
              else if(result.status === 'fail') {
                this.setState({ loggedIn: false,pwIsConfirmed: false});
              }          
          },
          (error) => {
              console.log("Error:", error);
          });       
    }

    render() {
        return (
            <Consumer>
            {
                value => {
                    const {loggedIn, dispatch} = value;
                    const {pwIsConfirmed} = this.state;
                    if(!loggedIn) {
                        return (
                            <div className="category__container">
                                <h1 className="category__header">Вход</h1>
                                <div className="cart__container">
                                    <div className="checkout__row">
                                    <div className="checkout__container checkout__container-m-30 checkout__width-half">
                                        <form>
                                            <div className="checkout__row">
                                                <div className="checkout__container-mr-30">
                                                    <h5 className="checkout__header">Зарегистрированный пользователь</h5>
                                                    <label className="checkout__label">E-mail</label><br />
                                                    <input className="checkout__input" type="email" name="email" onChange={this.handleChange}></input><br /><br />

                                                    <label className="checkout__label">Пароль:</label><br />
                                                    <input className="checkout__input" type="password" name="password" onChange={this.handleChange}></input><br /><br />
                                                    {!pwIsConfirmed && 
                                                    <div className="validation__error">
                                                        Неверный пароль или имя пользователя
                                                    </div>
                                                    }
                                                </div>
                                            </div>
                                            <button type="button" className="button button-primary" onClick={this.userLogin.bind(this, dispatch)}>Войти</button>
                                        </form>
                                    </div>
                                    <div className="checkout__container checkout__container-m-30 checkout__width-half">
                                    <h5 className="checkout__header">Новый пользователь</h5>
                                    <Link to="shop/signup">
                                    <button type="button" className="button button-primary">Зарегистрироваться</button>
                                    </Link>                        
                                    </div>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                    else {
                        return (
                            <Redirect to="/shop/" />
                        )
                    }
                }
            }     
            </Consumer>
        )
    }
    
}
