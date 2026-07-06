import { useState } from 'react';
import { Save, X, Upload, User, Users, PawPrint, FileText } from 'lucide-react';

type CadastroTipo = 'praticante' | 'colaborador' | 'equino';

export function CadastroPage() {
  const [tipoCadastro, setTipoCadastro] = useState<CadastroTipo>('praticante');
  const [fotoCadastro, setFotoCadastro] = useState<string | null>(null);
  const [seguroPdfPraticante, setSeguroPdfPraticante] = useState<string | null>(null);
  const [seguroPdfPraticanteNome, setSeguroPdfPraticanteNome] = useState<string>('');
  const [seguroPdfColaborador, setSeguroPdfColaborador] = useState<string | null>(null);
  const [seguroPdfColaboradorNome, setSeguroPdfColaboradorNome] = useState<string>('');

  const [formDataPraticante, setFormDataPraticante] = useState({
    nomePraticante: '',
    dataNascimento: '',
    sexo: '',
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

  const [formDataColaborador, setFormDataColaborador] = useState({
    nomeColaborador: '',
    dataNascimento: '',
    sexo: '',
    rg: '',
    cpf: '',
    pisPasep: '',
    cartaoSus: '',
    cargo: '',
    dataAdmissao: '',
    formacao: '',
    conselho: '',
    numeroConselho: '',
    telefone: '',
    email: '',
    endereco: '',
    numero: '',
    bairro: '',
    cep: '',
    complemento: '',
    cidade: '',
    estado: '',
    contatoEmergencia: '',
    telefoneEmergencia: '',
    possuiSeguroVida: '',
    seguradora: '',
  });

  const [formDataEquino, setFormDataEquino] = useState({
    nomeEquino: '',
    raca: '',
    especie: '',
    sexo: '',
    pelagem: '',
    dataNascimento: '',
    peso: '',
    comprimentoPescoco: '',
    larguraTronco: '',
    alturaCernelha: '',
    alturaAnca: '',
    comprimento: '',
    registro: '',
    proprietario: '',
    temperamento: '',
    historicoMedico: '',
    vacinacao: '',
    ultimaVermifugacao: '',
    alimentacao: '',
    restricoes: '',
    observacoes: '',
    // Passo do equino
    antepista: false,
    sobrepista: false,
    transpista: false,
    // Andamento
    andareco: false,
    machaBatida: false,
    machaPicada: false,
    machaTrotada: false,
  });

  const [documentoAnexo, setDocumentoAnexo] = useState<string | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFotoCadastro(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDocumentUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      setDocumentoAnexo(file.name);
    }
  };

  const handleChangePraticante = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormDataPraticante((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleChangeColaborador = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormDataColaborador((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleChangeEquino = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    setFormDataEquino((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSave = () => {
    console.log('Salvando cadastro:', tipoCadastro);
  };

  const handleClear = () => {
    setFotoCadastro(null);
    setDocumentoAnexo(null);
    if (tipoCadastro === 'praticante') {
      setFormDataPraticante({
        nomePraticante: '',
        dataNascimento: '',
        sexo: '',
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
    } else if (tipoCadastro === 'colaborador') {
      setFormDataColaborador({
        nomeColaborador: '',
        dataNascimento: '',
        sexo: '',
        rg: '',
        cpf: '',
        pisPasep: '',
        cartaoSus: '',
        cargo: '',
        dataAdmissao: '',
        formacao: '',
        conselho: '',
        numeroConselho: '',
        telefone: '',
        email: '',
        endereco: '',
        numero: '',
        bairro: '',
        cep: '',
        complemento: '',
        cidade: '',
        estado: '',
        contatoEmergencia: '',
        telefoneEmergencia: '',
        possuiSeguroVida: '',
        seguradora: '',
      });
    } else {
      setFormDataEquino({
        nomeEquino: '',
        raca: '',
        especie: '',
        sexo: '',
        pelagem: '',
        dataNascimento: '',
        peso: '',
        comprimentoPescoco: '',
        larguraTronco: '',
        alturaCernelha: '',
        alturaAnca: '',
        comprimento: '',
        registro: '',
        proprietario: '',
        temperamento: '',
        historicoMedico: '',
        vacinacao: '',
        ultimaVermifugacao: '',
        alimentacao: '',
        restricoes: '',
        observacoes: '',
        // Passo do equino
        antepista: false,
        sobrepista: false,
        transpista: false,
        // Andamento
        andareco: false,
        machaBatida: false,
        machaPicada: false,
        machaTrotada: false,
      });
    }
  };

  const renderFormularioPraticante = () => (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Coluna Esquerda */}
      <div className="space-y-6">
        {/* Área de Foto */}
        <div className="flex justify-center">
          <div className="relative">
            <div className="w-32 h-40 border-2 border-dashed border-indigo-300 rounded-lg flex items-center justify-center bg-indigo-50 overflow-hidden">
              {fotoCadastro ? (
                <img src={fotoCadastro} alt="Foto" className="w-full h-full object-cover" />
              ) : (
                <User className="w-16 h-16 text-indigo-300" />
              )}
            </div>
            <label className="absolute bottom-0 right-0 bg-indigo-600 text-white p-2 rounded-full cursor-pointer hover:bg-indigo-700 transition-colors">
              <Upload className="w-4 h-4" />
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </label>
          </div>
        </div>

        {/* Dados Pessoais */}
        <div className="space-y-4">
          <h3 className="text-indigo-700">Dados Pessoais</h3>
          
          <div>
            <label className="block text-gray-700 mb-1">Nome Completo</label>
            <input
              type="text"
              name="nomePraticante"
              value={formDataPraticante.nomePraticante}
              onChange={handleChangePraticante}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 mb-1">Data de Nascimento</label>
              <input
                type="date"
                name="dataNascimento"
                value={formDataPraticante.dataNascimento}
                onChange={handleChangePraticante}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Sexo</label>
              <select
                name="sexo"
                value={formDataPraticante.sexo}
                onChange={handleChangePraticante}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="">Selecione</option>
                <option value="masculino">Masculino</option>
                <option value="feminino">Feminino</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Telefone</label>
            <input
              type="text"
              name="telefone"
              value={formDataPraticante.telefone}
              onChange={handleChangePraticante}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 mb-1">RG</label>
              <input
                type="text"
                name="rg"
                value={formDataPraticante.rg}
                onChange={handleChangePraticante}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">CPF</label>
              <input
                type="text"
                name="cpf"
                value={formDataPraticante.cpf}
                onChange={handleChangePraticante}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 mb-1">PIS/PASEP</label>
              <input
                type="text"
                name="pisPasep"
                value={formDataPraticante.pisPasep}
                onChange={handleChangePraticante}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Cartão SUS</label>
              <input
                type="text"
                name="cartaoSus"
                value={formDataPraticante.cartaoSus}
                onChange={handleChangePraticante}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 mb-1">Plano de Saúde</label>
              <input
                type="text"
                name="planoSaude"
                value={formDataPraticante.planoSaude}
                onChange={handleChangePraticante}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Número do Plano</label>
              <input
                type="text"
                name="numeroPlanoSaude"
                value={formDataPraticante.numeroPlanoSaude}
                onChange={handleChangePraticante}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 mb-1">Possui Seguro de Vida?</label>
              <select
                name="possuiSeguroVida"
                value={formDataPraticante.possuiSeguroVida}
                onChange={handleChangePraticante}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="">Selecione...</option>
                <option value="sim">Sim</option>
                <option value="nao">Não</option>
              </select>
            </div>
            {formDataPraticante.possuiSeguroVida === 'sim' && (
              <div>
                <label className="block text-gray-700 mb-1">Seguradora</label>
                <input
                  type="text"
                  name="seguradora"
                  value={formDataPraticante.seguradora}
                  onChange={handleChangePraticante}
                  placeholder="Nome da seguradora"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            )}
            {formDataPraticante.possuiSeguroVida === 'sim' && (
              <div className="col-span-2">
                <label className="block text-gray-700 mb-1">Apólice / Documento do Seguro (PDF)</label>
                {seguroPdfPraticante ? (
                  <div className="flex items-center gap-3 p-3 border border-green-200 bg-green-50 rounded-lg">
                    <FileText className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span className="text-sm text-gray-700 flex-1 truncate">{seguroPdfPraticanteNome}</span>
                    <button
                      type="button"
                      onClick={() => { setSeguroPdfPraticante(null); setSeguroPdfPraticanteNome(''); }}
                      className="text-red-500 hover:text-red-700 text-sm"
                    >
                      Remover
                    </button>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center w-full h-24 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-indigo-400 hover:bg-indigo-50 transition-colors">
                    <Upload className="w-6 h-6 text-gray-400 mb-1" />
                    <span className="text-sm text-gray-500">Clique para anexar o PDF</span>
                    <span className="text-xs text-gray-400">PDF (máx. 10MB)</span>
                    <input
                      type="file"
                      accept=".pdf"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) { setSeguroPdfPraticante(URL.createObjectURL(file)); setSeguroPdfPraticanteNome(file.name); }
                      }}
                    />
                  </label>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Informações Médicas */}
        <div className="space-y-4">
          <h3 className="text-indigo-700">Informações Médicas</h3>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 mb-1">Patologia</label>
              <input
                type="text"
                name="patologia"
                value={formDataPraticante.patologia}
                onChange={handleChangePraticante}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">CID</label>
              <input
                type="text"
                name="cid"
                value={formDataPraticante.cid}
                onChange={handleChangePraticante}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Patologias Acessórias</label>
            <textarea
              name="patologiaAcessorias"
              value={formDataPraticante.patologiaAcessorias}
              onChange={handleChangePraticante}
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
            />
          </div>
        </div>
      </div>

      {/* Coluna Direita */}
      <div className="space-y-6">
        {/* Dados do Pai */}
        <div className="space-y-4">
          <h3 className="text-indigo-700">Dados do Pai</h3>
          
          <div>
            <label className="block text-gray-700 mb-1">Nome do Pai</label>
            <input
              type="text"
              name="nomePai"
              value={formDataPraticante.nomePai}
              onChange={handleChangePraticante}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 mb-1">Contato</label>
              <input
                type="text"
                name="contatoPai"
                value={formDataPraticante.contatoPai}
                onChange={handleChangePraticante}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">E-mail</label>
              <input
                type="email"
                name="emailPai"
                value={formDataPraticante.emailPai}
                onChange={handleChangePraticante}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>
        </div>

        {/* Dados da Mãe */}
        <div className="space-y-4">
          <h3 className="text-indigo-700">Dados da Mãe</h3>
          
          <div>
            <label className="block text-gray-700 mb-1">Nome da Mãe</label>
            <input
              type="text"
              name="nomeMae"
              value={formDataPraticante.nomeMae}
              onChange={handleChangePraticante}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 mb-1">Contato</label>
              <input
                type="text"
                name="contatoMae"
                value={formDataPraticante.contatoMae}
                onChange={handleChangePraticante}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">E-mail</label>
              <input
                type="email"
                name="emailMae"
                value={formDataPraticante.emailMae}
                onChange={handleChangePraticante}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>
        </div>

        {/* Dados do Cuidador */}
        <div className="space-y-4">
          <h3 className="text-indigo-700">Dados do Cuidador</h3>
          
          <div>
            <label className="block text-gray-700 mb-1">Nome do Cuidador</label>
            <input
              type="text"
              name="cuidador"
              value={formDataPraticante.cuidador}
              onChange={handleChangePraticante}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 mb-1">Telefone</label>
              <input
                type="text"
                name="telefoneCuidador"
                value={formDataPraticante.telefoneCuidador}
                onChange={handleChangePraticante}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">E-mail</label>
              <input
                type="email"
                name="emailCuidador"
                value={formDataPraticante.emailCuidador}
                onChange={handleChangePraticante}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>
        </div>

        {/* Endereço */}
        <div className="space-y-4">
          <h3 className="text-indigo-700">Endereço</h3>
          
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-2">
              <label className="block text-gray-700 mb-1">Endereço</label>
              <input
                type="text"
                name="endereco"
                value={formDataPraticante.endereco}
                onChange={handleChangePraticante}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Número</label>
              <input
                type="text"
                name="numero"
                value={formDataPraticante.numero}
                onChange={handleChangePraticante}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 mb-1">Bairro</label>
              <input
                type="text"
                name="bairro"
                value={formDataPraticante.bairro}
                onChange={handleChangePraticante}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">CEP</label>
              <input
                type="text"
                name="cep"
                value={formDataPraticante.cep}
                onChange={handleChangePraticante}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Complemento</label>
            <input
              type="text"
              name="complemento"
              value={formDataPraticante.complemento}
              onChange={handleChangePraticante}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 mb-1">Cidade</label>
              <input
                type="text"
                name="cidade"
                value={formDataPraticante.cidade}
                onChange={handleChangePraticante}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Estado</label>
              <input
                type="text"
                name="estado"
                value={formDataPraticante.estado}
                onChange={handleChangePraticante}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderFormularioColaborador = () => (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Coluna Esquerda */}
      <div className="space-y-6">
        {/* Área de Foto */}
        <div className="flex justify-center">
          <div className="relative">
            <div className="w-32 h-40 border-2 border-dashed border-indigo-300 rounded-lg flex items-center justify-center bg-indigo-50 overflow-hidden">
              {fotoCadastro ? (
                <img src={fotoCadastro} alt="Foto" className="w-full h-full object-cover" />
              ) : (
                <Users className="w-16 h-16 text-indigo-300" />
              )}
            </div>
            <label className="absolute bottom-0 right-0 bg-indigo-600 text-white p-2 rounded-full cursor-pointer hover:bg-indigo-700 transition-colors">
              <Upload className="w-4 h-4" />
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </label>
          </div>
        </div>

        {/* Dados Pessoais */}
        <div className="space-y-4">
          <h3 className="text-indigo-700">Dados Pessoais</h3>
          
          <div>
            <label className="block text-gray-700 mb-1">Nome Completo</label>
            <input
              type="text"
              name="nomeColaborador"
              value={formDataColaborador.nomeColaborador}
              onChange={handleChangeColaborador}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 mb-1">Data de Nascimento</label>
              <input
                type="date"
                name="dataNascimento"
                value={formDataColaborador.dataNascimento}
                onChange={handleChangeColaborador}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Sexo</label>
              <select
                name="sexo"
                value={formDataColaborador.sexo}
                onChange={handleChangeColaborador}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="">Selecione</option>
                <option value="masculino">Masculino</option>
                <option value="feminino">Feminino</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 mb-1">RG</label>
              <input
                type="text"
                name="rg"
                value={formDataColaborador.rg}
                onChange={handleChangeColaborador}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">CPF</label>
              <input
                type="text"
                name="cpf"
                value={formDataColaborador.cpf}
                onChange={handleChangeColaborador}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-700 mb-1">E-mail</label>
            <input
              type="email"
              name="email"
              value={formDataColaborador.email}
              onChange={handleChangeColaborador}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        {/* Dados Profissionais */}
        <div className="space-y-4">
          <h3 className="text-indigo-700">Dados Profissionais</h3>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 mb-1">Cargo</label>
              <select
                name="cargo"
                value={formDataColaborador.cargo}
                onChange={handleChangeColaborador}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="">Selecione um cargo</option>
                <option value="terapeuta">Terapeuta</option>
                <option value="administrativo">Administrativo</option>
                <option value="secretaria">Secretaria</option>
                <option value="limpeza">Limpeza</option>
                <option value="manutencao">Manutenção</option>
                <option value="veterinario">Veterinário</option>
                <option value="equitador">Equitador</option>
                <option value="cuidador">Cuidador</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Formação</label>
              <select
                name="formacao"
                value={formDataColaborador.formacao}
                onChange={handleChangeColaborador}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="">Selecione uma formação</option>
                <option value="ensino_fundamental">Ensino Fundamental</option>
                <option value="ensino_medio">Ensino Médio</option>
                <option value="ensino_tecnico">Ensino Técnico</option>
                <option value="psicologo">Psicólogo</option>
                <option value="fonoaudiologo">Fonoaudiólogo</option>
                <option value="terapeuta_ocupacional">Terapeuta Ocupacional</option>
                <option value="fisioterapeuta">Fisioterapeuta</option>
                <option value="educador_fisico">Educador Físico</option>
                <option value="pedagogo">Pedagogo</option>
                <option value="equitador">Equitador</option>
                <option value="enfermeiro">Enfermeiro</option>
                <option value="equoterapeuta">Equoterapeuta</option>
                <option value="medico">Médico</option>
                <option value="outros">Outros</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Data de Admissão</label>
            <input
              type="date"
              name="dataAdmissao"
              value={formDataColaborador.dataAdmissao}
              onChange={handleChangeColaborador}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 mb-1">Conselho</label>
              <input
                type="text"
                name="conselho"
                value={formDataColaborador.conselho}
                onChange={handleChangeColaborador}
                placeholder="Ex: CRP, CRO, CREFITO"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Número do Conselho</label>
              <input
                type="text"
                name="numeroConselho"
                value={formDataColaborador.numeroConselho}
                onChange={handleChangeColaborador}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-gray-700 mb-1">Anexar Documentos (PDF)</label>
            <div className="relative">
              <label className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer flex items-center gap-2 hover:bg-gray-50 transition-colors">
                <input
                  type="file"
                  accept="application/pdf"
                  onChange={handleDocumentUpload}
                  className="hidden"
                />
                <FileText className="w-4 h-4 text-gray-500" />
                <span className="text-gray-600">
                  {documentoAnexo ? documentoAnexo : 'Selecione um arquivo PDF'}
                </span>
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Coluna Direita */}
      <div className="space-y-6">
        {/* Endereço */}
        <div className="space-y-4">
          <h3 className="text-indigo-700">Endereço</h3>
          
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-2">
              <label className="block text-gray-700 mb-1">Endereço</label>
              <input
                type="text"
                name="endereco"
                value={formDataColaborador.endereco}
                onChange={handleChangeColaborador}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Número</label>
              <input
                type="text"
                name="numero"
                value={formDataColaborador.numero}
                onChange={handleChangeColaborador}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 mb-1">Bairro</label>
              <input
                type="text"
                name="bairro"
                value={formDataColaborador.bairro}
                onChange={handleChangeColaborador}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">CEP</label>
              <input
                type="text"
                name="cep"
                value={formDataColaborador.cep}
                onChange={handleChangeColaborador}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Complemento</label>
            <input
              type="text"
              name="complemento"
              value={formDataColaborador.complemento}
              onChange={handleChangeColaborador}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 mb-1">Cidade</label>
              <input
                type="text"
                name="cidade"
                value={formDataColaborador.cidade}
                onChange={handleChangeColaborador}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Estado</label>
              <input
                type="text"
                name="estado"
                value={formDataColaborador.estado}
                onChange={handleChangeColaborador}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>
        </div>

        {/* Contato de Emergência */}
        <div className="space-y-4">
          <h3 className="text-indigo-700">Contato de Emergência</h3>
          
          <div>
            <label className="block text-gray-700 mb-1">Nome do Contato</label>
            <input
              type="text"
              name="contatoEmergencia"
              value={formDataColaborador.contatoEmergencia}
              onChange={handleChangeColaborador}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Telefone de Emergência</label>
            <input
              type="text"
              name="telefoneEmergencia"
              value={formDataColaborador.telefoneEmergencia}
              onChange={handleChangeColaborador}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 mb-1">Possui Seguro de Vida?</label>
              <select
                name="possuiSeguroVida"
                value={formDataColaborador.possuiSeguroVida}
                onChange={handleChangeColaborador}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="">Selecione...</option>
                <option value="sim">Sim</option>
                <option value="nao">Não</option>
              </select>
            </div>
            {formDataColaborador.possuiSeguroVida === 'sim' && (
              <div>
                <label className="block text-gray-700 mb-1">Seguradora</label>
                <input
                  type="text"
                  name="seguradora"
                  value={formDataColaborador.seguradora}
                  onChange={handleChangeColaborador}
                  placeholder="Nome da seguradora"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            )}
            {formDataColaborador.possuiSeguroVida === 'sim' && (
              <div className="col-span-2">
                <label className="block text-gray-700 mb-1">Apólice / Documento do Seguro (PDF)</label>
                {seguroPdfColaborador ? (
                  <div className="flex items-center gap-3 p-3 border border-green-200 bg-green-50 rounded-lg">
                    <FileText className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span className="text-sm text-gray-700 flex-1 truncate">{seguroPdfColaboradorNome}</span>
                    <button
                      type="button"
                      onClick={() => { setSeguroPdfColaborador(null); setSeguroPdfColaboradorNome(''); }}
                      className="text-red-500 hover:text-red-700 text-sm"
                    >
                      Remover
                    </button>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center w-full h-24 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-indigo-400 hover:bg-indigo-50 transition-colors">
                    <Upload className="w-6 h-6 text-gray-400 mb-1" />
                    <span className="text-sm text-gray-500">Clique para anexar o PDF</span>
                    <span className="text-xs text-gray-400">PDF (máx. 10MB)</span>
                    <input
                      type="file"
                      accept=".pdf"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) { setSeguroPdfColaborador(URL.createObjectURL(file)); setSeguroPdfColaboradorNome(file.name); }
                      }}
                    />
                  </label>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  const renderFormularioEquino = () => (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Coluna Esquerda */}
      <div className="space-y-6">
        {/* Área de Foto */}
        <div className="flex justify-center">
          <div className="relative">
            <div className="w-32 h-40 border-2 border-dashed border-indigo-300 rounded-lg flex items-center justify-center bg-indigo-50 overflow-hidden">
              {fotoCadastro ? (
                <img src={fotoCadastro} alt="Foto" className="w-full h-full object-cover" />
              ) : (
                <PawPrint className="w-16 h-16 text-indigo-300" />
              )}
            </div>
            <label className="absolute bottom-0 right-0 bg-indigo-600 text-white p-2 rounded-full cursor-pointer hover:bg-indigo-700 transition-colors">
              <Upload className="w-4 h-4" />
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </label>
          </div>
        </div>

        {/* Informações Básicas */}
        <div className="space-y-4">
          <h3 className="text-indigo-700">Informações Básicas</h3>
          
          <div>
            <label className="block text-gray-700 mb-1">Nome do Equino</label>
            <input
              type="text"
              name="nomeEquino"
              value={formDataEquino.nomeEquino}
              onChange={handleChangeEquino}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-gray-700 mb-1">Raça</label>
              <input
                type="text"
                name="raca"
                value={formDataEquino.raca}
                onChange={handleChangeEquino}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Espécie</label>
              <input
                type="text"
                name="especie"
                value={formDataEquino.especie}
                onChange={handleChangeEquino}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Sexo</label>
              <input
                type="text"
                name="sexo"
                value={formDataEquino.sexo}
                onChange={handleChangeEquino}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Pelagem</label>
            <input
              type="text"
              name="pelagem"
              value={formDataEquino.pelagem}
              onChange={handleChangeEquino}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 mb-1">Data de Nascimento</label>
              <input
                type="date"
                name="dataNascimento"
                value={formDataEquino.dataNascimento}
                onChange={handleChangeEquino}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Registro</label>
              <input
                type="text"
                name="registro"
                value={formDataEquino.registro}
                onChange={handleChangeEquino}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 mb-1">Proprietário</label>
              <input
                type="text"
                name="proprietario"
                value={formDataEquino.proprietario}
                onChange={handleChangeEquino}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Temperamento</label>
              <input
                type="text"
                name="temperamento"
                value={formDataEquino.temperamento}
                onChange={handleChangeEquino}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>
        </div>

        {/* Medidas Corporais */}
        <div className="space-y-4">
          <h3 className="text-indigo-700">Medidas Corporais</h3>
          
          <div>
            <label className="block text-gray-700 mb-1">Peso (kg)</label>
            <input
              type="text"
              name="peso"
              value={formDataEquino.peso}
              onChange={handleChangeEquino}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 mb-1">Comprimento de Pescoço</label>
              <input
                type="text"
                name="comprimentoPescoco"
                value={formDataEquino.comprimentoPescoco}
                onChange={handleChangeEquino}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Largura de Tronco</label>
              <input
                type="text"
                name="larguraTronco"
                value={formDataEquino.larguraTronco}
                onChange={handleChangeEquino}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 mb-1">Altura Cernelha</label>
              <input
                type="text"
                name="alturaCernelha"
                value={formDataEquino.alturaCernelha}
                onChange={handleChangeEquino}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Altura Anca</label>
              <input
                type="text"
                name="alturaAnca"
                value={formDataEquino.alturaAnca}
                onChange={handleChangeEquino}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Comprimento</label>
            <input
              type="text"
              name="comprimento"
              value={formDataEquino.comprimento}
              onChange={handleChangeEquino}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        {/* Passo do Equino */}
        <div className="space-y-4">
          <h3 className="text-indigo-700">Passo do Equino</h3>
          
          <div className="space-y-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                name="antepista"
                checked={formDataEquino.antepista}
                onChange={handleChangeEquino}
                className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
              />
              <span className="text-gray-700">Antepista</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                name="sobrepista"
                checked={formDataEquino.sobrepista}
                onChange={handleChangeEquino}
                className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
              />
              <span className="text-gray-700">Sobrepista</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                name="transpista"
                checked={formDataEquino.transpista}
                onChange={handleChangeEquino}
                className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
              />
              <span className="text-gray-700">Transpista</span>
            </label>
          </div>
        </div>

        {/* Andamento */}
        <div className="space-y-4">
          <h3 className="text-indigo-700">Marcha</h3>
          
          <div className="space-y-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                name="andareco"
                checked={formDataEquino.andareco}
                onChange={handleChangeEquino}
                className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
              />
              <span className="text-gray-700">Andareco</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                name="machaBatida"
                checked={formDataEquino.machaBatida}
                onChange={handleChangeEquino}
                className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
              />
              <span className="text-gray-700">Marcha Batida</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                name="machaPicada"
                checked={formDataEquino.machaPicada}
                onChange={handleChangeEquino}
                className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
              />
              <span className="text-gray-700">Marcha Picada</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                name="machaTrotada"
                checked={formDataEquino.machaTrotada}
                onChange={handleChangeEquino}
                className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
              />
              <span className="text-gray-700">Marcha Trotada</span>
            </label>
          </div>
        </div>
      </div>

      {/* Coluna Direita */}
      <div className="space-y-6">
        {/* Informações de Saúde */}
        <div className="space-y-4">
          <h3 className="text-indigo-700">Informações de Saúde</h3>
          
          <div>
            <label className="block text-gray-700 mb-1">Histórico Médico</label>
            <textarea
              name="historicoMedico"
              value={formDataEquino.historicoMedico}
              onChange={handleChangeEquino}
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Vacinação</label>
            <textarea
              name="vacinacao"
              value={formDataEquino.vacinacao}
              onChange={handleChangeEquino}
              rows={2}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Última Vermifugação</label>
            <input
              type="date"
              name="ultimaVermifugacao"
              value={formDataEquino.ultimaVermifugacao}
              onChange={handleChangeEquino}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        {/* Alimentação e Cuidados */}
        <div className="space-y-4">
          <h3 className="text-indigo-700">Alimentação e Cuidados</h3>
          
          <div>
            <label className="block text-gray-700 mb-1">Alimentação</label>
            <textarea
              name="alimentacao"
              value={formDataEquino.alimentacao}
              onChange={handleChangeEquino}
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Restrições</label>
            <textarea
              name="restricoes"
              value={formDataEquino.restricoes}
              onChange={handleChangeEquino}
              rows={2}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Histórico do Equino</label>
            <textarea
              name="observacoes"
              value={formDataEquino.observacoes}
              onChange={handleChangeEquino}
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
            />
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex-1 flex flex-col bg-gray-50 overflow-hidden">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-8 py-6">
        <h1 className="text-indigo-700">Cadastro</h1>
        <p className="text-gray-600 mt-1">Cadastre praticantes, colaboradores e equinos</p>
      </div>

      {/* Conteúdo */}
      <div className="flex-1 overflow-y-auto px-8 py-6">
        <div className="max-w-7xl mx-auto">
          {/* Seletor de Tipo de Cadastro */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
            <label className="block text-gray-700 mb-3">Tipo de Cadastro</label>
            <select
              value={tipoCadastro}
              onChange={(e) => {
                setTipoCadastro(e.target.value as CadastroTipo);
                setFotoCadastro(null);
                setDocumentoAnexo(null);
              }}
              className="w-full max-w-md px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="praticante">👤 Praticante</option>
              <option value="colaborador">👥 Colaborador</option>
              <option value="equino">🐴 Equino</option>
            </select>
          </div>

          {/* Formulário */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            {tipoCadastro === 'praticante' && renderFormularioPraticante()}
            {tipoCadastro === 'colaborador' && renderFormularioColaborador()}
            {tipoCadastro === 'equino' && renderFormularioEquino()}

            {/* Botões de Ação */}
            <div className="flex justify-end gap-4 mt-8 pt-6 border-t border-gray-200">
              <button
                onClick={handleClear}
                className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2"
              >
                <X className="w-4 h-4" />
                Limpar
              </button>
              <button
                onClick={handleSave}
                className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                Salvar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}