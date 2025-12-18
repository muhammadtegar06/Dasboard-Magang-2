import React, { useState } from 'react';
import { LoginScreen } from './components/Auth/LoginScreen';
import { MainLayout } from './components/Layout/MainLayout';
import { DashboardView } from './components/Dashboard/DashboardView';
import { InputBoxView } from './components/Box/InputBoxView';
import { DataBoxView } from './components/Box/DataBoxView';
import { useAuth } from './hooks/useAuth';
import { useBoxes } from './hooks/useBoxes';
import { useMobileMenu } from './hooks/useMobileMenu';

export default function App() {
  const [view, setView] = useState('login');
  
  // Auth
  const auth = useAuth();
  
  // Boxes
  const boxes = useBoxes();
  
  // Mobile Menu
  const menu = useMobileMenu();

  const handleLogin = (e) => {
    e.preventDefault();
    const result = auth.handleLogin(e);
    if (result.success) {
      setView('dashboard');
    } else {
      alert(result.message);
    }
  };

  const handleLogout = () => {
    auth.handleLogout();
    setView('login');
    boxes.resetForm();
  };

  const handleSubmitBox = (newBox) => {
    boxes.submitBox(newBox);
    setView('data-box');
  };

  // Login Screen
  if (view === 'login') {
    return (
      <LoginScreen
        username={auth.username}
        password={auth.password}
        onUsernameChange={(e) => auth.setUsername(e.target.value)}
        onPasswordChange={(e) => auth.setPassword(e.target.value)}
        onSubmit={handleLogin}
      />
    );
  }

  // Main App
  return (
    <MainLayout
      userRole={auth.userRole}
      view={view}
      onViewChange={setView}
      onLogout={handleLogout}
      isSidebarOpen={menu.isSidebarOpen}
      onToggleSidebar={menu.toggleSidebar}
    >
      {view === 'dashboard' && (
        <DashboardView boxes={boxes.boxes} onViewChange={setView} />
      )}
      {view === 'input-box' && (
        <InputBoxView
          userRole={auth.userRole}
          formData={boxes.formData}
          docItems={boxes.docItems}
          onFormChange={(field, value) => boxes.setFormData({ ...boxes.formData, [field]: value })}
          onDocChange={boxes.handleDocChange}
          onAddDocRow={boxes.addDocRow}
          onRemoveDocRow={boxes.removeDocRow}
          onSubmit={handleSubmitBox}
        />
      )}
      {view === 'data-box' && (
        <DataBoxView
          boxes={boxes.boxes}
          userRole={auth.userRole}
          onApprove={boxes.approveBox}
          onReject={boxes.rejectBox}
        />
      )}
    </MainLayout>
  );
}
