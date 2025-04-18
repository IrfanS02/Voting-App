// import React,{useEffect, useState} from 'react'
// import { Link, NavLink } from 'react-router-dom'
// import {IoIosMoon} from 'react-icons/io';
// import {HiOutlineBars3} from 'react-icons/hi2';
// import {AiOutlineClose} from 'react-icons/ai';
// import { IoMdSunny } from 'react-icons/io';


// const Navbar = () => {
//     const [showNav, setShowNav] = useState(window.innerWidth < 600 ? false : true);
//     const [darkTheme, setDarkTheme] = useState(localStorage.getItem
//         ('voting-app-theme') || ""
//     );
//     //function to close nav menu on small screen when menu link is clicked


//     const closeNavMenu = () => {
//         if(window.innerWidth < 600){
//             setShowNav(false);
//         }else{
//             setShowNav(true);
//         }
//     }

// // function to change/toggle theme
//     const changeThemeHandler = () =>{
//         if(localStorage.getItem('voting-app-theme') == 'dark'){
//             localStorage.setItem('voting-app-theme', '')
//         }else{
//             localStorage.setItem('voting-app-theme', 'dark')
//         }
//         setDarkTheme(localStorage.getItem('voting-app-theme'))
//     }

//     useEffect(() => {
//         document.body.className = localStorage.getItem('voting-app-theme');
//     },[darkTheme])


//   return (
//    <nav>
//     <div className="container nav_container">
//         <Link to ="/" className="nav_logo"> eVote </Link>
//     <div>
//     {showNav && <menu>
//         <NavLink to="/elections" onClick={closeNavMenu}>Elections</NavLink>
//         <NavLink to="/results" onClick={closeNavMenu}>Results</NavLink>
//         <NavLink to="/logout" onClick={closeNavMenu}>Logout</NavLink>
//     </menu>}
//    <button className="theme_toggle_btn" onClick={changeThemeHandler}>{darkTheme ? <IoMdSunny /> : 
//    <IoIosMoon />}</button>
//    <button className="theme_toggle-btn" onClick={() => setShowNav(!showNav)}>
//     {showNav ? <AiOutlineClose /> : <HiOutlineBars3 />}</button>
//    </div>
//    </div>
//    </nav>
   
//   )
// }

// export default Navbar
import React, { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { IoIosMoon } from 'react-icons/io'
import { HiOutlineBars3 } from 'react-icons/hi2'
import { AiOutlineClose } from 'react-icons/ai'
import { IoMdSunny } from 'react-icons/io'
import { useSelector } from 'react-redux'


const Navbar = () => {
    const [showNav, setShowNav] = useState(window.innerWidth < 600 ? false : true)
    const [darkTheme, setDarkTheme] = useState(localStorage.getItem('voting-app-theme') || "")
    const token = useSelector(state => state?.vote?.currentVoter?.token)
    // Function to close nav menu on small screen when menu link is clicked
    const closeNavMenu = () => {
        if(window.innerWidth < 600){
            setShowNav(false)
        } else {
            setShowNav(true)
        }
    }

    // Function to change/toggle theme
    const changeThemeHandler = () => {
        if(localStorage.getItem('voting-app-theme') == 'dark'){
            localStorage.setItem('voting-app-theme', '')
        } else {
            localStorage.setItem('voting-app-theme', 'dark')
        }
        setDarkTheme(localStorage.getItem('voting-app-theme'))
    }

    useEffect(() => {
        document.body.className = localStorage.getItem('voting-app-theme')
    }, [darkTheme])

    return (
        <nav>
            <div className="container nav_container">
                <Link to="/" className="nav_logo">eVote</Link>
                <div className="nav_menu_container">
                     {token && showNav && (
                        <menu>
                            <NavLink to="/elections" onClick={closeNavMenu}>Elections</NavLink>
                            <NavLink to="/results" onClick={closeNavMenu}>Results</NavLink>
                            <NavLink to="/logout" onClick={closeNavMenu}>Logout</NavLink>
                        </menu>
                    )}
                    <div className="nav_buttons">
                        <button className="theme_toggle_btn" onClick={changeThemeHandler}>
                            {darkTheme ? <IoMdSunny /> : <IoIosMoon />}
                        </button>
                        <button className="nav_toggle_btn" onClick={() => setShowNav(!showNav)}>
                            {showNav ? <AiOutlineClose /> : <HiOutlineBars3 />}
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar