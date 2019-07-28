import React, { Component } from 'react'
import {Consumer} from '../../Context'
import {Redirect} from 'react-router-dom'


export default class SignUpMain extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name:"",
            email: "",
            phone: "",
            password: "",
            passwordconfirm: "",
            pwIsConfirmed: true
        };
    }
    handleChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    checkPassword = (e) => {
        e.preventDefault();
        if(this.state.password !== this.state.passwordconfirm)
        {
            this.setState({pwIsConfirmed: false});
        } else {
            this.setState({pwIsConfirmed: true});
        }
    }

    signUp = (dispatch, e) => {
        e.preventDefault();
        const {name, email, phone, password, pwIsConfirmed} = this.state;
        if(pwIsConfirmed && 
            name.length >0 &&
            email.length >0 &&
            password.length>0
            )
            {   
                let formData = new FormData();
                formData.append('name',name);
                formData.append('email',email);
                formData.append('phone',phone);
                formData.append('password',password);
                
                //console.log(formData);
                
                const url = process.env.PUBLIC_URL+ "/api/api/users/add.php";
                fetch(url, {
                    method: "POST",
                    body: formData
                })
                .then(response => response.json())
                .then(
                    (result) => {
                        if(typeof result.status !== "undefined" && result.status === "exists") {
                            alert("Пользователь с таким e-mail уже зарегистрирован");
                        }
                        else {
                            let payload = {
                                id: result.id,
                                name: this.state.name,
                                phone: this.state.phone,
                                email: this.state.email};
                                //console.log(payload);
                                dispatch({
                                    type: 'SIGN_UP_MAIN',
                                    payload: payload
                                });
                        }
                            
                    },
                    (error) => {
                        console.log('ERROR:', error);
                    }
                );
            }
        
    }
    
    render() {
        const {pwIsConfirmed} = this.state;
        return (
            <Consumer>
            {
                value => {
                    const {loggedIn, dispatch} = value;
                    if(!loggedIn) {
                        return (
                            <div className="category__container">
                            <h1 className="category__header">Регистрация</h1>
                            <div className="cart__container">
                            <div className="checkout__container checkout__container-m-30">
                                <form>
                                    <div className="checkout__row">
                                        <div className="checkout__container-mr-30">
                                            <label className="checkout__label">Контактное лицо (ФИО):</label><br />
                                            <input className="checkout__input" type="text" name="name" onChange={this.handleChange}></input><br /><br />

                                            <label className="checkout__label">E-mail</label><br />
                                            <input className="checkout__input" type="email" name="email" onChange={this.handleChange}></input><br /><br />

                                            <label className="checkout__label">Контактный телефон</label><br />
                                            <input className="checkout__input" type="text" name="phone" onChange={this.handleChange}></input><br /><br />
                                        </div>
                                        <div>
                                            <label className="checkout__label">Пароль:</label><br />
                                            <input className="checkout__input" type="password" name="password" onChange={this.handleChange} onBlur={this.checkPassword}></input><br /><br />

                                            <label className="checkout__label">Подтвердите пароль:</label><br />
                                            <input className="checkout__input" type="password" name="passwordconfirm"  onChange={this.handleChange} onBlur={this.checkPassword}></input><br /><br />
                                            {!pwIsConfirmed && 
                                             <div className="validation__error">
                                                 Пароль и подтверждение не совпадают
                                             </div>
                                            }
                                        </div>
                                    </div>
                                    <button type="button" className="button button-primary" onClick={this.signUp.bind(this, dispatch)}>Продолжить</button>
                                </form>
                            </div>
                            </div>
                            </div>
                        );
                    }
                    else {
                        return (
                            <Redirect to={process.env.PUBLIC_URL+"/shop/"} />
                        )
                    }
                }
            }
            </Consumer>
        )
    }
}
