import React, { Component } from 'react'
import {Consumer, Context } from '../../Context'
import {errors} from './Errors'

export default class Delivery extends Component {
    constructor(props) {
        super(props);
        this.state = {
            city:"",
            street: "",
            building: "",
            flat: "",
            shippingMethodId: 0,
            comment: "",
            shippingMethods: [],
            shippingMethodsAreLoaded: false,
            isLoaded: false ,
            validationErrors: {
                city: false,
                street: false,
                building: false,
                flat: false,
                shippingMethodId: false,
            },
            formIsValid: false
        };
    }

    getShippingMethods() {
        const url = process.env.PUBLIC_URL+"/api/api/orders/getshippingmethods.php";
        fetch(url,{ method: "GET" })
        .then(response => response.json())
        .then(
        (result) => {
            this.setState({shippingMethods: result.data,
                           shippingMethodsAreLoaded: true});
        },
        (error) => {
        console.log(error);
        });  
    }

    handleChange = (e) => {
        //e.preventDefault();
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
            case name.match(/(city)/i) && name :
                if(value.length === 0) {
                    this.setState({ validationErrors: {...validationErrors, [name]: errors.cityEmpty} }); 
                }
                else if(value.length <2) {
                    this.setState({ validationErrors: {...validationErrors, [name]: errors.cityTooShort} }); 
                }
                break;
            case name.match(/(street)/i) && name :
                if(value.length === 0) {
                    this.setState({ validationErrors: {...validationErrors, [name]: errors.streetEmpty} }); 
                }
                else if(value.length <3) {
                    this.setState({ validationErrors: {...validationErrors, [name]: errors.streetTooShort} }); 
                }
                break;
            case name.match(/(building)/i) && name :
                if(value.length === 0) {
                    this.setState({ validationErrors: {...validationErrors, [name]: errors.buildingEmpty} }); 
                }
                break;
            default:
                break;
        }
    }

    validateForm = () => {
        const { city, street, building, shippingMethodId, validationErrors } = this.state;
        if(
            city.length > 0 &&
            street.length > 0 &&
            building.length > 0 &&
            shippingMethodId > 0 && 
            Object.values(validationErrors).every(error => error === false)
        ) {
            this.setState({formIsValid: true}); 
        }
        else if (shippingMethodId === 0) {
            this.setState({ validationErrors: {...validationErrors, shippingMethodId: errors.shippingEmpty}, formIsValid: false }); 
        }
        else {
            this.setState({formIsValid: false}); 
        }
    }

    continue = (dispatch, e) => {
        e.preventDefault();
        let userPayload = { city: this.state.city,
                            street: this.state.street,
                            building: this.state.building,
                            flat: this.state.flat,
                            };
        let orderPayload = { shippingMethodId: this.state.shippingMethodId,
                             shippingMethodName: this.state.shippingMethods.find(method => { 
                                                                                            if(method.id === this.state.shippingMethodId )
                                                                                            {
                                                                                                return method;
                                                                                            } 
                                                                                            }).shipping,
                             comment: this.state.comment
                           };
        dispatch({
            type: 'CHECKOUT_DELIVERY',
            userPayload,
            orderPayload
        });
        this.props.toStepThree();
    }

    fillValues = (value) => {
        const { user, loggedIn } = value;
        const userData = user; 
        if(userData !== undefined)
        {
            if(loggedIn && !this.state.isLoaded) {
                this.setState({
                    city: userData.city,
                    street: userData.street,
                    building: userData.building,
                    flat: userData.flat,
                    isLoaded: true
                });
            }
        }
    }

    componentDidMount() {
        let value = this.context;
        this.fillValues(value);
        this.getShippingMethods();
    }

    componentDidUpdate() {
        let value = this.context;
        this.fillValues(value);
    }


    render() {
        return (
            <Consumer>
            {
                value=> {
                    const { dispatch } = value;
                    const { city, street, building, flat, shippingMethods, shippingMethodsAreLoaded, validationErrors, formIsValid } = this.state;
                    return (
                        <form>
                        <div className="checkout__row">
                            
                                <div className="checkout__container checkout__width-3">
                                    <h5 className="checkout__header">Адрес доставки</h5>
                                    <label className="checkout__label">Город:</label><br />
                                    <input className="checkout__input" type="text" name="city" value={city} onChange={this.handleChange} onBlur={this.validateField}></input>
                                    <div className="validation__error">{validationErrors.city}</div>

                                    <label className="checkout__label">Улица:</label><br />
                                    <input className="checkout__input" type="text" name="street" value={street} onChange={this.handleChange} onBlur={this.validateField}></input>
                                    <div className="validation__error">{validationErrors.street}</div>

                                    <label className="checkout__label">Дом:</label><br />
                                    <input className="checkout__input" type="text" name="building" value={building} onChange={this.handleChange} onBlur={this.validateField}></input>
                                    <div className="validation__error">{validationErrors.building}</div>

                                    <label className="checkout__label">Квартира:</label><br />
                                    <input className="checkout__input" type="text" name="flat" value={flat} onChange={this.handleChange} onBlur={this.validateField}></input>
                                    <div className="validation__error">{validationErrors.flat}</div>

                                </div>
                                <div className="checkout__container checkout__width-3">
                                    <h5 className="checkout__header">Способ доставки</h5>
                                    {   
                                        shippingMethodsAreLoaded &&
                                        shippingMethods.map(shipping => {
                                            return (
                                                <label key={shipping.id}>
                                                <input type="radio" value={shipping.id} name="shippingMethodId" onChange={this.handleChange} />
                                                    {shipping.shipping}
                                                </label>
                                            )
                                        })
                                        
                                    }
                                    <div className="validation__error">{validationErrors.shipping}</div>
                                </div>
                                <div className="checkout__container checkout__width-3">
                                    <h5 className="checkout__header">Комментарий к заказу</h5>
                                    <label className="checkout__label">Введите ваш комментарий:</label><br />
                                    <textarea className="checkout__input" type="text" name="comment" onChange={this.handleChange} />
                                </div> 
                        </div>
                        <button type="button" className="button button-primary" disabled={!formIsValid} onClick={this.continue.bind(this, dispatch)}>Продолжить</button>
                        </form>
                    )
                }
            }
            </Consumer>
        )
    }
}

Delivery.contextType = Context;
