import { signOut } from 'firebase/auth';
import './Header.css'
import { Link } from "react-router-dom"
import { auth } from '../firebase';

const Header = ({user}) => {
    if (!user) {
        console.log("a")
    }
    else{
        console.log(user);
    }

    const handleSignOut = () => {
        signOut(auth).then(() => console.log("Signed Out")).catch((error)=>console.log(error));
    }

    return (
        <>
            <div className='header'>
                <div className='header-left'>
                    <h1>MHW Iceborne Endgame Leaderboards</h1>
                    <Link to="/quests"><h2>Quests</h2></Link>
                    <h2>Rules</h2>
                    <h2>Submit</h2>
                </div>
                <div className='header-right'>
                    {!user && <Link to="/login"><h2>Login</h2></Link>}
                    {user && <a onClick={handleSignOut}>Log out</a>}
                </div>
            </div>
            
        </>
    )
}

export default Header;