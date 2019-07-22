import React, { Component } from 'react'
import { Consumer, Context } from '../../Context'
import { Redirect} from 'react-router-dom'

export default class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: "",
            name: "",
            phone: "",
            email: "",
            password: "",
            passwordConfirm : "",
            city:"",
            street: "",
            building: "",
            flat: "",
            orders: [],
            ordersTotal: 0,
            isLoaded: false,
            pwIsConfirmed: true
        };
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    checkPassword = (e) => {
        e.preventDefault();
        if(this.state.password !== this.state.passwordconfirm)
        {
            this.setState({pwIsConfirmed: false});
        } else {
            this.setState({pwIsConfirmed: true});
        }
    }

    saveChanges = (dispatch, e) => {
        e.preventDefault();
        let state = this.state;
        let formData = new FormData();
        formData.append('id',this.state.id);
        formData.append('name',this.state.name);
        formData.append('email',this.state.email);
        formData.append('phone',this.state.phone);
        formData.append('city',this.state.city);
        formData.append('street',this.state.street);
        formData.append('building',this.state.building);
        formData.append('flat',this.state.flat);
        if(this.state.password.length >0 && this.state.pwIsConfirmed) {
            formData.append('password', this.state.password);
        }
        const url = "/api/users/edit.php";
        fetch(url, {
            method: "POST",
            body: formData
        })
        .then(response => response.json())
        .then(
            (result) => {
                console.log(result);
                let payload = {
                   id: state.id,
                   name: state.name,
                   email: state.email,
                   phone: state.phone,
                   city: state.city ,
                   street: state.street,
                   building: state.building,
                   flat: state.flat
                };
                // payload['id']=state.id;
                // payload['name']=state.name;
                // payload['email']=state.email;
                // payload['phone']=state.phone;
                // payload['city']=state.city;
                // payload['street']=state.street;
                // payload['building']=state.building;
                // payload['flat']=state.flat;
                console.log(payload);
                // let userInfo = JSON.stringify(payload);
                // console.log(userInfo);
                dispatch({
                    type: 'USER_EDIT',
                    payload: payload 
                });
            },
            (error) => {
                console.log(error);
                });
    }

    fillValues = (value) => {
        const { user, loggedIn } = value;
        const userData = user; 
        if(userData !== undefined)
        {
            if(loggedIn && !this.state.isLoaded) {
                this.setState({
                    id: userData.id,
                    name: userData.name,
                    phone: userData.phone,
                    email: userData.email,
                    city: userData.city,
                    street: userData.street,
                    building: userData.building,
                    flat: userData.flat,
                    isLoaded: true
                }, this.getUserOrders);
            }
        }
    }

    getUserOrders() {
        console.log(this.state.id);
        const url = "/api/orders/getuserorders.php?id_user="+this.state.id;
        fetch(url,{ method: "GET" })
        .then(response => response.json())
        .then(
        (result) => {
            if(result.data.length > 0) {
                var total = 0 ;
                result.data.forEach(order => {
                total += Number(order.total);
                });
                this.setState({orders: result.data, ordersTotal: total});
            }
        },
        (error) => {
        console.log(error);
        });
    }

    componentDidMount() {
        let value = this.context;
        this.fillValues(value);
    }

    componentDidUpdate() {
        let value = this.context;
        this.fillValues(value);
    }

    render() {
        return (
            <Consumer>
                {
                    value => {
                        const {loggedIn, user, dispatch} = value;
                        const { id, name, phone, email, city, street, building, flat, orders, pwIsConfirmed} = this.state;


                        if(loggedIn)
                        {
                            return (
                                <div className="category__container">
                                    <h1 className="category__header">Личный кабинет</h1>
                                    <div className="cart__container">
                                        <div className="checkout__row">
                                        <div className="checkout__container checkout__container-m-30 checkout__width-half">
                                            <form>
                                                

                                                <input type="hidden" value={id} />

                                                <h5 className="checkout__header">Ваши данные</h5>
                                                <label className="checkout__label">Контактное лицо (ФИО):</label><br />
                                                <input className="checkout__input" type="text" name="name" value={name} onChange={this.handleChange}></input><br /><br />

                                                <label className="checkout__label">E-mail</label><br />
                                                <input className="checkout__input" type="email" name="email" value={email} onChange={this.handleChange}></input><br /><br />

                                                <label className="checkout__label">Контактный телефон</label><br />
                                                <input className="checkout__input" type="text" name="phone" value={phone} onChange={this.handleChange}></input><br /><br />

                                                <h5 className="checkout__header">Адрес доставки</h5>
                                                <label className="checkout__label">Город:</label><br />
                                                <input className="checkout__input" type="text" name="city" value={city} onChange={this.handleChange}></input><br /><br />

                                                <label className="checkout__label">Улица:</label><br />
                                                <input className="checkout__input" type="text" name="street" value={street} onChange={this.handleChange}></input><br /><br />

                                                <label className="checkout__label">Дом:</label><br />
                                                <input className="checkout__input" type="text" name="building" value={building} onChange={this.handleChange}></input><br /><br />

                                                <label className="checkout__label">Квартира:</label><br />
                                                <input className="checkout__input" type="text" name="flat" value={flat} onChange={this.handleChange}></input><br /><br />
                                                
                                                <h5 className="checkout__header">Изменение пароля</h5>

                                                <label className="checkout__label">Пароль:</label><br />
                                                <input className="checkout__input" type="password" name="password" onChange={this.handleChange} onBlur={this.checkPassword}></input><br /><br />

                                                <label className="checkout__label">Подтвердите пароль:</label><br />
                                                <input className="checkout__input" type="password" name="passwordconfirm"  onChange={this.handleChange} onBlur={this.checkPassword}></input><br /><br />
                                                {!pwIsConfirmed && 
                                                <div className="validation__error">
                                                    Пароль и подтверждение не совпадают
                                                </div>
                                                }

                                                
                                                <button type="button" className="button button-primary" onClick={this.saveChanges.bind(this, dispatch)}>Сохранить</button>
                                            </form>
                                        </div>
                                        <div className="checkout__container checkout__container-m-30 checkout__width-half">
                                            <h5 className="checkout__header">Ваши заказы</h5>
                                            <table>
                                            <tbody>
                                            {   orders.length >0 &&
                                                orders.map(order => {
                                                    let datetime = new Date(order.datetime);
                                                    let date = datetime.toLocaleString('ru-RU', {day:"numeric", month: "numeric", year:"numeric"});
                                                    let time = datetime.toLocaleString('ru-RU', {hour: 'numeric', minute: 'numeric'});
                                                    return (
                                                        <tr key={order.id}>
                                                            <td className="profile__ordercell">
                                                                <p className="profile__order">№{order.id}</p>
                                                                <p className="profile__total">({Number(order.total).toLocaleString('ru-RU', { style: 'currency', currency: 'RUB' })})</p>
                                                                <p className="profile__datetime">{date} в {time}</p>
                                                            </td>
                                                            <td>
                                                                <p className="profile__status">{order.status}</p>
                                                            </td>
                                                        </tr>
                                                            
                                                    )
                                                })
                                            }
                                            </tbody>
                                            </table>

                                        </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        }  
                        else {
                            return (
                                <Redirect to="login/" />
                            )
                        }  
                    }
                }
            </Consumer>
        )
    }
}

Profile.contextType = Context;
