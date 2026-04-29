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

  const getUserId = () => {
    try {
      const payload = JSON.parse(atob(getToken().split('.')[1]));
      return (
        payload['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'] ||
        payload['sub'] ||
        payload['nameid']
      );
    } catch { return null; }
  };

  const fetchNotificacoes = useCallback(async () => {
    const token = getToken();
    if (!token) return;
    try {
      const response = await fetch('/api/notificacoes', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.ok) {
        const data = await response.json();
        const userId = getUserId();
        const minhas = data.filter(n =>
          String(n.ntfUsuarioId ?? n.usuarioId ?? n.ntf_usuario_id) === String(userId)
        );
        setNotificacoes(minhas);
      }
    } catch {}
  }, []);

  useEffect(() => {
    fetchNotificacoes();
    const interval = setInterval(fetchNotificacoes, 30000);
    return () => clearInterval(interval);
  }, [fetchNotificacoes]);

  const temNaoLidas = notificacoes.some(n => !(n.ntfLida ?? n.ntf_lida ?? false));

  const handleNotificationClick = async (notificacao) => {
    const token = getToken();
    try {
      const ntfId = notificacao.ntfId ?? notificacao.id ?? notificacao.ntf_id;
      if (ntfId) {
        await fetch(`/api/notificacoes/${ntfId}/lida`, {
          method: 'PUT',
          headers: { Authorization: `Bearer ${token}` },
        });
        setNotificacoes(prev =>
          prev.map(n => (n.ntfId ?? n.id) === ntfId ? { ...n, ntfLida: true } : n)
        );
      }
    } catch {}

    setShowNotifications(false);
    const ideiaId = notificacao.ntfIdeiaId ?? notificacao.ideiaId ?? notificacao.target_id;
    if (ideiaId) navigate(`/propostas/${ideiaId}`);
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
                    {notificacoes.map((n, i) => {
                      const ntfId = n.ntfId ?? n.id ?? i;
                      const lida  = n.ntfLida ?? n.ntf_lida ?? false;
                      const msg   = n.ntfMensagem ?? n.mensagem ?? n.ntf_mensagem ?? 'Nova notificação';
                      const data  = n.ntfCreateDate ?? n.createDate ?? n.ntf_create_date;
                      return (
                        <li
                          key={ntfId}
                          className={styles.notificationItem}
                          style={{ background: !lida ? '#f0f7ff' : undefined }}
                          onClick={() => handleNotificationClick(n)}
                        >
                          <p className={styles.ntfMessage}>{msg}</p>
                          {data && (
                            <span className={styles.ntfDate}>
                              {new Date(data).toLocaleDateString('pt-BR')}
                            </span>
                          )}
                        </li>
                      );
                    })}
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
