import './Sidebar.css'
import logo from '../assets/images/runergy_icon.png'
import { FaBars } from 'react-icons/fa';
import { useState } from 'react';



export default function SideBar(){

  const [menu, setMenu] = useState(true);

  return(
    <>
      <aside className = {`aside-SideBar ${menu ? 'open': 'closed'}`}>
        <nav className = 'nav-SideBar'>
          <div className = 'nav-top-container'>
            <img className = 'nav-logo' src= {logo} alt="Logo Picture"/>
            <FaBars className = 'nav-logo-hamburger' size={24} onClick = {() => {setMenu(!menu)}}/>
          </div>
        </nav>
      </aside> 
      
      
    </>
  );
}