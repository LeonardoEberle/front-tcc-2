import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './Components/Navbar';
import Dashboard from './Pages/Dashboard/Dashboard';
import Login from './Pages/Login/Login';
import Cadastro from './Pages/Cadastro/Cadastro';
import RecupSenha from './Pages/RecupSenha/RecupSenha';
import IdeiasList from './Pages/IdeiasList/IdeiasList';
import MinhasIdeias from './Pages/MinhasIdeias/MinhasIdeias';
import Perfil from './Pages/Perfil/Perfil';
import Ideia from './Pages/Ideia/Ideia';
import EditarIdeia from './Pages/EditarIdeia/EditarIdeia';
import Propostas from './Pages/Propostas/Propostas';
import CriarIdeia from './Pages/CriarIdeia/CriarIdeia';
import ResponderProposta from './Pages/ResponderProposta/ResponderProposta';
import MinhasPropostas from './Pages/MinhasPropostas/MinhasPropostas';
import Chat from './Pages/Chat/Chat';
import Premium from './Pages/Premium/Premium';
import AdminDashboard from './Pages/Admin/AdminDashboard';
import { getToken, getRoleFromToken } from './utils/auth';
import './App.css';


function Layout({ children }) {
  const location = useLocation();
  const hideNavbarPaths = ['/', '/login', '/cadastro', '/recup-senha'];
  const shouldHideNavbar = hideNavbarPaths.includes(location.pathname);

  return (
    <>
      {!shouldHideNavbar && <Navbar />}
      <main style={{ minHeight: '80vh', backgroundColor: '#fdfdfd' }}>
        {children}
      </main>
    </>
  );
}

function HomeRedirect() {
  const token = getToken();
  if (!token) return <Navigate to="/login" replace />;
  
  const role = (getRoleFromToken(token) || '').toLowerCase();
  if (role === 'adm') return <Navigate to="/admin/dashboard" replace />;
  
  return <Navigate to="/dashboard" replace />;
}


function App() {
  return (
    <Router>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3500,
          success: { duration: 3000 },
          error:   { duration: 4000 },
          loading: { duration: Infinity },
        }}
      />
      <Layout>
        <Routes>
          <Route path="/" element={<HomeRedirect />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/recup-senha" element={<RecupSenha />} />
          <Route path="/ideias" element={<IdeiasList />} />
          <Route path="/minhas-ideias" element={<MinhasIdeias />} />
          <Route path="/perfil" element={<Perfil />} />
          <Route path="/ideia/:id" element={<Ideia />} />
          <Route path="/editar-ideia/:id" element={<EditarIdeia />} />
          <Route path="/propostas/:ideiaId" element={<Propostas />} />
          <Route path="/criar-ideia" element={<CriarIdeia />} /> {/* 👈 adicionado */}
          <Route path="/responder-proposta/:ideiaId" element={<ResponderProposta />} />
          <Route path="/minhas-propostas" element={<MinhasPropostas />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/premium" element={<Premium />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Routes>
      </Layout>
    </Router>
  );
}


export default App;
