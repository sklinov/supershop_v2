import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import {Context} from '../../Context'
import Spinner from '../frontend/Spinner'

export default class CategoryEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: 0,
            description: "",
            name: "",
            title: "",
            isLoaded: false,
            isSaved: false
        };
    }
    
    fillValues = (value) => {
        const { categories } = value;
        if(categories === undefined || categories.length === 0) {
                return <Spinner />
        } else if(!this.state.isLoaded) {
            const category = categories.filter(category => {
                if(this.props.match.params.id !== undefined) {
                    return category.id === this.props.match.params.id
                } else {
                    return category
                }
            });
            const current = category[0];
            this.setState({id: current.id,
                           title: current.title,
                           name: current.name,
                           description: current.description,
                           isLoaded: true});
        };
    }

    handleChange = (e) => {
        e.preventDefault();
        this.setState({
            [e.target.name]: e.target.value,
            isSaved: false,
        });
    }

    saveChanges = (dispatch, e) => {
        e.preventDefault();
        let data = {id : this.state.id , name: this.state.name, title: this.state.title, description: this.state.description};
        const url = "/api/categories/edit.php";
        fetch(url,{
        method: "POST",
        body: JSON.stringify(data)
        }).then(response => response.json())
        .then(
        (result) => {
            const url2 = "/api/categories/categories.php";
            fetch(url2, {
                method: "GET",
            }).then(response => response.json())
            .then(
            (result2) => {
                const payload = result2.data;
                dispatch({
                    type: 'CATEGORY_EDIT',
                    payload
                    }); 
                this.setState({isSaved: true});
            },
            (error) => {
                console.log(error);
                });
        },
        (error) => {
        console.log(error);
        });
    }

    componentDidUpdate() {
        let value = this.context;
        this.fillValues(value);
    }

    componentDidMount() {
        let value = this.context;
        this.fillValues(value);
    }

    render() {
        const { dispatch } = this.context;
        const {id, name, title, description} = this.state;
        return (
            <div className="content">
               
                <h1 className="title">Редактировать категорию</h1>
                    <form className="form" onSubmit={this.saveChanges.bind(this,dispatch)}>
                        <input type="hidden" value={id} name="id" onChange={this.handleChange} />
                        
                        <label htmlFor="name" className="form__label">Наименование категории</label><br />
                        <input type="text" className="form__input-field" name="name" value={name} onChange={this.handleChange}/><br />
                        
                        <label htmlFor="cat_title" className="form__label">Подзаголовок категории</label><br />
                        <input type="text" className="form__input-field"  name="title" value={title} onChange={this.handleChange}/><br />
                        
                        <label htmlFor="cat_description" className="form__label">Описание категории</label><br />
                        <textarea className="form__input-field" name="description" value={description} onChange={this.handleChange} /><br />
                        
                        <button type="submit" className="admin__button admin__button-success" >Сохранить</button>
                        <Link to="/admin/categories/" renderas="button"><button type="button" className="admin__button admin__button-secondary">Отмена</button></Link>
                        {this.state.isSaved && <div>Изменения сохранены</div>}
                    </form>
                    
                
            </div>
        )
    }
}

CategoryEdit.contextType = Context;