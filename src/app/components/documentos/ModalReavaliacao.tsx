import React from 'react';
import { X, FileText } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { ReavaliacaoData } from '../../../types/documentos.types';

interface ModalReavaliacaoProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
  data: ReavaliacaoData;
  onChange: (data: ReavaliacaoData) => void;
}

export function ModalReavaliacao({ isOpen, onClose, onSave, data, onChange }: ModalReavaliacaoProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl my-8">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 rounded-t-xl z-10">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl text-gray-900">Formulário de Reavaliação</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="px-6 py-6 space-y-6 max-h-[calc(100vh-200px)] overflow-y-auto custom-scrollbar">
          {/* Dados Automáticos */}
          <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
            <h3 className="text-lg text-indigo-900 mb-4">Dados do Praticante</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="text-indigo-700">Nome do Praticante</Label>
                <Input
                  value={data.nomePraticante}
                  readOnly
                  className="bg-white border-indigo-200 mt-1"
                />
              </div>
              <div>
                <Label className="text-indigo-700">Idade</Label>
                <Input
                  value={`${data.idade} anos`}
                  readOnly
                  className="bg-white border-indigo-200 mt-1"
                />
              </div>
              <div>
                <Label className="text-indigo-700">Data de Nascimento</Label>
                <Input
                  value={data.dataNascimento}
                  readOnly
                  className="bg-white border-indigo-200 mt-1"
                />
              </div>
              <div>
                <Label className="text-indigo-700">Diagnóstico</Label>
                <Input
                  value={data.diagnostico}
                  readOnly
                  className="bg-white border-indigo-200 mt-1"
                />
              </div>
              <div className="md:col-span-2">
                <Label className="text-indigo-700">Queixa</Label>
                <Input
                  value={data.queixa}
                  readOnly
                  className="bg-white border-indigo-200 mt-1"
                />
              </div>
              <div className="md:col-span-2">
                <Label className="text-indigo-700">Objetivo</Label>
                <Input
                  value={data.objetivo}
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
                value={data.medicamento}
                onChange={(e) => onChange({ ...data, medicamento: e.target.value })}
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
                value={data.observacoes}
                onChange={(e) => onChange({ ...data, observacoes: e.target.value })}
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
                value={data.conclusao}
                onChange={(e) => onChange({ ...data, conclusao: e.target.value })}
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
                          value={data.horarios.segunda}
                          onChange={(e) => onChange({
                            ...data,
                            horarios: { ...data.horarios, segunda: e.target.value }
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
                          value={data.horarios.terca}
                          onChange={(e) => onChange({
                            ...data,
                            horarios: { ...data.horarios, terca: e.target.value }
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
                          value={data.horarios.quarta}
                          onChange={(e) => onChange({
                            ...data,
                            horarios: { ...data.horarios, quarta: e.target.value }
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
                          value={data.horarios.quinta}
                          onChange={(e) => onChange({
                            ...data,
                            horarios: { ...data.horarios, quinta: e.target.value }
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
                          value={data.horarios.sexta}
                          onChange={(e) => onChange({
                            ...data,
                            horarios: { ...data.horarios, sexta: e.target.value }
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
        <div className="sticky bottom-0 bg-white border-t border-gray-200 px-6 py-4 rounded-b-xl z-10">
          <div className="flex gap-3 justify-end">
            <Button
              variant="outline"
              onClick={onClose}
              className="px-6"
            >
              Cancelar
            </Button>
            <Button
              onClick={onSave}
              className="bg-indigo-600 hover:bg-indigo-700 px-6"
            >
              <FileText className="h-4 w-4 mr-2" />
              Salvar Reavaliação
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}