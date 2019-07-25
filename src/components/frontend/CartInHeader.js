import React, { Component } from 'react'
import { Link } from "react-router-dom";
import { Consumer } from '../../Context'

export default class CartInHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cartTotal: 0,
      numberOfProducts : 0
    };
  }

  render() {
    return (
      <div className="cart-h">
        
        <Link to={process.env.PUBLIC_URL+"/shop/cart/"}>
        <Consumer>
        {
          value => {
            const {inCart, inCartTotal} = value;
            // If cart is empty
            if(inCart === undefined || inCart.length === 0) {
              return (
                <React.Fragment>
                <div className="cart-h-empty">
                  Корзина пуста
                </div>
                </React.Fragment>   
              )  
            } else {
              return (
                <React.Fragment>
                  <div className="cart-h-total">
                    {inCartTotal} руб.
                  </div>
                  <div className="cart-h-quantity">
                    {inCart.length} позиции 
                  </div>
                </React.Fragment>
              ) 
            }
          }
        }
        </Consumer>
        </Link>
        
      </div>
    )
  }
}
