import React from 'react'
import { useState } from 'react'
import './Navigation.css'

import logo from '../Assets/logo.png'
import cart_icon from '../Assets/cart_icon.png'
import { Link } from 'react-router-dom'

const Navigation = () => {

  const [menu,setMenu] = useState("store")


  return (
    <div className='navigation'>
      <div className="nav-logo">
      <img src={logo} alt="logo" />

      </div>
    <ul className="nav-menu">
      <li onClick={()=>{setMenu("store")}}><Link style={{ textDecoration: 'none'}} to='/'>Store</Link>{menu==="store"?<hr />:<></>}</li>
      <li onClick={()=>{setMenu("gadgets")}}><Link style={{ textDecoration: 'none'}} to='/gadgets'>Gadget</Link>{menu==="gadgets"?<hr />:<></>}</li>
      <li onClick={()=>{setMenu("computings")}}><Link style={{ textDecoration: 'none'}} to='/computings'>Computing</Link>{menu==="computings"?<hr />:<></>}</li>
      <li onClick={()=>{setMenu("home appliances")}}><Link style={{ textDecoration: 'none'}} to='/home appliances'>Home Appliance</Link>{menu==="home appliances"?<hr />:<></>}</li>
    </ul>
    <div className="nav-login-cart">
    <Link to='/login'><button>Login</button></Link>
    <Link to='/cart'><img src={cart_icon} alt="cart_icon" /></Link>
    <div className="nav-cart-count">0</div>
    </div>
    </div>
  )
}

export default Navigation;