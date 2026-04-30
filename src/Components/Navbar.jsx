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
  const [propostasNtf, setPropostasNtf]           = useState([]);
  const navigate = useNavigate();

  const getToken = () => localStorage.getItem('token');

  const fetchTudo = useCallback(async () => {
    const token = getToken();
    if (!token) return;

    // Busca notificações reais e propostas em paralelo
    const [resNtf, resPrp] = await Promise.allSettled([
      fetch('/api/notificacoes/minhas', { headers: { Authorization: `Bearer ${token}` } }),
      fetch('/api/propostas/minhas',    { headers: { Authorization: `Bearer ${token}` } }),
    ]);

    if (resNtf.status === 'fulfilled' && resNtf.value.ok) {
      setNotificacoes(await resNtf.value.json());
    }

    if (resPrp.status === 'fulfilled' && resPrp.value.ok) {
      const propostas = await resPrp.value.json();
      // Transforma propostas pendentes em itens de notificação
      const pendentes = propostas
        .filter(p => p.prpStatus && p.infos?.at(-1)?.aceiteNome === 'pendente')
        .map(p => ({
          _tipo: 'proposta',
          ntfId: `prp-${p.prpId}`,
          prpIdeiaId: p.prpIdeiaId,
          mensagem: `Sua proposta para a ideia #${p.prpIdeiaId} está aguardando resposta.`,
          lida: false,
          createDate: p.infos?.at(-1)?.createDate,
        }));
      setPropostasNtf(pendentes);
    }
  }, []);

  useEffect(() => {
    fetchTudo();
    const interval = setInterval(fetchTudo, 30000);
    return () => clearInterval(interval);
  }, [fetchTudo]);

  // Lista unificada: notificações reais + propostas pendentes
  const todasNtf = [
    ...notificacoes.map(n => ({ ...n, _tipo: 'notificacao' })),
    ...propostasNtf,
  ];

  const temNaoLidas = todasNtf.some(n => !n.lida);

  const handleNotificationClick = async (notificacao) => {
    const token = getToken();

    if (notificacao._tipo === 'proposta') {
      // Navega direto para a ideia correspondente
      setShowNotifications(false);
      navigate(`/ideia/${notificacao.prpIdeiaId}`);
      return;
    }

    try {
      if (notificacao.ntfId) {
        const toastId = toast.loading('Marcando como lida...');
        const res = await fetch(`/api/notificacoes/${notificacao.ntfId}/lida`, {
          method: 'POST',
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.ok) {
          setNotificacoes(prev =>
            prev.map(n => n.ntfId === notificacao.ntfId ? { ...n, lida: true } : n)
          );
          toast.success('Notificação marcada como lida.', { id: toastId });
        } else {
          toast.error('Não foi possível marcar como lida.', { id: toastId });
        }
      }
    } catch {
      toast.error('Erro de conexão.');
    }

    setShowNotifications(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className={styles.navbar}>
      <Toaster position="top-right" />

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

                {todasNtf.length === 0 ? (
                  <p className={styles.emptyState}>Você não tem novas notificações no momento.</p>
                ) : (
                  <ul className={styles.notificationList}>
                    {todasNtf.map((n) => (
                        <li
                          key={n.ntfId}
                          className={styles.notificationItem}
                          style={{ background: !n.lida ? '#f0f7ff' : undefined, cursor: 'pointer' }}
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
