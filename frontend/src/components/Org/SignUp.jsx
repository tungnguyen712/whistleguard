import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import './styles/SignUp.css';
import BackgroundImage from "../../assets/images/bg.png";
import { MailIcon, LockIcon, UserIcon, FilterIcon } from "../../assets/icons";

const ORG_TYPE_OPTIONS = [
  "Anti-Corruption NGO",
  "Whistleblower Protection Org",
  "Legal Aid Organization",
  "Human Rights Organization",
  "Gender Rights NGO",
  "Civil Rights NGO",
  "Youth Advocacy Group",
  "Labor Rights Organization",
  "Occupational Health NGO",
  "Worker Protection NGO",
  "Education Oversight Group",
  "Academic Ethics Committee",
  "Student Advocacy NGO",
  "Disability Rights Group",
  "Environmental NGO",
  "Public Health Watchdog",
  "Urban Safety Org",
  "Community Infrastructure Org",
  "Digital Rights NGO",
  "Online Safety NGO",
  "Tech Oversight Group",
  "Cybersecurity Watchdog",
  "Public Safety NGO",
  "Community Watch Group",
  "Local Justice NGO",
  "Community Mediation Center",
  "Public Information Center",
  "General Public Interest Organization",
  "Other"
];

const SignUp = () => {
    const navigate = useNavigate();
    const [orgName, setOrgName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [orgTypes, setOrgTypes] = useState([]);
    const [otherOrgType, setOtherOrgType] = useState("");

    const handleAddOrgType = (type) => {
        if (!orgTypes.includes(type) && orgTypes.length < 3) {
            setOrgTypes([...orgTypes, type])
        }
    }

    const handleRemoveOrgType = (type) => {
        setOrgTypes(orgTypes.filter(t => t !== type));
        if (type === "Other") {
            setOtherOrgType("");
        }
    }

    const handleSignUp = async (e) => {
        e.preventDefault();

        if (!orgName || !email || !password || orgTypes.length === 0) {
            alert("Please fill in all required fields.");
            return;
        }

        const res = await fetch("https://5fu4yvoafi.execute-api.ap-southeast-1.amazonaws.com/org/signup", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                orgName,
                email,
                password,
                orgTypes,
                otherOrgType: orgTypes.includes("Other") ? otherOrgType : null
            })
        });
        if (res.ok) {
            console.log("Sign up successful");
            navigate('/org/signin');
        } else {
            alert("Sign up failed. Please try again.");
        }
    };

    const handleSignIn = (e) => {
        e.preventDefault();
        navigate('/org/signin');
    };

    return (
        <div className="signup-container">
            <div className="signup-background-image-wrapper">
                <img src={BackgroundImage} alt="Background" className="signup-background-image" />
            </div>
            <div className="signup-left">
                <h1>
                    <span className="signup-line-one">Start Your</span><br />
                    <span className="signup-line-two">Anonymous</span><br />
                    <span className="signup-line-three">Journey</span><br />
                    <span className="signup-line-four">with Us</span>
                </h1>
            </div>
            <div className="signup-right">
                <div className="signup-content-box">
                    <h1>Get Started Now</h1>
                    <p>Let's create your account</p>
                    <form className="signup-form" onSubmit={handleSignUp}>

                        <label htmlFor="orgType">Organization Type(s) <span style={{color: "red"}}>*</span></label>
                        <div className="signup-input-container signup-multiselect-container">
                            <FilterIcon alt="Org Type Icon" className="signup-icon" />
                            <div className="signup-multiselect">
                                <select
                                    id="orgType"
                                    value=""
                                    onChange={e => handleAddOrgType(e.target.value)}
                                    className="signup-multiselect-dropdown"
                                    disabled={orgTypes.length >= 3}
                                >
                                    <option className="signup-default-option" value="" disabled>Select organization type(s)</option>
                                    {ORG_TYPE_OPTIONS.map(type => (
                                        <option key={type} value={type} disabled={orgTypes.includes(type)}>
                                            {type}
                                        </option>
                                    ))}
                                </select>
                                <div className="signup-selected-types">
                                    {orgTypes.map(type => (
                                        <span className="signup-type-tag" key={type}>
                                            {type}
                                            <button type="button" onClick={() => handleRemoveOrgType(type)}>x</button>
                                        </span>
                                    ))}
                                </div>
                                {orgTypes.includes("Other") && (
                                    <input 
                                        type="text"
                                        className="signup-input signup-other-type"
                                        placeholder="Please specify other organization type"
                                        value={otherOrgType}
                                        onChange={e => setOtherOrgType(e.target.value)}
                                        required
                                    />
                                )}
                            </div>
                        </div>

                        <label htmlFor="orgName">Organization Name <span style={{color: "red"}}>*</span></label>
                        <div className="signup-input-container">
                            <UserIcon alt="Org Name Icon" className="signup-icon" />
                            <input 
                                type="text" 
                                id="orgName" 
                                name="orgName" 
                                className="signup-input" 
                                placeholder="Organization Name"
                                onChange={e => setOrgName(e.target.value)} 
                            />
                        </div>

                        <label htmlFor="email">Email <span style={{color: "red"}}>*</span></label>
                        <div className="signup-input-container">
                            <MailIcon alt="Email Icon" className="signup-icon" />
                            <input 
                                type="email" 
                                id="email" 
                                name="email" 
                                className="signup-input" 
                                placeholder="domat@example.com"
                                onChange={e => setEmail(e.target.value)}
                            />
                        </div>

                        <label htmlFor="password">Password <span style={{color: "red"}}>*</span></label>
                        <div className="signup-input-container">
                            <LockIcon alt="Lock Icon" className="signup-icon" />
                            <input 
                                type="password" 
                                id="password" 
                                name="password" 
                                className="signup-input" 
                                placeholder="Set your password" 
                                onChange={e => setPassword(e.target.value)}    
                            />
                        </div>

                        <button type="submit" className="signup-button" onClick={handleSignUp}>Sign up</button>
                    </form>

                    <div className="signup-switch-signup">
                        <div className="signup-no-account">Already have an account?</div>
                        <a href="#" onClick={handleSignIn}>Sign in</a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;