import React, { useEffect } from 'react';
import Link from 'next/link';
import './header.css';
import { useContext } from 'react';
import ThemeContext from '@/context/context';
import { fetchUserInfo } from '@/api';
function Header() {

  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  const { theme, connected, toggleTheme, setConnected } = context;

  useEffect(() => {


    const containerFetchUserInfo = async function () {
      try {
        const user = await fetchUserInfo()
        if (user) {
          setConnected(true)
        }
      } catch (error) {

      }
    }
    containerFetchUserInfo()
  })
  return (
    <div className="text-4xl font-extralight text-white drop-shadow-md leading-10 containerHeader">
      <Link href="/">
        <img className="imgLogo" src="/logo_ouivisible.svg" alt="Logo" />
      </Link>
      <div className={`my-component ${theme}`}>
        {/* Contenu du composant */}
        <button onClick={toggleTheme}>Changer de thème</button>
      </div>
      {connected ?
        <Link href="/account">
          <div className="accountContainer">
            <img src="/img/account.svg" alt="Account" className="iconLogin" />
            <div className='loginText'>Mon compte</div>
          </div>
        </Link>
        :
        <Link href="/register">
        <div className="accountContainer">
          <img src="/img/account.svg" alt="Account" className="iconLogin" />
          <div className='loginText'>Se connecter</div>
        </div>
      </Link>
      }
    </div>
  );
}

export default Header;
