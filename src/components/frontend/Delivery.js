import React, { Component } from 'react'
import {Consumer, Context } from '../../Context'

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
            isLoaded: false 
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
        this.setState({
            [e.target.name] : e.target.value
        })
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
                    const { city, street, building, flat, shippingMethods, shippingMethodsAreLoaded } = this.state;
                    return (
                        <form>
                        <div className="checkout__row">
                            
                                <div className="checkout__container checkout__width-3">
                                    <h5 className="checkout__header">Адрес доставки</h5>
                                    <label className="checkout__label">Город:</label><br />
                                    <input className="checkout__input" type="text" name="city" value={city} onChange={this.handleChange}></input>

                                    <label className="checkout__label">Улица:</label><br />
                                    <input className="checkout__input" type="text" name="street" value={street} onChange={this.handleChange}></input>

                                    <label className="checkout__label">Дом:</label><br />
                                    <input className="checkout__input" type="text" name="building" value={building} onChange={this.handleChange}></input>

                                    <label className="checkout__label">Квартира:</label><br />
                                    <input className="checkout__input" type="text" name="flat" value={flat} onChange={this.handleChange}></input>
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
                                </div>
                                <div className="checkout__container checkout__width-3">
                                    <h5 className="checkout__header">Комментарий к заказу</h5>
                                    <label className="checkout__label">Введите ваш комментарий:</label><br />
                                    <textarea className="checkout__input" type="text" name="comment" onChange={this.handleChange} />
                                </div> 
                        </div>
                        <button type="button" className="button button-primary" onClick={this.continue.bind(this, dispatch)}>Продолжить</button>
                        </form>
                    )
                }
            }
            </Consumer>
        )
    }
}

Delivery.contextType = Context;
