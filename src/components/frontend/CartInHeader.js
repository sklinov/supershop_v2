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
      <div>
        <Link to="/shop/cart/">Cart</Link>
      </div>
    )
  }
}
