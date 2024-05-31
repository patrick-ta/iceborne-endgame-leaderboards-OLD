import './Header.css'
import { Link } from "react-router-dom"

function Header() {
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
                    <Link to="/login"><h2>Login</h2></Link>
                </div>
            </div>
            
        </>
    )
}

export default Header;