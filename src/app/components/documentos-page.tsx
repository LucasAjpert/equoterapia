import { useState, useEffect } from 'react';
import { Upload, FileText, Download, Trash2, Eye, Search, X } from 'lucide-react';
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
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';

interface Documento {
  id: string;
  tipo: string;
  praticante: string;
  colaboradores: string[];
  dataGeracao: string;
}

interface TerapiaItem {
  ativo: boolean;
  jaFezFaz?: string; // só para fisioterapia
  nome: string;
  tempo: string;
}

interface EscolaItem {
  ativo: boolean;
  qualEscola: string;
  serie: string;
  reprovacoes: string;
  dificuldades: string;
}

interface MedicaItem {
  ativo: boolean;
  qualArea: string;
  nome: string;
  tempo: string;
}

interface MedicamentoRow {
  medicacao: string;
  dosagem: string;
  horario: string;
  finalidade: string;
}

interface AvaliacaoInicialData {
  nomePraticante: string;
  idade: string;
  dataNascimento: string;
  diagnostico: string;
  // Encaminhamento
  encaminhadoPor: string;
  // Histórico équo
  jaFezEquo: 'sim' | 'nao' | '';
  tempoFezEquo: string;
  tempoPausaEquo: string;
  // Histórico equitação
  jaAndouCavalo: 'sim' | 'nao' | '';
  tempoAndouCavalo: string;
  tempoPausaCavalo: string;
  // Histórico terapêutico
  possuiHistoricoTerapeutico: 'sim' | 'nao' | '';
  fisioterapia: TerapiaItem;
  terapiaOcupacional: TerapiaItem;
  fonoaudiologia: TerapiaItem;
  psicologia: TerapiaItem;
  educacaoFisica: TerapiaItem;
  hidroterapia: TerapiaItem;
  escola: EscolaItem;
  medica: MedicaItem;
  atividadeFisica: { ativo: boolean; qual: string; tempo: string };
  rotinaMelhorHorario: string;
  outroHistorico: string;
  // Anamnese
  anamnese: {
    relacionamentoPais: { resposta: string; observacoes: string };
    historiaGravidezAdocao: { resposta: string; observacoes: string };
    gravidezPlanejada: { resposta: string; observacoes: string };
  };
  // Rotina / Horários
  rotina: {
    matutino:   { segunda: string; terca: string; quarta: string; quinta: string; sexta: string; sabado: string };
    vespertino: { segunda: string; terca: string; quarta: string; quinta: string; sexta: string; sabado: string };
    noturno:    { segunda: string; terca: string; quarta: string; quinta: string; sexta: string; sabado: string };
  };
  // Aspectos Fisiológicos
  aspectosFisiologicos: {
    alimentacao: string;
    sono: string;
    interacaoSocial: string;
    tpm: string;
  };
  // Queixa / Objetivo Familiar
  queixaObjetivo: {
    descricaoDemanda: string;
    historicodoenca: string;
    expectativaTratamento: string;
  };
  // Saúde Física
  saudeFisica: {
    cardiaco: boolean;
    hipertenso: boolean;
    alergias: boolean;
    saudeFrágil: boolean;
    hivAids: boolean;
    etc: string;
  };
  // Desenvolvimento da Linguagem
  desenvolvimentoLinguagem: {
    balbuciou:              { idade: string; obs: string };
    sorrioRisadaSocial:     { idade: string; obs: string };
    atencaoCompartilhada:   { idade: string; obs: string };
    imitacao:               { idade: string; obs: string };
    primeirasPalavras:      { idade: string; obs: string };
    formouFrases:           { idade: string; obs: string };
    comunicacaoFuncional:   { idade: string; obs: string };
    obsGestaDesenvolvimento: string;
  };
  // Desenvolvimento Motor
  desenvolvimentoMotor: {
    sustentouCabeca:        { idade: string; obs: string };
    rolou:                  { idade: string; obs: string };
    sentou:                 { idade: string; obs: string };
    engatinhou:             { idade: string; obs: string };
    ficouEmPe:              { idade: string; obs: string };
    andou:                  { idade: string; obs: string };
    correu:                 { idade: string; obs: string };
    saltou:                 { idade: string; obs: string };
    controleEsfincteriano:  { idade: string; obs: string };
  };
  // Gestação
  gestacao: {
    fezPreNatal: { valor: string; obs: string };
    semanasDias: { valor: string; obs: string };
    complicacoesGestacao: { valor: string; obs: string };
    usoMedicacaoGestacao: { valor: string; obs: string };
    usoAlcoolCigarro: { valor: string; obs: string };
    estresseGestacional: { valor: string; obs: string };
  };
  // Parto / Nascimento
  parto: {
    tipoParto: { valor: string; obs: string };
    complicacoesParto: { valor: string; obs: string };
    necessitouOxigenio: { valor: string; obs: string };
    utiNeonatal: { valor: string; obs: string };
    fezPosNatal: { valor: string; obs: string };
    complicacoesNeonatal: { valor: string; obs: string };
    ictericia: { valor: string; obs: string };
    pesoAoNascer: { valor: string; obs: string };
    apgar: { valor: string; obs: string };
  };
  // Medicamentos
  usaMedicamento: 'sim' | 'nao' | '';
  medicamentos: MedicamentoRow[];
  comoFicaComMedicacao: string;
  comoFicaSemMedicacao: string;
}

interface ReavaliacaoData {
  nomePraticante: string;
  idade: string;
  dataNascimento: string;
  diagnostico: string;
  queixa: string;
  objetivo: string;
  medicamento: string;
  observacoes: string;
  conclusao: string;
  horarios: {
    segunda: string;
    terca: string;
    quarta: string;
    quinta: string;
    sexta: string;
  };
}

interface EstudoCasoData {
  nomePraticante: string;
  idade: string;
  dataNascimento: string;
  diagnostico: string;
  descricaoDemanda: string;
  expectativaTratamento: string;
  quadroComplicacoes: string;
  examesComplementares: string;
  elegibilidade: string;
  restricoesElegibilidade: string;
  altura: string;
  peso: string;
  precaucoes: string[];
  indicativosEquino: string;
  praticanteSebeneficia: string;
  modeloExemplos: string;
  temperamentoEquino: string;
  instabilidadeEquino: string;
  quadrilPraticante: string;
  intensidadeEstimulo: string;
  impactoBiomecanico: string;
  amplitudeMovimento: string;
  frequenciaMovimento: string;
  velocidade: string;
  feedbackSensorial: string;
  controleRedea: string;
  ortesesProteses: {
    tipo: string; // ortese ou protese
    subtipo: string; // tipo específico
    parteCorpo: string[];
  }[];
  marcacoesOrtese: { [key: string]: { ortese: boolean; protese: boolean } }; // parte do corpo -> órtese/prótese
  observacoesOrtese: string; // observações sobre órtese e prótese
  marcacoesFisica: Array<{
    parteCorpo: string;
    tipo: string; // esqueleto, muscular, motor, ausência de membro, etc
    explicacao: string;
  }>;
  severidadeQuadro: 'ALTA' | 'BAIXA' | '';
  grauSuporte: 'ALTA' | 'BAIXA' | '';
  hipoteseMediacoes: {
    psicologo: { selecionado: boolean; texto: string };
    fisio: { selecionado: boolean; texto: string };
    terapeutaOcupacional: { selecionado: boolean; texto: string };
    pedagogo: { selecionado: boolean; texto: string };
    fonoaudiologo: { selecionado: boolean; texto: string };
    equitador: { selecionado: boolean; texto: string };
    educadorFisico: { selecionado: boolean; texto: string };
    enfermagem: { selecionado: boolean; texto: string };
    equoterapeuta: { selecionado: boolean; texto: string };
  };
  observacao: string;
}

interface MudancaMediacaoData {
  nomePraticante: string;
  idade: string;
  dataNascimento: string;
  diagnostico: string;
  queixa: string;
  objetivo: string;
  mediadorAtual: string;
  periodoInicial: string;
  dataConclusao: string;
  novoMediador: string;
  motivos: {
    mudancaHorario: boolean;
    conclusaoObjetivos: boolean;
    prioridadesNecessidades: boolean;
    rearranjoEquipe: boolean;
    mudancaPrograma: boolean;
    demandaFamiliar: boolean;
    outros: boolean;
  };
  outrosMotivo: string;
}

interface AltaData {
  tipoAlta: 'definitiva' | 'temporaria' | '';
  nomePraticante: string;
  descricao: string;
  motivo: string;
  procedimento: string;
  assinaturaMediador: string;
  assinaturaLateral: string;
  assinaturaGuia: string;
}

interface MediadorInicialData {
  nomeMediador: string;
  nomePraticante: string;
}

interface MudancaProgramaData {
  nomePraticante: string;
  tipoDocumento: string;
  cid: string;
  idade: string;
  programaAtual: string;
  novoPrograma: string;
  motivos: {
    evoluiu: boolean;
    novosObjetivos: boolean;
    trabalharNovasHabilidades: boolean;
    regrediu: boolean;
    naoSeAdaptou: boolean;
    outros: boolean;
  };
  outrosMotivo: string;
}

interface ParecerData {
  nomeSolicitante: string;
  paraQualFins: string;
  deQueHora: string;
  ateQualHora: string;
  data: string;
}

interface ParecerMedicoData {
  nomePraticante: string;
  dataNascimento: string;
  patologia: string;
  cid: string;
  patologiasAcessorias: string;
  consideracoesMedicas: string;
  medico: string;
  especializacao: string;
  crm: string;
}

