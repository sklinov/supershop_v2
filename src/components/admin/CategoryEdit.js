import React, { Component } from 'react'
import {Consumer} from '../../Context'
import Spinner from '../frontend/Spinner'
import {Context} from '../../Context'

export default class CategoryEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cat_id: 0,
            cat_description: "",
            cat_name: "",
            cat_title: "",
            isSaved: false,
        };
    }

    handleChange = (e) => {
        e.preventDefault();
        this.setState({
            [e.target.name]: e.target.value,
            isSaved: false,
        });
    }

    saveChanges = (dispatch,e) => {
        e.preventDefault();
        const { cat_id, cat_description, cat_name, cat_title } = this.state;
        let payload = {id : cat_id,
                       description: cat_description,
                       name: cat_name,
                       title: cat_title };
        const url = "/api/categories/edit.php";
        fetch(url,{
            method: "POST",
            body: JSON.stringify(payload)
          }).then(response => response.json())
          .then(
          (result) => {
              console.log(result);
               dispatch({
                 type: 'CATEGORY_EDIT',
                 //payload : payload
             });
             this.setState({isSaved: true});       
          },
          (error) => {
              console.log(error);
          });
    }
    
    render() {
        return (
            <div className="content">
                <Consumer>
                {
                    value => {
                        const { categories , dispatch } = value;
                        if(categories === undefined || categories.length === 0) {
                            return <Spinner />
                        } else {
                            const category = categories.filter(category => {
                                if(this.props.match.params.id !== undefined) {
                                    return category.id == this.props.match.params.id
                                } else {
                                    return category
                                }
                            });
                            return (
                                category.map(category => {
                                    return (
                                        <React.Fragment key={category.id}>
                                        <h1 className="title">Редактировать категорию</h1>
                                            <form className="form" onSubmit={this.saveChanges.bind(this,dispatch)}>
                                                <input type="hidden" value={category.id} name="cat_id" onChange={this.handleChange} />
                                                <label htmlFor="cat_name" className="form__label">Наименование категории</label><br />
                                                <input type="text" className="form__input-field" name="cat_name" value={category.name} onChange={this.handleChange}/><br />
                                                <label htmlFor="cat_title" className="form__label">Подзаголовок категории</label><br />
                                                <input type="text" className="form__input-field"  name="cat_title" value={category.title} onChange={this.handleChange}/><br />
                                                <label htmlFor="cat_description" className="form__label">Описание категории</label><br />
                                                <textarea className="form__input-field" name="cat_description" value={category.description} onChange={this.handleChange} /><br />
                                                <button type="submit" className="admin__button admin__button-success" >Сохранить</button>
                                                <button type="button" className="admin__button admin__button-secondary">Отмена</button>
                                                
                                            </form>
                                            {this.state.isSaved && <div>Изменения сохранены</div>}
                                        </React.Fragment>
                                    )
                                })
                                
                            )
                        }    
                    }
                }    
                </Consumer>
            </div>
        )
    }
}

//CategoryEdit.contextType = Context;