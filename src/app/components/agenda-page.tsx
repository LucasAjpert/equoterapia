import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Calendar, X, Plus, Bell } from 'lucide-react';
import { AtendimentoPage } from './atendimento-page';

interface Evento {
  id: number;
  titulo: string;
  praticante?: string;
  horario: string;
  tipo: string;
  color: string;
  mediador?: string;
  lateral?: string;
  guia?: string;
  equino?: string;
}

interface AgendaPageProps {
  onHideSidebar?: (hide: boolean) => void;
  onNotificacoesClick?: () => void;
  pendenciasCount?: number;
}

export function AgendaPage({ onHideSidebar, onNotificacoesClick, pendenciasCount = 0 }: AgendaPageProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date(2024, 1, 1)); // Fevereiro 2024
  const [view, setView] = useState<'month' | 'day'>('month');
  const [selectedDay, setSelectedDay] = useState<Date | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvento, setSelectedEvento] = useState<Evento | null>(null);
  const [showAtendimento, setShowAtendimento] = useState(false);
  const [tipoServico, setTipoServico] = useState('atendimento');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedPraticante, setSelectedPraticante] = useState('');
  const [selectedMediador, setSelectedMediador] = useState('');
  const [selectedLateral, setSelectedLateral] = useState('');
  const [selectedGuia, setSelectedGuia] = useState('');
  const [selectedEquino, setSelectedEquino] = useState('');

  // Dados dos praticantes com informações completas
  const praticantesData = [
    { nome: 'FELIPE PEIXOTO', anoNascimento: 2010, cid: 'F84.0 - Autismo Infantil' },
    { nome: 'HENRY N. PAVÃO', anoNascimento: 2012, cid: 'G80.0 - Paralisia Cerebral' },
    { nome: 'GIOVANA PANIAGO', anoNascimento: 2015, cid: 'Q90 - Síndrome de Down' },
    { nome: 'HIAGO FÉLIX AYLA', anoNascimento: 2008, cid: 'F84.5 - Síndrome de Asperger' },
    { nome: 'ÂNGELO MIGUEL PERES', anoNascimento: 2013, cid: 'F70 - Retardo Mental Leve' },
    { nome: 'JOÃO PEDRO VIANA', anoNascimento: 2011, cid: 'F90.0 - TDAH' },
  ];

  // Dados dos equinos com informações completas
  const equinosData = [
    { 
      nome: 'Apolo', 
      peso: '450', 
      comprimentoPescoco: '75', 
      larguraTronco: '60', 
      alturaCernelha: '1.50', 
      alturaAnca: '1.52', 
      comprimento: '1.60',
      ferradura: 'sim'
    },
    { 
      nome: 'Trovão', 
      peso: '480', 
      comprimentoPescoco: '78', 
      larguraTronco: '62', 
      alturaCernelha: '1.55', 
      alturaAnca: '1.56', 
      comprimento: '1.65',
      ferradura: 'não'
    },
    { 
      nome: 'Relâmpago', 
      peso: '420', 
      comprimentoPescoco: '72', 
      larguraTronco: '58', 
      alturaCernelha: '1.48', 
      alturaAnca: '1.50', 
      comprimento: '1.58',
      ferradura: 'sim'
    },
    { 
      nome: 'Estrela', 
      peso: '400', 
      comprimentoPescoco: '70', 
      larguraTronco: '56', 
      alturaCernelha: '1.45', 
      alturaAnca: '1.47', 
      comprimento: '1.55',
      ferradura: 'não'
    },
    { 
      nome: 'Mel', 
      peso: '390', 
      comprimentoPescoco: '68', 
      larguraTronco: '55', 
      alturaCernelha: '1.42', 
      alturaAnca: '1.44', 
      comprimento: '1.52',
      ferradura: 'sim'
    },
  ];

  // Listas para os selects
  const praticantes = praticantesData.map(p => p.nome);

  const colaboradores = [
    'Vitória',
    'Jaqueline',
    'Lillian',
    'Mônica',
    'Cristieli',
    'Gabriel',
    'Jacques',
    'Silvana',
    'Lara',
    'Carol',
    'Victória',
    'Naira',
    'Kézia',
  ];

  const equinos = equinosData.map(e => e.nome);

  // Eventos do calendário
  const eventos: Evento[] = [
    { id: 1, titulo: 'Felipe Peixoto', praticante: 'FELIPE PEIXOTO', horario: '09:30', tipo: 'atendimento', color: 'bg-blue-400', mediador: 'Vitória', lateral: 'Jaqueline', guia: 'Lillian', equino: 'Apolo', dia: 5 },
    { id: 2, titulo: 'Henry Pavão', praticante: 'HENRY N. PAVÃO', horario: '10:30', tipo: 'atendimento', color: 'bg-green-400', mediador: 'Mônica', lateral: 'Cristieli', equino: 'Trovão', dia: 5 },
    { id: 3, titulo: 'Giovana Paniago', praticante: 'GIOVANA PANIAGO', horario: '14:00', tipo: 'atendimento', color: 'bg-purple-400', mediador: 'Gabriel', lateral: 'Jacques', equino: 'Relâmpago', dia: 5 },
    
    { id: 4, titulo: 'Hiago Ayla', praticante: 'HIAGO FÉLIX AYLA', horario: '08:00', tipo: 'atendimento', color: 'bg-pink-400', mediador: 'Silvana', lateral: 'Lara', equino: 'Estrela', dia: 6 },
    { id: 5, titulo: 'Ângelo Peres', praticante: 'ÂNGELO MIGUEL PERES', horario: '11:00', tipo: 'atendimento', color: 'bg-yellow-400', mediador: 'Carol', lateral: 'Victória', equino: 'Mel', dia: 6 },
    
    { id: 6, titulo: 'João Viana', praticante: 'JOÃO PEDRO VIANA', horario: '09:00', tipo: 'atendimento', color: 'bg-indigo-400', mediador: 'Naira', lateral: 'Kézia', equino: 'Apolo', dia: 7 },
    { id: 7, titulo: 'Felipe Peixoto', praticante: 'FELIPE PEIXOTO', horario: '15:00', tipo: 'atendimento', color: 'bg-blue-400', mediador: 'Vitória', lateral: 'Jaqueline', equino: 'Trovão', dia: 7 },

    { id: 8, titulo: 'Reunião Equipe', horario: '14:00', tipo: 'reuniao', color: 'bg-orange-400', dia: 12 },
    { id: 9, titulo: 'Henry Pavão', praticante: 'HENRY N. PAVÃO', horario: '10:00', tipo: 'atendimento', color: 'bg-green-400', mediador: 'Mônica', equino: 'Relâmpago', dia: 12 },
    
    { id: 10, titulo: 'Giovana Paniago', praticante: 'GIOVANA PANIAGO', horario: '08:30', tipo: 'atendimento', color: 'bg-purple-400', mediador: 'Gabriel', equino: 'Estrela', dia: 13 },
    { id: 11, titulo: 'Formação', horario: '16:00', tipo: 'formacao', color: 'bg-teal-400', dia: 13 },

    { id: 12, titulo: 'Hiago Ayla', praticante: 'HIAGO FÉLIX AYLA', horario: '09:30', tipo: 'atendimento', color: 'bg-pink-400', mediador: 'Silvana', equino: 'Mel', dia: 14 },
    { id: 13, titulo: 'Estudo de Caso', horario: '14:30', tipo: 'estudo-caso', color: 'bg-cyan-400', dia: 14 },

    { id: 14, titulo: 'Ângelo Peres', praticante: 'ÂNGELO MIGUEL PERES', horario: '10:30', tipo: 'atendimento', color: 'bg-yellow-400', mediador: 'Carol', equino: 'Apolo', dia: 19 },
    { id: 15, titulo: 'João Viana', praticante: 'JOÃO PEDRO VIANA', horario: '13:00', tipo: 'atendimento', color: 'bg-indigo-400', mediador: 'Naira', equino: 'Trovão', dia: 19 },
    { id: 16, titulo: 'Felipe Peixoto', praticante: 'FELIPE PEIXOTO', horario: '15:30', tipo: 'atendimento', color: 'bg-blue-400', mediador: 'Vitória', equino: 'Relâmpago', dia: 19 },

    { id: 17, titulo: 'Henry Pavão', praticante: 'HENRY N. PAVÃO', horario: '09:00', tipo: 'atendimento', color: 'bg-green-400', mediador: 'Mônica', equino: 'Estrela', dia: 20 },
    { id: 18, titulo: 'Giovana Paniago', praticante: 'GIOVANA PANIAGO', horario: '11:30', tipo: 'atendimento', color: 'bg-purple-400', mediador: 'Gabriel', equino: 'Mel', dia: 20 },

    { id: 19, titulo: 'Avaliação Inicial', horario: '10:00', tipo: 'avaliacao', color: 'bg-red-400', dia: 26 },
    { id: 20, titulo: 'Hiago Ayla', praticante: 'HIAGO FÉLIX AYLA', horario: '14:00', tipo: 'atendimento', color: 'bg-pink-400', mediador: 'Silvana', equino: 'Apolo', dia: 26 },

    { id: 21, titulo: 'Ângelo Peres', praticante: 'ÂNGELO MIGUEL PERES', horario: '08:30', tipo: 'atendimento', color: 'bg-yellow-400', mediador: 'Carol', equino: 'Trovão', dia: 27 },
    { id: 22, titulo: 'João Viana', praticante: 'JOÃO PEDRO VIANA', horario: '16:00', tipo: 'atendimento', color: 'bg-indigo-400', mediador: 'Naira', equino: 'Relâmpago', dia: 27 },
  ];

  // Adicionar propriedade dia aos eventos
  const eventosComDia = eventos.map(e => ({...e, dia: e.id <= 3 ? 5 : e.id <= 5 ? 6 : e.id <= 7 ? 7 : e.id <= 9 ? 12 : e.id <= 11 ? 13 : e.id <= 13 ? 14 : e.id <= 16 ? 19 : e.id <= 18 ? 20 : e.id <= 20 ? 26 : 27}));

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay(); // 0 = domingo

    const days = [];
    
    // Adicionar dias vazios do início
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Adicionar dias do mês
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }
    
    return days;
  };

  const getEventosForDay = (day: number | null) => {
    if (!day) return [];
    return eventos.filter(e => (e as any).dia === day);
  };

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const handleToday = () => {
    const today = new Date();
    setCurrentMonth(today);
    setSelectedDay(today);
    setView('day');
  };

  const handleViewMonth = () => {
    setView('month');
    setSelectedDay(null);
  };

  const handleDayClick = (day: number) => {
    const clickedDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    setSelectedDay(clickedDate);
    setView('day');
  };

  const getEventosForSelectedDay = () => {
    if (!selectedDay) return [];
    const day = selectedDay.getDate();
    return eventos.filter(e => (e as any).dia === day).sort((a, b) => a.horario.localeCompare(b.horario));
  };

  const monthNames = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
  const weekDays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
  const weekDaysFull = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];

  const handleOpenNewModal = () => {
    setSelectedEvento(null);
    setTipoServico('atendimento');
    setSelectedDate('');
    setSelectedTime('');
    setSelectedPraticante('');
    setSelectedMediador('');
    setSelectedLateral('');
    setSelectedGuia('');
    setSelectedEquino('');
    setIsModalOpen(true);
  };

  const handleOpenEventoModal = (evento: Evento) => {
    setSelectedEvento(evento);
    setTipoServico(evento.tipo);
    // Formatar data para o input (YYYY-MM-DD)
    if (selectedDay) {
      const year = selectedDay.getFullYear();
      const month = String(selectedDay.getMonth() + 1).padStart(2, '0');
      const day = String(selectedDay.getDate()).padStart(2, '0');
      setSelectedDate(`${year}-${month}-${day}`);
    }
    setSelectedTime(evento.horario);
    setSelectedPraticante(evento.praticante || '');
    setSelectedMediador(evento.mediador || '');
    setSelectedLateral(evento.lateral || '');
    setSelectedGuia(evento.guia || '');
    setSelectedEquino(evento.equino || '');
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(selectedEvento ? 'Agendamento atualizado' : 'Agendamento criado');
    setIsModalOpen(false);
  };

  const handleIniciar = () => {
    console.log('Atendimento iniciado:', selectedEvento);
    setIsModalOpen(false);
    setShowAtendimento(true);
  };

  const handleVoltarAtendimento = () => {
    setShowAtendimento(false);
    setView('day');
  };

  const getPraticanteDados = () => {
    if (!selectedEvento?.praticante) return null;
    return praticantesData.find(p => 
      p.nome.toUpperCase().includes(selectedEvento.praticante!.toUpperCase()) ||
      selectedEvento.praticante!.toUpperCase().includes(p.nome.toUpperCase())
    );
  };

  const getEquinoDados = () => {
    if (!selectedEvento?.equino) return null;
    return equinosData.find(e => 
      e.nome.toUpperCase() === selectedEvento.equino!.toUpperCase()
    );
  };

  const calcularIdade = (anoNascimento: number) => {
    const anoAtual = new Date().getFullYear();
    return anoAtual - anoNascimento;
  };

  // Efeito para controlar a visibilidade da sidebar
  useEffect(() => {
    if (onHideSidebar) {
      onHideSidebar(showAtendimento);
    }
  }, [showAtendimento, onHideSidebar]);

  return (
    <div className="flex-1 bg-gray-50 overflow-auto">
      {showAtendimento && selectedEvento ? (
        <AtendimentoPage 
          evento={selectedEvento}
          praticanteDados={getPraticanteDados()}
          equinoDados={getEquinoDados()}
          onVoltar={handleVoltarAtendimento}
        />
      ) : (
        <>
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-3 md:px-6 py-3 md:py-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          {/* Month Navigation */}
          <div className="flex items-center gap-2 flex-wrap">
            {view === 'month' && (
              <>
                <button 
                  onClick={handlePrevMonth}
                  className="p-1.5 md:p-2 hover:bg-gray-100 rounded-lg"
                >
                  <ChevronLeft className="w-4 h-4 md:w-5 md:h-5 text-gray-600" />
                </button>
                <button 
                  onClick={handleNextMonth}
                  className="p-1.5 md:p-2 hover:bg-gray-100 rounded-lg"
                >
                  <ChevronRight className="w-4 h-4 md:w-5 md:h-5 text-gray-600" />
                </button>
              </>
            )}
            <h2 className="text-base md:text-lg font-semibold text-gray-900 mx-1 md:mx-2">
              {view === 'day' && selectedDay 
                ? `${weekDaysFull[selectedDay.getDay()]}, ${selectedDay.getDate()} de ${monthNames[selectedDay.getMonth()]} ${selectedDay.getFullYear()}`
                : `${monthNames[currentMonth.getMonth()]} ${currentMonth.getFullYear()}`
              }
            </h2>
            
            {/* View Toggle Buttons */}
            <div className="flex gap-1 border border-gray-300 rounded-lg p-0.5">
              <button 
                onClick={handleToday}
                className={`px-2 md:px-3 py-1.5 md:py-2 rounded-md text-xs md:text-sm transition-colors ${
                  view === 'day' ? 'bg-blue-500 text-white' : 'hover:bg-gray-100 text-gray-700'
                }`}
              >
                Hoje
              </button>
              <button 
                onClick={handleViewMonth}
                className={`px-2 md:px-3 py-1.5 md:py-2 rounded-md text-xs md:text-sm transition-colors ${
                  view === 'month' ? 'bg-blue-500 text-white' : 'hover:bg-gray-100 text-gray-700'
                }`}
              >
                Mês
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={onNotificacoesClick}
              className="relative p-2 border border-gray-200 bg-white text-gray-600 rounded-lg hover:bg-gray-50 hover:text-indigo-600 transition-colors"
              title="Notificações e pendências"
            >
              <Bell className="w-5 h-5" />
              {pendenciasCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {pendenciasCount > 9 ? '9+' : pendenciasCount}
                </span>
              )}
            </button>
            <button
              onClick={handleOpenNewModal}
              className="px-4 md:px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm md:text-base flex-1 sm:flex-none flex items-center justify-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Agendar
            </button>
          </div>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="p-2 md:p-6">
        {view === 'month' ? (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          {/* Week Days Header */}
          <div className="grid grid-cols-7 border-b border-gray-200 bg-gray-50">
            {weekDays.map((day, index) => (
              <div
                key={index}
                className="p-2 md:p-3 text-center text-xs md:text-sm font-medium text-gray-600"
              >
                {day}
              </div>
            ))}
          </div>

          {/* Days Grid */}
          <div className="grid grid-cols-7">
            {getDaysInMonth(currentMonth).map((day, index) => {
              const dayEventos = getEventosForDay(day);
              const isToday = day === new Date().getDate() && 
                            currentMonth.getMonth() === new Date().getMonth() &&
                            currentMonth.getFullYear() === new Date().getFullYear();
              
              return (
                <div
                  key={index}
                  onClick={() => day && handleDayClick(day)}
                  className={`min-h-[80px] md:min-h-[120px] border-r border-b border-gray-200 p-1 md:p-2 ${
                    !day ? 'bg-gray-50' : 'bg-white hover:bg-gray-50 cursor-pointer'
                  } ${index % 7 === 6 ? 'border-r-0' : ''}`}
                >
                  {day && (
                    <>
                      <div className="flex justify-between items-start mb-1">
                        <span className={`text-xs md:text-sm font-medium ${
                          isToday ? 'bg-blue-500 text-white w-5 h-5 md:w-6 md:h-6 rounded-full flex items-center justify-center text-xs' : 'text-gray-700'
                        }`}>
                          {day}
                        </span>
                        {dayEventos.length > 0 && (
                          <span className="text-[10px] md:text-xs text-gray-500 bg-gray-100 px-1 md:px-1.5 py-0.5 rounded">
                            {dayEventos.length}
                          </span>
                        )}
                      </div>
                      
                      <div className="space-y-0.5 md:space-y-1">
                        {dayEventos.slice(0, 3).map((evento) => (
                          <div
                            key={evento.id}
                            className={`${evento.color} text-white rounded px-1 md:px-2 py-0.5 md:py-1 hover:opacity-90 transition-opacity`}
                            title={`${evento.horario} - ${evento.titulo}`}
                          >
                            <div className="text-[10px] md:text-xs font-medium truncate">
                              {evento.horario}
                            </div>
                            <div className="text-[9px] md:text-xs truncate">
                              {evento.titulo}
                            </div>
                          </div>
                        ))}
                        {dayEventos.length > 3 && (
                          <div className="text-[9px] md:text-xs text-gray-500 px-1 md:px-2">
                            +{dayEventos.length - 3} mais
                          </div>
                        )}
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>
        ) : (
          /* Day View */
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-4 md:p-6">
              {getEventosForSelectedDay().length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  <Calendar className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                  <p className="text-sm md:text-base">Nenhum evento agendado para este dia</p>
                </div>
              ) : (
                <div className="space-y-3 md:space-y-4">
                  {getEventosForSelectedDay().map((evento) => (
                    <div
                      key={evento.id}
                      onClick={() => handleOpenEventoModal(evento)}
                      className="border border-gray-200 rounded-lg p-3 md:p-4 hover:shadow-md transition-shadow cursor-pointer"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className={`${evento.color} text-white px-3 py-1 rounded-md text-xs md:text-sm font-medium`}>
                              {evento.horario}
                            </span>
                            <span className="text-xs md:text-sm text-gray-500 capitalize">
                              {evento.tipo.replace('-', ' ')}
                            </span>
                          </div>
                          
                          <h3 className="text-base md:text-lg text-gray-900 mb-2">
                            {evento.titulo}
                          </h3>
                          
                          {evento.tipo === 'atendimento' && (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs md:text-sm text-gray-600">
                              {evento.praticante && (
                                <div>
                                  <span className="font-medium">Praticante:</span> {evento.praticante}
                                </div>
                              )}
                              {evento.mediador && (
                                <div>
                                  <span className="font-medium">Mediador:</span> {evento.mediador}
                                </div>
                              )}
                              {evento.lateral && (
                                <div>
                                  <span className="font-medium">Lateral:</span> {evento.lateral}
                                </div>
                              )}
                              {evento.guia && (
                                <div>
                                  <span className="font-medium">Guia:</span> {evento.guia}
                                </div>
                              )}
                              {evento.equino && (
                                <div>
                                  <span className="font-medium">Equino:</span> {evento.equino}
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Modal Agendar */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50 p-2 md:p-4"
          onClick={() => setIsModalOpen(false)}
        >
          <div 
            className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[95vh] md:max-h-[90vh] overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 md:p-6 border-b border-gray-200 sticky top-0 bg-white z-10">
              <h2 className="text-lg md:text-xl text-gray-900">
                {selectedEvento ? 'Detalhes do Agendamento' : 'Novo Agendamento'}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-4 md:p-6">
              <form onSubmit={handleSubmit} className="space-y-3 md:space-y-4">
                {/* Tipo de Serviço */}
                <div>
                  <label className="block text-gray-700 mb-2 text-sm md:text-base">
                    Tipo de Serviço *
                  </label>
                  <select
                    value={tipoServico}
                    onChange={(e) => setTipoServico(e.target.value)}
                    className="w-full px-3 md:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm md:text-base"
                  >
                    <option value="atendimento">Atendimento</option>
                    <option value="reuniao">Reunião</option>
                    <option value="trato-equino">Trato Equino</option>
                    <option value="evento">Evento</option>
                    <option value="feriado">Feriado</option>
                    <option value="facultativo">Facultativo</option>
                    <option value="formacao">Formação</option>
                    <option value="estudo-caso">Estudo de Caso</option>
                    <option value="avaliacao-inicial">Avaliação Inicial</option>
                    <option value="atividade-internas">Atividade Internas</option>
                  </select>
                </div>

                {/* Data e Horário */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                  <div>
                    <label className="block text-gray-700 mb-2 text-sm md:text-base">
                      Data *
                    </label>
                    <input
                      type="date"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      className="w-full px-3 md:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm md:text-base"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2 text-sm md:text-base">
                      Horário *
                    </label>
                    <input
                      type="time"
                      value={selectedTime}
                      onChange={(e) => setSelectedTime(e.target.value)}
                      className="w-full px-3 md:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm md:text-base"
                      required
                    />
                  </div>
                </div>

                {/* Praticante */}
                {tipoServico === 'atendimento' && (
                  <div>
                    <label className="block text-gray-700 mb-2 text-sm md:text-base">
                      Praticante *
                    </label>
                    <select
                      value={selectedPraticante}
                      onChange={(e) => setSelectedPraticante(e.target.value)}
                      className="w-full px-3 md:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm md:text-base"
                      required
                    >
                      <option value="">Selecione</option>
                      {praticantes.map((p) => (
                        <option key={p} value={p}>{p}</option>
                      ))}
                    </select>
                  </div>
                )}

                {/* Colaboradores */}
                {tipoServico === 'atendimento' && (
                  <>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4">
                      <div>
                        <label className="block text-gray-700 mb-2 text-sm md:text-base">
                          Mediador
                        </label>
                        <select
                          value={selectedMediador}
                          onChange={(e) => setSelectedMediador(e.target.value)}
                          className="w-full px-3 md:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm md:text-base"
                        >
                          <option value="">Selecione</option>
                          {colaboradores.map((c) => (
                            <option key={c} value={c}>{c}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-gray-700 mb-2 text-sm md:text-base">
                          Lateral
                        </label>
                        <select
                          value={selectedLateral}
                          onChange={(e) => setSelectedLateral(e.target.value)}
                          className="w-full px-3 md:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm md:text-base"
                        >
                          <option value="">Selecione</option>
                          {colaboradores.map((c) => (
                            <option key={c} value={c}>{c}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-gray-700 mb-2 text-sm md:text-base">
                          Guia
                        </label>
                        <select
                          value={selectedGuia}
                          onChange={(e) => setSelectedGuia(e.target.value)}
                          className="w-full px-3 md:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm md:text-base"
                        >
                          <option value="">Selecione</option>
                          {colaboradores.map((c) => (
                            <option key={c} value={c}>{c}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Equino */}
                    <div>
                      <label className="block text-gray-700 mb-2 text-sm md:text-base">
                        Equino
                      </label>
                      <select
                        value={selectedEquino}
                        onChange={(e) => setSelectedEquino(e.target.value)}
                        className="w-full px-3 md:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm md:text-base"
                      >
                        <option value="">Selecione</option>
                        {equinos.map((e) => (
                          <option key={e} value={e}>{e}</option>
                        ))}
                      </select>
                    </div>
                  </>
                )}

                {/* Buttons */}
                <div className="flex gap-3 justify-end pt-4">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 md:px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm md:text-base"
                  >
                    Cancelar
                  </button>
                  {selectedEvento && selectedEvento.tipo === 'atendimento' && (
                    <button
                      type="button"
                      onClick={handleIniciar}
                      className="px-4 md:px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-sm md:text-base"
                    >
                      Iniciar
                    </button>
                  )}
                  <button
                    type="submit"
                    className="px-4 md:px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm md:text-base"
                  >
                    {selectedEvento ? 'Salvar' : 'Agendar'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
        </>
      )}
    </div>
  );
}