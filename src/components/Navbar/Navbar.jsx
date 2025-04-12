import React, { useEffect, useState } from 'react'
import './Navbar.css'
import menu_icon from '../../assets/menu-icon.png'
import { Link } from 'react-scroll';
import { useNavigate } from "react-router-dom";
import logo from '../../assets/logo.png';


const Navbar = () => {

  const [sticky, setSticky] = useState(false);

  useEffect(()=>{
    window.addEventListener('scroll',()=>{
      window.scrollY > 150 ? setSticky(true) : setSticky(false)})
  },[]);

  const navigate = useNavigate();

  const goToAuth = () => {
    navigate('/Caloriq/src/components/AuthPage');
  }

  const [mobileMenu, setMobileMenu] = useState(false);
  const toggleMenu = ()=>{
    mobileMenu? setMobileMenu(false) : setMobileMenu(true);
  }

  return (
    <nav className={`container ${sticky ? 'dark-nav' : ''}`}>

      <div className='Logo'><img className='ic' src={logo} alt="logo" />
        <h3>Caloriq</h3>
      </div>
      <ul className={mobileMenu?'':'hide-mobile-menu'}>
        <li>
        <Link 
        to="hero" 
        smooth={true} 
        offset={0} 
        duration={500}>Home 
        </Link>
        </li>
        <li>
        <Link 
        to="features" 
        smooth={true} 
        offset={-250} 
        duration={500}>Features
        </Link></li>
        <li>
        <Link 
        to="about" 
        smooth={true} 
        offset={-150} 
        duration={500}>About us
        </Link></li>
        <li>
        <Link 
        to="contact" 
        smooth={true} 
        offset={-260} 
        duration={500}>Contact Us
        </Link></li>
        <li>
        <button className='btn' onClick={goToAuth}>Account</button></li>
      </ul>
      <img src={menu_icon} alt='' className='menu-icon' onClick={toggleMenu}/>
    </nav>
  )
}

export default Navbar;
