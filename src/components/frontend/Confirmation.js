import React, { Component } from 'react'
import {Consumer} from '../../Context'
import {Redirect} from 'react-router-dom'


export default class Confirmation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isConfirmed: false,
            order_id: undefined
        }
    }

    confirmOrder = (user, order, inCart, inCartTotal, dispatch, e) => {
        if(!this.state.isConfirmed)
        {
            let formData = new FormData();
            formData.append('products',JSON.stringify(inCart));
            formData.append('total',inCartTotal);
            formData.append('user',JSON.stringify(user));
            formData.append('comment',order.comment);
            formData.append('id_shipping',order.shippingMethodId);
            
            console.log(formData);
            
            const url = process.env.PUBLIC_URL+ "/api/api/orders/add.php";
            fetch(url, {
                method: "POST",
                body: formData
            })
            .then(response => response.json())
            .then(
                (result) => {
                    console.log(result.order_id, this.state.isConfirmed, this.state.order_id);
                    this.setState({ order_id: result.order_id,
                                    isConfirmed: true}, this.clearCart);
                },
                (error) => {
                    console.log("ERROR:",error);
                }
            );
        }
        
    }

    clearCart = (dispatch) => {
        dispatch({
            type: "CLEAR_CART"
        });
    }

    render() {
        return (
            <Consumer>
            {
                value => {
                    const { user, order, inCart, inCartTotal, dispatch } = value;
                    this.clearCart = this.clearCart.bind(this, dispatch);
                    if(this.state.isConfirmed !== true 
                    && user !== undefined 
                    && order !== undefined
                    && inCart !== undefined && inCart.length>0
                    && inCartTotal !== undefined && inCartTotal>0)
                    {
                    return (
                        <React.Fragment>
                        <div className="checkout__row">
                            <div className="checkout__container checkout__container-table">
                            <h5 className="checkout__header">
                                Состав заказа
                            </h5>
                            <table>
                                <thead>
                                    <tr>
                                        <th className="checkout__label">Товар</th>
                                        <th className="checkout__label">Стоимость</th>
                                        <th className="checkout__label">Количество</th>
                                        <th className="checkout__label">Итого</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        inCart.map(item => {
                                            return (
                                                <tr key={item.id}>
                                                    <td className="checkout__data">{item.name}</td>
                                                    <td className="checkout__oblique">{Number(item.price).toLocaleString('ru-RU', { style: 'currency', currency: 'RUB' })}</td>
                                                    <td className="checkout__oblique">{item.number}</td>
                                                    <td className="checkout__subtotal">{Number(item.price*item.number).toLocaleString('ru-RU', { style: 'currency', currency: 'RUB' })}</td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <td className="checkout__subtotal" colSpan={3}>Итого:</td>
                                        <td className="checkout__total">{Number(inCartTotal).toLocaleString('ru-RU', { style: 'currency', currency: 'RUB' })}</td>
                                    </tr>
                                </tfoot>
                            </table>
                            </div>
                        </div>
                        <div className="checkout__row">
                        <div className="checkout__container checkout__container-table">
                            <h5 className="checkout__header">
                                Доставка
                            </h5>
                            <table>
                                <tbody>
                                    <tr>
                                        <td className="checkout__cell">
                                            <p className="checkout__label">Контактное лицо</p>
                                            <p className="checkout__data">{user.name}</p>
                                        </td>
                                        <td className="checkout__cell" colSpan={2}>
                                            <p className="checkout__label">Город</p>
                                            <p className="checkout__data">{user.city}</p>
                                        </td>
                                        <td className="checkout__cell">
                                            <p className="checkout__label">Способ доставки</p>
                                            <p className="checkout__data">{order.shippingMethodName}</p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="checkout__cell">
                                            <p className="checkout__label">Контактный телефон</p>
                                            <p className="checkout__data">{user.phone}</p>
                                        </td>
                                        <td className="checkout__cell" colSpan={2}>
                                            <p className="checkout__label">Улица</p>
                                            <p className="checkout__data">{user.street}</p>
                                        </td>
                                        <td className="checkout__cell" rowSpan={2}>
                                            <p className="checkout__label">Комментарий к заказу</p>
                                            <p className="checkout__data">{order.comment}</p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="checkout__cell">
                                            <p className="checkout__label">E-mail</p>
                                            <p className="checkout__data">{user.email}</p>
                                        </td>
                                        <td className="checkout__cell">
                                            <p className="checkout__label">Дом</p>
                                            <p className="checkout__data">{user.building}</p>
                                        </td>
                                        <td className="checkout__cell">
                                            <p className="checkout__label">Квартира</p>
                                            <p className="checkout__data">{user.flat}</p>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        </div>
                        <div className="checkout__row">
                            <button type="button" className="button button-primary" onClick={this.confirmOrder.bind(this, user, order, inCart, inCartTotal, dispatch)}>Подтвердить заказ</button>
                        </div>
                        </React.Fragment>
                    )
                }
                else if(this.state.isConfirmed)
                {   
                    console.log('order is confirmed');
                    //this.clearCart.bind(this, dispatch);
                    return (
                        <Redirect to={{
                                            pathname: "checkout/success",
                                            state: {order_id: this.state.order_id}
                                      }}
                        />
                        // <div className="checkout__row">
                        //     <h5 className="checkout__header">
                        //         Спасибо, ваш заказ принят!    
                        //     </h5>
                        // </div>
                    )
                }
                else {
                    return (
                        <div className="checkout__row">
                            <h5 className="checkout__header">
                                Заполните корзину и необходимую информацию о пользователе и доставке    
                            </h5>
                        </div>
                    )
                }
                }
            }
            </Consumer>
        )
    }
}
