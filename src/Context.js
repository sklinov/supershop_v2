import React, { Component } from 'react'
import axios from 'axios'

const Context = React.createContext();

const reducer = (state, action) => {
  let inCart;
  //let loggedIn;
  switch(action.type) {
    case 'ADD_TO_CART':
        console.log(state);
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
    case 'USER_LOGIN': 
        return {
          ...state,
          user: action.user,
          loggedIn: true
        };
    case 'CATEGORY_ADD':
        return {
          state
        };
    case 'CATEGORY_DELETE':
        return {
          state
        };
    case 'CATEGORY_EDIT':
        console.log("DISPATCH FIRED");
        //console.log(action.payload);
        var categories = action.payload;
        console.log(categories);
        console.log(state);
        
        return {
          ...state,
          categories: categories
        };
    case 'PRODUCT_EDIT':
      console.log("PRODUCT EDIT DISPATCH FIRED");
      //console.log(action.payload);
      var products = action.payload;
      console.log(products);
      console.log(state);
      
      return {
        ...state,
        products: products
      };
    default:
        return state;
  }; 
};


var groupProducts = (inCart, payload) => {
  const index = inCart.indexOf(payload);
  // If product is in cart already - increment it's quantity
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
  // If product is in cart already - increment it's quantity
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
          user: undefined,
          loggedIn: false,
          dispatch: action => this.setState( state => reducer(state,action))         
        };
    }

    componentDidMount() {
        this.getAllCategories();
        this.getProductsByCategoryId();
    }
    
    getAllCategories = () => {
      const url = "/api/categories/categories.php"; 
      axios.get(url)
        .then(res => {
        const categories = res.data.data;
        this.setState({ categories });
      }).catch(err => {
        console.log('Axios fetch error:',err);
      })
    }

    getProductsByCategoryId = () => {
      const url = "/api/products/products.php?category="+this.state.categoryId;
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

export {Provider, Consumer, Context, reducer};