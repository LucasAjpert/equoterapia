import React from 'react';
import { X, FileText } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Checkbox } from '../ui/checkbox';
import { Textarea } from '../ui/textarea';
import { AvaliacaoInicialData, TerapiaItem } from '../../../types/documentos.types';

interface ModalAvaliacaoInicialEstruturalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
  data: AvaliacaoInicialData;
  onChange: (data: AvaliacaoInicialData) => void;
}

export function ModalAvaliacaoInicialEstrutural({ isOpen, onClose, onSave, data, onChange }: ModalAvaliacaoInicialEstruturalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl my-8 mx-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 rounded-t-xl z-10">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl text-gray-900">Avaliação Inicial Estrutural</h2>
            <button
              onClick={onClose}
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
                <Input value={data.nomePraticante} readOnly className="bg-gray-50 border-indigo-200 mt-1" />
              </div>
              <div>
                <Label className="text-indigo-700">Idade</Label>
                <Input value={data.idade ? `${data.idade} anos` : ''} readOnly className="bg-gray-50 border-indigo-200 mt-1" />
              </div>
              <div>
                <Label className="text-indigo-700">Data de Nascimento</Label>
                <Input value={data.dataNascimento} readOnly className="bg-gray-50 border-indigo-200 mt-1" />
              </div>
              <div>
                <Label className="text-indigo-700">Diagnóstico</Label>
                <Input value={data.diagnostico} readOnly className="bg-gray-50 border-indigo-200 mt-1" />
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
                  value={data.encaminhadoPor}
                  onChange={(e) => onChange({ ...data, encaminhadoPor: e.target.value })}
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
                        checked={data.jaFezEquo === v}
                        onChange={() => onChange({ ...data, jaFezEquo: v, tempoFezEquo: '', tempoPausaEquo: '' })}
                        className="w-4 h-4 text-indigo-600"
                      />
                      <span className="text-gray-700">{v === 'sim' ? 'Sim' : 'Não'}</span>
                    </label>
                  ))}
                </div>
              </div>

              {data.jaFezEquo === 'sim' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-4 border-l-2 border-indigo-100">
                  <div>
                    <Label htmlFor="tempoFezEquo">Quanto tempo fez?</Label>
                    <Input
                      id="tempoFezEquo"
                      value={data.tempoFezEquo}
                      onChange={(e) => onChange({ ...data, tempoFezEquo: e.target.value })}
                      placeholder="Ex: 1 ano e 6 meses"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="tempoPausaEquo">Está sem tratamento há quanto tempo?</Label>
                    <Input
                      id="tempoPausaEquo"
                      value={data.tempoPausaEquo}
                      onChange={(e) => onChange({ ...data, tempoPausaEquo: e.target.value })}
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
                        checked={data.jaAndouCavalo === v}
                        onChange={() => onChange({ ...data, jaAndouCavalo: v, tempoAndouCavalo: '', tempoPausaCavalo: '' })}
                        className="w-4 h-4 text-indigo-600"
                      />
                      <span className="text-gray-700">{v === 'sim' ? 'Sim' : 'Não'}</span>
                    </label>
                  ))}
                </div>
              </div>

              {data.jaAndouCavalo === 'sim' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-4 border-l-2 border-indigo-100">
                  <div>
                    <Label htmlFor="tempoAndouCavalo">Quanto tempo andou?</Label>
                    <Input
                      id="tempoAndouCavalo"
                      value={data.tempoAndouCavalo}
                      onChange={(e) => onChange({ ...data, tempoAndouCavalo: e.target.value })}
                      placeholder="Ex: 2 anos"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="tempoPausaCavalo">Está sem andar há quanto tempo?</Label>
                    <Input
                      id="tempoPausaCavalo"
                      value={data.tempoPausaCavalo}
                      onChange={(e) => onChange({ ...data, tempoPausaCavalo: e.target.value })}
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
                        checked={data.possuiHistoricoTerapeutico === v}
                        onChange={() => onChange({ ...data, possuiHistoricoTerapeutico: v })}
                        className="w-4 h-4 text-indigo-600"
                      />
                      <span className="text-gray-700">{v === 'sim' ? 'Sim' : 'Não'}</span>
                    </label>
                  ))}
                </div>
              </div>

              {data.possuiHistoricoTerapeutico === 'sim' && (
                <div className="space-y-4 pl-4 border-l-2 border-indigo-100">

                  {/* Helper para terapias simples (nome + tempo) */}
                  {(
                    [
                      { key: 'terapiaOcupacional', label: 'Terapia Ocupacional' },
                      { key: 'fonoaudiologia', label: 'Fonoaudiologia' },
                      { key: 'psicologia', label: 'Psicologia' },
                      { key: 'educacaoFisica', label: 'Educação Física' },
                      { key: 'hidroterapia', label: 'Hidroterapia' },
                    ] as { key: 'terapiaOcupacional' | 'fonoaudiologia' | 'psicologia' | 'educacaoFisica' | 'hidroterapia'; label: string }[]
                  ).map(({ key, label }) => {
                    const item = data[key] as TerapiaItem;
                    return (
                      <div key={key} className="space-y-2">
                        <label className="flex items-center gap-2 cursor-pointer font-medium text-gray-800">
                          <input
                            type="checkbox"
                            checked={item.ativo}
                            onChange={(e) => onChange({ ...data, [key]: { ...item, ativo: e.target.checked } })}
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
                                onChange={(e) => onChange({ ...data, [key]: { ...item, nome: e.target.value } })}
                                placeholder="Nome"
                                className="mt-1 h-8 text-sm"
                              />
                            </div>
                            <div>
                              <Label className="text-sm text-gray-600">Quanto tempo?</Label>
                              <Input
                                value={item.tempo}
                                onChange={(e) => onChange({ ...data, [key]: { ...item, tempo: e.target.value } })}
                                placeholder="Ex: 1 ano"
                                className="mt-1 h-8 text-sm"
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}

                  {/* Fisioterapia */}
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 cursor-pointer font-medium text-gray-800">
                      <input
                        type="checkbox"
                        checked={data.fisioterapia.ativo}
                        onChange={(e) => onChange({ ...data, fisioterapia: { ...data.fisioterapia, ativo: e.target.checked } })}
                        className="w-4 h-4 text-indigo-600 rounded"
                      />
                      Fisioterapia
                    </label>
                    {data.fisioterapia.ativo && (
                      <div className="grid grid-cols-3 gap-3 ml-6">
                        <div>
                          <Label className="text-sm text-gray-600">Já fez / Faz</Label>
                          <select
                            value={data.fisioterapia.jaFezFaz}
                            onChange={(e) => onChange({ ...data, fisioterapia: { ...data.fisioterapia, jaFezFaz: e.target.value } })}
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
                            value={data.fisioterapia.nome}
                            onChange={(e) => onChange({ ...data, fisioterapia: { ...data.fisioterapia, nome: e.target.value } })}
                            placeholder="Nome"
                            className="mt-1 h-8 text-sm"
                          />
                        </div>
                        <div>
                          <Label className="text-sm text-gray-600">Quanto tempo?</Label>
                          <Input
                            value={data.fisioterapia.tempo}
                            onChange={(e) => onChange({ ...data, fisioterapia: { ...data.fisioterapia, tempo: e.target.value } })}
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
                        checked={data.escola.ativo}
                        onChange={(e) => onChange({ ...data, escola: { ...data.escola, ativo: e.target.checked } })}
                        className="w-4 h-4 text-indigo-600 rounded"
                      />
                      Escola
                    </label>
                    {data.escola.ativo && (
                      <div className="grid grid-cols-2 gap-3 ml-6">
                        <div>
                          <Label className="text-sm text-gray-600">Qual escola?</Label>
                          <Input
                            value={data.escola.qualEscola}
                            onChange={(e) => onChange({ ...data, escola: { ...data.escola, qualEscola: e.target.value } })}
                            placeholder="Nome da escola"
                            className="mt-1 h-8 text-sm"
                          />
                        </div>
                        <div>
                          <Label className="text-sm text-gray-600">Série</Label>
                          <Input
                            value={data.escola.serie}
                            onChange={(e) => onChange({ ...data, escola: { ...data.escola, serie: e.target.value } })}
                            placeholder="Ex: 3º ano"
                            className="mt-1 h-8 text-sm"
                          />
                        </div>
                        <div>
                          <Label className="text-sm text-gray-600">Reprovações</Label>
                          <Input
                            value={data.escola.reprovacoes}
                            onChange={(e) => onChange({ ...data, escola: { ...data.escola, reprovacoes: e.target.value } })}
                            placeholder="Ex: 2 reprovações"
                            className="mt-1 h-8 text-sm"
                          />
                        </div>
                        <div>
                          <Label className="text-sm text-gray-600">Dificuldades</Label>
                          <Input
                            value={data.escola.dificuldades}
                            onChange={(e) => onChange({ ...data, escola: { ...data.escola, dificuldades: e.target.value } })}
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
                        checked={data.medica.ativo}
                        onChange={(e) => onChange({ ...data, medica: { ...data.medica, ativo: e.target.checked } })}
                        className="w-4 h-4 text-indigo-600 rounded"
                      />
                      Médica
                    </label>
                    {data.medica.ativo && (
                      <div className="grid grid-cols-3 gap-3 ml-6">
                        <div>
                          <Label className="text-sm text-gray-600">Qual área?</Label>
                          <Input
                            value={data.medica.qualArea}
                            onChange={(e) => onChange({ ...data, medica: { ...data.medica, qualArea: e.target.value } })}
                            placeholder="Ex: neurologia"
                            className="mt-1 h-8 text-sm"
                          />
                        </div>
                        <div>
                          <Label className="text-sm text-gray-600">Nome do médico</Label>
                          <Input
                            value={data.medica.nome}
                            onChange={(e) => onChange({ ...data, medica: { ...data.medica, nome: e.target.value } })}
                            placeholder="Nome"
                            className="mt-1 h-8 text-sm"
                          />
                        </div>
                        <div>
                          <Label className="text-sm text-gray-600">Quanto tempo?</Label>
                          <Input
                            value={data.medica.tempo}
                            onChange={(e) => onChange({ ...data, medica: { ...data.medica, tempo: e.target.value } })}
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
                        checked={data.atividadeFisica.ativo}
                        onChange={(e) => onChange({ ...data, atividadeFisica: { ...data.atividadeFisica, ativo: e.target.checked } })}
                        className="w-4 h-4 text-indigo-600 rounded"
                      />
                      Já fez / Faz atividade física / esporte
                    </label>
                    {data.atividadeFisica.ativo && (
                      <div className="grid grid-cols-2 gap-3 ml-6">
                        <div>
                          <Label className="text-sm text-gray-600">Qual?</Label>
                          <Input
                            value={data.atividadeFisica.qual}
                            onChange={(e) => onChange({ ...data, atividadeFisica: { ...data.atividadeFisica, qual: e.target.value } })}
                            placeholder="Ex: natação, futebol..."
                            className="mt-1 h-8 text-sm"
                          />
                        </div>
                        <div>
                          <Label className="text-sm text-gray-600">Quanto tempo?</Label>
                          <Input
                            value={data.atividadeFisica.tempo}
                            onChange={(e) => onChange({ ...data, atividadeFisica: { ...data.atividadeFisica, tempo: e.target.value } })}
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
                      value={data.rotinaMelhorHorario}
                      onChange={(e) => onChange({ ...data, rotinaMelhorHorario: e.target.value })}
                      placeholder="Ex: manhã, após a escola..."
                      className="mt-1"
                    />
                  </div>

                  {/* Outro */}
                  <div>
                    <Label className="font-medium text-gray-800">Outro</Label>
                    <textarea
                      value={data.outroHistorico}
                      onChange={(e) => onChange({ ...data, outroHistorico: e.target.value })}
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
                        checked={data.usaMedicamento === v}
                        onChange={() => onChange({
                          ...data,
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

              {data.usaMedicamento === 'sim' && (
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
                        {data.medicamentos.map((med, idx) => (
                          <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                            <td className="px-2 py-1.5">
                              <input type="text" value={med.medicacao}
                                onChange={(e) => { const updated = data.medicamentos.map((m, i) => i === idx ? { ...m, medicacao: e.target.value } : m); onChange({ ...data, medicamentos: updated }); }}
                                placeholder="Nome da medicação"
                                className="w-full px-2 py-1 border border-gray-200 rounded focus:ring-1 focus:ring-indigo-400 text-sm bg-transparent" />
                            </td>
                            <td className="px-2 py-1.5">
                              <input type="text" value={med.dosagem}
                                onChange={(e) => { const updated = data.medicamentos.map((m, i) => i === idx ? { ...m, dosagem: e.target.value } : m); onChange({ ...data, medicamentos: updated }); }}
                                placeholder="Ex: 10mg"
                                className="w-full px-2 py-1 border border-gray-200 rounded focus:ring-1 focus:ring-indigo-400 text-sm bg-transparent" />
                            </td>
                            <td className="px-2 py-1.5">
                              <input type="text" value={med.horario}
                                onChange={(e) => { const updated = data.medicamentos.map((m, i) => i === idx ? { ...m, horario: e.target.value } : m); onChange({ ...data, medicamentos: updated }); }}
                                placeholder="Ex: manhã"
                                className="w-full px-2 py-1 border border-gray-200 rounded focus:ring-1 focus:ring-indigo-400 text-sm bg-transparent" />
                            </td>
                            <td className="px-2 py-1.5">
                              <input type="text" value={med.finalidade}
                                onChange={(e) => { const updated = data.medicamentos.map((m, i) => i === idx ? { ...m, finalidade: e.target.value } : m); onChange({ ...data, medicamentos: updated }); }}
                                placeholder="Ex: controle de comportamento"
                                className="w-full px-2 py-1 border border-gray-200 rounded focus:ring-1 focus:ring-indigo-400 text-sm bg-transparent" />
                            </td>
                            <td className="px-2 py-1.5 text-center">
                              {data.medicamentos.length > 1 && (
                                <button type="button"
                                  onClick={() => onChange({ ...data, medicamentos: data.medicamentos.filter((_, i) => i !== idx) })}
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
                    onClick={() => onChange({ ...data, medicamentos: [...data.medicamentos, { medicacao: '', dosagem: '', horario: '', finalidade: '' }] })}
                    className="text-sm text-indigo-600 hover:text-indigo-800 flex items-center gap-1 transition-colors">
                    + Adicionar medicamento
                  </button>

                  {/* Como fica com/sem */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="comMedicacao">Como fica com medicação</Label>
                      <textarea id="comMedicacao" value={data.comoFicaComMedicacao}
                        onChange={(e) => onChange({ ...data, comoFicaComMedicacao: e.target.value })}
                        rows={3} placeholder="Descreva o comportamento / estado com medicação..."
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none mt-1 text-sm" />
                    </div>
                    <div>
                      <Label htmlFor="semMedicacao">Como fica sem medicação</Label>
                      <textarea id="semMedicacao" value={data.comoFicaSemMedicacao}
                        onChange={(e) => onChange({ ...data, comoFicaSemMedicacao: e.target.value })}
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
                  ] as { key: keyof typeof data.anamnese; label: string }[]).map(({ key, label }, idx) => (
                    <tr key={key} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-4 py-2 font-medium text-gray-700 align-top pt-3">{label}</td>
                      <td className="px-2 py-1.5">
                        <textarea
                          value={data.anamnese[key].resposta}
                          onChange={(e) => onChange({
                            ...data,
                            anamnese: {
                              ...data.anamnese,
                              [key]: { ...data.anamnese[key], resposta: e.target.value }
                            }
                          })}
                          rows={2}
                          placeholder="Resposta..."
                          className="w-full px-2 py-1 border border-gray-200 rounded focus:ring-1 focus:ring-indigo-400 focus:border-indigo-400 text-sm bg-transparent resize-none"
                        />
                      </td>
                      <td className="px-2 py-1.5">
                        <textarea
                          value={data.anamnese[key].observacoes}
                          onChange={(e) => onChange({
                            ...data,
                            anamnese: {
                              ...data.anamnese,
                              [key]: { ...data.anamnese[key], observacoes: e.target.value }
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
                  ] as { key: keyof typeof data.gestacao; label: string; tipo: string }[]).map(({ key, label, tipo }, idx) => {
                    const item = data.gestacao[key];
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
                                    onChange={() => onChange({ ...data, gestacao: { ...data.gestacao, [key]: { ...item, valor: v } } })}
                                    className="w-3.5 h-3.5 text-indigo-600" />
                                  <span className="text-gray-700">{v === 'sim' ? 'Sim' : 'Não'}</span>
                                </label>
                              ))}
                            </div>
                          ) : (
                            <input type="text" value={item.valor}
                              onChange={(e) => onChange({ ...data, gestacao: { ...data.gestacao, [key]: { ...item, valor: e.target.value } } })}
                              placeholder="Ex: 38 semanas"
                              className="w-full px-2 py-1 border border-gray-200 rounded focus:ring-1 focus:ring-indigo-400 text-sm bg-transparent" />
                          )}
                        </td>
                        <td className="px-2 py-1.5 align-top">
                          {showObs && (
                            <textarea value={item.obs}
                              onChange={(e) => onChange({ ...data, gestacao: { ...data.gestacao, [key]: { ...item, obs: e.target.value } } })}
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
                  ] as { key: keyof typeof data.parto; label: string; tipo: string }[]).map(({ key, label, tipo }, idx) => {
                    const item = data.parto[key];
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
                                    onChange={() => onChange({ ...data, parto: { ...data.parto, [key]: { ...item, valor: v } } })}
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
                                    onChange={() => onChange({ ...data, parto: { ...data.parto, [key]: { ...item, valor: v } } })}
                                    className="w-3.5 h-3.5 text-indigo-600" />
                                  <span className="text-gray-700 capitalize">{v}</span>
                                </label>
                              ))}
                            </div>
                          )}
                          {tipo === 'texto' && (
                            <input type="text" value={item.valor}
                              onChange={(e) => onChange({ ...data, parto: { ...data.parto, [key]: { ...item, valor: e.target.value } } })}
                              placeholder={key === 'pesoAoNascer' ? 'Ex: 3,2 kg' : 'Ex: 8/9'}
                              className="w-full px-2 py-1 border border-gray-200 rounded focus:ring-1 focus:ring-indigo-400 text-sm bg-transparent" />
                          )}
                        </td>
                        <td className="px-2 py-1.5 align-top">
                          {showObs && (
                            <textarea value={item.obs}
                              onChange={(e) => onChange({ ...data, parto: { ...data.parto, [key]: { ...item, obs: e.target.value } } })}
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
                  ] as { key: keyof typeof data.desenvolvimentoMotor; label: string }[]).map(({ key, label }, idx) => {
                    const item = data.desenvolvimentoMotor[key];
                    return (
                      <tr key={key} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                        <td className="px-4 py-2 font-medium text-gray-700">{label}</td>
                        <td className="px-2 py-1.5">
                          <input
                            type="text"
                            value={item.idade}
                            onChange={(e) => onChange({
                              ...data,
                              desenvolvimentoMotor: {
                                ...data.desenvolvimentoMotor,
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
                            onChange={(e) => onChange({
                              ...data,
                              desenvolvimentoMotor: {
                                ...data.desenvolvimentoMotor,
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
                  ] as { key: keyof Omit<typeof data.desenvolvimentoLinguagem, 'obsGestaDesenvolvimento'>; label: string }[]).map(({ key, label }, idx) => {
                    const item = data.desenvolvimentoLinguagem[key] as { idade: string; obs: string };
                    return (
                      <tr key={key} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                        <td className="px-4 py-2 font-medium text-gray-700">{label}</td>
                        <td className="px-2 py-1.5">
                          <input
                            type="text"
                            value={item.idade}
                            onChange={(e) => onChange({
                              ...data,
                              desenvolvimentoLinguagem: {
                                ...data.desenvolvimentoLinguagem,
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
                            onChange={(e) => onChange({
                              ...data,
                              desenvolvimentoLinguagem: {
                                ...data.desenvolvimentoLinguagem,
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
                value={data.desenvolvimentoLinguagem.obsGestaDesenvolvimento}
                onChange={(e) => onChange({
                  ...data,
                  desenvolvimentoLinguagem: {
                    ...data.desenvolvimentoLinguagem,
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
              ] as { key: keyof Omit<typeof data.saudeFisica, 'etc'>; label: string }[]).map(({ key, label }) => (
                <label key={key} className="flex items-center gap-2 cursor-pointer bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 hover:bg-indigo-50 hover:border-indigo-300 transition-colors">
                  <input
                    type="checkbox"
                    checked={data.saudeFisica[key] as boolean}
                    onChange={(e) => onChange({
                      ...data,
                      saudeFisica: { ...data.saudeFisica, [key]: e.target.checked },
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
                value={data.saudeFisica.etc}
                onChange={(e) => onChange({
                  ...data,
                  saudeFisica: { ...data.saudeFisica, etc: e.target.value },
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
                  ] as { key: keyof typeof data.aspectosFisiologicos; label: string }[]).map(({ key, label }, idx) => (
                    <tr key={key} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-4 py-2 font-medium text-gray-700">{label}</td>
                      <td className="px-2 py-1.5">
                        <textarea
                          value={data.aspectosFisiologicos[key]}
                          onChange={(e) => onChange({
                            ...data,
                            aspectosFisiologicos: { ...data.aspectosFisiologicos, [key]: e.target.value },
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
                  value={data.queixaObjetivo.descricaoDemanda}
                  onChange={(e) => onChange({
                    ...data,
                    queixaObjetivo: { ...data.queixaObjetivo, descricaoDemanda: e.target.value },
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
                  value={data.queixaObjetivo.historicodoenca}
                  onChange={(e) => onChange({
                    ...data,
                    queixaObjetivo: { ...data.queixaObjetivo, historicodoenca: e.target.value },
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
                  value={data.queixaObjetivo.expectativaTratamento}
                  onChange={(e) => onChange({
                    ...data,
                    queixaObjetivo: { ...data.queixaObjetivo, expectativaTratamento: e.target.value },
                  })}
                  rows={3}
                  placeholder="Qual a expectativa da família com o tratamento equoterapêutico..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none mt-1 text-sm"
                />
              </div>
            </div>
          </section>

          {/* Seção de Contraindicações */}
          <section className="space-y-4 border p-6 rounded-lg bg-red-50/50 border-red-100">
            <div>
              <h3 className="text-red-800 font-semibold text-lg mb-1">Contraindicações Absolutas e Principais</h3>
              <p className="text-sm text-red-600 mb-4">Assinale as opções aplicáveis e adicione observações caso necessário.</p>
            </div>
            
            <div className="grid grid-cols-1 gap-4">
              {data.contraindicacoes?.map((item: any, index: number) => (
                <div key={item.id} className="space-y-3 bg-white p-3 rounded-md border border-gray-200">
                  <div className="flex items-start space-x-3">
                    <Checkbox 
                      id={item.id} 
                      checked={item.ativo}
                      onCheckedChange={(checked) => {
                        const novasContra = [...data.contraindicacoes];
                        novasContra[index].ativo = checked === true;
                        onChange({...data, contraindicacoes: novasContra});
                      }}
                      className="mt-1"
                    />
                    <Label htmlFor={item.id} className="text-sm font-medium text-gray-700 leading-snug cursor-pointer">
                      {item.label}
                    </Label>
                  </div>
                  
                  {item.ativo && (
                    <div className="pl-7 mt-2">
                      <Textarea 
                        placeholder="Descreva detalhes, recomendações ou complementos sobre esta condição..." 
                        value={item.obs}
                        onChange={(e) => {
                          const novasContra = [...data.contraindicacoes];
                          novasContra[index].obs = e.target.value;
                          onChange({...data, contraindicacoes: novasContra});
                        }}
                        rows={2}
                        className="bg-gray-50"
                      />
                    </div>
                  )}
                </div>
              ))}
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
                  ] as { key: keyof typeof data.rotina; label: string }[]).map(({ key, label }, idx) => (
                    <tr key={key} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-3 py-2 font-medium text-gray-700 whitespace-nowrap">{label}</td>
                      {(['segunda', 'terca', 'quarta', 'quinta', 'sexta', 'sabado'] as const).map(dia => (
                        <td key={dia} className="px-1.5 py-1.5">
                          <input
                            type="text"
                            value={data.rotina[key][dia]}
                            onChange={(e) => onChange({
                              ...data,
                              rotina: {
                                ...data.rotina,
                                [key]: { ...data.rotina[key], [dia]: e.target.value },
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
        <div className="border-t border-gray-200 px-6 py-4 rounded-b-xl z-10">
          <div className="flex gap-3 justify-center">
            <Button variant="outline" onClick={onClose} className="px-8">
              Cancelar
            </Button>
            <Button onClick={onSave} className="bg-indigo-600 hover:bg-indigo-700 px-8">
              <FileText className="h-4 w-4 mr-2" />
              Salvar Avaliação Inicial Estrutural
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}