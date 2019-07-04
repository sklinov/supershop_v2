import React, { Component } from 'react'
import {Consumer} from '../../Context'


export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            user: [],
        };
    }

    userLogin = (dispatch, e) => {
        e.preventDefault();
        const { user } = this.state;
        let payload = {email: this.state.email,
                       password: this.state.password };
        const url = "/api/users/login.php";
        fetch(url,{
            method: "POST",
            body: JSON.stringify(payload)
          }).then(response => response.json())
          .then(
          (result) => {
              //user = result;
              user.id = result.id;
              user.name = result.name;
              user.email = result.email;
              user.phone = result.phone;
              user.city = result.city;
              user.street = result.street;
              user.building = result.building;
              user.flat = result.flat;
              console.log(user);
              dispatch({
                type: 'USER_LOGIN',
                user : user
            });       
          },
          (error) => {
              console.log(error);
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
                            <span className="checkout__link">Восстановить пароль</span>
                        </form> 
                        </div>
                    );
                }
            }

            
            </Consumer>
        )
    }
}
