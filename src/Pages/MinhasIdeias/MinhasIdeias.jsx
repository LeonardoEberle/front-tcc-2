import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Briefcase, Rocket } from 'lucide-react';
import IdeiaCard from '../../Components/IdeiaCard/IdeiaCard';
import styles from './MinhasIdeias.module.css';

function MinhasIdeias() {
  const [minhasIdeias, setMinhasIdeias] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchIdeias = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setLoading(false);
        return;
      }

      // Extrai o id do usuário direto do token JWT (padrão ASP.NET)
      let userId;
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        userId = payload["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];
      } catch {
        setLoading(false);
        return;
      }

      try {
        // Busca todas as ideias e filtra pelo usuário logado
        const response = await fetch('/api/ideias', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          // Filtra somente as ideias do usuário logado
          const minhas = data.filter(
            (ideia) => String(ideia.idaUsuarioId) === String(userId)
          );
          setMinhasIdeias(minhas);
        }
      } catch (error) {
        console.error('Erro ao buscar ideias:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchIdeias();
  }, []);

  return (
    <div className={styles.page}>
      <div className={styles.blob} />
      <div className={styles.container}>

        {/* Header */}
        <div className={styles.header}>
          <div>
            <div className={styles.titleWithIcon}>
              <Briefcase size={32} className={styles.headerIcon} />
              <div className={styles.headerText}>
                <h1>Minhas Ideias</h1>
              </div>
            </div>
            <p className={styles.subtitle}>Gerencie e acompanhe seus pitches publicados</p>
          </div>
          <button className={styles.btnNew} onClick={() => navigate('/criar-ideia')}>
            <Plus size={20} /> Nova Ideia
          </button>
        </div>

        {/* Conteúdo */}
        {loading ? (
          <div className={styles.emptyState}>
            <p style={{ color: '#64748b' }}>Carregando suas ideias...</p>
          </div>
        ) : minhasIdeias.length === 0 ? (
          <div className={styles.emptyState}>
            <Rocket size={48} className={styles.emptyIcon} />
            <h3 style={{ color: '#1e293b', margin: '0 0 8px' }}>Nenhuma ideia ainda</h3>
            <p style={{ color: '#64748b', marginBottom: '24px' }}>
              Sua próxima grande ideia começa aqui. Publique seu primeiro pitch!
            </p>
            <button className={styles.btnNew} onClick={() => navigate('/criar-ideia')}>
              <Plus size={18} /> Criar minha primeira ideia
            </button>
          </div>
        ) : (
          <div className={styles.grid}>
            {minhasIdeias.map((ideia) => (
              <IdeiaCard key={ideia.idaId || ideia.id} ideia={ideia} />
            ))}
          </div>
        )}

      </div>
    </div>
  );
}

export default MinhasIdeias;
