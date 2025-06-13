import './LandingPage.css';
import { useNavigate } from 'react-router-dom';
import BackgroundImage from "../../assets/images/bg.png";

const LandingPage = () => {
  const navigate = useNavigate();

  const handleOrgButton = () => {
    navigate('/org/signin');
  }

  const handleUserButton = () => {
    navigate('/user/submission-form');
  }

  return (
    <div className="landing-container">
      <div className="background-image-wrapper">
        <img src={BackgroundImage} alt="Background" className="background-image" />
      </div>

      <div className="landing-left">
        <h1>
          <span className="landing-line-one">Start Your</span><br />
          <span className="landing-line-two">Anonymous</span><br />
          <span className="landing-line-three">Journey</span><br />
          <span className="landing-line-four">with Us</span>
        </h1>
      </div>

      <div className="landing-right">
        <div className="landing-content-box">
          <h1>Getting Started</h1>
          <p>Let’s find out who you are...</p>
          <h2 className="landing-subtext">Do you want to Submit or Review a Report?</h2>
          <div className="landing-caption">Please select the action that best applies to you.</div>
          <div className="landing-button-group">
            <button className="button primary" onClick={handleUserButton}>
              <span className="circle"></span> Submit a Report
            </button>
            <button className="button secondary" onClick={handleOrgButton}>
              <span className="circle"></span> Review a Report
            </button>
          </div>
        </div>
      </div>
    </div>

  );
};

export default LandingPage;