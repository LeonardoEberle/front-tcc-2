import React, { useState } from 'react';
import styles from './Perfil.module.css';
import mockData from '../../mock_data.json';

function Perfil() {
  const joao = mockData.usuarios.find(u => u.usu_id === 1);
  
  const [formData, setFormData] = useState({
    usu_nome: joao.usu_nome,
    usu_sobrenome: joao.usu_sobrenome,
    usu_email: joao.usu_email,
    usu_cpf: '000.111.222-33',
    usu_telefone: '(11) 99999-8888',
    usu_perfil_descricao: 'Empreendedor apaixonado por tecnologia e sustentabilidade.',
    usu_perfil_cep: '01001-000',
    usu_perfil_data_nasc: '1990-01-01',
    usu_perfil_link_redes: 'linkedin.com/in/joaosilva'
  });

  // Este estado controla o bloqueio (true = bloqueado, false = editável)
  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    setIsEditing(false); // Bloqueia novamente após salvar
    alert('Perfil atualizado com sucesso!');
  };

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>Meu Perfil</h1>
        </div>

        <form onSubmit={handleSave}>
          <div className={styles.formGroup}>
            <label className={styles.label}>Nome</label>
            <input type="text" name="usu_nome" className={styles.input} value={formData.usu_nome} onChange={handleChange} disabled={!isEditing} />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Sobrenome</label>
            <input type="text" name="usu_sobrenome" className={styles.input} value={formData.usu_sobrenome} onChange={handleChange} disabled={!isEditing} />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>CPF</label>
            <input type="text" name="usu_cpf" className={styles.input} value={formData.usu_cpf} onChange={handleChange} disabled={!isEditing} />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Email</label>
            <input type="email" name="usu_email" className={styles.input} value={formData.usu_email} onChange={handleChange} disabled={!isEditing} />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Telefone</label>
            <input type="text" name="usu_telefone" className={styles.input} value={formData.usu_telefone} onChange={handleChange} disabled={!isEditing} />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Data de Nascimento</label>
            <input type="date" name="usu_perfil_data_nasc" className={styles.input} value={formData.usu_perfil_data_nasc} onChange={handleChange} disabled={!isEditing} />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>CEP</label>
            <input type="text" name="usu_perfil_cep" className={styles.input} value={formData.usu_perfil_cep} onChange={handleChange} disabled={!isEditing} />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Redes Sociais</label>
            <input type="text" name="usu_perfil_link_redes" className={styles.input} value={formData.usu_perfil_link_redes} onChange={handleChange} disabled={!isEditing} />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Bio</label>
            <textarea name="usu_perfil_descricao" className={styles.textarea} value={formData.usu_perfil_descricao} onChange={handleChange} disabled={!isEditing} />
          </div>

          <div className={styles.buttonGroup}>
            {!isEditing ? (
              <button 
                type="button" 
                className={styles.button} 
                onClick={() => setIsEditing(true)}
              >
                Editar Perfil
              </button>
            ) : (
              <>
                <button type="submit" className={styles.button}>Salvar Alterações</button>
                <button 
                  type="button" 
                  className={`${styles.button} ${styles.buttonSecondary}`} 
                  onClick={() => setIsEditing(false)}
                >
                  Cancelar
                </button>
              </>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default Perfil;