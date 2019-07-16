import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Spinner from '../frontend/Spinner'

export default class Orders extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orders: [],
            statuses: [],
            ordersAreLoaded: false,
            statusesAreLoaded: false,
        }
    }

    getOrders() {
        const url = "/api/orders/getorders.php";
        fetch(url,{ method: "GET" })
        .then(response => response.json())
        .then(
        (result) => {
            this.setState({orders: result.data,
                ordersAreLoaded: true});
        },
        (error) => {
        console.log(error);
        });
    }
    getStatuses() {
        const url = "/api/orders/getstatuses.php";
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

    handleStatusChange = (order_id, e) => {
        var formData = new FormData();
        const orderId = order_id;
        const newStatusId = e.target.value;
        formData.append('id_order', orderId);
        formData.append('id_status', newStatusId);
        const url = "/api/orders/changeorderstatus.php";
        fetch(url,{ method: "POST", body: formData })
        .then(response => response.json())
        .then(
        (result) => {
            console.log(result);
            this.getOrders();
        },
        (error) => {
        console.log(error);
        });  
    }

    componentDidMount() {
        this.getOrders();
        this.getStatuses();
    }

    render() {
        const { orders, statuses, ordersAreLoaded, statusesAreLoaded } = this.state;

        if(!ordersAreLoaded && !statusesAreLoaded) {
             return (<React.Fragment><Spinner /></React.Fragment>)
        } else {
            return (
                <React.Fragment>
                    <div className="content">
                    <h1 className="title">Заказы</h1>
                        <table className="table">
                            <thead>
                            <tr className="table__row">
                                <th className="table__head">Номер заказа</th>
                                <th className="table__head">Статус</th>
                                <th className="table__head">Сумма</th>
                                <th className="table__head">Время заказа</th>
                                <th className="table__head"></th>
                            </tr> 
                            </thead>
                            <tbody>
                                {
                                    orders.map(order => {
                                        return (
                                            <tr className="table__row" key={order.id}>
                                                <td className="table__cell">{order.id} от {order.user_email}</td>
                                                <td className="table__cell">
                                                    <select className="form__input-select" onChange={(e) => this.handleStatusChange(order.id, e)} value={order.id_status} >
                                                    {statuses.map(status => {
                                                        return (
                                                            <option key={status.id_status} value={status.id_status} style={{color:status.status_color}}>{status.status}</option>
                                                        )
                                                    })}
                                                    </select>
                                                </td>
                                                <td className="table__cell">{Number(order.total).toLocaleString('ru-RU', { style: 'currency', currency: 'RUB' } )}</td>
                                                <td className="table__cell">{order.datetime}</td>
                                                <td className="table__cell"><Link to={"/admin/orders/"+order.id}>просмотр</Link></td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </React.Fragment>
            )
        }
    }
}
