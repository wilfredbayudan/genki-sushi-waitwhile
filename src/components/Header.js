import React from 'react';
import GenkiLogo from '../assets/images/logo.png';

function Header () {
  return (
    <header>
      <a href="https://www.genkisushiusa.com"><img src={GenkiLogo} alt="Genki Sushi Waitlist" id="logo" /></a>
    </header>
  )
}

export default Header;