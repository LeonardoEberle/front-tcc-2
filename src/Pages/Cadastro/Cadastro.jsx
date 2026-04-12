import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styles from './Cadastro.module.css';
import logo from '../../assets/logo.png'; // Certifique-se que o caminho está correto

function Cadastro() {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    usu_nome: '',
    usu_sobrenome: '',
    usu_cpf: '',
    usu_email: '',
    usu_telefone: '',
    usu_senha: '',
    confirmar_senha: '',
    usu_cargo_id: '2'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (formData.usu_senha !== formData.confirmar_senha) {
      alert('As senhas não coincidem!');
      return;
    }
    console.log('Dados para a API:', formData);
    alert('Cadastro realizado com sucesso!');
    navigate('/login');
  };

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.header}>
          <img src={logo} alt="Logo" className={styles.logo} />
          <h1 className={styles.title}>Crie sua conta</h1>
          <p className={styles.subtitle}>Preencha os dados abaixo para começar</p>
        </div>

        <form onSubmit={handleRegister}>
          <div className={styles.formGroup}>
            <label className={styles.label}>Nome</label>
            <input 
              type="text" 
              name="usu_nome" 
              className={styles.input} 
              value={formData.usu_nome} 
              onChange={handleChange} 
              required 
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Email</label>
            <input 
              type="email" 
              name="usu_email" 
              className={styles.input} 
              value={formData.usu_email} 
              onChange={handleChange} 
              required 
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Senha</label>
            <input 
              type="password" 
              name="usu_senha" 
              className={styles.input} 
              value={formData.usu_senha} 
              onChange={handleChange} 
              required 
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Confirmar Senha</label>
            <input 
              type="password" 
              name="confirmar_senha" 
              className={styles.input} 
              value={formData.confirmar_senha} 
              onChange={handleChange} 
              required 
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Tipo de Perfil</label>
            <select 
              name="usu_cargo_id" 
              className={styles.input} 
              value={formData.usu_cargo_id} 
              onChange={handleChange}
            >
              <option value="2">Empreendedor (ME)</option>
              <option value="3">Investidor</option>
            </select>
          </div>

          <button type="submit" className={styles.button}>
            Finalizar Cadastro
          </button>
        </form>

        <div className={styles.linkArea}>
          <p>Já tem uma conta? <Link to="/login" className={styles.link}>Entrar</Link></p>
        </div>
      </div>
    </div>
  );
}

export default Cadastro;