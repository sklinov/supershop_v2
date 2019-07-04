import React, { useState, useEffect, useContext, useReducer } from 'react'
import {Link} from 'react-router-dom'
import {Context, reducer } from '../../Context'

const CategoryEditing = (props) => {
    
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [title, setTitle] = useState(''); 
    const [description, setDescription] = useState('');

    const value = useContext(Context);
    const [ , dispatch] = useReducer(reducer);

    useEffect(() => {
        const { categories } = value;
        if(categories === undefined || categories.length === 0) {
            // return <Spinner />
        } else {
            const category = categories.filter(category => {
                if(props.match.params.id !== undefined) {
                    return category.id == props.match.params.id
                } else {
                    return category
                }
            });
            const current = category[0];
            setId(current.id);
            setTitle(current.title);
            setName(current.name);
            setDescription(current.description);
        };
    },[props.match.params.id, value])
    
    var submitChanges = (e) => {
        e.preventDefault();
        let data = { id, name, title, description };
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
                console.log('---------');
                const payload = result2.data;
                //console.log(state);
                dispatch({
                    type: 'CATEGORY_EDIT',
                    payload
                    }); 
                //console.log(result2);
            },
            (error) => {
                console.log(error);
                });
        },
        (error) => {
        console.log(error);
        });
    }

    return (
        <div>
            <h1 className="title">Редактировать категорию</h1>
                                            <form className="form" onSubmit={submitChanges}>
                                                <input type="hidden" value={id} name="cat_id" onChange={(e) => setId(e.target.value)} />
                                                
                                                <label htmlFor="cat_name" className="form__label">Наименование категории</label><br />
                                                <input type="text" className="form__input-field" name="cat_name" value={name} onChange={(e) => setName(e.target.value)}/><br />
                                                
                                                <label htmlFor="cat_title" className="form__label">Подзаголовок категории</label><br />
                                                <input type="text" className="form__input-field"  name="cat_title" value={title} onChange={(e) => setTitle(e.target.value)}/><br />
                                                
                                                <label htmlFor="cat_description" className="form__label">Описание категории</label><br />
                                                <textarea className="form__input-field" name="cat_description" value={description} onChange={(e) => setDescription(e.target.value)} /><br />
                                                
                                                <button type="submit" className="admin__button admin__button-success" >Сохранить</button>
                                                <Link to="/admin/categories/"><button type="button" className="admin__button admin__button-secondary">Отмена</button></Link>
                                                
                                            </form>
        </div>
    )
}

export default CategoryEditing