const tiposDocumento = [
  'Avaliação inicial',
  'Estudo de caso',
  'Relatório semestral',
  'Mediador inicial',
  'Mudança de mediação',
  'Mudança de programa',
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
      tipo: 'Avaliação inicial',
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

  // Estados para o modal de Avaliação Inicial
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
  };
  const [avaliacaoInicialData, setAvaliacaoInicialData] = useState<AvaliacaoInicialData>(avaliacaoInicialVazio);

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
  const [showModalMarcacaoFisica, setShowModalMarcacaoFisica] = useState(false);
  const [parteCorpoSelecionada, setParteCorpoSelecionada] = useState<string>('');

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
  const [mudancaProgramaData, setMudancaProgramaData] = useState<MudancaProgramaData>({
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

    // Se for Avaliação Inicial, abre o modal específico
    if (tipoSelecionado === 'Avaliação inicial') {
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
    if (tipoSelecionado === 'Mudança de programa') {
      // Preencher dados automáticos (simulados aqui)
      const dataNasc = '15/03/1995'; // Deve vir do banco de dados
      const hoje = new Date();
      const nascimento = new Date(dataNasc.split('/').reverse().join('-'));
      const idade = Math.floor((hoje.getTime() - nascimento.getTime()) / (1000 * 60 * 60 * 24 * 365.25));

      setMudancaProgramaData({
        nomePraticante: pratcicanteNome,
        tipoDocumento: 'Mudança de programa',
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
      tipo: 'Avaliação inicial',
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
      marcacoesFisica: {},
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
      tipo: 'Mudança de programa',
      praticante: mudancaProgramaData.nomePraticante,
      colaboradores: [],
      dataGeracao: new Date().toLocaleDateString('pt-BR'),
    };

    setDocumentos([novoDocumento, ...documentos]);
    setShowMudancaProgramaModal(false);
    setTipoSelecionado('');
    setPraticanteNome('');
    
    // Resetar dados da mudança de programa
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
      {showReavaliacaoModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl my-8">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 rounded-t-xl">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl text-gray-900">Formulário de Reavaliação</h2>
                <button
                  onClick={() => setShowReavaliacaoModal(false)}
                  className="text-gray-500 hover:text-gray-700 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            <div className="px-6 py-6 space-y-6 max-h-[calc(100vh-200px)] overflow-y-auto">
              {/* Dados Automáticos */}
              <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
                <h3 className="text-lg text-indigo-900 mb-4">Dados do Praticante</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-indigo-700">Nome do Praticante</Label>
                    <Input
                      value={reavaliacaoData.nomePraticante}
                      readOnly
                      className="bg-white border-indigo-200 mt-1"
                    />
                  </div>
                  <div>
                    <Label className="text-indigo-700">Idade</Label>
                    <Input
                      value={`${reavaliacaoData.idade} anos`}
                      readOnly
                      className="bg-white border-indigo-200 mt-1"
                    />
                  </div>
                  <div>
                    <Label className="text-indigo-700">Data de Nascimento</Label>
                    <Input
                      value={reavaliacaoData.dataNascimento}
                      readOnly
                      className="bg-white border-indigo-200 mt-1"
                    />
                  </div>
                  <div>
                    <Label className="text-indigo-700">Diagnóstico</Label>
                    <Input
                      value={reavaliacaoData.diagnostico}
                      readOnly
                      className="bg-white border-indigo-200 mt-1"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Label className="text-indigo-700">Queixa</Label>
                    <Input
                      value={reavaliacaoData.queixa}
                      readOnly
                      className="bg-white border-indigo-200 mt-1"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Label className="text-indigo-700">Objetivo</Label>
                    <Input
                      value={reavaliacaoData.objetivo}
                      readOnly
                      className="bg-white border-indigo-200 mt-1"
                    />
                  </div>
                </div>
              </div>

              {/* Campos a serem preenchidos */}
              <div className="space-y-4">
                <h3 className="text-lg text-gray-900">Informações Adicionais</h3>
                
                {/* Medicamento */}
                <div>
                  <Label htmlFor="medicamento">Medicamento (Nome/Dosagem/Horário/Função)</Label>
                  <textarea
                    id="medicamento"
                    value={reavaliacaoData.medicamento}
                    onChange={(e) => setReavaliacaoData({ ...reavaliacaoData, medicamento: e.target.value })}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none mt-1"
                    placeholder="Ex: Risperidona / 2mg / 2x ao dia (manhã e noite) / Controle de comportamento"
                  />
                </div>

                {/* Observações */}
                <div>
                  <Label htmlFor="observacoes-reaval">Observações</Label>
                  <textarea
                    id="observacoes-reaval"
                    value={reavaliacaoData.observacoes}
                    onChange={(e) => setReavaliacaoData({ ...reavaliacaoData, observacoes: e.target.value })}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none mt-1"
                    placeholder="Descreva observações sobre a evolução do praticante..."
                  />
                </div>

                {/* Conclusão */}
                <div>
                  <Label htmlFor="conclusao">Conclusão</Label>
                  <textarea
                    id="conclusao"
                    value={reavaliacaoData.conclusao}
                    onChange={(e) => setReavaliacaoData({ ...reavaliacaoData, conclusao: e.target.value })}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none mt-1"
                    placeholder="Conclusão da reavaliação..."
                  />
                </div>

                {/* Tabela Semanal */}
                <div>
                  <Label>Horários Semanais</Label>
                  <div className="mt-2 border border-gray-300 rounded-lg overflow-hidden">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 border-b border-gray-300">
                            Dia da Semana
                          </th>
                          <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 border-b border-gray-300">
                            Horário
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        <tr>
                          <td className="px-4 py-3 text-sm text-gray-900">Segunda-feira</td>
                          <td className="px-4 py-3">
                            <Input
                              type="time"
                              value={reavaliacaoData.horarios.segunda}
                              onChange={(e) => setReavaliacaoData({
                                ...reavaliacaoData,
                                horarios: { ...reavaliacaoData.horarios, segunda: e.target.value }
                              })}
                              className="w-full"
                              placeholder="--:--"
                            />
                          </td>
                        </tr>
                        <tr>
                          <td className="px-4 py-3 text-sm text-gray-900">Terça-feira</td>
                          <td className="px-4 py-3">
                            <Input
                              type="time"
                              value={reavaliacaoData.horarios.terca}
                              onChange={(e) => setReavaliacaoData({
                                ...reavaliacaoData,
                                horarios: { ...reavaliacaoData.horarios, terca: e.target.value }
                              })}
                              className="w-full"
                              placeholder="--:--"
                            />
                          </td>
                        </tr>
                        <tr>
                          <td className="px-4 py-3 text-sm text-gray-900">Quarta-feira</td>
                          <td className="px-4 py-3">
                            <Input
                              type="time"
                              value={reavaliacaoData.horarios.quarta}
                              onChange={(e) => setReavaliacaoData({
                                ...reavaliacaoData,
                                horarios: { ...reavaliacaoData.horarios, quarta: e.target.value }
                              })}
                              className="w-full"
                              placeholder="--:--"
                            />
                          </td>
                        </tr>
                        <tr>
                          <td className="px-4 py-3 text-sm text-gray-900">Quinta-feira</td>
                          <td className="px-4 py-3">
                            <Input
                              type="time"
                              value={reavaliacaoData.horarios.quinta}
                              onChange={(e) => setReavaliacaoData({
                                ...reavaliacaoData,
                                horarios: { ...reavaliacaoData.horarios, quinta: e.target.value }
                              })}
                              className="w-full"
                              placeholder="--:--"
                            />
                          </td>
                        </tr>
                        <tr>
                          <td className="px-4 py-3 text-sm text-gray-900">Sexta-feira</td>
                          <td className="px-4 py-3">
                            <Input
                              type="time"
                              value={reavaliacaoData.horarios.sexta}
                              onChange={(e) => setReavaliacaoData({
                                ...reavaliacaoData,
                                horarios: { ...reavaliacaoData.horarios, sexta: e.target.value }
                              })}
                              className="w-full"
                              placeholder="--:--"
                            />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    * Os horários podem ficar em branco se não houver atendimento no dia
                  </p>
                </div>
              </div>
            </div>

            {/* Botões */}
            <div className="sticky bottom-0 bg-white border-t border-gray-200 px-6 py-4 rounded-b-xl">
              <div className="flex gap-3 justify-end">
                <Button
                  variant="outline"
                  onClick={() => setShowReavaliacaoModal(false)}
                  className="px-6"
                >
                  Cancelar
                </Button>
                <Button
                  onClick={handleSalvarReavaliacao}
                  className="bg-indigo-600 hover:bg-indigo-700 px-6"
                >
                  <FileText className="h-4 w-4 mr-2" />
                  Salvar Reavaliação
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Estudo de Caso */}
      {showEstudoCasoModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl my-8">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 rounded-t-xl">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl text-gray-900">Estudo de Caso</h2>
                <button
                  onClick={() => setShowEstudoCasoModal(false)}
                  className="text-gray-500 hover:text-gray-700 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            <div className="px-6 py-6 space-y-6 max-h-[calc(100vh-200px)] overflow-y-auto">
              {/* Dados do Praticante */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Dados do Praticante</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="ec-nome">Nome do Praticante</Label>
                    <Input
                      id="ec-nome"
                      value={estudoCasoData.nomePraticante}
                      className="bg-gray-50"
                      readOnly
                    />
                  </div>
                  <div>
                    <Label htmlFor="ec-idade">Idade</Label>
                    <Input
                      id="ec-idade"
                      value={estudoCasoData.idade}
                      className="bg-gray-50"
                      readOnly
                    />
                  </div>
                  <div>
                    <Label htmlFor="ec-data-nascimento">Data de Nascimento</Label>
                    <Input
                      id="ec-data-nascimento"
                      value={estudoCasoData.dataNascimento}
                      className="bg-gray-50"
                      readOnly
                    />
                  </div>
                  <div>
                    <Label htmlFor="ec-diagnostico">Diagnóstico</Label>
                    <Input
                      id="ec-diagnostico"
                      value={estudoCasoData.diagnostico}
                      className="bg-gray-50"
                      readOnly
                    />
                  </div>
                </div>
              </div>

              {/* Formulário */}
              <div className="space-y-6">
                {/* 1. Descrição da Demanda */}
                <div>
                  <Label htmlFor="ec-demanda">1) DESCRIÇÃO DA DEMANDA</Label>
                  <p className="text-sm text-gray-500 mb-2">
                    Queixa geral, ex: agitado, dificuldade comunicação, instabilidade gravitacional, quedas frequente, sialorreia, problema postural, hipotonia.
                  </p>
                  <textarea
                    id="ec-demanda"
                    value={estudoCasoData.descricaoDemanda}
                    onChange={(e) => setEstudoCasoData({ ...estudoCasoData, descricaoDemanda: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    rows={4}
                    placeholder="Descreva a demanda do praticante..."
                  />
                </div>

                {/* 2. Expectativa Tratamento Equoterápeutico */}
                <div>
                  <Label htmlFor="ec-expectativa">2) EXPECTATIVA TRATAMENTO EQUOTERÁPEUTICO</Label>
                  <p className="text-sm text-gray-500 mb-2">
                    Objetivo geral, ex: qualidade de vida, autonomia, melhore a interação, ganho motor e postural.
                  </p>
                  <textarea
                    id="ec-expectativa"
                    value={estudoCasoData.expectativaTratamento}
                    onChange={(e) => setEstudoCasoData({ ...estudoCasoData, expectativaTratamento: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    rows={4}
                    placeholder="Descreva as expectativas do tratamento..."
                  />
                </div>

                {/* 3. Quadro e Complicações */}
                <div>
                  <Label htmlFor="ec-quadro">3) QUADRO E COMPLICAÇÕES A SER OBSERVADOS</Label>
                  <p className="text-sm text-gray-500 mb-2">
                    Ex: diabete, epilepsia controlada, escoliose, efeito chicote, agitação, sem percepção de risco, hiper sensibilidade auditiva, agressividade, hipertensão...
                  </p>
                  <textarea
                    id="ec-quadro"
                    value={estudoCasoData.quadroComplicacoes}
                    onChange={(e) => setEstudoCasoData({ ...estudoCasoData, quadroComplicacoes: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    rows={4}
                    placeholder="Descreva o quadro e complicações..."
                  />
                </div>

                {/* 4. Exames Complementares */}
                <div>
                  <Label htmlFor="ec-exames">4) EXAMES COMPLEMENTARES PERIODICAMENTE MANTIDOS</Label>
                  <p className="text-sm text-gray-500 mb-2">
                    Ex: raio X panorâmico da coluna e quadril, eletro encéfalo grama, exames cardíacos...
                  </p>
                  <textarea
                    id="ec-exames"
                    value={estudoCasoData.examesComplementares}
                    onChange={(e) => setEstudoCasoData({ ...estudoCasoData, examesComplementares: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    rows={4}
                    placeholder="Liste os exames complementares..."
                  />
                </div>

                {/* 5. Elegibilidade */}
                <div>
                  <Label>5) ELEGIBILIDADE</Label>
                  <div className="mt-3 space-y-2">
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="ec-nao-elegivel"
                        name="elegibilidade"
                        value="NÃO ELEGÍVEL"
                        checked={estudoCasoData.elegibilidade === 'NÃO ELEGÍVEL'}
                        onChange={(e) => setEstudoCasoData({ ...estudoCasoData, elegibilidade: e.target.value })}
                        className="w-4 h-4 text-indigo-600 focus:ring-indigo-500"
                      />
                      <label htmlFor="ec-nao-elegivel" className="ml-2 text-sm text-gray-700">
                        No momento NÃO ELEGÍVEL
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="ec-elegivel-restricoes"
                        name="elegibilidade"
                        value="ELEGÍVEL com RESTRIÇÕES"
                        checked={estudoCasoData.elegibilidade === 'ELEGÍVEL com RESTRIÇÕES'}
                        onChange={(e) => setEstudoCasoData({ ...estudoCasoData, elegibilidade: e.target.value })}
                        className="w-4 h-4 text-indigo-600 focus:ring-indigo-500"
                      />
                      <label htmlFor="ec-elegivel-restricoes" className="ml-2 text-sm text-gray-700">
                        ELEGÍVEL com RESTRIÇÕES
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="ec-elegivel"
                        name="elegibilidade"
                        value="ELEGÍVEL"
                        checked={estudoCasoData.elegibilidade === 'ELEGÍVEL'}
                        onChange={(e) => setEstudoCasoData({ ...estudoCasoData, elegibilidade: e.target.value })}
                        className="w-4 h-4 text-indigo-600 focus:ring-indigo-500"
                      />
                      <label htmlFor="ec-elegivel" className="ml-2 text-sm text-gray-700">
                        ELEGÍVEL
                      </label>
                    </div>
                  </div>

                  {/* Campo condicional para restrições */}
                  {estudoCasoData.elegibilidade === 'ELEGÍVEL com RESTRIÇÕES' && (
                    <div className="mt-4">
                      <Label htmlFor="ec-restricoes">Quais são as restrições?</Label>
                      <textarea
                        id="ec-restricoes"
                        value={estudoCasoData.restricoesElegibilidade}
                        onChange={(e) => setEstudoCasoData({ ...estudoCasoData, restricoesElegibilidade: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        rows={3}
                        placeholder="Descreva as restrições do praticante..."
                      />
                    </div>
                  )}
                </div>

                {/* 6. Perfil Praticante */}
                <div>
                  <Label>6) PERFIL PRATICANTE (ASSINATURA PRATICANTE)</Label>

                  {/* Altura e Peso */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div>
                      <Label htmlFor="ec-altura">Altura (cm)</Label>
                      <Input
                        id="ec-altura"
                        type="number"
                        value={estudoCasoData.altura}
                        onChange={(e) => setEstudoCasoData({ ...estudoCasoData, altura: e.target.value })}
                        placeholder="Ex: 170"
                      />
                    </div>
                    <div>
                      <Label htmlFor="ec-peso">Peso (kg)</Label>
                      <Input
                        id="ec-peso"
                        type="number"
                        value={estudoCasoData.peso}
                        onChange={(e) => setEstudoCasoData({ ...estudoCasoData, peso: e.target.value })}
                        placeholder="Ex: 70"
                      />
                    </div>
                  </div>

                  {/* Bonecos e Marcações */}
                  <div className="space-y-6 mt-6">
                    {/* Boneco Órtese e Prótese */}
                    <div className="border border-gray-300 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-900 mb-3 text-center">Órtese e Prótese</h4>
                      <p className="text-xs text-gray-500 mb-3 text-center">Clique nas partes para marcar. Clique novamente para alternar.</p>

                      {/* Legenda de cores */}
                      <div className="flex flex-wrap gap-3 justify-center mb-4 text-xs">
                        <div className="flex items-center gap-1">
                          <div className="w-3 h-3 rounded-full bg-red-500"></div>
                          <span>Órtese</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                          <span>Prótese</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <div className="w-3 h-3 rounded-full" style={{ background: 'linear-gradient(90deg, #ef4444 50%, #3b82f6 50%)' }}></div>
                          <span>Ambos</span>
                        </div>
                      </div>

                      <svg viewBox="0 0 200 330" className="w-full max-w-[200px] mx-auto" style={{ cursor: 'pointer' }}>
                        {(() => {
                          const toggleMarcacao = (parte: string) => {
                            const novasMarcacoes = { ...estudoCasoData.marcacoesOrtese };
                            const atual = novasMarcacoes[parte] || { ortese: false, protese: false };

                            if (!atual.ortese && !atual.protese) {
                              novasMarcacoes[parte] = { ortese: true, protese: false };
                            } else if (atual.ortese && !atual.protese) {
                              novasMarcacoes[parte] = { ortese: false, protese: true };
                            } else if (!atual.ortese && atual.protese) {
                              novasMarcacoes[parte] = { ortese: true, protese: true };
                            } else {
                              novasMarcacoes[parte] = { ortese: false, protese: false };
                            }

                            setEstudoCasoData({ ...estudoCasoData, marcacoesOrtese: novasMarcacoes });
                          };

                          // Definir todas as partes com suas posições
                          const partes = [
                            { nome: 'cabeca', tipo: 'circle', cx: 100, cy: 35, r: 20, rClick: 28 },
                            { nome: 'pescoco', tipo: 'rect', x: 94, y: 55, width: 12, height: 15, xClick: 90, yClick: 52, widthClick: 20, heightClick: 21 },
                            { nome: 'torax', tipo: 'rect', x: 75, y: 70, width: 50, height: 35, rx: 3, xClick: 70, yClick: 67, widthClick: 60, heightClick: 41 },
                            { nome: 'abdomen', tipo: 'rect', x: 78, y: 105, width: 44, height: 30, rx: 3, xClick: 73, yClick: 102, widthClick: 54, heightClick: 36 },
                            { nome: 'ombro_esquerdo', tipo: 'circle', cx: 125, cy: 75, r: 8, rClick: 14 },
                            { nome: 'ombro_direito', tipo: 'circle', cx: 75, cy: 75, r: 8, rClick: 14 },
                            { nome: 'braco_esquerdo', tipo: 'line', x1: 125, y1: 83, x2: 145, y2: 115, width: 10, widthClick: 20, cx: 135, cy: 99 },
                            { nome: 'braco_direito', tipo: 'line', x1: 75, y1: 83, x2: 55, y2: 115, width: 10, widthClick: 20, cx: 65, cy: 99 },
                            { nome: 'cotovelo_esquerdo', tipo: 'circle', cx: 145, cy: 115, r: 6, rClick: 14 },
                            { nome: 'cotovelo_direito', tipo: 'circle', cx: 55, cy: 115, r: 6, rClick: 14 },
                            { nome: 'antebraco_esquerdo', tipo: 'line', x1: 145, y1: 121, x2: 155, y2: 155, width: 8, widthClick: 18, cx: 150, cy: 138 },
                            { nome: 'antebraco_direito', tipo: 'line', x1: 55, y1: 121, x2: 45, y2: 155, width: 8, widthClick: 18, cx: 50, cy: 138 },
                            { nome: 'punho_esquerdo', tipo: 'circle', cx: 155, cy: 155, r: 5, rClick: 12 },
                            { nome: 'punho_direito', tipo: 'circle', cx: 45, cy: 155, r: 5, rClick: 12 },
                            { nome: 'mao_esquerda', tipo: 'ellipse', cx: 158, cy: 167, rx: 6, ry: 10, rxClick: 11, ryClick: 15 },
                            { nome: 'mao_direita', tipo: 'ellipse', cx: 42, cy: 167, rx: 6, ry: 10, rxClick: 11, ryClick: 15 },
                            { nome: 'quadril', tipo: 'rect', x: 82, y: 135, width: 36, height: 20, rx: 3, xClick: 77, yClick: 132, widthClick: 46, heightClick: 26, cx: 100, cy: 145 },
                            { nome: 'coxa_esquerda', tipo: 'line', x1: 110, y1: 155, x2: 115, y2: 220, width: 12, widthClick: 22, cx: 113, cy: 187 },
                            { nome: 'coxa_direita', tipo: 'line', x1: 90, y1: 155, x2: 85, y2: 220, width: 12, widthClick: 22, cx: 87, cy: 187 },
                            { nome: 'joelho_esquerdo', tipo: 'circle', cx: 115, cy: 220, r: 7, rClick: 14 },
                            { nome: 'joelho_direito', tipo: 'circle', cx: 85, cy: 220, r: 7, rClick: 14 },
                            { nome: 'perna_esquerda', tipo: 'line', x1: 115, y1: 227, x2: 120, y2: 300, width: 10, widthClick: 20, cx: 118, cy: 263 },
                            { nome: 'perna_direita', tipo: 'line', x1: 85, y1: 227, x2: 80, y2: 300, width: 10, widthClick: 20, cx: 82, cy: 263 },
                            { nome: 'tornozelo_esquerdo', tipo: 'circle', cx: 120, cy: 300, r: 5, rClick: 12 },
                            { nome: 'tornozelo_direito', tipo: 'circle', cx: 80, cy: 300, r: 5, rClick: 12 },
                            { nome: 'pe_esquerdo', tipo: 'ellipse', cx: 125, cy: 312, rx: 10, ry: 6, rxClick: 15, ryClick: 11 },
                            { nome: 'pe_direito', tipo: 'ellipse', cx: 75, cy: 312, rx: 10, ry: 6, rxClick: 15, ryClick: 11 },
                          ];

                          return (
                            <>
                              {/* CAMADA 1: Elementos visuais do corpo */}
                              {partes.map(parte => {
                                if (parte.tipo === 'circle') {
                                  return <circle key={`visual-${parte.nome}`} cx={parte.cx} cy={parte.cy} r={parte.r} fill="#f0f0f0" stroke="#333" strokeWidth="2" />;
                                } else if (parte.tipo === 'rect') {
                                  return <rect key={`visual-${parte.nome}`} x={parte.x} y={parte.y} width={parte.width} height={parte.height} rx={parte.rx || 0} fill="#f0f0f0" stroke="#333" strokeWidth="2" />;
                                } else if (parte.tipo === 'line') {
                                  return <line key={`visual-${parte.nome}`} x1={parte.x1} y1={parte.y1} x2={parte.x2} y2={parte.y2} stroke="#333" strokeWidth={parte.width} />;
                                } else if (parte.tipo === 'ellipse') {
                                  return <ellipse key={`visual-${parte.nome}`} cx={parte.cx} cy={parte.cy} rx={parte.rx} ry={parte.ry} fill="#f0f0f0" stroke="#333" strokeWidth="2" />;
                                }
                                return null;
                              })}

                              {/* CAMADA 2: Marcações coloridas */}
                              {partes.map(parte => {
                                const marcacao = estudoCasoData.marcacoesOrtese[parte.nome] || { ortese: false, protese: false };
                                if (!marcacao.ortese && !marcacao.protese) return null;

                                const cx = parte.cx || parte.x + (parte.width || 0) / 2;
                                const cy = parte.cy || parte.y + (parte.height || 0) / 2;

                                if (marcacao.ortese && marcacao.protese) {
                                  return (
                                    <g key={`mark-${parte.nome}`}>
                                      <circle cx={cx - 3} cy={cy} r="6" fill="#ef4444" />
                                      <circle cx={cx + 3} cy={cy} r="6" fill="#3b82f6" />
                                    </g>
                                  );
                                }
                                return <circle key={`mark-${parte.nome}`} cx={cx} cy={cy} r="7" fill={marcacao.ortese ? '#ef4444' : '#3b82f6'} />;
                              })}

                              {/* CAMADA 3: Áreas clicáveis transparentes (sempre por cima) */}
                              {partes.map(parte => {
                                if (parte.tipo === 'circle') {
                                  return (
                                    <circle
                                      key={`click-${parte.nome}`}
                                      cx={parte.cx}
                                      cy={parte.cy}
                                      r={parte.rClick}
                                      fill="transparent"
                                      stroke="transparent"
                                      strokeWidth="6"
                                      className="cursor-pointer hover:fill-gray-200 hover:fill-opacity-20 transition-all"
                                      onClick={(e) => { e.stopPropagation(); toggleMarcacao(parte.nome); }}
                                    />
                                  );
                                } else if (parte.tipo === 'rect') {
                                  return (
                                    <rect
                                      key={`click-${parte.nome}`}
                                      x={parte.xClick || parte.x}
                                      y={parte.yClick || parte.y}
                                      width={parte.widthClick || parte.width}
                                      height={parte.heightClick || parte.height}
                                      fill="transparent"
                                      className="cursor-pointer hover:fill-gray-200 hover:fill-opacity-20 transition-all"
                                      onClick={(e) => { e.stopPropagation(); toggleMarcacao(parte.nome); }}
                                    />
                                  );
                                } else if (parte.tipo === 'line') {
                                  return (
                                    <line
                                      key={`click-${parte.nome}`}
                                      x1={parte.x1}
                                      y1={parte.y1}
                                      x2={parte.x2}
                                      y2={parte.y2}
                                      stroke="transparent"
                                      strokeWidth={parte.widthClick}
                                      className="cursor-pointer hover:stroke-gray-400 hover:stroke-opacity-30 transition-all"
                                      onClick={(e) => { e.stopPropagation(); toggleMarcacao(parte.nome); }}
                                    />
                                  );
                                } else if (parte.tipo === 'ellipse') {
                                  return (
                                    <ellipse
                                      key={`click-${parte.nome}`}
                                      cx={parte.cx}
                                      cy={parte.cy}
                                      rx={parte.rxClick || parte.rx}
                                      ry={parte.ryClick || parte.ry}
                                      fill="transparent"
                                      className="cursor-pointer hover:fill-gray-200 hover:fill-opacity-20 transition-all"
                                      onClick={(e) => { e.stopPropagation(); toggleMarcacao(parte.nome); }}
                                    />
                                  );
                                }
                                return null;
                              })}
                            </>
                          );
                        })()}
                      </svg>

                      {/* Lista de marcações ativas */}
                      {Object.keys(estudoCasoData.marcacoesOrtese).filter(parte => {
                        const m = estudoCasoData.marcacoesOrtese[parte];
                        return m && (m.ortese || m.protese);
                      }).length > 0 && (
                        <div className="mt-4 p-3 bg-gray-50 rounded border border-gray-200">
                          <p className="text-xs font-semibold text-gray-700 mb-2">Marcações selecionadas:</p>
                          <div className="space-y-1 text-xs text-gray-600">
                            {Object.entries(estudoCasoData.marcacoesOrtese).map(([parte, marcacao]) => {
                              if (!marcacao || (!marcacao.ortese && !marcacao.protese)) return null;
                              const nomeFormatado = parte.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
                              const tipos = [];
                              if (marcacao.ortese) tipos.push('Órtese');
                              if (marcacao.protese) tipos.push('Prótese');
                              return (
                                <div key={parte} className="flex items-center gap-2">
                                  <span className="font-medium">{nomeFormatado}:</span>
                                  <span>{tipos.join(' + ')}</span>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}

                      {/* Observações sobre Órtese e Prótese */}
                      <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Observações sobre Órtese e Prótese
                        </label>
                        <textarea
                          value={estudoCasoData.observacoesOrtese}
                          onChange={(e) => setEstudoCasoData({ ...estudoCasoData, observacoesOrtese: e.target.value })}
                          rows={4}
                          className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                          placeholder="Digite aqui as observações sobre a órtese e prótese..."
                        />
                      </div>
                    </div>

                    {/* Boneco Físico */}
                    <div className="border border-gray-300 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-900 mb-3 text-center">Físico</h4>
                      <p className="text-xs text-gray-500 mb-3 text-center">Clique nas partes do corpo para adicionar marcação</p>

                      {/* Legenda */}
                      <div className="grid grid-cols-2 gap-1 mb-4 text-xs">
                        <div className="flex items-center gap-1">
                          <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                          <span>Esqueleto</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <div className="w-3 h-3 rounded-full bg-red-500"></div>
                          <span>Muscular</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                          <span>Motor</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <div className="w-3 h-3 rounded-full bg-gray-500"></div>
                          <span>Ausência</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                          <span>Má formação</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                          <span>Lesão</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <div className="w-3 h-3 rounded-full bg-pink-500"></div>
                          <span>Doença</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <div className="w-3 h-3 rounded-full bg-indigo-500"></div>
                          <span>Transtorno invisível</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <div className="w-3 h-3 rounded-full bg-green-500"></div>
                          <span>Sem resposta</span>
                        </div>
                      </div>

                      {(() => {
                        const getTipoColor = (tipo: string) => {
                          const cores: { [key: string]: string } = {
                            'esqueleto': '#a855f7',
                            'muscular': '#ef4444',
                            'motor': '#3b82f6',
                            'ausência de membro': '#6b7280',
                            'má formação': '#eab308',
                            'lesão': '#f97316',
                            'doença': '#ec4899',
                            'transtorno patológica invisível': '#6366f1',
                            'sem resposta nervosa ou motora': '#22c55e'
                          };
                          return cores[tipo] || '#22c55e';
                        };

                        const handleClickParte = (parte: string) => {
                          setParteCorpoSelecionada(parte);
                          setShowModalMarcacaoFisica(true);
                        };

                        return (
                          <>
                            <svg viewBox="0 0 200 330" className="w-full max-w-[200px] mx-auto">
                              {(() => {

                          // Definir todas as partes com suas posições
                          const partes = [
                            { nome: 'cabeca', tipo: 'circle', cx: 100, cy: 35, r: 20, rClick: 28 },
                            { nome: 'pescoco', tipo: 'rect', x: 94, y: 55, width: 12, height: 15, xClick: 90, yClick: 52, widthClick: 20, heightClick: 21 },
                            { nome: 'torax', tipo: 'rect', x: 75, y: 70, width: 50, height: 35, rx: 3, xClick: 70, yClick: 67, widthClick: 60, heightClick: 41 },
                            { nome: 'abdomen', tipo: 'rect', x: 78, y: 105, width: 44, height: 30, rx: 3, xClick: 73, yClick: 102, widthClick: 54, heightClick: 36 },
                            { nome: 'ombro_esquerdo', tipo: 'circle', cx: 125, cy: 75, r: 8, rClick: 14 },
                            { nome: 'ombro_direito', tipo: 'circle', cx: 75, cy: 75, r: 8, rClick: 14 },
                            { nome: 'braco_esquerdo', tipo: 'line', x1: 125, y1: 83, x2: 145, y2: 115, width: 10, widthClick: 20, cx: 135, cy: 99 },
                            { nome: 'braco_direito', tipo: 'line', x1: 75, y1: 83, x2: 55, y2: 115, width: 10, widthClick: 20, cx: 65, cy: 99 },
                            { nome: 'cotovelo_esquerdo', tipo: 'circle', cx: 145, cy: 115, r: 6, rClick: 14 },
                            { nome: 'cotovelo_direito', tipo: 'circle', cx: 55, cy: 115, r: 6, rClick: 14 },
                            { nome: 'antebraco_esquerdo', tipo: 'line', x1: 145, y1: 121, x2: 155, y2: 155, width: 8, widthClick: 18, cx: 150, cy: 138 },
                            { nome: 'antebraco_direito', tipo: 'line', x1: 55, y1: 121, x2: 45, y2: 155, width: 8, widthClick: 18, cx: 50, cy: 138 },
                            { nome: 'punho_esquerdo', tipo: 'circle', cx: 155, cy: 155, r: 5, rClick: 12 },
                            { nome: 'punho_direito', tipo: 'circle', cx: 45, cy: 155, r: 5, rClick: 12 },
                            { nome: 'mao_esquerda', tipo: 'ellipse', cx: 158, cy: 167, rx: 6, ry: 10, rxClick: 11, ryClick: 15 },
                            { nome: 'mao_direita', tipo: 'ellipse', cx: 42, cy: 167, rx: 6, ry: 10, rxClick: 11, ryClick: 15 },
                            { nome: 'quadril', tipo: 'rect', x: 82, y: 135, width: 36, height: 20, rx: 3, xClick: 77, yClick: 132, widthClick: 46, heightClick: 26, cx: 100, cy: 145 },
                            { nome: 'coxa_esquerda', tipo: 'line', x1: 110, y1: 155, x2: 115, y2: 220, width: 12, widthClick: 22, cx: 113, cy: 187 },
                            { nome: 'coxa_direita', tipo: 'line', x1: 90, y1: 155, x2: 85, y2: 220, width: 12, widthClick: 22, cx: 87, cy: 187 },
                            { nome: 'joelho_esquerdo', tipo: 'circle', cx: 115, cy: 220, r: 7, rClick: 14 },
                            { nome: 'joelho_direito', tipo: 'circle', cx: 85, cy: 220, r: 7, rClick: 14 },
                            { nome: 'perna_esquerda', tipo: 'line', x1: 115, y1: 227, x2: 120, y2: 300, width: 10, widthClick: 20, cx: 118, cy: 263 },
                            { nome: 'perna_direita', tipo: 'line', x1: 85, y1: 227, x2: 80, y2: 300, width: 10, widthClick: 20, cx: 82, cy: 263 },
                            { nome: 'tornozelo_esquerdo', tipo: 'circle', cx: 120, cy: 300, r: 5, rClick: 12 },
                            { nome: 'tornozelo_direito', tipo: 'circle', cx: 80, cy: 300, r: 5, rClick: 12 },
                            { nome: 'pe_esquerdo', tipo: 'ellipse', cx: 125, cy: 312, rx: 10, ry: 6, rxClick: 15, ryClick: 11 },
                            { nome: 'pe_direito', tipo: 'ellipse', cx: 75, cy: 312, rx: 10, ry: 6, rxClick: 15, ryClick: 11 },
                          ];

                          return (
                            <>
                              {/* CAMADA 1: Elementos visuais do corpo */}
                              {partes.map(parte => {
                                if (parte.tipo === 'circle') {
                                  return <circle key={`visual-${parte.nome}`} cx={parte.cx} cy={parte.cy} r={parte.r} fill="#f0f0f0" stroke="#333" strokeWidth="2" />;
                                } else if (parte.tipo === 'rect') {
                                  return <rect key={`visual-${parte.nome}`} x={parte.x} y={parte.y} width={parte.width} height={parte.height} rx={parte.rx || 0} fill="#f0f0f0" stroke="#333" strokeWidth="2" />;
                                } else if (parte.tipo === 'line') {
                                  return <line key={`visual-${parte.nome}`} x1={parte.x1} y1={parte.y1} x2={parte.x2} y2={parte.y2} stroke="#333" strokeWidth={parte.width} />;
                                } else if (parte.tipo === 'ellipse') {
                                  return <ellipse key={`visual-${parte.nome}`} cx={parte.cx} cy={parte.cy} rx={parte.rx} ry={parte.ry} fill="#f0f0f0" stroke="#333" strokeWidth="2" />;
                                }
                                return null;
                              })}

                              {/* CAMADA 2: Marcações coloridas */}
                              {partes.map(parte => {
                                const marcacoesFisicaArray = Array.isArray(estudoCasoData.marcacoesFisica) ? estudoCasoData.marcacoesFisica : [];
                                const marcacoes = marcacoesFisicaArray.filter(m => m.parteCorpo === parte.nome);
                                if (marcacoes.length === 0) return null;

                                const cx = parte.cx || (parte.x ?? 0) + ((parte.width ?? 0) / 2);
                                const cy = parte.cy || (parte.y ?? 0) + ((parte.height ?? 0) / 2);

                                // Se houver múltiplas marcações, renderizar círculos menores lado a lado
                                if (marcacoes.length === 1) {
                                  return <circle key={`mark-${parte.nome}`} cx={cx} cy={cy} r="7" fill={getTipoColor(marcacoes[0].tipo)} />;
                                } else {
                                  const offset = 4;
                                  return (
                                    <g key={`mark-${parte.nome}`}>
                                      {marcacoes.slice(0, 3).map((marcacao, idx) => (
                                        <circle
                                          key={`mark-${parte.nome}-${idx}`}
                                          cx={cx + (idx - 1) * offset}
                                          cy={cy}
                                          r="5"
                                          fill={getTipoColor(marcacao.tipo)}
                                        />
                                      ))}
                                    </g>
                                  );
                                }
                              })}

                              {/* CAMADA 3: Áreas clicáveis transparentes (sempre por cima) */}
                              {partes.map(parte => {
                                if (parte.tipo === 'circle') {
                                  return (
                                    <circle
                                      key={`click-${parte.nome}`}
                                      cx={parte.cx}
                                      cy={parte.cy}
                                      r={parte.rClick}
                                      fill="transparent"
                                      stroke="transparent"
                                      strokeWidth="6"
                                      className="cursor-pointer hover:fill-gray-200 hover:fill-opacity-20 transition-all"
                                      onClick={(e) => { e.stopPropagation(); handleClickParte(parte.nome); }}
                                    />
                                  );
                                } else if (parte.tipo === 'rect') {
                                  return (
                                    <rect
                                      key={`click-${parte.nome}`}
                                      x={parte.xClick || parte.x}
                                      y={parte.yClick || parte.y}
                                      width={parte.widthClick || parte.width}
                                      height={parte.heightClick || parte.height}
                                      fill="transparent"
                                      className="cursor-pointer hover:fill-gray-200 hover:fill-opacity-20 transition-all"
                                      onClick={(e) => { e.stopPropagation(); handleClickParte(parte.nome); }}
                                    />
                                  );
                                } else if (parte.tipo === 'line') {
                                  return (
                                    <line
                                      key={`click-${parte.nome}`}
                                      x1={parte.x1}
                                      y1={parte.y1}
                                      x2={parte.x2}
                                      y2={parte.y2}
                                      stroke="transparent"
                                      strokeWidth={parte.widthClick}
                                      className="cursor-pointer hover:stroke-gray-400 hover:stroke-opacity-30 transition-all"
                                      onClick={(e) => { e.stopPropagation(); handleClickParte(parte.nome); }}
                                    />
                                  );
                                } else if (parte.tipo === 'ellipse') {
                                  return (
                                    <ellipse
                                      key={`click-${parte.nome}`}
                                      cx={parte.cx}
                                      cy={parte.cy}
                                      rx={parte.rxClick || parte.rx}
                                      ry={parte.ryClick || parte.ry}
                                      fill="transparent"
                                      className="cursor-pointer hover:fill-gray-200 hover:fill-opacity-20 transition-all"
                                      onClick={(e) => { e.stopPropagation(); handleClickParte(parte.nome); }}
                                    />
                                  );
                                }
                                return null;
                              })}
                            </>
                          );
                        })()}
                      </svg>

                      {/* Lista de marcações */}
                      {Array.isArray(estudoCasoData.marcacoesFisica) && estudoCasoData.marcacoesFisica.length > 0 && (
                        <div className="mt-4 space-y-3">
                          <p className="text-sm font-semibold text-gray-700">Marcações cadastradas:</p>
                          {estudoCasoData.marcacoesFisica.map((marcacao, idx) => {
                            const nomeFormatado = marcacao.parteCorpo.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
                            return (
                              <div key={idx} className="p-3 bg-gray-50 rounded border border-gray-200">
                                <div className="flex items-center justify-between mb-2">
                                  <div className="flex items-center gap-2">
                                    <div
                                      className="w-3 h-3 rounded-full"
                                      style={{ backgroundColor: getTipoColor(marcacao.tipo) }}
                                    ></div>
                                    <span className="text-sm font-medium text-gray-900">
                                      {nomeFormatado} - {marcacao.tipo}
                                    </span>
                                  </div>
                                  <button
                                    onClick={() => {
                                      const marcacoesFisicaArray = Array.isArray(estudoCasoData.marcacoesFisica) ? estudoCasoData.marcacoesFisica : [];
                                      const novasMarcacoes = marcacoesFisicaArray.filter((_, i) => i !== idx);
                                      setEstudoCasoData({ ...estudoCasoData, marcacoesFisica: novasMarcacoes });
                                    }}
                                    className="text-red-500 hover:text-red-700 text-xs"
                                  >
                                    Remover
                                  </button>
                                </div>
                                <textarea
                                  value={marcacao.explicacao}
                                  onChange={(e) => {
                                    const marcacoesFisicaArray = Array.isArray(estudoCasoData.marcacoesFisica) ? estudoCasoData.marcacoesFisica : [];
                                    const novasMarcacoes = [...marcacoesFisicaArray];
                                    novasMarcacoes[idx] = { ...novasMarcacoes[idx], explicacao: e.target.value };
                                    setEstudoCasoData({ ...estudoCasoData, marcacoesFisica: novasMarcacoes });
                                  }}
                                  rows={2}
                                  className="w-full border border-gray-300 rounded p-2 text-xs focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                  placeholder="Explicação detalhada..."
                                />
                              </div>
                            );
                          })}
                        </div>
                      )}
                          </>
                        );
                      })()}
                    </div>
                  </div>
                </div>

                {/* 7. Severidade do Quadro e Grau de Suporte */}
                <div>
                  <Label>7) SEVERIDADE DO QUADRO E GRAU DE SUPORTE</Label>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    {/* Severidade do Quadro */}
                    <div className="border border-gray-300 rounded-lg p-4">
                      <Label className="text-base font-semibold mb-3 block">Severidade do Quadro</Label>
                      <div className="space-y-2">
                        <div className="flex items-center gap-3">
                          <input
                            type="radio"
                            id="severidade-alta"
                            name="severidade"
                            checked={estudoCasoData.severidadeQuadro === 'ALTA'}
                            onChange={() => setEstudoCasoData({ ...estudoCasoData, severidadeQuadro: 'ALTA' })}
                            className="w-4 h-4 cursor-pointer"
                          />
                          <label htmlFor="severidade-alta" className="text-sm cursor-pointer">
                            ALTA
                          </label>
                        </div>
                        <div className="flex items-center gap-3">
                          <input
                            type="radio"
                            id="severidade-baixa"
                            name="severidade"
                            checked={estudoCasoData.severidadeQuadro === 'BAIXA'}
                            onChange={() => setEstudoCasoData({ ...estudoCasoData, severidadeQuadro: 'BAIXA' })}
                            className="w-4 h-4 cursor-pointer"
                          />
                          <label htmlFor="severidade-baixa" className="text-sm cursor-pointer">
                            BAIXA
                          </label>
                        </div>
                      </div>
                    </div>

                    {/* Grau de Suporte */}
                    <div className="border border-gray-300 rounded-lg p-4">
                      <Label className="text-base font-semibold mb-3 block">Grau de Suporte</Label>
                      <div className="space-y-2">
                        <div className="flex items-center gap-3">
                          <input
                            type="radio"
                            id="suporte-alta"
                            name="suporte"
                            checked={estudoCasoData.grauSuporte === 'ALTA'}
                            onChange={() => setEstudoCasoData({ ...estudoCasoData, grauSuporte: 'ALTA' })}
                            className="w-4 h-4 cursor-pointer"
                          />
                          <label htmlFor="suporte-alta" className="text-sm cursor-pointer">
                            ALTA
                          </label>
                        </div>
                        <div className="flex items-center gap-3">
                          <input
                            type="radio"
                            id="suporte-baixa"
                            name="suporte"
                            checked={estudoCasoData.grauSuporte === 'BAIXA'}
                            onChange={() => setEstudoCasoData({ ...estudoCasoData, grauSuporte: 'BAIXA' })}
                            className="w-4 h-4 cursor-pointer"
                          />
                          <label htmlFor="suporte-baixa" className="text-sm cursor-pointer">
                            BAIXA
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 8. Hipótese iniciais de sessão */}
                <div>
                  <Label>8) Hipótese iniciais de sessão:</Label>

                  <div className="mt-4">
                    <Label className="text-base font-semibold mb-3 block">A - Precauções (pode ser mais de uma alternativa)</Label>
                    <div className="space-y-2 ml-4">
                      {[
                        'arranque brusco do cavalo "anca mais alta, equino + enérgico, transpista"',
                        'excesso de impacto biomecânico',
                        'estímulo excessivamente intenso',
                        'tempo prolongado de exposição inicial',
                        'sobrecarga vestibular',
                        'sobrecarga sensorial',
                        'evitar fadiga praticante "em quadros degenerativos"',
                        'excesso de velocidade',
                        'praticante instável',
                        'praticante sem noção periculosidade',
                        'retirada de emergência "peso praticante"',
                        'atentar-se risco/sensível a luxação',
                        'atentar-se alteração cardiorrespiratória durante o atendimento',
                        'saúde sensível. Risco alérgico.'
                      ].map((precaucao, index) => (
                        <div key={index} className="flex items-start gap-2">
                          <input
                            type="checkbox"
                            id={`precaucao-alt-${index}`}
                            checked={estudoCasoData.precaucoes.includes(precaucao)}
                            onChange={(e) => {
                              const novasPrecaucoes = e.target.checked
                                ? [...estudoCasoData.precaucoes, precaucao]
                                : estudoCasoData.precaucoes.filter(p => p !== precaucao);
                              setEstudoCasoData({ ...estudoCasoData, precaucoes: novasPrecaucoes });
                            }}
                            className="w-4 h-4 mt-0.5 cursor-pointer flex-shrink-0"
                          />
                          <label htmlFor={`precaucao-alt-${index}`} className="text-sm cursor-pointer">
                            {precaucao}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* B - Indicativos */}
                  <div className="mt-6 space-y-6">
                    <Label className="text-base font-semibold block">B - Indicativos (selecione uma opção de cada categoria)</Label>

                    {/* TEMPERAMENTO EQUINO */}
                    <div className="ml-4 border-l-2 border-indigo-200 pl-4">
                      <Label className="text-sm font-semibold mb-2 block">TEMPERAMENTO EQUINO</Label>
                      <div className="space-y-2">
                        <div className="flex items-start gap-2">
                          <input
                            type="radio"
                            id="temp-energico"
                            name="temperamentoEquino"
                            checked={estudoCasoData.temperamentoEquino === 'EQUINO ENÉRGICO'}
                            onChange={() => setEstudoCasoData({ ...estudoCasoData, temperamentoEquino: 'EQUINO ENÉRGICO' })}
                            className="w-4 h-4 mt-0.5 cursor-pointer"
                          />
                          <label htmlFor="temp-energico" className="text-sm cursor-pointer">
                            <span className="font-medium">EQUINO ENÉRGICO</span><br/>
                            <span className="text-gray-600">Praticante calmo</span>
                          </label>
                        </div>
                        <div className="flex items-start gap-2">
                          <input
                            type="radio"
                            id="temp-calmo"
                            name="temperamentoEquino"
                            checked={estudoCasoData.temperamentoEquino === 'EQUINO CALMO'}
                            onChange={() => setEstudoCasoData({ ...estudoCasoData, temperamentoEquino: 'EQUINO CALMO' })}
                            className="w-4 h-4 mt-0.5 cursor-pointer"
                          />
                          <label htmlFor="temp-calmo" className="text-sm cursor-pointer">
                            <span className="font-medium">EQUINO CALMO</span><br/>
                            <span className="text-gray-600">Praticante agitado, medroso, impulsivo</span>
                          </label>
                        </div>
                      </div>
                    </div>

                    {/* INSTABILIDADE EQUINO */}
                    <div className="ml-4 border-l-2 border-indigo-200 pl-4">
                      <Label className="text-sm font-semibold mb-2 block">INSTABILIDADE EQUINO</Label>
                      <div className="space-y-2">
                        <div className="flex items-start gap-2">
                          <input
                            type="radio"
                            id="instab-alta"
                            name="instabilidadeEquino"
                            checked={estudoCasoData.instabilidadeEquino === 'ALTA'}
                            onChange={() => setEstudoCasoData({ ...estudoCasoData, instabilidadeEquino: 'ALTA' })}
                            className="w-4 h-4 mt-0.5 cursor-pointer"
                          />
                          <label htmlFor="instab-alta" className="text-sm cursor-pointer">
                            <span className="font-medium">ALTA</span><br/>
                            <span className="text-gray-600">Praticante hipertônico<br/>Equino - largo, asfalto, manta</span>
                          </label>
                        </div>
                        <div className="flex items-start gap-2">
                          <input
                            type="radio"
                            id="instab-media"
                            name="instabilidadeEquino"
                            checked={estudoCasoData.instabilidadeEquino === 'MÉDIA'}
                            onChange={() => setEstudoCasoData({ ...estudoCasoData, instabilidadeEquino: 'MÉDIA' })}
                            className="w-4 h-4 mt-0.5 cursor-pointer"
                          />
                          <label htmlFor="instab-media" className="text-sm cursor-pointer font-medium">
                            MÉDIA
                          </label>
                        </div>
                        <div className="flex items-start gap-2">
                          <input
                            type="radio"
                            id="instab-baixa"
                            name="instabilidadeEquino"
                            checked={estudoCasoData.instabilidadeEquino === 'BAIXA'}
                            onChange={() => setEstudoCasoData({ ...estudoCasoData, instabilidadeEquino: 'BAIXA' })}
                            className="w-4 h-4 mt-0.5 cursor-pointer"
                          />
                          <label htmlFor="instab-baixa" className="text-sm cursor-pointer">
                            <span className="font-medium">BAIXA</span><br/>
                            <span className="text-gray-600">Praticante hipotônico<br/>Equino +largo, areia, sela</span>
                          </label>
                        </div>
                      </div>
                    </div>

                    {/* QUADRIL PRATICANTE LARGURA EQUINO */}
                    <div className="ml-4 border-l-2 border-indigo-200 pl-4">
                      <Label className="text-sm font-semibold mb-2 block">QUADRIL PRATICANTE LARGURA EQUINO</Label>
                      <div className="space-y-2">
                        <div className="flex items-start gap-2">
                          <input
                            type="radio"
                            id="quadril-aducao"
                            name="quadrilPraticante"
                            checked={estudoCasoData.quadrilPraticante === 'ADUÇÃO'}
                            onChange={() => setEstudoCasoData({ ...estudoCasoData, quadrilPraticante: 'ADUÇÃO' })}
                            className="w-4 h-4 mt-0.5 cursor-pointer"
                          />
                          <label htmlFor="quadril-aducao" className="text-sm cursor-pointer">
                            <span className="font-medium">ADUÇÃO</span><br/>
                            <span className="text-gray-600">Praticante Risco luxação</span>
                          </label>
                        </div>
                        <div className="flex items-start gap-2">
                          <input
                            type="radio"
                            id="quadril-abducao"
                            name="quadrilPraticante"
                            checked={estudoCasoData.quadrilPraticante === 'ABDUÇÃO'}
                            onChange={() => setEstudoCasoData({ ...estudoCasoData, quadrilPraticante: 'ABDUÇÃO' })}
                            className="w-4 h-4 mt-0.5 cursor-pointer"
                          />
                          <label htmlFor="quadril-abducao" className="text-sm cursor-pointer font-medium">
                            ABDUÇÃO
                          </label>
                        </div>
                      </div>
                    </div>

                    {/* INTENSIDADE DO ESTÍMULO M3D */}
                    <div className="ml-4 border-l-2 border-indigo-200 pl-4">
                      <Label className="text-sm font-semibold mb-2 block">INTENSIDADE DO ESTÍMULO M3D</Label>
                      <div className="space-y-2">
                        <div className="flex items-start gap-2">
                          <input
                            type="radio"
                            id="intens-alta"
                            name="intensidadeEstimulo"
                            checked={estudoCasoData.intensidadeEstimulo === 'ALTA'}
                            onChange={() => setEstudoCasoData({ ...estudoCasoData, intensidadeEstimulo: 'ALTA' })}
                            className="w-4 h-4 mt-0.5 cursor-pointer"
                          />
                          <label htmlFor="intens-alta" className="text-sm cursor-pointer">
                            <span className="font-medium">ALTA</span><br/>
                            <span className="text-gray-600">Praticante calmo/agitado, hipotônico/hipertônico<br/>Equino +alto, transpista, manta</span>
                          </label>
                        </div>
                        <div className="flex items-start gap-2">
                          <input
                            type="radio"
                            id="intens-baixa"
                            name="intensidadeEstimulo"
                            checked={estudoCasoData.intensidadeEstimulo === 'BAIXA'}
                            onChange={() => setEstudoCasoData({ ...estudoCasoData, intensidadeEstimulo: 'BAIXA' })}
                            className="w-4 h-4 mt-0.5 cursor-pointer"
                          />
                          <label htmlFor="intens-baixa" className="text-sm cursor-pointer">
                            <span className="font-medium">BAIXA</span><br/>
                            <span className="text-gray-600">Praticante quando há precauções<br/>Equino +baixo, antepista, sela, anca proporcional ao corpo</span>
                          </label>
                        </div>
                        <div className="flex items-start gap-2">
                          <input
                            type="radio"
                            id="intens-progressiva"
                            name="intensidadeEstimulo"
                            checked={estudoCasoData.intensidadeEstimulo === 'PROGRESSIVA'}
                            onChange={() => setEstudoCasoData({ ...estudoCasoData, intensidadeEstimulo: 'PROGRESSIVA' })}
                            className="w-4 h-4 mt-0.5 cursor-pointer"
                          />
                          <label htmlFor="intens-progressiva" className="text-sm cursor-pointer">
                            <span className="font-medium">PROGRESSIVA (MENOS → MAIS)</span>
                          </label>
                        </div>
                      </div>
                    </div>

                    {/* IMPACTO BIOMECÂNICO */}
                    <div className="ml-4 border-l-2 border-indigo-200 pl-4">
                      <Label className="text-sm font-semibold mb-2 block">IMPACTO BIOMECÂNICO</Label>
                      <div className="space-y-2">
                        <div className="flex items-start gap-2">
                          <input
                            type="radio"
                            id="impacto-alto"
                            name="impactoBiomecanico"
                            checked={estudoCasoData.impactoBiomecanico === 'ALTO'}
                            onChange={() => setEstudoCasoData({ ...estudoCasoData, impactoBiomecanico: 'ALTO' })}
                            className="w-4 h-4 mt-0.5 cursor-pointer"
                          />
                          <label htmlFor="impacto-alto" className="text-sm cursor-pointer">
                            <span className="font-medium">ALTO</span><br/>
                            <span className="text-gray-600">Praticante hipotônico<br/>Equino ferradura, asfalto, transpista, manta, anca avantajada</span>
                          </label>
                        </div>
                        <div className="flex items-start gap-2">
                          <input
                            type="radio"
                            id="impacto-medio"
                            name="impactoBiomecanico"
                            checked={estudoCasoData.impactoBiomecanico === 'MÉDIO'}
                            onChange={() => setEstudoCasoData({ ...estudoCasoData, impactoBiomecanico: 'MÉDIO' })}
                            className="w-4 h-4 mt-0.5 cursor-pointer"
                          />
                          <label htmlFor="impacto-medio" className="text-sm cursor-pointer font-medium">
                            MÉDIO
                          </label>
                        </div>
                        <div className="flex items-start gap-2">
                          <input
                            type="radio"
                            id="impacto-baixo"
                            name="impactoBiomecanico"
                            checked={estudoCasoData.impactoBiomecanico === 'BAIXO'}
                            onChange={() => setEstudoCasoData({ ...estudoCasoData, impactoBiomecanico: 'BAIXO' })}
                            className="w-4 h-4 mt-0.5 cursor-pointer"
                          />
                          <label htmlFor="impacto-baixo" className="text-sm cursor-pointer">
                            <span className="font-medium">BAIXO</span><br/>
                            <span className="text-gray-600">Praticante hipertônico<br/>Equino sem ferradura, areia, antepista, sela, estribo</span>
                          </label>
                        </div>
                      </div>
                    </div>

                    {/* AMPLITUDE MOVIMENTO */}
                    <div className="ml-4 border-l-2 border-indigo-200 pl-4">
                      <Label className="text-sm font-semibold mb-2 block">AMPLITUDE MOVIMENTO</Label>
                      <div className="space-y-2">
                        <div className="flex items-start gap-2">
                          <input
                            type="radio"
                            id="ampl-alta"
                            name="amplitudeMovimento"
                            checked={estudoCasoData.amplitudeMovimento === 'ALTA'}
                            onChange={() => setEstudoCasoData({ ...estudoCasoData, amplitudeMovimento: 'ALTA' })}
                            className="w-4 h-4 mt-0.5 cursor-pointer"
                          />
                          <label htmlFor="ampl-alta" className="text-sm cursor-pointer">
                            <span className="font-medium">ALTA</span><br/>
                            <span className="text-gray-600">Praticante agitado, hipertônico<br/>Equino +alto, transpista, manta</span>
                          </label>
                        </div>
                        <div className="flex items-start gap-2">
                          <input
                            type="radio"
                            id="ampl-media"
                            name="amplitudeMovimento"
                            checked={estudoCasoData.amplitudeMovimento === 'MÉDIA'}
                            onChange={() => setEstudoCasoData({ ...estudoCasoData, amplitudeMovimento: 'MÉDIA' })}
                            className="w-4 h-4 mt-0.5 cursor-pointer"
                          />
                          <label htmlFor="ampl-media" className="text-sm cursor-pointer font-medium">
                            MÉDIA
                          </label>
                        </div>
                        <div className="flex items-start gap-2">
                          <input
                            type="radio"
                            id="ampl-baixa"
                            name="amplitudeMovimento"
                            checked={estudoCasoData.amplitudeMovimento === 'BAIXA'}
                            onChange={() => setEstudoCasoData({ ...estudoCasoData, amplitudeMovimento: 'BAIXA' })}
                            className="w-4 h-4 mt-0.5 cursor-pointer"
                          />
                          <label htmlFor="ampl-baixa" className="text-sm cursor-pointer">
                            <span className="font-medium">BAIXA</span><br/>
                            <span className="text-gray-600">Praticante hipotônico, baixa reatividade<br/>Equino +baixo, antepista, sela</span>
                          </label>
                        </div>
                      </div>
                    </div>

                    {/* FREQUÊNCIA MOVIMENTO */}
                    <div className="ml-4 border-l-2 border-indigo-200 pl-4">
                      <Label className="text-sm font-semibold mb-2 block">FREQUÊNCIA MOVIMENTO</Label>
                      <div className="space-y-2">
                        <div className="flex items-start gap-2">
                          <input
                            type="radio"
                            id="freq-alta"
                            name="frequenciaMovimento"
                            checked={estudoCasoData.frequenciaMovimento === 'ALTA'}
                            onChange={() => setEstudoCasoData({ ...estudoCasoData, frequenciaMovimento: 'ALTA' })}
                            className="w-4 h-4 mt-0.5 cursor-pointer"
                          />
                          <label htmlFor="freq-alta" className="text-sm cursor-pointer">
                            <span className="font-medium">ALTA</span><br/>
                            <span className="text-gray-600">Praticante hipotônico, baixa reatividade<br/>Equino +baixo, antepista, manta</span>
                          </label>
                        </div>
                        <div className="flex items-start gap-2">
                          <input
                            type="radio"
                            id="freq-media"
                            name="frequenciaMovimento"
                            checked={estudoCasoData.frequenciaMovimento === 'MÉDIA'}
                            onChange={() => setEstudoCasoData({ ...estudoCasoData, frequenciaMovimento: 'MÉDIA' })}
                            className="w-4 h-4 mt-0.5 cursor-pointer"
                          />
                          <label htmlFor="freq-media" className="text-sm cursor-pointer font-medium">
                            MÉDIA
                          </label>
                        </div>
                        <div className="flex items-start gap-2">
                          <input
                            type="radio"
                            id="freq-baixa"
                            name="frequenciaMovimento"
                            checked={estudoCasoData.frequenciaMovimento === 'BAIXA'}
                            onChange={() => setEstudoCasoData({ ...estudoCasoData, frequenciaMovimento: 'BAIXA' })}
                            className="w-4 h-4 mt-0.5 cursor-pointer"
                          />
                          <label htmlFor="freq-baixa" className="text-sm cursor-pointer">
                            <span className="font-medium">BAIXA</span><br/>
                            <span className="text-gray-600">Praticante hipotônico, baixa reatividade<br/>Equino +alto, transpista, sela</span>
                          </label>
                        </div>
                      </div>
                    </div>

                    {/* VELOCIDADE */}
                    <div className="ml-4 border-l-2 border-indigo-200 pl-4">
                      <Label className="text-sm font-semibold mb-2 block">VELOCIDADE</Label>
                      <div className="space-y-2">
                        <div className="flex items-start gap-2">
                          <input
                            type="radio"
                            id="veloc-alta"
                            name="velocidade"
                            checked={estudoCasoData.velocidade === 'ALTA'}
                            onChange={() => setEstudoCasoData({ ...estudoCasoData, velocidade: 'ALTA' })}
                            className="w-4 h-4 mt-0.5 cursor-pointer"
                          />
                          <label htmlFor="veloc-alta" className="text-sm cursor-pointer font-medium">
                            ALTA
                          </label>
                        </div>
                        <div className="flex items-start gap-2">
                          <input
                            type="radio"
                            id="veloc-baixa"
                            name="velocidade"
                            checked={estudoCasoData.velocidade === 'BAIXA'}
                            onChange={() => setEstudoCasoData({ ...estudoCasoData, velocidade: 'BAIXA' })}
                            className="w-4 h-4 mt-0.5 cursor-pointer"
                          />
                          <label htmlFor="veloc-baixa" className="text-sm cursor-pointer font-medium">
                            BAIXA
                          </label>
                        </div>
                      </div>
                    </div>

                    {/* FEEDBACK SENSORIAL */}
                    <div className="ml-4 border-l-2 border-indigo-200 pl-4">
                      <Label className="text-sm font-semibold mb-2 block">FEEDBACK SENSORIAL</Label>
                      <div className="space-y-2">
                        <div className="flex items-start gap-2">
                          <input
                            type="radio"
                            id="feedback-constante"
                            name="feedbackSensorial"
                            checked={estudoCasoData.feedbackSensorial === 'CONSTANTE'}
                            onChange={() => setEstudoCasoData({ ...estudoCasoData, feedbackSensorial: 'CONSTANTE' })}
                            className="w-4 h-4 mt-0.5 cursor-pointer"
                          />
                          <label htmlFor="feedback-constante" className="text-sm cursor-pointer">
                            <span className="font-medium">CONSTANTE</span><br/>
                            <span className="text-gray-600">Praticante baixa resposta sensório motora, medo da montaria<br/>Equino estribo, rédea, manta, calça da vovó</span>
                          </label>
                        </div>
                        <div className="flex items-start gap-2">
                          <input
                            type="radio"
                            id="feedback-recorrente"
                            name="feedbackSensorial"
                            checked={estudoCasoData.feedbackSensorial === 'RECORRENTE'}
                            onChange={() => setEstudoCasoData({ ...estudoCasoData, feedbackSensorial: 'RECORRENTE' })}
                            className="w-4 h-4 mt-0.5 cursor-pointer"
                          />
                          <label htmlFor="feedback-recorrente" className="text-sm cursor-pointer font-medium">
                            RECORRENTE
                          </label>
                        </div>
                        <div className="flex items-start gap-2">
                          <input
                            type="radio"
                            id="feedback-ocasional"
                            name="feedbackSensorial"
                            checked={estudoCasoData.feedbackSensorial === 'OCASIONAL'}
                            onChange={() => setEstudoCasoData({ ...estudoCasoData, feedbackSensorial: 'OCASIONAL' })}
                            className="w-4 h-4 mt-0.5 cursor-pointer"
                          />
                          <label htmlFor="feedback-ocasional" className="text-sm cursor-pointer">
                            <span className="font-medium">OCASIONAL</span><br/>
                            <span className="text-gray-600">Praticante agitado, baixa, sobrecarga<br/>Equino estribo, rédea, manta</span>
                          </label>
                        </div>
                      </div>
                    </div>

                    {/* CONTROLE RÉDEA, GUIA */}
                    <div className="ml-4 border-l-2 border-indigo-200 pl-4">
                      <Label className="text-sm font-semibold mb-2 block">CONTROLE RÉDEA, GUIA</Label>
                      <div className="space-y-2">
                        <div className="flex items-start gap-2">
                          <input
                            type="radio"
                            id="controle-alta"
                            name="controleRedea"
                            checked={estudoCasoData.controleRedea === 'ALTA SENSIBILIDADE'}
                            onChange={() => setEstudoCasoData({ ...estudoCasoData, controleRedea: 'ALTA SENSIBILIDADE' })}
                            className="w-4 h-4 mt-0.5 cursor-pointer"
                          />
                          <label htmlFor="controle-alta" className="text-sm cursor-pointer">
                            <span className="font-medium">ALTA SENSIBILIDADE</span><br/>
                            <span className="text-gray-600">Praticante calmo, atleta<br/>Equino competidor</span>
                          </label>
                        </div>
                        <div className="flex items-start gap-2">
                          <input
                            type="radio"
                            id="controle-baixa"
                            name="controleRedea"
                            checked={estudoCasoData.controleRedea === 'BAIXA SENSIBILIDADE'}
                            onChange={() => setEstudoCasoData({ ...estudoCasoData, controleRedea: 'BAIXA SENSIBILIDADE' })}
                            className="w-4 h-4 mt-0.5 cursor-pointer"
                          />
                          <label htmlFor="controle-baixa" className="text-sm cursor-pointer">
                            <span className="font-medium">BAIXA SENSIBILIDADE</span><br/>
                            <span className="text-gray-600">Praticante agitado, baixa noção de risco<br/>Equino + controlado</span>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 9. Hipótese Perfil Mediação */}
                <div>
                  <Label>9) HIPÓTESE PERFIL MEDIAÇÃO (AVALIAÇÃO, INTERVENÇÃO PROCESSUAL)</Label>

                  <div className="mt-4 space-y-4">
                    {/* Psicólogo */}
                    <div className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <input
                          type="checkbox"
                          id="med-psicologo"
                          checked={estudoCasoData.hipoteseMediacoes.psicologo.selecionado}
                          onChange={(e) => setEstudoCasoData({
                            ...estudoCasoData,
                            hipoteseMediacoes: {
                              ...estudoCasoData.hipoteseMediacoes,
                              psicologo: { ...estudoCasoData.hipoteseMediacoes.psicologo, selecionado: e.target.checked }
                            }
                          })}
                          className="w-4 h-4 cursor-pointer"
                        />
                        <label htmlFor="med-psicologo" className="text-sm font-semibold cursor-pointer">
                          • Psicólogo <span className="text-gray-600 font-normal">(emocional, cognitivo)</span>
                        </label>
                      </div>
                      {estudoCasoData.hipoteseMediacoes.psicologo.selecionado && (
                        <textarea
                          value={estudoCasoData.hipoteseMediacoes.psicologo.texto}
                          onChange={(e) => setEstudoCasoData({
                            ...estudoCasoData,
                            hipoteseMediacoes: {
                              ...estudoCasoData.hipoteseMediacoes,
                              psicologo: { ...estudoCasoData.hipoteseMediacoes.psicologo, texto: e.target.value }
                            }
                          })}
                          className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
                          rows={3}
                          placeholder="Descreva sobre a área de psicologia..."
                        />
                      )}
                    </div>

                    {/* Fisio */}
                    <div className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <input
                          type="checkbox"
                          id="med-fisio"
                          checked={estudoCasoData.hipoteseMediacoes.fisio.selecionado}
                          onChange={(e) => setEstudoCasoData({
                            ...estudoCasoData,
                            hipoteseMediacoes: {
                              ...estudoCasoData.hipoteseMediacoes,
                              fisio: { ...estudoCasoData.hipoteseMediacoes.fisio, selecionado: e.target.checked }
                            }
                          })}
                          className="w-4 h-4 cursor-pointer"
                        />
                        <label htmlFor="med-fisio" className="text-sm font-semibold cursor-pointer">
                          • Fisio <span className="text-gray-600 font-normal">(motor, equilíbrio)</span>
                        </label>
                      </div>
                      {estudoCasoData.hipoteseMediacoes.fisio.selecionado && (
                        <textarea
                          value={estudoCasoData.hipoteseMediacoes.fisio.texto}
                          onChange={(e) => setEstudoCasoData({
                            ...estudoCasoData,
                            hipoteseMediacoes: {
                              ...estudoCasoData.hipoteseMediacoes,
                              fisio: { ...estudoCasoData.hipoteseMediacoes.fisio, texto: e.target.value }
                            }
                          })}
                          className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
                          rows={3}
                          placeholder="Descreva sobre a área de fisioterapia..."
                        />
                      )}
                    </div>

                    {/* Terapeuta Ocupacional */}
                    <div className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <input
                          type="checkbox"
                          id="med-to"
                          checked={estudoCasoData.hipoteseMediacoes.terapeutaOcupacional.selecionado}
                          onChange={(e) => setEstudoCasoData({
                            ...estudoCasoData,
                            hipoteseMediacoes: {
                              ...estudoCasoData.hipoteseMediacoes,
                              terapeutaOcupacional: { ...estudoCasoData.hipoteseMediacoes.terapeutaOcupacional, selecionado: e.target.checked }
                            }
                          })}
                          className="w-4 h-4 cursor-pointer"
                        />
                        <label htmlFor="med-to" className="text-sm font-semibold cursor-pointer">
                          • Terapeuta ocupacional <span className="text-gray-600 font-normal">(sensorial, atividade da vida diária)</span>
                        </label>
                      </div>
                      {estudoCasoData.hipoteseMediacoes.terapeutaOcupacional.selecionado && (
                        <textarea
                          value={estudoCasoData.hipoteseMediacoes.terapeutaOcupacional.texto}
                          onChange={(e) => setEstudoCasoData({
                            ...estudoCasoData,
                            hipoteseMediacoes: {
                              ...estudoCasoData.hipoteseMediacoes,
                              terapeutaOcupacional: { ...estudoCasoData.hipoteseMediacoes.terapeutaOcupacional, texto: e.target.value }
                            }
                          })}
                          className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
                          rows={3}
                          placeholder="Descreva sobre a área de terapia ocupacional..."
                        />
                      )}
                    </div>

                    {/* Pedagogo */}
                    <div className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <input
                          type="checkbox"
                          id="med-pedagogo"
                          checked={estudoCasoData.hipoteseMediacoes.pedagogo.selecionado}
                          onChange={(e) => setEstudoCasoData({
                            ...estudoCasoData,
                            hipoteseMediacoes: {
                              ...estudoCasoData.hipoteseMediacoes,
                              pedagogo: { ...estudoCasoData.hipoteseMediacoes.pedagogo, selecionado: e.target.checked }
                            }
                          })}
                          className="w-4 h-4 cursor-pointer"
                        />
                        <label htmlFor="med-pedagogo" className="text-sm font-semibold cursor-pointer">
                          • Pedagogo
                        </label>
                      </div>
                      {estudoCasoData.hipoteseMediacoes.pedagogo.selecionado && (
                        <textarea
                          value={estudoCasoData.hipoteseMediacoes.pedagogo.texto}
                          onChange={(e) => setEstudoCasoData({
                            ...estudoCasoData,
                            hipoteseMediacoes: {
                              ...estudoCasoData.hipoteseMediacoes,
                              pedagogo: { ...estudoCasoData.hipoteseMediacoes.pedagogo, texto: e.target.value }
                            }
                          })}
                          className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
                          rows={3}
                          placeholder="Descreva sobre a área de pedagogia..."
                        />
                      )}
                    </div>

                    {/* Fonoaudiólogo */}
                    <div className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <input
                          type="checkbox"
                          id="med-fono"
                          checked={estudoCasoData.hipoteseMediacoes.fonoaudiologo.selecionado}
                          onChange={(e) => setEstudoCasoData({
                            ...estudoCasoData,
                            hipoteseMediacoes: {
                              ...estudoCasoData.hipoteseMediacoes,
                              fonoaudiologo: { ...estudoCasoData.hipoteseMediacoes.fonoaudiologo, selecionado: e.target.checked }
                            }
                          })}
                          className="w-4 h-4 cursor-pointer"
                        />
                        <label htmlFor="med-fono" className="text-sm font-semibold cursor-pointer">
                          • Fonoaudiólogo
                        </label>
                      </div>
                      {estudoCasoData.hipoteseMediacoes.fonoaudiologo.selecionado && (
                        <textarea
                          value={estudoCasoData.hipoteseMediacoes.fonoaudiologo.texto}
                          onChange={(e) => setEstudoCasoData({
                            ...estudoCasoData,
                            hipoteseMediacoes: {
                              ...estudoCasoData.hipoteseMediacoes,
                              fonoaudiologo: { ...estudoCasoData.hipoteseMediacoes.fonoaudiologo, texto: e.target.value }
                            }
                          })}
                          className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
                          rows={3}
                          placeholder="Descreva sobre a área de fonoaudiologia..."
                        />
                      )}
                    </div>

                    {/* Equitador */}
                    <div className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <input
                          type="checkbox"
                          id="med-equitador"
                          checked={estudoCasoData.hipoteseMediacoes.equitador.selecionado}
                          onChange={(e) => setEstudoCasoData({
                            ...estudoCasoData,
                            hipoteseMediacoes: {
                              ...estudoCasoData.hipoteseMediacoes,
                              equitador: { ...estudoCasoData.hipoteseMediacoes.equitador, selecionado: e.target.checked }
                            }
                          })}
                          className="w-4 h-4 cursor-pointer"
                        />
                        <label htmlFor="med-equitador" className="text-sm font-semibold cursor-pointer">
                          • Equitador
                        </label>
                      </div>
                      {estudoCasoData.hipoteseMediacoes.equitador.selecionado && (
                        <textarea
                          value={estudoCasoData.hipoteseMediacoes.equitador.texto}
                          onChange={(e) => setEstudoCasoData({
                            ...estudoCasoData,
                            hipoteseMediacoes: {
                              ...estudoCasoData.hipoteseMediacoes,
                              equitador: { ...estudoCasoData.hipoteseMediacoes.equitador, texto: e.target.value }
                            }
                          })}
                          className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
                          rows={3}
                          placeholder="Descreva sobre a área de equitação..."
                        />
                      )}
                    </div>

                    {/* Educador Físico */}
                    <div className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <input
                          type="checkbox"
                          id="med-edfisico"
                          checked={estudoCasoData.hipoteseMediacoes.educadorFisico.selecionado}
                          onChange={(e) => setEstudoCasoData({
                            ...estudoCasoData,
                            hipoteseMediacoes: {
                              ...estudoCasoData.hipoteseMediacoes,
                              educadorFisico: { ...estudoCasoData.hipoteseMediacoes.educadorFisico, selecionado: e.target.checked }
                            }
                          })}
                          className="w-4 h-4 cursor-pointer"
                        />
                        <label htmlFor="med-edfisico" className="text-sm font-semibold cursor-pointer">
                          • Educador Físico
                        </label>
                      </div>
                      {estudoCasoData.hipoteseMediacoes.educadorFisico.selecionado && (
                        <textarea
                          value={estudoCasoData.hipoteseMediacoes.educadorFisico.texto}
                          onChange={(e) => setEstudoCasoData({
                            ...estudoCasoData,
                            hipoteseMediacoes: {
                              ...estudoCasoData.hipoteseMediacoes,
                              educadorFisico: { ...estudoCasoData.hipoteseMediacoes.educadorFisico, texto: e.target.value }
                            }
                          })}
                          className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
                          rows={3}
                          placeholder="Descreva sobre a área de educação física..."
                        />
                      )}
                    </div>

                    {/* Enfermagem */}
                    <div className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <input
                          type="checkbox"
                          id="med-enfermagem"
                          checked={estudoCasoData.hipoteseMediacoes.enfermagem.selecionado}
                          onChange={(e) => setEstudoCasoData({
                            ...estudoCasoData,
                            hipoteseMediacoes: {
                              ...estudoCasoData.hipoteseMediacoes,
                              enfermagem: { ...estudoCasoData.hipoteseMediacoes.enfermagem, selecionado: e.target.checked }
                            }
                          })}
                          className="w-4 h-4 cursor-pointer"
                        />
                        <label htmlFor="med-enfermagem" className="text-sm font-semibold cursor-pointer">
                          • Enfermagem
                        </label>
                      </div>
                      {estudoCasoData.hipoteseMediacoes.enfermagem.selecionado && (
                        <textarea
                          value={estudoCasoData.hipoteseMediacoes.enfermagem.texto}
                          onChange={(e) => setEstudoCasoData({
                            ...estudoCasoData,
                            hipoteseMediacoes: {
                              ...estudoCasoData.hipoteseMediacoes,
                              enfermagem: { ...estudoCasoData.hipoteseMediacoes.enfermagem, texto: e.target.value }
                            }
                          })}
                          className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
                          rows={3}
                          placeholder="Descreva sobre a área de enfermagem..."
                        />
                      )}
                    </div>

                    {/* Equoterapeuta */}
                    <div className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <input
                          type="checkbox"
                          id="med-equoterapeuta"
                          checked={estudoCasoData.hipoteseMediacoes.equoterapeuta.selecionado}
                          onChange={(e) => setEstudoCasoData({
                            ...estudoCasoData,
                            hipoteseMediacoes: {
                              ...estudoCasoData.hipoteseMediacoes,
                              equoterapeuta: { ...estudoCasoData.hipoteseMediacoes.equoterapeuta, selecionado: e.target.checked }
                            }
                          })}
                          className="w-4 h-4 cursor-pointer"
                        />
                        <label htmlFor="med-equoterapeuta" className="text-sm font-semibold cursor-pointer">
                          • Equoterapeuta
                        </label>
                      </div>
                      {estudoCasoData.hipoteseMediacoes.equoterapeuta.selecionado && (
                        <textarea
                          value={estudoCasoData.hipoteseMediacoes.equoterapeuta.texto}
                          onChange={(e) => setEstudoCasoData({
                            ...estudoCasoData,
                            hipoteseMediacoes: {
                              ...estudoCasoData.hipoteseMediacoes,
                              equoterapeuta: { ...estudoCasoData.hipoteseMediacoes.equoterapeuta, texto: e.target.value }
                            }
                          })}
                          className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
                          rows={3}
                          placeholder="Descreva sobre a área de equoterapia..."
                        />
                      )}
                    </div>
                  </div>
                </div>

                {/* 10. Observação */}
                <div>
                  <Label htmlFor="ec-observacao">10) Observação:</Label>
                  <textarea
                    id="ec-observacao"
                    value={estudoCasoData.observacao}
                    onChange={(e) => setEstudoCasoData({ ...estudoCasoData, observacao: e.target.value })}
                    className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    rows={5}
                    placeholder="Digite aqui suas observações..."
                  />
                </div>
              </div>
            </div>

            <div className="sticky bottom-0 bg-gray-50 px-6 py-4 border-t border-gray-200 rounded-b-xl">
              <div className="flex justify-end gap-3">
                <Button
                  variant="outline"
                  onClick={() => setShowEstudoCasoModal(false)}
                  className="px-6"
                >
                  Cancelar
                </Button>
                <Button
                  onClick={handleSalvarEstudoCaso}
                  className="bg-indigo-600 hover:bg-indigo-700 px-6"
                >
                  <FileText className="h-4 w-4 mr-2" />
                  Salvar Estudo de Caso
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Seleção de Marcação Física */}
      {showModalMarcacaoFisica && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[60] p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md">
            <div className="bg-white border-b border-gray-200 px-6 py-4 rounded-t-xl">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">
                  Selecione o tipo de marcação
                </h3>
                <button
                  onClick={() => {
                    setShowModalMarcacaoFisica(false);
                    setParteCorpoSelecionada('');
                  }}
                  className="text-gray-500 hover:text-gray-700 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="px-6 py-4">
              <p className="text-sm text-gray-600 mb-4">
                Parte selecionada: <span className="font-semibold">{parteCorpoSelecionada.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</span>
              </p>

              <div className="space-y-2">
                {[
                  { tipo: 'esqueleto', cor: '#a855f7' },
                  { tipo: 'muscular', cor: '#ef4444' },
                  { tipo: 'motor', cor: '#3b82f6' },
                  { tipo: 'ausência de membro', cor: '#6b7280' },
                  { tipo: 'má formação', cor: '#eab308' },
                  { tipo: 'lesão', cor: '#f97316' },
                  { tipo: 'doença', cor: '#ec4899' },
                  { tipo: 'transtorno patológica invisível', cor: '#6366f1' },
                  { tipo: 'sem resposta nervosa ou motora', cor: '#22c55e' },
                ].map(({ tipo, cor }) => (
                  <button
                    key={tipo}
                    onClick={() => {
                      const marcacoesFisicaArray = Array.isArray(estudoCasoData.marcacoesFisica) ? estudoCasoData.marcacoesFisica : [];
                      const novasMarcacoes = [
                        ...marcacoesFisicaArray,
                        {
                          parteCorpo: parteCorpoSelecionada,
                          tipo: tipo,
                          explicacao: ''
                        }
                      ];
                      setEstudoCasoData({ ...estudoCasoData, marcacoesFisica: novasMarcacoes });
                      setShowModalMarcacaoFisica(false);
                      setParteCorpoSelecionada('');
                    }}
                    className="w-full flex items-center gap-3 p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-left"
                  >
                    <div
                      className="w-4 h-4 rounded-full flex-shrink-0"
                      style={{ backgroundColor: cor }}
                    ></div>
                    <span className="text-sm text-gray-900 capitalize">{tipo}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Mudança de Mediação */}
      {showMudancaMediacaoModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl my-8">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 rounded-t-xl">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl text-gray-900">Formulário de Mudança de Mediação</h2>
                <button
                  onClick={() => setShowMudancaMediacaoModal(false)}
                  className="text-gray-500 hover:text-gray-700 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            <div className="px-6 py-6 space-y-6 max-h-[calc(100vh-200px)] overflow-y-auto">
              {/* Dados Automáticos */}
              <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
                <h3 className="text-lg text-indigo-900 mb-4">Dados do Praticante</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-indigo-700">Nome do Praticante</Label>
                    <Input
                      value={mudancaMediacaoData.nomePraticante}
                      readOnly
                      className="bg-white border-indigo-200 mt-1"
                    />
                  </div>
                  <div>
                    <Label className="text-indigo-700">Idade</Label>
                    <Input
                      value={`${mudancaMediacaoData.idade} anos`}
                      readOnly
                      className="bg-white border-indigo-200 mt-1"
                    />
                  </div>
                  <div>
                    <Label className="text-indigo-700">Data de Nascimento</Label>
                    <Input
                      value={mudancaMediacaoData.dataNascimento}
                      readOnly
                      className="bg-white border-indigo-200 mt-1"
                    />
                  </div>
                  <div>
                    <Label className="text-indigo-700">Diagnóstico</Label>
                    <Input
                      value={mudancaMediacaoData.diagnostico}
                      readOnly
                      className="bg-white border-indigo-200 mt-1"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Label className="text-indigo-700">Queixa</Label>
                    <Input
                      value={mudancaMediacaoData.queixa}
                      readOnly
                      className="bg-white border-indigo-200 mt-1"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Label className="text-indigo-700">Objetivo</Label>
                    <Input
                      value={mudancaMediacaoData.objetivo}
                      readOnly
                      className="bg-white border-indigo-200 mt-1"
                    />
                  </div>
                </div>
              </div>

              {/* Campos a serem preenchidos */}
              <div className="space-y-4">
                <h3 className="text-lg text-gray-900">Informações Adicionais</h3>
                
                {/* Mediador Atual */}
                <div>
                  <Label htmlFor="mediador-atual">Mediador Atual</Label>
                  <Input
                    id="mediador-atual"
                    value={mudancaMediacaoData.mediadorAtual}
                    readOnly
                    className="bg-white border-indigo-200 mt-1"
                  />
                </div>

                {/* Período Inicial */}
                <div>
                  <Label htmlFor="periodo-inicial">Período Inicial</Label>
                  <Input
                    id="periodo-inicial"
                    type="date"
                    value={mudancaMediacaoData.periodoInicial}
                    readOnly
                    className="bg-white border-indigo-200 mt-1"
                  />
                </div>

                {/* Data de Conclusão */}
                <div>
                  <Label htmlFor="data-conclusao">Data de Conclusão</Label>
                  <Input
                    id="data-conclusao"
                    type="date"
                    value={mudancaMediacaoData.dataConclusao}
                    readOnly
                    className="bg-white border-indigo-200 mt-1"
                  />
                </div>

                {/* Novo Mediador */}
                <div>
                  <Label htmlFor="novo-mediador">Novo Mediador *</Label>
                  <Select
                    value={mudancaMediacaoData.novoMediador}
                    onValueChange={(value) => setMudancaMediacaoData({ ...mudancaMediacaoData, novoMediador: value })}
                  >
                    <SelectTrigger id="novo-mediador" className="mt-1">
                      <SelectValue placeholder="Selecione o novo mediador" />
                    </SelectTrigger>
                    <SelectContent>
                      {colaboradoresDisponiveis.map((colaborador) => (
                        <SelectItem key={colaborador} value={colaborador}>
                          {colaborador}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Motivos */}
                <div>
                  <Label className="mb-3 block">Motivos para a Mudança de Mediação *</Label>
                  <div className="space-y-3 border border-gray-300 rounded-lg p-4 bg-gray-50">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={mudancaMediacaoData.motivos.mudancaHorario}
                        onChange={(e) => setMudancaMediacaoData({
                          ...mudancaMediacaoData,
                          motivos: { ...mudancaMediacaoData.motivos, mudancaHorario: e.target.checked }
                        })}
                        className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                      />
                      <span className="text-gray-700">Mudança de Horário</span>
                    </label>

                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={mudancaMediacaoData.motivos.conclusaoObjetivos}
                        onChange={(e) => setMudancaMediacaoData({
                          ...mudancaMediacaoData,
                          motivos: { ...mudancaMediacaoData.motivos, conclusaoObjetivos: e.target.checked }
                        })}
                        className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                      />
                      <span className="text-gray-700">Conclusão dos Objetivos</span>
                    </label>

                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={mudancaMediacaoData.motivos.prioridadesNecessidades}
                        onChange={(e) => setMudancaMediacaoData({
                          ...mudancaMediacaoData,
                          motivos: { ...mudancaMediacaoData.motivos, prioridadesNecessidades: e.target.checked }
                        })}
                        className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                      />
                      <span className="text-gray-700">Prioridades e Novas Necessidades</span>
                    </label>

                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={mudancaMediacaoData.motivos.rearranjoEquipe}
                        onChange={(e) => setMudancaMediacaoData({
                          ...mudancaMediacaoData,
                          motivos: { ...mudancaMediacaoData.motivos, rearranjoEquipe: e.target.checked }
                        })}
                        className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                      />
                      <span className="text-gray-700">Rearranjo da Equipe</span>
                    </label>

                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={mudancaMediacaoData.motivos.mudancaPrograma}
                        onChange={(e) => setMudancaMediacaoData({
                          ...mudancaMediacaoData,
                          motivos: { ...mudancaMediacaoData.motivos, mudancaPrograma: e.target.checked }
                        })}
                        className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                      />
                      <span className="text-gray-700">Mudança de Programa</span>
                    </label>

                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={mudancaMediacaoData.motivos.demandaFamiliar}
                        onChange={(e) => setMudancaMediacaoData({
                          ...mudancaMediacaoData,
                          motivos: { ...mudancaMediacaoData.motivos, demandaFamiliar: e.target.checked }
                        })}
                        className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                      />
                      <span className="text-gray-700">Demanda Familiar</span>
                    </label>

                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={mudancaMediacaoData.motivos.outros}
                        onChange={(e) => setMudancaMediacaoData({
                          ...mudancaMediacaoData,
                          motivos: { ...mudancaMediacaoData.motivos, outros: e.target.checked }
                        })}
                        className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                      />
                      <span className="text-gray-700">Outros</span>
                    </label>
                  </div>
                </div>

                {/* Outros Motivo - Condicional */}
                {mudancaMediacaoData.motivos.outros && (
                  <div>
                    <Label htmlFor="outros-motivo">Especifique Outros Motivos *</Label>
                    <textarea
                      id="outros-motivo"
                      value={mudancaMediacaoData.outrosMotivo}
                      onChange={(e) => setMudancaMediacaoData({ ...mudancaMediacaoData, outrosMotivo: e.target.value })}
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none mt-1"
                      placeholder="Descreva outros motivos para a mudança de mediação..."
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Botões */}
            <div className="sticky bottom-0 bg-white border-t border-gray-200 px-6 py-4 rounded-b-xl">
              <div className="flex gap-3 justify-end">
                <Button
                  variant="outline"
                  onClick={() => setShowMudancaMediacaoModal(false)}
                  className="px-6"
                >
                  Cancelar
                </Button>
                <Button
                  onClick={handleSalvarMudancaMediacao}
                  className="bg-indigo-600 hover:bg-indigo-700 px-6"
                >
                  <FileText className="h-4 w-4 mr-2" />
                  Salvar Mudança de Mediação
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Mediador Inicial */}
      {showMediadorInicialModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl my-8">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 rounded-t-xl">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl text-gray-900">Formulário de Mediador Inicial</h2>
                <button
                  onClick={() => setShowMediadorInicialModal(false)}
                  className="text-gray-500 hover:text-gray-700 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            <div className="px-6 py-6 space-y-6">
              {/* Campo do Praticante */}
              <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
                <h3 className="text-lg text-indigo-900 mb-4">Dados do Praticante</h3>
                <div>
                  <Label className="text-indigo-700">Nome do Praticante</Label>
                  <Input
                    value={mediadorInicialData.nomePraticante}
                    readOnly
                    className="bg-white border-indigo-200 mt-1"
                  />
                </div>
              </div>

              {/* Campo do Mediador */}
              <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
                <h3 className="text-lg text-indigo-900 mb-4">Dados do Mediador</h3>
                <div>
                  <Label className="text-indigo-700">Nome do Mediador Responsável *</Label>
                  <Select
                    value={mediadorInicialData.nomeMediador}
                    onValueChange={(value) => setMediadorInicialData({ ...mediadorInicialData, nomeMediador: value })}
                  >
                    <SelectTrigger className="bg-white border-indigo-200 mt-1">
                      <SelectValue placeholder="Selecione o mediador responsável" />
                    </SelectTrigger>
                    <SelectContent>
                      {colaboradoresDisponiveis.map((colaborador) => (
                        <SelectItem key={colaborador} value={colaborador}>
                          {colaborador}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Botões */}
            <div className="sticky bottom-0 bg-white border-t border-gray-200 px-6 py-4 rounded-b-xl">
              <div className="flex gap-3 justify-end">
                <Button
                  variant="outline"
                  onClick={() => setShowMediadorInicialModal(false)}
                  className="px-6"
                >
                  Cancelar
                </Button>
                <Button
                  onClick={handleSalvarMediadorInicial}
                  className="bg-indigo-600 hover:bg-indigo-700 px-6"
                >
                  <FileText className="h-4 w-4 mr-2" />
                  Salvar Mediador Inicial
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Mudança de Programa */}
      {showMudancaProgramaModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl my-8">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 rounded-t-xl">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl text-gray-900">Formulário de Mudança de Programa</h2>
                <button
                  onClick={() => setShowMudancaProgramaModal(false)}
                  className="text-gray-500 hover:text-gray-700 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            <div className="px-6 py-6 space-y-6 max-h-[calc(100vh-200px)] overflow-y-auto">
              {/* Dados Automáticos */}
              <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
                <h3 className="text-lg text-indigo-900 mb-4">Dados do Praticante</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-indigo-700">Nome do Praticante</Label>
                    <Input
                      value={mudancaProgramaData.nomePraticante}
                      readOnly
                      className="bg-white border-indigo-200 mt-1"
                    />
                  </div>
                  <div>
                    <Label className="text-indigo-700">Tipo de Documento</Label>
                    <Input
                      value={mudancaProgramaData.tipoDocumento}
                      readOnly
                      className="bg-white border-indigo-200 mt-1"
                    />
                  </div>
                  <div>
                    <Label className="text-indigo-700">CID</Label>
                    <Input
                      value={mudancaProgramaData.cid}
                      readOnly
                      className="bg-white border-indigo-200 mt-1"
                    />
                  </div>
                  <div>
                    <Label className="text-indigo-700">Idade</Label>
                    <Input
                      value={`${mudancaProgramaData.idade} anos`}
                      readOnly
                      className="bg-white border-indigo-200 mt-1"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Label className="text-indigo-700">Programa Atual</Label>
                    <Input
                      value={mudancaProgramaData.programaAtual}
                      readOnly
                      className="bg-white border-indigo-200 mt-1"
                    />
                  </div>
                </div>
              </div>

              {/* Campos a serem preenchidos */}
              <div className="space-y-4">
                <h3 className="text-lg text-gray-900">Informações Adicionais</h3>
                
                {/* Novo Programa */}
                <div>
                  <Label htmlFor="novo-programa">Novo Programa *</Label>
                  <Select
                    value={mudancaProgramaData.novoPrograma}
                    onValueChange={(value) => setMudancaProgramaData({ ...mudancaProgramaData, novoPrograma: value })}
                  >
                    <SelectTrigger id="novo-programa" className="mt-1">
                      <SelectValue placeholder="Selecione o novo programa" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Hipoterapia">Hipoterapia</SelectItem>
                      <SelectItem value="Educação/Reeducação">Educação/Reeducação</SelectItem>
                      <SelectItem value="Pré-Esportivo">Pré-Esportivo</SelectItem>
                      <SelectItem value="Esportivo paraequestre">Esportivo paraequestre</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Motivos */}
                <div>
                  <Label className="mb-3 block">Motivos para a Mudança de Programa *</Label>
                  <div className="space-y-3 border border-gray-300 rounded-lg p-4 bg-gray-50">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={mudancaProgramaData.motivos.evoluiu}
                        onChange={(e) => setMudancaProgramaData({
                          ...mudancaProgramaData,
                          motivos: { ...mudancaProgramaData.motivos, evoluiu: e.target.checked }
                        })}
                        className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                      />
                      <span className="text-gray-700">Evoluiu</span>
                    </label>

                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={mudancaProgramaData.motivos.novosObjetivos}
                        onChange={(e) => setMudancaProgramaData({
                          ...mudancaProgramaData,
                          motivos: { ...mudancaProgramaData.motivos, novosObjetivos: e.target.checked }
                        })}
                        className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                      />
                      <span className="text-gray-700">Novos Objetivos</span>
                    </label>

                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={mudancaProgramaData.motivos.trabalharNovasHabilidades}
                        onChange={(e) => setMudancaProgramaData({
                          ...mudancaProgramaData,
                          motivos: { ...mudancaProgramaData.motivos, trabalharNovasHabilidades: e.target.checked }
                        })}
                        className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                      />
                      <span className="text-gray-700">Trabalhar Novas Habilidades</span>
                    </label>

                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={mudancaProgramaData.motivos.regrediu}
                        onChange={(e) => setMudancaProgramaData({
                          ...mudancaProgramaData,
                          motivos: { ...mudancaProgramaData.motivos, regrediu: e.target.checked }
                        })}
                        className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                      />
                      <span className="text-gray-700">Regrediu</span>
                    </label>

                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={mudancaProgramaData.motivos.naoSeAdaptou}
                        onChange={(e) => setMudancaProgramaData({
                          ...mudancaProgramaData,
                          motivos: { ...mudancaProgramaData.motivos, naoSeAdaptou: e.target.checked }
                        })}
                        className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                      />
                      <span className="text-gray-700">Não se Adaptou</span>
                    </label>

                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={mudancaProgramaData.motivos.outros}
                        onChange={(e) => setMudancaProgramaData({
                          ...mudancaProgramaData,
                          motivos: { ...mudancaProgramaData.motivos, outros: e.target.checked }
                        })}
                        className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                      />
                      <span className="text-gray-700">Outros</span>
                    </label>
                  </div>
                </div>

                {/* Outros Motivo - Condicional */}
                {mudancaProgramaData.motivos.outros && (
                  <div>
                    <Label htmlFor="outros-motivo">Especifique Outros Motivos *</Label>
                    <textarea
                      id="outros-motivo"
                      value={mudancaProgramaData.outrosMotivo}
                      onChange={(e) => setMudancaProgramaData({ ...mudancaProgramaData, outrosMotivo: e.target.value })}
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none mt-1"
                      placeholder="Descreva outros motivos para a mudança de programa..."
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Botões */}
            <div className="sticky bottom-0 bg-white border-t border-gray-200 px-6 py-4 rounded-b-xl">
              <div className="flex gap-3 justify-end">
                <Button
                  variant="outline"
                  onClick={() => setShowMudancaProgramaModal(false)}
                  className="px-6"
                >
                  Cancelar
                </Button>
                <Button
                  onClick={handleSalvarMudancaPrograma}
                  className="bg-indigo-600 hover:bg-indigo-700 px-6"
                >
                  <FileText className="h-4 w-4 mr-2" />
                  Salvar Mudança de Programa
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Alta */}
      {showAltaModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl my-8">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 rounded-t-xl">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">Documento de Alta</h2>
                <button
                  onClick={() => setShowAltaModal(false)}
                  className="text-gray-500 hover:text-gray-700 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            <div className="px-6 py-6 space-y-6 max-h-[calc(100vh-200px)] overflow-y-auto">
              {/* Tipo de Alta */}
              <div>
                <Label className="text-base font-semibold mb-3 block">Tipo de Alta</Label>
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      id="alta-definitiva"
                      name="tipoAlta"
                      checked={altaData.tipoAlta === 'definitiva'}
                      onChange={() => setAltaData({ ...altaData, tipoAlta: 'definitiva' })}
                      className="w-4 h-4 cursor-pointer"
                    />
                    <label htmlFor="alta-definitiva" className="text-sm cursor-pointer">
                      Alta Definitiva
                    </label>
                  </div>
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      id="alta-temporaria"
                      name="tipoAlta"
                      checked={altaData.tipoAlta === 'temporaria'}
                      onChange={() => setAltaData({ ...altaData, tipoAlta: 'temporaria' })}
                      className="w-4 h-4 cursor-pointer"
                    />
                    <label htmlFor="alta-temporaria" className="text-sm cursor-pointer">
                      Alta Temporária
                    </label>
                  </div>
                </div>
              </div>

              {altaData.tipoAlta && (
                <>
                  {/* Protocolo */}
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <p className="text-sm font-semibold text-gray-700 mb-2">
                      PROTOCOLO DE ALTA {altaData.tipoAlta.toUpperCase()} Nº 06/2020
                    </p>
                  </div>

                  {/* Nome do Praticante */}
                  <div>
                    <Label htmlFor="alta-praticante">Nome do Praticante</Label>
                    <Input
                      id="alta-praticante"
                      value={altaData.nomePraticante}
                      className="bg-gray-50"
                      readOnly
                    />
                  </div>

                  {/* Descrição */}
                  <div>
                    <Label htmlFor="alta-descricao">Descrição</Label>
                    <textarea
                      id="alta-descricao"
                      value={altaData.descricao}
                      onChange={(e) => setAltaData({ ...altaData, descricao: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      rows={3}
                      placeholder="Descreva a situação..."
                    />
                  </div>

                  {/* Motivo */}
                  <div>
                    <Label htmlFor="alta-motivo">Motivo</Label>
                    <textarea
                      id="alta-motivo"
                      value={altaData.motivo}
                      onChange={(e) => setAltaData({ ...altaData, motivo: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      rows={2}
                      placeholder="Ex: DESISTÊNCIA POR PARTE DA FAMÍLIA DO PRATICANTE"
                    />
                  </div>

                  {/* Procedimento */}
                  <div>
                    <Label htmlFor="alta-procedimento">Procedimento</Label>
                    <textarea
                      id="alta-procedimento"
                      value={altaData.procedimento}
                      onChange={(e) => setAltaData({ ...altaData, procedimento: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      rows={2}
                      placeholder={`Ex: Sendo assim, está sendo desligado por meio da alta ${altaData.tipoAlta}.`}
                    />
                  </div>

                  {/* Assinaturas */}
                  <div>
                    <Label className="text-base font-semibold mb-3 block">Assinaturas</Label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="alta-mediador">Mediador</Label>
                        <Input
                          id="alta-mediador"
                          value={altaData.assinaturaMediador}
                          onChange={(e) => setAltaData({ ...altaData, assinaturaMediador: e.target.value })}
                          placeholder="Nome do mediador"
                        />
                      </div>
                      <div>
                        <Label htmlFor="alta-lateral">Lateral</Label>
                        <Input
                          id="alta-lateral"
                          value={altaData.assinaturaLateral}
                          onChange={(e) => setAltaData({ ...altaData, assinaturaLateral: e.target.value })}
                          placeholder="Nome do lateral"
                        />
                      </div>
                      <div>
                        <Label htmlFor="alta-guia">Guia</Label>
                        <Input
                          id="alta-guia"
                          value={altaData.assinaturaGuia}
                          onChange={(e) => setAltaData({ ...altaData, assinaturaGuia: e.target.value })}
                          placeholder="Nome do guia"
                        />
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>

            <div className="sticky bottom-0 bg-gray-50 px-6 py-4 border-t border-gray-200 rounded-b-xl">
              <div className="flex justify-end gap-3">
                <Button
                  variant="outline"
                  onClick={() => setShowAltaModal(false)}
                  className="px-6"
                >
                  Cancelar
                </Button>
                <Button
                  onClick={handleSalvarAlta}
                  disabled={!altaData.tipoAlta}
                  className="bg-indigo-600 hover:bg-indigo-700 px-6 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <FileText className="h-4 w-4 mr-2" />
                  Salvar Alta
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Parecer */}
      {showParecerModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl my-8">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 rounded-t-xl">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl text-gray-900">Declaração de Comparecimento</h2>
                <button
                  onClick={() => setShowParecerModal(false)}
                  className="text-gray-500 hover:text-gray-700 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            <div className="px-6 py-6 space-y-6">
              {/* Formulário de Parecer */}
              <div className="space-y-4">
                <div>
                  <Label htmlFor="nome-solicitante">Nome do Solicitante *</Label>
                  <Input
                    id="nome-solicitante"
                    value={parecerData.nomeSolicitante}
                    onChange={(e) => setParecerData({ ...parecerData, nomeSolicitante: e.target.value })}
                    placeholder="Nome do solicitante do parecer"
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="para-qual-fins">Para Quais Fins *</Label>
                  <Input
                    id="para-qual-fins"
                    value={parecerData.paraQualFins}
                    onChange={(e) => setParecerData({ ...parecerData, paraQualFins: e.target.value })}
                    placeholder="Ex: Atestado médico, justificativa de ausência, etc."
                    className="mt-1"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="de-que-hora">De Que Hora *</Label>
                    <Input
                      id="de-que-hora"
                      type="time"
                      value={parecerData.deQueHora}
                      onChange={(e) => setParecerData({ ...parecerData, deQueHora: e.target.value })}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="ate-qual-hora">Até Qual Hora *</Label>
                    <Input
                      id="ate-qual-hora"
                      type="time"
                      value={parecerData.ateQualHora}
                      onChange={(e) => setParecerData({ ...parecerData, ateQualHora: e.target.value })}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="data-parecer">Data *</Label>
                    <Input
                      id="data-parecer"
                      type="date"
                      value={parecerData.data}
                      onChange={(e) => setParecerData({ ...parecerData, data: e.target.value })}
                      className="mt-1"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Botões */}
            <div className="sticky bottom-0 bg-white border-t border-gray-200 px-6 py-4 rounded-b-xl">
              <div className="flex gap-3 justify-end">
                <Button
                  variant="outline"
                  onClick={() => setShowParecerModal(false)}
                  className="px-6"
                >
                  Cancelar
                </Button>
                <Button
                  onClick={handleSalvarParecer}
                  className="bg-indigo-600 hover:bg-indigo-700 px-6"
                >
                  <FileText className="h-4 w-4 mr-2" />
                  Gerar PDF
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Parecer Médico */}
      {showParecerMedicoModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl my-8 mx-auto">

            {/* Header */}
            <div className="border-b border-gray-200 px-6 py-4 rounded-t-xl flex items-center justify-between">
              <h2 className="text-2xl text-gray-900">Parecer Médico</h2>
              <button onClick={() => setShowParecerMedicoModal(false)} className="text-gray-500 hover:text-gray-700 transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Body */}
            <div className="px-6 py-6 space-y-6">

              {/* Dados do Praticante */}
              <section>
                <h3 className="text-indigo-700 font-semibold text-base mb-3 pb-2 border-b border-indigo-100">
                  Dados do Praticante
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-gray-700">Nome do Praticante</Label>
                    <Input value={parecerMedicoData.nomePraticante} readOnly className="mt-1 bg-gray-50 text-gray-700" />
                  </div>
                  <div>
                    <Label className="text-gray-700">Data de Nascimento</Label>
                    <Input value={parecerMedicoData.dataNascimento} readOnly className="mt-1 bg-gray-50 text-gray-700" />
                  </div>
                  <div>
                    <Label className="text-gray-700">Patologia</Label>
                    <Input value={parecerMedicoData.patologia} readOnly className="mt-1 bg-gray-50 text-gray-700" />
                  </div>
                  <div>
                    <Label className="text-gray-700">CID</Label>
                    <Input value={parecerMedicoData.cid} readOnly className="mt-1 bg-gray-50 text-gray-700" />
                  </div>
                  <div className="md:col-span-2">
                    <Label className="text-gray-700">Patologias Acessórias</Label>
                    <Input
                      value={parecerMedicoData.patologiasAcessorias}
                      onChange={(e) => setParecerMedicoData({ ...parecerMedicoData, patologiasAcessorias: e.target.value })}
                      placeholder="Outras patologias relevantes"
                      className="mt-1"
                    />
                  </div>
                </div>
              </section>

              {/* Considerações Médicas */}
              <section>
                <h3 className="text-indigo-700 font-semibold text-base mb-3 pb-2 border-b border-indigo-100">
                  Considerações Médicas
                </h3>
                <div>
                  <Label htmlFor="consideracoes-medicas">
                    Considerações Médicas para Indicação à Realização de Equoterapia
                  </Label>
                  <textarea
                    id="consideracoes-medicas"
                    value={parecerMedicoData.consideracoesMedicas}
                    onChange={(e) => setParecerMedicoData({ ...parecerMedicoData, consideracoesMedicas: e.target.value })}
                    rows={5}
                    placeholder="Descreva as considerações médicas para indicação à equoterapia..."
                    className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-none text-sm"
                  />
                </div>
              </section>

              {/* Dados do Médico */}
              <section>
                <h3 className="text-indigo-700 font-semibold text-base mb-3 pb-2 border-b border-indigo-100">
                  Dados do Médico
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <Label htmlFor="pm-medico">Médico</Label>
                    <Input id="pm-medico" value={parecerMedicoData.medico}
                      onChange={(e) => setParecerMedicoData({ ...parecerMedicoData, medico: e.target.value })}
                      placeholder="Nome completo do médico" className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="pm-especializacao">Especialização</Label>
                    <Input id="pm-especializacao" value={parecerMedicoData.especializacao}
                      onChange={(e) => setParecerMedicoData({ ...parecerMedicoData, especializacao: e.target.value })}
                      placeholder="Ex: Neuropediatra" className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="pm-crm">CRM</Label>
                    <Input id="pm-crm" value={parecerMedicoData.crm}
                      onChange={(e) => setParecerMedicoData({ ...parecerMedicoData, crm: e.target.value })}
                      placeholder="Ex: CRM/SP 123456" className="mt-1" />
                  </div>
                </div>
              </section>

            </div>

            {/* Footer */}
            <div className="border-t border-gray-200 px-6 py-4 rounded-b-xl">
              <div className="flex gap-3 justify-center">
                <Button variant="outline" onClick={() => setShowParecerMedicoModal(false)} className="px-8">
                  Cancelar
                </Button>
                <Button onClick={handleSalvarParecerMedico} className="bg-indigo-600 hover:bg-indigo-700 px-8">
                  <FileText className="h-4 w-4 mr-2" />
                  Salvar Parecer Médico
                </Button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Modal de Avaliação Inicial */}
      {showAvaliacaoInicialModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl my-8 mx-auto">
            {/* Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 rounded-t-xl">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl text-gray-900">Avaliação Inicial</h2>
                <button
                  onClick={() => setShowAvaliacaoInicialModal(false)}
                  className="text-gray-500 hover:text-gray-700 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-8">

              {/* Dados do Praticante */}
              <section>
                <h3 className="text-indigo-700 font-semibold text-lg mb-4 pb-2 border-b border-indigo-100">
                  Dados do Praticante
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-indigo-700">Nome do Praticante</Label>
                    <Input value={avaliacaoInicialData.nomePraticante} readOnly className="bg-gray-50 border-indigo-200 mt-1" />
                  </div>
                  <div>
                    <Label className="text-indigo-700">Idade</Label>
                    <Input value={avaliacaoInicialData.idade ? `${avaliacaoInicialData.idade} anos` : ''} readOnly className="bg-gray-50 border-indigo-200 mt-1" />
                  </div>
                  <div>
                    <Label className="text-indigo-700">Data de Nascimento</Label>
                    <Input value={avaliacaoInicialData.dataNascimento} readOnly className="bg-gray-50 border-indigo-200 mt-1" />
                  </div>
                  <div>
                    <Label className="text-indigo-700">Diagnóstico</Label>
                    <Input value={avaliacaoInicialData.diagnostico} readOnly className="bg-gray-50 border-indigo-200 mt-1" />
                  </div>
                </div>
              </section>

              {/* Estrutural — Encaminhamento */}
              <section>
                <h3 className="text-indigo-700 font-semibold text-lg mb-4 pb-2 border-b border-indigo-100">
                  Avaliação Estrutural
                </h3>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="encaminhadoPor">Foi encaminhado por quem / Como chegou à equoterapia?</Label>
                    <textarea
                      id="encaminhadoPor"
                      value={avaliacaoInicialData.encaminhadoPor}
                      onChange={(e) => setAvaliacaoInicialData({ ...avaliacaoInicialData, encaminhadoPor: e.target.value })}
                      rows={4}
                      placeholder="Ex: encaminhado pelo neurologista Dr. João; a família soube pela escola..."
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none mt-1 text-sm"
                    />
                  </div>
                </div>
              </section>

              {/* Histórico Équo */}
              <section>
                <h3 className="text-indigo-700 font-semibold text-lg mb-4 pb-2 border-b border-indigo-100">
                  Histórico de Equoterapia
                </h3>

                <div className="space-y-4">
                  {/* Já fez équo? */}
                  <div>
                    <Label>Já fez equoterapia?</Label>
                    <div className="flex gap-4 mt-2">
                      {(['sim', 'nao'] as const).map((v) => (
                        <label key={v} className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            name="jaFezEquo"
                            value={v}
                            checked={avaliacaoInicialData.jaFezEquo === v}
                            onChange={() => setAvaliacaoInicialData({ ...avaliacaoInicialData, jaFezEquo: v, tempoFezEquo: '', tempoPausaEquo: '' })}
                            className="w-4 h-4 text-indigo-600"
                          />
                          <span className="text-gray-700">{v === 'sim' ? 'Sim' : 'Não'}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {avaliacaoInicialData.jaFezEquo === 'sim' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-4 border-l-2 border-indigo-100">
                      <div>
                        <Label htmlFor="tempoFezEquo">Quanto tempo fez?</Label>
                        <Input
                          id="tempoFezEquo"
                          value={avaliacaoInicialData.tempoFezEquo}
                          onChange={(e) => setAvaliacaoInicialData({ ...avaliacaoInicialData, tempoFezEquo: e.target.value })}
                          placeholder="Ex: 1 ano e 6 meses"
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="tempoPausaEquo">Está sem tratamento há quanto tempo?</Label>
                        <Input
                          id="tempoPausaEquo"
                          value={avaliacaoInicialData.tempoPausaEquo}
                          onChange={(e) => setAvaliacaoInicialData({ ...avaliacaoInicialData, tempoPausaEquo: e.target.value })}
                          placeholder="Ex: 6 meses"
                          className="mt-1"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </section>

              {/* Histórico Equitação */}
              <section>
                <h3 className="text-indigo-700 font-semibold text-lg mb-4 pb-2 border-b border-indigo-100">
                  Histórico de Equitação
                </h3>

                <div className="space-y-4">
                  {/* Já andou de cavalo? */}
                  <div>
                    <Label>Já andou de cavalo?</Label>
                    <div className="flex gap-4 mt-2">
                      {(['sim', 'nao'] as const).map((v) => (
                        <label key={v} className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            name="jaAndouCavalo"
                            value={v}
                            checked={avaliacaoInicialData.jaAndouCavalo === v}
                            onChange={() => setAvaliacaoInicialData({ ...avaliacaoInicialData, jaAndouCavalo: v, tempoAndouCavalo: '', tempoPausaCavalo: '' })}
                            className="w-4 h-4 text-indigo-600"
                          />
                          <span className="text-gray-700">{v === 'sim' ? 'Sim' : 'Não'}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {avaliacaoInicialData.jaAndouCavalo === 'sim' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-4 border-l-2 border-indigo-100">
                      <div>
                        <Label htmlFor="tempoAndouCavalo">Quanto tempo andou?</Label>
                        <Input
                          id="tempoAndouCavalo"
                          value={avaliacaoInicialData.tempoAndouCavalo}
                          onChange={(e) => setAvaliacaoInicialData({ ...avaliacaoInicialData, tempoAndouCavalo: e.target.value })}
                          placeholder="Ex: 2 anos"
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="tempoPausaCavalo">Está sem andar há quanto tempo?</Label>
                        <Input
                          id="tempoPausaCavalo"
                          value={avaliacaoInicialData.tempoPausaCavalo}
                          onChange={(e) => setAvaliacaoInicialData({ ...avaliacaoInicialData, tempoPausaCavalo: e.target.value })}
                          placeholder="Ex: 1 ano"
                          className="mt-1"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </section>

              {/* Histórico Terapêutico */}
              <section>
                <h3 className="text-indigo-700 font-semibold text-lg mb-4 pb-2 border-b border-indigo-100">
                  Histórico Terapêutico
                </h3>

                <div className="space-y-5">
                  {/* Sim/Não */}
                  <div>
                    <Label>Possui histórico terapêutico?</Label>
                    <div className="flex gap-4 mt-2">
                      {(['sim', 'nao'] as const).map((v) => (
                        <label key={v} className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            name="possuiHistoricoTerapeutico"
                            value={v}
                            checked={avaliacaoInicialData.possuiHistoricoTerapeutico === v}
                            onChange={() => setAvaliacaoInicialData({ ...avaliacaoInicialData, possuiHistoricoTerapeutico: v })}
                            className="w-4 h-4 text-indigo-600"
                          />
                          <span className="text-gray-700">{v === 'sim' ? 'Sim' : 'Não'}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {avaliacaoInicialData.possuiHistoricoTerapeutico === 'sim' && (
                    <div className="space-y-4 pl-4 border-l-2 border-indigo-100">

                      {/* Helper para terapias simples (nome + tempo) */}
                      {(
                        [
                          { key: 'terapiaOcupacional', label: 'Terapia Ocupacional' },
                          { key: 'fonoaudiologia', label: 'Fonoaudiologia' },
                          { key: 'psicologia', label: 'Psicologia' },
                          { key: 'educacaoFisica', label: 'Educação Física' },
                          { key: 'hidroterapia', label: 'Hidroterapia' },
                        ] as { key: keyof AvaliacaoInicialData; label: string }[]
                      ).map(({ key, label }) => {
                        const item = avaliacaoInicialData[key] as TerapiaItem;
                        return (
                          <div key={key} className="space-y-2">
                            <label className="flex items-center gap-2 cursor-pointer font-medium text-gray-800">
                              <input
                                type="checkbox"
                                checked={item.ativo}
                                onChange={(e) => setAvaliacaoInicialData({ ...avaliacaoInicialData, [key]: { ...item, ativo: e.target.checked } })}
                                className="w-4 h-4 text-indigo-600 rounded"
                              />
                              {label}
                            </label>
                            {item.ativo && (
                              <div className="grid grid-cols-2 gap-3 ml-6">
                                <div>
                                  <Label className="text-sm text-gray-600">Nome do profissional</Label>
                                  <Input
                                    value={item.nome}
                                    onChange={(e) => setAvaliacaoInicialData({ ...avaliacaoInicialData, [key]: { ...item, nome: e.target.value } })}
                                    placeholder="Nome"
                                    className="mt-1 h-8 text-sm"
                                  />
                                </div>
                                <div>
                                  <Label className="text-sm text-gray-600">Quanto tempo?</Label>
                                  <Input
                                    value={item.tempo}
                                    onChange={(e) => setAvaliacaoInicialData({ ...avaliacaoInicialData, [key]: { ...item, tempo: e.target.value } })}
                                    placeholder="Ex: 1 ano"
                                    className="mt-1 h-8 text-sm"
                                  />
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })}

                      {/* Fisioterapia — tem campo extra "já fez / faz" */}
                      <div className="space-y-2">
                        <label className="flex items-center gap-2 cursor-pointer font-medium text-gray-800">
                          <input
                            type="checkbox"
                            checked={avaliacaoInicialData.fisioterapia.ativo}
                            onChange={(e) => setAvaliacaoInicialData({ ...avaliacaoInicialData, fisioterapia: { ...avaliacaoInicialData.fisioterapia, ativo: e.target.checked } })}
                            className="w-4 h-4 text-indigo-600 rounded"
                          />
                          Fisioterapia
                        </label>
                        {avaliacaoInicialData.fisioterapia.ativo && (
                          <div className="grid grid-cols-3 gap-3 ml-6">
                            <div>
                              <Label className="text-sm text-gray-600">Já fez / Faz</Label>
                              <select
                                value={avaliacaoInicialData.fisioterapia.jaFezFaz}
                                onChange={(e) => setAvaliacaoInicialData({ ...avaliacaoInicialData, fisioterapia: { ...avaliacaoInicialData.fisioterapia, jaFezFaz: e.target.value } })}
                                className="w-full mt-1 px-3 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 text-sm"
                              >
                                <option value="">Selecione</option>
                                <option value="ja-fez">Já fez</option>
                                <option value="faz">Faz</option>
                              </select>
                            </div>
                            <div>
                              <Label className="text-sm text-gray-600">Nome do profissional</Label>
                              <Input
                                value={avaliacaoInicialData.fisioterapia.nome}
                                onChange={(e) => setAvaliacaoInicialData({ ...avaliacaoInicialData, fisioterapia: { ...avaliacaoInicialData.fisioterapia, nome: e.target.value } })}
                                placeholder="Nome"
                                className="mt-1 h-8 text-sm"
                              />
                            </div>
                            <div>
                              <Label className="text-sm text-gray-600">Quanto tempo?</Label>
                              <Input
                                value={avaliacaoInicialData.fisioterapia.tempo}
                                onChange={(e) => setAvaliacaoInicialData({ ...avaliacaoInicialData, fisioterapia: { ...avaliacaoInicialData.fisioterapia, tempo: e.target.value } })}
                                placeholder="Ex: 6 meses"
                                className="mt-1 h-8 text-sm"
                              />
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Escola */}
                      <div className="space-y-2">
                        <label className="flex items-center gap-2 cursor-pointer font-medium text-gray-800">
                          <input
                            type="checkbox"
                            checked={avaliacaoInicialData.escola.ativo}
                            onChange={(e) => setAvaliacaoInicialData({ ...avaliacaoInicialData, escola: { ...avaliacaoInicialData.escola, ativo: e.target.checked } })}
                            className="w-4 h-4 text-indigo-600 rounded"
                          />
                          Escola
                        </label>
                        {avaliacaoInicialData.escola.ativo && (
                          <div className="grid grid-cols-2 gap-3 ml-6">
                            <div>
                              <Label className="text-sm text-gray-600">Qual escola?</Label>
                              <Input
                                value={avaliacaoInicialData.escola.qualEscola}
                                onChange={(e) => setAvaliacaoInicialData({ ...avaliacaoInicialData, escola: { ...avaliacaoInicialData.escola, qualEscola: e.target.value } })}
                                placeholder="Nome da escola"
                                className="mt-1 h-8 text-sm"
                              />
                            </div>
                            <div>
                              <Label className="text-sm text-gray-600">Série</Label>
                              <Input
                                value={avaliacaoInicialData.escola.serie}
                                onChange={(e) => setAvaliacaoInicialData({ ...avaliacaoInicialData, escola: { ...avaliacaoInicialData.escola, serie: e.target.value } })}
                                placeholder="Ex: 3º ano"
                                className="mt-1 h-8 text-sm"
                              />
                            </div>
                            <div>
                              <Label className="text-sm text-gray-600">Reprovações</Label>
                              <Input
                                value={avaliacaoInicialData.escola.reprovacoes}
                                onChange={(e) => setAvaliacaoInicialData({ ...avaliacaoInicialData, escola: { ...avaliacaoInicialData.escola, reprovacoes: e.target.value } })}
                                placeholder="Ex: 2 reprovações"
                                className="mt-1 h-8 text-sm"
                              />
                            </div>
                            <div>
                              <Label className="text-sm text-gray-600">Dificuldades</Label>
                              <Input
                                value={avaliacaoInicialData.escola.dificuldades}
                                onChange={(e) => setAvaliacaoInicialData({ ...avaliacaoInicialData, escola: { ...avaliacaoInicialData.escola, dificuldades: e.target.value } })}
                                placeholder="Ex: leitura, matemática..."
                                className="mt-1 h-8 text-sm"
                              />
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Médica */}
                      <div className="space-y-2">
                        <label className="flex items-center gap-2 cursor-pointer font-medium text-gray-800">
                          <input
                            type="checkbox"
                            checked={avaliacaoInicialData.medica.ativo}
                            onChange={(e) => setAvaliacaoInicialData({ ...avaliacaoInicialData, medica: { ...avaliacaoInicialData.medica, ativo: e.target.checked } })}
                            className="w-4 h-4 text-indigo-600 rounded"
                          />
                          Médica
                        </label>
                        {avaliacaoInicialData.medica.ativo && (
                          <div className="grid grid-cols-3 gap-3 ml-6">
                            <div>
                              <Label className="text-sm text-gray-600">Qual área?</Label>
                              <Input
                                value={avaliacaoInicialData.medica.qualArea}
                                onChange={(e) => setAvaliacaoInicialData({ ...avaliacaoInicialData, medica: { ...avaliacaoInicialData.medica, qualArea: e.target.value } })}
                                placeholder="Ex: neurologia"
                                className="mt-1 h-8 text-sm"
                              />
                            </div>
                            <div>
                              <Label className="text-sm text-gray-600">Nome do médico</Label>
                              <Input
                                value={avaliacaoInicialData.medica.nome}
                                onChange={(e) => setAvaliacaoInicialData({ ...avaliacaoInicialData, medica: { ...avaliacaoInicialData.medica, nome: e.target.value } })}
                                placeholder="Nome"
                                className="mt-1 h-8 text-sm"
                              />
                            </div>
                            <div>
                              <Label className="text-sm text-gray-600">Quanto tempo?</Label>
                              <Input
                                value={avaliacaoInicialData.medica.tempo}
                                onChange={(e) => setAvaliacaoInicialData({ ...avaliacaoInicialData, medica: { ...avaliacaoInicialData.medica, tempo: e.target.value } })}
                                placeholder="Ex: 2 anos"
                                className="mt-1 h-8 text-sm"
                              />
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Atividade física / esporte */}
                      <div className="space-y-2">
                        <label className="flex items-center gap-2 cursor-pointer font-medium text-gray-800">
                          <input
                            type="checkbox"
                            checked={avaliacaoInicialData.atividadeFisica.ativo}
                            onChange={(e) => setAvaliacaoInicialData({ ...avaliacaoInicialData, atividadeFisica: { ...avaliacaoInicialData.atividadeFisica, ativo: e.target.checked } })}
                            className="w-4 h-4 text-indigo-600 rounded"
                          />
                          Já fez / Faz atividade física / esporte
                        </label>
                        {avaliacaoInicialData.atividadeFisica.ativo && (
                          <div className="grid grid-cols-2 gap-3 ml-6">
                            <div>
                              <Label className="text-sm text-gray-600">Qual?</Label>
                              <Input
                                value={avaliacaoInicialData.atividadeFisica.qual}
                                onChange={(e) => setAvaliacaoInicialData({ ...avaliacaoInicialData, atividadeFisica: { ...avaliacaoInicialData.atividadeFisica, qual: e.target.value } })}
                                placeholder="Ex: natação, futebol..."
                                className="mt-1 h-8 text-sm"
                              />
                            </div>
                            <div>
                              <Label className="text-sm text-gray-600">Quanto tempo?</Label>
                              <Input
                                value={avaliacaoInicialData.atividadeFisica.tempo}
                                onChange={(e) => setAvaliacaoInicialData({ ...avaliacaoInicialData, atividadeFisica: { ...avaliacaoInicialData.atividadeFisica, tempo: e.target.value } })}
                                placeholder="Ex: 1 ano"
                                className="mt-1 h-8 text-sm"
                              />
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Rotina / melhor horário */}
                      <div>
                        <Label className="font-medium text-gray-800">Rotina / melhor horário para terapia</Label>
                        <Input
                          value={avaliacaoInicialData.rotinaMelhorHorario}
                          onChange={(e) => setAvaliacaoInicialData({ ...avaliacaoInicialData, rotinaMelhorHorario: e.target.value })}
                          placeholder="Ex: manhã, após a escola..."
                          className="mt-1"
                        />
                      </div>

                      {/* Outro */}
                      <div>
                        <Label className="font-medium text-gray-800">Outro</Label>
                        <textarea
                          value={avaliacaoInicialData.outroHistorico}
                          onChange={(e) => setAvaliacaoInicialData({ ...avaliacaoInicialData, outroHistorico: e.target.value })}
                          rows={3}
                          placeholder="Outras informações relevantes do histórico terapêutico..."
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none mt-1 text-sm"
                        />
                      </div>

                    </div>
                  )}
                </div>
              </section>

              {/* Medicamentos em Uso */}
              <section>
                <h3 className="text-indigo-700 font-semibold text-lg mb-4 pb-2 border-b border-indigo-100 flex items-center gap-2">
                  💊 Medicamentos em Uso
                </h3>

                <div className="space-y-5">
                  {/* Radio Sim/Não */}
                  <div>
                    <Label>Usa algum tipo de medicamento?</Label>
                    <div className="flex gap-4 mt-2">
                      {(['sim', 'nao'] as const).map((v) => (
                        <label key={v} className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            name="usaMedicamento"
                            value={v}
                            checked={avaliacaoInicialData.usaMedicamento === v}
                            onChange={() => setAvaliacaoInicialData({
                              ...avaliacaoInicialData,
                              usaMedicamento: v,
                              medicamentos: v === 'sim' ? [{ medicacao: '', dosagem: '', horario: '', finalidade: '' }] : [],
                              comoFicaComMedicacao: '',
                              comoFicaSemMedicacao: '',
                            })}
                            className="w-4 h-4 text-indigo-600"
                          />
                          <span className="text-gray-700">{v === 'sim' ? 'Sim' : 'Não'}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {avaliacaoInicialData.usaMedicamento === 'sim' && (
                    <div className="space-y-4 pl-4 border-l-2 border-indigo-100">
                      {/* Linhas de medicamento */}
                      <div className="overflow-x-auto rounded-lg border border-gray-200">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="bg-indigo-50 text-indigo-700">
                              <th className="px-3 py-2 text-left font-medium w-[28%]">Medicação</th>
                              <th className="px-3 py-2 text-left font-medium w-[18%]">Dosagem</th>
                              <th className="px-3 py-2 text-left font-medium w-[18%]">Horário</th>
                              <th className="px-3 py-2 text-left font-medium w-[30%]">Finalidade / Indicação</th>
                              <th className="px-3 py-2 w-[6%]"></th>
                            </tr>
                          </thead>
                          <tbody>
                            {avaliacaoInicialData.medicamentos.map((med, idx) => (
                              <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                <td className="px-2 py-1.5">
                                  <input type="text" value={med.medicacao}
                                    onChange={(e) => { const updated = avaliacaoInicialData.medicamentos.map((m, i) => i === idx ? { ...m, medicacao: e.target.value } : m); setAvaliacaoInicialData({ ...avaliacaoInicialData, medicamentos: updated }); }}
                                    placeholder="Nome da medicação"
                                    className="w-full px-2 py-1 border border-gray-200 rounded focus:ring-1 focus:ring-indigo-400 text-sm bg-transparent" />
                                </td>
                                <td className="px-2 py-1.5">
                                  <input type="text" value={med.dosagem}
                                    onChange={(e) => { const updated = avaliacaoInicialData.medicamentos.map((m, i) => i === idx ? { ...m, dosagem: e.target.value } : m); setAvaliacaoInicialData({ ...avaliacaoInicialData, medicamentos: updated }); }}
                                    placeholder="Ex: 10mg"
                                    className="w-full px-2 py-1 border border-gray-200 rounded focus:ring-1 focus:ring-indigo-400 text-sm bg-transparent" />
                                </td>
                                <td className="px-2 py-1.5">
                                  <input type="text" value={med.horario}
                                    onChange={(e) => { const updated = avaliacaoInicialData.medicamentos.map((m, i) => i === idx ? { ...m, horario: e.target.value } : m); setAvaliacaoInicialData({ ...avaliacaoInicialData, medicamentos: updated }); }}
                                    placeholder="Ex: manhã"
                                    className="w-full px-2 py-1 border border-gray-200 rounded focus:ring-1 focus:ring-indigo-400 text-sm bg-transparent" />
                                </td>
                                <td className="px-2 py-1.5">
                                  <input type="text" value={med.finalidade}
                                    onChange={(e) => { const updated = avaliacaoInicialData.medicamentos.map((m, i) => i === idx ? { ...m, finalidade: e.target.value } : m); setAvaliacaoInicialData({ ...avaliacaoInicialData, medicamentos: updated }); }}
                                    placeholder="Ex: controle de comportamento"
                                    className="w-full px-2 py-1 border border-gray-200 rounded focus:ring-1 focus:ring-indigo-400 text-sm bg-transparent" />
                                </td>
                                <td className="px-2 py-1.5 text-center">
                                  {avaliacaoInicialData.medicamentos.length > 1 && (
                                    <button type="button"
                                      onClick={() => setAvaliacaoInicialData({ ...avaliacaoInicialData, medicamentos: avaliacaoInicialData.medicamentos.filter((_, i) => i !== idx) })}
                                      className="text-gray-300 hover:text-red-400 transition-colors" title="Remover">
                                      <X className="w-4 h-4" />
                                    </button>
                                  )}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>

                      <button type="button"
                        onClick={() => setAvaliacaoInicialData({ ...avaliacaoInicialData, medicamentos: [...avaliacaoInicialData.medicamentos, { medicacao: '', dosagem: '', horario: '', finalidade: '' }] })}
                        className="text-sm text-indigo-600 hover:text-indigo-800 flex items-center gap-1 transition-colors">
                        + Adicionar medicamento
                      </button>

                      {/* Como fica com/sem */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="comMedicacao">Como fica com medicação</Label>
                          <textarea id="comMedicacao" value={avaliacaoInicialData.comoFicaComMedicacao}
                            onChange={(e) => setAvaliacaoInicialData({ ...avaliacaoInicialData, comoFicaComMedicacao: e.target.value })}
                            rows={3} placeholder="Descreva o comportamento / estado com medicação..."
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none mt-1 text-sm" />
                        </div>
                        <div>
                          <Label htmlFor="semMedicacao">Como fica sem medicação</Label>
                          <textarea id="semMedicacao" value={avaliacaoInicialData.comoFicaSemMedicacao}
                            onChange={(e) => setAvaliacaoInicialData({ ...avaliacaoInicialData, comoFicaSemMedicacao: e.target.value })}
                            rows={3} placeholder="Descreva o comportamento / estado sem medicação..."
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none mt-1 text-sm" />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </section>

              {/* Anamnese */}
              <section>
                <h3 className="text-indigo-700 font-semibold text-lg mb-4 pb-2 border-b border-indigo-100">
                  Anamnese — História Geral
                </h3>

                <div className="overflow-x-auto rounded-lg border border-gray-200">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-indigo-50 text-indigo-700">
                        <th className="px-4 py-2 text-left font-medium w-[30%]">Pergunta</th>
                        <th className="px-4 py-2 text-left font-medium w-[35%]">Resposta</th>
                        <th className="px-4 py-2 text-left font-medium w-[35%]">Observações</th>
                      </tr>
                    </thead>
                    <tbody>
                      {([
                        { key: 'relacionamentoPais',      label: 'Relacionamento dos pais' },
                        { key: 'historiaGravidezAdocao',  label: 'História de gravidez / adoção' },
                        { key: 'gravidezPlanejada',       label: 'Gravidez planejada' },
                      ] as { key: keyof typeof avaliacaoInicialData.anamnese; label: string }[]).map(({ key, label }, idx) => (
                        <tr key={key} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                          <td className="px-4 py-2 font-medium text-gray-700 align-top pt-3">{label}</td>
                          <td className="px-2 py-1.5">
                            <textarea
                              value={avaliacaoInicialData.anamnese[key].resposta}
                              onChange={(e) => setAvaliacaoInicialData({
                                ...avaliacaoInicialData,
                                anamnese: {
                                  ...avaliacaoInicialData.anamnese,
                                  [key]: { ...avaliacaoInicialData.anamnese[key], resposta: e.target.value }
                                }
                              })}
                              rows={2}
                              placeholder="Resposta..."
                              className="w-full px-2 py-1 border border-gray-200 rounded focus:ring-1 focus:ring-indigo-400 focus:border-indigo-400 text-sm bg-transparent resize-none"
                            />
                          </td>
                          <td className="px-2 py-1.5">
                            <textarea
                              value={avaliacaoInicialData.anamnese[key].observacoes}
                              onChange={(e) => setAvaliacaoInicialData({
                                ...avaliacaoInicialData,
                                anamnese: {
                                  ...avaliacaoInicialData.anamnese,
                                  [key]: { ...avaliacaoInicialData.anamnese[key], observacoes: e.target.value }
                                }
                              })}
                              rows={2}
                              placeholder="Observações..."
                              className="w-full px-2 py-1 border border-gray-200 rounded focus:ring-1 focus:ring-indigo-400 focus:border-indigo-400 text-sm bg-transparent resize-none"
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>

              {/* Gestação */}
              <section>
                <h3 className="text-indigo-700 font-semibold text-lg mb-4 pb-2 border-b border-indigo-100">
                  🤰 Gestação
                </h3>
                <div className="overflow-x-auto rounded-lg border border-gray-200">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-indigo-50 text-indigo-700">
                        <th className="px-4 py-2 text-left font-medium w-[32%]">Aspecto</th>
                        <th className="px-4 py-2 text-left font-medium w-[28%]">Resposta</th>
                        <th className="px-4 py-2 text-left font-medium w-[40%]">Observações</th>
                      </tr>
                    </thead>
                    <tbody>
                      {([
                        { key: 'fezPreNatal',          label: 'Fez pré-natal?',                    tipo: 'simnao' },
                        { key: 'semanasDias',          label: 'Nasceu com quantas semanas/dias?',  tipo: 'texto' },
                        { key: 'complicacoesGestacao', label: 'Complicações na gestação/gravidez?', tipo: 'simnao' },
                        { key: 'usoMedicacaoGestacao', label: 'Uso de medicação na gestação?',     tipo: 'simnao' },
                        { key: 'usoAlcoolCigarro',     label: 'Uso de álcool/cigarro?',            tipo: 'simnao' },
                        { key: 'estresseGestacional',  label: 'Estresse gestacional importante?',  tipo: 'simnao' },
                      ] as { key: keyof typeof avaliacaoInicialData.gestacao; label: string; tipo: string }[]).map(({ key, label, tipo }, idx) => {
                        const item = avaliacaoInicialData.gestacao[key];
                        const showObs = tipo === 'texto' || item.valor === 'sim';
                        return (
                          <tr key={key} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                            <td className="px-4 py-2 font-medium text-gray-700 align-top pt-3">{label}</td>
                            <td className="px-3 py-2 align-top pt-3">
                              {tipo === 'simnao' ? (
                                <div className="flex gap-4">
                                  {(['sim', 'nao'] as const).map(v => (
                                    <label key={v} className="flex items-center gap-1.5 cursor-pointer">
                                      <input type="radio" name={`gestacao-${key}`} value={v}
                                        checked={item.valor === v}
                                        onChange={() => setAvaliacaoInicialData({ ...avaliacaoInicialData, gestacao: { ...avaliacaoInicialData.gestacao, [key]: { ...item, valor: v } } })}
                                        className="w-3.5 h-3.5 text-indigo-600" />
                                      <span className="text-gray-700">{v === 'sim' ? 'Sim' : 'Não'}</span>
                                    </label>
                                  ))}
                                </div>
                              ) : (
                                <input type="text" value={item.valor}
                                  onChange={(e) => setAvaliacaoInicialData({ ...avaliacaoInicialData, gestacao: { ...avaliacaoInicialData.gestacao, [key]: { ...item, valor: e.target.value } } })}
                                  placeholder="Ex: 38 semanas"
                                  className="w-full px-2 py-1 border border-gray-200 rounded focus:ring-1 focus:ring-indigo-400 text-sm bg-transparent" />
                              )}
                            </td>
                            <td className="px-2 py-1.5 align-top">
                              {showObs && (
                                <textarea value={item.obs}
                                  onChange={(e) => setAvaliacaoInicialData({ ...avaliacaoInicialData, gestacao: { ...avaliacaoInicialData.gestacao, [key]: { ...item, obs: e.target.value } } })}
                                  rows={2} placeholder="Observações..."
                                  className="w-full px-2 py-1 border border-gray-200 rounded focus:ring-1 focus:ring-indigo-400 text-sm bg-transparent resize-none" />
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </section>

              {/* Parto / Nascimento */}
              <section>
                <h3 className="text-indigo-700 font-semibold text-lg mb-4 pb-2 border-b border-indigo-100">
                  👶 Parto / Nascimento
                </h3>
                <div className="overflow-x-auto rounded-lg border border-gray-200">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-indigo-50 text-indigo-700">
                        <th className="px-4 py-2 text-left font-medium w-[32%]">Aspecto</th>
                        <th className="px-4 py-2 text-left font-medium w-[28%]">Resposta</th>
                        <th className="px-4 py-2 text-left font-medium w-[40%]">Observações</th>
                      </tr>
                    </thead>
                    <tbody>
                      {([
                        { key: 'tipoParto',            label: 'Tipo de parto',             tipo: 'parto' },
                        { key: 'complicacoesParto',    label: 'Complicações no parto?',    tipo: 'simnao' },
                        { key: 'necessitouOxigenio',   label: 'Necessitou oxigênio?',      tipo: 'simnao' },
                        { key: 'utiNeonatal',          label: 'UTI neonatal?',             tipo: 'simnao' },
                        { key: 'fezPosNatal',          label: 'Fez pós-natal?',            tipo: 'simnao' },
                        { key: 'complicacoesNeonatal', label: 'Complicações neonatal?',    tipo: 'simnao' },
                        { key: 'ictericia',            label: 'Icterícia?',                tipo: 'simnao' },
                        { key: 'pesoAoNascer',         label: 'Peso ao nascer',            tipo: 'texto' },
                        { key: 'apgar',                label: 'APGAR',                     tipo: 'texto' },
                      ] as { key: keyof typeof avaliacaoInicialData.parto; label: string; tipo: string }[]).map(({ key, label, tipo }, idx) => {
                        const item = avaliacaoInicialData.parto[key];
                        const showObs = tipo === 'texto' || item.valor === 'sim' || tipo === 'parto';
                        return (
                          <tr key={key} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                            <td className="px-4 py-2 font-medium text-gray-700 align-top pt-3">{label}</td>
                            <td className="px-3 py-2 align-top pt-3">
                              {tipo === 'simnao' && (
                                <div className="flex gap-4">
                                  {(['sim', 'nao'] as const).map(v => (
                                    <label key={v} className="flex items-center gap-1.5 cursor-pointer">
                                      <input type="radio" name={`parto-${key}`} value={v}
                                        checked={item.valor === v}
                                        onChange={() => setAvaliacaoInicialData({ ...avaliacaoInicialData, parto: { ...avaliacaoInicialData.parto, [key]: { ...item, valor: v } } })}
                                        className="w-3.5 h-3.5 text-indigo-600" />
                                      <span className="text-gray-700">{v === 'sim' ? 'Sim' : 'Não'}</span>
                                    </label>
                                  ))}
                                </div>
                              )}
                              {tipo === 'parto' && (
                                <div className="flex gap-4">
                                  {(['cesárea', 'normal'] as const).map(v => (
                                    <label key={v} className="flex items-center gap-1.5 cursor-pointer">
                                      <input type="radio" name="parto-tipoParto" value={v}
                                        checked={item.valor === v}
                                        onChange={() => setAvaliacaoInicialData({ ...avaliacaoInicialData, parto: { ...avaliacaoInicialData.parto, [key]: { ...item, valor: v } } })}
                                        className="w-3.5 h-3.5 text-indigo-600" />
                                      <span className="text-gray-700 capitalize">{v}</span>
                                    </label>
                                  ))}
                                </div>
                              )}
                              {tipo === 'texto' && (
                                <input type="text" value={item.valor}
                                  onChange={(e) => setAvaliacaoInicialData({ ...avaliacaoInicialData, parto: { ...avaliacaoInicialData.parto, [key]: { ...item, valor: e.target.value } } })}
                                  placeholder={key === 'pesoAoNascer' ? 'Ex: 3,2 kg' : 'Ex: 8/9'}
                                  className="w-full px-2 py-1 border border-gray-200 rounded focus:ring-1 focus:ring-indigo-400 text-sm bg-transparent" />
                              )}
                            </td>
                            <td className="px-2 py-1.5 align-top">
                              {showObs && (
                                <textarea value={item.obs}
                                  onChange={(e) => setAvaliacaoInicialData({ ...avaliacaoInicialData, parto: { ...avaliacaoInicialData.parto, [key]: { ...item, obs: e.target.value } } })}
                                  rows={2} placeholder="Observações..."
                                  className="w-full px-2 py-1 border border-gray-200 rounded focus:ring-1 focus:ring-indigo-400 text-sm bg-transparent resize-none" />
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </section>

              {/* Desenvolvimento Motor */}
              <section>
                <h3 className="text-indigo-700 font-semibold text-lg mb-4 pb-2 border-b border-indigo-100">
                  🍼 Desenvolvimento Motor
                </h3>
                <div className="overflow-x-auto rounded-lg border border-gray-200">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-indigo-50 text-indigo-700">
                        <th className="px-4 py-2 text-left font-medium w-[35%]">Marco do Desenvolvimento</th>
                        <th className="px-4 py-2 text-left font-medium w-[20%]">Idade</th>
                        <th className="px-4 py-2 text-left font-medium w-[45%]">Observações</th>
                      </tr>
                    </thead>
                    <tbody>
                      {([
                        { key: 'sustentouCabeca',       label: 'Sustentou cabeça' },
                        { key: 'rolou',                 label: 'Rolou' },
                        { key: 'sentou',                label: 'Sentou' },
                        { key: 'engatinhou',            label: 'Engatinhou' },
                        { key: 'ficouEmPe',             label: 'Ficou em pé' },
                        { key: 'andou',                 label: 'Andou' },
                        { key: 'correu',                label: 'Correu' },
                        { key: 'saltou',                label: 'Saltou' },
                        { key: 'controleEsfincteriano', label: 'Controle esfincteriano' },
                      ] as { key: keyof typeof avaliacaoInicialData.desenvolvimentoMotor; label: string }[]).map(({ key, label }, idx) => {
                        const item = avaliacaoInicialData.desenvolvimentoMotor[key];
                        return (
                          <tr key={key} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                            <td className="px-4 py-2 font-medium text-gray-700">{label}</td>
                            <td className="px-2 py-1.5">
                              <input
                                type="text"
                                value={item.idade}
                                onChange={(e) => setAvaliacaoInicialData({
                                  ...avaliacaoInicialData,
                                  desenvolvimentoMotor: {
                                    ...avaliacaoInicialData.desenvolvimentoMotor,
                                    [key]: { ...item, idade: e.target.value },
                                  },
                                })}
                                placeholder="Ex: 3 meses"
                                className="w-full px-2 py-1 border border-gray-200 rounded focus:ring-1 focus:ring-indigo-400 text-sm bg-transparent"
                              />
                            </td>
                            <td className="px-2 py-1.5">
                              <input
                                type="text"
                                value={item.obs}
                                onChange={(e) => setAvaliacaoInicialData({
                                  ...avaliacaoInicialData,
                                  desenvolvimentoMotor: {
                                    ...avaliacaoInicialData.desenvolvimentoMotor,
                                    [key]: { ...item, obs: e.target.value },
                                  },
                                })}
                                placeholder="Observações..."
                                className="w-full px-2 py-1 border border-gray-200 rounded focus:ring-1 focus:ring-indigo-400 text-sm bg-transparent"
                              />
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </section>

              {/* Desenvolvimento da Linguagem */}
              <section>
                <h3 className="text-indigo-700 font-semibold text-lg mb-4 pb-2 border-b border-indigo-100">
                  🗣️ Desenvolvimento da Linguagem
                </h3>
                <div className="overflow-x-auto rounded-lg border border-gray-200 mb-4">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-indigo-50 text-indigo-700">
                        <th className="px-4 py-2 text-left font-medium w-[35%]">Marco</th>
                        <th className="px-4 py-2 text-left font-medium w-[20%]">Idade</th>
                        <th className="px-4 py-2 text-left font-medium w-[45%]">Observações</th>
                      </tr>
                    </thead>
                    <tbody>
                      {([
                        { key: 'balbuciou',            label: 'Balbuciou' },
                        { key: 'sorrioRisadaSocial',   label: 'Sorriu / risada social' },
                        { key: 'atencaoCompartilhada', label: 'Atenção compartilhada' },
                        { key: 'imitacao',             label: 'Imitação' },
                        { key: 'primeirasPalavras',    label: 'Falou primeiras palavras' },
                        { key: 'formouFrases',         label: 'Formou frases' },
                        { key: 'comunicacaoFuncional', label: 'Comunicação funcional' },
                      ] as { key: keyof Omit<typeof avaliacaoInicialData.desenvolvimentoLinguagem, 'obsGestaDesenvolvimento'>; label: string }[]).map(({ key, label }, idx) => {
                        const item = avaliacaoInicialData.desenvolvimentoLinguagem[key] as { idade: string; obs: string };
                        return (
                          <tr key={key} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                            <td className="px-4 py-2 font-medium text-gray-700">{label}</td>
                            <td className="px-2 py-1.5">
                              <input
                                type="text"
                                value={item.idade}
                                onChange={(e) => setAvaliacaoInicialData({
                                  ...avaliacaoInicialData,
                                  desenvolvimentoLinguagem: {
                                    ...avaliacaoInicialData.desenvolvimentoLinguagem,
                                    [key]: { ...item, idade: e.target.value },
                                  },
                                })}
                                placeholder="Ex: 6 meses"
                                className="w-full px-2 py-1 border border-gray-200 rounded focus:ring-1 focus:ring-indigo-400 text-sm bg-transparent"
                              />
                            </td>
                            <td className="px-2 py-1.5">
                              <input
                                type="text"
                                value={item.obs}
                                onChange={(e) => setAvaliacaoInicialData({
                                  ...avaliacaoInicialData,
                                  desenvolvimentoLinguagem: {
                                    ...avaliacaoInicialData.desenvolvimentoLinguagem,
                                    [key]: { ...item, obs: e.target.value },
                                  },
                                })}
                                placeholder="Observações..."
                                className="w-full px-2 py-1 border border-gray-200 rounded focus:ring-1 focus:ring-indigo-400 text-sm bg-transparent"
                              />
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                {/* Obs geral gestação/desenvolvimento */}
                <div>
                  <Label htmlFor="obsGestaDesenv" className="font-medium text-gray-800">
                    Obs: Sobre gestação / desenvolvimento
                  </Label>
                  <textarea
                    id="obsGestaDesenv"
                    value={avaliacaoInicialData.desenvolvimentoLinguagem.obsGestaDesenvolvimento}
                    onChange={(e) => setAvaliacaoInicialData({
                      ...avaliacaoInicialData,
                      desenvolvimentoLinguagem: {
                        ...avaliacaoInicialData.desenvolvimentoLinguagem,
                        obsGestaDesenvolvimento: e.target.value,
                      },
                    })}
                    rows={4}
                    placeholder="Observações gerais sobre gestação e desenvolvimento..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none mt-1 text-sm"
                  />
                </div>
              </section>

              {/* Saúde Física */}
              <section>
                <h3 className="text-indigo-700 font-semibold text-lg mb-4 pb-2 border-b border-indigo-100">
                  🏥 Saúde Física do Praticante / Candidato
                </h3>

                <div className="flex flex-wrap gap-4">
                  {([
                    { key: 'cardiaco',    label: 'Cardíaco' },
                    { key: 'hipertenso',  label: 'Hipertenso' },
                    { key: 'alergias',    label: 'Alergias' },
                    { key: 'saudeFrágil', label: 'Saúde frágil (fica doente fácil)' },
                    { key: 'hivAids',     label: 'HIV/AIDS' },
                  ] as { key: keyof Omit<typeof avaliacaoInicialData.saudeFisica, 'etc'>; label: string }[]).map(({ key, label }) => (
                    <label key={key} className="flex items-center gap-2 cursor-pointer bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 hover:bg-indigo-50 hover:border-indigo-300 transition-colors">
                      <input
                        type="checkbox"
                        checked={avaliacaoInicialData.saudeFisica[key] as boolean}
                        onChange={(e) => setAvaliacaoInicialData({
                          ...avaliacaoInicialData,
                          saudeFisica: { ...avaliacaoInicialData.saudeFisica, [key]: e.target.checked },
                        })}
                        className="w-4 h-4 text-indigo-600 rounded"
                      />
                      <span className="text-gray-700 text-sm">{label}</span>
                    </label>
                  ))}
                </div>

                <div className="mt-4">
                  <Label htmlFor="saudeFisicaEtc">Outros (ETC)</Label>
                  <input
                    id="saudeFisicaEtc"
                    type="text"
                    value={avaliacaoInicialData.saudeFisica.etc}
                    onChange={(e) => setAvaliacaoInicialData({
                      ...avaliacaoInicialData,
                      saudeFisica: { ...avaliacaoInicialData.saudeFisica, etc: e.target.value },
                    })}
                    placeholder="Descreva outras condições de saúde..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent mt-1 text-sm"
                  />
                </div>
              </section>

              {/* Aspectos Fisiológicos */}
              <section>
                <h3 className="text-indigo-700 font-semibold text-lg mb-4 pb-2 border-b border-indigo-100">
                  🍽️ Aspectos Fisiológicos
                </h3>
                <div className="overflow-x-auto rounded-lg border border-gray-200">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-indigo-50 text-indigo-700">
                        <th className="px-4 py-2 text-left font-medium w-[30%]">Área</th>
                        <th className="px-4 py-2 text-left font-medium w-[70%]">Observações</th>
                      </tr>
                    </thead>
                    <tbody>
                      {([
                        { key: 'alimentacao',    label: 'Alimentação' },
                        { key: 'sono',           label: 'Sono' },
                        { key: 'interacaoSocial', label: 'Interação social' },
                        { key: 'tpm',            label: 'TPM' },
                      ] as { key: keyof typeof avaliacaoInicialData.aspectosFisiologicos; label: string }[]).map(({ key, label }, idx) => (
                        <tr key={key} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                          <td className="px-4 py-2 font-medium text-gray-700">{label}</td>
                          <td className="px-2 py-1.5">
                            <textarea
                              value={avaliacaoInicialData.aspectosFisiologicos[key]}
                              onChange={(e) => setAvaliacaoInicialData({
                                ...avaliacaoInicialData,
                                aspectosFisiologicos: { ...avaliacaoInicialData.aspectosFisiologicos, [key]: e.target.value },
                              })}
                              rows={2}
                              placeholder="Observações..."
                              className="w-full px-2 py-1 border border-gray-200 rounded focus:ring-1 focus:ring-indigo-400 text-sm bg-transparent resize-none"
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>

              {/* Queixa / Objetivo Familiar */}
              <section>
                <h3 className="text-indigo-700 font-semibold text-lg mb-4 pb-2 border-b border-indigo-100">
                  🎯 Queixa / Objetivo Familiar
                </h3>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="descricaoDemanda">1) Descrição da Demanda</Label>
                    <textarea
                      id="descricaoDemanda"
                      value={avaliacaoInicialData.queixaObjetivo.descricaoDemanda}
                      onChange={(e) => setAvaliacaoInicialData({
                        ...avaliacaoInicialData,
                        queixaObjetivo: { ...avaliacaoInicialData.queixaObjetivo, descricaoDemanda: e.target.value },
                      })}
                      rows={3}
                      placeholder="Descreva a demanda apresentada pela família..."
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none mt-1 text-sm"
                    />
                  </div>
                  <div>
                    <Label htmlFor="historicodoenca">2) Histórico da Doença</Label>
                    <textarea
                      id="historicodoenca"
                      value={avaliacaoInicialData.queixaObjetivo.historicodoenca}
                      onChange={(e) => setAvaliacaoInicialData({
                        ...avaliacaoInicialData,
                        queixaObjetivo: { ...avaliacaoInicialData.queixaObjetivo, historicodoenca: e.target.value },
                      })}
                      rows={3}
                      placeholder="Descreva o histórico da doença / condição..."
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none mt-1 text-sm"
                    />
                  </div>
                  <div>
                    <Label htmlFor="expectativaTratamento">3) Expectativa de Tratamento Equoterapêutico</Label>
                    <textarea
                      id="expectativaTratamento"
                      value={avaliacaoInicialData.queixaObjetivo.expectativaTratamento}
                      onChange={(e) => setAvaliacaoInicialData({
                        ...avaliacaoInicialData,
                        queixaObjetivo: { ...avaliacaoInicialData.queixaObjetivo, expectativaTratamento: e.target.value },
                      })}
                      rows={3}
                      placeholder="Qual a expectativa da família com o tratamento equoterapêutico..."
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none mt-1 text-sm"
                    />
                  </div>
                </div>
              </section>

              {/* Rotina / Atividades Extras / Melhor Horário */}
              <section>
                <h3 className="text-indigo-700 font-semibold text-lg mb-4 pb-2 border-b border-indigo-100">
                  📅 Rotina / Atividades Extras / Melhor Horário para o Praticante
                </h3>
                <div className="overflow-x-auto rounded-lg border border-gray-200">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-indigo-50 text-indigo-700">
                        <th className="px-3 py-2 text-left font-medium w-[14%]"></th>
                        {['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'].map(d => (
                          <th key={d} className="px-2 py-2 text-center font-medium">{d}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {([
                        { key: 'matutino',   label: 'Matutino' },
                        { key: 'vespertino', label: 'Vespertino' },
                        { key: 'noturno',    label: 'Noturno' },
                      ] as { key: keyof typeof avaliacaoInicialData.rotina; label: string }[]).map(({ key, label }, idx) => (
                        <tr key={key} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                          <td className="px-3 py-2 font-medium text-gray-700 whitespace-nowrap">{label}</td>
                          {(['segunda', 'terca', 'quarta', 'quinta', 'sexta', 'sabado'] as const).map(dia => (
                            <td key={dia} className="px-1.5 py-1.5">
                              <input
                                type="text"
                                value={avaliacaoInicialData.rotina[key][dia]}
                                onChange={(e) => setAvaliacaoInicialData({
                                  ...avaliacaoInicialData,
                                  rotina: {
                                    ...avaliacaoInicialData.rotina,
                                    [key]: { ...avaliacaoInicialData.rotina[key], [dia]: e.target.value },
                                  },
                                })}
                                placeholder="—"
                                className="w-full px-2 py-1 border border-gray-200 rounded focus:ring-1 focus:ring-indigo-400 text-sm bg-transparent text-center"
                              />
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>

            </div>

            {/* Footer */}
            <div className="border-t border-gray-200 px-6 py-4 rounded-b-xl">
              <div className="flex gap-3 justify-center">
                <Button variant="outline" onClick={() => setShowAvaliacaoInicialModal(false)} className="px-8">
                  Cancelar
                </Button>
                <Button onClick={handleSalvarAvaliacaoInicial} className="bg-indigo-600 hover:bg-indigo-700 px-8">
                  <FileText className="h-4 w-4 mr-2" />
                  Salvar Avaliação Inicial
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}