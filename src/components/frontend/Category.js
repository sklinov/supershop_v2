import React, { Component } from 'react'
import {Context} from '../../Context'
import '../../styles/category.css'
import CategoryItems from './CategoryItems';


export default class Category extends Component {
    constructor(props) {
        super(props);
        this.state = {
          error: null,
          isLoaded: false,
          title: "Товары",
          titleLoaded: false
        };
      }

    setTitle() {
        if (this.props.match.params.id !== undefined) {
            let value = this.context;
            let { categories } = value;
            let title = categories.find(category => category.id === this.props.match.params.id).name;
            this.setState({title});
        }
    }  

    render() {
        const {title} = this.state;
        if (this.props.match.params.id !== undefined) {
            var id_category = this.props.match.params.id;
        }
        return (
            <React.Fragment>
              <div className="category__container">
                        <h1 className="category__header">
                            {title}
                        </h1>
     
              <div className="category__items">
                    <CategoryItems id_category={id_category} />
               </div>
            </div>
            </React.Fragment>
        )
    }
}

Category.contextType = Context;