import { useState } from 'react';
import { Save, X, Upload, Users, FileText } from 'lucide-react';

export function ColaboradorPage() {
  const [fotoColaborador, setFotoColaborador] = useState<string | null>(null);
  const [documentoAnexo, setDocumentoAnexo] = useState<string | null>(null);
  const [seguroPdf, setSeguroPdf] = useState<string | null>(null);
  const [seguroPdfNome, setSeguroPdfNome] = useState<string>('');

  const [formData, setFormData] = useState({
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

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFotoColaborador(reader.result as string);
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    console.log('Salvando colaborador:', formData);
  };

  const handleClear = () => {
    setFotoColaborador(null);
    setDocumentoAnexo(null);
    setFormData({
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
  };

  return (
    <div className="flex-1 overflow-y-auto bg-gray-50">
      <div className="p-4 md:p-8">
        <div className="mb-4 md:mb-6">
          <h1 className="text-indigo-900 mb-2 text-xl md:text-2xl">Cadastro de Colaborador</h1>
          <p className="text-gray-600 text-sm md:text-base">Gerencie as informações dos colaboradores</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-4 md:p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
            {/* Coluna Esquerda */}
            <div className="space-y-6">
              {/* Área de Foto */}
              <div className="flex justify-center">
                <div className="relative">
                  <div className="w-32 h-40 border-2 border-dashed border-indigo-300 rounded-lg flex items-center justify-center bg-indigo-50 overflow-hidden">
                    {fotoColaborador ? (
                      <img src={fotoColaborador} alt="Foto" className="w-full h-full object-cover" />
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
                    value={formData.nomeColaborador}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 mb-1">Data de Nascimento</label>
                    <input
                      type="date"
                      name="dataNascimento"
                      value={formData.dataNascimento}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-1">Sexo</label>
                    <select
                      name="sexo"
                      value={formData.sexo}
                      onChange={handleChange}
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
                    value={formData.telefone}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 mb-1">RG</label>
                    <input
                      type="text"
                      name="rg"
                      value={formData.rg}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-1">CPF</label>
                    <input
                      type="text"
                      name="cpf"
                      value={formData.cpf}
                      onChange={handleChange}
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
                      value={formData.pisPasep}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-1">Cartão SUS</label>
                    <input
                      type="text"
                      name="cartaoSus"
                      value={formData.cartaoSus}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 mb-1">E-mail</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
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
                      value={formData.cargo}
                      onChange={handleChange}
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
                      value={formData.formacao}
                      onChange={handleChange}
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
                    value={formData.dataAdmissao}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 mb-1">Conselho</label>
                    <input
                      type="text"
                      name="conselho"
                      value={formData.conselho}
                      onChange={handleChange}
                      placeholder="Ex: CRP, CRO, CREFITO"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-1">Número do Conselho</label>
                    <input
                      type="text"
                      name="numeroConselho"
                      value={formData.numeroConselho}
                      onChange={handleChange}
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
                      value={formData.endereco}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-1">Número</label>
                    <input
                      type="text"
                      name="numero"
                      value={formData.numero}
                      onChange={handleChange}
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
                      value={formData.bairro}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-1">CEP</label>
                    <input
                      type="text"
                      name="cep"
                      value={formData.cep}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 mb-1">Complemento</label>
                  <input
                    type="text"
                    name="complemento"
                    value={formData.complemento}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 mb-1">Cidade</label>
                    <input
                      type="text"
                      name="cidade"
                      value={formData.cidade}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-1">Estado</label>
                    <input
                      type="text"
                      name="estado"
                      value={formData.estado}
                      onChange={handleChange}
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
                    value={formData.contatoEmergencia}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-1">Telefone de Emergência</label>
                  <input
                    type="text"
                    name="telefoneEmergencia"
                    value={formData.telefoneEmergencia}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              {/* Seguro de Vida — somente visualização */}
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block text-gray-700 mb-1">Possui Seguro de Vida?</label>
                  <input
                    type="text"
                    value={formData.possuiSeguroVida === 'sim' ? 'Sim' : formData.possuiSeguroVida === 'nao' ? 'Não' : '—'}
                    readOnly
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg bg-gray-50 text-gray-700 cursor-default"
                  />
                </div>
                {formData.possuiSeguroVida === 'sim' && (
                  <div>
                    <label className="block text-gray-700 mb-1">Seguradora</label>
                    <input
                      type="text"
                      value={formData.seguradora || '—'}
                      readOnly
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg bg-gray-50 text-gray-700 cursor-default"
                    />
                  </div>
                )}
              </div>

              {formData.possuiSeguroVida === 'sim' && (
                <div className="mt-4">
                  <label className="block text-gray-700 mb-1">Apólice / Documento do Seguro (PDF)</label>
                  {seguroPdf ? (
                    <div className="flex items-center gap-3 p-3 border border-green-200 bg-green-50 rounded-lg">
                      <FileText className="w-5 h-5 text-green-600 flex-shrink-0" />
                      <span className="text-sm text-gray-700 flex-1 truncate">{seguroPdfNome}</span>
                      <a href={seguroPdf} download={seguroPdfNome} className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">Baixar</a>
                      <button type="button" onClick={() => { setSeguroPdf(null); setSeguroPdfNome(''); }} className="text-red-500 hover:text-red-700 text-sm">Remover</button>
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
                          if (file) { setSeguroPdf(URL.createObjectURL(file)); setSeguroPdfNome(file.name); }
                        }}
                      />
                    </label>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Botões de Ação */}
          <div className="flex gap-4 justify-end mt-8 pt-6 border-t border-gray-200">
            <button
              onClick={handleClear}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
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
  );
}