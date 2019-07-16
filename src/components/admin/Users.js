import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Spinner from '../frontend/Spinner'

export default class Users extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            isLoaded: false
        };
    }

    getUsers() {
        const url = "/api/users/getusers.php";
        fetch(url,{ method: "GET" })
        .then(response => response.json())
        .then(
        (result) => {
            this.setState({users: result.data,
                            isLoaded: true});
        },
        (error) => {
        console.log(error);
        });
    }

         
            // <div className="content">
            // <h1 className="title">Пользователи</h1>
            // <Spinner />
        
    
    componentDidMount() {
        this.getUsers();
    }
    
    

    render() {
        const { users, isLoaded } = this.state;

        if(!isLoaded) {
             return (<React.Fragment><Spinner /></React.Fragment>)
        } else {
            return (
                <React.Fragment>
                    <div className="content">
                    <h1 className="title">Пользователи</h1>
                    
                        <table className="table">
                        <thead>
                        <tr className="table__row">
                            <th className="table__head">Имя</th>
                            <th className="table__head">E-mail</th>
                            <th className="table__head">Телефон</th>
                            <th className="table__head"></th>
                        </tr> 
                        </thead>
                        <tbody>
                            {
                                users.map(user => {
                                    return (
                                        <tr className="table__row" key={user.user_id}>
                                            <td className="table__cell">{user.user_name}</td>
                                            <td className="table__cell">{user.user_email}</td>
                                            <td className="table__cell">{user.user_phone}</td>
                                            <td className="table__cell"><Link to={"/admin/users/"+user.user_id}>просмотр</Link></td>
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
