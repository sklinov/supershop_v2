import React from 'react'
import banner from '../../img/banner/banner.png'

export default function Banner() {
    return (
        <div >
            <img src= {banner} alt="Промо-баннер"  className="banner"/>
            <div className="banner__text">
                <h1 className="category__header"><b> Товары </b> <br/> для экстрима </h1>
            </div>
        </div>
    )
}
