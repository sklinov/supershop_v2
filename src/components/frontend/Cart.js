import React, { Component } from 'react'
import { Link } from "react-router-dom";
import {Consumer} from '../../Context'

export default class Cart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cartTotal: 0
        };
    }
    
    
    plusOne = (dispatch, product, e ) => {
        e.preventDefault();
        dispatch({
            type: 'PLUS_ONE',
            payload: product
        });   
    }
    
    minusOne = (dispatch, product, e ) => {
        e.preventDefault();
        dispatch({
            type: 'MINUS_ONE',
            payload: product
        });   
    }

    removeFromCart = (dispatch, product, e ) => {
        e.preventDefault();
        dispatch({
            type: 'REMOVE_FROM_CART',
            payload: product
        });   
    }
       
    render() {
        
        return (
            <div className="category__container">
                <h1 className="category__header">Корзина</h1>
                <div className="cart__container">
                <Consumer>
                {   
                    value => {
                        const { inCart, inCartTotal, dispatch } = value;
                        if( inCart === undefined || inCart.length === 0) {
                            return ( <h3>Ваша корзина пуста</h3> )
                        }
                        else {
                            return (
                                <React.Fragment>
                                <table className="cart__table">
                                    <thead className="cart__tableheader">
                                        <tr className="cart__headerrow">
                                            <th>Товар</th>
                                            <th></th>
                                            <th>Доступность</th>
                                            <th>Стоимость</th>
                                            <th>Количество</th>
                                            <th>Итого</th>
                                            <th></th>
                                            
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {   
                                        inCart.map(item => {
                                        return(
                                        //Each item in cart
                                        <tr key={item.id} className="cart__row">
                                            <td className="cart__img">
                                                <img src={process.env.PUBLIC_URL +"/img/product/"+item.image_url} alt={item.name} className="cart__img" />
                                            </td>
                                            <td className="cart__name">
                                                {item.name}
                                            </td>
                                            <td className="cart__available">
                                                Есть в наличии
                                            </td>
                                            <td className="cart__price">
                                                {item.price} руб.
                                            </td>
                                            <td>
                                                <button className="button button-formcontrol" onClick={this.minusOne.bind(this, dispatch, item)}>-</button>
                                                <button className="button button-formcontrol button-formcontrolblack">{item.number}</button>
                                                <button className="button button-formcontrol" onClick={this.plusOne.bind(this, dispatch, item)}>+</button>
                                            </td>
                                            <td className="cart__producttotal">
                                                {item.price*item.number} руб.
                                            </td>
                                            <td>
                                                <button className="button button-formcontrol button-formcontrolround" onClick={this.removeFromCart.bind(this, dispatch, item)}>
                                                    &times;
                                                </button>
                                            </td>
                                            
                                        </tr>
                                        
                                        )
                                    })
                                    
                                    }
                                    </tbody>
                                </table>
                                <div className="cart__buttoncontainer">
                                    <div></div>
                                    <div className="cart__total">Итого: {inCartTotal} руб.</div>
                                </div>
                                <div className="cart__buttoncontainer">
                                    <button className="button button-secondary"> Вернуться к покупкам </button>
                                    <Link to={process.env.PUBLIC_URL+"/shop/checkout"}><button className="button button-primary"> Оформить заказ </button></Link>
                                </div>
                                </React.Fragment>
                                  
                            )
                        }
                    }
                }
                </Consumer>
                </div>
            </div>
        )
    }
}
