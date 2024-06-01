import { useState } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase";
import { addDoc, collection } from "firebase/firestore";
import { Navigate } from "react-router-dom";
import "./Login.css"


const Login = ({user}) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isSignUpActive, setIsSignUpActive] = useState(false);
    const handleMethodChange = () => {
        setIsSignUpActive(!isSignUpActive);
    }

    const handleSignUp = () => {
        if (!username || !password) return;
        const email = username + "@whateverdomain.com"
        createUserWithEmailAndPassword(auth, email, password).then(async (userCredential) => {
            const user = userCredential.user;
            console.log(user);
            await addDoc(collection(db, "users"), {
                uid: user.uid,
                username: username,
                role: "Guest"
            })
        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage)
        })
    }

    const handleSignIn = () => {
        if (!username || !password) return;
        const email = username + "@whateverdomain.com"
        signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
            const user = userCredential.user;
            console.log(user);
        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage)
        })
    }

    if (user) {
        return <Navigate to="/quests"></Navigate>
    }

    const handleUsernameChange = (event) => setUsername(event.target.value);
    const handlePasswordChange = (event) => setPassword(event.target.value);

    return (
        <>
        {/* <Header></Header> */}
        <form>
            {isSignUpActive && <h1 className="title">Sign Up</h1>}
            {!isSignUpActive && <h1 className="title">Login</h1>}
            
            <div className="input">
                <input type="text" placeholder="Username" onChange={handleUsernameChange}/> 
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