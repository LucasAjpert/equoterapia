import { useState, useEffect, useRef } from 'react';
import { Pencil } from 'lucide-react';

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

interface PraticanteDados {
  nome: string;
  anoNascimento: number;
  cid: string;
}

interface EquinoDados {
  nome: string;
  peso: string;
  comprimentoPescoco: string;
  larguraTronco: string;
  alturaCernelha: string;
  alturaAnca: string;
  comprimento: string;
  ferradura: string;
}

interface AtendimentoPageProps {
  evento: Evento;
  praticanteDados: PraticanteDados | null;
  equinoDados: EquinoDados | null;
  onVoltar: () => void;
}

export function AtendimentoPage({ evento, praticanteDados, equinoDados, onVoltar }: AtendimentoPageProps) {
  const [quadroClinico, setQuadroClinico] = useState('');
  const [preRequisito, setPreRequisito] = useState('');
  const [listaObjetivos, setListaObjetivos] = useState<string[]>([]);
  const [objetivosSelecionados, setObjetivosSelecionados] = useState<number[]>([]);
  const [novoObjetivo, setNovoObjetivo] = useState('');

  // Estados para Exame de Entrada
  const [batimentoCardiaco, setBatimentoCardiaco] = useState('');
  const [oxigenio, setOxigenio] = useState('');
  const [pressao, setPressao] = useState('');
  const [temperatura, setTemperatura] = useState('');
  const [respiracao, setRespiracao] = useState('');
  const [observacaoEntrada, setObservacaoEntrada] = useState('');

  // Estados para Exame de Saída
  const [batimentoCardiacoSaida, setBatimentoCardiacoSaida] = useState('');
  const [oxigenioSaida, setOxigenioSaida] = useState('');
  const [pressaoSaida, setPressaoSaida] = useState('');
  const [temperaturaSaida, setTemperaturaSaida] = useState('');
  const [respiracaoSaida, setRespiracaoSaida] = useState('');
  const [observacaoSaida, setObservacaoSaida] = useState('');
  
  // Estados para Nível de Suporte da Montaria no Centro de Gravidade
  const [nivelPostura, setNivelPostura] = useState('');
  const [nivelEstabilidade, setNivelEstabilidade] = useState('');
  const [nivelMobilidade, setNivelMobilidade] = useState('');
  const [nivelFadiga, setNivelFadiga] = useState('');
  
  // Estados para Linha de Base Inferência
  const [notaSessaoAtual, setNotaSessaoAtual] = useState('');
  const [observacaoSessaoAtual, setObservacaoSessaoAtual] = useState('');
  const [historicoSessoes, setHistoricoSessoes] = useState<Array<{
    numeroSessao: number;
    nota: number;
    observacao: string;
    objetivo: string;
  }>>([
    // Dados mock de sessões anteriores
    { numeroSessao: 1, nota: 7, observacao: 'Primeira sessão, adaptação ao cavalo', objetivo: 'Desenvolver confiança, Melhorar equilíbrio' },
    { numeroSessao: 2, nota: 8, observacao: 'Melhora na postura e equilíbrio', objetivo: 'Melhorar equilíbrio, Fortalecer postura' },
    { numeroSessao: 3, nota: 6, observacao: 'Apresentou cansaço precoce', objetivo: 'Aumentar resistência, Melhorar equilíbrio' },
  ]);
  
  // Estados para modal de Encerrar
  const [modalEncerrarAberta, setModalEncerrarAberta] = useState(false);
  const [motivoEncerramento, setMotivoEncerramento] = useState('');
  const [detalheEncerramento, setDetalheEncerramento] = useState('');
  
  // Estados para Evolução Topográfica
  const [cronometroSegundos, setCronometroSegundos] = useState(0);
  const [cronometroAtivo, setCronometroAtivo] = useState(false);
  const [tempoEditavel, setTempoEditavel] = useState('0:00');
  const [montar, setMontar] = useState('');
  const [percurso, setPercurso] = useState('');
  const [apear, setApear] = useState('');
  const [planoTerapeutico, setPlanoTerapeutico] = useState('');
  const [planoAtividade, setPlanoAtividade] = useState('');
  const [planoNota, setPlanoNota] = useState('');
  const [planoObservacoes, setPlanoObservacoes] = useState('');
  const [minutoMarcado, setMinutoMarcado] = useState<number | null>(null);
  const [tipoPercursoMarcado, setTipoPercursoMarcado] = useState<string | null>(null);
  
  // Estados para edição de Plano Terapêutico
  const [editandoPlanoIndex, setEditandoPlanoIndex] = useState<number | null>(null);
  const [planoEditando, setPlanoEditando] = useState({
    nome: '',
    atividade: '',
    nota: '',
    observacoes: ''
  });
  
  // Estado para rastrear o último tipo de comando executado
  const [ultimoTipoComando, setUltimoTipoComando] = useState<string>('parado');
  
  // Ref para a tabela
  const tabelaRef = useRef<HTMLTableElement>(null);
  
  // Array para armazenar todos os pontos marcados
  interface PontoMarcado {
    minuto: number;
    tipoPercurso: string;
    tempo: string;
    montar: string;
    percurso: string;
    apear: string;
    guiadoOuControlado?: 'guiado' | 'controlado' | null;
    selaOuManta?: 'sela' | 'manta' | null;
    numeroMontagem?: number | null;
    numeroApear?: number | null;
    tipoSuperficie?: 'asfalto' | 'areia' | null;
    planoTerapeutico?: string;
    planoAtividade?: string;
    planoNota?: string;
    planoObservacoes?: string;
    tipoEstribo?: 'gaiola' | 'no_estribo' | 'fora_estribo' | null;
    simboloEstribo?: '[' | ']' | '(' | ')' | null;
  }
  const [pontosMarcados, setPontosMarcados] = useState<PontoMarcado[]>([]);
  const [montouAtualmente, setMontouAtualmente] = useState(false);
  const [ultimoTipoEstribo, setUltimoTipoEstribo] = useState<'gaiola' | 'no_estribo' | 'fora_estribo' | null>(null);
  
  // Estados para Perfil do Programa
  const [perfilPrograma, setPerfilPrograma] = useState('');
  
  // useEffect para atualizar o cronômetro
  useEffect(() => {
    let intervalo: NodeJS.Timeout | null = null;
    
    if (cronometroAtivo) {
      intervalo = setInterval(() => {
        setCronometroSegundos((prev) => {
          const novoTempo = prev + 1;
          const minutos = Math.floor(novoTempo / 60);
          const segundos = novoTempo % 60;
          setTempoEditavel(`${minutos}:${segundos.toString().padStart(2, '0')}`);
          return novoTempo;
        });
      }, 1000);
    }
    
    return () => {
      if (intervalo) clearInterval(intervalo);
    };
  }, [cronometroAtivo]);

  const iniciarCronometro = () => {
    setCronometroAtivo(true);
  };

  const pausarCronometro = () => {
    setCronometroAtivo(false);
  };

  const zerarCronometro = () => {
    setCronometroAtivo(false);
    setCronometroSegundos(0);
    setTempoEditavel('0:00');
  };

  const formatarCronometro = () => {
    const minutos = Math.floor(cronometroSegundos / 60);
    const segundos = cronometroSegundos % 60;
    return `${minutos}:${segundos.toString().padStart(2, '0')}`;
  };

  const calcularIdade = (anoNascimento: number) => {
    const anoAtual = new Date().getFullYear();
    return anoAtual - anoNascimento;
  };

  // Função para obter a faixa de classificação de uma nota
  const obterFaixaNota = (nota: number): string => {
    if (nota >= 9 && nota <= 10) return 'excesso';
    if (nota >= 7 && nota <= 8) return 'otimo';
    if (nota >= 5 && nota <= 6) return 'satisfatorio';
    if (nota >= 3 && nota <= 4) return 'insatisfatorio';
    if (nota >= 1 && nota <= 2) return 'falta';
    return '';
  };

  // Função para abreviar palavra pelas duas primeiras sílabas
  const abreviarPorSilabas = (palavra: string): string => {
    if (!palavra || palavra.trim() === '') return '';

    const texto = palavra.toLowerCase().trim();
    // Pegar apenas as três primeiras letras
    return texto.substring(0, 3);
  };

  // Função para extrair o número da nota (ex: "22 - Fez, com apoio fisico" -> "22")
  const extrairNumeroNota = (nota: string): string => {
    if (!nota || nota.trim() === '') return '';

    const match = nota.match(/^(\d+)/);
    return match ? match[1] : '';
  };

  const handleGerarPlanoTerapeutico = () => {
    // Validar se algum campo do Plano Terapêutico foi preenchido
    const algumCampoPlanoPreenchido = planoTerapeutico.trim() !== '' || 
                                       planoAtividade.trim() !== '' || 
                                       planoNota.trim() !== '';
    
    // Se algum campo foi preenchido, todos devem ser obrigatórios
    if (algumCampoPlanoPreenchido) {
      if (planoTerapeutico.trim() === '' || planoAtividade.trim() === '' || planoNota.trim() === '') {
        alert('Se você preencher o Plano Terapêutico Aberto, os campos Nome, Atividade e Nota são obrigatórios.');
        return;
      }
    }
    
    // Validar se está tentando apear sem ter montado antes
    if (apear && !montouAtualmente) {
      alert('Você precisa realizar um Montar antes de poder Apear.');
      return;
    }
    
    // Validar percursos baseado no estado de montagem
    if (percurso) {
      const tipoPercurso = percurso.split(';')[0].trim();
      const percursosDesmontados = ['deambular', 'correr'];
      const percursosMontados = ['galope', 'trote', 'transpista', 'sobrepista', 'antepista'];
      
      // Se está montado, não pode escolher percursos desmontados (deambular ou correr)
      if (montouAtualmente && percursosDesmontados.includes(tipoPercurso)) {
        alert('Você está montado. Para fazer "deambular" ou "correr", você precisa Apear primeiro.');
        return;
      }
      
      // Se não está montado, não pode escolher percursos montados
      if (!montouAtualmente && percursosMontados.includes(tipoPercurso)) {
        alert('Você precisa realizar um Montar antes de poder fazer percursos montados (galope, trote, transpista, sobrepista, antepista).');
        return;
      }
      
      // "parado" pode ser escolhido tanto montado quanto desmontado
    }
    
    // Validar se está tentando adicionar apenas plano terapêutico
    // Pode adicionar plano terapêutico tanto montado quanto desmontado
    if (!montar && !percurso && !apear && algumCampoPlanoPreenchido) {
      // Verificar se há ao menos um ponto marcado anteriormente
      if (pontosMarcados.length === 0) {
        alert('Você precisa registrar ao menos uma ação (Montar, Percurso desmontado, etc) antes de adicionar apenas um Plano Terapêutico.');
        return;
      }
    }
    
    // Extrair o minuto do tempo (ignorando segundos)
    const minutos = parseInt(tempoEditavel.split(':')[0]) || 0;
    
    // Determinar o tipo de percurso baseado em Montar, Apear ou Percurso
    let tipoFinal = '';
    let guiadoOuControlado: 'guiado' | 'controlado' | null = null;
    let selaOuManta: 'sela' | 'manta' | null = null;
    let numeroMontagem: number | null = null;
    let numeroApear: number | null = null;
    let tipoSuperficie: 'asfalto' | 'areia' | null = null;
    let tipoEstribo: 'gaiola' | 'no_estribo' | 'fora_estribo' | null = null;
    let simboloEstribo: '[' | ']' | '(' | ')' | null = null;
    
    if (montar) {
      // Se preencheu Montar, marcar como "parado" e permitir novos movimentos
      tipoFinal = 'parado';
      setMontouAtualmente(true);
      setUltimoTipoComando('parado');
      
      // Extrair informações do campo Montar
      const partes = montar.split(';').map(p => p.trim());
      
      // Primeira parte: guiado ou controlado
      if (partes[0] === 'guiado' || partes[0] === 'controlado') {
        guiadoOuControlado = partes[0];
      }
      
      // Segunda parte: sela ou manta
      if (partes[1] === 'sela' || partes[1] === 'manta') {
        selaOuManta = partes[1];
      }
      
      // Terceira parte: converter para número
      const terceiraParte = partes[2];
      if (terceiraParte === 'colocado') numeroMontagem = 1;
      else if (terceiraParte === 'auxilio rampa') numeroMontagem = 2;
      else if (terceiraParte === 'rampa') numeroMontagem = 3;
      else if (terceiraParte === 'com auxilio') numeroMontagem = 4;
      else if (terceiraParte === 'sem auxilio') numeroMontagem = 5;
      
    } else if (apear) {
      // Se preencheu Apear, marcar como "parado" e permitir novo montar
      tipoFinal = 'parado';
      setMontouAtualmente(false);
      setUltimoTipoComando('parado');
      // Resetar o último tipo de estribo ao apear
      setUltimoTipoEstribo(null);
      
      // Converter valor do apear para número
      if (apear === 'tirado') numeroApear = 1;
      else if (apear === 'auxilio rampa') numeroApear = 2;
      else if (apear === 'rampa') numeroApear = 3;
      else if (apear === 'com auxilio') numeroApear = 4;
      else if (apear === 'sem auxilio') numeroApear = 5;
      
    } else if (percurso) {
      // Usar o percurso
      // Nota: Percursos montados não alteram o estado montouAtualmente (continua montado)
      // Percursos desmontados (deambular, correr) também não alteram o estado
      const primeiraPalavra = percurso.split(';')[0].trim();
      tipoFinal = primeiraPalavra;
      setUltimoTipoComando(primeiraPalavra);
      
      // Extrair a superfície do percurso
      const partesPercurso = percurso.split(';').map(p => p.trim());
      const segundaPalavra = partesPercurso[1];
      if (segundaPalavra === 'asfalto' || segundaPalavra === 'areia') {
        tipoSuperficie = segundaPalavra;
      }
      
      // Extrair o tipo de estribo (terceira parte)
      const terceiraParte = partesPercurso[2];
      if (terceiraParte) {
        if (terceiraParte === 'pé no estribo gaiola') {
          tipoEstribo = 'gaiola';
        } else if (terceiraParte === 'pé no estribo') {
          tipoEstribo = 'no_estribo';
        } else if (terceiraParte === 'pé fora do estribo') {
          tipoEstribo = 'fora_estribo';
        }
        
        // Determinar o símbolo baseado na lógica de abertura/fechamento
        if (tipoEstribo === 'gaiola') {
          if (ultimoTipoEstribo === 'gaiola') {
            // Mesma escolha = não mostra nada
            simboloEstribo = null;
          } else if (ultimoTipoEstribo === 'no_estribo') {
            // Fecha parêntese e abre colchete = ) [
            simboloEstribo = ') [';
          } else {
            // Primeira vez ou vindo de fora_estribo = abre colchete
            simboloEstribo = '[';
          }
          setUltimoTipoEstribo('gaiola');
        } else if (tipoEstribo === 'no_estribo') {
          if (ultimoTipoEstribo === 'no_estribo') {
            // Mesma escolha = não mostra nada
            simboloEstribo = null;
          } else if (ultimoTipoEstribo === 'gaiola') {
            // Fecha colchete e abre parêntese = ] (
            simboloEstribo = '] (';
          } else {
            // Primeira vez ou vindo de fora_estribo = abre parêntese
            simboloEstribo = '(';
          }
          setUltimoTipoEstribo('no_estribo');
        } else if (tipoEstribo === 'fora_estribo') {
          // pé fora do estribo fecha o que estava aberto
          if (ultimoTipoEstribo === 'gaiola') {
            simboloEstribo = ']'; // Fecha colchete
          } else if (ultimoTipoEstribo === 'no_estribo') {
            simboloEstribo = ')'; // Fecha parêntese
          } else {
            simboloEstribo = null; // Nada aberto = não mostra nada
          }
          setUltimoTipoEstribo('fora_estribo');
        }
      }
    } else if (!montar && !percurso && !apear && algumCampoPlanoPreenchido) {
      // Nova regra: Se apenas plano terapêutico foi preenchido (sem montar, percurso ou apear)
      // Usar o último tipo de comando executado
      // Nota: Não altera o estado montouAtualmente (mantém o estado atual)
      tipoFinal = ultimoTipoComando;
    }
    
    // Se não há tipo final e também não há plano terapêutico, não fazer nada
    if (!tipoFinal && !algumCampoPlanoPreenchido) {
      alert('Por favor, preencha ao menos um dos campos: Montar, Percurso, Apear ou Plano Terapêutico.');
      return;
    }
    
    // Se só tem plano terapêutico, garantir que tipoFinal está definido
    if (!tipoFinal && algumCampoPlanoPreenchido) {
      tipoFinal = ultimoTipoComando;
    }
    
    // Adicionar o novo ponto ao array
    if (tipoFinal) {
      setPontosMarcados(prev => [...prev, { 
        minuto: minutos, 
        tipoPercurso: tipoFinal, 
        tempo: tempoEditavel, 
        montar: montar, 
        percurso: percurso, 
        apear: apear,
        guiadoOuControlado,
        selaOuManta,
        numeroMontagem,
        numeroApear,
        tipoSuperficie,
        planoTerapeutico,
        planoAtividade,
        planoNota,
        planoObservacoes,
        tipoEstribo,
        simboloEstribo
      }]);
    }
    
    // Limpar os campos após gerar
    setTempoEditavel('0:00');
    setMontar('');
    setPercurso('');
    setApear('');
    setPlanoTerapeutico('');
    setPlanoAtividade('');
    setPlanoNota('');
    setPlanoObservacoes('');
  };

  // Função para remover um ponto marcado
  const handleRemoverPonto = (index: number) => {
    // Confirmar antes de excluir
    if (!confirm('Tem certeza que deseja excluir esse registro?')) {
      return;
    }
    
    const pontoRemovido = pontosMarcados[index];
    const novospontos = pontosMarcados.filter((_, i) => i !== index);
    
    setPontosMarcados(novospontos);
    
    // Recalcular o estado de montagem baseado em TODOS os pontos restantes
    if (novospontos.length > 0) {
      // Percorrer todos os pontos para determinar o estado atual de montagem
      let estadoMontado = false;
      let ultimoEstriboCaptado: 'gaiola' | 'no_estribo' | 'fora_estribo' | null = null;
      
      for (const ponto of novospontos) {
        if (ponto.montar) {
          estadoMontado = true;
        } else if (ponto.apear) {
          estadoMontado = false;
          ultimoEstriboCaptado = null;
        }
        // Capturar o último tipo de estribo usado
        if (ponto.tipoEstribo) {
          ultimoEstriboCaptado = ponto.tipoEstribo;
        }
      }
      
      setMontouAtualmente(estadoMontado);
      setUltimoTipoEstribo(ultimoEstriboCaptado);
      
      // Atualizar o último tipo de comando baseado no último ponto
      const ultimoPonto = novospontos[novospontos.length - 1];
      if (ultimoPonto.apear || ultimoPonto.montar) {
        setUltimoTipoComando('parado');
      } else if (ultimoPonto.percurso) {
        const tipoPercurso = ultimoPonto.percurso.split(';')[0].trim();
        setUltimoTipoComando(tipoPercurso);
      }
    } else {
      // Se não há mais pontos, resetar para o estado inicial
      setMontouAtualmente(false);
      setUltimoTipoComando('parado');
      setUltimoTipoEstribo(null);
    }
  };
  
  // Função para iniciar edição do Plano Terapêutico
  const handleEditarPlano = (index: number) => {
    const ponto = pontosMarcados[index];
    setEditandoPlanoIndex(index);
    setPlanoEditando({
      nome: ponto.planoTerapeutico || '',
      atividade: ponto.planoAtividade || '',
      nota: ponto.planoNota || '',
      observacoes: ponto.planoObservacoes || ''
    });
  };
  
  // Função para salvar edição do Plano Terapêutico
  const handleSalvarEdicaoPlano = () => {
    if (editandoPlanoIndex === null) return;
    
    // Validar campos obrigatórios
    const algumCampoPreenchido = planoEditando.nome.trim() !== '' || 
                                  planoEditando.atividade.trim() !== '' || 
                                  planoEditando.nota.trim() !== '';
    
    if (algumCampoPreenchido) {
      if (planoEditando.nome.trim() === '' || planoEditando.atividade.trim() === '' || planoEditando.nota.trim() === '') {
        alert('Os campos Nome, Atividade e Nota são obrigatórios.');
        return;
      }
    }
    
    setPontosMarcados(prev => prev.map((ponto, index) => 
      index === editandoPlanoIndex 
        ? {
            ...ponto,
            planoTerapeutico: planoEditando.nome,
            planoAtividade: planoEditando.atividade,
            planoNota: planoEditando.nota,
            planoObservacoes: planoEditando.observacoes
          }
        : ponto
    ));
    
    setEditandoPlanoIndex(null);
    setPlanoEditando({ nome: '', atividade: '', nota: '', observacoes: '' });
  };
  
  // Função para cancelar edição do Plano Terapêutico
  const handleCancelarEdicaoPlano = () => {
    setEditandoPlanoIndex(null);
    setPlanoEditando({ nome: '', atividade: '', nota: '', observacoes: '' });
  };
  
  // Função auxiliar para verificar se uma célula deve ser marcada
  const isCelulaMarcada = (tipoPercurso: string, minuto: number): boolean => {
    return pontosMarcados.some(ponto => 
      ponto.tipoPercurso === tipoPercurso && ponto.minuto === minuto
    );
  };
  
  // Função para obter o ponto marcado em uma célula específica
  const obterPontoMarcado = (tipoPercurso: string, minuto: number): PontoMarcado | undefined => {
    return pontosMarcados.find(ponto => 
      ponto.tipoPercurso === tipoPercurso && ponto.minuto === minuto
    );
  };
  
  // Função para obter as coordenadas de um ponto no gráfico
  const obterIndicePorTipo = (tipo: string): number => {
    const tipos = ['galope', 'trote', 'transpista', 'sobrepista', 'antepista', 'parado', 'deambular', 'correr'];
    return tipos.indexOf(tipo);
  };

  const handleAbrirModalEncerrar = () => {
    setModalEncerrarAberta(true);
  };

  const handleFecharModalEncerrar = () => {
    setModalEncerrarAberta(false);
    setMotivoEncerramento('');
    setDetalheEncerramento('');
  };

  const handleConfirmarEncerrar = () => {
    if (!motivoEncerramento.trim()) {
      alert('Por favor, selecione um motivo para o encerramento.');
      return;
    }
    console.log('Atendimento encerrado:', {
      evento,
      motivo: motivoEncerramento,
      detalhe: detalheEncerramento
    });
    handleFecharModalEncerrar();
    onVoltar();
  };

  // Carregar lista de objetivos do localStorage
  useEffect(() => {
    const savedObjetivos = localStorage.getItem(`objetivos_${evento.id}`);
    const savedSelecionados = localStorage.getItem(`objetivos_selecionados_${evento.id}`);
    if (savedObjetivos) {
      setListaObjetivos(JSON.parse(savedObjetivos));
    }
    if (savedSelecionados) {
      setObjetivosSelecionados(JSON.parse(savedSelecionados));
    }
  }, [evento.id]);

  // Salvar lista de objetivos no localStorage
  useEffect(() => {
    localStorage.setItem(`objetivos_${evento.id}`, JSON.stringify(listaObjetivos));
  }, [listaObjetivos, evento.id]);

  // Salvar objetivos selecionados no localStorage
  useEffect(() => {
    localStorage.setItem(`objetivos_selecionados_${evento.id}`, JSON.stringify(objetivosSelecionados));
  }, [objetivosSelecionados, evento.id]);

  // Sincronizar campo preRequisito com objetivos selecionados
  useEffect(() => {
    const textoObjetivos = objetivosSelecionados
      .map(index => listaObjetivos[index])
      .filter(Boolean)
      .join(', ');
    setPreRequisito(textoObjetivos);
  }, [objetivosSelecionados, listaObjetivos]);

  const handleAdicionarObjetivo = () => {
    if (novoObjetivo.trim()) {
      setListaObjetivos([...listaObjetivos, novoObjetivo.trim()]);
      setNovoObjetivo('');
    }
  };

  const handleRemoverObjetivo = (index: number) => {
    setListaObjetivos(listaObjetivos.filter((_, i) => i !== index));
    // Remover também dos selecionados e ajustar os índices
    setObjetivosSelecionados(prev =>
      prev
        .filter(i => i !== index)
        .map(i => i > index ? i - 1 : i)
    );
  };

  const handleToggleObjetivoNoAtendimento = (index: number) => {
    setObjetivosSelecionados(prev => {
      if (prev.includes(index)) {
        return prev.filter(i => i !== index);
      } else {
        return [...prev, index].sort((a, b) => a - b);
      }
    });
  };

  const handleSalvar = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Atendimento salvo:', { evento, quadroClinico });
    onVoltar();
  };

  return (
    <div className="w-full h-screen bg-gray-50 overflow-auto">
      {/* Content */}
      <div className="p-3 md:p-6 max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 md:p-6">
          <form 
            onSubmit={handleSalvar} 
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
              }
            }}
            className="space-y-4 md:space-y-6"
          >
            {/* Header do Formulário */}
            <div className="border-b border-gray-200 pb-4">
              <h1 className="text-xl md:text-2xl text-gray-900">
                Atendimento
              </h1>
              <p className="text-sm md:text-base text-gray-600 mt-1">
                {evento.praticante} - {evento.horario}
              </p>
            </div>

            {/* Equipe */}
            <div>
              <h2 className="text-base md:text-lg font-medium text-gray-900 mb-4">
                Equipe
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                <div>
                  <label className="block text-gray-700 mb-2 text-sm md:text-base">
                    Mediador
                  </label>
                  <input
                    type="text"
                    value={evento.mediador || ''}
                    className="w-full px-3 md:px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-sm md:text-base"
                    readOnly
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2 text-sm md:text-base">
                    Lateral
                  </label>
                  <input
                    type="text"
                    value={evento.lateral || ''}
                    className="w-full px-3 md:px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-sm md:text-base"
                    readOnly
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2 text-sm md:text-base">
                    Guia
                  </label>
                  <input
                    type="text"
                    value={evento.guia || ''}
                    className="w-full px-3 md:px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-sm md:text-base"
                    readOnly
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2 text-sm md:text-base">
                    Equino
                  </label>
                  <input
                    type="text"
                    value={evento.equino || ''}
                    className="w-full px-3 md:px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-sm md:text-base"
                    readOnly
                  />
                </div>
              </div>
            </div>

            {/* Dados do Equino */}
            {evento.equino && equinoDados && (
              <div>
                <h2 className="text-base md:text-lg font-medium text-gray-900 mb-4">
                  Dados do Equino
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                  <div>
                    <label className="block text-gray-700 mb-2 text-sm md:text-base">
                      Nome
                    </label>
                    <input
                      type="text"
                      value={evento.equino}
                      className="w-full px-3 md:px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-sm md:text-base"
                      readOnly
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2 text-sm md:text-base">
                      Peso (kg)
                    </label>
                    <input
                      type="text"
                      value={equinoDados.peso}
                      className="w-full px-3 md:px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-sm md:text-base"
                      readOnly
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2 text-sm md:text-base">
                      Comprimento de Pescoço
                    </label>
                    <input
                      type="text"
                      value={equinoDados.comprimentoPescoco}
                      className="w-full px-3 md:px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-sm md:text-base"
                      readOnly
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2 text-sm md:text-base">
                      Largura de Tronco
                    </label>
                    <input
                      type="text"
                      value={equinoDados.larguraTronco}
                      className="w-full px-3 md:px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-sm md:text-base"
                      readOnly
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2 text-sm md:text-base">
                      Altura Cernelha
                    </label>
                    <input
                      type="text"
                      value={equinoDados.alturaCernelha}
                      className="w-full px-3 md:px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-sm md:text-base"
                      readOnly
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2 text-sm md:text-base">
                      Altura Anca
                    </label>
                    <input
                      type="text"
                      value={equinoDados.alturaAnca}
                      className="w-full px-3 md:px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-sm md:text-base"
                      readOnly
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2 text-sm md:text-base">
                      Comprimento
                    </label>
                    <input
                      type="text"
                      value={equinoDados.comprimento}
                      className="w-full px-3 md:px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-sm md:text-base"
                      readOnly
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2 text-sm md:text-base">
                      Ferradura
                    </label>
                    <input
                      type="text"
                      value={equinoDados.ferradura}
                      className="w-full px-3 md:px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-sm md:text-base"
                      readOnly
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Dados do Praticante */}
            {evento.praticante && praticanteDados && (
              <div>
                <h2 className="text-base md:text-lg font-medium text-gray-900 mb-4">
                  Dados do Praticante
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                  <div>
                    <label className="block text-gray-700 mb-2 text-sm md:text-base">
                      Nome
                    </label>
                    <input
                      type="text"
                      value={evento.praticante}
                      className="w-full px-3 md:px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-sm md:text-base"
                      readOnly
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2 text-sm md:text-base">
                      Ano de Nascimento
                    </label>
                    <input
                      type="text"
                      value={praticanteDados.anoNascimento}
                      className="w-full px-3 md:px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-sm md:text-base"
                      readOnly
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2 text-sm md:text-base">
                      Idade
                    </label>
                    <input
                      type="text"
                      value={`${calcularIdade(praticanteDados.anoNascimento)} anos`}
                      className="w-full px-3 md:px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-sm md:text-base"
                      readOnly
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2 text-sm md:text-base">
                      CID
                    </label>
                    <input
                      type="text"
                      value={praticanteDados.cid}
                      className="w-full px-3 md:px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-sm md:text-base"
                      readOnly
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-gray-700 mb-2 text-sm md:text-base">
                      Quadro Clinicamente Relevante
                    </label>
                    <input
                      type="text"
                      value={quadroClinico}
                      onChange={(e) => setQuadroClinico(e.target.value)}
                      className="w-full px-3 md:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm md:text-base"
                      placeholder="Digite o quadro clinicamente relevante..."
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-gray-700 mb-2 text-sm md:text-base">
                      Objetivo Clinicamente Relevantes
                    </label>
                    <input
                      type="text"
                      value={preRequisito}
                      className="w-full px-3 md:px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-sm md:text-base"
                      placeholder="Selecione objetivos da lista abaixo para adicionar ao atendimento..."
                      readOnly
                    />
                  </div>

                  {/* Lista de Objetivos */}
                  <div className="sm:col-span-2">
                    <label className="block text-gray-700 mb-2 text-sm md:text-base font-medium">
                      Lista de Objetivos
                    </label>
                    <div className="flex gap-2 mb-3">
                      <input
                        type="text"
                        value={novoObjetivo}
                        onChange={(e) => setNovoObjetivo(e.target.value)}
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            handleAdicionarObjetivo();
                          }
                        }}
                        className="flex-1 px-3 md:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm md:text-base"
                        placeholder="Digite um objetivo e pressione Enter ou clique em Adicionar"
                      />
                      <button
                        type="button"
                        onClick={handleAdicionarObjetivo}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm md:text-base whitespace-nowrap"
                      >
                        Adicionar
                      </button>
                    </div>
                    {listaObjetivos.length > 0 && (
                      <div className="space-y-2">
                        {listaObjetivos.map((objetivo, index) => (
                          <div
                            key={index}
                            className={`flex items-center justify-between border rounded-lg px-3 md:px-4 py-2 transition-colors ${
                              objetivosSelecionados.includes(index)
                                ? 'bg-blue-50 border-blue-300'
                                : 'bg-gray-50 border-gray-200'
                            }`}
                          >
                            <span className="text-sm md:text-base text-gray-700 flex-1">
                              {index + 1}. {objetivo}
                            </span>
                            <div className="flex gap-2 ml-3">
                              <button
                                type="button"
                                onClick={() => handleToggleObjetivoNoAtendimento(index)}
                                className={`px-3 py-1 rounded transition-colors text-sm md:text-base whitespace-nowrap ${
                                  objetivosSelecionados.includes(index)
                                    ? 'bg-red-100 text-red-700 hover:bg-red-200'
                                    : 'bg-blue-600 text-white hover:bg-blue-700'
                                }`}
                              >
                                {objetivosSelecionados.includes(index) ? 'Remover do atendimento' : 'Adicionar ao atendimento'}
                              </button>
                              <button
                                type="button"
                                onClick={() => handleRemoverObjetivo(index)}
                                className="text-red-600 hover:text-red-800 transition-colors text-sm md:text-base"
                              >
                                Excluir
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                    {listaObjetivos.length === 0 && (
                      <p className="text-gray-500 text-sm italic">
                        Nenhum objetivo adicionado ainda.
                      </p>
                    )}
                  </div>

                  {/* Perfil do Programa */}
                  <div className="sm:col-span-2 mt-4">
                    <h3 className="text-base md:text-lg font-medium text-gray-900 mb-3">
                      Perfil do Programa
                    </h3>
                    <div>
                      <label className="block text-gray-700 mb-2 text-sm md:text-base">
                        Programa do Praticante
                      </label>
                      <select
                        value={perfilPrograma}
                        onChange={(e) => setPerfilPrograma(e.target.value)}
                        className="w-full px-3 md:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm md:text-base"
                      >
                        <option value="">Selecione...</option>
                        <option value="Hipoterapia">Hipoterapia</option>
                        <option value="Educação/Reeducação">Educação/Reeducação</option>
                        <option value="Pré-esportivo">Pré-esportivo</option>
                        <option value="Prática Esportiva Paraequestre">Prática Esportiva Paraequestre</option>
                      </select>
                    </div>
                  </div>
                  
                  {/* Subtítulo Exame de Entrada */}
                  <div className="sm:col-span-2 mt-4">
                    <h3 className="text-base md:text-lg font-medium text-gray-900 mb-3">
                      Exame de Entrada
                    </h3>
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 mb-2 text-sm md:text-base">
                      Batimento Cardíaco
                    </label>
                    <input
                      type="text"
                      value={batimentoCardiaco}
                      onChange={(e) => setBatimentoCardiaco(e.target.value)}
                      className="w-full px-3 md:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm md:text-base"
                      placeholder="Ex: 80 bpm"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2 text-sm md:text-base">
                      Oxigênio
                    </label>
                    <input
                      type="text"
                      value={oxigenio}
                      onChange={(e) => setOxigenio(e.target.value)}
                      className="w-full px-3 md:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm md:text-base"
                      placeholder="Ex: 95%"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2 text-sm md:text-base">
                      Pressão
                    </label>
                    <input
                      type="text"
                      value={pressao}
                      onChange={(e) => setPressao(e.target.value)}
                      className="w-full px-3 md:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm md:text-base"
                      placeholder="Ex: 120/80 mmHg"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2 text-sm md:text-base">
                      Temperatura
                    </label>
                    <input
                      type="text"
                      value={temperatura}
                      onChange={(e) => setTemperatura(e.target.value)}
                      className="w-full px-3 md:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm md:text-base"
                      placeholder="Ex: 36.5°C"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2 text-sm md:text-base">
                      Respiração
                    </label>
                    <input
                      type="text"
                      value={respiracao}
                      onChange={(e) => setRespiracao(e.target.value)}
                      className="w-full px-3 md:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm md:text-base"
                      placeholder="Ex: 16 irpm"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-gray-700 mb-2 text-sm md:text-base">
                      Observação
                    </label>
                    <textarea
                      value={observacaoEntrada}
                      onChange={(e) => setObservacaoEntrada(e.target.value)}
                      rows={2}
                      className="w-full px-3 md:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm md:text-base resize-none"
                      placeholder="Observações do exame de entrada..."
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Evolução Topográfica de Legendas */}
            <div>
              <h2 className="text-base md:text-lg font-medium text-gray-900 mb-4">
                Evolução Topográfica de Legendas
              </h2>
              <div className="space-y-4">
                {/* Cronômetro */}
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <div className="flex flex-col sm:flex-row items-center gap-4">
                    <div className="text-3xl md:text-4xl font-mono font-bold text-gray-900">
                      {formatarCronometro()}
                    </div>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={iniciarCronometro}
                        disabled={cronometroAtivo}
                        className={`px-4 py-2 rounded-lg transition-colors text-sm md:text-base ${
                          cronometroAtivo
                            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            : 'bg-green-500 text-white hover:bg-green-600'
                        }`}
                      >
                        Iniciar
                      </button>
                      <button
                        type="button"
                        onClick={pausarCronometro}
                        disabled={!cronometroAtivo}
                        className={`px-4 py-2 rounded-lg transition-colors text-sm md:text-base ${
                          !cronometroAtivo
                            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            : 'bg-yellow-500 text-white hover:bg-yellow-600'
                        }`}
                      >
                        Pausar
                      </button>
                      <button
                        type="button"
                        onClick={zerarCronometro}
                        className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm md:text-base"
                      >
                        Zerar
                      </button>
                    </div>
                  </div>
                </div>

                {/* Campos de Tempo e Montar */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                  <div>
                    <label className="block text-gray-700 mb-2 text-sm md:text-base">
                      Tempo
                    </label>
                    <input
                      type="text"
                      value={tempoEditavel}
                      onChange={(e) => setTempoEditavel(e.target.value)}
                      className="w-full px-3 md:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm md:text-base"
                      placeholder="0:00"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2 text-sm md:text-base">
                      Montar
                    </label>
                    <select
                      value={montar}
                      onChange={(e) => setMontar(e.target.value)}
                      className="w-full px-3 md:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm md:text-base"
                    >
                      <option value="">Selecione...</option>
                      <option value="controlado; manta; colocado">controlado; manta; colocado</option>
                      <option value="controlado; manta; auxilio rampa">controlado; manta; auxilio rampa</option>
                      <option value="controlado; manta; rampa">controlado; manta; rampa</option>
                      <option value="controlado; manta; com auxilio">controlado; manta; com auxilio</option>
                      <option value="controlado; manta; sem auxilio">controlado; manta; sem auxilio</option>
                      <option value="controlado; sela; colocado">controlado; sela; colocado</option>
                      <option value="controlado; sela; auxilio rampa">controlado; sela; auxilio rampa</option>
                      <option value="controlado; sela; rampa">controlado; sela; rampa</option>
                      <option value="controlado; sela; com auxilio">controlado; sela; com auxilio</option>
                      <option value="controlado; sela; sem auxilio">controlado; sela; sem auxilio</option>
                      <option value="controlado; sem encilhamento; colocado">controlado; sem encilhamento; colocado</option>
                      <option value="controlado; sem encilhamento; auxilio rampa">controlado; sem encilhamento; auxilio rampa</option>
                      <option value="controlado; sem encilhamento; rampa">controlado; sem encilhamento; rampa</option>
                      <option value="controlado; sem encilhamento; com auxilio">controlado; sem encilhamento; com auxilio</option>
                      <option value="controlado; sem encilhamento; sem auxilio">controlado; sem encilhamento; sem auxilio</option>
                      <option value="guiado; manta; colocado">guiado; manta; colocado</option>
                      <option value="guiado; manta; auxilio rampa">guiado; manta; auxilio rampa</option>
                      <option value="guiado; manta; rampa">guiado; manta; rampa</option>
                      <option value="guiado; manta; com auxilio">guiado; manta; com auxilio</option>
                      <option value="guiado; manta; sem auxilio">guiado; manta; sem auxilio</option>
                      <option value="guiado; sela; colocado">guiado; sela; colocado</option>
                      <option value="guiado; sela; auxilio rampa">guiado; sela; auxilio rampa</option>
                      <option value="guiado; sela; rampa">guiado; sela; rampa</option>
                      <option value="guiado; sela; com auxilio">guiado; sela; com auxilio</option>
                      <option value="guiado; sela; sem auxilio">guiado; sela; sem auxilio</option>
                      <option value="guiado; sem encilhamento; colocado">guiado; sem encilhamento; colocado</option>
                      <option value="guiado; sem encilhamento; auxilio rampa">guiado; sem encilhamento; auxilio rampa</option>
                      <option value="guiado; sem encilhamento; rampa">guiado; sem encilhamento; rampa</option>
                      <option value="guiado; sem encilhamento; com auxilio">guiado; sem encilhamento; com auxilio</option>
                      <option value="guiado; sem encilhamento; sem auxilio">guiado; sem encilhamento; sem auxilio</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2 text-sm md:text-base">
                      Percurso
                    </label>
                    <select
                      value={percurso}
                      onChange={(e) => setPercurso(e.target.value)}
                      className="w-full px-3 md:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm md:text-base"
                    >
                      <option value="">Selecione...</option>
                      <option value="deambular; asfalto">deambular; asfalto</option>
                      <option value="deambular; areia">deambular; areia</option>
                      <option value="correr; asfalto">correr; asfalto</option>
                      <option value="correr; areia">correr; areia</option>
                      <option value="parado">parado</option>
                      <option value="parado; asfalto; pé fora do estribo">parado; asfalto; pé fora do estribo</option>
                      <option value="parado; asfalto; pé no estribo">parado; asfalto; pé no estribo</option>
                      <option value="parado; asfalto; pé no estribo gaiola">parado; asfalto; pé no estribo gaiola</option>
                      <option value="parado; areia; pé fora do estribo">parado; areia; pé fora do estribo</option>
                      <option value="parado; areia; pé no estribo">parado; areia; pé no estribo</option>
                      <option value="parado; areia; pé no estribo gaiola">parado; areia; pé no estribo gaiola</option>
                      <option value="antepista; asfalto; pé fora do estribo" disabled={!montouAtualmente}>antepista; asfalto; pé fora do estribo</option>
                      <option value="antepista; asfalto; pé no estribo" disabled={!montouAtualmente}>antepista; asfalto; pé no estribo</option>
                      <option value="antepista; asfalto; pé no estribo gaiola" disabled={!montouAtualmente}>antepista; asfalto; pé no estribo gaiola</option>
                      <option value="antepista; areia; pé fora do estribo" disabled={!montouAtualmente}>antepista; areia; pé fora do estribo</option>
                      <option value="antepista; areia; pé no estribo" disabled={!montouAtualmente}>antepista; areia; pé no estribo</option>
                      <option value="antepista; areia; pé no estribo gaiola" disabled={!montouAtualmente}>antepista; areia; pé no estribo gaiola</option>
                      <option value="sobrepista; asfalto; pé fora do estribo" disabled={!montouAtualmente}>sobrepista; asfalto; pé fora do estribo</option>
                      <option value="sobrepista; asfalto; pé no estribo" disabled={!montouAtualmente}>sobrepista; asfalto; pé no estribo</option>
                      <option value="sobrepista; asfalto; pé no estribo gaiola" disabled={!montouAtualmente}>sobrepista; asfalto; pé no estribo gaiola</option>
                      <option value="sobrepista; areia; pé fora do estribo" disabled={!montouAtualmente}>sobrepista; areia; pé fora do estribo</option>
                      <option value="sobrepista; areia; pé no estribo" disabled={!montouAtualmente}>sobrepista; areia; pé no estribo</option>
                      <option value="sobrepista; areia; pé no estribo gaiola" disabled={!montouAtualmente}>sobrepista; areia; pé no estribo gaiola</option>
                      <option value="transpista; asfalto; pé fora do estribo" disabled={!montouAtualmente}>transpista; asfalto; pé fora do estribo</option>
                      <option value="transpista; asfalto; pé no estribo" disabled={!montouAtualmente}>transpista; asfalto; pé no estribo</option>
                      <option value="transpista; asfalto; pé no estribo gaiola" disabled={!montouAtualmente}>transpista; asfalto; pé no estribo gaiola</option>
                      <option value="transpista; areia; pé fora do estribo" disabled={!montouAtualmente}>transpista; areia; pé fora do estribo</option>
                      <option value="transpista; areia; pé no estribo" disabled={!montouAtualmente}>transpista; areia; pé no estribo</option>
                      <option value="transpista; areia; pé no estribo gaiola" disabled={!montouAtualmente}>transpista; areia; pé no estribo gaiola</option>
                      <option value="trote; asfalto; pé fora do estribo" disabled={!montouAtualmente}>trote; asfalto; pé fora do estribo</option>
                      <option value="trote; asfalto; pé no estribo" disabled={!montouAtualmente}>trote; asfalto; pé no estribo</option>
                      <option value="trote; asfalto; pé no estribo gaiola" disabled={!montouAtualmente}>trote; asfalto; pé no estribo gaiola</option>
                      <option value="trote; areia; pé fora do estribo" disabled={!montouAtualmente}>trote; areia; pé fora do estribo</option>
                      <option value="trote; areia; pé no estribo" disabled={!montouAtualmente}>trote; areia; pé no estribo</option>
                      <option value="trote; areia; pé no estribo gaiola" disabled={!montouAtualmente}>trote; areia; pé no estribo gaiola</option>
                      <option value="galope; asfalto; pé fora do estribo" disabled={!montouAtualmente}>galope; asfalto; p fora do estribo</option>
                      <option value="galope; asfalto; pé no estribo" disabled={!montouAtualmente}>galope; asfalto; pé no estribo</option>
                      <option value="galope; asfalto; pé no estribo gaiola" disabled={!montouAtualmente}>galope; asfalto; pé no estribo gaiola</option>
                      <option value="galope; areia; pé fora do estribo" disabled={!montouAtualmente}>galope; areia; pé fora do estribo</option>
                      <option value="galope; areia; pé no estribo" disabled={!montouAtualmente}>galope; areia; pé no estribo</option>
                      <option value="galope; areia; pé no estribo gaiola" disabled={!montouAtualmente}>galope; areia; pé no estribo gaiola</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2 text-sm md:text-base">
                      Apear
                    </label>
                    <select
                      value={apear}
                      onChange={(e) => setApear(e.target.value)}
                      disabled={!montouAtualmente}
                      className={`w-full px-3 md:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm md:text-base ${
                        !montouAtualmente ? 'bg-gray-100 cursor-not-allowed' : ''
                      }`}
                    >
                      <option value="">Selecione...</option>
                      <option value="tirado">tirado</option>
                      <option value="auxilio rampa">auxilio rampa</option>
                      <option value="rampa">rampa</option>
                      <option value="com auxilio">com auxilio</option>
                      <option value="sem auxilio">sem auxilio</option>
                    </select>
                  </div>
                </div>

                {/* Campo Plano Terapêutico */}
                <div className="mt-4">
                  <h3 className="text-base md:text-lg font-medium text-gray-900 mb-3">
                    Plano Terapêutico Aberto
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Nome */}
                    <div>
                      <label className="block text-gray-700 mb-2 text-sm md:text-base">
                        Nome
                      </label>
                      <input
                        type="text"
                        value={planoTerapeutico}
                        onChange={(e) => setPlanoTerapeutico(e.target.value)}
                        className="w-full px-3 md:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm md:text-base"
                        placeholder="Ex: alongamento"
                      />
                    </div>

                    {/* Atividade */}
                    <div>
                      <label className="block text-gray-700 mb-2 text-sm md:text-base">
                        Atividade
                      </label>
                      <input
                        type="text"
                        value={planoAtividade}
                        onChange={(e) => setPlanoAtividade(e.target.value)}
                        className="w-full px-3 md:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm md:text-base"
                        placeholder="Digite a atividade..."
                      />
                    </div>

                    {/* Nota */}
                    <div>
                      <label className="block text-gray-700 mb-2 text-sm md:text-base">
                        Nota(Criterio/Suporte)
                      </label>
                      <select
                        value={planoNota}
                        onChange={(e) => setPlanoNota(e.target.value)}
                        className="w-full px-3 md:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm md:text-base"
                      >
                        <option value="">Selecione...</option>
                        <option value="00 - Não fez, sem ajuda">00 - Não fez, sem ajuda</option>
                        <option value="01 - Não fez, dicas e correções">01 - Não fez, dicas e correções</option>
                        <option value="02 - Não fez, com apoio fisico">02 - Não fez, com apoio fisico</option>
                        <option value="10 - Fez parcialmente, sem ajuda">10 - Fez parcialmente, sem ajuda</option>
                        <option value="11 - Fez parcialmente, dicas e correções">11 - Fez parcialmente, dicas e correções</option>
                        <option value="12 - Fez parcialmente, com apoio fisico">12 - Fez parcialmente, com apoio fisico</option>
                        <option value="20 - Fez, sem ajuda">20 - Fez, sem ajuda</option>
                        <option value="21 - Fez, dicas e correções">21 - Fez, dicas e correções</option>
                        <option value="22 - Fez, com apoio fisico">22 - Fez, com apoio fisico</option>
                      </select>
                    </div>

                    {/* Observações */}
                    <div className="md:col-span-2">
                      <label className="block text-gray-700 mb-2 text-sm md:text-base">
                        Observações
                      </label>
                      <textarea
                        value={planoObservacoes}
                        onChange={(e) => setPlanoObservacoes(e.target.value)}
                        className="w-full px-3 md:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm md:text-base"
                        placeholder="Digite ..."
                        rows={3}
                      />
                    </div>
                  </div>

                  {/* Botão Gerar */}
                  <div className="mt-4 flex justify-end">
                    <button
                      type="button"
                      onClick={handleGerarPlanoTerapeutico}
                      className="px-6 md:px-8 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors text-sm md:text-base"
                    >
                      Gerar
                    </button>
                  </div>
                </div>

                {/* Tabela de Tempo */}
                <div className="mt-4">
                  <div className="overflow-x-auto relative">
                    <table ref={tabelaRef} className="min-w-full border border-gray-300 relative">
                      <tbody>
                        <tr>
                          <td className="border border-gray-300 px-2 py-1 text-xs text-gray-700 font-medium bg-gray-50 w-20">
                            galope
                          </td>
                          {Array.from({ length: 61 }, (_, i) => {
                            const ponto = obterPontoMarcado('galope', i);
                            const isMarcada = ponto !== undefined;
                            const temPlanoTerapeutico = ponto?.planoTerapeutico && ponto.planoTerapeutico.trim() !== '';
                            const planoAbreviado = temPlanoTerapeutico ? abreviarPorSilabas(ponto.planoTerapeutico || '') : '';
                            const numeroNota = temPlanoTerapeutico && ponto?.planoNota ? extrairNumeroNota(ponto.planoNota) : '';

                            return (
                              <td
                                key={i}
                                className="px-1 py-1 text-center w-4 relative"
                              >
                                {isMarcada && (
                                  temPlanoTerapeutico ? (
                                    <div className="flex flex-col items-center leading-none relative" style={{ zIndex: 20 }}>
                                      <span className="text-[10px] text-green-600 font-semibold">{planoAbreviado}</span>
                                      <span className="text-[10px] text-green-600 font-bold">{numeroNota}</span>
                                    </div>
                                  ) : (
                                    <div className="w-0.5 h-0.5 bg-indigo-600 rounded-full mx-auto relative" style={{ width: '3px', height: '3px', zIndex: 20 }}></div>
                                  )
                                )}
                              </td>
                            );
                          })}
                        </tr>
                        <tr>
                          <td className="border border-gray-300 px-2 py-1 text-xs text-gray-700 font-medium bg-gray-50 w-20">
                            trote
                          </td>
                          {Array.from({ length: 61 }, (_, i) => {
                            const ponto = obterPontoMarcado('trote', i);
                            const isMarcada = ponto !== undefined;
                            const temPlanoTerapeutico = ponto?.planoTerapeutico && ponto.planoTerapeutico.trim() !== '';
                            const planoAbreviado = temPlanoTerapeutico ? abreviarPorSilabas(ponto.planoTerapeutico || '') : '';
                            const numeroNota = temPlanoTerapeutico && ponto?.planoNota ? extrairNumeroNota(ponto.planoNota) : '';

                            return (
                              <td
                                key={i}
                                className="px-1 py-1 text-center w-4 relative"
                              >
                                {isMarcada && (
                                  temPlanoTerapeutico ? (
                                    <div className="flex flex-col items-center leading-none relative" style={{ zIndex: 20 }}>
                                      <span className="text-[10px] text-green-600 font-semibold">{planoAbreviado}</span>
                                      <span className="text-[10px] text-green-600 font-bold">{numeroNota}</span>
                                    </div>
                                  ) : (
                                    <div className="w-0.5 h-0.5 bg-indigo-600 rounded-full mx-auto relative" style={{ width: '3px', height: '3px', zIndex: 20 }}></div>
                                  )
                                )}
                              </td>
                            );
                          })}
                        </tr>
                        <tr>
                          <td className="border border-gray-300 px-2 py-1 text-xs text-gray-700 font-medium bg-gray-50 w-20">
                            transpista
                          </td>
                          {Array.from({ length: 61 }, (_, i) => {
                            const ponto = obterPontoMarcado('transpista', i);
                            const isMarcada = ponto !== undefined;
                            const temPlanoTerapeutico = ponto?.planoTerapeutico && ponto.planoTerapeutico.trim() !== '';
                            const planoAbreviado = temPlanoTerapeutico ? abreviarPorSilabas(ponto.planoTerapeutico || '') : '';
                            const numeroNota = temPlanoTerapeutico && ponto?.planoNota ? extrairNumeroNota(ponto.planoNota) : '';

                            return (
                              <td
                                key={i}
                                className="px-1 py-1 text-center w-4 relative"
                              >
                                {isMarcada && (
                                  temPlanoTerapeutico ? (
                                    <div className="flex flex-col items-center leading-none relative" style={{ zIndex: 20 }}>
                                      <span className="text-[10px] text-green-600 font-semibold">{planoAbreviado}</span>
                                      <span className="text-[10px] text-green-600 font-bold">{numeroNota}</span>
                                    </div>
                                  ) : (
                                    <div className="w-0.5 h-0.5 bg-indigo-600 rounded-full mx-auto relative" style={{ width: '3px', height: '3px', zIndex: 20 }}></div>
                                  )
                                )}
                              </td>
                            );
                          })}
                        </tr>
                        <tr>
                          <td className="border border-gray-300 px-2 py-1 text-xs text-gray-700 font-medium bg-gray-50 w-20">
                            sobrepista
                          </td>
                          {Array.from({ length: 61 }, (_, i) => {
                            const ponto = obterPontoMarcado('sobrepista', i);
                            const isMarcada = ponto !== undefined;
                            const temPlanoTerapeutico = ponto?.planoTerapeutico && ponto.planoTerapeutico.trim() !== '';
                            const planoAbreviado = temPlanoTerapeutico ? abreviarPorSilabas(ponto.planoTerapeutico || '') : '';
                            const numeroNota = temPlanoTerapeutico && ponto?.planoNota ? extrairNumeroNota(ponto.planoNota) : '';

                            return (
                              <td
                                key={i}
                                className="px-1 py-1 text-center w-4 relative"
                              >
                                {isMarcada && (
                                  temPlanoTerapeutico ? (
                                    <div className="flex flex-col items-center leading-none relative" style={{ zIndex: 20 }}>
                                      <span className="text-[10px] text-green-600 font-semibold">{planoAbreviado}</span>
                                      <span className="text-[10px] text-green-600 font-bold">{numeroNota}</span>
                                    </div>
                                  ) : (
                                    <div className="w-0.5 h-0.5 bg-indigo-600 rounded-full mx-auto relative" style={{ width: '3px', height: '3px', zIndex: 20 }}></div>
                                  )
                                )}
                              </td>
                            );
                          })}
                        </tr>
                        <tr>
                          <td className="border border-gray-300 px-2 py-1 text-xs text-gray-700 font-medium bg-gray-50 w-20">
                            antepista
                          </td>
                          {Array.from({ length: 61 }, (_, i) => {
                            const ponto = obterPontoMarcado('antepista', i);
                            const isMarcada = ponto !== undefined;
                            const temPlanoTerapeutico = ponto?.planoTerapeutico && ponto.planoTerapeutico.trim() !== '';
                            const planoAbreviado = temPlanoTerapeutico ? abreviarPorSilabas(ponto.planoTerapeutico || '') : '';
                            const numeroNota = temPlanoTerapeutico && ponto?.planoNota ? extrairNumeroNota(ponto.planoNota) : '';

                            return (
                              <td
                                key={i}
                                className="px-1 py-1 text-center w-4 relative"
                              >
                                {isMarcada && (
                                  temPlanoTerapeutico ? (
                                    <div className="flex flex-col items-center leading-none relative" style={{ zIndex: 20 }}>
                                      <span className="text-[10px] text-green-600 font-semibold">{planoAbreviado}</span>
                                      <span className="text-[10px] text-green-600 font-bold">{numeroNota}</span>
                                    </div>
                                  ) : (
                                    <div className="w-0.5 h-0.5 bg-indigo-600 rounded-full mx-auto relative" style={{ width: '3px', height: '3px', zIndex: 20 }}></div>
                                  )
                                )}
                              </td>
                            );
                          })}
                        </tr>
                        <tr className="bg-yellow-50">
                          <td className="border border-gray-300 px-2 py-1 text-xs text-gray-700 font-medium bg-yellow-100 w-20">
                            parado
                          </td>
                          {Array.from({ length: 61 }, (_, i) => {
                            const ponto = obterPontoMarcado('parado', i);
                            const isMarcada = ponto !== undefined;
                            const temMontar = ponto?.montar;
                            const temApear = ponto?.apear;
                            const temPlanoTerapeutico = ponto?.planoTerapeutico && ponto.planoTerapeutico.trim() !== '';
                            const planoAbreviado = temPlanoTerapeutico ? abreviarPorSilabas(ponto.planoTerapeutico || '') : '';
                            const numeroNota = temPlanoTerapeutico && ponto?.planoNota ? extrairNumeroNota(ponto.planoNota) : '';

                            // Determinar classe de borda baseada em sela/manta (sem encilhamento não tem borda)
                            let borderClass = '';
                            if (temMontar && ponto.selaOuManta === 'sela') {
                              borderClass = 'border-2 border-solid border-indigo-600';
                            } else if (temMontar && ponto.selaOuManta === 'manta') {
                              borderClass = 'border-2 border-dashed border-indigo-600';
                            }
                            // sem encilhamento: sem borda (não adiciona classe)
                            
                            return (
                              <td
                                key={i}
                                className={`px-1 py-1 text-center w-4 relative bg-yellow-50 ${borderClass}`}
                              >
                                {isMarcada && (
                                  <>
                                    {/* Se tem Montar ou Apear, mostrar primeiro dentro do quadrado */}
                                    {(temMontar || temApear) && (
                                      <div className="flex items-center justify-center gap-0.5 relative" style={{ zIndex: 20 }}>
                                        {temApear && ponto.numeroApear ? (
                                          // Se tem apear, mostrar apenas o número
                                          <span className="text-indigo-600 font-medium text-xs leading-none relative" style={{ zIndex: 20 }}>{ponto.numeroApear}</span>
                                        ) : temMontar ? (
                                          // Se tem montar, mostrar X ou bolinha + número
                                          <>
                                            {ponto.guiadoOuControlado === 'controlado' ? (
                                              <span className="text-indigo-600 font-bold text-xs leading-none relative" style={{ zIndex: 20 }}>X</span>
                                            ) : ponto.guiadoOuControlado === 'guiado' ? (
                                              <div className="w-2 h-2 bg-indigo-600 rounded-full relative" style={{ zIndex: 20 }}></div>
                                            ) : (
                                              <div className="w-2 h-2 bg-indigo-600 rounded-full relative" style={{ zIndex: 20 }}></div>
                                            )}
                                            {ponto.numeroMontagem && (
                                              <span className="text-indigo-600 font-medium text-xs leading-none relative" style={{ zIndex: 20 }}>{ponto.numeroMontagem}</span>
                                            )}
                                          </>
                                        ) : null}
                                      </div>
                                    )}
                                    
                                    {/* Se tem Plano Terapêutico, mostrar depois (fora do quadrado quando houver montar/apear) */}
                                    {temPlanoTerapeutico && (
                                      <div className={`flex flex-col items-center leading-none relative ${(temMontar || temApear) ? 'mt-1' : ''}`} style={{ zIndex: 30 }}>
                                        <span className="text-[10px] text-green-600 font-semibold">{planoAbreviado}</span>
                                        <span className="text-[10px] text-green-600 font-bold">{numeroNota}</span>
                                      </div>
                                    )}
                                    
                                    {/* Se não tem nem Montar, nem Apear, nem Plano, mostrar ponto padrão */}
                                    {!temMontar && !temApear && !temPlanoTerapeutico && (
                                      <div className="w-2 h-2 bg-indigo-600 rounded-full relative" style={{ zIndex: 20 }}></div>
                                    )}
                                  </>
                                )}
                              </td>
                            );
                          })}
                        </tr>
                        <tr>
                          <td className="border border-gray-300 px-2 py-1 text-xs text-gray-700 font-medium bg-gray-50 w-20">
                            deambular
                          </td>
                          {Array.from({ length: 61 }, (_, i) => {
                            const ponto = obterPontoMarcado('deambular', i);
                            const isMarcada = ponto !== undefined;
                            const temPlanoTerapeutico = ponto?.planoTerapeutico && ponto.planoTerapeutico.trim() !== '';
                            const planoAbreviado = temPlanoTerapeutico ? abreviarPorSilabas(ponto.planoTerapeutico || '') : '';
                            const numeroNota = temPlanoTerapeutico && ponto?.planoNota ? extrairNumeroNota(ponto.planoNota) : '';

                            return (
                              <td
                                key={i}
                                className="px-1 py-1 text-center w-4 relative"
                              >
                                {isMarcada && (
                                  temPlanoTerapeutico ? (
                                    <div className="flex flex-col items-center leading-none relative" style={{ zIndex: 20 }}>
                                      <span className="text-[10px] text-green-600 font-semibold">{planoAbreviado}</span>
                                      <span className="text-[10px] text-green-600 font-bold">{numeroNota}</span>
                                    </div>
                                  ) : (
                                    <div className="w-0.5 h-0.5 bg-indigo-600 rounded-full mx-auto relative" style={{ width: '3px', height: '3px', zIndex: 20 }}></div>
                                  )
                                )}
                              </td>
                            );
                          })}
                        </tr>
                        <tr>
                          <td className="border border-gray-300 px-2 py-1 text-xs text-gray-700 font-medium bg-gray-50 w-20">
                            correr
                          </td>
                          {Array.from({ length: 61 }, (_, i) => {
                            const ponto = obterPontoMarcado('correr', i);
                            const isMarcada = ponto !== undefined;
                            const temPlanoTerapeutico = ponto?.planoTerapeutico && ponto.planoTerapeutico.trim() !== '';
                            const planoAbreviado = temPlanoTerapeutico ? abreviarPorSilabas(ponto.planoTerapeutico || '') : '';
                            const numeroNota = temPlanoTerapeutico && ponto?.planoNota ? extrairNumeroNota(ponto.planoNota) : '';

                            return (
                              <td
                                key={i}
                                className="px-1 py-1 text-center w-4 relative"
                              >
                                {isMarcada && (
                                  temPlanoTerapeutico ? (
                                    <div className="flex flex-col items-center leading-none relative" style={{ zIndex: 20 }}>
                                      <span className="text-[10px] text-green-600 font-semibold">{planoAbreviado}</span>
                                      <span className="text-[10px] text-green-600 font-bold">{numeroNota}</span>
                                    </div>
                                  ) : (
                                    <div className="w-0.5 h-0.5 bg-indigo-600 rounded-full mx-auto relative" style={{ width: '3px', height: '3px', zIndex: 20 }}></div>
                                  )
                                )}
                              </td>
                            );
                          })}
                        </tr>
                        <tr className="bg-gray-100">
                          <td className="border border-gray-300 px-2 py-1 text-xs font-medium text-gray-700 w-20">
                            Tempo (min)
                          </td>
                          {Array.from({ length: 61 }, (_, i) => (
                            <td
                              key={i}
                              className="border border-gray-300 px-0.5 py-1 text-xs font-medium text-gray-700 text-center w-4"
                            >
                              {i}
                            </td>
                          ))}
                        </tr>
                      </tbody>
                    </table>
                    
                    {/* SVG para linhas conectando os pontos */}
                    <svg
                      className="absolute top-0 left-0 pointer-events-none"
                      style={{ width: '100%', height: '100%', zIndex: 15 }}
                    >
                      {pontosMarcados.map((ponto, index) => {
                        if (index === 0) return null;
                        const pontoAnterior = pontosMarcados[index - 1];
                        
                        if (!tabelaRef.current) return null;
                        
                        // Obter a linha do tipo de percurso anterior
                        const linhaAnterior = tabelaRef.current.rows[obterIndicePorTipo(pontoAnterior.tipoPercurso)];
                        const linhaAtual = tabelaRef.current.rows[obterIndicePorTipo(ponto.tipoPercurso)];
                        
                        if (!linhaAnterior || !linhaAtual) return null;
                        
                        // +1 porque cells[0] é o label, então minuto 0 = cells[1], minuto 20 = cells[21]
                        const celulaAnterior = linhaAnterior.cells[pontoAnterior.minuto + 1];
                        const celulaAtual = linhaAtual.cells[ponto.minuto + 1];
                        
                        if (!celulaAnterior || !celulaAtual) return null;
                        
                        // Obter as posições reais das células
                        const rectAnterior = celulaAnterior.getBoundingClientRect();
                        const rectAtual = celulaAtual.getBoundingClientRect();
                        const rectTabela = tabelaRef.current.getBoundingClientRect();
                        
                        // Calcular posições relativas à tabela
                        const x1 = rectAnterior.left - rectTabela.left + (rectAnterior.width / 2);
                        const y1 = rectAnterior.top - rectTabela.top + (rectAnterior.height / 2);
                        const x2 = rectAtual.left - rectTabela.left + (rectAtual.width / 2);
                        const y2 = rectAtual.top - rectTabela.top + (rectAtual.height / 2);
                        
                        // Verificar se este ponto tem símbolo de estribo
                        const temSimbolo = ponto.simboloEstribo !== null && ponto.simboloEstribo !== undefined;
                        
                        return (
                          <g key={index}>
                            <line
                              x1={x1}
                              y1={y1}
                              x2={x2}
                              y2={y2}
                              stroke="#d1d5db"
                              strokeWidth="3"
                              strokeLinecap="round"
                              strokeDasharray={ponto.tipoSuperficie === 'areia' ? '6 4' : undefined}
                            />
                            {temSimbolo && (
                              <text
                                x={x1 + 8}
                                y={y1 + 3}
                                fontSize="12"
                                fontWeight="bold"
                                fill="#9333ea"
                                style={{ fontFamily: 'monospace' }}
                              >
                                {ponto.simboloEstribo}
                              </text>
                            )}
                          </g>
                        );
                      })}
                    </svg>
                  </div>
                </div>

                {/* Quadro de Legendas */}
                <div className="mt-6 bg-gray-50 border-2 border-gray-300 rounded-lg p-4">
                  <h3 className="text-base md:text-lg font-medium text-gray-900 mb-4 text-center">
                    Legendas
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Montar */}
                    <div className="space-y-3">
                      <h4 className="font-semibold text-gray-800 text-center border-b border-gray-300 pb-2">
                        Montar
                      </h4>
                      
                      {/* Montar números */}
                      <div>
                        <p className="text-xs font-medium text-gray-700 mb-1">Montar:</p>
                        <div className="space-y-1 text-xs text-gray-600">
                          <div>5 - sem auxílio</div>
                          <div>4 - com auxílio</div>
                          <div>3 - rampa</div>
                          <div>2 - auxílio rampa</div>
                          <div>1 - colocado</div>
                        </div>
                      </div>
                      
                      {/* Encilhamento */}
                      <div>
                        <p className="text-xs font-medium text-gray-700 mb-1">Encilhamento:</p>
                        <div className="space-y-1 text-xs text-gray-600">
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 border-2 border-gray-600"></div>
                            <span>Sela (linha contínua)</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 border-2 border-dashed border-gray-600"></div>
                            <span>Manta (linha tracejada)</span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Condução */}
                      <div>
                        <p className="text-xs font-medium text-gray-700 mb-1">Condução:</p>
                        <div className="space-y-1 text-xs text-gray-600">
                          <div className="flex items-center gap-2">
                            <span className="text-base font-bold">X</span>
                            <span>Controlado</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full border-2 border-gray-600"></div>
                            <span>Guiado</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Percurso */}
                    <div className="space-y-3">
                      <h4 className="font-semibold text-gray-800 text-center border-b border-gray-300 pb-2">
                        Percurso
                      </h4>
                      
                      {/* Passada */}
                      <div>
                        <p className="text-xs font-medium text-gray-700 mb-1">Passada:</p>
                        <div className="text-xs text-gray-600 space-y-0.5">
                          <div>• Galope</div>
                          <div>• Trote</div>
                          <div>• Transpista</div>
                          <div>• Sobrepista</div>
                          <div>• Antepista</div>
                          <div>• Parado</div>
                          <div>• Deambular</div>
                          <div>• Correr</div>
                        </div>
                      </div>
                      
                      {/* Terreno */}
                      <div>
                        <p className="text-xs font-medium text-gray-700 mb-1">Terreno:</p>
                        <div className="space-y-1 text-xs text-gray-600">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-0.5 bg-gray-600"></div>
                            <span>Asfalto (linha contínua)</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-0.5 border-t-2 border-dashed border-gray-600"></div>
                            <span>Areia (linha tracejada)</span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Estribo */}
                      <div>
                        <p className="text-xs font-medium text-gray-700 mb-1">Estribo:</p>
                        <div className="text-xs text-gray-600 space-y-0.5">
                          <div>[ ] - pé no estribo gaiola</div>
                          <div>( ) - pé no estribo</div>
                          <div>• pé fora do estribo</div>
                        </div>
                      </div>
                    </div>

                    {/* Apear */}
                    <div className="space-y-3">
                      <h4 className="font-semibold text-gray-800 text-center border-b border-gray-300 pb-2">
                        Apear
                      </h4>
                      
                      <div className="space-y-1 text-xs text-gray-600">
                        <div>5 - sem auxílio</div>
                        <div>4 - com auxílio</div>
                        <div>3 - rampa</div>
                        <div>2 - auxílio rampa</div>
                        <div>1 - tirado</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Lista de registros gerados */}
                {pontosMarcados.length > 0 && (
                  <div className="mt-4">
                    <h3 className="text-base md:text-lg font-medium text-gray-900 mb-3">
                      Registros
                    </h3>
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 space-y-2">
                      {pontosMarcados.map((ponto, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between bg-white px-4 py-3 rounded-lg border border-gray-200"
                        >
                          <div className="flex-1">
                            <span className="font-medium text-gray-900">{ponto.tempo}</span>
                            <span className="text-gray-600 mx-2">-</span>
                            {ponto.montar && (
                              <span className="text-gray-700">
                                <span className="font-medium text-indigo-600">Montar:</span> {ponto.montar}
                              </span>
                            )}
                            {ponto.percurso && (
                              <span className="text-gray-700">
                                <span className="font-medium text-blue-600">Percurso:</span> {ponto.percurso}
                              </span>
                            )}
                            {ponto.apear && (
                              <span className="text-gray-700">
                                <span className="font-medium text-orange-600">Apear:</span> {ponto.apear}
                              </span>
                            )}
                            {ponto.planoTerapeutico && ponto.planoTerapeutico.trim() !== '' && (
                              <>
                                {(ponto.montar || ponto.percurso || ponto.apear) && <span className="text-gray-600 mx-2">|</span>}
                                <div className="mt-2 p-3 bg-green-50 rounded-lg border border-green-200">
                                  <div className="text-gray-700">
                                    <span className="font-medium text-green-600">Nome:</span> {ponto.planoTerapeutico}
                                  </div>
                                  {ponto.planoAtividade && (
                                    <div className="text-gray-700 mt-1">
                                      <span className="font-medium text-green-600">Atividade:</span> {ponto.planoAtividade}
                                    </div>
                                  )}
                                  {ponto.planoNota && (
                                    <div className="text-gray-700 mt-1">
                                      <span className="font-medium text-green-600">Nota:</span> {ponto.planoNota}
                                    </div>
                                  )}
                                  {ponto.planoObservacoes && (
                                    <div className="text-gray-700 mt-1">
                                      <span className="font-medium text-green-600">Observações:</span> {ponto.planoObservacoes}
                                    </div>
                                  )}
                                </div>
                              </>
                            )}
                          </div>
                          <div className="flex items-center gap-2 ml-4">
                            {ponto.planoTerapeutico && ponto.planoTerapeutico.trim() !== '' && (
                              <button
                                type="button"
                                onClick={() => handleEditarPlano(index)}
                                className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
                                aria-label="Editar Plano Terapêutico"
                              >
                                <Pencil className="h-5 w-5" />
                              </button>
                            )}
                            <button
                              type="button"
                              onClick={() => handleRemoverPonto(index)}
                              className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                              aria-label="Remover registro"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Nível de Suporte da Montaria no Centro de Gravidade */}
                <div className="mt-6">
                  <h3 className="text-base md:text-lg font-medium text-gray-900 mb-4">
                    Nível de Suporte da Montaria no Centro de Gravidade
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                    <div>
                      <label className="block text-gray-700 mb-2 text-sm md:text-base">
                        Postura
                      </label>
                      <select
                        value={nivelPostura}
                        onChange={(e) => setNivelPostura(e.target.value)}
                        className="w-full px-3 md:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm md:text-base"
                      >
                        <option value="">Selecione...</option>
                        <option value="continuo">Contínuo - todo tempo</option>
                        <option value="recorrente">Recorrente - intermitente</option>
                        <option value="ocasional">Ocasional - Média 4x</option>
                        <option value="ausencia">Ausência</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-2 text-sm md:text-base">
                        Estabilidade
                      </label>
                      <select
                        value={nivelEstabilidade}
                        onChange={(e) => setNivelEstabilidade(e.target.value)}
                        className="w-full px-3 md:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm md:text-base"
                      >
                        <option value="">Selecione...</option>
                        <option value="continuo">Contínuo - todo tempo</option>
                        <option value="recorrente">Recorrente - intermitente</option>
                        <option value="ocasional">Ocasional - Média 4x</option>
                        <option value="ausencia">Ausência</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-2 text-sm md:text-base">
                        Mobilidade
                      </label>
                      <select
                        value={nivelMobilidade}
                        onChange={(e) => setNivelMobilidade(e.target.value)}
                        className="w-full px-3 md:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm md:text-base"
                      >
                        <option value="">Selecione...</option>
                        <option value="continuo">Contínuo - todo tempo</option>
                        <option value="recorrente">Recorrente - intermitente</option>
                        <option value="ocasional">Ocasional - Média 4x</option>
                        <option value="ausencia">Ausência</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-2 text-sm md:text-base">
                        Fadiga
                      </label>
                      <select
                        value={nivelFadiga}
                        onChange={(e) => setNivelFadiga(e.target.value)}
                        className="w-full px-3 md:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm md:text-base"
                      >
                        <option value="">Selecione...</option>
                        <option value="continuo">Contínuo - todo tempo</option>
                        <option value="recorrente">Recorrente - intermitente</option>
                        <option value="ocasional">Ocasional - Média 4x</option>
                        <option value="ausencia">Ausência</option>
                      </select>
                    </div>
                  </div>
                </div>
                
                {/* Exame de Saída */}
                <div className="mt-6">
                  <h3 className="text-base md:text-lg font-medium text-gray-900 mb-4">
                    Exame de Saída
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                    <div>
                      <label className="block text-gray-700 mb-2 text-sm md:text-base">
                        Batimento Cardíaco
                      </label>
                      <input
                        type="text"
                        value={batimentoCardiacoSaida}
                        onChange={(e) => setBatimentoCardiacoSaida(e.target.value)}
                        className="w-full px-3 md:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm md:text-base"
                        placeholder="bpm"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-2 text-sm md:text-base">
                        Oxigênio
                      </label>
                      <input
                        type="text"
                        value={oxigenioSaida}
                        onChange={(e) => setOxigenioSaida(e.target.value)}
                        className="w-full px-3 md:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm md:text-base"
                        placeholder="%"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-2 text-sm md:text-base">
                        Pressão
                      </label>
                      <input
                        type="text"
                        value={pressaoSaida}
                        onChange={(e) => setPressaoSaida(e.target.value)}
                        className="w-full px-3 md:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm md:text-base"
                        placeholder="mmHg"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-2 text-sm md:text-base">
                        Temperatura
                      </label>
                      <input
                        type="text"
                        value={temperaturaSaida}
                        onChange={(e) => setTemperaturaSaida(e.target.value)}
                        className="w-full px-3 md:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm md:text-base"
                        placeholder="°C"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-2 text-sm md:text-base">
                        Respiração
                      </label>
                      <input
                        type="text"
                        value={respiracaoSaida}
                        onChange={(e) => setRespiracaoSaida(e.target.value)}
                        className="w-full px-3 md:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm md:text-base"
                        placeholder="irpm"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-gray-700 mb-2 text-sm md:text-base">
                        Observação
                      </label>
                      <textarea
                        value={observacaoSaida}
                        onChange={(e) => setObservacaoSaida(e.target.value)}
                        rows={2}
                        className="w-full px-3 md:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm md:text-base resize-none"
                        placeholder="Observações do exame de saída..."
                      />
                    </div>
                  </div>
                </div>

                {/* Linha de Base Inferência */}
                <div className="mt-6">
                  <h3 className="text-base md:text-lg font-medium text-gray-900 mb-4">
                    Linha de Base Inferência
                  </h3>
                  <div>
                    <label className="block text-gray-700 mb-2 text-sm md:text-base">
                      Objetivo Clinicamente Relevantes
                    </label>
                    <input
                      type="text"
                      value={preRequisito}
                      className="w-full px-3 md:px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-sm md:text-base"
                      readOnly
                    />
                  </div>

                  {/* Tabela de Histórico de Sessões */}
                  <div className="mt-6 overflow-x-auto">
                    <div className="relative">
                      {/* SVG para linhas de conexão */}
                      <svg 
                        className="absolute top-0 left-0 w-full h-full pointer-events-none"
                        style={{ zIndex: 1 }}
                      >
                        {historicoSessoes.map((sessao, index) => {
                          if (index === historicoSessoes.length - 1) return null;
                          
                          const nextSessao = historicoSessoes[index + 1];
                          
                          // Largura da coluna de classificação + (número de colunas de sessão * largura aprox)
                          // Aproximadamente: primeira coluna ~200px, cada sessão ~120px
                          const baseX = 200;
                          const columnWidth = 120;
                          const x1 = baseX + (index * columnWidth) + (columnWidth / 2);
                          const x2 = baseX + ((index + 1) * columnWidth) + (columnWidth / 2);
                          
                          // Calcular posições Y baseadas nas notas
                          // Cabeçalho ~40px + offset de cada linha ~49px por faixa
                          const getYPosition = (nota: number) => {
                            const headerHeight = 50;
                            const rowHeight = 49;
                            // Nota 10 = linha 1, Nota 0 = linha 6
                            if (nota >= 9) return headerHeight + rowHeight * 0.5; // Excesso
                            if (nota >= 7) return headerHeight + rowHeight * 1.5; // Ótimo
                            if (nota >= 5) return headerHeight + rowHeight * 2.5; // Satisfatório
                            if (nota >= 3) return headerHeight + rowHeight * 3.5; // Insatisfatório
                            if (nota >= 1) return headerHeight + rowHeight * 4.5; // Falta 1/2
                            return headerHeight + rowHeight * 5.5; // Falta 0
                          };
                          
                          const y1 = getYPosition(sessao.nota);
                          const y2 = getYPosition(nextSessao.nota);
                          
                          return (
                            <line
                              key={`line-${index}`}
                              x1={x1}
                              y1={y1}
                              x2={x2}
                              y2={y2}
                              stroke="#9CA3AF"
                              strokeWidth="2"
                            />
                          );
                        })}
                      </svg>
                      
                      <table className="w-full border-collapse border border-gray-300 relative" style={{ zIndex: 2 }}>
                      <thead>
                        <tr className="bg-gray-100">
                          <th className="border border-gray-300 px-3 py-2 text-left text-sm md:text-base font-medium text-gray-700">
                            Classificação
                          </th>
                          {historicoSessoes.map((sessao) => (
                            <th 
                              key={sessao.numeroSessao}
                              className="border border-gray-300 px-3 py-2 text-center text-sm md:text-base font-medium text-gray-700"
                            >
                              Sessão {sessao.numeroSessao}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {/* Linha: Excesso 9/10 */}
                        <tr>
                          <td className="border border-gray-300 px-3 py-2 text-sm md:text-base font-medium text-gray-700 bg-green-50">
                            Excesso 9/10
                          </td>
                          {historicoSessoes.map((sessao) => (
                            <td 
                              key={sessao.numeroSessao}
                              className="border border-gray-300 px-3 py-2 text-center bg-green-50"
                            >
                              <div className="flex flex-col items-center gap-1">
                                {/* Bolinha para nota 10 */}
                                <div className={`w-3 h-3 rounded-full border-2 ${
                                  sessao.nota === 10 
                                    ? 'bg-green-500 border-green-500' 
                                    : 'bg-white border-gray-300'
                                }`} />
                                {/* Bolinha para nota 9 */}
                                <div className={`w-3 h-3 rounded-full border-2 ${
                                  sessao.nota === 9 
                                    ? 'bg-green-500 border-green-500' 
                                    : 'bg-white border-gray-300'
                                }`} />
                              </div>
                            </td>
                          ))}
                        </tr>

                        {/* Linha: Ótimo 7/8 */}
                        <tr>
                          <td className="border border-gray-300 px-3 py-2 text-sm md:text-base font-medium text-gray-700 bg-green-50">
                            Ótimo 7/8
                          </td>
                          {historicoSessoes.map((sessao) => (
                            <td 
                              key={sessao.numeroSessao}
                              className="border border-gray-300 px-3 py-2 text-center bg-green-50"
                            >
                              <div className="flex flex-col items-center gap-1">
                                {/* Bolinha para nota 8 */}
                                <div className={`w-3 h-3 rounded-full border-2 ${
                                  sessao.nota === 8 
                                    ? 'bg-blue-500 border-blue-500' 
                                    : 'bg-white border-gray-300'
                                }`} />
                                {/* Bolinha para nota 7 */}
                                <div className={`w-3 h-3 rounded-full border-2 ${
                                  sessao.nota === 7 
                                    ? 'bg-blue-500 border-blue-500' 
                                    : 'bg-white border-gray-300'
                                }`} />
                              </div>
                            </td>
                          ))}
                        </tr>

                        {/* Linha: Satisfatório 5/6 */}
                        <tr>
                          <td className="border border-gray-300 px-3 py-2 text-sm md:text-base font-medium text-gray-700 bg-green-50">
                            Satisfatório 5/6
                          </td>
                          {historicoSessoes.map((sessao) => (
                            <td 
                              key={sessao.numeroSessao}
                              className="border border-gray-300 px-3 py-2 text-center bg-green-50"
                            >
                              <div className="flex flex-col items-center gap-1">
                                {/* Bolinha para nota 6 */}
                                <div className={`w-3 h-3 rounded-full border-2 ${
                                  sessao.nota === 6 
                                    ? 'bg-yellow-500 border-yellow-500' 
                                    : 'bg-white border-gray-300'
                                }`} />
                                {/* Bolinha para nota 5 */}
                                <div className={`w-3 h-3 rounded-full border-2 ${
                                  sessao.nota === 5 
                                    ? 'bg-yellow-500 border-yellow-500' 
                                    : 'bg-white border-gray-300'
                                }`} />
                              </div>
                            </td>
                          ))}
                        </tr>

                        {/* Linha: Insatisfatório 3/4 */}
                        <tr>
                          <td className="border border-gray-300 px-3 py-2 text-sm md:text-base font-medium text-gray-700 bg-orange-50">
                            Insatisfatório 3/4
                          </td>
                          {historicoSessoes.map((sessao) => (
                            <td 
                              key={sessao.numeroSessao}
                              className="border border-gray-300 px-3 py-2 text-center bg-orange-50"
                            >
                              <div className="flex flex-col items-center gap-1">
                                {/* Bolinha para nota 4 */}
                                <div className={`w-3 h-3 rounded-full border-2 ${
                                  sessao.nota === 4 
                                    ? 'bg-orange-500 border-orange-500' 
                                    : 'bg-white border-gray-300'
                                }`} />
                                {/* Bolinha para nota 3 */}
                                <div className={`w-3 h-3 rounded-full border-2 ${
                                  sessao.nota === 3 
                                    ? 'bg-orange-500 border-orange-500' 
                                    : 'bg-white border-gray-300'
                                }`} />
                              </div>
                            </td>
                          ))}
                        </tr>

                        {/* Linha: Falta 1/2 */}
                        <tr>
                          <td className="border border-gray-300 px-3 py-2 text-sm md:text-base font-medium text-gray-700 bg-red-50">
                            Falta 1/2
                          </td>
                          {historicoSessoes.map((sessao) => (
                            <td
                              key={sessao.numeroSessao}
                              className="border border-gray-300 px-3 py-2 text-center bg-red-50"
                            >
                              <div className="flex flex-col items-center gap-1">
                                {/* Bolinha para nota 2 */}
                                <div className={`w-3 h-3 rounded-full border-2 ${
                                  sessao.nota === 2
                                    ? 'bg-red-500 border-red-500'
                                    : 'bg-white border-gray-300'
                                }`} />
                                {/* Bolinha para nota 1 */}
                                <div className={`w-3 h-3 rounded-full border-2 ${
                                  sessao.nota === 1
                                    ? 'bg-red-500 border-red-500'
                                    : 'bg-white border-gray-300'
                                }`} />
                              </div>
                            </td>
                          ))}
                        </tr>

                        {/* Linha: Falta 0 */}
                        <tr>
                          <td className="border border-gray-300 px-3 py-2 text-sm md:text-base font-medium text-gray-700 bg-red-50">
                            Falta 0
                          </td>
                          {historicoSessoes.map((sessao) => (
                            <td
                              key={sessao.numeroSessao}
                              className="border border-gray-300 px-3 py-2 text-center bg-red-50"
                            >
                              <div className="flex items-center justify-center">
                                {/* Bolinha para nota 0 */}
                                <div className={`w-3 h-3 rounded-full border-2 ${
                                  sessao.nota === 0
                                    ? 'bg-red-500 border-red-500'
                                    : 'bg-white border-gray-300'
                                }`} />
                              </div>
                            </td>
                          ))}
                        </tr>

                        {/* Linha: Observação */}
                        <tr>
                          <td className="border border-gray-300 px-3 py-2 text-sm md:text-base font-medium text-gray-700 bg-gray-50">
                            Observação
                          </td>
                          {historicoSessoes.map((sessao) => (
                            <td
                              key={sessao.numeroSessao}
                              className="border border-gray-300 px-3 py-2 text-xs md:text-sm text-gray-600"
                            >
                              {sessao.observacao}
                            </td>
                          ))}
                        </tr>

                        {/* Linha: Objetivo */}
                        <tr>
                          <td className="border border-gray-300 px-3 py-2 text-sm md:text-base font-medium text-gray-700 bg-gray-50">
                            Objetivo
                          </td>
                          {historicoSessoes.map((sessao) => (
                            <td
                              key={sessao.numeroSessao}
                              className="border border-gray-300 px-3 py-2 text-xs md:text-sm text-gray-600"
                            >
                              {sessao.objetivo}
                            </td>
                          ))}
                        </tr>
                      </tbody>
                    </table>
                    </div>
                  </div>

                  {/* Campos para Sessão Atual */}
                  <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <h4 className="text-base font-medium text-gray-900 mb-4">
                      Registrar Sessão Atual
                    </h4>
                    <div className="grid grid-cols-1 gap-4">
                      <div>
                        <label className="block text-gray-700 mb-2 text-sm md:text-base">
                          Qual a nota dessa sessão?
                        </label>
                        <select
                          value={notaSessaoAtual}
                          onChange={(e) => setNotaSessaoAtual(e.target.value)}
                          className="w-full px-3 md:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm md:text-base"
                        >
                          <option value="">Selecione uma nota...</option>
                          <option value="0">0</option>
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                          <option value="6">6</option>
                          <option value="7">7</option>
                          <option value="8">8</option>
                          <option value="9">9</option>
                          <option value="10">10</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-gray-700 mb-2 text-sm md:text-base">
                          Observação
                        </label>
                        <textarea
                          value={observacaoSessaoAtual}
                          onChange={(e) => setObservacaoSessaoAtual(e.target.value)}
                          className="w-full px-3 md:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm md:text-base"
                          placeholder="Porque não deu nota maior ou menor"
                          rows={3}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-3 justify-end pt-4 border-t border-gray-200">
              <button
                type="button"
                onClick={onVoltar}
                className="px-4 md:px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm md:text-base"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleAbrirModalEncerrar}
                className="px-4 md:px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm md:text-base"
              >
                Encerrar
              </button>
              <button
                type="submit"
                className="px-4 md:px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm md:text-base"
              >
                Salvar
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Modal de Edição do Plano Terapêutico */}
      {editandoPlanoIndex !== null && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Editar Plano Terapêutico Aberto
              </h3>
              
              <div className="space-y-4">
                {/* Nome */}
                <div>
                  <label className="block text-gray-700 mb-2">
                    Nome <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={planoEditando.nome}
                    onChange={(e) => setPlanoEditando({ ...planoEditando, nome: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Ex: alongamento"
                  />
                </div>

                {/* Atividade */}
                <div>
                  <label className="block text-gray-700 mb-2">
                    Atividade <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={planoEditando.atividade}
                    onChange={(e) => setPlanoEditando({ ...planoEditando, atividade: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Digite a atividade..."
                  />
                </div>

                {/* Nota */}
                <div>
                  <label className="block text-gray-700 mb-2">
                    Nota(Criterio/Suporte) <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={planoEditando.nota}
                    onChange={(e) => setPlanoEditando({ ...planoEditando, nota: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Selecione...</option>
                    <option value="00 - Não fez, sem ajuda">00 - Não fez, sem ajuda</option>
                    <option value="01 - Não fez, dicas e correções">01 - Não fez, dicas e correções</option>
                    <option value="02 - Não fez, com apoio fisico">02 - Não fez, com apoio fisico</option>
                    <option value="10 - Fez parcialmente, sem ajuda">10 - Fez parcialmente, sem ajuda</option>
                    <option value="11 - Fez parcialmente, dicas e correções">11 - Fez parcialmente, dicas e correções</option>
                    <option value="12 - Fez parcialmente, com apoio fisico">12 - Fez parcialmente, com apoio fisico</option>
                    <option value="20 - Fez, sem ajuda">20 - Fez, sem ajuda</option>
                    <option value="21 - Fez, dicas e correções">21 - Fez, dicas e correções</option>
                    <option value="22 - Fez, com apoio fisico">22 - Fez, com apoio fisico</option>
                  </select>
                </div>

                {/* Observações */}
                <div>
                  <label className="block text-gray-700 mb-2">
                    Observações
                  </label>
                  <textarea
                    value={planoEditando.observacoes}
                    onChange={(e) => setPlanoEditando({ ...planoEditando, observacoes: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Digite ..."
                    rows={3}
                  />
                </div>
              </div>

              {/* Botões */}
              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={handleCancelarEdicaoPlano}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  onClick={handleSalvarEdicaoPlano}
                  className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors"
                >
                  Salvar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Encerrar Atendimento */}
      {modalEncerrarAberta && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-lg w-full">
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Encerrar Atendimento
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-700 mb-2 text-sm md:text-base font-medium">
                    Motivo <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={motivoEncerramento}
                    onChange={(e) => setMotivoEncerramento(e.target.value)}
                    className="w-full px-3 md:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm md:text-base"
                  >
                    <option value="">Selecione um motivo...</option>
                    <option value="Falta do praticante">Falta do praticante</option>
                    <option value="Praticante passou mal">Praticante passou mal</option>
                    <option value="Condições climáticas">Condições climáticas</option>
                    <option value="Problema com o equino">Problema com o equino</option>
                    <option value="Outros">Outros</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-700 mb-2 text-sm md:text-base font-medium">
                    Detalhar o motivo
                  </label>
                  <textarea
                    value={detalheEncerramento}
                    onChange={(e) => setDetalheEncerramento(e.target.value)}
                    className="w-full px-3 md:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm md:text-base"
                    placeholder="Descreva os detalhes do encerramento..."
                    rows={4}
                  />
                </div>
              </div>

              <div className="flex gap-3 justify-end mt-6">
                <button
                  type="button"
                  onClick={handleFecharModalEncerrar}
                  className="px-4 md:px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm md:text-base"
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  onClick={handleConfirmarEncerrar}
                  className="px-4 md:px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm md:text-base"
                >
                  Confirmar Encerramento
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}