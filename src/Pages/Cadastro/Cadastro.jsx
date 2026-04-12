import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion'; // Animações
import toast, { Toaster } from 'react-hot-toast'; // Popups
import styles from './Cadastro.module.css';
import logo from '../../assets/logo.png';

function Cadastro() {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    usu_nome: '',
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
    
    // Validação de Senha
    if (formData.usu_senha !== formData.confirmar_senha) {
      toast.error('As senhas não coincidem!');
      return;
    }

    // Feedback de Sucesso
    toast.success('Cadastro realizado com sucesso!');

    console.log('Dados enviados:', formData);
    
    // Pequeno delay para o usuário ler a mensagem antes de mudar de tela
    setTimeout(() => navigate('/login'), 2000);
  };

  return (
    <div className={styles.page}>
      <Toaster position="top-center" />

      <motion.div 
        className={styles.container}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className={styles.header}>
          <img src={logo} alt="Logo" className={styles.logo} />
          <h1 className={styles.title}>Criar Conta</h1>
          <p className={styles.subtitle}>Preencha os dados abaixo para começar</p>
        </div>

        <form onSubmit={handleRegister}>
          <div className={styles.formGroup}>
            <label className={styles.label}>Nome Completo</label>
            <input 
              type="text" 
              name="usu_nome" 
              className={styles.input} 
              value={formData.usu_nome} 
              onChange={handleChange} 
              placeholder="Digite seu nome"
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
              placeholder="seu@email.com"
              required 
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>CPF</label>
            <input 
              type="text" 
              name="usu_cpf" 
              className={styles.input} 
              value={formData.usu_cpf} 
              onChange={handleChange} 
              placeholder="000.000.000-00"
              required 
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Telefone</label>
            <input 
              type="text" 
              name="usu_telefone" 
              className={styles.input} 
              value={formData.usu_telefone} 
              onChange={handleChange} 
              placeholder="(00) 00000-0000"
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
              placeholder="No mínimo 6 caracteres"
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
              placeholder="Repita a senha"
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

          <motion.button 
            type="submit" 
            className={styles.button}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Finalizar Cadastro
          </motion.button>
        </form>

        <div className={styles.linkArea}>
          <p className={styles.registerText}>
            Já tem uma conta? <Link to="/login" className={styles.linkHighlight}>Entrar</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}

export default Cadastro;