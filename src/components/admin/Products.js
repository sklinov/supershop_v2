import React, { Component } from 'react'
import { Consumer } from '../../Context'
import { Link } from 'react-router-dom'
import Spinner from '../frontend/Spinner'

export default class Products extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentCategoryId: 0
        };
    }

    handleChange = (e) => {
        e.preventDefault();
        this.setState({currentCategoryId: e.target.value});
    }

    render() {
        return (
            <div className="content">
                <h1 className="title">Товары</h1>
                <Consumer>
                {
                    value => {
                        const { categories, products } = value;
                        if(products === undefined || products.length === 0 || categories === undefined || categories.length === 0) {
                            return <Spinner />
                        } else {
                            return (
                                <React.Fragment>
                                <select className="form__input-field" onChange={this.handleChange}>
                                    <option key='0' value='0' >Все товары</option>
                                    {categories.map(category => {
                                        return (
                                            <option key={category.id} value={category.id}>{category.name}</option>
                                        )
                                    })}
                                </select>
                                <table className="table">
                                    <thead>
                                    <tr className="table__headrow">
                                        <th className="table__head">Название товара</th>
                                        <th className="table__head">Стоимость</th>
                                        <th className="table__head"></th>
                                    </tr> 
                                    </thead>
                                    <tbody>   
                                {
                                    products.filter(product => {
                                        if(parseInt(this.state.currentCategoryId) !== 0)
                                        {
                                            return product.id_category === this.state.currentCategoryId
                                        }
                                        else
                                        {
                                            return product 
                                        }
                                    }).map(product => {
                                        return (
                                            <tr className="table__row" key={product.id}>
                                                <td className="table__cell">{product.name}</td>
                                                <td className="table__cell">{product.price}</td>
                                                <td className="table__cell"><Link to={process.env.PUBLIC_URL+"/admin/products/"+product.id}>просмотр</Link></td>
                                            </tr>
                                        ) 
                                })
                                }
                                </tbody>
                                </table>
                                </React.Fragment>
                                )                           
                        }                                                
                    }
                }
                </Consumer>
                <Link to={process.env.PUBLIC_URL+"/admin/products/new"}>Добавить товар</Link>
            </div>
        )
    }
}
