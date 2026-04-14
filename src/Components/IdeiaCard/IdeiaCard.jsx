import React from 'react';
import { Lightbulb, Rocket, Star, Eye, Settings, CheckCircle, AlertCircle } from 'lucide-react';
import noImage from '../../assets/noimage.jpg';
import styles from './IdeiaCard.module.css';

/**
 * Componente reutilizável de Card para exibir ideias.
 * 
 * @param {Object} ideia - Dados da ideia.
 * @param {string} variant - Variação do card ('default', 'dashboard', 'owner').
 * @param {function} onAction - Callback para ação principal.
 * @param {function} onSecondaryAction - Callback para ação secundária (variante 'owner').
 */
function IdeiaCard({ ideia, variant = 'default', onAction, onSecondaryAction }) {
  const getImageUrl = (imagePath) => {
    if (imagePath && imagePath.startsWith('http')) return imagePath;
    return noImage;
  };

  const getStatusIcon = (status) => {
    if (status === 'Ativo') return <CheckCircle size={14} />;
    return <AlertCircle size={14} />;
  };

  const renderBadge = () => {
    if (variant === 'dashboard') {
      return <span className={styles.equityBadge}>{ideia.info.ida_info_fatia}% Equity</span>;
    }
    if (variant === 'default') {
      return (
        <div className={styles.featuredBadge} title="Destaque Curadoria Shark">
          <Star size={18} fill="#fff" color="#fff" />
        </div>
      );
    }
    if (variant === 'owner') {
      return (
        <div className={`${styles.statusBadge} ${ideia.ida_status_nome === 'Ativo' ? styles.statusAtivo : styles.statusPendente}`}>
          {getStatusIcon(ideia.ida_status_nome)}
          <span>{ideia.ida_status_nome}</span>
        </div>
      );
    }
    return null;
  };

  return (
    <article className={`${styles.card} ${styles[variant]}`}>
      <div className={styles.imageWrapper}>
        <img 
          src={getImageUrl(ideia.info.ida_info_imagem)} 
          alt={ideia.ida_nome} 
          className={styles.image} 
        />
        {renderBadge()}
      </div>
      
      <div className={styles.content}>
        <div className={styles.cardHeaderInfo}>
          <Lightbulb size={16} className={styles.cardIcon} />
          <h3 className={styles.cardTitle}>{ideia.ida_nome}</h3>
        </div>
        
        <p className={styles.description}>
          {variant === 'owner' 
            ? 'Gerencie seu projeto e acompanhe o interesse de investidores.'
            : 'Um pitch resumido sobre a inovação e o mercado para engajar o investidor...'}
        </p>
        
        {variant !== 'dashboard' && (
          <div className={styles.equityInfo}>
            <span>Equity Disponível:</span>
            <strong>{ideia.info.ida_info_fatia}%</strong>
          </div>
        )}

        {variant === 'dashboard' && (
          <p className={styles.equitySimple}>Fatia: {ideia.info.ida_info_fatia}%</p>
        )}
        
        <div className={styles.actionArea}>
          {variant === 'owner' ? (
            <>
              <button className={styles.btnSecondary} onClick={onSecondaryAction}>
                <Settings size={18} />
                <span>Gerenciar</span>
              </button>
              <button className={styles.btnPrimary} onClick={onAction}>
                <Eye size={18} />
                <span>Visualizar</span>
              </button>
            </>
          ) : (
            <button className={styles.cardButton} onClick={onAction}>
              <span>{variant === 'dashboard' ? 'Ver Pitch' : 'Analisar Oportunidade'}</span>
              <Rocket size={18} />
            </button>
          )}
        </div>
      </div>
    </article>
  );
}

export default IdeiaCard;
