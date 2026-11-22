import React from 'react';
import { X, FileText } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { MudancaMediacaoData } from '../../../types/documentos.types';

interface ModalMudancaMediacaoProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
  data: MudancaMediacaoData;
  onChange: (data: MudancaMediacaoData) => void;
  colaboradores: string[];
}

export function ModalMudancaMediacao({ 
  isOpen, 
  onClose, 
  onSave, 
  data, 
  onChange, 
  colaboradores 
}: ModalMudancaMediacaoProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl my-8">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 rounded-t-xl z-10">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl text-gray-900">Formulário de Mudança de Mediação</h2>
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
            
            {/* Mediador Atual */}
            <div>
              <Label htmlFor="mediador-atual">Mediador Atual</Label>
              <Input
                id="mediador-atual"
                value={data.mediadorAtual}
                readOnly
                className="bg-white border-indigo-200 mt-1"
              />
            </div>

            {/* Período Inicial */}
            <div>
              <Label htmlFor="periodo-inicial">Período Inicial</Label>
              <Input
                id="periodo-inicial"
                type="date"
                value={data.periodoInicial}
                readOnly
                className="bg-white border-indigo-200 mt-1"
              />
            </div>

            {/* Data de Conclusão */}
            <div>
              <Label htmlFor="data-conclusao">Data de Conclusão</Label>
              <Input
                id="data-conclusao"
                type="date"
                value={data.dataConclusao}
                readOnly
                className="bg-white border-indigo-200 mt-1"
              />
            </div>

            {/* Novo Mediador */}
            <div>
              <Label htmlFor="novo-mediador">Novo Mediador *</Label>
              <Select
                value={data.novoMediador}
                onValueChange={(value) => onChange({ ...data, novoMediador: value })}
              >
                <SelectTrigger id="novo-mediador" className="mt-1">
                  <SelectValue placeholder="Selecione o novo mediador" />
                </SelectTrigger>
                <SelectContent>
                  {colaboradores.map((colaborador) => (
                    <SelectItem key={colaborador} value={colaborador}>
                      {colaborador}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Motivos */}
            <div>
              <Label className="mb-3 block">Motivos para a Mudança de Mediação *</Label>
              <div className="space-y-3 border border-gray-300 rounded-lg p-4 bg-gray-50">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={data.motivos.mudancaHorario}
                    onChange={(e) => onChange({
                      ...data,
                      motivos: { ...data.motivos, mudancaHorario: e.target.checked }
                    })}
                    className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                  />
                  <span className="text-gray-700">Mudança de Horário</span>
                </label>

                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={data.motivos.conclusaoObjetivos}
                    onChange={(e) => onChange({
                      ...data,
                      motivos: { ...data.motivos, conclusaoObjetivos: e.target.checked }
                    })}
                    className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                  />
                  <span className="text-gray-700">Conclusão dos Objetivos</span>
                </label>

                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={data.motivos.prioridadesNecessidades}
                    onChange={(e) => onChange({
                      ...data,
                      motivos: { ...data.motivos, prioridadesNecessidades: e.target.checked }
                    })}
                    className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                  />
                  <span className="text-gray-700">Prioridades e Novas Necessidades</span>
                </label>

                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={data.motivos.rearranjoEquipe}
                    onChange={(e) => onChange({
                      ...data,
                      motivos: { ...data.motivos, rearranjoEquipe: e.target.checked }
                    })}
                    className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                  />
                  <span className="text-gray-700">Rearranjo da Equipe</span>
                </label>

                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={data.motivos.mudancaPrograma}
                    onChange={(e) => onChange({
                      ...data,
                      motivos: { ...data.motivos, mudancaPrograma: e.target.checked }
                    })}
                    className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                  />
                  <span className="text-gray-700">Mudança de Programa</span>
                </label>

                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={data.motivos.demandaFamiliar}
                    onChange={(e) => onChange({
                      ...data,
                      motivos: { ...data.motivos, demandaFamiliar: e.target.checked }
                    })}
                    className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                  />
                  <span className="text-gray-700">Demanda Familiar</span>
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
                  placeholder="Descreva outros motivos para a mudança de mediação..."
                />
              </div>
            )}
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
              Salvar Mudança de Mediação
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}