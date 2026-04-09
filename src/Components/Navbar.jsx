import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const [showNotifications, setShowNotifications] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/login');
  };

  const navStyle = {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: '15px 10px',
    borderBottom: '2px solid #000',
    backgroundColor: '#fff',
    marginBottom: '20px'
  };

  const linkStyle = {
    textDecoration: 'none',
    color: '#000', // Preto puro
    padding: '8px 15px',
    fontWeight: 'bold',
    fontSize: '16px'
  };

  const buttonStyle = {
    background: '#fff',
    border: '2px solid #000',
    color: '#000',
    cursor: 'pointer',
    padding: '8px 15px',
    fontWeight: 'bold',
    fontSize: '14px'
  };

  const logoutButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#000',
    color: '#fff'
  };

  const popupStyle = {
    position: 'absolute',
    top: '60px',
    right: '50px',
    width: '280px',
    backgroundColor: '#fff',
    border: '2px solid #000',
    padding: '15px',
    zIndex: 1000,
    boxShadow: '4px 4px 0px rgba(0,0,0,1)' // Sombra sólida estilo neobrutalismo
  };

  return (
    <nav style={navStyle}>
      <Link to="/" style={linkStyle}>Home</Link>
      <Link to="/ideias" style={linkStyle}>Ideias</Link>
      <Link to="/minhas-ideias" style={linkStyle}>Minhas Ideias</Link>
      
      <div style={{ position: 'relative' }}>
        <button 
          onClick={() => setShowNotifications(!showNotifications)} 
          style={buttonStyle}
        >
          Notificações
        </button>
        {showNotifications && (
          <div style={popupStyle}>
            <h4 style={{ margin: '0 0 10px 0', color: '#000', borderBottom: '1px solid #000' }}>Notificações</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              <li style={{ padding: '8px 0', color: '#000', fontSize: '14px' }}>Nenhuma notificação nova.</li>
            </ul>
            <button 
              onClick={() => setShowNotifications(false)} 
              style={{ ...buttonStyle, marginTop: '10px', width: '100%', backgroundColor: '#000', color: '#fff' }}
            >
              Fechar
            </button>
          </div>
        )}
      </div>

      <Link to="/perfil" style={linkStyle}>Perfil</Link>
      <button onClick={handleLogout} style={logoutButtonStyle}>Sair</button>
    </nav>
  );
}

export default Navbar;
