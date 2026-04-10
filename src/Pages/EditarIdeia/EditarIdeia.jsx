import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import mockData from '../../mock_data.json';
import styles from './EditarIdeia.module.css';

function EditarIdeia() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    ida_nome: '',
    ida_categoria_nome: '',
    ida_info_descricao: '',
    ida_info_fatia: 0,
    ida_info_link_video: ''
  });

  useEffect(() => {
    const ideia = mockData.ideias.find(i => i.ida_id === parseInt(id));
    if (ideia) {
      setFormData({
        ida_nome: ideia.ida_nome,
        ida_categoria_nome: ideia.ida_categoria_nome,
        ida_info_descricao: ideia.info.ida_info_descricao,
        ida_info_fatia: ideia.info.ida_info_fatia,
        ida_info_link_video: ideia.info.ida_info_link_video
      });
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    console.log('Ideia atualizada:', formData);
    alert('Alterações salvas com sucesso!');
    navigate('/minhas-ideias');
  };

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>Editar Ideia</h1>
          <p className={styles.subtitle}>Atualize as informações do seu projeto para os investidores.</p>
        </div>

        <form onSubmit={handleSave} className={styles.form}>
          <div className={styles.formGroup}>
            <label className={styles.label}>Título da Ideia</label>
            <input 
              type="text" 
              name="ida_nome" 
              className={styles.input}
              value={formData.ida_nome} 
              onChange={handleChange} 
              required 
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Categoria</label>
            <input 
              type="text" 
              name="ida_categoria_nome" 
              className={styles.input}
              value={formData.ida_categoria_nome} 
              onChange={handleChange} 
              required 
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Fatia Disponível (%)</label>
            <input 
              type="number" 
              name="ida_info_fatia" 
              className={styles.input}
              value={formData.ida_info_fatia} 
              onChange={handleChange} 
              required 
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Link do Vídeo (Pitch)</label>
            <input 
              type="text" 
              name="ida_info_link_video" 
              className={styles.input}
              value={formData.ida_info_link_video} 
              onChange={handleChange} 
              required 
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Descrição Completa</label>
            <textarea 
              name="ida_info_descricao" 
              className={styles.textarea}
              value={formData.ida_info_descricao} 
              onChange={handleChange} 
              required
            />
          </div>

          <div className={styles.buttonGroup}>
            <button type="submit" className={styles.btnSave}>
              Salvar Alterações
            </button>
            <button 
              type="button" 
              className={styles.btnCancel}
              onClick={() => navigate('/minhas-ideias')}
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditarIdeia;