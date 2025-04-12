import React from 'react'
import './About.css'
import right_image from '../../assets/pexels-andres-ayrton-6550823.jpg'
const About = () => {
  return (
    <div className='about'>
      <div className="about-left">
        <img src={right_image} alt='Loading'  className='about-img'/>
      </div>
      <div className='about-right'>
        <h3>ABOUT US</h3>
        <p>Welcome to Caloriq, your personal companion for smarter calorie tracking and a healthier lifestyle!</p>
        <p>We believe that fitness and nutrition should be simple, accessible, and effective. Our calorie calculator helps you track your daily food intake, monitor exercise calories, and stay on top of your health goals—all in one place.</p>
        <h3>Our Mission</h3>
        <p>Our goal is to empower individuals to make informed choices about their diet and fitness. Whether you're looking to lose weight, gain muscle, or maintain a balanced lifestyle, our app provides the tools you need to succeed.</p>
        <h3>Why Choose Us?</h3>
        <p>Accurate Calorie Calculations – Based on scientifically proven formulas like BMR & TDEE</p>
        <p>Food & Exercise Tracking – Know exactly how many calories you consume and burn</p>
        <p>Smart Recommendations – Get food suggestions tailored to your goals</p>
        <p>Data Visualization – Interactive graphs to track your progress over time</p>
        <p>User-Friendly & Intuitive – No complex setup, just easy calorie tracking!</p>
      </div>
    </div>
  )
}

export default About
