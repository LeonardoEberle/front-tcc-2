import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const [showNotifications, setShowNotifications] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    // Por enquanto apenas redireciona
    navigate('/login');
  };

  const navStyle = {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: '10px',
    borderBottom: '1px solid black',
    backgroundColor: '#fff',
    marginBottom: '20px'
  };

  const linkStyle = {
    textDecoration: 'none',
    color: 'black',
    padding: '5px 10px',
    border: '1px solid transparent'
  };

  const buttonStyle = {
    background: 'none',
    border: '1px solid black',
    cursor: 'pointer',
    padding: '5px 10px'
  };

  const popupStyle = {
    position: 'absolute',
    top: '50px',
    right: '100px',
    width: '250px',
    backgroundColor: 'white',
    border: '1px solid black',
    padding: '10px',
    zIndex: 1000,
    boxShadow: '2px 2px 5px rgba(0,0,0,0.2)'
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
            <h4>Notificações</h4>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li style={{ borderBottom: '1px solid #eee', padding: '5px 0' }}>Nenhuma notificação nova.</li>
            </ul>
            <button onClick={() => setShowNotifications(false)} style={{ ...buttonStyle, marginTop: '10px', width: '100%' }}>Fechar</button>
          </div>
        )}
      </div>

      <Link to="/perfil" style={linkStyle}>Perfil</Link>
      <button onClick={handleLogout} style={buttonStyle}>Sair</button>
    </nav>
  );
}

export default Navbar;
