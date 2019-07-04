import React, { Component } from 'react'
import { Consumer } from '../../Context'
import { Link } from 'react-router-dom'
import Spinner from '../frontend/Spinner'

export default class Products extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentCategoryId: 1
        };
    }

    render() {
        return (
            <div className="content">
                <h1 className="title">Товары</h1>
                {/* <Consumer>
                {
                    value => {
                        const { categories, products, dispatch } = value;
                        //console.log(products);
                        if(products === undefined || products.length === 0 || categories === undefined || categories.length === 0) {
                            return <Spinner />
                        } else {
                            return (
                                <React.Fragment>
                                <table className="table">
                                    <thead>
                                    <tr className="table__row">
                                        <th className="table__head">Название товара</th>
                                        <th className="table__head">Стоимость</th>
                                        <th className="table__head"></th>
                                        <th className="table__head"></th>
                                    </tr> 
                                    </thead>
                                    <tbody>   
                                {
                                    products.map(cat => {
                                        return (
                                            <tr className="table__row" key={cat.id}>
                                                <td className="table__cell">{cat.name}</td>
                                                <td className="table__cell">{cat.quantity}</td>
                                                
                                                <td className="table__cell">{ cat.quantity == 0 && <span className="link link-danger" onClick={this.deleteCategory.bind(this, dispatch, cat.id)}>удалить</span>}</td>
                                                <td className="table__cell"><Link to={"/admin/products/"+cat.id} key={cat.id}>просмотр</Link></td>
                                            </tr>
                                        ) 
                                })
                                }
                                </tbody>
                                </table>
                            
                                
                                <form className="add">
                                    <label>Добавить категорию:</label>
                                    <input type="text" name="newCatName" onChange={this.handleChange}></input>
                                    <br /><span className="link link-success" onClick={this.addCategory.bind(this, dispatch)}>Добавить категорию</span>
                                </form>
                                </React.Fragment>
                                )                           
                        }                                                
                    }
                }
                </Consumer> */}
                
            </div>
        )
    }
}
