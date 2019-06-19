import React, { Component } from 'react'
import {Consumer} from '../../Context'


export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",

        };
    }

    userLogin = (dispatch, e) => {
        e.preventDefault();
        dispatch({
            type: 'USER_LOGIN',
            payload: {email: this.state.email,
                      password: this.state.password }
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
                    const {dispatch} = value;
                    return (
                        <div className="checkout__container">
                        <h5 className="checkout__header">Быстрый вход</h5>
                        <form>
                            <label className="checkout__label">Ваш e-mail:</label><br />
                            <input className="checkout__input" type="email" name="email" onChange={this.handleChange}></input><br /><br />
                            <label className="checkout__label">Пароль:</label><br />
                            <input className="checkout__input" type="password" name="password" onChange={this.handleChange}></input><br /><br />
                            <button type="button" className="button button-primary" onClick={this.userLogin.bind(this, dispatch)}>Войти</button>
                            <a className="checkout__link" href="#">Восстановить пароль</a>
                        </form> 
                        </div>
                    );
                }
            }

            
            </Consumer>
        )
    }
}
