import React, { Component } from 'react'
import axios from 'axios'

const Context = React.createContext();

const reducer = (state, action) => {
  let inCart;
  let user;
  //let loggedIn;
  switch(action.type) {
    case 'ADD_TO_CART':
        //console.log(state);
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
    case 'CLEAR_CART': 
        return {
          ...state,
          inCart: [],
          inCartTotal: 0
        }
    case 'USER_LOGIN': 
        console.log("dispatch");
        user = action.payload;
        return {
          ...state,
          user: user,
          loggedIn: true
        };
    case 'USER_EDIT': 
        
        user = action.payload;
        console.log(user);
        return {
          ...state,
          user: user
        };
    case 'CHECKOUT_SIGN_UP':
      user = action.payload;
      return {
        ...state,
        user: user,
      }
    case 'SIGN_UP_MAIN':
      user = action.payload;
      return {
        ...state,
        user: user,
        loggedIn: true
      }
    case 'CATEGORY_ADD':
        return {
          state
        };
    case 'CATEGORY_DELETE':
        return {
          state
        };
    case 'CATEGORY_EDIT':
        var categories = action.payload;
        return {
          ...state,
          categories: categories
        };
    case 'PRODUCT_EDIT':
      var products = action.payload.products;
      categories = action.payload.categories;
      return {
        ...state,
        products: products,
        categories: categories
      };
    case 'CHECKOUT_DELIVERY':
      var orderInfo = action.orderPayload;
      var userInfo = Object.assign({},state.user, action.userPayload);
      return {
        ...state,
        order: orderInfo,
        user: userInfo
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
          order: undefined,
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