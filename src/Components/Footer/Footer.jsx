import React from 'react'
import './Footer.css'
import logo from '../Assets/logo.png'
import linkedin from '../Assets/linkedin.png'
import facebook from '../Assets/facebook.png'
import x from '../Assets/x.png'
import whatsapp from '../Assets/whatsapp.png'
import email from '../Assets/email.png'

export const Footer = () => {
  return (
    <div className="footer">
        <div className="footer-logo">
        <img src={logo} alt="" />
        <p>TECH-STORE</p>
        </div>
        <ul className="footer-links">
            <li>Techstore</li>
            <li>Digitals</li>
            <li>Products</li>
            <li>Trends</li>
            <li>About</li>
            <li>Contact</li>
        </ul>
        <div className="footer-social-icons">
            <div className="footer-icons-container">
            <img src={linkedin} alt="" />
            </div>
            <div className="footer-icons-container">
            <img src={email} alt="" />
            </div>
            <div className="footer-icons-container">
            <img src={facebook} alt="" />
            </div>
            <div className="footer-icons-container">
            <img src={x} alt="" />
            </div>
            <div className="footer-icons-container">
            <img src={whatsapp} alt="" />
            </div>
        </div>
        <div className="footer-copyright">
            <hr />
            <p>Techstore Copyright @ 2024 - All Right Reserved.</p>
        </div>
    </div>
  )
}
