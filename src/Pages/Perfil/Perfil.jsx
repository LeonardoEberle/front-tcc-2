import React, { useState } from 'react';
import { User, Mail, Phone, MapPin, Calendar, Link as LinkIcon, AlignLeft, Camera, Check, X, Edit2 } from 'lucide-react';
import styles from './Perfil.module.css';
import mockData from '../../mock_data.json';

function Perfil() {
  const joao = mockData.usuarios.find(u => u.usu_id === 2);
  
  const [formData, setFormData] = useState({
    usu_nome: joao.usu_nome,
    usu_sobrenome: joao.usu_sobrenome,
    usu_email: joao.usu_email,
    usu_telefone: '(11) 99999-8888',
    usu_perfil_descricao: 'Empreendedor apaixonado por tecnologia e sustentabilidade.',
    usu_perfil_cep: '01001-000',
    usu_perfil_data_nasc: '1990-01-01',
    usu_perfil_link_redes: 'linkedin.com/in/joaosilva'
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    setIsEditing(false);
    // Aqui chamaria sua API
  };

  return (
    <div className={styles.page}>
      <div className={styles.blob}></div>
      
      <div className={styles.container}>
        {/* Header do Perfil / Avatar */}
        <div className={styles.profileHeader}>
          <div className={styles.avatarWrapper}>
            <div className={styles.avatar}>
              {formData.usu_nome.charAt(0)}{formData.usu_sobrenome.charAt(0)}
            </div>
            <button className={styles.cameraBtn}><Camera size={16} /></button>
          </div>
          
          <div className={styles.headerInfo}>
            <h1 className={styles.userName}>{formData.usu_nome} {formData.usu_sobrenome}</h1>
            <span className={styles.userRole}>Empreendedor</span>
          </div>

          <div className={styles.actions}>
            {!isEditing ? (
              <button className={styles.editBtn} onClick={() => setIsEditing(true)}>
                <Edit2 size={18} /> Editar Perfil
              </button>
            ) : (
              <div className={styles.saveGroup}>
                <button className={styles.cancelBtn} onClick={() => setIsEditing(false)}><X size={20} /></button>
                <button className={styles.saveBtn} onClick={handleSave}><Check size={20} /> Salvar</button>
              </div>
            )}
          </div>
        </div>

        <div className={styles.contentGrid}>
          {/* Card: Informações Pessoais */}
          <div className={styles.card}>
            <h3 className={styles.cardTitle}>Dados Pessoais</h3>
            
            <div className={styles.infoRow}>
              <User size={18} className={styles.icon} />
              <div className={styles.field}>
                <label>Nome Completo</label>
                {isEditing ? (
                  <div className={styles.inputGroup}>
                    <input name="usu_nome" value={formData.usu_nome} onChange={handleChange} className={styles.inputInline} />
                    <input name="usu_sobrenome" value={formData.usu_sobrenome} onChange={handleChange} className={styles.inputInline} />
                  </div>
                ) : (
                  <p>{formData.usu_nome} {formData.usu_sobrenome}</p>
                )}
              </div>
            </div>

            <div className={styles.infoRow}>
              <Mail size={18} className={styles.icon} />
              <div className={styles.field}>
                <label>E-mail</label>
                {isEditing ? (
                  <input name="usu_email" value={formData.usu_email} onChange={handleChange} className={styles.inputInline} />
                ) : (
                  <p>{formData.usu_email}</p>
                )}
              </div>
            </div>

            <div className={styles.infoRow}>
              <Phone size={18} className={styles.icon} />
              <div className={styles.field}>
                <label>Telefone</label>
                {isEditing ? (
                  <input name="usu_telefone" value={formData.usu_telefone} onChange={handleChange} className={styles.inputInline} />
                ) : (
                  <p>{formData.usu_telefone}</p>
                )}
              </div>
            </div>
          </div>

          {/* Card: Localização e Links */}
          <div className={styles.card}>
            <h3 className={styles.cardTitle}>Conectividade</h3>
            
            <div className={styles.infoRow}>
              <MapPin size={18} className={styles.icon} />
              <div className={styles.field}>
                <label>CEP</label>
                {isEditing ? (
                  <input name="usu_perfil_cep" value={formData.usu_perfil_cep} onChange={handleChange} className={styles.inputInline} />
                ) : (
                  <p>{formData.usu_perfil_cep}</p>
                )}
              </div>
            </div>

            <div className={styles.infoRow}>
              <LinkIcon size={18} className={styles.icon} />
              <div className={styles.field}>
                <label>LinkedIn / Redes</label>
                {isEditing ? (
                  <input name="usu_perfil_link_redes" value={formData.usu_perfil_link_redes} onChange={handleChange} className={styles.inputInline} />
                ) : (
                  <a href={`https://${formData.usu_perfil_link_redes}`} target="_blank" rel="noreferrer">{formData.usu_perfil_link_redes}</a>
                )}
              </div>
            </div>

            <div className={styles.infoRow}>
              <Calendar size={18} className={styles.icon} />
              <div className={styles.field}>
                <label>Nascimento</label>
                {isEditing ? (
                  <input type="date" name="usu_perfil_data_nasc" value={formData.usu_perfil_data_nasc} onChange={handleChange} className={styles.inputInline} />
                ) : (
                  <p>{formData.usu_perfil_data_nasc}</p>
                )}
              </div>
            </div>
          </div>

          {/* Card: Bio (Largura Total) */}
          <div className={`${styles.card} ${styles.fullWidth}`}>
            <h3 className={styles.cardTitle}>Sobre Mim</h3>
            <div className={styles.infoRow}>
              <AlignLeft size={18} className={styles.icon} />
              <div className={styles.field}>
                {isEditing ? (
                  <textarea name="usu_perfil_descricao" value={formData.usu_perfil_descricao} onChange={handleChange} className={styles.textareaInline} />
                ) : (
                  <p className={styles.bioText}>{formData.usu_perfil_descricao}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Perfil;