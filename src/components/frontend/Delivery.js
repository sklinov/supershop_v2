import React, { Component } from 'react'
import {Consumer} from '../../Context'

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
        };
    }

    getShippingMethods() {
        const url = "/api/orders/getshippingmethods.php";
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
        let payload = { city: this.state.city,
                        street: this.state.street,
                        building: this.state.building,
                        flat: this.state.flat,
                        shippingMethodId: this.state.shippingMethodId,
                        comment: this.state.comment};
        dispatch({
            type: 'CHECKOUT_DELIVERY',
            payload: payload
        });
    }

    componentDidMount() {
        this.getShippingMethods();
    }


    render() {
        return (
            <Consumer>
            {
                value=> {
                    const { user, dispatch } = value;
                    const { shippingMethods, shippingMethodsAreLoaded } = this.state;
                    return (
                        <form>
                        <div className="checkout__row">
                            
                                <div className="checkout__container checkout__width-3">
                                    <h5 className="checkout__header">Адрес доставки</h5>
                                    <label className="checkout__label">Город:</label><br />
                                    <input className="checkout__input" type="text" name="city" onChange={this.handleChange}></input>

                                    <label className="checkout__label">Улица:</label><br />
                                    <input className="checkout__input" type="text" name="street" onChange={this.handleChange}></input>

                                    <label className="checkout__label">Дом:</label><br />
                                    <input className="checkout__input" type="text" name="building" onChange={this.handleChange}></input>

                                    <label className="checkout__label">Квартира:</label><br />
                                    <input className="checkout__input" type="text" name="flat" onChange={this.handleChange}></input>
                                </div>
                                <div className="checkout__container checkout__width-3">
                                    <h5 className="checkout__header">Способ доставки</h5>
                                    {   
                                        shippingMethodsAreLoaded &&
                                        shippingMethods.map(shipping => {
                                            return (
                                                <label key={shipping.id}>
                                                <input type="radio" value={shipping.id} name="shippingMethodId" />
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
