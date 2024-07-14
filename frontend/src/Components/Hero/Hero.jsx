import React from 'react'
import './Hero.css'
import emoji from '../Assets/emoji.jpg'
import bulk_sale from '../Assets/bulk_sale.jpg'
 const Hero = () => {
  return (
    <div className="hero">
        <div className="hero-left">
        <h2>NEW ARRIVALS</h2>
        <div className="hand-hand-icon">
            <p>products that</p>
            <img src={emoji} alt="" />
        </div>
        <p>meet All your</p>
        <p>Digital needs</p>
        <div/>
        <div className="hero-latest-btn">
            <div>Trending Products</div>
        </div>
        </div>
    <div className="hero-right">
        <img src={bulk_sale} alt="" style={{width: '800px', height: '600px', objectFit: 'cover'}}/>
    </div>
    </div>
  )
}

export default Hero;