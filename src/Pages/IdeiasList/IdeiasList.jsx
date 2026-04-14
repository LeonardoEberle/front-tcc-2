import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lightbulb, Search, Compass } from 'lucide-react';
import mockData from '../../mock_data.json';
import IdeiaCard from '../../Components/IdeiaCard/IdeiaCard';
import styles from './IdeiasList.module.css';

function IdeiasList() {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  // Filtro simples de exemplo
  const ideiasFiltradas = mockData.ideias.filter(ideia =>
    ideia.ida_nome.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={styles.page}>
      <div className={styles.blob}></div>

      <div className={styles.container}>
        <header className={styles.header}>
          <div className={styles.headerTitleArea}>
            <Compass className={styles.headerIcon} size={36} />
            <h1 className={styles.title}>Vitrine de Negócios</h1>
          </div>
          <p className={styles.subtitle}>Explore pitches e encontre sua próxima grande oportunidade.</p>
        </header>

        <section className={styles.toolbar}>
          <div className={styles.searchWrapper}>
            <Search className={styles.searchIcon} size={20} />
            <input 
              type="text" 
              placeholder="Buscar por nome da ideia ou tag..." 
              className={styles.searchInput}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </section>

        <section className={styles.ideiasSection}>
          {ideiasFiltradas.length > 0 ? (
            <div className={styles.grid}>
              {ideiasFiltradas.map(ideia => (
                <IdeiaCard 
                  key={ideia.ida_id} 
                  ideia={ideia} 
                  onAction={() => navigate(`/ideia/${ideia.ida_id}`)}
                />
              ))}
            </div>
          ) : (
            <div className={styles.noResults}>
              <Lightbulb size={48} className={styles.noResultsIcon} />
              <p>Nenhuma ideia encontrada para "{searchTerm}".</p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export default IdeiasList;
