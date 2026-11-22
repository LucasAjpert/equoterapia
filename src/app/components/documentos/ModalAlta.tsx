import React from 'react';
import { X, FileText } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { AltaData } from '../../../types/documentos.types';

interface ModalAltaProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
  data: AltaData;
  onChange: (data: AltaData) => void;
}

export function ModalAlta({ isOpen, onClose, onSave, data, onChange }: ModalAltaProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl my-8">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 rounded-t-xl z-10">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">Documento de Alta</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="px-6 py-6 space-y-6 max-h-[calc(100vh-200px)] overflow-y-auto custom-scrollbar">
          {/* Tipo de Alta */}
          <div>
            <Label className="text-base font-semibold mb-3 block">Tipo de Alta</Label>
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  id="alta-definitiva"
                  name="tipoAlta"
                  checked={data.tipoAlta === 'definitiva'}
                  onChange={() => onChange({ ...data, tipoAlta: 'definitiva' })}
                  className="w-4 h-4 cursor-pointer"
                />
                <label htmlFor="alta-definitiva" className="text-sm cursor-pointer">
                  Alta Definitiva
                </label>
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  id="alta-temporaria"
                  name="tipoAlta"
                  checked={data.tipoAlta === 'temporaria'}
                  onChange={() => onChange({ ...data, tipoAlta: 'temporaria' })}
                  className="w-4 h-4 cursor-pointer"
                />
                <label htmlFor="alta-temporaria" className="text-sm cursor-pointer">
                  Alta Temporária
                </label>
              </div>
            </div>
          </div>

          {data.tipoAlta && (
            <>
              {/* Protocolo */}
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <p className="text-sm font-semibold text-gray-700 mb-2">
                  PROTOCOLO DE ALTA {data.tipoAlta.toUpperCase()} Nº 06/2020
                </p>
              </div>

              {/* Nome do Praticante */}
              <div>
                <Label htmlFor="alta-praticante">Nome do Praticante</Label>
                <Input
                  id="alta-praticante"
                  value={data.nomePraticante}
                  className="bg-gray-50"
                  readOnly
                />
              </div>

              {/* Descrição */}
              <div>
                <Label htmlFor="alta-descricao">Descrição</Label>
                <textarea
                  id="alta-descricao"
                  value={data.descricao}
                  onChange={(e) => onChange({ ...data, descricao: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  rows={3}
                  placeholder="Descreva a situação..."
                />
              </div>

              {/* Motivo */}
              <div>
                <Label htmlFor="alta-motivo">Motivo</Label>
                <textarea
                  id="alta-motivo"
                  value={data.motivo}
                  onChange={(e) => onChange({ ...data, motivo: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  rows={2}
                  placeholder="Ex: DESISTÊNCIA POR PARTE DA FAMÍLIA DO PRATICANTE"
                />
              </div>

              {/* Procedimento */}
              <div>
                <Label htmlFor="alta-procedimento">Procedimento</Label>
                <textarea
                  id="alta-procedimento"
                  value={data.procedimento}
                  onChange={(e) => onChange({ ...data, procedimento: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  rows={2}
                  placeholder={`Ex: Sendo assim, está sendo desligado por meio da alta ${data.tipoAlta}.`}
                />
              </div>

              {/* Assinaturas */}
              <div>
                <Label className="text-base font-semibold mb-3 block">Assinaturas</Label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="alta-mediador">Mediador</Label>
                    <Input
                      id="alta-mediador"
                      value={data.assinaturaMediador}
                      onChange={(e) => onChange({ ...data, assinaturaMediador: e.target.value })}
                      placeholder="Nome do mediador"
                    />
                  </div>
                  <div>
                    <Label htmlFor="alta-lateral">Lateral</Label>
                    <Input
                      id="alta-lateral"
                      value={data.assinaturaLateral}
                      onChange={(e) => onChange({ ...data, assinaturaLateral: e.target.value })}
                      placeholder="Nome do lateral"
                    />
                  </div>
                  <div>
                    <Label htmlFor="alta-guia">Guia</Label>
                    <Input
                      id="alta-guia"
                      value={data.assinaturaGuia}
                      onChange={(e) => onChange({ ...data, assinaturaGuia: e.target.value })}
                      placeholder="Nome do guia"
                    />
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        <div className="sticky bottom-0 bg-gray-50 px-6 py-4 border-t border-gray-200 rounded-b-xl z-10">
          <div className="flex justify-end gap-3">
            <Button
              variant="outline"
              onClick={onClose}
              className="px-6"
            >
              Cancelar
            </Button>
            <Button
              onClick={onSave}
              disabled={!data.tipoAlta}
              className="bg-indigo-600 hover:bg-indigo-700 px-6 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FileText className="h-4 w-4 mr-2" />
              Salvar Alta
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}