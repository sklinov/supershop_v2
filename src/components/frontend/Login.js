import React, { Component } from 'react'
import {Consumer} from '../../Context'


export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            user: [],
            pwIsConfirmed: true,
        };
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

    handleChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }
    
    render() {
        return (
            <Consumer>
            {
                value=> {
                    const {loggedIn, user, dispatch} = value;
                    const {pwIsConfirmed} = this.state;
                    if(!loggedIn) {
                        return (
                            <div className="checkout__container">
                            <h5 className="checkout__header">Быстрый вход</h5>
                            <form>
                                <label className="checkout__label">Ваш e-mail:</label><br />
                                <input className="checkout__input" type="email" name="email" onChange={this.handleChange}></input><br /><br />
                                <label className="checkout__label">Пароль:</label><br />
                                <input className="checkout__input" type="password" name="password" onChange={this.handleChange}></input><br /><br />
                                <button type="button" className="button button-primary" onClick={this.userLogin.bind(this, dispatch)}>Войти</button>
                                <span className="checkout__link">Восстановить пароль</span>
                                {!pwIsConfirmed && 
                                                    <div className="validation__error">
                                                        Неверный пароль или имя пользователя
                                                    </div>
                                                    }
                            </form> 
                            </div>
                        );
                    }
                    else if(loggedIn) {
                        return (
                            <div className="checkout__container">
                            <h5 className="checkout__header">Добро пожаловать, {user.name}</h5>
                            </div>
                        )
                    } 
                    
                }
            }

            
            </Consumer>
        )
    }
}
