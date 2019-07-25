import React, { Component } from 'react'
import {Link} from 'react-router-dom'

export default class OrderSuccess extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: ""
        }
    }

    render() {
        if(typeof this.props.location.state !== "undefined") {
            return (
                <div className="category__container">
                    <h1 className="category__header">Оформление заказа</h1>
                    <div className="cart__container">
                        <p>
                        Заказ №{this.props.location.state.order_id} <span className="checkout__successstatus">успешно оформлен</span>.
                        </p>
                        <p>
                            Спасибо за ваш заказ.
                        </p>
                        <p>
                            В ближайшее время с вами свяжется оператор для уточнения времени доставки.
                        </p>
                        <Link to={process.env.PUBLIC_URL+"/shop/"}>
                            <button type="button" className="button button-primary">Вернуться в магазин</button>
                        </Link> 
                    </div>
                </div>
            )
        }
        else return (
            // <div className="category__container">
            //         <h1 className="category__header">Оформление заказа</h1>
            //         <div className="cart__container">
            //             Создайте заказ.
            //         </div>
            // </div>
            <div className="category__container">
                    <h1 className="category__header">Оформление заказа</h1>
                    <div className="cart__container">
                        <div className="checkout__container" style={{padding: '30px'}}>
                        <p className="checkout__successheading">
                        Заказ № 567 <span className="checkout__successstatus">успешно оформлен</span>.
                        </p>
                        <p>
                            Спасибо за ваш заказ.
                        </p>
                        <p>
                            В ближайшее время с вами свяжется оператор для уточнения времени доставки.
                        </p>
                        <Link to={process.env.PUBLIC_URL+"/shop/"}>
                            <button type="button" className="button button-primary">Вернуться в магазин</button>
                        </Link> 
                        </div>
                    </div>
                </div>
        )
        
    }
}
