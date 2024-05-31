import { useState } from "react";
import Header from "../components/Header";
import "./Login.css"

function Login() {
    const [isSignUpActive, setIsSignUpActive] = useState(false);
    const handleMethodChange = () => {
        setIsSignUpActive(!isSignUpActive);
    }

    return (
        <>
        <Header></Header>
        <form>
            {isSignUpActive && <h1 className="title">Sign Up</h1>}
            {!isSignUpActive && <h1 className="title">Login</h1>}
            
            <div className="input">
                <input type="text" placeholder="E-mail address"/> 
                <input type="password" placeholder="Password"/>
                <div className="input-flex">
                    {isSignUpActive && <button type="button">Sign Up</button>}
                    {!isSignUpActive && <button type="button">Sign In</button>}
                    
                    {isSignUpActive && <a onClick={handleMethodChange}>Already have an account?</a>}
                    {!isSignUpActive && <a onClick={handleMethodChange}>Create an account</a>}
                    
                </div>
            </div>
            
        </form>
        </>
    )
}

export default Login;