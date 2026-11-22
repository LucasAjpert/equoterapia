import React from 'react';
import { X, FileText } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { ParecerMedicoData } from '../../../types/documentos.types';

interface ModalParecerMedicoProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
  data: ParecerMedicoData;
  onChange: (data: ParecerMedicoData) => void;
}

export function ModalParecerMedico({ isOpen, onClose, onSave, data, onChange }: ModalParecerMedicoProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl my-8 mx-auto">
        <div className="border-b border-gray-200 px-6 py-4 rounded-t-xl flex items-center justify-between">
          <h2 className="text-2xl text-gray-900">Parecer Médico</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="px-6 py-6 space-y-6">
          <section>
            <h3 className="text-indigo-700 font-semibold text-base mb-3 pb-2 border-b border-indigo-100">
              Dados do Praticante
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="text-gray-700">Nome do Praticante</Label>
                <Input value={data.nomePraticante} readOnly className="mt-1 bg-gray-50 text-gray-700" />
              </div>
              <div>
                <Label className="text-gray-700">Data de Nascimento</Label>
                <Input value={data.dataNascimento} readOnly className="mt-1 bg-gray-50 text-gray-700" />
              </div>
              <div>
                <Label className="text-gray-700">Patologia</Label>
                <Input value={data.patologia} readOnly className="mt-1 bg-gray-50 text-gray-700" />
              </div>
              <div>
                <Label className="text-gray-700">CID</Label>
                <Input value={data.cid} readOnly className="mt-1 bg-gray-50 text-gray-700" />
              </div>
              <div className="md:col-span-2">
                <Label className="text-gray-700">Patologias Acessórias</Label>
                <Input
                  value={data.patologiasAcessorias}
                  onChange={(e) => onChange({ ...data, patologiasAcessorias: e.target.value })}
                  placeholder="Outras patologias relevantes"
                  className="mt-1"
                />
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-indigo-700 font-semibold text-base mb-3 pb-2 border-b border-indigo-100">
              Considerações Médicas
            </h3>
            <div>
              <Label htmlFor="consideracoes-medicas">
                Considerações Médicas para Indicação à Realização de Equoterapia
              </Label>
              <textarea
                id="consideracoes-medicas"
                value={data.consideracoesMedicas}
                onChange={(e) => onChange({ ...data, consideracoesMedicas: e.target.value })}
                rows={5}
                placeholder="Descreva as considerações médicas para indicação à equoterapia..."
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-none text-sm"
              />
            </div>
          </section>

          <section>
            <h3 className="text-indigo-700 font-semibold text-base mb-3 pb-2 border-b border-indigo-100">
              Dados do Médico
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <Label htmlFor="pm-medico">Médico</Label>
                <Input id="pm-medico" value={data.medico}
                  onChange={(e) => onChange({ ...data, medico: e.target.value })}
                  placeholder="Nome completo do médico" className="mt-1" />
              </div>
              <div>
                <Label htmlFor="pm-especializacao">Especialização</Label>
                <Input id="pm-especializacao" value={data.especializacao}
                  onChange={(e) => onChange({ ...data, especializacao: e.target.value })}
                  placeholder="Ex: Neuropediatra" className="mt-1" />
              </div>
              <div>
                <Label htmlFor="pm-crm">CRM</Label>
                <Input id="pm-crm" value={data.crm}
                  onChange={(e) => onChange({ ...data, crm: e.target.value })}
                  placeholder="Ex: CRM/SP 123456" className="mt-1" />
              </div>
            </div>
          </section>
        </div>

        <div className="border-t border-gray-200 px-6 py-4 rounded-b-xl">
          <div className="flex gap-3 justify-center">
            <Button variant="outline" onClick={onClose} className="px-8">
              Cancelar
            </Button>
            <Button onClick={onSave} className="bg-indigo-600 hover:bg-indigo-700 px-8">
              <FileText className="h-4 w-4 mr-2" />
              Salvar Parecer Médico
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}