import React, { Component } from 'react'
import { Link } from "react-router-dom";
import '../../styles/menu.css';
import {Consumer} from '../../Context'
import Spinner from '../frontend/Spinner'

export default class Menu extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <div className="menu">
               <Consumer>
                { 
                    value => {
                        const { categories } = value;
                        if(categories === undefined || categories.length === 0) {
                            return <Spinner />
                        } else {
                            return (
                                categories.map(cat => {
                                 return <Link to={process.env.PUBLIC_URL+"/shop/category/"+cat.id} key={cat.id} className="menu__item">{cat.name}</Link>
                                }))                           
                        }                                                
                    }
    
                }
               </Consumer> 
            </div>
        )
    }
}
