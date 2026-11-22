import { useState, useEffect } from 'react';
import { Upload, FileText, Download, Trash2, Eye, Search, X } from 'lucide-react';
import { Checkbox } from "./ui/checkbox";
import { Textarea } from "./ui/textarea";
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';
import { ModalParecerMedico } from './documentos/ModalParecerMedico';
import { ModalAlta } from './documentos/ModalAlta';
import { ModalParecer } from './documentos/ModalParecer';
import { ModalReavaliacao } from './documentos/ModalReavaliacao';
import { ModalMudancaMediacao } from './documentos/ModalMudancaMediacao';
import { ModalMediadorInicial } from './documentos/ModalMediadorInicial';
import { ModalMudancaPrograma } from './documentos/ModalMudancaPrograma';
import { ModalEstudoCaso } from './documentos/ModalEstudoCaso';
import { ModalAvaliacaoAnatomica } from './documentos/ModalAvaliacaoAnatomica';
import { ModalAvaliacaoFuncional } from './documentos/ModalAvaliacaoFuncional';
import { ModalAvaliacaoInicialEstrutural } from './documentos/ModalAvaliacaoInicialEstrutural';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import {
  Documento,
  AvaliacaoInicialData,
  ReavaliacaoData,
  EstudoCasoData,
  MudancaMediacaoData,
  AltaData,
  MediadorInicialData,
  MudancaProgramaData,
  ParecerData,
  ParecerMedicoData,
  TerapiaItem 
} from '../../types/documentos.types';

const tiposDocumento = [
  'Avaliação inicial estrutural',
  'Avaliação inicial anatômica',
  'Avaliação inicial funcional',
  'Estudo de caso',
  'Relatório semestral',
  'Mediador inicial',
  'Mudança de mediação',
  'Mudança de programa e horário',
  'Reavaliação',
  'Alta',
  'Atestado de Comparecimento',
  'Parecer Médico',
];

const colaboradoresDisponiveis = [
  'Ana Silva - Fisioterapeuta',
  'Carlos Santos - Psicólogo',
  'Maria Oliveira - Terapeuta Ocupacional',
  'João Costa - Fonoaudiólogo',
  'Paula Lima - Educador Físico',
  'Pedro Alves - Mediador',
];

