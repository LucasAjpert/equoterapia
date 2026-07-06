import { useState } from 'react';
import { FileText, Download, Printer, Calendar, Filter, FileSpreadsheet } from 'lucide-react';

type TipoRelatorio = 
  | 'equinos' 
  | 'funcionarios' 
  | 'praticantes' 
  | 'agenda' 
  | 'documentos' 
  | 'atendimentos' 
  | 'exames' 
  | 'cadastros';

interface RelatorioOption {
  id: TipoRelatorio;
  nome: string;
  descricao: string;
  icon: React.ReactNode;
}

export function RelatoriosPage() {
  const [tipoRelatorioSelecionado, setTipoRelatorioSelecionado] = useState<TipoRelatorio>('equinos');
  const [dataInicio, setDataInicio] = useState('');
  const [dataFim, setDataFim] = useState('');
  const [relatorioGerado, setRelatorioGerado] = useState(false);

  const relatorios: RelatorioOption[] = [
    {
      id: 'equinos',
      nome: 'Equinos',
      descricao: 'Relatório completo de equinos cadastrados',
      icon: <FileText className="w-6 h-6" />,
    },
    {
      id: 'funcionarios',
      nome: 'Funcionários',
      descricao: 'Relatório de colaboradores e funcionários',
      icon: <FileText className="w-6 h-6" />,
    },
    {
      id: 'praticantes',
      nome: 'Praticantes',
      descricao: 'Relatório de praticantes cadastrados',
      icon: <FileText className="w-6 h-6" />,
    },
    {
      id: 'agenda',
      nome: 'Agenda',
      descricao: 'Relatório de agendamentos por período',
      icon: <Calendar className="w-6 h-6" />,
    },
    {
      id: 'documentos',
      nome: 'Documentos',
      descricao: 'Relatório de documentos emitidos',
      icon: <FileSpreadsheet className="w-6 h-6" />,
    },
    {
      id: 'atendimentos',
      nome: 'Atendimentos',
      descricao: 'Relatório de atendimentos realizados',
      icon: <FileText className="w-6 h-6" />,
    },
    {
      id: 'exames',
      nome: 'Exames',
      descricao: 'Relatório de exames e avaliações',
      icon: <FileText className="w-6 h-6" />,
    },
    {
      id: 'cadastros',
      nome: 'Cadastros',
      descricao: 'Relatório geral de cadastros',
      icon: <FileText className="w-6 h-6" />,
    },
  ];

  const handleGerarRelatorio = () => {
    if (!dataInicio || !dataFim) {
      alert('Por favor, selecione as datas de início e fim.');
      return;
    }

    // Simulação de geração de relatório
    setRelatorioGerado(true);
    console.log('Gerando relatório:', {
      tipo: tipoRelatorioSelecionado,
      dataInicio,
      dataFim,
    });
  };

  const handleExportar = (formato: 'pdf' | 'excel') => {
    alert(`Exportando relatório em formato ${formato.toUpperCase()}`);
  };

  const handleImprimir = () => {
    window.print();
  };

  // Dados mockados para exemplo
  const dadosRelatorio = {
    equinos: [
      { id: 1, nome: 'Apolo', idade: '8 anos', status: 'Ativo', ultimaUso: '20/01/2024' },
      { id: 2, nome: 'Trovão', idade: '10 anos', status: 'Ativo', ultimaUso: '19/01/2024' },
      { id: 3, nome: 'Estrela', idade: '7 anos', status: 'Ativo', ultimaUso: '18/01/2024' },
      { id: 4, nome: 'Mel', idade: '9 anos', status: 'Ativo', ultimaUso: '20/01/2024' },
      { id: 5, nome: 'Relâmpago', idade: '6 anos', status: 'Ativo', ultimaUso: '19/01/2024' },
    ],
    funcionarios: [
      { id: 1, nome: 'Vitória Silva', cargo: 'Mediadora', dataAdmissao: '01/02/2020' },
      { id: 2, nome: 'Mônica Santos', cargo: 'Mediadora', dataAdmissao: '15/03/2019' },
      { id: 3, nome: 'Jaqueline Costa', cargo: 'Lateral', dataAdmissao: '10/05/2021' },
      { id: 4, nome: 'Gabriel Oliveira', cargo: 'Guia', dataAdmissao: '20/08/2022' },
      { id: 5, nome: 'Lillian Ferreira', cargo: 'Guia', dataAdmissao: '05/01/2023' },
    ],
    praticantes: [
      { id: 1, nome: 'FELIPE PEIXOTO', patologia: 'ECNP', dataInicio: '10/03/2023', status: 'Ativo' },
      { id: 2, nome: 'HENRY N. PAVÃO', patologia: 'TEA', dataInicio: '15/04/2023', status: 'Ativo' },
      { id: 3, nome: 'GIOVANA PANIAGO', patologia: 'SIND. CIDRU-CHAT', dataInicio: '20/05/2023', status: 'Ativo' },
      { id: 4, nome: 'HIAGO FÉLIX AYLA', patologia: 'PC', dataInicio: '05/06/2023', status: 'Ativo' },
      { id: 5, nome: 'ÂNGELO MIGUEL PERES', patologia: 'TEA', dataInicio: '12/07/2023', status: 'Ativo' },
    ],
    agenda: [
      { id: 1, data: '18/09/2023', horario: '07:30', praticante: 'FELIPE PEIXOTO', mediador: 'Vitória', equino: 'Apolo' },
      { id: 2, data: '18/09/2023', horario: '08:10', praticante: 'HENRY N. PAVÃO', mediador: 'Mônica', equino: 'Trovão' },
      { id: 3, data: '19/09/2023', horario: '07:30', praticante: 'GIOVANA PANIAGO', mediador: 'Lillian', equino: 'Estrela' },
      { id: 4, data: '19/09/2023', horario: '08:10', praticante: 'HIAGO FÉLIX AYLA', mediador: 'Jacques', equino: 'Mel' },
      { id: 5, data: '20/09/2023', horario: '07:30', praticante: 'ÂNGELO MIGUEL PERES', mediador: 'Mônica', equino: 'Apolo' },
    ],
    documentos: [
      { id: 1, tipo: 'Reavaliação', praticante: 'FELIPE PEIXOTO', data: '15/01/2024', status: 'Emitido' },
      { id: 2, tipo: 'Mediador Inicial', praticante: 'HENRY N. PAVÃO', data: '18/01/2024', status: 'Emitido' },
      { id: 3, tipo: 'Mudança de Mediação', praticante: 'GIOVANA PANIAGO', data: '20/01/2024', status: 'Pendente' },
    ],
    atendimentos: [
      { id: 1, data: '18/01/2024', praticante: 'FELIPE PEIXOTO', mediador: 'Vitória', duracao: '40 min', observacao: 'Sessão produtiva' },
      { id: 2, data: '18/01/2024', praticante: 'HENRY N. PAVÃO', mediador: 'Mônica', duracao: '40 min', observacao: 'Boa evolução' },
      { id: 3, data: '19/01/2024', praticante: 'GIOVANA PANIAGO', mediador: 'Lillian', duracao: '40 min', observacao: 'Excelente participação' },
    ],
    exames: [
      { id: 1, praticante: 'FELIPE PEIXOTO', tipo: 'Avaliação Inicial', data: '10/03/2023', resultado: 'Aprovado' },
      { id: 2, praticante: 'HENRY N. PAVÃO', tipo: 'Reavaliação Semestral', data: '15/10/2023', resultado: 'Em progresso' },
      { id: 3, praticante: 'GIOVANA PANIAGO', tipo: 'Avaliação Trimestral', data: '20/08/2023', resultado: 'Aprovado' },
    ],
    cadastros: [
      { id: 1, tipo: 'Praticante', nome: 'FELIPE PEIXOTO', dataCadastro: '10/03/2023' },
      { id: 2, tipo: 'Colaborador', nome: 'Vitória Silva', dataCadastro: '01/02/2020' },
      { id: 3, tipo: 'Equino', nome: 'Apolo', dataCadastro: '15/01/2019' },
    ],
  };

  const renderTabelaRelatorio = () => {
    if (!relatorioGerado) return null;

    const dados = dadosRelatorio[tipoRelatorioSelecionado];

    switch (tipoRelatorioSelecionado) {
      case 'equinos':
        return (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100 border-b-2 border-gray-300">
                  <th className="text-left p-3 text-gray-700">Nome</th>
                  <th className="text-left p-3 text-gray-700">Idade</th>
                  <th className="text-left p-3 text-gray-700">Status</th>
                  <th className="text-left p-3 text-gray-700">Último Uso</th>
                </tr>
              </thead>
              <tbody>
                {dados.map((item: any) => (
                  <tr key={item.id} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="p-3 text-gray-800">{item.nome}</td>
                    <td className="p-3 text-gray-600">{item.idade}</td>
                    <td className="p-3">
                      <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-sm">
                        {item.status}
                      </span>
                    </td>
                    <td className="p-3 text-gray-600">{item.ultimaUso}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );

      case 'funcionarios':
        return (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100 border-b-2 border-gray-300">
                  <th className="text-left p-3 text-gray-700">Nome</th>
                  <th className="text-left p-3 text-gray-700">Cargo</th>
                  <th className="text-left p-3 text-gray-700">Data Admissão</th>
                </tr>
              </thead>
              <tbody>
                {dados.map((item: any) => (
                  <tr key={item.id} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="p-3 text-gray-800">{item.nome}</td>
                    <td className="p-3 text-gray-600">{item.cargo}</td>
                    <td className="p-3 text-gray-600">{item.dataAdmissao}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );

      case 'praticantes':
        return (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100 border-b-2 border-gray-300">
                  <th className="text-left p-3 text-gray-700">Nome</th>
                  <th className="text-left p-3 text-gray-700">Patologia</th>
                  <th className="text-left p-3 text-gray-700">Data Início</th>
                  <th className="text-left p-3 text-gray-700">Status</th>
                </tr>
              </thead>
              <tbody>
                {dados.map((item: any) => (
                  <tr key={item.id} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="p-3 text-gray-800">{item.nome}</td>
                    <td className="p-3 text-gray-600">{item.patologia}</td>
                    <td className="p-3 text-gray-600">{item.dataInicio}</td>
                    <td className="p-3">
                      <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-sm">
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );

      case 'agenda':
        return (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100 border-b-2 border-gray-300">
                  <th className="text-left p-3 text-gray-700">Data</th>
                  <th className="text-left p-3 text-gray-700">Horário</th>
                  <th className="text-left p-3 text-gray-700">Praticante</th>
                  <th className="text-left p-3 text-gray-700">Mediador</th>
                  <th className="text-left p-3 text-gray-700">Equino</th>
                </tr>
              </thead>
              <tbody>
                {dados.map((item: any) => (
                  <tr key={item.id} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="p-3 text-gray-800">{item.data}</td>
                    <td className="p-3 text-gray-600">{item.horario}</td>
                    <td className="p-3 text-gray-800">{item.praticante}</td>
                    <td className="p-3 text-gray-600">{item.mediador}</td>
                    <td className="p-3 text-gray-600">{item.equino}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );

      case 'documentos':
        return (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100 border-b-2 border-gray-300">
                  <th className="text-left p-3 text-gray-700">Tipo</th>
                  <th className="text-left p-3 text-gray-700">Praticante</th>
                  <th className="text-left p-3 text-gray-700">Data</th>
                  <th className="text-left p-3 text-gray-700">Status</th>
                </tr>
              </thead>
              <tbody>
                {dados.map((item: any) => (
                  <tr key={item.id} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="p-3 text-gray-800">{item.tipo}</td>
                    <td className="p-3 text-gray-600">{item.praticante}</td>
                    <td className="p-3 text-gray-600">{item.data}</td>
                    <td className="p-3">
                      <span className={`px-2 py-1 rounded text-sm ${
                        item.status === 'Emitido' 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );

      case 'atendimentos':
        return (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100 border-b-2 border-gray-300">
                  <th className="text-left p-3 text-gray-700">Data</th>
                  <th className="text-left p-3 text-gray-700">Praticante</th>
                  <th className="text-left p-3 text-gray-700">Mediador</th>
                  <th className="text-left p-3 text-gray-700">Duração</th>
                  <th className="text-left p-3 text-gray-700">Observação</th>
                </tr>
              </thead>
              <tbody>
                {dados.map((item: any) => (
                  <tr key={item.id} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="p-3 text-gray-800">{item.data}</td>
                    <td className="p-3 text-gray-800">{item.praticante}</td>
                    <td className="p-3 text-gray-600">{item.mediador}</td>
                    <td className="p-3 text-gray-600">{item.duracao}</td>
                    <td className="p-3 text-gray-600">{item.observacao}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );

      case 'exames':
        return (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100 border-b-2 border-gray-300">
                  <th className="text-left p-3 text-gray-700">Praticante</th>
                  <th className="text-left p-3 text-gray-700">Tipo</th>
                  <th className="text-left p-3 text-gray-700">Data</th>
                  <th className="text-left p-3 text-gray-700">Resultado</th>
                </tr>
              </thead>
              <tbody>
                {dados.map((item: any) => (
                  <tr key={item.id} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="p-3 text-gray-800">{item.praticante}</td>
                    <td className="p-3 text-gray-600">{item.tipo}</td>
                    <td className="p-3 text-gray-600">{item.data}</td>
                    <td className="p-3">
                      <span className={`px-2 py-1 rounded text-sm ${
                        item.resultado === 'Aprovado' 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-blue-100 text-blue-700'
                      }`}>
                        {item.resultado}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );

      case 'cadastros':
        return (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100 border-b-2 border-gray-300">
                  <th className="text-left p-3 text-gray-700">Tipo</th>
                  <th className="text-left p-3 text-gray-700">Nome</th>
                  <th className="text-left p-3 text-gray-700">Data Cadastro</th>
                </tr>
              </thead>
              <tbody>
                {dados.map((item: any) => (
                  <tr key={item.id} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="p-3 text-gray-800">{item.tipo}</td>
                    <td className="p-3 text-gray-600">{item.nome}</td>
                    <td className="p-3 text-gray-600">{item.dataCadastro}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="flex-1 bg-gray-50 overflow-auto">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <h1 className="text-gray-900 text-2xl">Relatórios</h1>
        <p className="text-gray-600 text-sm mt-1">Gere e exporte relatórios detalhados do sistema</p>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Seleção de Tipo de Relatório */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <div className="flex items-center gap-2 mb-4">
                <Filter className="w-5 h-5 text-blue-500" />
                <h2 className="text-gray-800 text-lg">Tipo de Relatório</h2>
              </div>
              
              <div className="space-y-2">
                {relatorios.map((relatorio) => (
                  <button
                    key={relatorio.id}
                    onClick={() => {
                      setTipoRelatorioSelecionado(relatorio.id);
                      setRelatorioGerado(false);
                    }}
                    className={`w-full text-left p-3 rounded-lg transition-all ${
                      tipoRelatorioSelecionado === relatorio.id
                        ? 'bg-blue-50 border-2 border-blue-500 shadow-sm'
                        : 'bg-gray-50 border-2 border-transparent hover:bg-gray-100'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`${
                        tipoRelatorioSelecionado === relatorio.id ? 'text-blue-500' : 'text-gray-400'
                      }`}>
                        {relatorio.icon}
                      </div>
                      <div className="flex-1">
                        <div className={`${
                          tipoRelatorioSelecionado === relatorio.id ? 'text-blue-700' : 'text-gray-800'
                        }`}>
                          {relatorio.nome}
                        </div>
                        <div className="text-gray-500 text-xs mt-1">
                          {relatorio.descricao}
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Filtros e Resultado */}
          <div className="lg:col-span-2">
            {/* Filtros */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
              <div className="flex items-center gap-2 mb-4">
                <Calendar className="w-5 h-5 text-blue-500" />
                <h2 className="text-gray-800 text-lg">Filtros</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-gray-700 mb-2">
                    Data Início *
                  </label>
                  <input
                    type="date"
                    value={dataInicio}
                    onChange={(e) => setDataInicio(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-2">
                    Data Fim *
                  </label>
                  <input
                    type="date"
                    value={dataFim}
                    onChange={(e) => setDataFim(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={handleGerarRelatorio}
                  className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2"
                >
                  <FileText className="w-4 h-4" />
                  Gerar Relatório
                </button>

                {relatorioGerado && (
                  <>
                    <button
                      onClick={() => handleExportar('pdf')}
                      className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors flex items-center gap-2"
                    >
                      <Download className="w-4 h-4" />
                      PDF
                    </button>
                    <button
                      onClick={() => handleExportar('excel')}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
                    >
                      <Download className="w-4 h-4" />
                      Excel
                    </button>
                    <button
                      onClick={handleImprimir}
                      className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors flex items-center gap-2"
                    >
                      <Printer className="w-4 h-4" />
                      Imprimir
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* Resultado do Relatório */}
            {relatorioGerado && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-gray-800 text-lg">
                    Relatório de {relatorios.find(r => r.id === tipoRelatorioSelecionado)?.nome}
                  </h2>
                  <div className="text-sm text-gray-500">
                    Período: {dataInicio} até {dataFim}
                  </div>
                </div>

                {renderTabelaRelatorio()}

                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="text-gray-600 text-sm">
                    Total de registros: {dadosRelatorio[tipoRelatorioSelecionado]?.length || 0}
                  </div>
                </div>
              </div>
            )}

            {!relatorioGerado && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
                <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-gray-600 mb-2">Nenhum relatório gerado</h3>
                <p className="text-gray-400 text-sm">
                  Selecione o período e clique em "Gerar Relatório" para visualizar os dados
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
