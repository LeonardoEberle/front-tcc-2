import React, { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, User, LogOut, Menu, X } from 'lucide-react';
import styles from './Navbar.module.css';
import logo from '../assets/logo.png';

function Navbar() {
  const [showNotifications, setShowNotifications] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen]       = useState(false);
  const [notificacoes, setNotificacoes]           = useState([]);
  const navigate = useNavigate();

  const getToken = () => localStorage.getItem('token');

  const fetchNotificacoes = useCallback(async () => {
    const token = getToken();
    if (!token) return;
    try {
      const response = await fetch('/api/notificacoes/minhas', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.ok) {
        const data = await response.json();
        setNotificacoes(data);
      }
    } catch {}
  }, []);

  useEffect(() => {
    fetchNotificacoes();
    const interval = setInterval(fetchNotificacoes, 30000);
    return () => clearInterval(interval);
  }, [fetchNotificacoes]);

  const temNaoLidas = notificacoes.some(n => !n.lida);

  const handleNotificationClick = async (notificacao) => {
    const token = getToken();
    try {
      if (notificacao.ntfId) {
        await fetch(`/api/notificacoes/${notificacao.ntfId}/lida`, {
          method: 'POST',
          headers: { Authorization: `Bearer ${token}` },
        });
        setNotificacoes(prev =>
          prev.map(n => n.ntfId === notificacao.ntfId ? { ...n, lida: true } : n)
        );
      }
    } catch {}

    setShowNotifications(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className={styles.navbar}>

      {/* Logo */}
      <Link to="/">
        <img src={logo} alt="Logo" className={styles.logo} />
      </Link>

      {/* Links desktop */}
      <div className={`${styles.links} ${mobileMenuOpen ? styles.linksOpen : ''} ${styles.desktopOnly}`}>
        <Link to="/"              className={styles.navLink} onClick={() => setMobileMenuOpen(false)}>Home</Link>
        <Link to="/ideias"        className={styles.navLink} onClick={() => setMobileMenuOpen(false)}>Ideias</Link>
        <Link to="/minhas-ideias" className={styles.navLink} onClick={() => setMobileMenuOpen(false)}>Minhas Ideias</Link>
        <Link to="/perfil"        className={styles.navLink} onClick={() => setMobileMenuOpen(false)}>Meu Perfil</Link>
      </div>

      {/* Ações */}
      <div className={styles.actions}>

        {/* Sino de notificações */}
        <div className={styles.iconWrapper}>
          <button
            className={styles.iconButton}
            onClick={() => setShowNotifications(!showNotifications)}
            aria-label="Notificações"
          >
            <Bell size={22} />
            {temNaoLidas && <span className={styles.badge} />}
          </button>

          <AnimatePresence>
            {showNotifications && (
              <motion.div
                className={styles.popup}
                initial={{ opacity: 0, y: -8, scale: 0.97 }}
                animate={{ opacity: 1, y: 0,  scale: 1    }}
                exit={{    opacity: 0, y: -8, scale: 0.97 }}
                transition={{ duration: 0.18 }}
              >
                <div className={styles.popupHeader}>
                  <h4>Notificações</h4>
                </div>

                {notificacoes.length === 0 ? (
                  <p className={styles.emptyState}>Você não tem novas notificações no momento.</p>
                ) : (
                  <ul className={styles.notificationList}>
                    {notificacoes.map((n) => (
                        <li
                          key={n.ntfId}
                          className={styles.notificationItem}
                          style={{ background: !n.lida ? '#f0f7ff' : undefined }}
                          onClick={() => handleNotificationClick(n)}
                        >
                          <p className={styles.ntfMessage}>{n.mensagem}</p>
                          {n.createDate && (
                            <span className={styles.ntfDate}>
                              {new Date(n.createDate).toLocaleDateString('pt-BR')}
                            </span>
                          )}
                        </li>
                      ))}
                  </ul>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Perfil */}
        <Link to="/perfil" className={styles.iconButton} aria-label="Perfil">
          <User size={22} />
        </Link>

        {/* Logout */}
        <button className={styles.logoutButton} onClick={handleLogout}>
          <LogOut size={18} />
          Sair
        </button>

        {/* Hamburguer mobile */}
        <button
          className={styles.menuMobile}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Menu mobile */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className={`${styles.links} ${styles.mobileOnly}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{    opacity: 0 }}
          >
            <Link to="/"              className={styles.navLink} onClick={() => setMobileMenuOpen(false)}>Home</Link>
            <Link to="/ideias"        className={styles.navLink} onClick={() => setMobileMenuOpen(false)}>Ideias</Link>
            <Link to="/minhas-ideias" className={styles.navLink} onClick={() => setMobileMenuOpen(false)}>Minhas Ideias</Link>
            <Link to="/perfil"        className={styles.navLink} onClick={() => setMobileMenuOpen(false)}>Meu Perfil</Link>
          </motion.div>
        )}
      </AnimatePresence>

    </nav>
  );
}

export default Navbar;
