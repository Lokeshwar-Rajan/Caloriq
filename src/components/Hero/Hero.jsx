import React from 'react'
import './Hero.css'
import dark_arrow from '../../assets/dark-arrow.png'
import { Link } from 'react-scroll';
const Hero = () => {
  return (
    <div className='Hero container' id='hero'>
      <div className='hero-text'>
        <h1>Your Personal Calorie Calculator! 🥗🔥</h1>
        <p>"Eat. Log. Repeat! 🍎 "</p>
        <div className='down'>
        <Link 
                to="features" 
                smooth={true} 
                offset={-250} 
                duration={500}><button className='btn'>Scroll Down <img src={dark_arrow} alt="" /></button>
                </Link>
        </div>
      </div>
    </div>
  )
}

export default Hero
