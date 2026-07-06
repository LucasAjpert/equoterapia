import { useState } from 'react';
import { Bell, Clock, CheckCircle, X, AlertCircle, User, Rabbit, Users, Calendar, ChevronRight, XCircle } from 'lucide-react';

interface Pendencia {
  id: number;
  tipo: 'atendimento';
  praticante: string;
  horario: string;
  data: string;
  mediador: string;
  equino: string;
  lateral?: string;
  guia?: string;
  status: 'aberto';
}

interface EncerrarModalState {
  pendencia: Pendencia | null;
  open: boolean;
}

interface NotificacoesPageProps {
  pendencias: Pendencia[];
  onEncerrar: (id: number, observacao: string) => void;
}

export function NotificacoesPage({ pendencias, onEncerrar }: NotificacoesPageProps) {
  const [encerrarModal, setEncerrarModal] = useState<EncerrarModalState>({ pendencia: null, open: false });
  const [observacao, setObservacao] = useState('');
  const [filter, setFilter] = useState<'todos' | 'hoje' | 'semana'>('todos');

  const hoje = new Date().toLocaleDateString('pt-BR');

  const filtered = pendencias.filter(p => {
    if (filter === 'hoje') return p.data === hoje;
    if (filter === 'semana') {
      const d = new Date(p.data.split('/').reverse().join('-'));
      const now = new Date();
      const diff = (now.getTime() - d.getTime()) / (1000 * 60 * 60 * 24);
      return diff <= 7;
    }
    return true;
  });

  const handleOpenEncerrar = (p: Pendencia) => {
    setEncerrarModal({ pendencia: p, open: true });
    setObservacao('');
  };

  const handleConfirmarEncerramento = () => {
    if (encerrarModal.pendencia) {
      onEncerrar(encerrarModal.pendencia.id, observacao);
      setEncerrarModal({ pendencia: null, open: false });
      setObservacao('');
    }
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="relative">
            <Bell className="w-8 h-8 text-indigo-600" />
            {pendencias.length > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
                {pendencias.length}
              </span>
            )}
          </div>
          <h1 className="text-gray-900">Notificações e Pendências</h1>
        </div>
        <p className="text-gray-600">Atendimentos em aberto aguardando encerramento</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-lg border border-gray-200 p-4 flex items-center gap-4">
          <div className="p-3 bg-red-100 rounded-lg">
            <AlertCircle className="w-6 h-6 text-red-600" />
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-900">{pendencias.length}</p>
            <p className="text-sm text-gray-500">Em aberto</p>
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4 flex items-center gap-4">
          <div className="p-3 bg-orange-100 rounded-lg">
            <Clock className="w-6 h-6 text-orange-600" />
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-900">
              {pendencias.filter(p => p.data === hoje).length}
            </p>
            <p className="text-sm text-gray-500">De hoje</p>
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4 flex items-center gap-4">
          <div className="p-3 bg-indigo-100 rounded-lg">
            <Calendar className="w-6 h-6 text-indigo-600" />
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-900">
              {pendencias.filter(p => {
                const d = new Date(p.data.split('/').reverse().join('-'));
                const now = new Date();
                return (now.getTime() - d.getTime()) / (1000 * 60 * 60 * 24) <= 7;
              }).length}
            </p>
            <p className="text-sm text-gray-500">Últimos 7 dias</p>
          </div>
        </div>
      </div>

      {/* Filtros */}
      <div className="flex gap-2 mb-6">
        {(['todos', 'hoje', 'semana'] as const).map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === f
                ? 'bg-indigo-600 text-white'
                : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
            }`}
          >
            {f === 'todos' ? 'Todos' : f === 'hoje' ? 'Hoje' : 'Últimos 7 dias'}
          </button>
        ))}
      </div>

      {/* Lista de pendências */}
      <div className="space-y-3">
        {filtered.length === 0 && (
          <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
            <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
            <p className="text-gray-700 font-medium">Nenhuma pendência encontrada</p>
            <p className="text-gray-500 text-sm mt-1">Todos os atendimentos estão encerrados</p>
          </div>
        )}

        {filtered.map(p => (
          <div
            key={p.id}
            className="bg-white rounded-lg border border-l-4 border-gray-200 border-l-red-400 p-5 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-4 flex-1">
                {/* Ícone status */}
                <div className="p-2 bg-red-50 rounded-lg flex-shrink-0 mt-0.5">
                  <AlertCircle className="w-5 h-5 text-red-500" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <h3 className="text-gray-900 font-semibold">{p.praticante}</h3>
                    <span className="px-2 py-0.5 bg-red-100 text-red-700 text-xs rounded-full font-medium">
                      Em aberto
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-1 text-sm text-gray-600">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                      <span>{p.data}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                      <span>{p.horario}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                      <span className="truncate">{p.mediador}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Rabbit className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                      <span className="truncate">{p.equino}</span>
                    </div>
                    {p.lateral && (
                      <div className="flex items-center gap-1.5">
                        <Users className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                        <span className="truncate">Lateral: {p.lateral}</span>
                      </div>
                    )}
                    {p.guia && (
                      <div className="flex items-center gap-1.5">
                        <Users className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                        <span className="truncate">Guia: {p.guia}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Botão encerrar */}
              <button
                onClick={() => handleOpenEncerrar(p)}
                className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white text-sm rounded-lg hover:bg-indigo-700 transition-colors flex-shrink-0"
              >
                <CheckCircle className="w-4 h-4" />
                Encerrar
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal de encerramento */}
      {encerrarModal.open && encerrarModal.pendencia && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-indigo-100 rounded-lg">
                  <XCircle className="w-5 h-5 text-indigo-600" />
                </div>
                <h2 className="text-gray-900 font-semibold">Encerrar Atendimento</h2>
              </div>
              <button
                onClick={() => setEncerrarModal({ pendencia: null, open: false })}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              {/* Resumo do atendimento */}
              <div className="bg-gray-50 rounded-lg p-4 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Praticante</span>
                  <span className="text-gray-900 font-medium">{encerrarModal.pendencia.praticante}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Data</span>
                  <span className="text-gray-900">{encerrarModal.pendencia.data}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Horário</span>
                  <span className="text-gray-900">{encerrarModal.pendencia.horario}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Mediador</span>
                  <span className="text-gray-900">{encerrarModal.pendencia.mediador}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Equino</span>
                  <span className="text-gray-900">{encerrarModal.pendencia.equino}</span>
                </div>
              </div>

              {/* Observação de encerramento */}
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  Observação de encerramento <span className="text-gray-400 font-normal">(opcional)</span>
                </label>
                <textarea
                  value={observacao}
                  onChange={(e) => setObservacao(e.target.value)}
                  rows={3}
                  placeholder="Descreva como foi o atendimento ou motivo do encerramento..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none text-sm"
                />
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 flex gap-3 justify-end">
              <button
                onClick={() => setEncerrarModal({ pendencia: null, open: false })}
                className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors text-sm"
              >
                Cancelar
              </button>
              <button
                onClick={handleConfirmarEncerramento}
                className="px-5 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm flex items-center gap-2"
              >
                <CheckCircle className="w-4 h-4" />
                Confirmar Encerramento
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export type { Pendencia };
