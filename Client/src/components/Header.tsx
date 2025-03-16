
import {  NavLink } from 'react-router'

const Header = () => {
  
    return (
        <div>
            <nav style={{ display: "flex", position: "fixed", top: "0px", right: "0px", left: "0px", width: "100vw",height:"10vh", backgroundColor: "white", justifyContent: "space-around",borderBottom: "2px solid black"}}>
                <div>
                    <NavLink to='/' style={{ color:'black'}}  >Home Page</NavLink>
                    <NavLink to='/HomeStudent' style={{ color:'black'}}  >Home Student</NavLink>
                </div>
            </nav>
        </div>
    )
}

export default Header

