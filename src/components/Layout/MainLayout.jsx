import React from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';

export const MainLayout = ({ userRole, view, onViewChange, onLogout, isSidebarOpen, onToggleSidebar, children }) => {
  return (
    <div className="flex min-h-screen bg-gray-100 font-sans text-gray-800">
      {isSidebarOpen && <Sidebar userRole={userRole} view={view} onViewChange={onViewChange} onLogout={onLogout} />}

      <div className="flex-1 flex flex-col overflow-hidden relative">
        <Header onMenuClick={onToggleSidebar} />

        <main className="flex-1 overflow-x-hidden overflow-y-auto p-4 md:p-8 relative">
          {children}
        </main>
      </div>
    </div>
  );
};
