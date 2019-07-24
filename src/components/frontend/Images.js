import React, { Component } from 'react'
import '../../styles/images.css'
import Spinner from '../frontend/Spinner'

export default class Images extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [],
      isLoaded: false,
      imageToShow: {}
    }
  }

  getImages() {
    const {isLoaded} = this.state;
    if(this.props.product_id !== undefined && !isLoaded) {  
        const url = "/api/products/getimages.php?id="+this.props.product_id;
        fetch(url,{ method: "GET" })
        .then(response => response.json())
        .then(
        (result) => {  
                this.setState({images: result.data, isLoaded: true}, this.initImage);
        },
        (error) => {
        console.log(error);
        });
    }
  }

  initImage() {
    const { images } = this.state;
    if(images.length > 0)
    {
      let image = images.find(image => image.image_main === '1');
      if(image === undefined) {
        image = images.find(image => image);
      }
      this.setState({ imageToShow: image });
    }
    
  }
  setImage(image_id) {
    const { images } = this.state;
    if(images.length > 0)
    {
      let image = images.find(image => image.image_id === image_id);
      this.setState({ imageToShow: image });
    }
  }

  componentDidMount() {
    this.getImages();
  }

  componentDidUpdate() {
    this.getImages();
  }

  render() {
    const {product_id, product_name } = this.props;
    const { images, imageToShow } = this.state;
    if(images.length > 0 && imageToShow!== undefined) {
      return (
        <div>
          <img src={process.env.PUBLIC_URL +"/img/product/"+imageToShow.image_url} alt={ product_name } className="image__main"/>
          <div>
              {
                images.map(image => {
                  return(
                    <img src={process.env.PUBLIC_URL +"/img/product/"+image.image_url} alt={product_name} className="image__thumb" key={image.image_id} onClick={(e) => this.setImage(image.image_id)}/>
                  )
                })
              }
          </div>
        </div>
    )
    }
    else {
      return <Spinner />
    }
    
  }
}
