import React, { Component } from 'react'

export default class UserEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: 0,
            name: "",
            email: "",
            phone: "",
            city: "",
            street: "",
            building: "",
            flat: "",
            isLoaded: false,
            isSaved: false,
            orders: [],
            ordersTotal:0
        };
    }
    
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
            isSaved: false,
        });
    }

    getUserInfo() {
        if(this.props.match.params.id) {
            const url = "/api/users/user.php?id="+this.props.match.params.id;
            fetch(url,{ method: "GET" })
            .then(response => response.json())
            .then(
            (result) => {
                this.setState({id: result.data[0].user_id,
                               name: result.data[0].user_name,
                               email: result.data[0].user_email,
                               phone: result.data[0].user_phone,
                               city: result.data[0].user_city,
                               street: result.data[0].user_street,
                               building: result.data[0].user_building,
                               flat: result.data[0].user_flat,
                               isLoaded: true
                         }, this.getUserOrders);
            },
            (error) => {
            console.log(error);
            });
        }
    }

    getUserOrders() {
        const url = "/api/orders/getuserorders.php?id_user="+this.state.id;
        fetch(url,{ method: "GET" })
        .then(response => response.json())
        .then(
        (result) => {
            var total = 0 ;
            result.data.forEach(order => {
                total += Number(order.total);
            });
            this.setState({orders: result.data, ordersTotal: total});

        },
        (error) => {
        console.log(error);
        });
    }

    saveChanges = (e) => {
        e.preventDefault();
        let formData = new FormData();
        formData.append('id',this.state.id);
        formData.append('name',this.state.name);
        formData.append('email',this.state.email);
        formData.append('phone',this.state.phone);
        formData.append('city',this.state.city);
        formData.append('street',this.state.street);
        formData.append('building',this.state.building);
        formData.append('flat',this.state.flat);

        const url = "/api/users/edit.php";
        fetch(url, {
            method: "POST",
            body: formData
        })
        .then(response => response.json())
        .then(
            (result => {
                console.log(result);
            },
            (error) => {
                console.log(error);
                })

        );
    }

    componentDidMount() {
        this.getUserInfo();
    }
    render() {
        const {id, name, email, phone, city, street, building, flat, orders, ordersTotal} = this.state;
        return (
            <React.Fragment>
            <div className="content"> 
                <h1 className="title">Просмотр пользователя</h1>
                <form className="form" name="product_edit" encType="multipart/form-data">
                    <input type="hidden" id="id" value={id} />
                    <div className="card">
                        <div className="card__title">
                            Информация о пользователе
                        </div>
                        <div className="card__cont">
                            <div className="card__col">
                                <label className="form__label" htmlFor="name">Контактное лицо (ФИО):</label><br />
                                <input type="text" className="form__input-field" id="name" name="name" value={name} onChange={this.handleChange}/><br />

                                <label className="form__label" htmlFor="phone">Контатный телефон:</label><br />
                                <input type="text" className="form__input-field" id="phone" name="phone" value={phone} onChange={this.handleChange}/><br />

                                <label className="form__label" htmlFor="email">E-mail:</label><br />
                                <input type="email" className="form__input-field" id="email" name="email" value={email} onChange={this.handleChange}/><br />
                            </div>
                            
                            <div className="card__col">
                                <label className="form__label" htmlFor="city">Город:</label><br />
                                <input type="text" className="form__input-field" id="city" name="city" value={city} onChange={this.handleChange}/><br />

                                <label className="form__label" htmlFor="street">Улица:</label><br />
                                <input type="text" className="form__input-field" id="street" name="street" value={street} onChange={this.handleChange}/><br />

                                <label className="form__label" htmlFor="building">Дом:</label><br />
                                <input type="text" className="form__input-field" id="building" name="building" value={building} onChange={this.handleChange}/><br />

                                <label className="form__label" htmlFor="flat">Квартира:</label><br />
                                <input type="text" className="form__input-field" id="flat" name="flat" value={flat} onChange={this.handleChange}/><br />
                            </div>
                        </div>
                    </div>
                    <div className="distribute">
                        {/* <span className="link link-danger">Удалить пользователя</span> */}
                        <span className="link link-success" onClick={this.saveChanges.bind(this)}>Сохранить изменения</span>
                    </div>
                    {this.state.isSaved && <div>Изменения сохранены</div>}
                </form>
                <div className="card">
                        <div className="card__title">
                            История заказов
                        </div>
                        <div className="card__cont">
                            <table className="table">
                                <tbody>
                                    {   
                                        orders.map(order => {
                                            return (
                                                <tr className="table__row" key={order.id}>
                                                    <td className="table__cell">№{order.id}</td>
                                                    <td className="table__cell">{order.total.toLocaleString('ru-RU')}</td>
                                                    <td className="table__cell">{order.datetime}</td>
                                                </tr>
                                            )
                                        })
                                    }
                                    <tr>
                                                    <td className="table__cell" colspan="2">Итоговая сумма заказов</td>
                                                    <td className="table__cell">{ordersTotal}</td>
                                    </tr>
                                </tbody>    
                            </table>

                        </div>
                </div>
            </div>
            </React.Fragment>
        )
    }
}
