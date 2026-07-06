import { useState } from 'react';
import { Save, X, Upload, PawPrint, Search } from 'lucide-react';

export function CavaloPage() {
  const [abaAtiva, setAbaAtiva] = useState<'geral' | 'observacoes'>('geral');
  const [fotoCavalo, setFotoCavalo] = useState<string | null>(null);
  const [observacoesTexto, setObservacoesTexto] = useState('');
  const [formData, setFormData] = useState({
    nomeCavalo: '',
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
    // Passo do cavalo
    antepista: false,
    sobrepista: false,
    transpista: false,
    // Andamento
    andareco: false,
    machaBatida: false,
    machaPicada: false,
    machaTrotada: false,
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFotoCavalo(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSave = () => {
    console.log('Salvando cavalo:', formData);
  };

  const handleSaveObservacoes = () => {
    console.log('Salvando observações:', observacoesTexto);
  };

  const handleClear = () => {
    setFotoCavalo(null);
    setFormData({
      nomeCavalo: '',
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
      antepista: false,
      sobrepista: false,
      transpista: false,
      andareco: false,
      machaBatida: false,
      machaPicada: false,
      machaTrotada: false,
    });
  };

  return (
    <div className="flex-1 flex flex-col bg-gray-50 overflow-hidden">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-8 py-6">
        <h1 className="text-indigo-700">Cavalo</h1>
        <p className="text-gray-600 mt-1">Cadastro e gerenciamento de cavalos</p>
      </div>

      {/* Conteúdo */}
      <div className="flex-1 overflow-y-auto px-8 py-6">
        <div className="max-w-7xl mx-auto">
          {/* Barra de Pesquisa */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
            <div className="flex gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Pesquisar cavalo..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <button className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                Pesquisar
              </button>
            </div>
          </div>

          {/* Formulário */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            {/* Abas de Navegação */}
            <div className="border-b border-gray-200">
              <div className="flex">
                <button
                  onClick={() => setAbaAtiva('geral')}
                  className={`px-6 py-4 transition-colors relative ${
                    abaAtiva === 'geral'
                      ? 'text-indigo-600 border-b-2 border-indigo-600'
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  Geral
                </button>
                <button
                  onClick={() => setAbaAtiva('observacoes')}
                  className={`px-6 py-4 transition-colors relative ${
                    abaAtiva === 'observacoes'
                      ? 'text-indigo-600 border-b-2 border-indigo-600'
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  Observações
                </button>
              </div>
            </div>

            {/* Conteúdo das Abas */}
            <div className="p-6">
              {abaAtiva === 'geral' ? (
                <>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Coluna Esquerda */}
                    <div className="space-y-6">
                      {/* Área de Foto */}
                      <div className="flex justify-center">
                        <div className="relative">
                          <div className="w-32 h-40 border-2 border-dashed border-indigo-300 rounded-lg flex items-center justify-center bg-indigo-50 overflow-hidden">
                            {fotoCavalo ? (
                              <img src={fotoCavalo} alt="Foto" className="w-full h-full object-cover" />
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
                          <label className="block text-gray-700 mb-1">Nome do Cavalo</label>
                          <input
                            type="text"
                            name="nomeCavalo"
                            value={formData.nomeCavalo}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          />
                        </div>

                        <div className="grid grid-cols-3 gap-4">
                          <div>
                            <label className="block text-gray-700 mb-1">Raça</label>
                            <input
                              type="text"
                              name="raca"
                              value={formData.raca}
                              onChange={handleChange}
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                          </div>
                          <div>
                            <label className="block text-gray-700 mb-1">Espécie</label>
                            <input
                              type="text"
                              name="especie"
                              value={formData.especie}
                              onChange={handleChange}
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                          </div>
                          <div>
                            <label className="block text-gray-700 mb-1">Sexo</label>
                            <input
                              type="text"
                              name="sexo"
                              value={formData.sexo}
                              onChange={handleChange}
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-gray-700 mb-1">Pelagem</label>
                          <input
                            type="text"
                            name="pelagem"
                            value={formData.pelagem}
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
                            <label className="block text-gray-700 mb-1">Registro</label>
                            <input
                              type="text"
                              name="registro"
                              value={formData.registro}
                              onChange={handleChange}
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
                              value={formData.proprietario}
                              onChange={handleChange}
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                          </div>
                          <div>
                            <label className="block text-gray-700 mb-1">Temperamento</label>
                            <input
                              type="text"
                              name="temperamento"
                              value={formData.temperamento}
                              onChange={handleChange}
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
                            value={formData.peso}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-gray-700 mb-1">Comprimento de Pescoço</label>
                            <input
                              type="text"
                              name="comprimentoPescoco"
                              value={formData.comprimentoPescoco}
                              onChange={handleChange}
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                          </div>
                          <div>
                            <label className="block text-gray-700 mb-1">Largura de Tronco</label>
                            <input
                              type="text"
                              name="larguraTronco"
                              value={formData.larguraTronco}
                              onChange={handleChange}
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
                              value={formData.alturaCernelha}
                              onChange={handleChange}
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                          </div>
                          <div>
                            <label className="block text-gray-700 mb-1">Altura Anca</label>
                            <input
                              type="text"
                              name="alturaAnca"
                              value={formData.alturaAnca}
                              onChange={handleChange}
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-gray-700 mb-1">Comprimento</label>
                          <input
                            type="text"
                            name="comprimento"
                            value={formData.comprimento}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          />
                        </div>
                      </div>

                      {/* Passo do Cavalo */}
                      <div className="space-y-4">
                        <h3 className="text-indigo-700">Passo do Cavalo</h3>
                        
                        <div className="space-y-2">
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="checkbox"
                              name="antepista"
                              checked={formData.antepista}
                              onChange={handleChange}
                              className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                            />
                            <span className="text-gray-700">Antepista</span>
                          </label>

                          <label className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="checkbox"
                              name="sobrepista"
                              checked={formData.sobrepista}
                              onChange={handleChange}
                              className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                            />
                            <span className="text-gray-700">Sobrepista</span>
                          </label>

                          <label className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="checkbox"
                              name="transpista"
                              checked={formData.transpista}
                              onChange={handleChange}
                              className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                            />
                            <span className="text-gray-700">Transpista</span>
                          </label>
                        </div>
                      </div>

                      {/* Marcha */}
                      <div className="space-y-4">
                        <h3 className="text-indigo-700">Marcha</h3>
                        
                        <div className="space-y-2">
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="checkbox"
                              name="andareco"
                              checked={formData.andareco}
                              onChange={handleChange}
                              className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                            />
                            <span className="text-gray-700">Andareco</span>
                          </label>

                          <label className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="checkbox"
                              name="machaBatida"
                              checked={formData.machaBatida}
                              onChange={handleChange}
                              className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                            />
                            <span className="text-gray-700">Marcha Batida</span>
                          </label>

                          <label className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="checkbox"
                              name="machaPicada"
                              checked={formData.machaPicada}
                              onChange={handleChange}
                              className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                            />
                            <span className="text-gray-700">Marcha Picada</span>
                          </label>

                          <label className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="checkbox"
                              name="machaTrotada"
                              checked={formData.machaTrotada}
                              onChange={handleChange}
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
                            value={formData.historicoMedico}
                            onChange={handleChange}
                            rows={3}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                          />
                        </div>

                        <div>
                          <label className="block text-gray-700 mb-1">Vacinação</label>
                          <textarea
                            name="vacinacao"
                            value={formData.vacinacao}
                            onChange={handleChange}
                            rows={2}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                          />
                        </div>

                        <div>
                          <label className="block text-gray-700 mb-1">Última Vermifugação</label>
                          <input
                            type="date"
                            name="ultimaVermifugacao"
                            value={formData.ultimaVermifugacao}
                            onChange={handleChange}
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
                            value={formData.alimentacao}
                            onChange={handleChange}
                            rows={3}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                          />
                        </div>

                        <div>
                          <label className="block text-gray-700 mb-1">Restrições</label>
                          <textarea
                            name="restricoes"
                            value={formData.restricoes}
                            onChange={handleChange}
                            rows={2}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                          />
                        </div>

                        <div>
                          <label className="block text-gray-700 mb-1">Histórico do Cavalo</label>
                          <textarea
                            name="observacoes"
                            value={formData.observacoes}
                            onChange={handleChange}
                            rows={3}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

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
                </>
              ) : (
                <>
                  <div className="space-y-4">
                    <h3 className="text-indigo-700">Observações</h3>
                    
                    <textarea
                      value={observacoesTexto}
                      onChange={(e) => setObservacoesTexto(e.target.value)}
                      rows={5}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                    />
                  </div>

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
                      onClick={handleSaveObservacoes}
                      className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2"
                    >
                      <Save className="w-4 h-4" />
                      Salvar
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}