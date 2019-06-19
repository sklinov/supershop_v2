import React, { Component } from 'react'
import axios from 'axios'

const Context = React.createContext();

const reducer = (state, action) => {
  let inCart;
  let user;
  let loggedIn;
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
    case 'USER_LOGIN': 
        //var temp = userLogin(state.user,action.payload);
        //console.log(temp);
        return {
          ...state,
          user: userLogin(state.user,action.payload),
          //loggedIn: temp.length> 0 ? true: false
        };
    default:
        return state;
  }; 
};

var userLogin = (user, payload) => {
  
  const url = "/api/users/login.php";
  console.log(payload);
  fetch(url,{
    method: "POST",
    body: JSON.stringify(payload)
  })
      .then(response => response.json())
      .then(
      (result) => {
          //user = result;
          user.id = result.id;
          user.name = result.name;
          user.email = result.email;
          user.phone = result.phone;
          user.city = result.city;
          user.street = result.street;
          user.building = result.building;
          user.flat = result.flat;
         // console.log(user);         
      },
      (error) => {
          console.log(error);
      }); 
  //console.log(user);
  return user;
}

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
          user: [],
          loggedIn: false,
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

export {Provider, Consumer};