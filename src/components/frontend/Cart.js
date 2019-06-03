import React, { Component } from 'react'
import {Consumer} from '../../Context'

export default class Cart extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <div className="category__container">
                <h1 className="category__header">Корзина</h1>
                <div className="cart__container">
                <Consumer>
                {   
                    value => {
                        const { inCart } = value;
                        if( inCart === undefined || inCart.length === 0) {
                            return ( <h3>Ваша корзина пуста</h3> )
                        }
                        else {
                            return (
                                <table className="cart__table">
                                    <thead className="cart__tableheader">
                                        <tr>
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
                                            <img src={"/img/product/"+item.image_url} alt={item.name} className="cart__img" />
                                        </td>
                                        <td className="cart__name">
                                            {item.name}
                                        </td>
                                        <td className="cart__available">
                                            Есть в наличии
                                        </td>
                                        <td className="cart__price">
                                            {item.price}
                                        </td>
                                        <td>
                                            <button>-</button>
                                            <button>{item.number}</button>
                                            <button>+</button>
                                        </td>
                                        <td className="cart__producttotal">
                                            {item.price*item.number}руб.
                                        </td>
                                        <td>
                                            <button>X</button>
                                        </td>
                                          
                                    </tr>
                                    
                                    )
                                })
                                }
                                </tbody>
                                </table>
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
