import React, { Component } from 'react'
import { Consumer } from '../../Context'
import { Link } from 'react-router-dom'
import Spinner from '../frontend/Spinner'

export default class Categories extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newCatName: ''
        };
    }

    addCategory = (dispatch, e) => {
        e.preventDefault();
        const { newCatName } = this.state;
        let payload = {name : newCatName };
        const url = process.env.PUBLIC_URL+ "/api/api/categories/add.php";
        fetch(url,{
            method: "POST",
            body: JSON.stringify(payload)
          }).then(response => response.json())
          .then(
          (result) => {
              //console.log(result);
               dispatch({
                 type: 'CATEGORY_ADD',
                 payload : payload
             });       
          },
          (error) => {
              console.log(error);
          });  
    }

    deleteCategory = (dispatch, id, e) => {
        e.preventDefault();
        //console.log(id);
        let payload = {id : id};
        const url = process.env.PUBLIC_URL+ "/api/api/categories/delete.php";
        fetch(url,{
            method: "POST",
            body: JSON.stringify(payload)
          }).then(response => response.json())
          .then(
          (result) => {
              //console.log(result);
              dispatch({
                type: 'CATEGORY_DELETE',
            });       
          },
          (error) => {
              console.log(error);
          });  
    }

    handleChange = (e) => {
        e.preventDefault();
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    render() {
        return (
            <div className="content">
                <h1 className="title">Категории</h1>
                <Consumer>
                {
                    value => {
                        const { categories, dispatch } = value;
                        ////console.log(categories);
                        if(categories === undefined || categories.length === 0) {
                            return <Spinner />
                        } else {
                            return (
                                <React.Fragment>
                                <table className="table">
                                    <thead>
                                    <tr className="table__row">
                                        <th className="table__head">Название категории</th>
                                        <th className="table__head">Количество товаров</th>
                                        <th className="table__head"></th>
                                        <th className="table__head"></th>
                                    </tr> 
                                    </thead>
                                    <tbody>   
                                {
                                    categories.map(cat => {
                                        return (
                                            <tr className="table__row" key={cat.id}>
                                                <td className="table__cell">{cat.name}</td>
                                                <td className="table__cell">{cat.quantity}</td>
                                                {/* eslint-disable-next-line */}
                                                <td className="table__cell">{ cat.quantity == 0 && <span className="link link-danger" onClick={this.deleteCategory.bind(this, dispatch, cat.id)}>удалить</span>}</td>
                                                <td className="table__cell"><Link to={process.env.PUBLIC_URL+"/admin/categories/"+cat.id} key={cat.id}>просмотр</Link></td>
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
                </Consumer>
                
            </div>
        )
    }
}
