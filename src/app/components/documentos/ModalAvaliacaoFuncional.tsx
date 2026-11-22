import React from 'react';
import { X, FileText } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';

interface ModalAvaliacaoFuncionalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
  data: any; 
  onChange: (data: any) => void;
}

export function ModalAvaliacaoFuncional({ isOpen, onClose, onSave, data, onChange }: ModalAvaliacaoFuncionalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl my-8">
        
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 rounded-t-xl z-10">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl text-gray-900">Avaliação Inicial Funcional</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="px-6 py-6 space-y-6 max-h-[calc(100vh-200px)] overflow-y-auto custom-scrollbar">
          {/* ================= DADOS DO PRATICANTE ================= */}
          <section className="mb-8">
            <h3 className="text-indigo-700 font-semibold text-lg mb-4 pb-2 border-b border-indigo-100">
              Dados do Praticante
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="text-indigo-700 mb-1 block">Nome do Praticante</Label>
                <Input value={data.nomePraticante || ''} readOnly className="bg-gray-50 text-gray-500 cursor-not-allowed border-gray-200" />
              </div>
              <div>
                <Label className="text-indigo-700 mb-1 block">Idade</Label>
                <Input value={data.idade || ''} readOnly className="bg-gray-50 text-gray-500 cursor-not-allowed border-gray-200" />
              </div>
              <div>
                <Label className="text-indigo-700 mb-1 block">Data de Nascimento</Label>
                <Input value={data.dataNascimento || ''} readOnly className="bg-gray-50 text-gray-500 cursor-not-allowed border-gray-200" />
              </div>
              <div>
                <Label className="text-indigo-700 mb-1 block">Diagnóstico</Label>
                <Input value={data.diagnostico || ''} readOnly className="bg-gray-50 text-gray-500 cursor-not-allowed border-gray-200" />
              </div>
            </div>
          </section>

          {/* ================= DADOS FUNCIONAIS ================= */}
          <div className="space-y-8 bg-white p-6 rounded-lg border border-gray-200">
            
            {/* TIPO R - PONTOS FORTES */}
            <section>
              <h3 className="text-lg font-bold text-green-700 mb-2 border-b border-green-200 pb-2">Tipo R — Ponto Forte</h3>
              <p className="text-xs text-green-800 bg-green-50 p-3 rounded-lg mb-4 leading-relaxed">
                <strong>Legenda:</strong> 1: só com ajuda física • 2: emerge com dica verbal • 3: existe mas depende de contexto • 4: independente em mais de um contexto • 5: pleno e generalizado.
              </p>
              
              <div className="space-y-3 mb-3">
                {(data.pontosFortes || []).map((item: any, index: number) => (
                  <div key={index} className="flex gap-2 items-center">
                    <span className="font-bold text-green-700 w-6 text-right">{index + 1}.</span>
                    <Input 
                      className="flex-1" placeholder="Descreva o ponto forte..." value={item.descricao} 
                      onChange={(e) => {
                        const newArr = [...data.pontosFortes];
                        newArr[index].descricao = e.target.value;
                        onChange({...data, pontosFortes: newArr});
                      }}
                    />
                    <select 
                      className="w-24 border border-gray-300 rounded-md p-2 text-sm focus:ring-2 focus:ring-green-500 outline-none"
                      value={item.nota} 
                      onChange={(e) => {
                        const newArr = [...data.pontosFortes];
                        newArr[index].nota = e.target.value;
                        onChange({...data, pontosFortes: newArr});
                      }}
                    >
                      <option value="">Nota</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                    </select>
                    <button 
                      type="button" onClick={() => {
                        const newArr = [...data.pontosFortes];
                        newArr.splice(index, 1);
                        onChange({...data, pontosFortes: newArr});
                      }}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-md" title="Apagar"
                    >🗑️</button>
                  </div>
                ))}
              </div>
              <Button type="button" variant="outline" size="sm" className="text-green-700 border-green-300 hover:bg-green-50 ml-8" onClick={() => {
                onChange({ ...data, pontosFortes: [...(data.pontosFortes || []), { descricao: '', nota: '' }] });
              }}>+ Adicionar Ponto Forte</Button>
            </section>

            {/* PONTOS FRACOS - DÉFICIT E EXCESSO */}
            <section className="bg-red-50/30 p-4 rounded-xl border border-red-100">
              <h3 className="text-lg font-bold text-red-700 mb-4 pb-2 border-b border-red-200">Pontos Fracos</h3>
              
              {/* TIPO D - DÉFICIT */}
              <div className="mb-6">
                <h4 className="font-semibold text-red-600 mb-2">Tipo D — Déficit</h4>
                <p className="text-xs text-red-800 bg-red-50 p-3 rounded-lg mb-4 leading-relaxed">
                  <strong>Legenda:</strong> 0: ausência total • 1: só com ajuda física • 2: emerge com dica verbal • 3: existe mas depende de contexto • 4: independente em mais de um contexto • 5: pleno e generalizado.
                </p>
                <div className="space-y-3 mb-3">
                  {(data.pontosFracosDeficit || []).map((item: any, index: number) => (
                    <div key={index} className="flex gap-2 items-center">
                      <span className="font-bold text-red-600 w-6 text-right">{index + 1}.</span>
                      <Input className="flex-1" placeholder="Descreva o déficit..." value={item.descricao} onChange={(e) => {
                        const newArr = [...data.pontosFracosDeficit];
                        newArr[index].descricao = e.target.value;
                        onChange({...data, pontosFracosDeficit: newArr});
                      }}/>
                      <select className="w-24 border border-gray-300 rounded-md p-2 text-sm focus:ring-2 focus:ring-red-500 outline-none" value={item.nota} onChange={(e) => {
                        const newArr = [...data.pontosFracosDeficit];
                        newArr[index].nota = e.target.value;
                        onChange({...data, pontosFracosDeficit: newArr});
                      }}>
                        <option value="">Nota</option>
                        <option value="0">0</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                      </select>
                      <button type="button" onClick={() => {
                        const newArr = [...data.pontosFracosDeficit];
                        newArr.splice(index, 1);
                        onChange({...data, pontosFracosDeficit: newArr});
                      }} className="p-2 text-red-500 hover:bg-red-50 rounded-md" title="Apagar">🗑️</button>
                    </div>
                  ))}
                </div>
                <Button type="button" variant="outline" size="sm" className="text-red-700 border-red-300 hover:bg-red-50 ml-8" onClick={() => {
                  onChange({ ...data, pontosFracosDeficit: [...(data.pontosFracosDeficit || []), { descricao: '', nota: '' }] });
                }}>+ Adicionar Déficit</Button>
              </div>

              {/* TIPO E - EXCESSO */}
              <div>
                <h4 className="font-semibold text-red-600 mb-2">Tipo E — Excesso</h4>
                <p className="text-xs text-red-800 bg-red-50 p-3 rounded-lg mb-4 leading-relaxed">
                  <strong>Legenda:</strong> 0: não ocorre ou está adequado • 2: ocasional e baixa intensidade • 3: diário e atrapalha a atividade • 4: frequente e intenso com necessidade de retirada do ambiente • 5: constante com risco.
                </p>
                <div className="space-y-3 mb-3">
                  {(data.pontosFracosExcesso || []).map((item: any, index: number) => (
                    <div key={index} className="flex gap-2 items-center">
                      <span className="font-bold text-red-600 w-6 text-right">{index + 1}.</span>
                      <Input className="flex-1" placeholder="Descreva o excesso..." value={item.descricao} onChange={(e) => {
                        const newArr = [...data.pontosFracosExcesso];
                        newArr[index].descricao = e.target.value;
                        onChange({...data, pontosFracosExcesso: newArr});
                      }}/>
                      <select className="w-24 border border-gray-300 rounded-md p-2 text-sm focus:ring-2 focus:ring-red-500 outline-none" value={item.nota} onChange={(e) => {
                        const newArr = [...data.pontosFracosExcesso];
                        newArr[index].nota = e.target.value;
                        onChange({...data, pontosFracosExcesso: newArr});
                      }}>
                        <option value="">Nota</option>
                        <option value="0">0</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                      </select>
                      <button type="button" onClick={() => {
                        const newArr = [...data.pontosFracosExcesso];
                        newArr.splice(index, 1);
                        onChange({...data, pontosFracosExcesso: newArr});
                      }} className="p-2 text-red-500 hover:bg-red-50 rounded-md" title="Apagar">🗑️</button>
                    </div>
                  ))}
                </div>
                <Button type="button" variant="outline" size="sm" className="text-red-700 border-red-300 hover:bg-red-50 ml-8" onClick={() => {
                  onChange({ ...data, pontosFracosExcesso: [...(data.pontosFracosExcesso || []), { descricao: '', nota: '' }] });
                }}>+ Adicionar Excesso</Button>
              </div>
            </section>

            {/* FATORES DE RISCO E PROTEÇÃO */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-orange-50/50 p-4 rounded-xl border border-orange-200">
                <h3 className="font-bold text-orange-700 mb-4 pb-2 border-b border-orange-200">Fatores de Risco</h3>
                <div className="space-y-3 mb-3">
                  {(data.fatoresRisco || []).map((item: any, index: number) => (
                    <div key={index} className="flex gap-2 items-center">
                      <span className="font-bold text-orange-700 w-6 text-right">{index + 1}.</span>
                      <Input className="flex-1" placeholder="Descreva o risco..." value={item.descricao} onChange={(e) => {
                        const newArr = [...data.fatoresRisco];
                        newArr[index].descricao = e.target.value;
                        onChange({...data, fatoresRisco: newArr});
                      }}/>
                      <button type="button" onClick={() => {
                        const newArr = [...data.fatoresRisco];
                        newArr.splice(index, 1);
                        onChange({...data, fatoresRisco: newArr});
                      }} className="p-2 text-red-500 hover:bg-red-50 rounded-md" title="Apagar">🗑️</button>
                    </div>
                  ))}
                </div>
                <Button type="button" variant="outline" size="sm" className="text-orange-700 border-orange-300 hover:bg-orange-100 ml-8" onClick={() => {
                  onChange({ ...data, fatoresRisco: [...(data.fatoresRisco || []), { descricao: '' }] });
                }}>+ Adicionar Risco</Button>
              </div>

              <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-200">
                <h3 className="font-bold text-blue-700 mb-4 pb-2 border-b border-blue-200">Fatores de Proteção</h3>
                <div className="space-y-3 mb-3">
                  {(data.fatoresProtecao || []).map((item: any, index: number) => (
                    <div key={index} className="flex gap-2 items-center">
                      <span className="font-bold text-blue-700 w-6 text-right">{index + 1}.</span>
                      <Input className="flex-1" placeholder="Descreva a proteção..." value={item.descricao} onChange={(e) => {
                        const newArr = [...data.fatoresProtecao];
                        newArr[index].descricao = e.target.value;
                        onChange({...data, fatoresProtecao: newArr});
                      }}/>
                      <button type="button" onClick={() => {
                        const newArr = [...data.fatoresProtecao];
                        newArr.splice(index, 1);
                        onChange({...data, fatoresProtecao: newArr});
                      }} className="p-2 text-red-500 hover:bg-red-50 rounded-md" title="Apagar">🗑️</button>
                    </div>
                  ))}
                </div>
                <Button type="button" variant="outline" size="sm" className="text-blue-700 border-blue-300 hover:bg-blue-100 ml-8" onClick={() => {
                  onChange({ ...data, fatoresProtecao: [...(data.fatoresProtecao || []), { descricao: '' }] });
                }}>+ Adicionar Proteção</Button>
              </div>
            </section>

            {/* ÁREAS DE DESENVOLVIMENTO (Inputs simples) */}
            <section>
              <h3 className="text-lg font-bold text-gray-800 mb-4 pb-2 border-b border-gray-200">Áreas de Desenvolvimento</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { id: 'dependencia', label: 'Dependência' },
                  { id: 'comunicacao', label: 'Comunicação' },
                  { id: 'comportamento', label: 'Comportamento' },
                  { id: 'cognitivo', label: 'Cognitivo' },
                  { id: 'autonomia', label: 'Autonomia' },
                  { id: 'interacao', label: 'Interação' },
                  { id: 'autoregulacao', label: 'Autorregulação' },
                  { id: 'afetivo', label: 'Afetivo' },
                  { id: 'escolaridade', label: 'Escolaridade' },
                  { id: 'trabalho', label: 'Trabalho' },
                  { id: 'sensorial', label: 'Sensorial' }
                ].map((campo) => (
                  <div key={campo.id} className={campo.id === 'sensorial' ? "md:col-span-2" : ""}>
                    <Label className="mb-1 block text-gray-700">{campo.label}</Label>
                    <Textarea 
                      rows={2} 
                      placeholder={`Observações sobre ${campo.label.toLowerCase()}...`}
                      value={data[campo.id] || ''} 
                      onChange={(e) => onChange({...data, [campo.id]: e.target.value})}
                    />
                  </div>
                ))}
              </div>
            </section>

          </div>
        </div>

        <div className="sticky bottom-0 bg-gray-50 px-6 py-4 border-t border-gray-200 rounded-b-xl z-10">
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={onClose} className="px-6">Cancelar</Button>
            <Button onClick={onSave} className="bg-indigo-600 hover:bg-indigo-700 px-6">
              <FileText className="h-4 w-4 mr-2" /> Salvar Avaliação Funcional
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}