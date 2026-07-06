import { TrendingUp, Users, FileText, DollarSign } from 'lucide-react';

export function HomePage() {
  const stats = [
    {
      id: 1,
      title: 'Total de Usuários',
      value: '2,543',
      change: '+12%',
      icon: Users,
      color: 'bg-blue-500',
    },
    {
      id: 2,
      title: 'Receita',
      value: 'R$ 45.231',
      change: '+23%',
      icon: DollarSign,
      color: 'bg-green-500',
    },
    {
      id: 3,
      title: 'Documentos',
      value: '1,234',
      change: '+8%',
      icon: FileText,
      color: 'bg-purple-500',
    },
    {
      id: 4,
      title: 'Crescimento',
      value: '89%',
      change: '+5%',
      icon: TrendingUp,
      color: 'bg-orange-500',
    },
  ];

  const recentActivity = [
    { id: 1, user: 'João Silva', action: 'criou um novo documento', time: '5 min atrás' },
    { id: 2, user: 'Maria Santos', action: 'atualizou perfil', time: '15 min atrás' },
    { id: 3, user: 'Pedro Costa', action: 'adicionou um comentário', time: '1 hora atrás' },
    { id: 4, user: 'Ana Lima', action: 'fez upload de arquivo', time: '2 horas atrás' },
  ];

  return (
    <div className="flex-1 bg-gray-50 overflow-auto">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-8 py-6">
        <h1 className="text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Bem-vindo de volta! Aqui está o resumo de hoje.</p>
      </div>

      {/* Content */}
      <div className="p-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <div className={`${stat.color} w-12 h-12 rounded-lg flex items-center justify-center`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-green-600 text-sm">{stat.change}</span>
                </div>
                <h3 className="text-gray-600 text-sm mb-1">{stat.title}</h3>
                <p className="text-gray-900">{stat.value}</p>
              </div>
            );
          })}
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-gray-900">Atividades Recentes</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600">{activity.user.charAt(0)}</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-900">
                      <span className="text-gray-900">{activity.user}</span>{' '}
                      <span className="text-gray-600">{activity.action}</span>
                    </p>
                    <p className="text-gray-400 text-sm">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
