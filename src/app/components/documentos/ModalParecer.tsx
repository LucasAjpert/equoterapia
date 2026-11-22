import React from 'react';
import { X, FileText } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { ParecerData } from '../../../types/documentos.types';

interface ModalParecerProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
  data: ParecerData;
  onChange: (data: ParecerData) => void;
}

export function ModalParecer({ isOpen, onClose, onSave, data, onChange }: ModalParecerProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl my-8">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 rounded-t-xl">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl text-gray-900">Declaração de Comparecimento</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="px-6 py-6 space-y-6">
          {/* Formulário de Parecer */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="nome-solicitante">Nome do Solicitante *</Label>
              <Input
                id="nome-solicitante"
                value={data.nomeSolicitante}
                onChange={(e) => onChange({ ...data, nomeSolicitante: e.target.value })}
                placeholder="Nome do solicitante do parecer"
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="para-qual-fins">Para Quais Fins *</Label>
              <Input
                id="para-qual-fins"
                value={data.paraQualFins}
                onChange={(e) => onChange({ ...data, paraQualFins: e.target.value })}
                placeholder="Ex: Atestado médico, justificativa de ausência, etc."
                className="mt-1"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="de-que-hora">De Que Hora *</Label>
                <Input
                  id="de-que-hora"
                  type="time"
                  value={data.deQueHora}
                  onChange={(e) => onChange({ ...data, deQueHora: e.target.value })}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="ate-qual-hora">Até Qual Hora *</Label>
                <Input
                  id="ate-qual-hora"
                  type="time"
                  value={data.ateQualHora}
                  onChange={(e) => onChange({ ...data, ateQualHora: e.target.value })}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="data-parecer">Data *</Label>
                <Input
                  id="data-parecer"
                  type="date"
                  value={data.data}
                  onChange={(e) => onChange({ ...data, data: e.target.value })}
                  className="mt-1"
                />
              </div>
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
              Gerar PDF
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}