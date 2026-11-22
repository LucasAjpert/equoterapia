import React, { useState } from 'react';
import { X, FileText } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { EstudoCasoData } from '../../../types/documentos.types';

interface ModalEstudoCasoProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
  data: EstudoCasoData;
  onChange: (data: EstudoCasoData) => void;
}

export function ModalEstudoCaso({ isOpen, onClose, onSave, data, onChange }: ModalEstudoCasoProps) {
  // Estes estados são exclusivos deste modal, logo ficam aqui dentro!
  const [showModalMarcacaoFisica, setShowModalMarcacaoFisica] = useState(false);
  const [parteCorpoSelecionada, setParteCorpoSelecionada] = useState<string>('');

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
        <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl my-8">
          <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 rounded-t-xl z-10">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl text-gray-900">Estudo de Caso</h2>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          <div className="px-6 py-6 space-y-6 max-h-[calc(100vh-200px)] overflow-y-auto custom-scrollbar">
            {/* Dados do Praticante */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Dados do Praticante</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="ec-nome">Nome do Praticante</Label>
                  <Input id="ec-nome" value={data.nomePraticante} className="bg-gray-50" readOnly />
                </div>
                <div>
                  <Label htmlFor="ec-idade">Idade</Label>
                  <Input id="ec-idade" value={data.idade} className="bg-gray-50" readOnly />
                </div>
                <div>
                  <Label htmlFor="ec-data-nascimento">Data de Nascimento</Label>
                  <Input id="ec-data-nascimento" value={data.dataNascimento} className="bg-gray-50" readOnly />
                </div>
                <div>
                  <Label htmlFor="ec-diagnostico">Diagnóstico</Label>
                  <Input id="ec-diagnostico" value={data.diagnostico} className="bg-gray-50" readOnly />
                </div>
              </div>
            </div>

            {/* Formulário */}
            <div className="space-y-6">
              {/* 1. Descrição da Demanda */}
              <div>
                <Label htmlFor="ec-demanda">1) DESCRIÇÃO DA DEMANDA</Label>
                <p className="text-sm text-gray-500 mb-2">
                  Queixa geral, ex: agitado, dificuldade comunicação, instabilidade gravitacional, quedas frequente, sialorreia, problema postural, hipotonia.
                </p>
                <textarea
                  id="ec-demanda"
                  value={data.descricaoDemanda}
                  onChange={(e) => onChange({ ...data, descricaoDemanda: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  rows={4}
                  placeholder="Descreva a demanda do praticante..."
                />
              </div>

              {/* 2. Expectativa Tratamento Equoterápeutico */}
              <div>
                <Label htmlFor="ec-expectativa">2) EXPECTATIVA TRATAMENTO EQUOTERÁPEUTICO</Label>
                <p className="text-sm text-gray-500 mb-2">
                  Objetivo geral, ex: qualidade de vida, autonomia, melhore a interação, ganho motor e postural.
                </p>
                <textarea
                  id="ec-expectativa"
                  value={data.expectativaTratamento}
                  onChange={(e) => onChange({ ...data, expectativaTratamento: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  rows={4}
                  placeholder="Descreva as expectativas do tratamento..."
                />
              </div>

              {/* 3. Quadro e Complicações */}
              <div>
                <Label htmlFor="ec-quadro">3) QUADRO E COMPLICAÇÕES A SER OBSERVADOS</Label>
                <p className="text-sm text-gray-500 mb-2">
                  Ex: diabete, epilepsia controlada, escoliose, efeito chicote, agitação, sem percepção de risco, hiper sensibilidade auditiva, agressividade, hipertensão...
                </p>
                <textarea
                  id="ec-quadro"
                  value={data.quadroComplicacoes}
                  onChange={(e) => onChange({ ...data, quadroComplicacoes: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  rows={4}
                  placeholder="Descreva o quadro e complicações..."
                />
              </div>

              {/* 4. Exames Complementares */}
              <div>
                <Label htmlFor="ec-exames">4) EXAMES COMPLEMENTARES PERIODICAMENTE MANTIDOS</Label>
                <p className="text-sm text-gray-500 mb-2">
                  Ex: raio X panorâmico da coluna e quadril, eletro encéfalo grama, exames cardíacos...
                </p>
                <textarea
                  id="ec-exames"
                  value={data.examesComplementares}
                  onChange={(e) => onChange({ ...data, examesComplementares: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  rows={4}
                  placeholder="Liste os exames complementares..."
                />
              </div>

              {/* 5. Elegibilidade */}
              <div>
                <Label>5) ELEGIBILIDADE</Label>
                <div className="mt-3 space-y-2">
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="ec-nao-elegivel"
                      name="elegibilidade"
                      value="NÃO ELEGÍVEL"
                      checked={data.elegibilidade === 'NÃO ELEGÍVEL'}
                      onChange={(e) => onChange({ ...data, elegibilidade: e.target.value })}
                      className="w-4 h-4 text-indigo-600 focus:ring-indigo-500"
                    />
                    <label htmlFor="ec-nao-elegivel" className="ml-2 text-sm text-gray-700">
                      No momento NÃO ELEGÍVEL
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="ec-elegivel-restricoes"
                      name="elegibilidade"
                      value="ELEGÍVEL com RESTRIÇÕES"
                      checked={data.elegibilidade === 'ELEGÍVEL com RESTRIÇÕES'}
                      onChange={(e) => onChange({ ...data, elegibilidade: e.target.value })}
                      className="w-4 h-4 text-indigo-600 focus:ring-indigo-500"
                    />
                    <label htmlFor="ec-elegivel-restricoes" className="ml-2 text-sm text-gray-700">
                      ELEGÍVEL com RESTRIÇÕES
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="ec-elegivel"
                      name="elegibilidade"
                      value="ELEGÍVEL"
                      checked={data.elegibilidade === 'ELEGÍVEL'}
                      onChange={(e) => onChange({ ...data, elegibilidade: e.target.value })}
                      className="w-4 h-4 text-indigo-600 focus:ring-indigo-500"
                    />
                    <label htmlFor="ec-elegivel" className="ml-2 text-sm text-gray-700">
                      ELEGÍVEL
                    </label>
                  </div>
                </div>

                {data.elegibilidade === 'ELEGÍVEL com RESTRIÇÕES' && (
                  <div className="mt-4">
                    <Label htmlFor="ec-restricoes">Quais são as restrições?</Label>
                    <textarea
                      id="ec-restricoes"
                      value={data.restricoesElegibilidade}
                      onChange={(e) => onChange({ ...data, restricoesElegibilidade: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      rows={3}
                      placeholder="Descreva as restrições do praticante..."
                    />
                  </div>
                )}
              </div>

              {/* 6. Perfil Praticante */}
              <div>
                <Label>6) PERFIL PRATICANTE (ASSINATURA PRATICANTE)</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div>
                    <Label htmlFor="ec-altura">Altura (cm)</Label>
                    <Input id="ec-altura" type="number" value={data.altura} onChange={(e) => onChange({ ...data, altura: e.target.value })} placeholder="Ex: 170" />
                  </div>
                  <div>
                    <Label htmlFor="ec-peso">Peso (kg)</Label>
                    <Input id="ec-peso" type="number" value={data.peso} onChange={(e) => onChange({ ...data, peso: e.target.value })} placeholder="Ex: 70" />
                  </div>
                </div>
                <div className="text-center p-4 text-gray-500 bg-gray-50 rounded-lg mt-4">
                  O mapa anatômico e físico será importado automaticamente do banco de dados a partir da Avaliação Inicial Anatômica.
                </div>
              </div>

              {/* 7. Severidade do Quadro e Grau de Suporte */}
              <div>
                <Label>7) SEVERIDADE DO QUADRO E GRAU DE SUPORTE</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div className="border border-gray-300 rounded-lg p-4">
                    <Label className="text-base font-semibold mb-3 block">Severidade do Quadro</Label>
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <input type="radio" id="severidade-alta" name="severidade" checked={data.severidadeQuadro === 'ALTA'} onChange={() => onChange({ ...data, severidadeQuadro: 'ALTA' })} className="w-4 h-4 cursor-pointer" />
                        <label htmlFor="severidade-alta" className="text-sm cursor-pointer">ALTA</label>
                      </div>
                      <div className="flex items-center gap-3">
                        <input type="radio" id="severidade-baixa" name="severidade" checked={data.severidadeQuadro === 'BAIXA'} onChange={() => onChange({ ...data, severidadeQuadro: 'BAIXA' })} className="w-4 h-4 cursor-pointer" />
                        <label htmlFor="severidade-baixa" className="text-sm cursor-pointer">BAIXA</label>
                      </div>
                    </div>
                  </div>
                  <div className="border border-gray-300 rounded-lg p-4">
                    <Label className="text-base font-semibold mb-3 block">Grau de Suporte</Label>
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <input type="radio" id="suporte-alta" name="suporte" checked={data.grauSuporte === 'ALTA'} onChange={() => onChange({ ...data, grauSuporte: 'ALTA' })} className="w-4 h-4 cursor-pointer" />
                        <label htmlFor="suporte-alta" className="text-sm cursor-pointer">ALTA</label>
                      </div>
                      <div className="flex items-center gap-3">
                        <input type="radio" id="suporte-baixa" name="suporte" checked={data.grauSuporte === 'BAIXA'} onChange={() => onChange({ ...data, grauSuporte: 'BAIXA' })} className="w-4 h-4 cursor-pointer" />
                        <label htmlFor="suporte-baixa" className="text-sm cursor-pointer">BAIXA</label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 8. Hipótese iniciais de sessão */}
              <div>
                <Label>8) Hipótese iniciais de sessão:</Label>
                <div className="mt-4">
                  <Label className="text-base font-semibold mb-3 block">A - Precauções (pode ser mais de uma alternativa)</Label>
                  <div className="space-y-2 ml-4">
                    {[
                      'arranque brusco do cavalo "anca mais alta, equino + enérgico, transpista"',
                      'excesso de impacto biomecânico',
                      'estímulo excessivamente intenso',
                      'tempo prolongado de exposição inicial',
                      'sobrecarga vestibular',
                      'sobrecarga sensorial',
                      'evitar fadiga praticante "em quadros degenerativos"',
                      'excesso de velocidade',
                      'praticante instável',
                      'praticante sem noção periculosidade',
                      'retirada de emergência "peso praticante"',
                      'atentar-se risco/sensível a luxação',
                      'atentar-se alteração cardiorrespiratória durante o atendimento',
                      'saúde sensível. Risco alérgico.'
                    ].map((precaucao, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <input
                          type="checkbox"
                          id={`precaucao-alt-${index}`}
                          checked={data.precaucoes.includes(precaucao)}
                          onChange={(e) => {
                            const novasPrecaucoes = e.target.checked
                              ? [...data.precaucoes, precaucao]
                              : data.precaucoes.filter(p => p !== precaucao);
                            onChange({ ...data, precaucoes: novasPrecaucoes });
                          }}
                          className="w-4 h-4 mt-0.5 cursor-pointer flex-shrink-0"
                        />
                        <label htmlFor={`precaucao-alt-${index}`} className="text-sm cursor-pointer">
                          {precaucao}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* B - Indicativos */}
                <div className="mt-6 space-y-6">
                  <Label className="text-base font-semibold block">B - Indicativos (selecione uma opção de cada categoria)</Label>

                  {/* TEMPERAMENTO EQUINO */}
                  <div className="ml-4 border-l-2 border-indigo-200 pl-4">
                    <Label className="text-sm font-semibold mb-2 block">TEMPERAMENTO EQUINO</Label>
                    <div className="space-y-2">
                      <div className="flex items-start gap-2">
                        <input type="radio" id="temp-energico" name="temperamentoEquino" checked={data.temperamentoEquino === 'EQUINO ENÉRGICO'} onChange={() => onChange({ ...data, temperamentoEquino: 'EQUINO ENÉRGICO' })} className="w-4 h-4 mt-0.5 cursor-pointer" />
                        <label htmlFor="temp-energico" className="text-sm cursor-pointer"><span className="font-medium">EQUINO ENÉRGICO</span><br/><span className="text-gray-600">Praticante calmo</span></label>
                      </div>
                      <div className="flex items-start gap-2">
                        <input type="radio" id="temp-calmo" name="temperamentoEquino" checked={data.temperamentoEquino === 'EQUINO CALMO'} onChange={() => onChange({ ...data, temperamentoEquino: 'EQUINO CALMO' })} className="w-4 h-4 mt-0.5 cursor-pointer" />
                        <label htmlFor="temp-calmo" className="text-sm cursor-pointer"><span className="font-medium">EQUINO CALMO</span><br/><span className="text-gray-600">Praticante agitado, medroso, impulsivo</span></label>
                      </div>
                    </div>
                  </div>

                  {/* INSTABILIDADE EQUINO */}
                  <div className="ml-4 border-l-2 border-indigo-200 pl-4">
                    <Label className="text-sm font-semibold mb-2 block">INSTABILIDADE EQUINO</Label>
                    <div className="space-y-2">
                      <div className="flex items-start gap-2">
                        <input type="radio" id="instab-alta" name="instabilidadeEquino" checked={data.instabilidadeEquino === 'ALTA'} onChange={() => onChange({ ...data, instabilidadeEquino: 'ALTA' })} className="w-4 h-4 mt-0.5 cursor-pointer" />
                        <label htmlFor="instab-alta" className="text-sm cursor-pointer"><span className="font-medium">ALTA</span><br/><span className="text-gray-600">Praticante hipertônico<br/>Equino - largo, asfalto, manta</span></label>
                      </div>
                      <div className="flex items-start gap-2">
                        <input type="radio" id="instab-media" name="instabilidadeEquino" checked={data.instabilidadeEquino === 'MÉDIA'} onChange={() => onChange({ ...data, instabilidadeEquino: 'MÉDIA' })} className="w-4 h-4 mt-0.5 cursor-pointer" />
                        <label htmlFor="instab-media" className="text-sm cursor-pointer font-medium">MÉDIA</label>
                      </div>
                      <div className="flex items-start gap-2">
                        <input type="radio" id="instab-baixa" name="instabilidadeEquino" checked={data.instabilidadeEquino === 'BAIXA'} onChange={() => onChange({ ...data, instabilidadeEquino: 'BAIXA' })} className="w-4 h-4 mt-0.5 cursor-pointer" />
                        <label htmlFor="instab-baixa" className="text-sm cursor-pointer"><span className="font-medium">BAIXA</span><br/><span className="text-gray-600">Praticante hipotônico<br/>Equino +largo, areia, sela</span></label>
                      </div>
                    </div>
                  </div>

                  {/* QUADRIL PRATICANTE LARGURA EQUINO */}
                  <div className="ml-4 border-l-2 border-indigo-200 pl-4">
                    <Label className="text-sm font-semibold mb-2 block">QUADRIL PRATICANTE LARGURA EQUINO</Label>
                    <div className="space-y-2">
                      <div className="flex items-start gap-2">
                        <input type="radio" id="quadril-aducao" name="quadrilPraticante" checked={data.quadrilPraticante === 'ADUÇÃO'} onChange={() => onChange({ ...data, quadrilPraticante: 'ADUÇÃO' })} className="w-4 h-4 mt-0.5 cursor-pointer" />
                        <label htmlFor="quadril-aducao" className="text-sm cursor-pointer"><span className="font-medium">ADUÇÃO</span><br/><span className="text-gray-600">Praticante Risco luxação</span></label>
                      </div>
                      <div className="flex items-start gap-2">
                        <input type="radio" id="quadril-abducao" name="quadrilPraticante" checked={data.quadrilPraticante === 'ABDUÇÃO'} onChange={() => onChange({ ...data, quadrilPraticante: 'ABDUÇÃO' })} className="w-4 h-4 mt-0.5 cursor-pointer" />
                        <label htmlFor="quadril-abducao" className="text-sm cursor-pointer font-medium">ABDUÇÃO</label>
                      </div>
                    </div>
                  </div>

                  {/* INTENSIDADE DO ESTÍMULO M3D */}
                  <div className="ml-4 border-l-2 border-indigo-200 pl-4">
                    <Label className="text-sm font-semibold mb-2 block">INTENSIDADE DO ESTÍMULO M3D</Label>
                    <div className="space-y-2">
                      <div className="flex items-start gap-2">
                        <input type="radio" id="intens-alta" name="intensidadeEstimulo" checked={data.intensidadeEstimulo === 'ALTA'} onChange={() => onChange({ ...data, intensidadeEstimulo: 'ALTA' })} className="w-4 h-4 mt-0.5 cursor-pointer" />
                        <label htmlFor="intens-alta" className="text-sm cursor-pointer"><span className="font-medium">ALTA</span><br/><span className="text-gray-600">Praticante calmo/agitado, hipotônico/hipertônico<br/>Equino +alto, transpista, manta</span></label>
                      </div>
                      <div className="flex items-start gap-2">
                        <input type="radio" id="intens-baixa" name="intensidadeEstimulo" checked={data.intensidadeEstimulo === 'BAIXA'} onChange={() => onChange({ ...data, intensidadeEstimulo: 'BAIXA' })} className="w-4 h-4 mt-0.5 cursor-pointer" />
                        <label htmlFor="intens-baixa" className="text-sm cursor-pointer"><span className="font-medium">BAIXA</span><br/><span className="text-gray-600">Praticante quando há precauções<br/>Equino +baixo, antepista, sela, anca proporcional ao corpo</span></label>
                      </div>
                      <div className="flex items-start gap-2">
                        <input type="radio" id="intens-progressiva" name="intensidadeEstimulo" checked={data.intensidadeEstimulo === 'PROGRESSIVA'} onChange={() => onChange({ ...data, intensidadeEstimulo: 'PROGRESSIVA' })} className="w-4 h-4 mt-0.5 cursor-pointer" />
                        <label htmlFor="intens-progressiva" className="text-sm cursor-pointer"><span className="font-medium">PROGRESSIVA (MENOS → MAIS)</span></label>
                      </div>
                    </div>
                  </div>

                  {/* IMPACTO BIOMECÂNICO */}
                  <div className="ml-4 border-l-2 border-indigo-200 pl-4">
                    <Label className="text-sm font-semibold mb-2 block">IMPACTO BIOMECÂNICO</Label>
                    <div className="space-y-2">
                      <div className="flex items-start gap-2">
                        <input type="radio" id="impacto-alto" name="impactoBiomecanico" checked={data.impactoBiomecanico === 'ALTO'} onChange={() => onChange({ ...data, impactoBiomecanico: 'ALTO' })} className="w-4 h-4 mt-0.5 cursor-pointer" />
                        <label htmlFor="impacto-alto" className="text-sm cursor-pointer"><span className="font-medium">ALTO</span><br/><span className="text-gray-600">Praticante hipotônico<br/>Equino ferradura, asfalto, transpista, manta, anca avantajada</span></label>
                      </div>
                      <div className="flex items-start gap-2">
                        <input type="radio" id="impacto-medio" name="impactoBiomecanico" checked={data.impactoBiomecanico === 'MÉDIO'} onChange={() => onChange({ ...data, impactoBiomecanico: 'MÉDIO' })} className="w-4 h-4 mt-0.5 cursor-pointer" />
                        <label htmlFor="impacto-medio" className="text-sm cursor-pointer font-medium">MÉDIO</label>
                      </div>
                      <div className="flex items-start gap-2">
                        <input type="radio" id="impacto-baixo" name="impactoBiomecanico" checked={data.impactoBiomecanico === 'BAIXO'} onChange={() => onChange({ ...data, impactoBiomecanico: 'BAIXO' })} className="w-4 h-4 mt-0.5 cursor-pointer" />
                        <label htmlFor="impacto-baixo" className="text-sm cursor-pointer"><span className="font-medium">BAIXO</span><br/><span className="text-gray-600">Praticante hipertônico<br/>Equino sem ferradura, areia, antepista, sela, estribo</span></label>
                      </div>
                    </div>
                  </div>

                  {/* AMPLITUDE MOVIMENTO */}
                  <div className="ml-4 border-l-2 border-indigo-200 pl-4">
                    <Label className="text-sm font-semibold mb-2 block">AMPLITUDE MOVIMENTO</Label>
                    <div className="space-y-2">
                      <div className="flex items-start gap-2">
                        <input type="radio" id="ampl-alta" name="amplitudeMovimento" checked={data.amplitudeMovimento === 'ALTA'} onChange={() => onChange({ ...data, amplitudeMovimento: 'ALTA' })} className="w-4 h-4 mt-0.5 cursor-pointer" />
                        <label htmlFor="ampl-alta" className="text-sm cursor-pointer"><span className="font-medium">ALTA</span><br/><span className="text-gray-600">Praticante agitado, hipertônico<br/>Equino +alto, transpista, manta</span></label>
                      </div>
                      <div className="flex items-start gap-2">
                        <input type="radio" id="ampl-media" name="amplitudeMovimento" checked={data.amplitudeMovimento === 'MÉDIA'} onChange={() => onChange({ ...data, amplitudeMovimento: 'MÉDIA' })} className="w-4 h-4 mt-0.5 cursor-pointer" />
                        <label htmlFor="ampl-media" className="text-sm cursor-pointer font-medium">MÉDIA</label>
                      </div>
                      <div className="flex items-start gap-2">
                        <input type="radio" id="ampl-baixa" name="amplitudeMovimento" checked={data.amplitudeMovimento === 'BAIXA'} onChange={() => onChange({ ...data, amplitudeMovimento: 'BAIXA' })} className="w-4 h-4 mt-0.5 cursor-pointer" />
                        <label htmlFor="ampl-baixa" className="text-sm cursor-pointer"><span className="font-medium">BAIXA</span><br/><span className="text-gray-600">Praticante hipotônico, baixa reatividade<br/>Equino +baixo, antepista, sela</span></label>
                      </div>
                    </div>
                  </div>

                  {/* FREQUÊNCIA MOVIMENTO */}
                  <div className="ml-4 border-l-2 border-indigo-200 pl-4">
                    <Label className="text-sm font-semibold mb-2 block">FREQUÊNCIA MOVIMENTO</Label>
                    <div className="space-y-2">
                      <div className="flex items-start gap-2">
                        <input type="radio" id="freq-alta" name="frequenciaMovimento" checked={data.frequenciaMovimento === 'ALTA'} onChange={() => onChange({ ...data, frequenciaMovimento: 'ALTA' })} className="w-4 h-4 mt-0.5 cursor-pointer" />
                        <label htmlFor="freq-alta" className="text-sm cursor-pointer"><span className="font-medium">ALTA</span><br/><span className="text-gray-600">Praticante hipotônico, baixa reatividade<br/>Equino +baixo, antepista, manta</span></label>
                      </div>
                      <div className="flex items-start gap-2">
                        <input type="radio" id="freq-media" name="frequenciaMovimento" checked={data.frequenciaMovimento === 'MÉDIA'} onChange={() => onChange({ ...data, frequenciaMovimento: 'MÉDIA' })} className="w-4 h-4 mt-0.5 cursor-pointer" />
                        <label htmlFor="freq-media" className="text-sm cursor-pointer font-medium">MÉDIA</label>
                      </div>
                      <div className="flex items-start gap-2">
                        <input type="radio" id="freq-baixa" name="frequenciaMovimento" checked={data.frequenciaMovimento === 'BAIXA'} onChange={() => onChange({ ...data, frequenciaMovimento: 'BAIXA' })} className="w-4 h-4 mt-0.5 cursor-pointer" />
                        <label htmlFor="freq-baixa" className="text-sm cursor-pointer"><span className="font-medium">BAIXA</span><br/><span className="text-gray-600">Praticante hipotônico, baixa reatividade<br/>Equino +alto, transpista, sela</span></label>
                      </div>
                    </div>
                  </div>

                  {/* VELOCIDADE */}
                  <div className="ml-4 border-l-2 border-indigo-200 pl-4">
                    <Label className="text-sm font-semibold mb-2 block">VELOCIDADE</Label>
                    <div className="space-y-2">
                      <div className="flex items-start gap-2">
                        <input type="radio" id="veloc-alta" name="velocidade" checked={data.velocidade === 'ALTA'} onChange={() => onChange({ ...data, velocidade: 'ALTA' })} className="w-4 h-4 mt-0.5 cursor-pointer" />
                        <label htmlFor="veloc-alta" className="text-sm cursor-pointer font-medium">ALTA</label>
                      </div>
                      <div className="flex items-start gap-2">
                        <input type="radio" id="veloc-baixa" name="velocidade" checked={data.velocidade === 'BAIXA'} onChange={() => onChange({ ...data, velocidade: 'BAIXA' })} className="w-4 h-4 mt-0.5 cursor-pointer" />
                        <label htmlFor="veloc-baixa" className="text-sm cursor-pointer font-medium">BAIXA</label>
                      </div>
                    </div>
                  </div>

                  {/* FEEDBACK SENSORIAL */}
                  <div className="ml-4 border-l-2 border-indigo-200 pl-4">
                    <Label className="text-sm font-semibold mb-2 block">FEEDBACK SENSORIAL</Label>
                    <div className="space-y-2">
                      <div className="flex items-start gap-2">
                        <input type="radio" id="feedback-constante" name="feedbackSensorial" checked={data.feedbackSensorial === 'CONSTANTE'} onChange={() => onChange({ ...data, feedbackSensorial: 'CONSTANTE' })} className="w-4 h-4 mt-0.5 cursor-pointer" />
                        <label htmlFor="feedback-constante" className="text-sm cursor-pointer"><span className="font-medium">CONSTANTE</span><br/><span className="text-gray-600">Praticante baixa resposta sensório motora, medo da montaria<br/>Equino estribo, rédea, manta, calça da vovó</span></label>
                      </div>
                      <div className="flex items-start gap-2">
                        <input type="radio" id="feedback-recorrente" name="feedbackSensorial" checked={data.feedbackSensorial === 'RECORRENTE'} onChange={() => onChange({ ...data, feedbackSensorial: 'RECORRENTE' })} className="w-4 h-4 mt-0.5 cursor-pointer" />
                        <label htmlFor="feedback-recorrente" className="text-sm cursor-pointer font-medium">RECORRENTE</label>
                      </div>
                      <div className="flex items-start gap-2">
                        <input type="radio" id="feedback-ocasional" name="feedbackSensorial" checked={data.feedbackSensorial === 'OCASIONAL'} onChange={() => onChange({ ...data, feedbackSensorial: 'OCASIONAL' })} className="w-4 h-4 mt-0.5 cursor-pointer" />
                        <label htmlFor="feedback-ocasional" className="text-sm cursor-pointer"><span className="font-medium">OCASIONAL</span><br/><span className="text-gray-600">Praticante agitado, baixa, sobrecarga<br/>Equino estribo, rédea, manta</span></label>
                      </div>
                    </div>
                  </div>

                  {/* CONTROLE RÉDEA, GUIA */}
                  <div className="ml-4 border-l-2 border-indigo-200 pl-4">
                    <Label className="text-sm font-semibold mb-2 block">CONTROLE RÉDEA, GUIA</Label>
                    <div className="space-y-2">
                      <div className="flex items-start gap-2">
                        <input type="radio" id="controle-alta" name="controleRedea" checked={data.controleRedea === 'ALTA SENSIBILIDADE'} onChange={() => onChange({ ...data, controleRedea: 'ALTA SENSIBILIDADE' })} className="w-4 h-4 mt-0.5 cursor-pointer" />
                        <label htmlFor="controle-alta" className="text-sm cursor-pointer"><span className="font-medium">ALTA SENSIBILIDADE</span><br/><span className="text-gray-600">Praticante calmo, atleta<br/>Equino competidor</span></label>
                      </div>
                      <div className="flex items-start gap-2">
                        <input type="radio" id="controle-baixa" name="controleRedea" checked={data.controleRedea === 'BAIXA SENSIBILIDADE'} onChange={() => onChange({ ...data, controleRedea: 'BAIXA SENSIBILIDADE' })} className="w-4 h-4 mt-0.5 cursor-pointer" />
                        <label htmlFor="controle-baixa" className="text-sm cursor-pointer"><span className="font-medium">BAIXA SENSIBILIDADE</span><br/><span className="text-gray-600">Praticante agitado, baixa noção de risco<br/>Equino + controlado</span></label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 9. Hipótese Perfil Mediação */}
              <div>
                <Label>9) HIPÓTESE PERFIL MEDIAÇÃO (AVALIAÇÃO, INTERVENÇÃO PROCESSUAL)</Label>
                <div className="mt-4 space-y-4">
                  {[
                    { id: 'psicologo', label: 'Psicólogo', obs: '(emocional, cognitivo)', key: 'psicologo' },
                    { id: 'fisio', label: 'Fisio', obs: '(motor, equilíbrio)', key: 'fisio' },
                    { id: 'terapeutaOcupacional', label: 'Terapeuta ocupacional', obs: '(sensorial, atividade da vida diária)', key: 'terapeutaOcupacional' },
                    { id: 'pedagogo', label: 'Pedagogo', obs: '', key: 'pedagogo' },
                    { id: 'fonoaudiologo', label: 'Fonoaudiólogo', obs: '', key: 'fonoaudiologo' },
                    { id: 'equitador', label: 'Equitador', obs: '', key: 'equitador' },
                    { id: 'educadorFisico', label: 'Educador Físico', obs: '', key: 'educadorFisico' },
                    { id: 'enfermagem', label: 'Enfermagem', obs: '', key: 'enfermagem' },
                    { id: 'equoterapeuta', label: 'Equoterapeuta', obs: '', key: 'equoterapeuta' }
                  ].map((med) => {
                    // @ts-ignore
                    const hip = data.hipoteseMediacoes[med.key];
                    return (
                      <div key={med.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <input
                            type="checkbox"
                            id={`med-${med.id}`}
                            checked={hip.selecionado}
                            onChange={(e) => onChange({
                              ...data,
                              hipoteseMediacoes: {
                                ...data.hipoteseMediacoes,
                                [med.key]: { ...hip, selecionado: e.target.checked }
                              }
                            })}
                            className="w-4 h-4 cursor-pointer"
                          />
                          <label htmlFor={`med-${med.id}`} className="text-sm font-semibold cursor-pointer">
                            • {med.label} <span className="text-gray-600 font-normal">{med.obs}</span>
                          </label>
                        </div>
                        {hip.selecionado && (
                          <textarea
                            value={hip.texto}
                            onChange={(e) => onChange({
                              ...data,
                              hipoteseMediacoes: {
                                ...data.hipoteseMediacoes,
                                [med.key]: { ...hip, texto: e.target.value }
                              }
                            })}
                            className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
                            rows={3}
                            placeholder={`Descreva sobre a área de ${med.label.toLowerCase()}...`}
                          />
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* 10. Observação */}
              <div>
                <Label htmlFor="ec-observacao">10) Observação:</Label>
                <textarea
                  id="ec-observacao"
                  value={data.observacao}
                  onChange={(e) => onChange({ ...data, observacao: e.target.value })}
                  className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  rows={5}
                  placeholder="Digite aqui suas observações..."
                />
              </div>
            </div>
          </div>

          <div className="sticky bottom-0 bg-gray-50 px-6 py-4 border-t border-gray-200 rounded-b-xl">
            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={onClose} className="px-6">Cancelar</Button>
              <Button onClick={onSave} className="bg-indigo-600 hover:bg-indigo-700 px-6">
                <FileText className="h-4 w-4 mr-2" /> Salvar Estudo de Caso
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}