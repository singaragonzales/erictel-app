import React, { useState, useContext, useEffect } from 'react'
import './style.scss'
import ProfileImage from '../../assets/profile.png'
import {GrLogout} from 'react-icons/gr'
import {FaUser} from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../Login/AuthContext'

function Navbar() {

    const navigate = useNavigate()
    const { logout } = useContext(AuthContext);

    const [showToggle, setShowToggle] = useState<boolean>(true);
    const [user, setUser] = useState<any>(JSON.parse(localStorage.getItem("user") || ""));

    window.addEventListener('click', function(e: Event){
        const subMenuWrap = document.querySelector("#subMenuWrap");
        const target = e.target as HTMLButtonElement;
        if (subMenuWrap?.contains(target)){
            setShowToggle(!showToggle)
        } else{
            setShowToggle(true)
        }
    });

    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem("user") || ""))
        console.log(JSON.parse(localStorage.getItem("user") || ""))
    }, [])

    const handleLogout = () => {
        logout();
    };

    const truncateString = (str: any, num: number = 20) => {
        if (str.length > num) {
          return str.slice(0, num) + "...";
        } else {
          return str;
        }
      };

    return (
        <div className='hero'>
            <nav>
                <div className='menuVar'>
                    <p className='title' onClick={() => navigate('/home')}>{'Erictel APP '}</p>
                </div>
                <div id="subMenuWrap">
                    <img src={user.profile !== "" ? user.profile : ProfileImage} alt="logo" className='user-pic'/>
                    <p className='title' title={user.name}>{truncateString(user.name)}</p>
                </div>
                <div className={`sub-menu-wrap ${!showToggle ? 'open-menu' : ''}`}>
                    <div className="sub-menu">
                        <a href="" className='sub-menu-link'
                            onClick={() => {
                                navigate("/profile", {state: {id: user.id}})
                            }}
                        >
                            <div className="sub-menu-icon">
                                <FaUser/>
                            </div>
                            
                            <p>Edit Profile</p>
                            <span>{'>'}</span>
                        </a>
                        <a href="" className='sub-menu-link'
                            onClick={() => {
                                handleLogout()
                            }}
                        >
                            <div className="sub-menu-icon">
                                <GrLogout/>
                            </div>
                            <p>Logout</p>
                            <span>{'>'}</span>
                        </a>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar