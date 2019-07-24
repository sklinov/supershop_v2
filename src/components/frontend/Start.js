import React from 'react'
import Logo from './Logo';
import { Link } from 'react-router-dom'

export default function Start() {
    return (
        <div className="start">
            <Logo />
            <br /><br />
            <Link to="/shop">
                <button className="button button-primary">
                    Магазин
                </button>
            </Link>
            <br /><br />
            <Link to="/admin">
                <button className="button button-primary">
                    Панель администратора
                </button>
            </Link>
        </div>
    )
}
