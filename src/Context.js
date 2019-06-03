import React, { Component } from 'react'
import axios from 'axios'

const Context = React.createContext();

const reducer = (state, action) => {
  switch(action.type) {
    case 'ADD_TO_CART':
      // console.log(state.inCart);
      // console.log(action.payload);
//      var grouped = groupProducts(state.inCart,action.payload);
//      console.log(grouped);
      return {
        ...state,
   //     inCart: [...state.inCart, action.payload]
        inCart : groupProducts(state.inCart,action.payload)
      };
      default:
        return state;
  }; 
};

var groupProducts = (inCart, payload) => {
 // console.log(inCart);
//  console.log(payload);

  const index = inCart.indexOf(payload);
 // console.log(index);
  
  if(index !== -1){
    inCart[index].number++;  
  } else {
    payload.number = 1; 
    inCart = [...inCart, payload];
  }
  console.log(inCart);
  return inCart;
}

class Provider extends Component {
    constructor(props) {
        super(props);
        this.state = {
          categories: [],
          categoryId: 0,
          products: [],
          inCart: [],
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