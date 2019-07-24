import React from 'react'

export default function Banner() {
    return (
        <div >
            <img src={process.env.PUBLIC_URL+"/img/banner/banner.png"} alt="Промо-баннер"  className="banner"/>
            <div className="banner__text">
                <h1 className="category__header"><b> Товары </b> <br/> для экстрима </h1>
            </div>
        </div>
    )
}
