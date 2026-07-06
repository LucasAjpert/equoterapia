import { useState } from 'react';
import { BookOpen, Plus, Search, Download, Trash2, Eye, FileText, Calendar, User, Upload, GraduationCap, Clock, Link } from 'lucide-react';

interface Estudo {
  id: number;
  titulo: string;
  autor: string;
  colaborador: string;
  dataPublicacao: string;
  dataUpload: string;
  categoria: string;
  resumo: string;
  arquivo: string;
  palavrasChave: string[];
}

interface Curso {
  id: number;
  titulo: string;
  instrutor: string;
  colaborador: string;
  dataInicio: string;
  dataConclusao: string;
  cargaHoraria: string;
  plataforma: string;
  categoria: string;
  descricao: string;
  link: string;
  certificado: string;
  palavrasChave: string[];
}

type ActiveTab = 'estudos' | 'cursos';

export function RevistasPage() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('estudos');

  // ── Estudos state ──────────────────────────────────────────────────────────
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategoria, setSelectedCategoria] = useState('todas');
  const [showModal, setShowModal] = useState(false);
  const [selectedEstudo, setSelectedEstudo] = useState<Estudo | null>(null);
  const [isViewing, setIsViewing] = useState(false);

  const [estudos, setEstudos] = useState<Estudo[]>([
    {
      id: 1,
      titulo: 'Efeitos da Equoterapia no Desenvolvimento Motor de Crianças com Paralisia Cerebral',
      autor: 'Silva, M. J.; Santos, P. R.',
      colaborador: 'Dr. Roberto da Silva',
      dataPublicacao: '2023-05-15',
      dataUpload: '2024-01-10',
      categoria: 'Desenvolvimento Motor',
      resumo: 'Este estudo investigou os efeitos da equoterapia no desenvolvimento motor de 30 crianças com paralisia cerebral durante 6 meses...',
      arquivo: 'estudo-paralisia-cerebral.pdf',
      palavrasChave: ['equoterapia', 'paralisia cerebral', 'desenvolvimento motor', 'reabilitação']
    },
    {
      id: 2,
      titulo: 'Benefícios da Equoterapia no Tratamento de Transtornos do Espectro Autista',
      autor: 'Oliveira, A. C.; Rodrigues, L. M.',
      colaborador: 'Dra. Maria Santos',
      dataPublicacao: '2023-09-20',
      dataUpload: '2024-02-15',
      categoria: 'Saúde Mental',
      resumo: 'Pesquisa qualitativa sobre os benefícios terapêuticos da equoterapia em pacientes com TEA, incluindo melhorias na comunicação...',
      arquivo: 'tea-equoterapia.pdf',
      palavrasChave: ['TEA', 'autismo', 'equoterapia', 'comunicação', 'comportamento']
    },
    {
      id: 3,
      titulo: 'Análise Biomecânica do Movimento do Cavalo e Seus Efeitos no Praticante',
      autor: 'Costa, R. F.; Lima, J. S.',
      colaborador: 'Dr. Roberto da Silva',
      dataPublicacao: '2022-11-30',
      dataUpload: '2024-01-20',
      categoria: 'Biomecânica',
      resumo: 'Análise detalhada dos movimentos tridimensionais produzidos pelo cavalo e como estes impactam o sistema neuromuscular...',
      arquivo: 'biomecanica-equoterapia.pdf',
      palavrasChave: ['biomecânica', 'movimento', 'neuromuscular', 'postura']
    }
  ]);

  const categorias = ['todas', 'Desenvolvimento Motor', 'Saúde Mental', 'Biomecânica', 'Neurologia', 'Psicologia', 'Fisioterapia', 'Outros'];

  const [formData, setFormData] = useState({
    titulo: '',
    autor: '',
    dataPublicacao: '',
    categoria: '',
    resumo: '',
    arquivo: '',
    palavrasChave: ''
  });

  const handleOpenModal = (estudo?: Estudo) => {
    if (estudo) {
      setSelectedEstudo(estudo);
      setFormData({
        titulo: estudo.titulo,
        autor: estudo.autor,
        dataPublicacao: estudo.dataPublicacao,
        categoria: estudo.categoria,
        resumo: estudo.resumo,
        arquivo: estudo.arquivo,
        palavrasChave: estudo.palavrasChave.join(', ')
      });
    } else {
      setSelectedEstudo(null);
      setFormData({ titulo: '', autor: '', dataPublicacao: '', categoria: '', resumo: '', arquivo: '', palavrasChave: '' });
    }
    setIsViewing(false);
    setShowModal(true);
  };

  const handleViewEstudo = (estudo: Estudo) => {
    setSelectedEstudo(estudo);
    setIsViewing(true);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedEstudo(null);
    setIsViewing(false);
  };

  const handleSave = () => {
    if (!formData.titulo || !formData.autor || !formData.categoria) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }
    const palavrasChaveArray = formData.palavrasChave.split(',').map(p => p.trim()).filter(Boolean);
    if (selectedEstudo && !isViewing) {
      setEstudos(estudos.map(e => e.id === selectedEstudo.id ? { ...e, ...formData, palavrasChave: palavrasChaveArray } : e));
    } else {
      setEstudos([...estudos, {
        id: Math.max(...estudos.map(e => e.id), 0) + 1,
        ...formData,
        colaborador: 'Dr. Roberto da Silva',
        dataUpload: new Date().toISOString().split('T')[0],
        palavrasChave: palavrasChaveArray
      }]);
    }
    handleCloseModal();
  };

  const handleDelete = (id: number) => {
    if (window.confirm('Tem certeza que deseja excluir este estudo acadêmico?')) {
      setEstudos(estudos.filter(e => e.id !== id));
    }
  };

  const filteredEstudos = estudos.filter(estudo => {
    const matchesSearch = estudo.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      estudo.autor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      estudo.palavrasChave.some(p => p.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategoria = selectedCategoria === 'todas' || estudo.categoria === selectedCategoria;
    return matchesSearch && matchesCategoria;
  });

  // ── Cursos state ───────────────────────────────────────────────────────────
  const [cursoSearch, setCursoSearch] = useState('');
  const [selectedCursoCategoria, setSelectedCursoCategoria] = useState('todas');
  const [showCursoModal, setShowCursoModal] = useState(false);
  const [selectedCurso, setSelectedCurso] = useState<Curso | null>(null);
  const [isViewingCurso, setIsViewingCurso] = useState(false);

  const [cursos, setCursos] = useState<Curso[]>([
    {
      id: 1,
      titulo: 'Fundamentos da Equoterapia — Teoria e Prática',
      instrutor: 'Dr. Carlos Mendes',
      colaborador: 'Dra. Maria Santos',
      dataInicio: '2024-03-01',
      dataConclusao: '2024-05-31',
      cargaHoraria: '40h',
      plataforma: 'ANDE-BRASIL',
      categoria: 'Formação Básica',
      descricao: 'Curso introdutório abrangendo os princípios da equoterapia, bases neurofisiológicas e protocolos de atendimento inicial...',
      link: 'https://ande-brasil.org.br/cursos',
      certificado: 'certificado-fundamentos.pdf',
      palavrasChave: ['fundamentos', 'equoterapia', 'formação', 'protocolo']
    },
    {
      id: 2,
      titulo: 'Avaliação Funcional em Equoterapia',
      instrutor: 'Profa. Ana Lúcia Ferreira',
      colaborador: 'Dr. Roberto da Silva',
      dataInicio: '2024-06-10',
      dataConclusao: '2024-08-10',
      cargaHoraria: '20h',
      plataforma: 'EAD Reabilitar',
      categoria: 'Avaliação',
      descricao: 'Ferramentas e escalas para avaliação funcional de praticantes, com foco em metas terapêuticas mensuráveis...',
      link: '',
      certificado: '',
      palavrasChave: ['avaliação', 'funcional', 'escalas', 'metas']
    }
  ]);

  const cursosCategorias = ['todas', 'Formação Básica', 'Avaliação', 'Neurologia Clínica', 'Saúde Mental', 'Fisioterapia', 'Bem-estar Animal', 'Gestão', 'Outros'];

  const [cursoFormData, setCursoFormData] = useState({
    titulo: '',
    instrutor: '',
    dataInicio: '',
    dataConclusao: '',
    cargaHoraria: '',
    plataforma: '',
    categoria: '',
    descricao: '',
    link: '',
    certificado: '',
    palavrasChave: ''
  });

  const handleOpenCursoModal = (curso?: Curso) => {
    if (curso) {
      setSelectedCurso(curso);
      setCursoFormData({
        titulo: curso.titulo,
        instrutor: curso.instrutor,
        dataInicio: curso.dataInicio,
        dataConclusao: curso.dataConclusao,
        cargaHoraria: curso.cargaHoraria,
        plataforma: curso.plataforma,
        categoria: curso.categoria,
        descricao: curso.descricao,
        link: curso.link,
        certificado: curso.certificado,
        palavrasChave: curso.palavrasChave.join(', ')
      });
    } else {
      setSelectedCurso(null);
      setCursoFormData({ titulo: '', instrutor: '', dataInicio: '', dataConclusao: '', cargaHoraria: '', plataforma: '', categoria: '', descricao: '', link: '', certificado: '', palavrasChave: '' });
    }
    setIsViewingCurso(false);
    setShowCursoModal(true);
  };

  const handleViewCurso = (curso: Curso) => {
    setSelectedCurso(curso);
    setIsViewingCurso(true);
    setShowCursoModal(true);
  };

  const handleCloseCursoModal = () => {
    setShowCursoModal(false);
    setSelectedCurso(null);
    setIsViewingCurso(false);
  };

  const handleSaveCurso = () => {
    if (!cursoFormData.titulo || !cursoFormData.instrutor || !cursoFormData.categoria) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }
    const palavrasChaveArray = cursoFormData.palavrasChave.split(',').map(p => p.trim()).filter(Boolean);
    if (selectedCurso && !isViewingCurso) {
      setCursos(cursos.map(c => c.id === selectedCurso.id ? { ...c, ...cursoFormData, palavrasChave: palavrasChaveArray } : c));
    } else {
      setCursos([...cursos, {
        id: Math.max(...cursos.map(c => c.id), 0) + 1,
        ...cursoFormData,
        colaborador: 'Dr. Roberto da Silva',
        palavrasChave: palavrasChaveArray
      }]);
    }
    handleCloseCursoModal();
  };

  const handleDeleteCurso = (id: number) => {
    if (window.confirm('Tem certeza que deseja excluir este curso?')) {
      setCursos(cursos.filter(c => c.id !== id));
    }
  };

  const filteredCursos = cursos.filter(curso => {
    const matchesSearch = curso.titulo.toLowerCase().includes(cursoSearch.toLowerCase()) ||
      curso.instrutor.toLowerCase().includes(cursoSearch.toLowerCase()) ||
      curso.palavrasChave.some(p => p.toLowerCase().includes(cursoSearch.toLowerCase()));
    const matchesCategoria = selectedCursoCategoria === 'todas' || curso.categoria === selectedCursoCategoria;
    return matchesSearch && matchesCategoria;
  });

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <BookOpen className="w-8 h-8 text-indigo-600" />
          <h1 className="text-gray-900">Revistas</h1>
        </div>
        <p className="text-gray-600">Gerencie estudos acadêmicos e cursos sobre equoterapia</p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-6">
        <button
          onClick={() => setActiveTab('estudos')}
          className={`flex items-center gap-2 px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
            activeTab === 'estudos'
              ? 'border-indigo-600 text-indigo-600'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          Estudos Acadêmicos
          <span className={`ml-1 px-2 py-0.5 rounded-full text-xs ${activeTab === 'estudos' ? 'bg-indigo-100 text-indigo-700' : 'bg-gray-100 text-gray-600'}`}>
            {estudos.length}
          </span>
        </button>
        <button
          onClick={() => setActiveTab('cursos')}
          className={`flex items-center gap-2 px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
            activeTab === 'cursos'
              ? 'border-indigo-600 text-indigo-600'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          }`}
        >
          <GraduationCap className="w-4 h-4" />
          Cursos
          <span className={`ml-1 px-2 py-0.5 rounded-full text-xs ${activeTab === 'cursos' ? 'bg-indigo-100 text-indigo-700' : 'bg-gray-100 text-gray-600'}`}>
            {cursos.length}
          </span>
        </button>
      </div>

      {/* ── ESTUDOS ACADÊMICOS ─────────────────────────────────────────────── */}
      {activeTab === 'estudos' && (
        <>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Buscar por título, autor ou palavras-chave..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>
              </div>
              <select
                value={selectedCategoria}
                onChange={(e) => setSelectedCategoria(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              >
                {categorias.map(cat => (
                  <option key={cat} value={cat}>{cat === 'todas' ? 'Todas as Categorias' : cat}</option>
                ))}
              </select>
            </div>
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => handleOpenModal()}
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2"
              >
                <Plus className="w-5 h-5" />
                Adicionar Estudo
              </button>
            </div>
          </div>

          <div className="mb-4">
            <p className="text-gray-600">{filteredEstudos.length} {filteredEstudos.length === 1 ? 'estudo encontrado' : 'estudos encontrados'}</p>
          </div>

          <div className="space-y-4">
            {filteredEstudos.map(estudo => (
              <div key={estudo.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-gray-900 mb-2">{estudo.titulo}</h3>
                    <div className="space-y-2 mb-3">
                      <div className="flex items-center gap-2 text-gray-600">
                        <User className="w-4 h-4" />
                        <span className="text-sm">{estudo.autor}</span>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>Publicado: {new Date(estudo.dataPublicacao).toLocaleDateString('pt-BR')}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Upload className="w-4 h-4" />
                          <span>Adicionado: {new Date(estudo.dataUpload).toLocaleDateString('pt-BR')}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="inline-block px-3 py-1 bg-indigo-100 text-indigo-700 text-sm rounded-full">{estudo.categoria}</span>
                        <span className="text-sm text-gray-500">• Adicionado por: {estudo.colaborador}</span>
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm mb-3">{estudo.resumo}</p>
                    <div className="flex flex-wrap gap-2">
                      {estudo.palavrasChave.map((palavra, index) => (
                        <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">#{palavra}</span>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-2 ml-4">
                    <button onClick={() => handleViewEstudo(estudo)} className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors" title="Visualizar"><Eye className="w-5 h-5" /></button>
                    <button className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors" title="Download"><Download className="w-5 h-5" /></button>
                    <button onClick={() => handleOpenModal(estudo)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Editar"><FileText className="w-5 h-5" /></button>
                    <button onClick={() => handleDelete(estudo.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Excluir"><Trash2 className="w-5 h-5" /></button>
                  </div>
                </div>
              </div>
            ))}
            {filteredEstudos.length === 0 && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
                <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">Nenhum estudo encontrado</p>
                <p className="text-gray-500 text-sm mt-2">Tente ajustar seus filtros de busca ou adicione um novo estudo</p>
              </div>
            )}
          </div>
        </>
      )}

      {/* ── CURSOS ────────────────────────────────────────────────────────── */}
      {activeTab === 'cursos' && (
        <>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Buscar por título, instrutor ou palavras-chave..."
                    value={cursoSearch}
                    onChange={(e) => setCursoSearch(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>
              </div>
              <select
                value={selectedCursoCategoria}
                onChange={(e) => setSelectedCursoCategoria(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              >
                {cursosCategorias.map(cat => (
                  <option key={cat} value={cat}>{cat === 'todas' ? 'Todas as Categorias' : cat}</option>
                ))}
              </select>
            </div>
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => handleOpenCursoModal()}
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2"
              >
                <Plus className="w-5 h-5" />
                Adicionar Curso
              </button>
            </div>
          </div>

          <div className="mb-4">
            <p className="text-gray-600">{filteredCursos.length} {filteredCursos.length === 1 ? 'curso encontrado' : 'cursos encontrados'}</p>
          </div>

          <div className="space-y-4">
            {filteredCursos.map(curso => (
              <div key={curso.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-start gap-3 mb-2">
                      <div className="p-2 bg-indigo-50 rounded-lg flex-shrink-0">
                        <GraduationCap className="w-5 h-5 text-indigo-600" />
                      </div>
                      <h3 className="text-gray-900">{curso.titulo}</h3>
                    </div>
                    <div className="space-y-2 mb-3 ml-11">
                      <div className="flex items-center gap-2 text-gray-600">
                        <User className="w-4 h-4" />
                        <span className="text-sm">Instrutor: {curso.instrutor}</span>
                      </div>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                        {curso.cargaHoraria && (
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            <span>{curso.cargaHoraria}</span>
                          </div>
                        )}
                      </div>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="inline-block px-3 py-1 bg-indigo-100 text-indigo-700 text-sm rounded-full">{curso.categoria}</span>
                        {curso.plataforma && (
                          <span className="inline-block px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">{curso.plataforma}</span>
                        )}
                        <span className="text-sm text-gray-500">• Adicionado por: {curso.colaborador}</span>
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm mb-3 ml-11">{curso.descricao}</p>
                    <div className="flex flex-wrap gap-2 ml-11">
                      {curso.palavrasChave.map((palavra, index) => (
                        <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">#{palavra}</span>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-2 ml-4">
                    <button onClick={() => handleViewCurso(curso)} className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors" title="Visualizar"><Eye className="w-5 h-5" /></button>
                    {curso.certificado && (
                      <button className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors" title="Baixar certificado"><Download className="w-5 h-5" /></button>
                    )}
                    <button onClick={() => handleOpenCursoModal(curso)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Editar"><FileText className="w-5 h-5" /></button>
                    <button onClick={() => handleDeleteCurso(curso.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Excluir"><Trash2 className="w-5 h-5" /></button>
                  </div>
                </div>
              </div>
            ))}
            {filteredCursos.length === 0 && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
                <GraduationCap className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">Nenhum curso encontrado</p>
                <p className="text-gray-500 text-sm mt-2">Tente ajustar seus filtros de busca ou adicione um novo curso</p>
              </div>
            )}
          </div>
        </>
      )}

      {/* ── MODAL ESTUDOS ─────────────────────────────────────────────────── */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center sticky top-0 bg-white">
              <h2 className="text-gray-900">
                {isViewing ? 'Visualizar Estudo' : selectedEstudo ? 'Editar Estudo' : 'Adicionar Novo Estudo'}
              </h2>
              <button onClick={handleCloseModal} className="text-gray-400 hover:text-gray-600">✕</button>
            </div>
            <div className="p-6">
              {isViewing ? (
                <div className="space-y-6">
                  <h3 className="text-gray-900 mb-4">{selectedEstudo?.titulo}</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div><label className="block text-sm text-gray-600 mb-1">Autor(es)</label><p className="text-gray-900">{selectedEstudo?.autor}</p></div>
                    <div><label className="block text-sm text-gray-600 mb-1">Data de Publicação</label><p className="text-gray-900">{selectedEstudo?.dataPublicacao && new Date(selectedEstudo.dataPublicacao).toLocaleDateString('pt-BR')}</p></div>
                    <div><label className="block text-sm text-gray-600 mb-1">Categoria</label><p className="text-gray-900">{selectedEstudo?.categoria}</p></div>
                    <div><label className="block text-sm text-gray-600 mb-1">Adicionado por</label><p className="text-gray-900">{selectedEstudo?.colaborador}</p></div>
                    <div><label className="block text-sm text-gray-600 mb-1">Data de Upload</label><p className="text-gray-900">{selectedEstudo?.dataUpload && new Date(selectedEstudo.dataUpload).toLocaleDateString('pt-BR')}</p></div>
                    <div><label className="block text-sm text-gray-600 mb-1">Arquivo</label><p className="text-gray-900">{selectedEstudo?.arquivo}</p></div>
                  </div>
                  <div><label className="block text-sm text-gray-600 mb-1">Resumo</label><p className="text-gray-900">{selectedEstudo?.resumo}</p></div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-3">Palavras-chave</label>
                    <div className="flex flex-wrap gap-2">
                      {selectedEstudo?.palavrasChave.map((palavra, index) => (
                        <span key={index} className="px-3 py-1 bg-indigo-100 text-indigo-700 text-sm rounded-full">#{palavra}</span>
                      ))}
                    </div>
                  </div>
                  <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
                    <button onClick={handleCloseModal} className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">Fechar</button>
                    <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"><Download className="w-4 h-4" />Download</button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-700 mb-2">Título do Estudo <span className="text-red-500">*</span></label>
                    <input type="text" value={formData.titulo} onChange={(e) => setFormData({ ...formData, titulo: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent" placeholder="Digite o título do estudo" />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">Autor(es) <span className="text-red-500">*</span></label>
                    <input type="text" value={formData.autor} onChange={(e) => setFormData({ ...formData, autor: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent" placeholder="Ex: Silva, M. J.; Santos, P. R." />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-700 mb-2">Data de Publicação</label>
                      <input type="date" value={formData.dataPublicacao} onChange={(e) => setFormData({ ...formData, dataPublicacao: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent" />
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-2">Categoria <span className="text-red-500">*</span></label>
                      <select value={formData.categoria} onChange={(e) => setFormData({ ...formData, categoria: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent">
                        <option value="">Selecione...</option>
                        {categorias.filter(cat => cat !== 'todas').map(cat => (<option key={cat} value={cat}>{cat}</option>))}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">Resumo</label>
                    <textarea value={formData.resumo} onChange={(e) => setFormData({ ...formData, resumo: e.target.value })} rows={4} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none" placeholder="Digite um resumo do estudo acadêmico" />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">Arquivo PDF</label>
                    <div className="flex items-center gap-4">
                      <input type="text" value={formData.arquivo} onChange={(e) => setFormData({ ...formData, arquivo: e.target.value })} className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent" placeholder="Nome do arquivo.pdf" />
                      <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-2"><Upload className="w-4 h-4" />Upload</button>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">Formatos aceitos: PDF (máx. 10MB)</p>
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">Palavras-chave</label>
                    <input type="text" value={formData.palavrasChave} onChange={(e) => setFormData({ ...formData, palavrasChave: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent" placeholder="Separe por vírgula (ex: equoterapia, autismo, reabilitação)" />
                  </div>
                  <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
                    <button onClick={handleCloseModal} className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">Cancelar</button>
                    <button onClick={handleSave} className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">{selectedEstudo ? 'Salvar Alterações' : 'Adicionar Estudo'}</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ── MODAL CURSOS ──────────────────────────────────────────────────── */}
      {showCursoModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center sticky top-0 bg-white">
              <h2 className="text-gray-900">
                {isViewingCurso ? 'Visualizar Curso' : selectedCurso ? 'Editar Curso' : 'Adicionar Novo Curso'}
              </h2>
              <button onClick={handleCloseCursoModal} className="text-gray-400 hover:text-gray-600">✕</button>
            </div>
            <div className="p-6">
              {isViewingCurso ? (
                <div className="space-y-6">
                  <h3 className="text-gray-900 mb-4">{selectedCurso?.titulo}</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div><label className="block text-sm text-gray-600 mb-1">Instrutor</label><p className="text-gray-900">{selectedCurso?.instrutor}</p></div>
                    <div><label className="block text-sm text-gray-600 mb-1">Plataforma</label><p className="text-gray-900">{selectedCurso?.plataforma || '—'}</p></div>
                    <div><label className="block text-sm text-gray-600 mb-1">Categoria</label><p className="text-gray-900">{selectedCurso?.categoria}</p></div>
                    <div><label className="block text-sm text-gray-600 mb-1">Carga Horária</label><p className="text-gray-900">{selectedCurso?.cargaHoraria || '—'}</p></div>

                    <div><label className="block text-sm text-gray-600 mb-1">Adicionado por</label><p className="text-gray-900">{selectedCurso?.colaborador}</p></div>
                    {selectedCurso?.link && (
                      <div>
                        <label className="block text-sm text-gray-600 mb-1">Link</label>
                        <a href={selectedCurso.link} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline text-sm break-all">{selectedCurso.link}</a>
                      </div>
                    )}
                  </div>
                  <div><label className="block text-sm text-gray-600 mb-1">Descrição</label><p className="text-gray-900">{selectedCurso?.descricao}</p></div>
                  {(selectedCurso?.palavrasChave?.length ?? 0) > 0 && (
                    <div>
                      <label className="block text-sm text-gray-600 mb-3">Palavras-chave</label>
                      <div className="flex flex-wrap gap-2">
                        {selectedCurso?.palavrasChave.map((palavra, index) => (
                          <span key={index} className="px-3 py-1 bg-indigo-100 text-indigo-700 text-sm rounded-full">#{palavra}</span>
                        ))}
                      </div>
                    </div>
                  )}
                  <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
                    <button onClick={handleCloseCursoModal} className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">Fechar</button>
                    {selectedCurso?.certificado && (
                      <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"><Download className="w-4 h-4" />Certificado</button>
                    )}
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-700 mb-2">Título do Curso <span className="text-red-500">*</span></label>
                    <input type="text" value={cursoFormData.titulo} onChange={(e) => setCursoFormData({ ...cursoFormData, titulo: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent" placeholder="Digite o título do curso" />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">Instrutor <span className="text-red-500">*</span></label>
                    <input type="text" value={cursoFormData.instrutor} onChange={(e) => setCursoFormData({ ...cursoFormData, instrutor: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent" placeholder="Nome do instrutor" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-700 mb-2">Categoria <span className="text-red-500">*</span></label>
                      <select value={cursoFormData.categoria} onChange={(e) => setCursoFormData({ ...cursoFormData, categoria: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent">
                        <option value="">Selecione...</option>
                        {cursosCategorias.filter(cat => cat !== 'todas').map(cat => (<option key={cat} value={cat}>{cat}</option>))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-2">Carga Horária</label>
                      <input type="text" value={cursoFormData.cargaHoraria} onChange={(e) => setCursoFormData({ ...cursoFormData, cargaHoraria: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent" placeholder="Ex: 40h" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">Plataforma / Instituição</label>
                    <input type="text" value={cursoFormData.plataforma} onChange={(e) => setCursoFormData({ ...cursoFormData, plataforma: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent" placeholder="Ex: ANDE-BRASIL, Udemy, EAD Reabilitar..." />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">Descrição</label>
                    <textarea value={cursoFormData.descricao} onChange={(e) => setCursoFormData({ ...cursoFormData, descricao: e.target.value })} rows={3} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none" placeholder="Descreva o conteúdo do curso" />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">Link do Curso</label>
                    <div className="relative">
                      <Link className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <input type="url" value={cursoFormData.link} onChange={(e) => setCursoFormData({ ...cursoFormData, link: e.target.value })} className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent" placeholder="https://..." />
                    </div>
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">Certificado</label>
                    <div className="flex items-center gap-4">
                      <input type="text" value={cursoFormData.certificado} onChange={(e) => setCursoFormData({ ...cursoFormData, certificado: e.target.value })} className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent" placeholder="Nome do arquivo do certificado.pdf" />
                      <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-2"><Upload className="w-4 h-4" />Upload</button>
                    </div>
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">Palavras-chave</label>
                    <input type="text" value={cursoFormData.palavrasChave} onChange={(e) => setCursoFormData({ ...cursoFormData, palavrasChave: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent" placeholder="Separe por vírgula (ex: formação, equoterapia, certificação)" />
                  </div>
                  <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
                    <button onClick={handleCloseCursoModal} className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">Cancelar</button>
                    <button onClick={handleSaveCurso} className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">{selectedCurso ? 'Salvar Alterações' : 'Adicionar Curso'}</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
