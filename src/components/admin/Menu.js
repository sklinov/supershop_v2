import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import Logo from './Logo'
import '../../styles/admin/admin.css';

export default class Menu extends Component {
    render() {
        return (
            <div className="adminmenu">
                <Logo />
                <div className="adminmenu__item">
                    <Link to="/admin/orders/">Заказы</Link>
                </div>
                <div className="adminmenu__item">
                    <Link to="/admin/users/">Пользователи</Link>
                </div>
                <div className="adminmenu__item">
                    <Link to="/admin/products/">Товары</Link>
                </div>
                <div className="adminmenu__item">
                    <Link to="/admin/categories/">Категории</Link>
                </div>
            </div>
        )
    }
}
