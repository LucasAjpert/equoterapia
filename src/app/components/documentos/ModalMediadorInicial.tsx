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
import { MediadorInicialData } from '../../../types/documentos.types';

interface ModalMediadorInicialProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
  data: MediadorInicialData;
  onChange: (data: MediadorInicialData) => void;
  colaboradores: string[];
}

export function ModalMediadorInicial({ 
  isOpen, 
  onClose, 
  onSave, 
  data, 
  onChange, 
  colaboradores 
}: ModalMediadorInicialProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl my-8">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 rounded-t-xl">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl text-gray-900">Formulário de Mediador Inicial</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="px-6 py-6 space-y-6">
          {/* Campo do Praticante */}
          <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
            <h3 className="text-lg text-indigo-900 mb-4">Dados do Praticante</h3>
            <div>
              <Label className="text-indigo-700">Nome do Praticante</Label>
              <Input
                value={data.nomePraticante}
                readOnly
                className="bg-white border-indigo-200 mt-1"
              />
            </div>
          </div>

          {/* Campo do Mediador */}
          <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
            <h3 className="text-lg text-indigo-900 mb-4">Dados do Mediador</h3>
            <div>
              <Label className="text-indigo-700">Nome do Mediador Responsável *</Label>
              <Select
                value={data.nomeMediador}
                onValueChange={(value) => onChange({ ...data, nomeMediador: value })}
              >
                <SelectTrigger className="bg-white border-indigo-200 mt-1">
                  <SelectValue placeholder="Selecione o mediador responsável" />
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
          </div>
        </div>

        {/* Botões */}
        <div className="sticky bottom-0 bg-white border-t border-gray-200 px-6 py-4 rounded-b-xl">
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
              Salvar Mediador Inicial
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}