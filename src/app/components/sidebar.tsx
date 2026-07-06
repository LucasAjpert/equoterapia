import { Users, FileText, Settings, BarChart3, LogOut, Calendar, UserPlus, ChevronLeft, ChevronRight, BookOpen, UserCheck, Leaf, X, Bell } from 'lucide-react';

interface SidebarProps {
  activeItem?: string;
  onItemClick?: (item: string) => void;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
  isMobile?: boolean;
  onClose?: () => void;
  pendenciasCount?: number;
}

export function Sidebar({ activeItem = 'agenda', onItemClick, isCollapsed = false, onToggleCollapse, isMobile = false, onClose, pendenciasCount = 0 }: SidebarProps) {
  const menuItems = [
    { id: 'agenda', label: 'Agenda', icon: Calendar },
    { id: 'praticante', label: 'Praticante', icon: Users },
    { id: 'cadastro', label: 'Cadastro', icon: UserPlus },
    { id: 'colaborador', label: 'Colaborador', icon: UserCheck },
    { id: 'equino', label: 'Equino', icon: Users },
    { id: 'relatorios', label: 'Relatórios', icon: BarChart3 },
    { id: 'documentos', label: 'Documentos', icon: FileText },
    { id: 'revistas', label: 'Revistas', icon: BookOpen },
    { id: 'equociencia', label: 'Equociência', icon: Leaf },
  ];

  const handleClick = (itemId: string) => {
    if (onItemClick) {
      onItemClick(itemId);
    }
  };

  return (
    <div className={`h-screen bg-white border-r border-gray-200 flex flex-col transition-all duration-300 ${isMobile ? 'w-64' : isCollapsed ? 'w-20' : 'w-64'}`}>
      {/* User Profile Section */}
      <div className="p-6 flex flex-col items-center border-b border-gray-200 relative">
        {/* Close button for mobile */}
        {isMobile && onClose && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-lg transition-colors"
            title="Fechar menu"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        )}
        
        <button
          onClick={!isMobile ? onToggleCollapse : undefined}
          className={`w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0 mb-3 hover:opacity-80 transition-opacity ${!isMobile ? 'cursor-pointer' : 'cursor-default'}`}
          title={!isMobile && isCollapsed ? 'Expandir' : !isMobile ? 'Recolher' : ''}
        >
          <img 
            src="https://via.placeholder.com/64" 
            alt="User Avatar" 
            className="w-full h-full rounded-full object-cover"
          />
        </button>
        {(isMobile || !isCollapsed) && (
          <p className="text-gray-900 text-center">Roberto da Silva</p>
        )}
      </div>

      {/* Menu Items */}
      <nav className="flex-1 p-4 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeItem === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => handleClick(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? 'bg-gray-100 text-gray-900'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              } ${!isMobile && isCollapsed ? 'justify-center' : ''}`}
              title={!isMobile && isCollapsed ? item.label : ''}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              {(isMobile || !isCollapsed) && <span>{item.label}</span>}
            </button>
          );
        })}

        {/* Notificações */}
        <button
          onClick={() => handleClick('notificacoes')}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors relative ${
            activeItem === 'notificacoes'
              ? 'bg-gray-100 text-gray-900'
              : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
          } ${!isMobile && isCollapsed ? 'justify-center' : ''}`}
          title={!isMobile && isCollapsed ? 'Notificações' : ''}
        >
          <div className="relative flex-shrink-0">
            <Bell className="w-5 h-5" />
            {pendenciasCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-red-500 text-white text-[10px] rounded-full flex items-center justify-center font-bold">
                {pendenciasCount > 9 ? '9+' : pendenciasCount}
              </span>
            )}
          </div>
          {(isMobile || !isCollapsed) && (
            <span className="flex-1 text-left">Notificações</span>
          )}
          {(isMobile || !isCollapsed) && pendenciasCount > 0 && (
            <span className="ml-auto px-2 py-0.5 bg-red-100 text-red-700 text-xs rounded-full font-medium">
              {pendenciasCount}
            </span>
          )}
        </button>

        {/* Separator */}
        <div className="pt-4 pb-2">
          <div className="border-t border-gray-200"></div>
        </div>

        {/* Bottom Menu Items */}
        <button
          onClick={() => handleClick('configuracoes')}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
            activeItem === 'configuracoes'
              ? 'bg-gray-100 text-gray-900'
              : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
          } ${!isMobile && isCollapsed ? 'justify-center' : ''}`}
          title={!isMobile && isCollapsed ? 'Configurações' : ''}
        >
          <Settings className="w-5 h-5 flex-shrink-0" />
          {(isMobile || !isCollapsed) && <span>Configurações</span>}
        </button>

        <button
          onClick={() => handleClick('sair')}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-gray-600 hover:bg-gray-50 hover:text-gray-900 ${
            !isMobile && isCollapsed ? 'justify-center' : ''
          }`}
          title={!isMobile && isCollapsed ? 'Sair' : ''}
        >
          <LogOut className="w-5 h-5 flex-shrink-0" />
          {(isMobile || !isCollapsed) && <span>Sair</span>}
        </button>
      </nav>

      {/* Collapse Toggle Button - Only show on desktop */}
      {!isMobile && (
        <>
          {!isCollapsed && (
            <div className="p-4 border-t border-gray-200">
              <button
                onClick={onToggleCollapse}
                className="w-full flex items-center justify-center p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-600"
                title="Recolher"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
            </div>
          )}
          
          {isCollapsed && (
            <div className="p-4 border-t border-gray-200">
              <button
                onClick={onToggleCollapse}
                className="w-full flex items-center justify-center p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-600"
                title="Expandir"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}