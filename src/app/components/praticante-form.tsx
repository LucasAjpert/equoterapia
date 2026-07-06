import { useState } from 'react';
import { Save, X, Search, FileDown, Upload, User, FileText, FolderOpen, Eye } from 'lucide-react';
import { DocumentoModal } from './documento-modal';

export function PraticanteForm() {
  const [activeTab, setActiveTab] = useState('cadastro');
  const [fotoPraticante, setFotoPraticante] = useState<string | null>(null);
  const [seguroPdf, setSeguroPdf] = useState<string | null>(null);
  const [seguroPdfNome, setSeguroPdfNome] = useState<string>('');
  const [documentoAberto, setDocumentoAberto] = useState<any>(null);
  const [showSearch, setShowSearch] = useState(false);
  const [showExameModal, setShowExameModal] = useState(false);
  const [exames, setExames] = useState<any[]>([]);
  const [novoExame, setNovoExame] = useState({
    tipo: '',
    observacoes: '',
    anexo: null as File | null,
  });
  const [formData, setFormData] = useState({
    nomePraticante: '',
    dataNascimento: '',
    rg: '',
    cpf: '',
    pisPasep: '',
    cartaoSus: '',
    planoSaude: '',
    numeroPlanoSaude: '',
    possuiSeguroVida: '',
    seguradora: '',
    patologia: '',
    cid: '',
    patologiaAcessorias: '',
    nomePai: '',
    contatoPai: '',
    emailPai: '',
    nomeMae: '',
    contatoMae: '',
    emailMae: '',
    cuidador: '',
    telefoneCuidador: '',
    emailCuidador: '',
    endereco: '',
    numero: '',
    bairro: '',
    cep: '',
    complemento: '',
    cidade: '',
    estado: '',
    telefone: '',
  });

  const tabs = [
    { id: 'cadastro', label: '📋 Cadastro de Praticante' },
    { id: 'observacoes', label: '📝 Observações' },
    { id: 'atendimento', label: '🏥 Histórico de Atendimento' },
    { id: 'exames', label: '🔬 Histórico de Exames' },
    { id: 'alteracao', label: '📊 Histórico de Alteração' },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Dados do praticante:', formData);
    // Aqui você pode adicionar a lógica para salvar os dados
  };

  const handleClear = () => {
    setFormData({
      nomePraticante: '',
      dataNascimento: '',
      rg: '',
      cpf: '',
      pisPasep: '',
      cartaoSus: '',
      planoSaude: '',
      numeroPlanoSaude: '',
      possuiSeguroVida: '',
      seguradora: '',
      patologia: '',
      cid: '',
      patologiaAcessorias: '',
      nomePai: '',
      contatoPai: '',
      emailPai: '',
      nomeMae: '',
      contatoMae: '',
      emailMae: '',
      cuidador: '',
      telefoneCuidador: '',
      emailCuidador: '',
      endereco: '',
      numero: '',
      bairro: '',
      cep: '',
      complemento: '',
      cidade: '',
      estado: '',
      telefone: '',
    });
  };

  const handleExportPDF = () => {
    console.log('Exportar para PDF');
    // Aqui você pode adicionar a lógica para exportar para PDF
  };

  const handleSearch = () => {
    setShowSearch(!showSearch);
    console.log('Buscar praticante');
    // Aqui você pode adicionar a lógica de busca
  };

  const handleFotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFotoPraticante(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleExameUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setNovoExame((prev) => ({
        ...prev,
        anexo: file,
      }));
    }
  };

  const handleAddExame = () => {
    if (novoExame.tipo && novoExame.observacoes && novoExame.anexo) {
      setExames((prev) => [...prev, novoExame]);
      setNovoExame({
        tipo: '',
        observacoes: '',
        anexo: null,
      });
      setShowExameModal(false);
    }
  };

  return (
    <div className="flex-1 bg-gray-50 overflow-auto">
      {/* Tabs Navigation */}
      <div className="bg-white border-b border-gray-200">
        <div className="px-2 md:px-8">
          <div className="flex gap-1 md:gap-2 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3 md:px-6 py-3 md:py-4 border-b-2 transition-colors whitespace-nowrap text-xs md:text-base ${
                  activeTab === tab.id
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="p-3 md:p-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 md:p-8 max-w-4xl mx-auto">
          {activeTab === 'cadastro' && (
          <div>
            <div className="flex flex-col md:flex-row items-start justify-between mb-4 md:mb-6 gap-4 md:gap-6">
              {/* Foto 3x4 do Praticante */}
              <div className="flex-shrink-0 mx-auto md:mx-0">
                <div className="relative group">
                  <div className="w-24 h-32 md:w-32 md:h-40 border-2 border-gray-300 rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center">
                    {fotoPraticante ? (
                      <img src={fotoPraticante} alt="Foto do praticante" className="w-full h-full object-cover" />
                    ) : (
                      <User className="w-12 h-12 md:w-16 md:h-16 text-gray-400" />
                    )}
                  </div>
                  <label className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer rounded-lg">
                    <Upload className="w-6 h-6 md:w-8 md:h-8 text-white" />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFotoUpload}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              {/* Botão Exportar PDF */}
              <button
                onClick={handleExportPDF}
                className="flex items-center gap-2 px-3 md:px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors h-fit text-sm md:text-base w-full md:w-auto justify-center"
                title="Exportar para PDF"
              >
                <FileDown className="w-4 h-4 md:w-5 md:h-5" />
                Exportar PDF
              </button>
            </div>
          <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
            {/* Nome do Praticante com busca */}
            <div>
              <label htmlFor="nomePraticante" className="block text-gray-700 mb-2">
                Nome do Praticante
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="nomePraticante"
                  name="nomePraticante"
                  value={formData.nomePraticante}
                  onChange={handleChange}
                  className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Digite o nome completo"
                  required
                />
                <button
                  type="button"
                  onClick={handleSearch}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-blue-600 transition-colors"
                  title="Buscar praticante"
                >
                  <Search className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Data de Nascimento */}
            <div>
              <label htmlFor="dataNascimento" className="block text-gray-700 mb-2">
                Data de Nascimento
              </label>
              <input
                type="date"
                id="dataNascimento"
                name="dataNascimento"
                value={formData.dataNascimento}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            {/* RG e CPF */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="rg" className="block text-gray-700 mb-2">
                  RG
                </label>
                <input
                  type="text"
                  id="rg"
                  name="rg"
                  value={formData.rg}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="00.000.000-0"
                  required
                />
              </div>

              <div>
                <label htmlFor="cpf" className="block text-gray-700 mb-2">
                  CPF
                </label>
                <input
                  type="text"
                  id="cpf"
                  name="cpf"
                  value={formData.cpf}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="000.000.000-00"
                  required
                />
              </div>
            </div>

            {/* PIS/PASEP */}
            <div>
              <label htmlFor="pisPasep" className="block text-gray-700 mb-2">
                PIS/PASEP
              </label>
              <input
                type="text"
                id="pisPasep"
                name="pisPasep"
                value={formData.pisPasep}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="000.00000.00-0"
              />
            </div>

            {/* Cartão SUS */}
            <div>
              <label htmlFor="cartaoSus" className="block text-gray-700 mb-2">
                Cartão SUS
              </label>
              <input
                type="text"
                id="cartaoSus"
                name="cartaoSus"
                value={formData.cartaoSus}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="000000000000000"
              />
            </div>

            {/* Plano de Saúde */}
            <div>
              <label htmlFor="planoSaude" className="block text-gray-700 mb-2">
                Plano de Saúde
              </label>
              <input
                type="text"
                id="planoSaude"
                name="planoSaude"
                value={formData.planoSaude}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Nome do Plano"
              />
            </div>

            {/* Número do Plano de Saúde */}
            <div>
              <label htmlFor="numeroPlanoSaude" className="block text-gray-700 mb-2">
                Número do Plano de Saúde
              </label>
              <input
                type="text"
                id="numeroPlanoSaude"
                name="numeroPlanoSaude"
                value={formData.numeroPlanoSaude}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="000000000000000"
              />
            </div>

            {/* Seguro de Vida — somente visualização */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 mb-2">Possui Seguro de Vida?</label>
                <input
                  type="text"
                  value={formData.possuiSeguroVida === 'sim' ? 'Sim' : formData.possuiSeguroVida === 'nao' ? 'Não' : '—'}
                  readOnly
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-gray-50 text-gray-700 cursor-default"
                />
              </div>
              {formData.possuiSeguroVida === 'sim' && (
                <div>
                  <label className="block text-gray-700 mb-2">Seguradora</label>
                  <input
                    type="text"
                    value={formData.seguradora || '—'}
                    readOnly
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-gray-50 text-gray-700 cursor-default"
                  />
                </div>
              )}
            </div>

            {formData.possuiSeguroVida === 'sim' && (
              <div>
                <label className="block text-gray-700 mb-2">Apólice / Documento do Seguro (PDF)</label>
                {seguroPdf ? (
                  <div className="flex items-center gap-3 p-3 border border-green-200 bg-green-50 rounded-lg">
                    <FileText className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span className="text-sm text-gray-700 flex-1 truncate">{seguroPdfNome}</span>
                    <a href={seguroPdf} download={seguroPdfNome} className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">Baixar</a>
                    <button type="button" onClick={() => { setSeguroPdf(null); setSeguroPdfNome(''); }} className="text-red-500 hover:text-red-700 text-sm">Remover</button>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center w-full h-24 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-colors">
                    <Upload className="w-6 h-6 text-gray-400 mb-1" />
                    <span className="text-sm text-gray-500">Clique para anexar o PDF</span>
                    <span className="text-xs text-gray-400">PDF (máx. 10MB)</span>
                    <input
                      type="file"
                      accept=".pdf"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) { setSeguroPdf(URL.createObjectURL(file)); setSeguroPdfNome(file.name); }
                      }}
                    />
                  </label>
                )}
              </div>
            )}

            {/* Patologia */}
            <div>
              <label htmlFor="patologia" className="block text-gray-700 mb-2">
                Patologia
              </label>
              <input
                type="text"
                id="patologia"
                name="patologia"
                value={formData.patologia}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Patologia"
              />
            </div>

            {/* CID */}
            <div>
              <label htmlFor="cid" className="block text-gray-700 mb-2">
                CID
              </label>
              <input
                type="text"
                id="cid"
                name="cid"
                value={formData.cid}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="CID"
              />
            </div>

            {/* Patologias Acessórias */}
            <div>
              <label htmlFor="patologiaAcessorias" className="block text-gray-700 mb-2">
                Patologias Acessórias
              </label>
              <input
                type="text"
                id="patologiaAcessorias"
                name="patologiaAcessorias"
                value={formData.patologiaAcessorias}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Patologias Acessórias"
              />
            </div>

            {/* Nome do Pai */}
            <div>
              <label htmlFor="nomePai" className="block text-gray-700 mb-2">
                Nome do Pai
              </label>
              <input
                type="text"
                id="nomePai"
                name="nomePai"
                value={formData.nomePai}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Digite o nome do pai"
              />
            </div>

            {/* Contato do Pai */}
            <div>
              <label htmlFor="contatoPai" className="block text-gray-700 mb-2">
                Contato do Pai
              </label>
              <input
                type="tel"
                id="contatoPai"
                name="contatoPai"
                value={formData.contatoPai}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="(00) 00000-0000"
              />
            </div>

            {/* Email do Pai */}
            <div>
              <label htmlFor="emailPai" className="block text-gray-700 mb-2">
                Email do Pai
              </label>
              <input
                type="email"
                id="emailPai"
                name="emailPai"
                value={formData.emailPai}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="email@exemplo.com"
              />
            </div>

            {/* Nome da Mãe */}
            <div>
              <label htmlFor="nomeMae" className="block text-gray-700 mb-2">
                Nome da Mãe
              </label>
              <input
                type="text"
                id="nomeMae"
                name="nomeMae"
                value={formData.nomeMae}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Digite o nome da mãe"
                required
              />
            </div>

            {/* Contato da Mãe */}
            <div>
              <label htmlFor="contatoMae" className="block text-gray-700 mb-2">
                Contato da Mãe
              </label>
              <input
                type="tel"
                id="contatoMae"
                name="contatoMae"
                value={formData.contatoMae}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="(00) 00000-0000"
              />
            </div>

            {/* Email da Mãe */}
            <div>
              <label htmlFor="emailMae" className="block text-gray-700 mb-2">
                Email da Mãe
              </label>
              <input
                type="email"
                id="emailMae"
                name="emailMae"
                value={formData.emailMae}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="email@exemplo.com"
              />
            </div>

            {/* Cuidador */}
            <div>
              <label htmlFor="cuidador" className="block text-gray-700 mb-2">
                Cuidador
              </label>
              <input
                type="text"
                id="cuidador"
                name="cuidador"
                value={formData.cuidador}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Digite o nome do cuidador"
                required
              />
            </div>

            {/* Telefone do Cuidador e Email do Cuidador */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="telefoneCuidador" className="block text-gray-700 mb-2">
                  Telefone
                </label>
                <input
                  type="tel"
                  id="telefoneCuidador"
                  name="telefoneCuidador"
                  value={formData.telefoneCuidador}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="(00) 00000-0000"
                  required
                />
              </div>

              <div>
                <label htmlFor="emailCuidador" className="block text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="emailCuidador"
                  name="emailCuidador"
                  value={formData.emailCuidador}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="email@exemplo.com"
                  required
                />
              </div>
            </div>

            {/* Endereço */}
            <div>
              <label htmlFor="endereco" className="block text-gray-700 mb-2">
                Endereço
              </label>
              <textarea
                id="endereco"
                name="endereco"
                value={formData.endereco}
                onChange={handleChange}
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                placeholder="Rua, número, bairro, cidade, estado, CEP"
                required
              />
            </div>

            {/* Número */}
            <div>
              <label htmlFor="numero" className="block text-gray-700 mb-2">
                Número
              </label>
              <input
                type="text"
                id="numero"
                name="numero"
                value={formData.numero}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Número"
                required
              />
            </div>

            {/* Bairro */}
            <div>
              <label htmlFor="bairro" className="block text-gray-700 mb-2">
                Bairro
              </label>
              <input
                type="text"
                id="bairro"
                name="bairro"
                value={formData.bairro}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Bairro"
                required
              />
            </div>

            {/* CEP */}
            <div>
              <label htmlFor="cep" className="block text-gray-700 mb-2">
                CEP
              </label>
              <input
                type="text"
                id="cep"
                name="cep"
                value={formData.cep}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="00000-000"
                required
              />
            </div>

            {/* Complemento */}
            <div>
              <label htmlFor="complemento" className="block text-gray-700 mb-2">
                Complemento
              </label>
              <input
                type="text"
                id="complemento"
                name="complemento"
                value={formData.complemento}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Complemento"
              />
            </div>

            {/* Cidade */}
            <div>
              <label htmlFor="cidade" className="block text-gray-700 mb-2">
                Cidade
              </label>
              <input
                type="text"
                id="cidade"
                name="cidade"
                value={formData.cidade}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Cidade"
                required
              />
            </div>

            {/* Estado */}
            <div>
              <label htmlFor="estado" className="block text-gray-700 mb-2">
                Estado
              </label>
              <input
                type="text"
                id="estado"
                name="estado"
                value={formData.estado}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Estado"
                required
              />
            </div>

            {/* Telefone */}
            <div>
              <label htmlFor="telefone" className="block text-gray-700 mb-2">
                Telefone do Praticante
              </label>
              <input
                type="tel"
                id="telefone"
                name="telefone"
                value={formData.telefone}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="(00) 00000-0000"
                required
              />
            </div>
          </form>
          </div>
          )}

          {activeTab === 'observacoes' && (
            <div className="space-y-6">
              <div>
                <label htmlFor="observacoes" className="block text-gray-700 mb-2">
                  Observações
                </label>
                <textarea
                  id="observacoes"
                  rows={10}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  placeholder="Digite as observações sobre o praticante..."
                />
              </div>
              <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
                <Save className="w-5 h-5" />
                Salvar Observações
              </button>
            </div>
          )}

          {activeTab === 'atendimento' && (
            <div className="space-y-4">
              <div className="mb-4">
                <h3 className="text-gray-700 mb-2">Documentos e Atendimentos</h3>
                <p className="text-gray-600 text-sm">Histórico de documentos gerados e atendimentos realizados</p>
              </div>
              
              {/* Lista de Documentos */}
              <div className="space-y-3">
                {/* Documento 1 */}
                <div className="border border-gray-200 rounded-lg p-4 bg-white hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3 flex-1">
                      <div className="p-2 bg-indigo-100 rounded-lg">
                        <FileText className="w-5 h-5 text-indigo-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-gray-900 mb-1">Avaliação inicial</h4>
                        <p className="text-sm text-gray-600 mb-2">João Silva</p>
                        <div className="flex flex-wrap gap-2 mb-2">
                          <span className="inline-flex items-center px-2 py-1 rounded-md text-xs bg-indigo-50 text-indigo-700 border border-indigo-200">
                            Ana Silva
                          </span>
                          <span className="inline-flex items-center px-2 py-1 rounded-md text-xs bg-indigo-50 text-indigo-700 border border-indigo-200">
                            Carlos Santos
                          </span>
                        </div>
                        <p className="text-xs text-gray-500">Gerado em: 15/12/2024</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => setDocumentoAberto({
                        id: '1',
                        tipo: 'Avaliação inicial',
                        praticante: 'João Silva',
                        colaboradores: ['Ana Silva - Fisioterapeuta', 'Carlos Santos - Psicólogo'],
                        dataGeracao: '15/12/2024',
                      })}
                      className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                    >
                      <FolderOpen className="w-4 h-4" />
                      Abrir
                    </button>
                  </div>
                </div>

                {/* Documento 2 */}
                <div className="border border-gray-200 rounded-lg p-4 bg-white hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3 flex-1">
                      <div className="p-2 bg-indigo-100 rounded-lg">
                        <FileText className="w-5 h-5 text-indigo-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-gray-900 mb-1">Plano terapêutico</h4>
                        <p className="text-sm text-gray-600 mb-2">João Silva</p>
                        <div className="flex flex-wrap gap-2 mb-2">
                          <span className="inline-flex items-center px-2 py-1 rounded-md text-xs bg-indigo-50 text-indigo-700 border border-indigo-200">
                            Maria Oliveira
                          </span>
                        </div>
                        <p className="text-xs text-gray-500">Gerado em: 20/12/2024</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => setDocumentoAberto({
                        id: '2',
                        tipo: 'Plano terapêutico',
                        praticante: 'João Silva',
                        colaboradores: ['Maria Oliveira - Terapeuta Ocupacional'],
                        dataGeracao: '20/12/2024',
                      })}
                      className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                    >
                      <FolderOpen className="w-4 h-4" />
                      Abrir
                    </button>
                  </div>
                </div>

                {/* Documento 3 */}
                <div className="border border-gray-200 rounded-lg p-4 bg-white hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3 flex-1">
                      <div className="p-2 bg-indigo-100 rounded-lg">
                        <FileText className="w-5 h-5 text-indigo-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-gray-900 mb-1">Estudo de caso</h4>
                        <p className="text-sm text-gray-600 mb-2">João Silva</p>
                        <div className="flex flex-wrap gap-2 mb-2">
                          <span className="inline-flex items-center px-2 py-1 rounded-md text-xs bg-indigo-50 text-indigo-700 border border-indigo-200">
                            Ana Silva
                          </span>
                          <span className="inline-flex items-center px-2 py-1 rounded-md text-xs bg-indigo-50 text-indigo-700 border border-indigo-200">
                            João Costa
                          </span>
                          <span className="inline-flex items-center px-2 py-1 rounded-md text-xs bg-indigo-50 text-indigo-700 border border-indigo-200">
                            Paula Lima
                          </span>
                        </div>
                        <p className="text-xs text-gray-500">Gerado em: 22/12/2024</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => setDocumentoAberto({
                        id: '3',
                        tipo: 'Estudo de caso',
                        praticante: 'João Silva',
                        colaboradores: ['Ana Silva - Fisioterapeuta', 'João Costa - Fonoaudiólogo', 'Paula Lima - Educador Físico'],
                        dataGeracao: '22/12/2024',
                      })}
                      className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                    >
                      <FolderOpen className="w-4 h-4" />
                      Abrir
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'exames' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-gray-700 mb-2">Histórico de Exames</h3>
                  <p className="text-gray-600 text-sm">Exames médicos e laboratoriais do praticante</p>
                </div>
                <button
                  onClick={() => setShowExameModal(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  <Upload className="w-4 h-4" />
                  Adicionar Exame
                </button>
              </div>

              {exames.length === 0 ? (
                <div className="border border-gray-200 rounded-lg p-6 text-center text-gray-500">
                  Nenhum exame registrado ainda.
                </div>
              ) : (
                <div className="space-y-3">
                  {exames.map((exame, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4 bg-white hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3 flex-1">
                          <div className="p-2 bg-indigo-100 rounded-lg">
                            <FileText className="w-5 h-5 text-indigo-600" />
                          </div>
                          <div className="flex-1">
                            <h4 className="text-gray-900 mb-1">{exame.tipo}</h4>
                            <p className="text-sm text-gray-600 mb-2">{exame.observacoes}</p>
                            <p className="text-xs text-gray-500">Anexo: {exame.anexo?.name}</p>
                          </div>
                        </div>
                        <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                          <Eye className="w-4 h-4" />
                          Ver
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'alteracao' && (
            <div className="space-y-4">
              <p className="text-gray-600">Histórico de alterações do cadastro aparecerá aqui.</p>
              <div className="border border-gray-200 rounded-lg p-6 text-center text-gray-500">
                Nenhuma alteração registrada ainda.
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modal de Documento */}
      {documentoAberto && (
        <DocumentoModal
          documento={documentoAberto}
          onClose={() => setDocumentoAberto(null)}
        />
      )}

      {/* Modal de Exame */}
      {showExameModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-2xl mx-4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl text-gray-900">Adicionar Exame</h2>
              <button
                onClick={() => {
                  setShowExameModal(false);
                  setNovoExame({ tipo: '', observacoes: '', anexo: null });
                }}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-4">
              {/* Tipo do Exame */}
              <div>
                <label htmlFor="tipoExame" className="block text-gray-700 mb-2">
                  Tipo do Exame *
                </label>
                <input
                  type="text"
                  id="tipoExame"
                  value={novoExame.tipo}
                  onChange={(e) => setNovoExame({ ...novoExame, tipo: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Ex: Hemograma, Raio-X, Ressonância"
                  required
                />
              </div>

              {/* Observações */}
              <div>
                <label htmlFor="observacoesExame" className="block text-gray-700 mb-2">
                  Observações *
                </label>
                <textarea
                  id="observacoesExame"
                  value={novoExame.observacoes}
                  onChange={(e) => setNovoExame({ ...novoExame, observacoes: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  placeholder="Descreva detalhes sobre o exame..."
                  required
                />
              </div>

              {/* Anexo do Exame */}
              <div>
                <label htmlFor="anexoExame" className="block text-gray-700 mb-2">
                  Anexo do Exame *
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-indigo-500 transition-colors">
                  <input
                    type="file"
                    id="anexoExame"
                    onChange={handleExameUpload}
                    accept=".pdf,.jpg,.jpeg,.png"
                    className="hidden"
                  />
                  <label htmlFor="anexoExame" className="cursor-pointer">
                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-600 mb-1">
                      {novoExame.anexo ? novoExame.anexo.name : 'Clique para selecionar o arquivo'}
                    </p>
                    <p className="text-sm text-gray-500">PDF, JPG, JPEG ou PNG</p>
                  </label>
                </div>
              </div>

              {/* Botões */}
              <div className="flex gap-3 justify-end pt-4">
                <button
                  onClick={() => {
                    setShowExameModal(false);
                    setNovoExame({ tipo: '', observacoes: '', anexo: null });
                  }}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleAddExame}
                  className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2"
                >
                  <Save className="w-5 h-5" />
                  Salvar Exame
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}