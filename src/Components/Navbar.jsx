import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Navbar.module.css';
import logo from '../assets/logo.png'; // Caminho da sua logo

function Navbar() {
  const [showNotifications, setShowNotifications] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.logoArea}>
        <Link to="/">
          <img src={logo} alt="Logo" className={styles.logo} />
        </Link>
      </div>

      <div className={styles.links}>
        <Link to="/" className={styles.navLink}>Home</Link>
        <Link to="/ideias" className={styles.navLink}>Ideias</Link>
        <Link to="/minhas-ideias" className={styles.navLink}>Minhas Ideias</Link>
        <Link to="/perfil" className={styles.navLink}>Meu Perfil</Link>
      </div>
      
      <div className={styles.actions}>
        <div style={{ position: 'relative' }}>
          <button 
            onClick={() => setShowNotifications(!showNotifications)} 
            className={styles.button}
          >
            Notificações
          </button>
          
          {showNotifications && (
            <div className={styles.popup}>
              <h4 style={{ margin: '0 0 10px 0', color: '#0d47a1', borderBottom: '1px solid #eee' }}>
                Notificações
              </h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                <li style={{ padding: '8px 0', color: '#555', fontSize: '14px' }}>
                  Nenhuma notificação nova.
                </li>
              </ul>
            </div>
          )}
        </div>

        <button onClick={handleLogout} className={`${styles.button} styles.logoutBtn`}>
          Sair
        </button>
      </div>
    </nav>
  );
}

export default Navbar;