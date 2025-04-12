import React from 'react'
import './Features.css'
import { Link } from "react-router-dom";
import feature_1 from '../../assets/pexels-spencer-stone-251770784-12499378.jpg'
import feature_2 from '../../assets/pexels-823sl-2294361.jpg'
import feature_3 from '../../assets/pexels-padrinan-1591056.jpg'
import feature_5 from '../../assets/pexels-atomlaborblog-4679246.jpg'

const Features = () => {
  return (
    <div className='features'>

    <Link to="/Caloriq/src/components/CalorieDashboard" className='feature'>
      <img src={feature_1} alt="Calorie Tracking" />
      <div className="caption">
        <p>Calorie Tracking</p>
      </div>
    </Link>

    <Link to="/Caloriq/src/components/TDEE" className='feature'>
      <img src={feature_2} alt="BMR and TDEE" />
      <div className="caption">
        <p>BMR and TDEE Calculator</p>
      </div>
    </Link>

    <div className='feature'>
      <img src={feature_5} alt="Connect to Smartwatch" />
      <div className="caption">
        <p>Connect to Smartwatch</p>
      </div>
    </div>

    <div className='feature'>
      <img src={feature_3} alt="Blog & Stuff" />
      <div className="caption">
        <p>Blog & Stuff</p>
      </div>
    </div>
</div>
  )
}

export default Features
