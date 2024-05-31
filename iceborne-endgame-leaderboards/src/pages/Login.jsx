import { useState } from "react";
import Header from "../components/Header";
import "./Login.css"

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isSignUpActive, setIsSignUpActive] = useState(false);
    const handleMethodChange = () => {
        setIsSignUpActive(!isSignUpActive);
    }

    const handleSignUp = () => {
        if (!email || !password) console.log("a");
    }

    const handleSignIn = () => {
        if (!email || !password) console.log("a");
    }

    const handleEmailChange = (event) => setEmail(event.target.value);
    const handlePasswordChange = (event) => setPassword(event.target.value);

    return (
        <>
        <Header></Header>
        <form>
            {isSignUpActive && <h1 className="title">Sign Up</h1>}
            {!isSignUpActive && <h1 className="title">Login</h1>}
            
            <div className="input">
                <input type="text" placeholder="E-mail address" onChange={handleEmailChange}/> 
                <input type="password" placeholder="Password" onChange={handlePasswordChange}/>
                <div className="input-flex">
                    {isSignUpActive && <button type="button" onClick={handleSignUp}>Sign Up</button>}
                    {!isSignUpActive && <button type="button" onClick={handleSignIn}>Sign In</button>}
                    
                    {isSignUpActive && <a onClick={handleMethodChange}>Already have an account?</a>}
                    {!isSignUpActive && <a onClick={handleMethodChange}>Create an account</a>}
                    
                </div>
            </div>
            
        </form>
        </>
    )
}

export default Login;