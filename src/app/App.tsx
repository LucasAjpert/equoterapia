import { useState, useEffect } from 'react';
import { Menu, Bell } from 'lucide-react';
import { Sidebar } from './components/sidebar';
import { HomePage } from './components/home-page';
import { AgendaPage } from './components/agenda-page';
import { PraticanteForm } from './components/praticante-form';
import { CadastroPage } from './components/cadastro-page';
import { ColaboradorPage } from './components/colaborador-page';
import { EquinoPage } from './components/equino-page';
import { DocumentosPage } from './components/documentos-page';
import { RelatoriosPage } from './components/relatorios-page';
import { RevistasPage } from './components/revistas-page';
import { LoginForm } from './components/login-form';
import { NotificacoesPage, Pendencia } from './components/notificacoes-page';

const hoje = new Date().toLocaleDateString('pt-BR');

const pendenciasIniciais: Pendencia[] = [
  { id: 1, tipo: 'atendimento', praticante: 'FELIPE PEIXOTO',       horario: '09:30', data: hoje, mediador: 'Vitória',  equino: 'Apolo',     lateral: 'Jaqueline', guia: 'Lillian', status: 'aberto' },
  { id: 2, tipo: 'atendimento', praticante: 'HENRY N. PAVÃO',       horario: '10:30', data: hoje, mediador: 'Mônica',   equino: 'Trovão',    lateral: 'Cristieli',                  status: 'aberto' },
  { id: 3, tipo: 'atendimento', praticante: 'GIOVANA PANIAGO',      horario: '14:00', data: hoje, mediador: 'Gabriel',  equino: 'Relâmpago', lateral: 'Jacques',                    status: 'aberto' },
];

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeItem, setActiveItem] = useState('agenda');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [hideSidebar, setHideSidebar] = useState(false);
  const [pendencias, setPendencias] = useState<Pendencia[]>(pendenciasIniciais);
  const [showNotifBadge, setShowNotifBadge] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Faz o badge piscar quando há novas pendências
  useEffect(() => {
    if (pendencias.length > 0) setShowNotifBadge(true);
  }, [pendencias.length]);

  const handleEncerrar = (id: number, _observacao: string) => {
    setPendencias(prev => prev.filter(p => p.id !== id));
  };

  const renderPage = () => {
    switch (activeItem) {
      case 'agenda':
        return <AgendaPage onHideSidebar={setHideSidebar} onNotificacoesClick={() => handleMenuItemClick('notificacoes')} pendenciasCount={pendencias.length} />;
      case 'praticante':
        return <PraticanteForm />;
      case 'cadastro':
        return <CadastroPage />;
      case 'colaborador':
        return <ColaboradorPage />;
      case 'documentos':
        return <DocumentosPage />;
      case 'equino':
        return <EquinoPage />;
      case 'relatorios':
        return <RelatoriosPage />;
      case 'revistas':
        return <RevistasPage />;
      case 'notificacoes':
        return <NotificacoesPage pendencias={pendencias} onEncerrar={handleEncerrar} />;
      case 'equociencia':
      case 'configuracoes':
        return <HomePage />;
      default:
        return <AgendaPage onHideSidebar={setHideSidebar} />;
    }
  };

  if (!isLoggedIn) {
    return <LoginForm onLoginSuccess={() => setIsLoggedIn(true)} />;
  }

  const handleMenuItemClick = (item: string) => {
    setActiveItem(item);
    if (item === 'notificacoes') setShowNotifBadge(false);
    if (isMobile) setIsMobileMenuOpen(false);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Mobile Header */}
      {isMobile && !hideSidebar && (
        <div className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-200 z-40 flex items-center px-4">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Menu className="w-6 h-6 text-gray-700" />
          </button>
          <h1 className="ml-4 text-lg font-semibold text-gray-900 flex-1">
            {activeItem.charAt(0).toUpperCase() + activeItem.slice(1)}
          </h1>
          {/* Sino mobile */}
          <button
            onClick={() => handleMenuItemClick('notificacoes')}
            className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Bell className={`w-6 h-6 ${activeItem === 'notificacoes' ? 'text-indigo-600' : 'text-gray-600'}`} />
            {pendencias.length > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-[10px] rounded-full flex items-center justify-center font-bold">
                {pendencias.length}
              </span>
            )}
          </button>
        </div>
      )}

      {/* Backdrop mobile */}
      {isMobile && isMobileMenuOpen && !hideSidebar && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => setIsMobileMenuOpen(false)} />
      )}

      {/* Sidebar */}
      {!hideSidebar && (
        <div className={`${isMobile ? 'fixed inset-y-0 left-0 z-50' : 'relative'} ${isMobile && !isMobileMenuOpen ? '-translate-x-full' : 'translate-x-0'} transition-transform duration-300`}>
          <Sidebar
            activeItem={activeItem}
            onItemClick={handleMenuItemClick}
            isCollapsed={isSidebarCollapsed}
            onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            isMobile={isMobile}
            onClose={() => setIsMobileMenuOpen(false)}
            pendenciasCount={pendencias.length}
          />
        </div>
      )}

      {/* Main Content */}
      <div className={`flex-1 overflow-auto ${isMobile && !hideSidebar ? 'pt-16' : ''}`}>
        {renderPage()}
      </div>
    </div>
  );
}
