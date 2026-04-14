import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, User, LogOut, Menu, X } from 'lucide-react'; 
import styles from './Navbar.module.css';
import logo from '../assets/logo.png';

import mockData from '../mock_data.json';

function Navbar() {
  const [showNotifications, setShowNotifications] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  // Simulando usuário logado (João Silva)
  const USUARIO_LOGADO_ID = 1;
  const notificacoes = mockData.notificacoes.filter(n => n.ntf_usuario_id === USUARIO_LOGADO_ID);
  const temNotificacoesNaoLidas = notificacoes.some(n => !n.ntf_lida);

  const handleLogout = () => navigate('/login');

  const handleNotificationClick = (targetId) => {
    setShowNotifications(false);
    navigate(`/propostas/${targetId}`);
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.logoArea}>
        <Link to="/">
          <img src={logo} alt="Logo" className={styles.logo} />
        </Link>
      </div>

      <div className={`${styles.links} ${mobileMenuOpen ? styles.linksOpen : ''}`}>
        <Link to="/" className={styles.navLink} onClick={() => setMobileMenuOpen(false)}>Home</Link>
        <Link to="/ideias" className={styles.navLink} onClick={() => setMobileMenuOpen(false)}>Ideias</Link>
        <Link to="/minhas-ideias" className={styles.navLink} onClick={() => setMobileMenuOpen(false)}>Minhas Ideias</Link>
        <Link to="/perfil" className={`${styles.navLink} ${styles.mobileOnly}`} onClick={() => setMobileMenuOpen(false)}>Meu Perfil</Link>
      </div>
      
      <div className={styles.actions}>
        {/* Ícone de Notificação Mantido */}
        <div className={styles.iconWrapper}>
          <button 
            onClick={() => setShowNotifications(!showNotifications)} 
            className={styles.iconButton}
          >
            <Bell size={22} />
            {temNotificacoesNaoLidas && <span className={styles.badge} />}
          </button>
          
          <AnimatePresence>
            {showNotifications && (
              <motion.div 
                className={styles.popup}
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
              >
                <div className={styles.popupHeader}>
                  <h4>Notificações</h4>
                </div>
                <div className={styles.notificationList}>
                  {notificacoes.length > 0 ? (
                    notificacoes.map(n => (
                      <div 
                        key={n.ntf_id} 
                        className={styles.notificationItem}
                        onClick={() => handleNotificationClick(n.target_id)}
                      >
                        <p className={styles.ntfMessage}>{n.ntf_mensagem}</p>
                        <span className={styles.ntfDate}>
                          {new Date(n.ntf_create_date).toLocaleDateString('pt-BR')}
                        </span>
                      </div>
                    ))
                  ) : (
                    <div className={styles.emptyState}>
                      <p>Você não tem novas notificações no momento.</p>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <Link to="/perfil" className={`${styles.iconButton} ${styles.desktopOnly}`}>
          <User size={22} />
        </Link>

        <button onClick={handleLogout} className={`${styles.logoutButton} ${styles.desktopOnly}`}>
          <LogOut size={20} />
          <span>Sair</span>
        </button>

        <button className={styles.menuMobile} onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>
    </nav>
  );
}

export default Navbar;