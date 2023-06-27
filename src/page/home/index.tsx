import React from "react";
import logo from '../../logo.svg';
import './home.css';
import { NavLink } from "react-router-dom";

const Home = () => {
  return (
    <div className="Home">
    <header className="Home-header">
      <img src={logo} className="Home-logo" alt="logo" />
      <p> React  Virtual List </p>
      <NavLink 
        to="/fixed"    
        style={({ isActive, isPending }) => {
          return {
            fontWeight: isActive ? "bold" : "",
            color: isPending ? "red" : "white",
          };
        }}> 
        Fixed（固定高估） 
      </NavLink>
    
      <NavLink 
        to="/variable"    
        style={({ isActive, isPending }) => {
          return {
            fontWeight: isActive ? "bold" : "",
            color: isPending ? "red" : "white",
            marginTop: 30
          };
        }}> 
        Variable（动态高度）
      </NavLink>
    </header>
  </div>
  )
}

export { Home }