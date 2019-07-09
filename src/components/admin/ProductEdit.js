import React, { Component } from 'react'
import {Context} from '../../Context'
import Spinner from '../frontend/Spinner'
import uuid from 'uuid'

export default class ProductEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: 0,
            description: "",
            name: "",
            sku: 0,
            price: 0,
            old_price: 0,
            quantity: 0,
            badge_id: 0,
            badges: [],
            options: [],
            images: [],
            imagesToAdd: [],
            isLoaded: false,
            isSaved: false
        };
    }
    
    fillValues = (value) => {
        const { products } = value;
        if(products === undefined || products.length === 0) {
                return <Spinner />
        } else if(!this.state.isLoaded) {
            const product = products.filter(product => {
                if(this.props.match.params.id !== undefined) {
                    return product.id === this.props.match.params.id
                } else {
                    return product
                }
            });
            const current = product[0];
            this.setState({ id: current.id,
                            description: current.description,
                            name: current.name,
                            sku: current.sku,
                            price: current.price,
                            old_price: current.old_price,
                            quantity: current.quantity,
                            badge_id: current.badge_id,
                            badge_name: current.badge_name,
                            //options: current.options,
                            isLoaded: true}, () => {this.getImages()});
           
        };
    }

    handleChange = (e) => {
        e.preventDefault();
        this.setState({
            [e.target.name]: e.target.value,
            isSaved: false,
        });
    }

    // saveChanges = (dispatch, e) => {
    //     e.preventDefault();
    //     let data = {id : this.state.id , name: this.state.name, title: this.state.title, description: this.state.description};
    //     const url = "/api/products/edit.php";
    //     fetch(url,{
    //     method: "POST",
    //     body: JSON.stringify(data)
    //     }).then(response => response.json())
    //     .then(
    //     (result) => {
    //         const url2 = "/api/products/products.php";
    //         fetch(url2, {
    //             method: "GET",
    //         }).then(response => response.json())
    //         .then(
    //         (result2) => {
    //             const payload = result2.data;
    //             dispatch({
    //                 type: 'product_EDIT',
    //                 payload
    //                 }); 
    //             this.setState({isSaved: true});
    //         },
    //         (error) => {
    //             console.log(error);
    //             });
    //     },
    //     (error) => {
    //     console.log(error);
    //     });
    // }
    getBadges() {
        const badges = [{'badge_id': 8, 'badge_name': 'NEW'},
                        {'badge_id': 9, 'badge_name': 'HOT'}, 
                        {'badge_id': 10, 'badge_name': 'SALE'}];
        this.setState({
            badges
        });
    }

    getOptions() {
        const options = [{'option_id': 1, 'option_name': 'Вариация 1'},
                         {'option_id': 2, 'option_name': 'Вариация 2'},
                         {'option_id': 3, 'option_name': 'Вариация 3'}];
        this.setState({
            options
        });
    }
    
    getImages() {
        const url = "/api/products/getimages.php?id="+this.state.id;
        fetch(url,{
        method: "GET"
        }).then(response => response.json())
        .then(
        (result) => {
            this.setState({images: result.data});
        },
        (error) => {
        console.log(error);
        });

    }

    addFiles = (e) => {
        var file = e.target.files[0];
        var url = URL.createObjectURL(file);
        var fileToAdd = {
                            image_name: file.name,
                            image_url: url,
                            image_id: uuid.v4(),
                            product_id: this.state.id
                        };
        console.log(fileToAdd);
        this.setState({imagesToAdd: [...this.state.imagesToAdd, fileToAdd ]});
        console.log(file);
        console.log(url);
    }

    componentDidUpdate() {
        let value = this.context;
        this.fillValues(value);
    }

    componentDidMount() {
        let value = this.context;
        this.fillValues(value);
        this.getBadges();
        this.getOptions();
    }

    render() {
        const { dispatch } = this.context;
        const { id, name, description, sku, price, old_price, quantity, badge_id, badges, options, images, imagesToAdd } = this.state;
        return (
            <React.Fragment>
            <div className="content"> 
                <h1 className="title">Просмотр товара</h1>
                <form className="form" name="product_edit" encType="multipart/form-data">
                    <input type="hidden" id="id" value={id} />
                    <div className="card">
                        <div className="card__title">
                            Информация о товаре
                        </div>
                        <div className="card__cont">
                            <div className="card__col">
                                <label className="form__label" htmlFor="name">Наименование товара</label><br />
                                <input type="text" className="form__input-field" id="name" name="name" value={name} onChange={this.handleChange}/><br />
                                
                                <label className="form__label" htmlFor="desc">Описание товара</label><br />
                                <textarea className="form__input-field" id="description" name="description" rows="5" cols="50" value={description} onChange={this.handleChange}></textarea><br />
                                
                                <label className="form__label" htmlFor="sku">Штрих-код</label><br />
                                <input type="text" className="form__input-field" id="sku" name="sku" value={sku} onChange={this.handleChange}/><br />
                                
                                <label className="form__label" htmlFor="price">Цена</label>
                                <input type="text" className="form__input-field" id="price" name="price" value={price} onChange={this.handleChange}/><br />
                                
                                <label className="form__label" htmlFor="old-price">Цена до скидки</label>
                                <input type="text" className="form__input-field" id="old-price" name="old_price" value={old_price} onChange={this.handleChange}/><br />
                                
                                <label className="form__label" htmlFor="quantity">Кол-во</label>
                                <input type="text" className="form__input-field" id="quantity" name="quantity" value={quantity} onChange={this.handleChange}/><br />
                            </div>
                            <div className="card__col">
                                <label className="form__label" htmlFor="badge">Бейджик</label><br />
                                {
                                    badges.map(badge => {
                                        return (
                                            <React.Fragment key={badge.badge_id}>
                                            <input type="radio" name="badge_id"  value={badge.badge_id} />
                                            <label>{badge.badge_name}</label><br />
                                            </React.Fragment>
                                        )
                                    })
                                }
                                
                            </div>
                        </div>
                    </div>
                    <div className="card">
                        <div className="card__title">
                                Фотографии товара
                        </div>
                        <div className="card__cont">
                            
                                {
                                    images.map(image => {
                                        return (
                                            <React.Fragment key={image.image_id}>
                                                <div className="card__col">
                                                    <div className="card__imageblock">
                                                        <div >
                                                            <img className="card__image" src={process.env.PUBLIC_URL+'/img/product/'+image.image_url} alt={name}/>
                                                        </div>
                                                    </div>
                                                </div>
                                            </React.Fragment>
                                        )
                                    })
                                }
                                <div className="card__imageblock">
                                    <div className="card__image">

                                    </div>
                                </div>

                                <div className="card__imageblock">
                                    <div className="card_image">
                                    <label htmlFor="image_upload">Загрузить</label>
                                     <input type="file" style={{'display': 'none'}} id="image_upload" name="image_uploads" accept=".jpg, .jpeg, .png" onChange={this.addFiles}/>
                                    </div>
                                </div>

                           
                        </div>
                    </div>
                    <div className="card">
                        <div className="card__title">
                                Вариации товара
                        </div>
                        <div className="card__cont">
                            <div className="card__col">
                                {
                                    options.map(option => {
                                        return (
                                            <React.Fragment key={option.option_id}>
                                                <input type="text" className="form__input-field" name="option" value={option.option_name} readOnly/>
                                                <span className="link link-danger">Удалить</span><br />
                                            </React.Fragment>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                    <div className="distribute">
                        <span className="link link-danger">Удалить товар</span>
                        <span className="link link-success">Сохранить изменения</span>
                    </div>
                </form> 
            </div>
            </React.Fragment>
        )
    }
}

ProductEdit.contextType = Context;