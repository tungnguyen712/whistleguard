import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
// import { useAuth } from "react-oidc-context";
import './styles/SignIn.css';
import BackgroundImage from "../../assets/images/bg.png";
// import GoogleLogo from "../../assets/images/google-logo.png";
import { MailIcon, LockIcon } from "../../assets/icons";

const SignIn = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSignIn = async (e) => {
        e.preventDefault();
        
        const res = await fetch("https://5fu4yvoafi.execute-api.ap-southeast-1.amazonaws.com/org/signin", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                password
            })
        });

        if (res.ok) {
            console.log("Sign in successful");
            const data = await res.json();
            localStorage.setItem('orgId', data.orgId);
            navigate('/org/dashboard');
        } else {
            alert("Invalid email or password. Please try again.");
            throw new Error("Sign in failed");
        }
    };

    // const auth = useAuth();
    // const handleGoogleSignIn = () => {
    //     auth.signinRedirect();
    // }

    // const handleSignUp = () => {
    //     navigate('/org/signup');
    // }

    // validate email using error

    return (
        <div className="signin-container">
            <div className="background-image-wrapper">
                <img src={BackgroundImage} alt="Background" className="background-image" />
            </div>
    
            <div className="signin-left">
                <h1>
                    <span className="signin-line-one">Start Your</span><br />
                    <span className="signin-line-two">Anonymous</span><br />
                    <span className="signin-line-three">Journey</span><br />
                    <span className="signin-line-four">with Us</span>
                </h1>
            </div>
    
            <div className="signin-right">
                <div className="signin-content-box">
                    <h1>Welcome Back</h1>
                    <p>Sign in to your account</p>
                    <form className="signin-form">
                        <label htmlFor="email">Email</label>
                        <div className="signin-input-container">
                            <MailIcon alt="Email Icon" className="signin-icon" />
                            <input 
                                type="email" 
                                id="email" 
                                name="email" 
                                value={email} 
                                onChange={(e) => setEmail(e.target.value)}
                                className="signin-input" 
                                placeholder="Enter your email" 
                            />
                        </div>
                    
                        <label htmlFor="password">Password</label>

                        <div className="signin-input-container">
                            <LockIcon alt="Lock Icon" className="signin-icon" />
                            <input 
                                type="password" 
                                id="password" 
                                name="password" 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="signin-input" 
                                placeholder="Enter your password" 
                            />
                        </div>
                        
                        <a href="" target="_blank">Forgot Password</a>

                        {/* (nice to have) use localStorage for Remember Me features */}

                        <button type="submit" className="signin-button" onClick={handleSignIn}>Sign in</button>

                        {/* <div className="google-signin-container">
                            <span className="divider">
                                <hr className="line" /> or <hr className="line" />
                            </span>
                            <button type="button" className="google-signin-button" onClick={handleGoogleSignIn}>
                                <img src={GoogleLogo} alt="Google Logo" className="google-logo" />
                                Sign in with Google
                            </button>
                        </div> */}
                    </form>

                    <div className="switch-signup">
                        <div className="signin-no-account">Don't have an account?</div>
                        <a 
                            href="" 
                            onClick={e => {
                                e.preventDefault();
                                navigate('/org/signup');
                            }}
                        >
                            Sign up
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default SignIn;