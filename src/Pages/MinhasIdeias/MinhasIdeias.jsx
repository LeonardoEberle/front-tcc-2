import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Settings, Eye, Briefcase, Rocket, AlertCircle, CheckCircle } from 'lucide-react';
import mockData from '../../mock_data.json';
import noImage from '../../assets/noimage.jpg';
import styles from './MinhasIdeias.module.css';

function MinhasIdeias() {
  const [minhasIdeias, setMinhasIdeias] = useState([]);
  const navigate = useNavigate();
  const USUARIO_LOGADO_ID = 1;

  useEffect(() => {
    const filtradas = mockData.ideias.filter(ideia => ideia.ida_usuario_id === USUARIO_LOGADO_ID);
    setMinhasIdeias(filtradas);
  }, []);

  const getStatusIcon = (status) => {
    if (status === 'Ativo') return <CheckCircle size={14} />;
    return <AlertCircle size={14} />;
  };

  const getImageUrl = (imagePath) => {
    if (imagePath && imagePath.startsWith('http')) return imagePath;
    return noImage;
  };

  return (
    <div className={styles.page}>
      <div className={styles.blob}></div>
      
      <div className={styles.container}>
        <header className={styles.header}>
          <div className={styles.headerText}>
            <div className={styles.titleWithIcon}>
              <Briefcase size={32} className={styles.headerIcon} />
              <h1>Meu Portfólio de Ideias</h1>
            </div>
            <p className={styles.subtitle}>Gerencie seus projetos e acompanhe o interesse de investidores.</p>
          </div>
          
          <button className={styles.btnNew} onClick={() => navigate('/criar-ideia')}>
            <Plus size={20} /> 
            <span>Nova Ideia</span>
          </button>
        </header>

        {minhasIdeias.length === 0 ? (
          <div className={styles.emptyState}>
            <Rocket size={48} className={styles.emptyIcon} />
            <h3>Nenhum projeto ainda</h3>
            <p>Sua próxima grande ideia começa aqui. Publique seu primeiro pitch!</p>
            <button className={styles.btnNewSmall} onClick={() => navigate('/criar-ideia')}>Criar agora</button>
          </div>
        ) : (
          <div className={styles.grid}>
            {minhasIdeias.map((ideia) => (
              <article key={ideia.ida_id} className={styles.card}>
                <div className={styles.imageContainer}>
                  <img src={getImageUrl(ideia.info.ida_info_imagem)} alt={ideia.ida_nome} className={styles.image} />
                  <div className={`${styles.statusBadge} ${ideia.ida_status_nome === 'Ativo' ? styles.statusAtivo : styles.statusPendente}`}>
                    {getStatusIcon(ideia.ida_status_nome)}
                    <span>{ideia.ida_status_nome}</span>
                  </div>
                </div>
                
                <div className={styles.content}>
                  <h2 className={styles.cardTitle}>{ideia.ida_nome}</h2>
                  
                  <div className={styles.statsContainer}>
                    <div className={styles.statBox}>
                      <span className={styles.statLabel}>Fatia Disponível</span>
                      <span className={styles.statValue}>{ideia.info.ida_info_fatia}%</span>
                    </div>
                  </div>
                  
                  <div className={styles.actionArea}>
                    <button className={styles.btnSecondary} onClick={() => navigate(`/editar-ideia/${ideia.ida_id}`)}>
                      <Settings size={18} />
                      <span>Gerenciar</span>
                    </button>
                    <button className={styles.btnPrimary} onClick={() => navigate(`/ideia/${ideia.ida_id}`)}>
                      <Eye size={18} />
                      <span>Visualizar</span>
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default MinhasIdeias;