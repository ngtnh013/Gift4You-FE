import './index.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

function ContactPage() {
    return ( <div className="get-in-touch">
        <h1>Get In Touch With Us</h1>
        <p className="pcontent">
          For More Information About Our Product & Services. Please Feel Free To Drop Us An Email.
          Our Staff Always Be There To Help You Out. Do Not Hesitate!
        </p>
  
        <div className="contact-container">
          <div className="contact-info">
            <div className="info-item">
              <i className="fas fa-map-marker-alt"></i>
              <h2>Address</h2>
              <p>Placeholder address, Vietnam</p>
            </div>
  
            <div className="info-item">
              <i className="fas fa-phone"></i>
              <h2>Phone</h2>
              <p>Mobile: +(84) 546-6789</p>
              <p>Hotline: +(84) 456-6789</p>
            </div>
  
            <div className="info-item">
              <i className="fas fa-clock"></i>
              <h2>Working Time</h2>
              <p>Monday-Friday: 9:00 - 22:00</p>
              <p>Saturday-Sunday: 9:00 - 21:00</p>
            </div>
          </div>
  
          <form className="contact-form">
            <p className="pdess">Your name</p>
            <input type="text" placeholder="Abc" required />
            <p className="pdess">Email address</p>
            <input type="email" placeholder="Abc@def.com" required />
            <p className="pdess">Subject</p>
            <input type="text" placeholder="Subject (This is optional)" />
            <p className="pdess">Message</p>
            <textarea placeholder="Hi. I'd like to ask about" required></textarea>
            <button type="submit">Submit</button>
          </form>
        </div>
      </div> );
}

export default ContactPage;