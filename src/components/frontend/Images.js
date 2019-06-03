import React, { Component } from 'react'
import '../../styles/images.css'

export default class Images extends Component {
  props : {
      images: []
  }
  render() {
    const images = this.props.images;
    return (
      
        <img src={"/img/product/"+images.image_url} alt="" className="image__main"/>
      
    )
  }
}
