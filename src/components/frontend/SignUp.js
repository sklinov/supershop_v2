import React, { Component } from 'react'
import {Consumer} from '../../Context'
import {errors} from './Errors'

export default class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name:"",
            phone: "",
            email: "",
            validationErrors: {
                name: false,
                email: false,
                phone: false,
            },
            formIsValid: false
        };
    }

    handleChange = (e) => {
        e.preventDefault();
        const value = this.leftSideTrim(e.target.value);
        const { validationErrors } = this.state;
        this.setState({ validationErrors: {...validationErrors, [e.target.name]: false} }); 
        this.setState({ [e.target.name] : value });
        this.validateForm();
    }

    leftSideTrim = (value) => {
        if(value === null) 
        { 
            return value;
        }
        return value.replace(/^\s+/g, '');
      }


    validateField = (e) => {
        e.preventDefault();
        const { value, name } = e.target;
        const { validationErrors } = this.state;
        switch(name) {
            case name.match(/(Name)/i) && name :
                if(value.length === 0) {
                    this.setState({ validationErrors: {...validationErrors, [name]: errors.nameEmpty} }); 
                }
                else if(value.length <3) {
                    this.setState({ validationErrors: {...validationErrors, [name]: errors.nameTooShort} }); 
                }
                break;
            case name.match(/(Email)/i) && name:
                if(value.length === 0) {
                    this.setState({ validationErrors: {...validationErrors, [name]: errors.emailEmpty} }); 
                }
                else if(!value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
                    this.setState({ validationErrors: {...validationErrors, [name]: errors.emailNotValid} }); 
                }
                break;
            case name.match(/(Phone)/i) && name :
                if(value.length === 0) {
                    this.setState({ validationErrors: {...validationErrors, [name]: errors.phoneEmpty} }); 
                }
                else if(!value.match(/[+][7]\d{10}/)) {
                    this.setState({ validationErrors: {...validationErrors, [name]: errors.phoneNotValid} }); 
                }
                break;
            default:
                break;
        }
    }

    validateForm = () => {
        const { name, email, phone, validationErrors } = this.state;
        if(
            name.length > 0 &&
            email.length > 0 &&
            phone.length > 0 &&
            Object.values(validationErrors).every(error => error === false)
        ) {
            this.setState({formIsValid: true}); 
        }
        else {
            this.setState({formIsValid: false}); 
        }
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
        this.props.toStepTwo();
    }
    
    render() {
        const {validationErrors, formIsValid} = this.state;
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
                                    <input className="checkout__input" type="text" name="name" onChange={this.handleChange} onBlur={this.validateField}></input><br /><br />
                                    <div className="validation__error">{validationErrors.name}</div>

                                    <label className="checkout__label">Контатный телефон:</label><br />
                                    <input className="checkout__input" type="text" name="phone" onChange={this.handleChange} onBlur={this.validateField}></input><br /><br />
                                    <div className="validation__error">{validationErrors.phone}</div>

                                    <label className="checkout__label">E-mail</label><br />
                                    <input className="checkout__input" type="email" name="email" onChange={this.handleChange} onBlur={this.validateField}></input><br /><br />
                                    <div className="validation__error">{validationErrors.email}</div>

                                    <button type="button" className="button button-primary" disabled={!formIsValid} onClick={this.continue.bind(this, dispatch)}>Продолжить</button>
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