export function DocumentosPage() {
  const [documentos, setDocumentos] = useState<Documento[]>([
    {
      id: '1',
      tipo: 'Avaliação inicial funcional',
      praticante: 'João Silva',
      colaboradores: ['Ana Silva - Fisioterapeuta', 'Carlos Santos - Psicólogo'],
      dataGeracao: '15/12/2024',
    },
    {
      id: '2',
      tipo: 'Plano terapêutico',
      praticante: 'Maria Santos',
      colaboradores: ['Maria Oliveira - Terapeuta Ocupacional'],
      dataGeracao: '18/12/2024',
    },
  ]);

  const [tipoSelecionado, setTipoSelecionado] = useState('');
  const [pratcicanteNome, setPraticanteNome] = useState('');
  const [nomeSolicitante, setNomeSolicitante] = useState('');
  const [colaboradoresSelecionados, setColaboradoresSelecionados] = useState<string[]>([]);
  const [colaboradorParaAdicionar, setColaboradorParaAdicionar] = useState('');
  const [dataExecucao, setDataExecucao] = useState('');
  const [horarioExecucao, setHorarioExecucao] = useState('');
  const [filtroTipo, setFiltroTipo] = useState('');
  const [filtroPraticante, setFiltroPraticante] = useState('');

  // Estados para o modal de Avaliação Inicial estrutural
  const [showAvaliacaoInicialModal, setShowAvaliacaoInicialModal] = useState(false);
  const avaliacaoInicialVazio: AvaliacaoInicialData = {
    nomePraticante: '',
    idade: '',
    dataNascimento: '',
    diagnostico: '',
    encaminhadoPor: '',
    jaFezEquo: '',
    tempoFezEquo: '',
    tempoPausaEquo: '',
    jaAndouCavalo: '',
    tempoAndouCavalo: '',
    tempoPausaCavalo: '',
    possuiHistoricoTerapeutico: '',
    fisioterapia: { ativo: false, jaFezFaz: '', nome: '', tempo: '' },
    terapiaOcupacional: { ativo: false, nome: '', tempo: '' },
    fonoaudiologia: { ativo: false, nome: '', tempo: '' },
    psicologia: { ativo: false, nome: '', tempo: '' },
    educacaoFisica: { ativo: false, nome: '', tempo: '' },
    hidroterapia: { ativo: false, nome: '', tempo: '' },
    escola: { ativo: false, qualEscola: '', serie: '', reprovacoes: '', dificuldades: '' },
    medica: { ativo: false, qualArea: '', nome: '', tempo: '' },
    atividadeFisica: { ativo: false, qual: '', tempo: '' },
    rotinaMelhorHorario: '',
    outroHistorico: '',
    anamnese: {
      relacionamentoPais: { resposta: '', observacoes: '' },
      historiaGravidezAdocao: { resposta: '', observacoes: '' },
      gravidezPlanejada: { resposta: '', observacoes: '' },
    },
    desenvolvimentoLinguagem: {
      balbuciou:               { idade: '', obs: '' },
      sorrioRisadaSocial:      { idade: '', obs: '' },
      atencaoCompartilhada:    { idade: '', obs: '' },
      imitacao:                { idade: '', obs: '' },
      primeirasPalavras:       { idade: '', obs: '' },
      formouFrases:            { idade: '', obs: '' },
      comunicacaoFuncional:    { idade: '', obs: '' },
      obsGestaDesenvolvimento: '',
    },
    rotina: {
      matutino:   { segunda: '', terca: '', quarta: '', quinta: '', sexta: '', sabado: '' },
      vespertino: { segunda: '', terca: '', quarta: '', quinta: '', sexta: '', sabado: '' },
      noturno:    { segunda: '', terca: '', quarta: '', quinta: '', sexta: '', sabado: '' },
    },
    aspectosFisiologicos: {
      alimentacao: '',
      sono: '',
      interacaoSocial: '',
      tpm: '',
    },
    queixaObjetivo: {
      descricaoDemanda: '',
      historicodoenca: '',
      expectativaTratamento: '',
    },
    saudeFisica: {
      cardiaco: false,
      hipertenso: false,
      alergias: false,
      saudeFrágil: false,
      hivAids: false,
      etc: '',
    },
    desenvolvimentoMotor: {
      sustentouCabeca:       { idade: '', obs: '' },
      rolou:                 { idade: '', obs: '' },
      sentou:                { idade: '', obs: '' },
      engatinhou:            { idade: '', obs: '' },
      ficouEmPe:             { idade: '', obs: '' },
      andou:                 { idade: '', obs: '' },
      correu:                { idade: '', obs: '' },
      saltou:                { idade: '', obs: '' },
      controleEsfincteriano: { idade: '', obs: '' },
    },
    gestacao: {
      fezPreNatal:            { valor: '', obs: '' },
      semanasDias:            { valor: '', obs: '' },
      complicacoesGestacao:   { valor: '', obs: '' },
      usoMedicacaoGestacao:   { valor: '', obs: '' },
      usoAlcoolCigarro:       { valor: '', obs: '' },
      estresseGestacional:    { valor: '', obs: '' },
    },
    parto: {
      tipoParto:             { valor: '', obs: '' },
      complicacoesParto:     { valor: '', obs: '' },
      necessitouOxigenio:    { valor: '', obs: '' },
      utiNeonatal:           { valor: '', obs: '' },
      fezPosNatal:           { valor: '', obs: '' },
      complicacoesNeonatal:  { valor: '', obs: '' },
      ictericia:             { valor: '', obs: '' },
      pesoAoNascer:          { valor: '', obs: '' },
      apgar:                 { valor: '', obs: '' },
    },
    usaMedicamento: '',
    medicamentos: [{ medicacao: '', dosagem: '', horario: '', finalidade: '' }],
    comoFicaComMedicacao: '',
    comoFicaSemMedicacao: '',

    contraindicacoes: [
    { id: 'instabilidade', label: 'Instabilidade atlantoaxial: Comum em pessoas com Síndrome de Down (exige avaliação prévia por raio-X).', ativo: false, obs: '' },
    { id: 'alteracoesColuna', label: 'Alterações graves na coluna: Escoliose acentuada, espondilolistese e deformidades graves.', ativo: false, obs: '' },
    { id: 'alteracoesQuadril', label: 'Alterações no quadril: Luxação ou subluxação de quadril e deformidades articulares.', ativo: false, obs: '' },
    { id: 'quadrosNeurologicos', label: 'Quadros neurológicos descontrolados: Epilepsia/crises convulsivas e hipertensão.', ativo: false, obs: '' },
    { id: 'doencasDegenerativas', label: 'Doenças degenerativas avançadas: Como ELA ou distrofias musculares avançadas.', ativo: false, obs: '' },
    { id: 'condicoesRespiratorias', label: 'Condições respiratórias críticas: Traqueostomia, asma ou alergias severas.', ativo: false, obs: '' },
    { id: 'usoSondas', label: 'Uso de sondas: Sonda nasogástrica ou gastrostomia sem bóton de segurança.', ativo: false, obs: '' },
    { id: 'fragilidadeOssea', label: 'Fragilidade óssea: Osteoporose ou osteopenia severas.', ativo: false, obs: '' },
    { id: 'questoesComportamentais', label: 'Questões comportamentais e físicas: Agressividade, dor aguda, fraturas ou obesidade mórbida.', ativo: false, obs: '' },
    { id: 'faixaEtaria', label: 'Faixa etária e quadros agudos: Crianças com menos de 2 anos (ou 3 anos para Síndrome de Down), processos inflamatórios/infecciosos.', ativo: false, obs: '' }
    ],
  };
  const [avaliacaoInicialData, setAvaliacaoInicialData] = useState<AvaliacaoInicialData>(avaliacaoInicialVazio);

  // Estados para Avaliação Anatômica
  const [showAvaliacaoAnatomicaModal, setShowAvaliacaoAnatomicaModal] = useState(false);
  const [avaliacaoAnatomicaData, setAvaliacaoAnatomicaData] = useState<any>({
    nomePraticante: '',
    idade: '',
    dataNascimento: '',
    diagnostico: '',
    // NOVOS CAMPOS ADICIONADOS:
    altura: '',
    peso: '',
    inspecaoAvds: '',
    trofismoMuscular: '',
    tonusMuscular: '',
    marcha: '',
    forcaMuscular: { msd: '', mid: '', mse: '', mie: '' },
    sensibilidade: { tatil: false, termica: false, dolorosa: false },
    equilibrioEstatico: {
      sustentacaoCabeca: false,
      sentadoSemApoio: false,
      ortostaticaComApoio: false,
      ortostaticaSemApoio: false,
      umPeOlhosAbertos: false,
      umPeOlhosFechados: false
    },
    equilibrioDinamico: {
      marchaInvoluntaria: false,
      saltoDoisPes: false,
      correrDesviando: false
    },
    reacaoProtecao: {
      direita: '',
      esquerda: ''
    },
    coordenacaoMotora: {
      maoObjeto: false,
      dedoNariz: false,
      maoBoca: false
    }
});

  // Estados para Avaliação Funcional
  const [showAvaliacaoFuncionalModal, setShowAvaliacaoFuncionalModal] = useState(false);
  const [avaliacaoFuncionalData, setAvaliacaoFuncionalData] = useState<any>({
  nomePraticante: '',
  idade: '',
  dataNascimento: '',
  diagnostico: '',
  // Listas Dinâmicas (comentário e nota)
  pontosFortes: [], 
  pontosFracosDeficit: [], 
  pontosFracosExcesso: [], 
  // Listas Dinâmicas (só comentário)
  fatoresRisco: [], 
  fatoresProtecao: [], 
  // Campos de texto simples
  dependencia: '',
  comunicacao: '',
  comportamento: '',
  cognitivo: '',
  autonomia: '',
  interacao: '',
  autoregulacao: '',
  afetivo: '',
  escolaridade: '',
  trabalho: '',
  sensorial: ''
  });

  // Estados para o modal de Reavaliação
  const [showReavaliacaoModal, setShowReavaliacaoModal] = useState(false);
  const [reavaliacaoData, setReavaliacaoData] = useState<ReavaliacaoData>({
    nomePraticante: '',
    idade: '',
    dataNascimento: '',
    diagnostico: '',
    queixa: '',
    objetivo: '',
    medicamento: '',
    observacoes: '',
    conclusao: '',
    horarios: {
      segunda: '',
      terca: '',
      quarta: '',
      quinta: '',
      sexta: '',
    },
  });

  // Estados para o modal de Estudo de Caso
  const [showEstudoCasoModal, setShowEstudoCasoModal] = useState(false);
  const [estudoCasoData, setEstudoCasoData] = useState<EstudoCasoData>({
    nomePraticante: '',
    idade: '',
    dataNascimento: '',
    diagnostico: '',
    descricaoDemanda: '',
    expectativaTratamento: '',
    quadroComplicacoes: '',
    examesComplementares: '',
    elegibilidade: '',
    restricoesElegibilidade: '',
    altura: '',
    peso: '',
    ortesesProteses: [],
    precaucoes: [],
    indicativosEquino: '',
    praticanteSebeneficia: '',
    modeloExemplos: '',
    temperamentoEquino: '',
    instabilidadeEquino: '',
    quadrilPraticante: '',
    intensidadeEstimulo: '',
    impactoBiomecanico: '',
    amplitudeMovimento: '',
    frequenciaMovimento: '',
    velocidade: '',
    feedbackSensorial: '',
    controleRedea: '',
    marcacoesOrtese: {},
    observacoesOrtese: '',
    marcacoesFisica: [],
    severidadeQuadro: '',
    grauSuporte: '',
    hipoteseMediacoes: {
      psicologo: { selecionado: false, texto: '' },
      fisio: { selecionado: false, texto: '' },
      terapeutaOcupacional: { selecionado: false, texto: '' },
      pedagogo: { selecionado: false, texto: '' },
      fonoaudiologo: { selecionado: false, texto: '' },
      equitador: { selecionado: false, texto: '' },
      educadorFisico: { selecionado: false, texto: '' },
      enfermagem: { selecionado: false, texto: '' },
      equoterapeuta: { selecionado: false, texto: '' },
    },
    observacao: '',
  });

  // Estados para o modal de Mudança de Mediação
  const [showMudancaMediacaoModal, setShowMudancaMediacaoModal] = useState(false);
  const [mudancaMediacaoData, setMudancaMediacaoData] = useState<MudancaMediacaoData>({
    nomePraticante: '',
    idade: '',
    dataNascimento: '',
    diagnostico: '',
    queixa: '',
    objetivo: '',
    mediadorAtual: '',
    periodoInicial: '',
    dataConclusao: '',
    novoMediador: '',
    motivos: {
      mudancaHorario: false,
      conclusaoObjetivos: false,
      prioridadesNecessidades: false,
      rearranjoEquipe: false,
      mudancaPrograma: false,
      demandaFamiliar: false,
      outros: false,
    },
    outrosMotivo: '',
  });

  // Estados para o modal de Mediador Inicial
  const [showMediadorInicialModal, setShowMediadorInicialModal] = useState(false);
  const [mediadorInicialData, setMediadorInicialData] = useState<MediadorInicialData>({
    nomeMediador: '',
    nomePraticante: '',
  });

  // Estados para o modal de Mudança de Programa
  const [showMudancaProgramaModal, setShowMudancaProgramaModal] = useState(false);
  const [mudancaProgramaData, setMudancaProgramaData] = useState<any>({
    nomePraticante: '',
    tipoDocumento: '',
    cid: '',
    idade: '',
    programaAtual: '',
    novoPrograma: '',
    motivos: {
      evoluiu: false,
      novosObjetivos: false,
      trabalharNovasHabilidades: false,
      regrediu: false,
      naoSeAdaptou: false,
      outros: false,
    },
    outrosMotivo: '',
    // NOVOS CAMPOS PARA HORÁRIO:
    diaAtual: '',
    horarioAtual: '',
    novoDia: '',
    novoHorario: '',
    motivoHorario: ''
  });

  // Estados para o modal de Alta
  const [showAltaModal, setShowAltaModal] = useState(false);
  const [altaData, setAltaData] = useState<AltaData>({
    tipoAlta: '',
    nomePraticante: '',
    descricao: '',
    motivo: '',
    procedimento: '',
    assinaturaMediador: '',
    assinaturaLateral: '',
    assinaturaGuia: '',
  });

  // Estados para o modal de Parecer (Atestado de Comparecimento)
  const [showParecerModal, setShowParecerModal] = useState(false);
  const [parecerData, setParecerData] = useState<ParecerData>({
    nomeSolicitante: '',
    paraQualFins: '',
    deQueHora: '',
    ateQualHora: '',
    data: '',
  });

  // Estados para o modal de Parecer Médico
  const [showParecerMedicoModal, setShowParecerMedicoModal] = useState(false);
  const [parecerMedicoData, setParecerMedicoData] = useState<ParecerMedicoData>({
    nomePraticante: '',
    dataNascimento: '',
    patologia: '',
    cid: '',
    patologiasAcessorias: '',
    consideracoesMedicas: '',
    medico: '',
    especializacao: '',
    crm: '',
  });

  // Atualizar data e hora automaticamente
  useEffect(() => {
    const atualizarDataHora = () => {
      const now = new Date();
      const dataFormatada = now.toISOString().split('T')[0]; // YYYY-MM-DD
      const horaFormatada = now.toTimeString().slice(0, 5); // HH:MM
      
      setDataExecucao(dataFormatada);
      setHorarioExecucao(horaFormatada);
    };

    atualizarDataHora();

    // Atualizar a cada minuto
    const interval = setInterval(atualizarDataHora, 60000);

    return () => clearInterval(interval);
  }, []);

  const handleAdicionarColaborador = () => {
    if (colaboradorParaAdicionar && !colaboradoresSelecionados.includes(colaboradorParaAdicionar)) {
      setColaboradoresSelecionados([...colaboradoresSelecionados, colaboradorParaAdicionar]);
      setColaboradorParaAdicionar('');
    }
  };

  const handleRemoverColaborador = (colaborador: string) => {
    setColaboradoresSelecionados(colaboradoresSelecionados.filter((c) => c !== colaborador));
  };

  const handleGerarDocumento = () => {
    if (!tipoSelecionado || !pratcicanteNome || !dataExecucao || !horarioExecucao) {
      alert('Por favor, preencha todos os campos obrigatórios');
      return;
    }

    // Se for Avaliação Inicial Estrutural, abre o modal específico
    if (tipoSelecionado === 'Avaliação inicial estrutural') {
      const dataNasc = '15/03/1995';
      const hoje = new Date();
      const nascimento = new Date(dataNasc.split('/').reverse().join('-'));
      const idade = Math.floor((hoje.getTime() - nascimento.getTime()) / (1000 * 60 * 60 * 24 * 365.25));

      setAvaliacaoInicialData({
        ...avaliacaoInicialVazio,
        nomePraticante: pratcicanteNome,
        idade: String(idade),
        dataNascimento: dataNasc,
        diagnostico: 'TEA (Transtorno do Espectro Autista)',
      });
      setShowAvaliacaoInicialModal(true);
      return;
    }

    // Se for Avaliação Inicial Anatômica, abre o modal específico
    if (tipoSelecionado === 'Avaliação inicial anatômica') {
      const dataNasc = '15/03/1995';
      const hoje = new Date();
      const nascimento = new Date(dataNasc.split('/').reverse().join('-'));
      const idade = Math.floor((hoje.getTime() - nascimento.getTime()) / (1000 * 60 * 60 * 24 * 365.25));

      setAvaliacaoAnatomicaData({
        ...avaliacaoAnatomicaData, // Mantém dados anteriores/arrays intactos
        nomePraticante: pratcicanteNome,
        idade: String(idade) + ' anos',
        dataNascimento: dataNasc,
        diagnostico: 'TEA (Transtorno do Espectro Autista)'
      });
      
      setShowAvaliacaoAnatomicaModal(true);
      return;
    }

    // Se for Avaliação Inicial Funcional, abre o modal específico
    if (tipoSelecionado === 'Avaliação inicial funcional') {
        const dataNasc = '15/03/1995';
        const hoje = new Date();
        const nascimento = new Date(dataNasc.split('/').reverse().join('-'));
        const idade = Math.floor((hoje.getTime() - nascimento.getTime()) / (1000 * 60 * 60 * 24 * 365.25));

        setAvaliacaoFuncionalData({
          ...avaliacaoFuncionalData,
          nomePraticante: pratcicanteNome,
          idade: String(idade) + ' anos',
          dataNascimento: dataNasc,
          diagnostico: 'TEA (Transtorno do Espectro Autista)'
        });
        
        setShowAvaliacaoFuncionalModal(true);
        return;
    }

    // Se for Estudo de Caso, abre o modal específico
    if (tipoSelecionado === 'Estudo de caso') {
      // Preencher dados automáticos (simulados aqui)
      const dataNasc = '15/03/1995'; // Deve vir do banco de dados
      const hoje = new Date();
      const nascimento = new Date(dataNasc.split('/').reverse().join('-'));
      const idade = Math.floor((hoje.getTime() - nascimento.getTime()) / (1000 * 60 * 60 * 24 * 365.25));

      setEstudoCasoData({
        nomePraticante: pratcicanteNome,
        idade: String(idade),
        dataNascimento: dataNasc,
        diagnostico: 'TEA (Transtorno do Espectro Autista)', // Deve vir do banco de dados
        descricaoDemanda: '',
        expectativaTratamento: '',
        quadroComplicacoes: '',
        examesComplementares: '',
        elegibilidade: '',
        restricoesElegibilidade: '',
        altura: '',
        peso: '',
        ortesesProteses: [],
        precaucoes: [],
        indicativosEquino: '',
        praticanteSebeneficia: '',
        modeloExemplos: '',
        temperamentoEquino: '',
        instabilidadeEquino: '',
        quadrilPraticante: '',
        intensidadeEstimulo: '',
        impactoBiomecanico: '',
        amplitudeMovimento: '',
        frequenciaMovimento: '',
        velocidade: '',
        feedbackSensorial: '',
        controleRedea: '',
        marcacoesOrtese: {},
        observacoesOrtese: '',
        marcacoesFisica: [],
        severidadeQuadro: '',
        grauSuporte: '',
        hipoteseMediacoes: {
          psicologo: { selecionado: false, texto: '' },
          fisio: { selecionado: false, texto: '' },
          terapeutaOcupacional: { selecionado: false, texto: '' },
          pedagogo: { selecionado: false, texto: '' },
          fonoaudiologo: { selecionado: false, texto: '' },
          equitador: { selecionado: false, texto: '' },
          educadorFisico: { selecionado: false, texto: '' },
          enfermagem: { selecionado: false, texto: '' },
          equoterapeuta: { selecionado: false, texto: '' },
        },
        observacao: '',
      });
      setShowEstudoCasoModal(true);
      return;
    }

    // Se for Reavaliação, abre o modal específico
    if (tipoSelecionado === 'Reavaliação') {
      // Preencher dados automáticos (simulados aqui)
      const dataNasc = '15/03/1995'; // Deve vir do banco de dados
      const hoje = new Date();
      const nascimento = new Date(dataNasc.split('/').reverse().join('-'));
      const idade = Math.floor((hoje.getTime() - nascimento.getTime()) / (1000 * 60 * 60 * 24 * 365.25));

      setReavaliacaoData({
        nomePraticante: pratcicanteNome,
        idade: String(idade),
        dataNascimento: dataNasc,
        diagnostico: 'TEA (Transtorno do Espectro Autista)', // Deve vir do banco de dados
        queixa: 'Dificuldade de socialização e comunicação', // Deve vir do banco de dados
        objetivo: 'Melhorar interação social através da equoterapia', // Deve vir do banco de dados
        medicamento: '',
        observacoes: '',
        conclusao: '',
        horarios: {
          segunda: '',
          terca: '',
          quarta: '',
          quinta: '',
          sexta: '',
        },
      });
      setShowReavaliacaoModal(true);
      return;
    }

    // Se for Mudança de Mediação, abre o modal específico
    if (tipoSelecionado === 'Mudança de mediação') {
      // Preencher dados automáticos (simulados aqui)
      const dataNasc = '15/03/1995'; // Deve vir do banco de dados
      const hoje = new Date();
      const nascimento = new Date(dataNasc.split('/').reverse().join('-'));
      const idade = Math.floor((hoje.getTime() - nascimento.getTime()) / (1000 * 60 * 60 * 24 * 365.25));

      setMudancaMediacaoData({
        nomePraticante: pratcicanteNome,
        idade: String(idade),
        dataNascimento: dataNasc,
        diagnostico: 'TEA (Transtorno do Espectro Autista)', // Deve vir do banco de dados
        queixa: 'Dificuldade de socialização e comunicação', // Deve vir do banco de dados
        objetivo: 'Melhorar interação social através da equoterapia', // Deve vir do banco de dados
        mediadorAtual: 'Pedro Alves - Mediador', // Deve vir do banco de dados
        periodoInicial: '01/01/2024', // Deve vir do banco de dados
        dataConclusao: '31/12/2024', // Deve vir do banco de dados
        novoMediador: 'Ana Silva - Fisioterapeuta', // Deve vir do banco de dados
        motivos: {
          mudancaHorario: false,
          conclusaoObjetivos: false,
          prioridadesNecessidades: false,
          rearranjoEquipe: false,
          mudancaPrograma: false,
          demandaFamiliar: false,
          outros: false,
        },
        outrosMotivo: '',
      });
      setShowMudancaMediacaoModal(true);
      return;
    }

    // Se for Mediador Inicial, abre o modal específico
    if (tipoSelecionado === 'Mediador inicial') {
      setMediadorInicialData({
        nomeMediador: 'Pedro Alves - Mediador', // Deve vir do banco de dados
        nomePraticante: pratcicanteNome,
      });
      setShowMediadorInicialModal(true);
      return;
    }

    // Se for Mudança de Programa, abre o modal específico
    if (tipoSelecionado === 'Mudança de programa e horário') {
      // Preencher dados automáticos (simulados aqui)
      const dataNasc = '15/03/1995'; // Deve vir do banco de dados
      const hoje = new Date();
      const nascimento = new Date(dataNasc.split('/').reverse().join('-'));
      const idade = Math.floor((hoje.getTime() - nascimento.getTime()) / (1000 * 60 * 60 * 24 * 365.25));

      setMudancaProgramaData({
        nomePraticante: pratcicanteNome,
        tipoDocumento: 'Mudança de programa e horário',
        cid: 'F84.0', // Deve vir do banco de dados
        idade: String(idade),
        programaAtual: 'Hipoterapia', // Deve vir do banco de dados
        novoPrograma: '',
        motivos: {
          evoluiu: false,
          novosObjetivos: false,
          trabalharNovasHabilidades: false,
          regrediu: false,
          naoSeAdaptou: false,
          outros: false,
        },
        outrosMotivo: '',
      });
      setShowMudancaProgramaModal(true);
      return;
    }

    // Se for Alta, abre o modal específico
    if (tipoSelecionado === 'Alta') {
      setAltaData({
        tipoAlta: '',
        nomePraticante: pratcicanteNome,
        descricao: `está desligado do Programa de Equoterapia do CEQUO/PMMS.`,
        motivo: '',
        procedimento: '',
        assinaturaMediador: '',
        assinaturaLateral: '',
        assinaturaGuia: '',
      });
      setShowAltaModal(true);
      return;
    }

    // Se for Atestado de Comparecimento, abre o modal específico
    if (tipoSelecionado === 'Atestado de Comparecimento') {
      const hoje = new Date();
      const dataFormatada = hoje.toISOString().split('T')[0];
      
      setParecerData({
        nomeSolicitante: nomeSolicitante,
        paraQualFins: '',
        deQueHora: '',
        ateQualHora: '',
        data: dataFormatada,
      });
      setShowParecerModal(true);
      return;
    }

    // Se for Parecer Médico, abre o modal específico
    if (tipoSelecionado === 'Parecer Médico') {
      // Preencher dados automáticos (simulados aqui - devem vir do banco de dados)
      setParecerMedicoData({
        nomePraticante: pratcicanteNome,
        dataNascimento: '15/03/1995', // Deve vir do banco de dados
        patologia: 'TEA (Transtorno do Espectro Autista)', // Deve vir do banco de dados
        cid: 'F84.0', // Deve vir do banco de dados
        patologiasAcessorias: 'TDAH, Ansiedade', // Deve vir do banco de dados
        consideracoesMedicas: '',
        medico: '',
        especializacao: '',
        crm: '',
      });
      setShowParecerMedicoModal(true);
      return;
    }

    const novoDocumento: Documento = {
      id: String(documentos.length + 1),
      tipo: tipoSelecionado,
      praticante: pratcicanteNome,
      colaboradores: [], // Será identificado pelo usuário logado
      dataGeracao: new Date().toLocaleDateString('pt-BR'),
    };

    setDocumentos([novoDocumento, ...documentos]);
    setTipoSelecionado('');
    setPraticanteNome('');
    setNomeSolicitante('');
    setDataExecucao('');
    setHorarioExecucao('');
  };

  const handleSalvarAvaliacaoInicial = () => {
    const novoDocumento: Documento = {
      id: String(documentos.length + 1),
      tipo: 'Avaliação inicialestrutural',
      praticante: avaliacaoInicialData.nomePraticante,
      colaboradores: [],
      dataGeracao: new Date().toLocaleDateString('pt-BR'),
    };
    setDocumentos([novoDocumento, ...documentos]);
    setShowAvaliacaoInicialModal(false);
    setTipoSelecionado('');
    setPraticanteNome('');
    setAvaliacaoInicialData(avaliacaoInicialVazio);
  };

  const handleSalvarAvaliacaoAnatomica = () => {
    const novoDocumento: Documento = {
      id: String(documentos.length + 1),
      tipo: 'Avaliação inicial anatômica',
      praticante: avaliacaoAnatomicaData.nomePraticante || 'Praticante',
      colaboradores: [],
      dataGeracao: new Date().toLocaleDateString('pt-BR'),
    };
    setDocumentos([novoDocumento, ...documentos]);
    setShowAvaliacaoAnatomicaModal(false);
    setTipoSelecionado('');
  };

  const handleSalvarAvaliacaoFuncional = () => {
    const novoDocumento: Documento = {
      id: String(documentos.length + 1),
      tipo: 'Avaliação inicial funcional',
      praticante: avaliacaoFuncionalData.nomePraticante || 'Praticante',
      colaboradores: [],
      dataGeracao: new Date().toLocaleDateString('pt-BR'),
    };
    setDocumentos([novoDocumento, ...documentos]);
    setShowAvaliacaoFuncionalModal(false);
    setTipoSelecionado('');
  };

  const handleSalvarReavaliacao = () => {
    const novoDocumento: Documento = {
      id: String(documentos.length + 1),
      tipo: 'Reavaliação',
      praticante: reavaliacaoData.nomePraticante,
      colaboradores: [],
      dataGeracao: new Date().toLocaleDateString('pt-BR'),
    };

    setDocumentos([novoDocumento, ...documentos]);
    setShowReavaliacaoModal(false);
    setTipoSelecionado('');
    setPraticanteNome('');
    
    // Resetar dados da reavaliação
    setReavaliacaoData({
      nomePraticante: '',
      idade: '',
      dataNascimento: '',
      diagnostico: '',
      queixa: '',
      objetivo: '',
      medicamento: '',
      observacoes: '',
      conclusao: '',
      horarios: {
        segunda: '',
        terca: '',
        quarta: '',
        quinta: '',
        sexta: '',
      },
    });
  };

  const handleSalvarEstudoCaso = () => {
    const novoDocumento: Documento = {
      id: String(documentos.length + 1),
      tipo: 'Estudo de caso',
      praticante: estudoCasoData.nomePraticante,
      colaboradores: [],
      dataGeracao: new Date().toLocaleDateString('pt-BR'),
    };

    setDocumentos([novoDocumento, ...documentos]);
    setShowEstudoCasoModal(false);
    setTipoSelecionado('');
    setPraticanteNome('');

    // Resetar dados do estudo de caso
    setEstudoCasoData({
      ...estudoCasoData,
      nomePraticante: '',
      idade: '',
      dataNascimento: '',
      diagnostico: '',
      descricaoDemanda: '',
      expectativaTratamento: '',
      quadroComplicacoes: '',
      examesComplementares: '',
      elegibilidade: '',
      altura: '',
      peso: '',
      ortesesProteses: [],
      marcacoesOrtese: {},
      marcacoesFisica: [],
    });
  };

  const handleSalvarMudancaMediacao = () => {
    const novoDocumento: Documento = {
      id: String(documentos.length + 1),
      tipo: 'Mudança de mediação',
      praticante: mudancaMediacaoData.nomePraticante,
      colaboradores: [],
      dataGeracao: new Date().toLocaleDateString('pt-BR'),
    };

    setDocumentos([novoDocumento, ...documentos]);
    setShowMudancaMediacaoModal(false);
    setTipoSelecionado('');
    setPraticanteNome('');
    
    // Resetar dados da mudança de mediação
    setMudancaMediacaoData({
      nomePraticante: '',
      idade: '',
      dataNascimento: '',
      diagnostico: '',
      queixa: '',
      objetivo: '',
      mediadorAtual: '',
      periodoInicial: '',
      dataConclusao: '',
      novoMediador: '',
      motivos: {
        mudancaHorario: false,
        conclusaoObjetivos: false,
        prioridadesNecessidades: false,
        rearranjoEquipe: false,
        mudancaPrograma: false,
        demandaFamiliar: false,
        outros: false,
      },
      outrosMotivo: '',
    });
  };

  const handleSalvarMediadorInicial = () => {
    const novoDocumento: Documento = {
      id: String(documentos.length + 1),
      tipo: 'Mediador inicial',
      praticante: mediadorInicialData.nomeMediador,
      colaboradores: [],
      dataGeracao: new Date().toLocaleDateString('pt-BR'),
    };

    setDocumentos([novoDocumento, ...documentos]);
    setShowMediadorInicialModal(false);
    setTipoSelecionado('');
    setPraticanteNome('');
    
    // Resetar dados do mediador inicial
    setMediadorInicialData({
      nomeMediador: '',
      nomePraticante: '',
    });
  };

  const handleSalvarMudancaPrograma = () => {
    const novoDocumento: Documento = {
      id: String(documentos.length + 1),
      tipo: 'Mudança de programa e horário',
      praticante: mudancaProgramaData.nomePraticante,
      colaboradores: [],
      dataGeracao: new Date().toLocaleDateString('pt-BR'),
    };

    setMudancaProgramaData({
      nomePraticante: '',
      tipoDocumento: '',
      cid: '',
      idade: '',
      programaAtual: '',
      novoPrograma: '',
      motivos: {
        evoluiu: false,
        novosObjetivos: false,
        trabalharNovasHabilidades: false,
        regrediu: false,
        naoSeAdaptou: false,
        outros: false,
      },
      outrosMotivo: '',
      diaAtual: '',
      horarioAtual: '',
      novoDia: '',
      novoHorario: '',
      motivoHorario: ''
    });
  };

  const handleSalvarAlta = () => {
    const novoDocumento: Documento = {
      id: String(documentos.length + 1),
      tipo: 'Alta',
      praticante: altaData.nomePraticante,
      colaboradores: [],
      dataGeracao: new Date().toLocaleDateString('pt-BR'),
    };

    setDocumentos([novoDocumento, ...documentos]);
    setShowAltaModal(false);
    setTipoSelecionado('');
    setPraticanteNome('');

    // Resetar dados da alta
    setAltaData({
      tipoAlta: '',
      nomePraticante: '',
      descricao: '',
      motivo: '',
      procedimento: '',
      assinaturaMediador: '',
      assinaturaLateral: '',
      assinaturaGuia: '',
    });
  };

  const handleSalvarParecer = () => {
    const novoDocumento: Documento = {
      id: String(documentos.length + 1),
      tipo: 'Atestado de Comparecimento',
      praticante: parecerData.nomeSolicitante,
      colaboradores: [],
      dataGeracao: new Date().toLocaleDateString('pt-BR'),
    };

    setDocumentos([novoDocumento, ...documentos]);
    setShowParecerModal(false);
    setTipoSelecionado('');
    setPraticanteNome('');
    setNomeSolicitante('');
    
    // Resetar dados do parecer
    setParecerData({
      nomeSolicitante: '',
      paraQualFins: '',
      deQueHora: '',
      ateQualHora: '',
      data: '',
    });
  };

  const handleSalvarParecerMedico = () => {
    const novoDocumento: Documento = {
      id: String(documentos.length + 1),
      tipo: 'Parecer Médico',
      praticante: parecerMedicoData.nomePraticante,
      colaboradores: [],
      dataGeracao: new Date().toLocaleDateString('pt-BR'),
    };

    setDocumentos([novoDocumento, ...documentos]);
    setShowParecerMedicoModal(false);
    setTipoSelecionado('');
    setPraticanteNome('');
    
    // Resetar dados do parecer médico
    setParecerMedicoData({
      nomePraticante: '',
      dataNascimento: '',
      patologia: '',
      cid: '',
      patologiasAcessorias: '',
      consideracoesMedicas: '',
      medico: '',
      especializacao: '',
      crm: '',
    });
  };

  const handleDelete = (id: string) => {
    setDocumentos(documentos.filter((doc) => doc.id !== id));
  };

  const documentosFiltrados = documentos.filter((doc) => {
    const matchTipo = !filtroTipo || doc.tipo === filtroTipo;
    const matchPraticante = !filtroPraticante || 
      doc.praticante.toLowerCase().includes(filtroPraticante.toLowerCase());
    return matchTipo && matchPraticante;
  });

  return (
    <div className="flex-1 overflow-y-auto bg-gray-50">
      <div className="p-4 md:p-8">
        <div className="mb-4 md:mb-6">
          <h1 className="text-gray-900 mb-2 text-xl md:text-2xl">Documentos</h1>
          <p className="text-gray-600 text-sm md:text-base">Gerencie os documentos dos praticantes</p>
        </div>

        {/* Card de Geração de Documento */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-indigo-600" />
              Novo Documento
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="space-y-2">
                <Label htmlFor="praticante-nome">Praticante *</Label>
                <Input
                  id="praticante-nome"
                  placeholder="Nome do praticante"
                  value={pratcicanteNome}
                  onChange={(e) => setPraticanteNome(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="tipo-documento">Tipo de Documento *</Label>
                <Select value={tipoSelecionado} onValueChange={setTipoSelecionado}>
                  <SelectTrigger id="tipo-documento">
                    <SelectValue placeholder="Selecione o tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    {tiposDocumento.map((tipo) => (
                      <SelectItem key={tipo} value={tipo}>
                        {tipo}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="data-execucao">Data de Execução *</Label>
                <Input
                  id="data-execucao"
                  type="date"
                  value={dataExecucao}
                  readOnly
                  className="bg-gray-50 cursor-not-allowed"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="horario-execucao">Horário de Execução *</Label>
                <Input
                  id="horario-execucao"
                  type="time"
                  value={horarioExecucao}
                  readOnly
                  className="bg-gray-50 cursor-not-allowed"
                />
              </div>

              {/* Campo condicional para Parecer */}
              {tipoSelecionado === 'Atestado de Comparecimento' && (
                <div className="space-y-2">
                  <Label htmlFor="nome-solicitante">Nome do Solicitante *</Label>
                  <Input
                    id="nome-solicitante"
                    placeholder="Nome do solicitante do parecer"
                    value={nomeSolicitante}
                    onChange={(e) => setNomeSolicitante(e.target.value)}
                  />
                </div>
              )}
            </div>

            <div className="flex gap-3">
              <Button onClick={handleGerarDocumento} className="bg-indigo-600 hover:bg-indigo-700">
                <FileText className="h-4 w-4 mr-2" />
                Gerar Novo Documento
              </Button>
              <Button 
                onClick={handleGerarDocumento} 
                className="bg-green-600 hover:bg-green-700"
                disabled={tipoSelecionado === 'Atestado de Comparecimento'}
              >
                <FileText className="h-4 w-4 mr-2" />
                Adicionar PDF
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Filtros */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="filtro-tipo">Filtrar por Tipo</Label>
                <Select value={filtroTipo} onValueChange={setFiltroTipo}>
                  <SelectTrigger id="filtro-tipo">
                    <SelectValue placeholder="Todos os tipos" />
                  </SelectTrigger>
                  <SelectContent>
                    {tiposDocumento.map((tipo) => (
                      <SelectItem key={tipo} value={tipo}>
                        {tipo}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {filtroTipo && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setFiltroTipo('')}
                    className="text-indigo-600 hover:text-indigo-700"
                  >
                    Limpar filtro
                  </Button>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="filtro-praticante">Filtrar por Praticante</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="filtro-praticante"
                    placeholder="Buscar praticante..."
                    value={filtroPraticante}
                    onChange={(e) => setFiltroPraticante(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Lista de Documentos */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-indigo-600" />
              Documentos Cadastrados ({documentosFiltrados.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            {documentosFiltrados.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                <FileText className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                <p>Nenhum documento encontrado</p>
              </div>
            ) : (
              <div className="overflow-x-auto -mx-4 md:mx-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-xs md:text-sm">Tipo de Documento</TableHead>
                      <TableHead className="hidden sm:table-cell text-xs md:text-sm">Praticante</TableHead>
                      <TableHead className="hidden md:table-cell text-xs md:text-sm">Colaboradores</TableHead>
                      <TableHead className="hidden lg:table-cell text-xs md:text-sm">Data de Geração</TableHead>
                      <TableHead className="text-right text-xs md:text-sm">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {documentosFiltrados.map((doc) => (
                      <TableRow key={doc.id}>
                        <TableCell className="text-xs md:text-sm">
                          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                            <FileText className="h-3 w-3 md:h-4 md:w-4 text-indigo-600" />
                            <div>
                              <span className="block sm:inline">{doc.tipo}</span>
                              <span className="block sm:hidden text-xs text-gray-500 mt-1">{doc.praticante}</span>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="hidden sm:table-cell text-xs md:text-sm">{doc.praticante}</TableCell>
                        <TableCell className="hidden md:table-cell text-xs md:text-sm">
                          <div className="flex flex-wrap gap-1">
                            {doc.colaboradores.map((col, index) => (
                              <Badge 
                                key={index} 
                                variant="outline" 
                                className="text-xs bg-indigo-50 text-indigo-700 border-indigo-200"
                              >
                                {col.split(' - ')[0]}
                              </Badge>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell className="hidden lg:table-cell text-xs md:text-sm">{doc.dataGeracao}</TableCell>
                        <TableCell>
                          <div className="flex items-center justify-end gap-1">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 h-7 w-7 md:h-8 md:w-8 p-0"
                            >
                              <Eye className="h-3 w-3 md:h-4 md:w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 h-7 w-7 md:h-8 md:w-8 p-0"
                            >
                              <Download className="h-3 w-3 md:h-4 md:w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-red-600 hover:text-red-700 hover:bg-red-50 h-7 w-7 md:h-8 md:w-8 p-0"
                              onClick={() => handleDelete(doc.id)}
                            >
                              <Trash2 className="h-3 w-3 md:h-4 md:w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Modal de Reavaliação */}
      <ModalReavaliacao
        isOpen={showReavaliacaoModal}
        onClose={() => setShowReavaliacaoModal(false)}
        onSave={handleSalvarReavaliacao}
        data={reavaliacaoData}
        onChange={setReavaliacaoData}
      />

      {/* Modal de Estudo de Caso */}
      <ModalEstudoCaso
        isOpen={showEstudoCasoModal}
        onClose={() => setShowEstudoCasoModal(false)}
        onSave={handleSalvarEstudoCaso}
        data={estudoCasoData}
        onChange={setEstudoCasoData}
      />

      {/* Modal de Avaliação Inicial Anatômica */}
      <ModalAvaliacaoAnatomica
        isOpen={showAvaliacaoAnatomicaModal}
        onClose={() => setShowAvaliacaoAnatomicaModal(false)}
        onSave={handleSalvarAvaliacaoAnatomica}
        data={avaliacaoAnatomicaData}
        onChange={setAvaliacaoAnatomicaData}
        estudoCasoData={estudoCasoData}
        setEstudoCasoData={setEstudoCasoData}
      />

      {/* Modal de Mudança de Mediação */}
      <ModalMudancaMediacao
        isOpen={showMudancaMediacaoModal}
        onClose={() => setShowMudancaMediacaoModal(false)}
        onSave={handleSalvarMudancaMediacao}
        data={mudancaMediacaoData}
        onChange={setMudancaMediacaoData}
        colaboradores={colaboradoresDisponiveis}
      />

      {/* Modal de Mudança de Programa */}
      <ModalMudancaPrograma
        isOpen={showMudancaProgramaModal}
        onClose={() => setShowMudancaProgramaModal(false)}
        onSave={handleSalvarMudancaPrograma}
        data={mudancaProgramaData}
        onChange={setMudancaProgramaData}
      />

      {/* Modal de Alta */}
      <ModalAlta
        isOpen={showAltaModal}
        onClose={() => setShowAltaModal(false)}
        onSave={handleSalvarAlta}
        data={altaData}
        onChange={setAltaData}
      />

      {/* Modal de Parecer (Declaração de Comparecimento) */}
      <ModalParecer
        isOpen={showParecerModal}
        onClose={() => setShowParecerModal(false)}
        onSave={handleSalvarParecer}
        data={parecerData}
        onChange={setParecerData}
      />

      {/* Modal de Parecer Médico */}
      <ModalParecerMedico
        isOpen={showParecerMedicoModal}
        onClose={() => setShowParecerMedicoModal(false)}
        onSave={handleSalvarParecerMedico}
        data={parecerMedicoData}
        onChange={setParecerMedicoData}
      />

      {/* Modal de Mediador Inicial */}
      <ModalMediadorInicial
        isOpen={showMediadorInicialModal}
        onClose={() => setShowMediadorInicialModal(false)}
        onSave={handleSalvarMediadorInicial}
        data={mediadorInicialData}
        onChange={setMediadorInicialData}
        colaboradores={colaboradoresDisponiveis}
      />

      {/* Modal de Avaliação Inicial Funcional */}
      <ModalAvaliacaoFuncional
        isOpen={showAvaliacaoFuncionalModal}
        onClose={() => setShowAvaliacaoFuncionalModal(false)}
        onSave={handleSalvarAvaliacaoFuncional}
        data={avaliacaoFuncionalData}
        onChange={setAvaliacaoFuncionalData}
      />

      {/* Modal de Avaliação Inicial Estrutural */}
      <ModalAvaliacaoInicialEstrutural
        isOpen={showAvaliacaoInicialModal}
        onClose={() => setShowAvaliacaoInicialModal(false)}
        onSave={handleSalvarAvaliacaoInicial}
        data={avaliacaoInicialData}
        onChange={setAvaliacaoInicialData}
      />
    </div>
  );
}