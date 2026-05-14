import React, { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, User, LogOut, Menu, X } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import styles from './Navbar.module.css';
import logo from '../assets/logo.png';

function Navbar() {
  const [showNotifications, setShowNotifications] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen]       = useState(false);
  const [notificacoes, setNotificacoes]           = useState([]);
  const navigate = useNavigate();

  // BLOQUEIO DE SCROLL: Impede o fundo de rolar quando o menu mobile está aberto
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [mobileMenuOpen]);

  const getToken = () => localStorage.getItem('token');

  // SUA LÓGICA ORIGINAL DE FETCH (SEM ALTERAÇÕES)
  const fetchTudo = useCallback(async () => {
    const token = getToken();
    if (!token) return;

    const resNtf = await fetch('/api/notificacoes/minhas', { headers: { Authorization: `Bearer ${token}` } });

    if (resNtf.ok) {
      const raw = await resNtf.json();
      const normalizado = raw.map(n => ({
        ntfId:      n.NtfId      ?? n.ntfId,
        tipoId:     n.TipoId     ?? n.tipoId,
        tipoNome:   n.TipoNome   ?? n.tipoNome,
        mensagem:   n.Mensagem   ?? n.mensagem   ?? '(sem mensagem)',
        lida:       n.Lida       ?? n.lida        ?? false,
        createDate: n.CreateDate ?? n.createDate,
      }));
      setNotificacoes(normalizado);
    }
  }, []);

  useEffect(() => {
    fetchTudo();
    const interval = setInterval(fetchTudo, 30000);
    return () => clearInterval(interval);
  }, [fetchTudo]);

  const todasNtf = notificacoes;
  const temNaoLidas = notificacoes.some(n => !n.lida);

  // SUA LÓGICA ORIGINAL DE CLIQUE (RESTABELECIDA)
  const handleNotificationClick = async (notificacao) => {
    const token = getToken();
    setShowNotifications(false);

    try {
      if (notificacao.ntfId) {
        fetch(`/api/notificacoes/${notificacao.ntfId}/lida`, {
          method: 'POST',
          headers: { Authorization: `Bearer ${token}` },
        }).then(res => {
          if (res.ok) {
            setNotificacoes(prev =>
              prev.map(n => n.ntfId === notificacao.ntfId ? { ...n, lida: true } : n)
            );
          }
        });
      }

      const tipoNome = (notificacao.tipoNome ?? '').toLowerCase();

      if (tipoNome.startsWith('prp ') && tipoNome !== 'prp recebida') {
        navigate('/minhas-propostas');
        return;
      }

      const ideiaId = (notificacao.mensagem ?? '').match(/ideia\s*#(\d+)/i)?.[1];
      if (!ideiaId) {
        toast.error('Não foi possível identificar a ideia desta notificação.');
        return;
      }

      navigate(`/responder-proposta/${ideiaId}`);
    } catch {
      toast.error('Erro de conexão.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const navLinks = [
    { to: '/dashboard',      label: 'Home'            },
    { to: '/ideias',         label: 'Ideias'          },
    { to: '/minhas-ideias',  label: 'Minhas Ideias'   },
    { to: '/minhas-propostas', label: 'Minhas Propostas' },
    { to: '/perfil',         label: 'Meu Perfil'      },
  ];

  return (
    <nav className={styles.navbar}>
      <Toaster position="top-right" />

      <Link to="/dashboard">
        <img src={logo} alt="Logo" className={styles.logo} />
      </Link>

      {/* Menu desktop */}
      <div className={`${styles.links} ${styles.desktopOnly}`}>
        {navLinks.map(link => (
          <Link key={link.to} to={link.to} className={styles.navLink}>
            {link.label}
          </Link>
        ))}
      </div>

      <div className={styles.actions}>
        <div className={styles.iconWrapper}>
          <button
            className={styles.iconButton}
            onClick={() => setShowNotifications(!showNotifications)}
          >
            <Bell size={22} />
            {temNaoLidas && <span className={styles.badge} />}
          </button>

          <AnimatePresence>
            {showNotifications && (
              <motion.div
                className={styles.popup}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{    opacity: 0, y: -8 }}
              >
                <div className={styles.popupHeader}>
                  <h4>Notificações</h4>
                </div>

                {todasNtf.length === 0 ? (
                  <p className={styles.emptyState}>Você não tem novas notificações no momento.</p>
                ) : (
                  <ul className={styles.notificationList}>
                    {todasNtf.map(n => (
                      <li
                        key={n.ntfId}
                        className={styles.notificationItem}
                        style={{ 
                          background: !n.lida ? '#f0f7ff' : undefined, 
                          cursor: 'pointer' 
                        }}
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

        <Link to="/perfil" className={`${styles.iconButton} ${styles.desktopOnly}`}>
          <User size={22} />
        </Link>

        <button className={`${styles.logoutButton} ${styles.desktopOnly}`} onClick={handleLogout}>
          <LogOut size={18} /> Sair
        </button>

        <button className={styles.menuMobile} onClick={() => setMobileMenuOpen(true)}>
          <Menu size={26} />
        </button>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div 
              className={styles.overlay}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
            />
            
            <motion.div
              className={`${styles.links} ${styles.mobileOnly}`}
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{    x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
            >
              <div className={styles.mobileHeader}>
                <button className={styles.closeButton} onClick={() => setMobileMenuOpen(false)}>
                  <X size={28} />
                </button>
              </div>

              <div className={styles.mobileNav}>
                {navLinks.map(link => (
                  <Link
                    key={link.to}
                    to={link.to}
                    className={styles.navLink}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
                <hr className={styles.divider} />
                <button className={styles.mobileLogout} onClick={handleLogout}>
                  <LogOut size={20} /> Sair da conta
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}

export default Navbar;
