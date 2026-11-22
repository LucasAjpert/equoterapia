export interface Documento {
  id: string;
  tipo: string;
  praticante: string;
  colaboradores: string[];
  dataGeracao: string;
}

export interface TerapiaItem {
  ativo: boolean;
  jaFezFaz?: string; // só para fisioterapia
  nome: string;
  tempo: string;
}

export interface EscolaItem {
  ativo: boolean;
  qualEscola: string;
  serie: string;
  reprovacoes: string;
  dificuldades: string;
}

export interface MedicaItem {
  ativo: boolean;
  qualArea: string;
  nome: string;
  tempo: string;
}

export interface MedicamentoRow {
  medicacao: string;
  dosagem: string;
  horario: string;
  finalidade: string;
}

export interface AvaliacaoInicialData {
  nomePraticante: string;
  idade: string;
  dataNascimento: string;
  diagnostico: string;
  contraindicacoes: any[];
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

export interface ReavaliacaoData {
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

export interface EstudoCasoData {
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

export interface MudancaMediacaoData {
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

export interface AltaData {
  tipoAlta: 'definitiva' | 'temporaria' | '';
  nomePraticante: string;
  descricao: string;
  motivo: string;
  procedimento: string;
  assinaturaMediador: string;
  assinaturaLateral: string;
  assinaturaGuia: string;
}

export interface MediadorInicialData {
  nomeMediador: string;
  nomePraticante: string;
}

export interface MudancaProgramaData {
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

export interface ParecerData {
  nomeSolicitante: string;
  paraQualFins: string;
  deQueHora: string;
  ateQualHora: string;
  data: string;
}

export interface ParecerMedicoData {
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