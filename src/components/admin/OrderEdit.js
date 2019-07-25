import React, { Component } from 'react'
import Spinner from '../frontend/Spinner'

export default class OrderEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: 0,
            status: { id: 0,
                      status: "",
                      color: ""},
            products:[],
            total: 0,
            user : {id: "",
                    name: "", 
                    phone: "", 
                    email: "",
                    city: "",
                    street: "",
                    building: "",
                    flat: ""},
            comment: "",
            shipping: { id: ""},
            statuses: [],
            shippingMethods: [],
            statusesAreLoaded: false,
            orderIsLoaded: false,
            productsAreLoaded: false,
            shippingMethodsAreLoaded: false,
        };
    }

    getOrderInfo() {
        if(this.props.match.params.id) {
            const url = process.env.PUBLIC_URL+"/api/api/orders/order.php?id="+this.props.match.params.id;
            fetch(url,{ method: "GET" })
            .then(response => response.json())
            .then(
            (result) => {
                var order = result.data[0];
                this.setState({id: order.id,
                               status: {...this.state.status, id: order.id_status,
                                                              status: order.status,
                                                              color: order.status_color},
                               user: {...this.state.user, id: order.id_user,
                                                            name: order.name,
                                                            email: order.email,
                                                            phone: order.phone,
                                                            city: order.city,
                                                            street: order.street,
                                                            building: order.building,
                                                            flat: order.flat,
                                },
                                total: order.total,
                                comment: order.comment,
                                shipping: {...this.state.shipping, id: order.id_shipping},
                               orderIsLoaded: true
                         }, this.getOrderProducts);
            },
            (error) => {
            console.log(error);
            });
        }
    }

    getOrderProducts() {
            const url = process.env.PUBLIC_URL+ "/api/api/orders/products.php?id="+this.state.id;
            fetch(url,{ method: "GET" })
            .then(response => response.json())
            .then(
            (result) => {
                this.setState({
                    products: result.data,
                    productsAreLoaded: true
                });
            },
            (error) => {
                console.log(error);
                });
    }

    getStatuses() {
        const url = process.env.PUBLIC_URL+ "/api/api/orders/getstatuses.php";
        fetch(url,{ method: "GET" })
        .then(response => response.json())
        .then(
        (result) => {
            this.setState({statuses: result.data,
                           statusesAreLoaded: true});
        },
        (error) => {
        console.log(error);
        });  
    }

    getShippingMethods() {
        const url = process.env.PUBLIC_URL+ "/api/api/orders/getshippingmethods.php";
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

    handleStatusChange = (order_id, e) => {
        var formData = new FormData();
        const orderId = order_id;
        const newStatusId = e.target.value;
        formData.append('id_order', orderId);
        formData.append('id_status', newStatusId);
        const url = process.env.PUBLIC_URL+ "/api/api/orders/changeorderstatus.php";
        fetch(url,{ method: "POST", body: formData })
        .then(response => response.json())
        .then(
        (result) => {
            console.log(result);
            this.getOrderInfo();
        },
        (error) => {
        console.log(error);
        });  
    }

    handleShippingChange = (e) => {
        this.setState({
            shipping: {...this.state.shipping, id: e.target.value},
            isSaved: false     
        });
    }

    handleUserChange = (e) => {
        this.setState({
            user: {...this.state.user, [e.target.name]: e.target.value},
            isSaved: false    
        });
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
            isSaved: false,
        });
    }

    handleQuantityChange = (id_product,e) => {
        var updateProducts = this.state.products;
        var updateTotal = 0;
        updateProducts.map(product => {
            if(product.id_product===id_product && !isNaN(e.target.value))
            {   
                product.quantity = e.target.value;
            }
            updateTotal += product.quantity*product.price;
            return product;
            
        });
        this.setState({
            products: updateProducts,
            total: updateTotal    
        });
    }

    saveChanges = (e) => {
        e.preventDefault();
        let formData = new FormData();
        formData.append('id',this.state.id);
        formData.append('status',JSON.stringify(this.state.status));
        formData.append('products',JSON.stringify(this.state.products));
        formData.append('total',this.state.total);
        formData.append('user',JSON.stringify(this.state.user));
        formData.append('comment',this.state.comment);
        formData.append('shipping',JSON.stringify(this.state.shipping));
        
        console.log(formData);

        const url = process.env.PUBLIC_URL+ "/api/api/orders/edit.php";
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

    removeProduct(id_product) {
        var updateProducts = this.state.products;
        var updateTotal = 0;
        updateProducts = updateProducts.filter(product => product.id_product !== id_product);
        updateProducts.map(product => {
                updateTotal += product.quantity*product.price;
                return product;
            }
            );
        this.setState({
            products: updateProducts,
            total: updateTotal    
        });
    }

    componentDidMount() {
        this.getOrderInfo();
        this.getStatuses();
        this.getShippingMethods();
    }
    
    render() {
        const { orderIdLoaded, statusesAreLoaded, productsAreLoaded, shippingMethodsAreLoaded, id, user, status, comment, total, products, shippingMethods, statuses, shipping} = this.state;
        if(!orderIdLoaded && !statusesAreLoaded && !productsAreLoaded && !shippingMethodsAreLoaded) {
            return (<React.Fragment><Spinner /></React.Fragment>)
       } else {
           return (
               <React.Fragment>
                   <div className="content">
                   <h1 className="title">Заказ №{id} 
                   <select className="form__input-select" onChange={(e) => this.handleStatusChange(id, e)} value={status.id} >
                                                    {statuses.map(status => {
                                                        return (
                                                            <option key={status.id_status} value={status.id_status} style={{color:status.status_color}}>{status.status}</option>
                                                        )
                                                    })}
                    </select>
                   </h1>
                   <form className="form">
                        <div className="card">
                            <div className="card__title">Содержимое заказа</div>
                            <div className="card__cont">
                                <table className="table">
                                    <tbody>
                                        {
                                            products.map(product=> {
                                                return (
                                                    <tr className="table__row" key={product.id_product}>
                                                        <td className="table__cell">{product.name}</td>
                                                        <td className="table__cell">{ Number(product.price).toLocaleString('ru-RU', { style: 'currency', currency: 'RUB' })}</td>
                                                        <td className="table__cell">
                                                            <input type="text" size={1} value={product.quantity} onChange={(e) => this.handleQuantityChange(product.id_product, e)} />
                                                        </td>
                                                        <td className="table__cell">{ Number(product.quantity*product.price).toLocaleString('ru-RU', { style: 'currency', currency: 'RUB' })}</td>
                                                        <td className="table__cell"><span className="link link-danger" onClick={() => this.removeProduct(product.id_product)}>Убрать из заказа</span></td>
                                                    </tr>
                                                )
                                            })
                                        }
                                        <tr className="table__row">
                                            <td  colSpan={4}>Итоговая сумма</td>
                                            <td ><h1>{ Number(total).toLocaleString('ru-RU', { style: 'currency', currency: 'RUB' })}</h1></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div> 
                        </div>
                        <div className="card">
                            <div className="card__title">Информация о заказе</div>
                            <div className="card__cont">
                                <div className="card__col">
                                    <label className="form__label" htmlFor="name">Контактное лицо:</label><br />
                                    <input type="text" className="form__input-field" id="name" name="name" value={user.name} onChange={this.handleUserChange}/><br />

                                    <label className="form__label" htmlFor="phone">Контактный телефон:</label><br />
                                    <input type="text" className="form__input-field" id="phone" name="phone" rows="5" cols="50" value={user.phone} onChange={this.handleUserChange}></input><br />

                                    <label className="form__label" htmlFor="email">E-mail:</label><br />
                                    <input type="text" className="form__input-field" id="email" name="email" rows="5" cols="50" value={user.email} onChange={this.handleUserChange}></input><br />
                                </div>
                                <div className="card__col">
                                    <label className="form__label" htmlFor="city">Город:</label><br />
                                    <input type="text" className="form__input-field" id="city" name="city" rows="5" cols="50" value={user.city} onChange={this.handleUserChange}></input><br />

                                    <label className="form__label" htmlFor="street">Улица:</label><br />
                                    <input type="text" className="form__input-field" id="street" name="street" rows="5" cols="50" value={user.street} onChange={this.handleUserChange}></input><br />

                                    <label className="form__label" htmlFor="building">Дом:</label><br />
                                    <input type="text" className="form__input-field" size={1} id="building" name="building" rows="5" cols="50" value={user.building} onChange={this.handleUserChange}></input><br />

                                    <label className="form__label" htmlFor="flat">Квартира:</label><br />
                                    <input type="text" className="form__input-field" size={1} id="flat" name="flat" rows="5" cols="50" value={user.flat} onChange={this.handleUserChange}></input><br />
                                </div>
                                <div className="card__col">
                                    <label className="form__label" htmlFor="shipping">Способ доставки:</label><br />
                                    <select className="form__input-select" onChange={this.handleShippingChange} value={shipping.id}>
                                        {
                                            shippingMethods.map(method => {
                                                return (
                                                    <option key={method.id} value={method.id}>{method.shipping}</option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                                    <label className="form__label" htmlFor="comment">Комментарий к заказу:</label><br />
                                    <textarea className="form__input-field" id="comment" name="comment" rows="5" cols="50" value={comment} onChange={this.handleChange}></textarea><br />
                            </div> 
                        </div>
                        <div className="distribute">
                            {/* <span className="link link-danger">Отменить изменения</span> */}
                            <span className="link link-success" onClick={this.saveChanges.bind(this)}>Сохранить изменения</span>
                        </div>
                   </form>
                   </div>
                </React.Fragment>
            )
       }
    }
}
