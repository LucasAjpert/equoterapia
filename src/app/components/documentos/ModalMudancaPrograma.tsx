import React from 'react';
import { X, FileText } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

// Nota: Certifique-se de que a interface MudancaProgramaData no ficheiro types 
// tem os campos de horário (diaAtual, horarioAtual, novoDia, novoHorario, motivoHorario)
import { MudancaProgramaData } from '../../../types/documentos.types';

interface ModalMudancaProgramaProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
  data: any; // Mantido como 'any' temporariamente se a sua interface não tiver os campos de horário novos
  onChange: (data: any) => void;
}

export function ModalMudancaPrograma({ 
  isOpen, 
  onClose, 
  onSave, 
  data, 
  onChange 
}: ModalMudancaProgramaProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl my-8">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 rounded-t-xl z-10">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl text-gray-900">Mudança de Programa e Horário</h2>
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
                <Label className="text-indigo-700">Tipo de Documento</Label>
                <Input
                  value={data.tipoDocumento}
                  readOnly
                  className="bg-white border-indigo-200 mt-1"
                />
              </div>
              <div>
                <Label className="text-indigo-700">CID</Label>
                <Input
                  value={data.cid}
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
              <div className="md:col-span-2">
                <Label className="text-indigo-700">Programa Atual</Label>
                <Input
                  value={data.programaAtual}
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
                value={data.novoPrograma}
                onValueChange={(value) => onChange({ ...data, novoPrograma: value })}
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
                    checked={data.motivos.evoluiu}
                    onChange={(e) => onChange({
                      ...data,
                      motivos: { ...data.motivos, evoluiu: e.target.checked }
                    })}
                    className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                  />
                  <span className="text-gray-700">Evoluiu</span>
                </label>

                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={data.motivos.novosObjetivos}
                    onChange={(e) => onChange({
                      ...data,
                      motivos: { ...data.motivos, novosObjetivos: e.target.checked }
                    })}
                    className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                  />
                  <span className="text-gray-700">Novos Objetivos</span>
                </label>

                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={data.motivos.trabalharNovasHabilidades}
                    onChange={(e) => onChange({
                      ...data,
                      motivos: { ...data.motivos, trabalharNovasHabilidades: e.target.checked }
                    })}
                    className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                  />
                  <span className="text-gray-700">Trabalhar Novas Habilidades</span>
                </label>

                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={data.motivos.regrediu}
                    onChange={(e) => onChange({
                      ...data,
                      motivos: { ...data.motivos, regrediu: e.target.checked }
                    })}
                    className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                  />
                  <span className="text-gray-700">Regrediu</span>
                </label>

                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={data.motivos.naoSeAdaptou}
                    onChange={(e) => onChange({
                      ...data,
                      motivos: { ...data.motivos, naoSeAdaptou: e.target.checked }
                    })}
                    className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                  />
                  <span className="text-gray-700">Não se Adaptou</span>
                </label>

                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={data.motivos.outros}
                    onChange={(e) => onChange({
                      ...data,
                      motivos: { ...data.motivos, outros: e.target.checked }
                    })}
                    className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                  />
                  <span className="text-gray-700">Outros</span>
                </label>
              </div>
            </div>

            {/* Outros Motivo - Condicional */}
            {data.motivos.outros && (
              <div>
                <Label htmlFor="outros-motivo">Especifique Outros Motivos *</Label>
                <textarea
                  id="outros-motivo"
                  value={data.outrosMotivo}
                  onChange={(e) => onChange({ ...data, outrosMotivo: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none mt-1"
                  placeholder="Descreva outros motivos para a mudança de programa..."
                />
              </div>
            )}

            {/* SECÇÃO: MUDANÇA DE HORÁRIO */}
            <section className="bg-blue-50/30 p-5 rounded-xl border border-blue-100 mb-6 mt-4">
              <h3 className="text-lg font-bold text-blue-800 mb-4 pb-2 border-b border-blue-200">
                Mudança de Horário / Dia
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                {/* Horário Atual */}
                <div className="space-y-3 bg-white p-4 rounded-lg border border-gray-200">
                  <h4 className="font-semibold text-gray-600 text-sm uppercase tracking-wider">Horário Atual</h4>
                  <div>
                    <Label className="text-gray-700 mb-1 block">Dia da Semana</Label>
                    <Input 
                      placeholder="Ex: Segunda-feira"
                      value={data.diaAtual || ''}
                      onChange={(e) => onChange({...data, diaAtual: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label className="text-gray-700 mb-1 block">Horário</Label>
                    <Input 
                      type="time"
                      value={data.horarioAtual || ''}
                      onChange={(e) => onChange({...data, horarioAtual: e.target.value})}
                    />
                  </div>
                </div>

                {/* Novo Horário */}
                <div className="space-y-3 bg-white p-4 rounded-lg border border-blue-300 shadow-sm">
                  <h4 className="font-semibold text-blue-600 text-sm uppercase tracking-wider">Novo Horário</h4>
                  <div>
                    <Label className="text-gray-700 mb-1 block">Novo Dia da Semana</Label>
                    <Input 
                      placeholder="Ex: Quarta-feira"
                      value={data.novoDia || ''}
                      onChange={(e) => onChange({...data, novoDia: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label className="text-gray-700 mb-1 block">Novo Horário</Label>
                    <Input 
                      type="time"
                      value={data.novoHorario || ''}
                      onChange={(e) => onChange({...data, novoHorario: e.target.value})}
                    />
                  </div>
                </div>
              </div>

              {/* Motivo da Mudança de Horário */}
              <div>
                <Label className="text-gray-700 mb-1 block">Motivo da Mudança de Horário</Label>
                <Textarea 
                  rows={2}
                  placeholder="Ex: Conflito com horário escolar, pedido dos pais..."
                  value={data.motivoHorario || ''}
                  onChange={(e) => onChange({...data, motivoHorario: e.target.value})}
                />
              </div>
            </section>
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
              Salvar Mudança
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}