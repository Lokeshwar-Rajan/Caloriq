import React from 'react'
import msg_icon from '../../assets/msg-icon.png'
import mail_icon from '../../assets/mail-icon.png'
import location_icon from '../../assets/location-icon.png'
import phone_icon from '../../assets/phone-icon.png'
import './Contact.css'
import dark_arrow from '../../assets/dark-arrow.png'

const Contact = () => {

    const [result, setResult] = React.useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending....");
    const formData = new FormData(event.target);

    formData.append("access_key", "b019f9f9-f88b-4925-8c94-5df6bc2ba4e9");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData
    });

    const data = await response.json();

    if (data.success) {
      setResult("Form Submitted Successfully");
      event.target.reset();
    } else {
      console.log("Error", data);
      setResult(data.message);
    }
  };


  return (
    <div className='contact'>
        <div className='contact-col'>
            <h3>Reach out us <img src={msg_icon} alt=''/></h3>
            <p>We’d love to hear from you! Whether you have questions, feedback, or suggestions, feel free to reach out to us.</p>
            <ul>
                <li><img src={mail_icon} alt="" />Support@Caloriq.in</li>
                <li><img src={phone_icon} alt="" />+91 946-837-2645</li>
                <li><img src={location_icon} alt="" />CaloriQ Health & Wellness<br></br> 47 Old Mahabalipuram Road, Brigade Towers, Perungudi,<br></br> Chennai, India</li>
            </ul>
        </div>
        <div className="contact-col">
            <form onSubmit={onSubmit}>
                <label>Your Name</label>
                <input type='text' name='name' placeholder='Enter your name' required/>
                <label>Phone Number</label>
                <input type='tel' name='phone' placeholder='Enter your number' required/>
                <label>Write your messages here</label>
                <textarea name="message" rows="6" placeholder='Enter your message...' required></textarea>
                <button type='submit' className='btn dark-btn'>Submit now <img src={dark_arrow} alt="" /></button>
            </form>
            <span>{result}</span>
        </div>
      
    </div>
  )
}

export default Contact
