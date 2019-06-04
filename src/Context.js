import React, { Component } from 'react'
import axios from 'axios'

const Context = React.createContext();

const reducer = (state, action) => {
  let inCart;
  switch(action.type) {
    case 'ADD_TO_CART':
        inCart = groupProducts(state.inCart,action.payload);
        return {
          ...state,
          inCart : inCart, 
          inCartTotal: updateTotal(inCart)
        };
    case 'PLUS_ONE':
        inCart = plusOne(state.inCart,action.payload);
        return {
          ...state,
          inCart : inCart, 
          inCartTotal: updateTotal(inCart)
        };
    case 'MINUS_ONE':
        inCart = minusOne(state.inCart,action.payload);
        return {
          ...state,
          inCart : inCart, 
          inCartTotal: updateTotal(inCart)
        };
    case 'REMOVE_FROM_CART':
        inCart = removeFromCart(state.inCart,action.payload);
        return {
          ...state,
          inCart : inCart, 
          inCartTotal: updateTotal(inCart)
        };  
    default:
        return state;
  }; 
};

var groupProducts = (inCart, payload) => {
  const index = inCart.indexOf(payload);
  // If product is in cart alrady - increment it's quantity
  if(index !== -1){
    inCart[index].number++;  
  } else { //If product is not in cart - then set it's quantity to 1 and add it to cart
    payload.number = 1; 
    inCart = [...inCart, payload];
  }
  return inCart;
}

var plusOne = (inCart, payload) => {
  const index = inCart.indexOf(payload);
  // If product is in cart alrady - increment it's quantity
  if(index !== -1){
    inCart[index].number++;  
  } 
  return inCart;
}

var minusOne = (inCart, payload) => {
  const index = inCart.indexOf(payload);
  // If product is in cart already - decrease it's quantity
  if(index !== -1){
    if(inCart[index].number>=2) {
      inCart[index].number--;
    }
    else {
      inCart = removeFromCart(inCart, payload);
    }
  } 
  return inCart;
}

var removeFromCart = (inCart, payload) => {
  const index = inCart.indexOf(payload);
  if(index !== -1){
    inCart.splice(index,1);  
  } 
  return inCart;
}


var updateTotal = (inCart) => {
  if(inCart !== undefined || inCart.length !== 0)
  {
    const newTotal = inCart.reduce( (total, item) => {
      return total+item.price*item.number 
    }, 0);
    return newTotal;
  }
}

class Provider extends Component {
    constructor(props) {
        super(props);
        this.state = {
          categories: [],
          categoryId: 0,
          products: [],
          inCart: [],
          inCartTotal: 0,
          dispatch: action => this.setState( state => reducer(state,action))         
        };
    }
    // componentWillMount() {
    //     this.setState({categoryId : this.props.match.params.id}); 
    // }

    componentDidMount() {
        this.getAllCategories();
        this.getProductsByCategoryId();
    }
    
   
    
    getAllCategories = () => {
      const url = "http://localhost/supershop/public/api/api/categories/categories.php";
      axios.get(url)
        .then(res => {
        const categories = res.data.data;
        this.setState({ categories });
      }).catch(err => {
        console.log('Axios fetch error:',err);
      })
    }

    getProductsByCategoryId = () => {
      const url = "http://localhost/supershop/public/api/api/products/products.php?category="+this.state.categoryId;
      axios.get(url)
        .then(res => {
        const products = res.data.data;
        this.setState({ products });
      }).catch(err => {
        console.log('Axios fetch error:',err);
      })
    }

    
    render() {
    return (
      <Context.Provider value={this.state}>
          {this.props.children}
      </Context.Provider>
    )
  }
}

const Consumer = Context.Consumer;

export {Provider, Consumer};