import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Briefcase, Rocket } from 'lucide-react';
import mockData from '../../mock_data.json';
import IdeiaCard from '../../Components/IdeiaCard/IdeiaCard';
import styles from './MinhasIdeias.module.css';

function MinhasIdeias() {
  const [minhasIdeias, setMinhasIdeias] = useState([]);
  const navigate = useNavigate();
  const USUARIO_LOGADO_ID = 1;

  useEffect(() => {
    const filtradas = mockData.ideias.filter(ideia => ideia.ida_usuario_id === USUARIO_LOGADO_ID);
    setMinhasIdeias(filtradas);
  }, []);

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
              <IdeiaCard 
                key={ideia.ida_id} 
                ideia={ideia} 
                variant="owner"
                onAction={() => navigate(`/ideia/${ideia.ida_id}`)}
                onSecondaryAction={() => navigate(`/editar-ideia/${ideia.ida_id}`)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default MinhasIdeias;
