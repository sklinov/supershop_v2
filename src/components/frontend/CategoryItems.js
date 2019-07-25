import React, { Component } from 'react'
import '../../styles/category.css'
import { Link } from "react-router-dom";
import {Consumer} from '../../Context'
import Spinner from '../frontend/Spinner'

export default class CategoryItems extends Component {
    constructor(props) {
        super(props);
        this.state = {
          error: null,
          isLoaded: false,
          
        };
      }
    
    

    render() {
        return (
            <Consumer>
                {
                    value => {
                        const { products } = value;
                        if(products === undefined || products.length === 0) {
                            return <Spinner />
                        } else {
                            return (
                                products.filter(product => {
                                   if( this.props.match !== undefined &&
                                       this.props.match.params.id !== undefined)
                                   {
                                    return product.id_category === this.props.match.params.id
                                   }
                                   else if(this.props.id_category !== undefined)
                                   {
                                    return product.id_category === this.props.id_category && product.id !== this.props.id_product
                                   }
                                   else
                                   {
                                    return product 
                                   } 
                                }).map(product => {
                                    return (
                                    <Link to={process.env.PUBLIC_URL+"/shop/product/"+product.id} key={product.id}>
                                        <div className="category__item">
                                            <div className="item__imagebox"> 
                                                <img src={process.env.PUBLIC_URL +"/img/product/"+product.image_url} alt={product.name} className="item__image"/>
                                            </div>
                                            <div className="item__details">
                                                <span key={product.id} className="item__name">{product.name}</span>
                                                <span key={product.price} className="item__price">{product.price}руб.</span>
                                            </div>
                                        </div>
                                    </Link>
                                    ) 
                                })
                            )
                        }
                    }
                }
                </Consumer>
        )
    }
}
