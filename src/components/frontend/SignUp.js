import React, { Component } from 'react'
import {Consumer} from '../../Context'
// import MaskedInput from 'react-text-mask'

export default class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name:"",
            phone: "",
            email: ""
        };
    }
    handleChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    continue = (dispatch, e) => {
        e.preventDefault();
        let payload = {name: this.state.name,
                        phone: this.state.phone,
                        email: this.state.email};
        dispatch({
            type: 'CHECKOUT_SIGN_UP',
            payload: payload
        });
    }
    
    render() {
        return (
            <Consumer>
            {
                value => {
                    const {loggedIn, dispatch} = value;
                    if(!loggedIn) {
                        return (
                            <div className="checkout__container">
                                <h5 className="checkout__header">Для новых покупателей</h5>
                                <form>
                                    <label className="checkout__label">Контактное лицо (ФИО):</label><br />
                                    <input className="checkout__input" type="text" name="name" onChange={this.handleChange}></input><br /><br />

                                    <label className="checkout__label">Контатный телефон:</label><br />
                                    {/* <MaskedInput mask={[ '/[7]/','(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]} className="checkout__input" type="text" name="phone" onChange={this.handleChange}></MaskedInput><br /><br /> */}
                                    <input className="checkout__input" type="text" name="phone" onChange={this.handleChange}></input><br /><br />

                                    <label className="checkout__label">E-mail</label><br />
                                    <input className="checkout__input" type="email" name="email" onChange={this.handleChange}></input><br /><br />

                                    <button type="button" className="button button-primary" onClick={this.continue.bind(this, dispatch)}>Продолжить</button>
                                </form>
                            </div>
                        );
                    }
                }
            }
            </Consumer>
        )
    }
}
