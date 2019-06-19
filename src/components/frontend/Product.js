import React, { Component } from 'react'
import Images from '../frontend/Images'
import '../../styles/product.css'
import {Consumer} from '../../Context'
import Spinner from '../frontend/Spinner'

export default class Product extends Component {
    constructor(props) {
        super(props);
        this.state = {
          productId : 2,
          product : [],
          images : [],
          numberInCart: 0,
          buttonLabel: "Купить"
        };
      }
    componentWillMount() {
      this.setState({productId : this.props.match.params.id});     
    }

    addToCart = (dispatch, product, e ) => {
        e.preventDefault();
        this.setState({ numberInCart: this.state.numberInCart+1 ,
                        buttonLabel : "В корзине" });
        dispatch({
            type: 'ADD_TO_CART',
            payload: product
        });   
    }
    applyCurrentProduct = (product) => {
        this.setState({
            product
        });
    }

    render() {
        const { buttonLabel } = this.state;       
        return (
        <Consumer>
        {
            value => {
                const {dispatch, products} = value;
                if(products === undefined || products.length === 0) {
                    return <Spinner />
                } else {

                    const product = products.find(prod => prod.id === this.state.productId)
                  
                    return (
                        <div className="product__container">
                            <div className="product__column">
                            <div className="product__image">
                                <Images images={product} />
                            </div>
                            </div>
                            <div className="product__column">
                            <div className="product__name">
                                {product.name}
                            </div>
                            <div className="product__description">
                                {product.description}
                            </div>
                            </div>
                            <div className="product__column">
                            <div className="product__priceblock">
                                {
                                product.old_price > 0 && product.old_price !== product.price &&
                                <div className="product__oldprice">{product.old_price}</div>
                                
                                }
                                
                                <div className="product__price">{product.price}</div>
                                <div className="product__instock">
                                {
                                product.quantity > 0 &&
                                <div> Товар в наличии </div>
                                }
                                {
                                product.quantity <= 0 &&
                                <div> Нет наличии </div>
                                }
                                </div>
                                          
                                <button className="button-primary" onClick={this.addToCart.bind(this, dispatch, product)}>
                                    {buttonLabel}
                                </button>
                                
                            </div>
                            </div>
                        </div>
                    )
                }
            }
        }
        </Consumer>
            
        
        )
    }
}
