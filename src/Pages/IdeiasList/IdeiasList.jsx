import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lightbulb, Search, Rocket, Star, Compass } from 'lucide-react'; // Biblioteca de ícones
import mockData from '../../mock_data.json';
import noImage from '../../assets/noimage.jpg';
import styles from './IdeiasList.module.css';

function IdeiasList() {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const getImageUrl = (imagePath) => {
    if (imagePath && imagePath.startsWith('http')) return imagePath;
    return noImage;
  };

  // Filtro simples de exemplo
  const ideiasFiltradas = mockData.ideias.filter(ideia =>
    ideia.ida_nome.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={styles.page}>
      {/* Elemento decorativo de fundo (blob) */}
      <div className={styles.blob}></div>

      <div className={styles.container}>
        {/* Cabeçalho alinhado com o Dashboard */}
        <header className={styles.header}>
          <div className={styles.headerTitleArea}>
            <Compass className={styles.headerIcon} size={36} />
            <h1 className={styles.title}>Vitrine de Negócios</h1>
          </div>
          <p className={styles.subtitle}>Explore pitches e encontre sua próxima grande oportunidade.</p>
        </header>

        {/* Barra de Busca - Nova e Moderna (Sem Botão de Filtro) */}
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
          {/* O botão de filtro foi removido daqui */}
        </section>

        {/* Grid de Ideias - Estilo "Shark Tank" */}
        <section className={styles.ideiasSection}>
          {ideiasFiltradas.length > 0 ? (
            <div className={styles.grid}>
              {ideiasFiltradas.map(ideia => (
                <article key={ideia.ida_id} className={styles.card}>
                  <div className={styles.imageWrapper}>
                    <img 
                      src={getImageUrl(ideia.info.ida_info_imagem)} 
                      alt={ideia.ida_nome} 
                      className={styles.image} 
                    />
                    {/* Badge de Destaque - ÍCONE MAIOR E MAIS IMPONENTE */}
                    <div className={styles.featuredBadge} title="Destaque Curadoria Shark">
                      <Star size={18} fill="#fff" color="#fff" />
                    </div>
                  </div>
                  
                  <div className={styles.content}>
                    <div className={styles.cardHeaderInfo}>
                      <Lightbulb size={16} className={styles.cardIcon} />
                      <h3 className={styles.cardTitle}>{ideia.ida_nome}</h3>
                    </div>
                    
                    <p className={styles.description}>
                      Um pitch resumido sobre a inovação e o mercado para engajar o investidor...
                    </p>
                    
                    {/* Métrica de Equity - Mais visível */}
                    <div className={styles.equityInfo}>
                      <span>Equity Disponível:</span>
                      <strong>{ideia.info.ida_info_fatia}%</strong>
                    </div>
                    
                    <button 
                      className={styles.cardButton}
                      onClick={() => navigate(`/ideia/${ideia.ida_id}`)}
                    >
                      <span>Analisar Oportunidade</span>
                      <Rocket size={18} />
                    </button>
                  </div>
                </article>
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