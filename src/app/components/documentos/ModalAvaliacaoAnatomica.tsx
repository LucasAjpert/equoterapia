import React, { useState } from 'react';
import { X, FileText } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Checkbox } from '../ui/checkbox';
import { EstudoCasoData } from '../../../types/documentos.types';

interface ModalAvaliacaoAnatomicaProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
  data: any;
  onChange: (data: any) => void;
  estudoCasoData: EstudoCasoData;
  setEstudoCasoData: (data: EstudoCasoData) => void;
}

export function ModalAvaliacaoAnatomica({
  isOpen,
  onClose,
  onSave,
  data,
  onChange,
  estudoCasoData,
  setEstudoCasoData
}: ModalAvaliacaoAnatomicaProps) {
  // Os estados do sub-modal de marcação física ficam protegidos aqui dentro!
  const [showModalMarcacaoFisica, setShowModalMarcacaoFisica] = useState(false);
  const [parteCorpoSelecionada, setParteCorpoSelecionada] = useState<string>('');

  if (!isOpen) return null;

  const getTipoColor = (tipo: string) => {
    const cores: { [key: string]: string } = {
      'esqueleto': '#a855f7',
      'muscular': '#ef4444',
      'motor': '#3b82f6',
      'ausência de membro': '#6b7280',
      'má formação': '#eab308',
      'lesão': '#f97316',
      'doença': '#ec4899',
      'transtorno patológica invisível': '#6366f1',
      'sem resposta nervosa ou motora': '#22c55e',
      'sensibilidade': '#14b8a6', 
      'dor': '#e11d48',          
      'reflexo': '#06b6d4',      
      'hipotonia': '#84cc16',    
      'hipertonia': '#059669',   
      'força': '#d97706',        
      'outros': '#475569'        
    };
    return cores[tipo] || '#22c55e';
  };

  const handleClickParte = (parte: string) => {
    setParteCorpoSelecionada(parte);
    setShowModalMarcacaoFisica(true);
  };

  const toggleMarcacao = (parte: string) => {
    const novasMarcacoes = { ...estudoCasoData.marcacoesOrtese };
    const atual = novasMarcacoes[parte] || { ortese: false, protese: false };

    if (!atual.ortese && !atual.protese) {
      novasMarcacoes[parte] = { ortese: true, protese: false };
    } else if (atual.ortese && !atual.protese) {
      novasMarcacoes[parte] = { ortese: false, protese: true };
    } else if (!atual.ortese && atual.protese) {
      novasMarcacoes[parte] = { ortese: true, protese: true };
    } else {
      novasMarcacoes[parte] = { ortese: false, protese: false };
    }

    setEstudoCasoData({ ...estudoCasoData, marcacoesOrtese: novasMarcacoes });
  };

  const partes = [
    { nome: 'cabeca', tipo: 'circle', cx: 100, cy: 35, r: 20, rClick: 28 },
    { nome: 'pescoco', tipo: 'rect', x: 94, y: 55, width: 12, height: 15, xClick: 90, yClick: 52, widthClick: 20, heightClick: 21 },
    { nome: 'torax', tipo: 'rect', x: 75, y: 70, width: 50, height: 35, rx: 3, xClick: 70, yClick: 67, widthClick: 60, heightClick: 41 },
    { nome: 'abdomen', tipo: 'rect', x: 78, y: 105, width: 44, height: 30, rx: 3, xClick: 73, yClick: 102, widthClick: 54, heightClick: 36 },
    { nome: 'ombro_esquerdo', tipo: 'circle', cx: 125, cy: 75, r: 8, rClick: 14 },
    { nome: 'ombro_direito', tipo: 'circle', cx: 75, cy: 75, r: 8, rClick: 14 },
    { nome: 'braco_esquerdo', tipo: 'line', x1: 125, y1: 83, x2: 145, y2: 115, width: 10, widthClick: 20, cx: 135, cy: 99 },
    { nome: 'braco_direito', tipo: 'line', x1: 75, y1: 83, x2: 55, y2: 115, width: 10, widthClick: 20, cx: 65, cy: 99 },
    { nome: 'cotovelo_esquerdo', tipo: 'circle', cx: 145, cy: 115, r: 6, rClick: 14 },
    { nome: 'cotovelo_direito', tipo: 'circle', cx: 55, cy: 115, r: 6, rClick: 14 },
    { nome: 'antebraco_esquerdo', tipo: 'line', x1: 145, y1: 121, x2: 155, y2: 155, width: 8, widthClick: 18, cx: 150, cy: 138 },
    { nome: 'antebraco_direito', tipo: 'line', x1: 55, y1: 121, x2: 45, y2: 155, width: 8, widthClick: 18, cx: 50, cy: 138 },
    { nome: 'punho_esquerdo', tipo: 'circle', cx: 155, cy: 155, r: 5, rClick: 12 },
    { nome: 'punho_direito', tipo: 'circle', cx: 45, cy: 155, r: 5, rClick: 12 },
    { nome: 'mao_esquerda', tipo: 'ellipse', cx: 158, cy: 167, rx: 6, ry: 10, rxClick: 11, ryClick: 15 },
    { nome: 'mao_direita', tipo: 'ellipse', cx: 42, cy: 167, rx: 6, ry: 10, rxClick: 11, ryClick: 15 },
    { nome: 'quadril', tipo: 'rect', x: 82, y: 135, width: 36, height: 20, rx: 3, xClick: 77, yClick: 132, widthClick: 46, heightClick: 26, cx: 100, cy: 145 },
    { nome: 'coxa_esquerda', tipo: 'line', x1: 110, y1: 155, x2: 115, y2: 220, width: 12, widthClick: 22, cx: 113, cy: 187 },
    { nome: 'coxa_direita', tipo: 'line', x1: 90, y1: 155, x2: 85, y2: 220, width: 12, widthClick: 22, cx: 87, cy: 187 },
    { nome: 'joelho_esquerdo', tipo: 'circle', cx: 115, cy: 220, r: 7, rClick: 14 },
    { nome: 'joelho_direito', tipo: 'circle', cx: 85, cy: 220, r: 7, rClick: 14 },
    { nome: 'perna_esquerda', tipo: 'line', x1: 115, y1: 227, x2: 120, y2: 300, width: 10, widthClick: 20, cx: 118, cy: 263 },
    { nome: 'perna_direita', tipo: 'line', x1: 85, y1: 227, x2: 80, y2: 300, width: 10, widthClick: 20, cx: 82, cy: 263 },
    { nome: 'tornozelo_esquerdo', tipo: 'circle', cx: 120, cy: 300, r: 5, rClick: 12 },
    { nome: 'tornozelo_direito', tipo: 'circle', cx: 80, cy: 300, r: 5, rClick: 12 },
    { nome: 'pe_esquerdo', tipo: 'ellipse', cx: 125, cy: 312, rx: 10, ry: 6, rxClick: 15, ryClick: 11 },
    { nome: 'pe_direito', tipo: 'ellipse', cx: 75, cy: 312, rx: 10, ry: 6, rxClick: 15, ryClick: 11 },
  ];

  return (
    <>
      {/* Modal Principal de Avaliação Anatômica */}
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
        <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl my-8">
          
          <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 rounded-t-xl z-10">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl text-gray-900">Avaliação Inicial Anatômica</h2>
              <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          <div className="px-6 py-6 space-y-6 max-h-[calc(100vh-200px)] overflow-y-auto custom-scrollbar">
            {/* Dados do Praticante */}
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
            
            {/* DADOS CLÍNICOS */}
            <section className="space-y-6 mb-8 bg-white p-6 rounded-lg border border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="mb-1 block text-gray-700">Altura (m)</Label>
                  <Input 
                    type="number" step="0.01" placeholder="Ex: 1.75"
                    value={data.altura || ''} 
                    onChange={(e) => onChange({...data, altura: e.target.value})}
                  />
                </div>
                <div>
                  <Label className="mb-1 block text-gray-700">Peso (kg)</Label>
                  <Input 
                    type="number" step="0.1" placeholder="Ex: 70.5"
                    value={data.peso || ''} 
                    onChange={(e) => onChange({...data, peso: e.target.value})}
                  />
                </div>
              </div>

              <div>
                <Label className="mb-1 block text-gray-700">Inspeção / AVD's</Label>
                <Textarea 
                  rows={3} placeholder="Descreva a inspeção e as atividades de vida diária..."
                  value={data.inspecaoAvds || ''} 
                  onChange={(e) => onChange({...data, inspecaoAvds: e.target.value})}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label className="mb-1 block text-gray-700">Trofismo Muscular</Label>
                  <Input 
                    placeholder="Ex: Hipotrofia, Hipertrofia..."
                    value={data.trofismoMuscular || ''} 
                    onChange={(e) => onChange({...data, trofismoMuscular: e.target.value})}
                  />
                </div>
                <div>
                  <Label className="mb-1 block text-gray-700">Tônus Muscular</Label>
                  <Input 
                    placeholder="Ex: Hipertonia, Hipotonia..."
                    value={data.tonusMuscular || ''} 
                    onChange={(e) => onChange({...data, tonusMuscular: e.target.value})}
                  />
                </div>
                <div>
                  <Label className="mb-1 block text-gray-700">Marcha</Label>
                  <Input 
                    placeholder="Ex: Ceifante, Escarvante..."
                    value={data.marcha || ''} 
                    onChange={(e) => onChange({...data, marcha: e.target.value})}
                  />
                </div>
              </div>

              {/* Força Muscular */}
              <div>
                <h4 className="font-semibold text-gray-800 mb-3 border-b pb-1">Força Muscular (Grau 0 a 5)</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {['msd', 'mid', 'mse', 'mie'].map((membro) => (
                    <div key={membro}>
                      <Label className="mb-1 block text-gray-700 uppercase">{membro}</Label>
                      <Input 
                        type="number" min="0" max="5" placeholder="0-5"
                        value={data.forcaMuscular?.[membro] || ''} 
                        onChange={(e) => onChange({
                          ...data, 
                          forcaMuscular: { ...data.forcaMuscular, [membro]: e.target.value }
                        })}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Sensibilidade */}
              <div>
                <h4 className="font-semibold text-gray-800 mb-3 border-b pb-1">Sensibilidade</h4>
                <div className="flex flex-wrap gap-6">
                  {[
                    { id: 'tatil', label: 'Tátil' },
                    { id: 'termica', label: 'Térmica' },
                    { id: 'dolorosa', label: 'Dolorosa' }
                  ].map((item) => (
                    <div key={item.id} className="flex items-center space-x-2">
                      <Checkbox 
                        id={`sens-${item.id}`}
                        checked={data.sensibilidade?.[item.id] || false}
                        onCheckedChange={(checked) => onChange({
                          ...data,
                          sensibilidade: { ...data.sensibilidade, [item.id]: checked === true }
                        })}
                      />
                      <Label htmlFor={`sens-${item.id}`} className="cursor-pointer font-normal">{item.label}</Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Equilíbrio Estático */}
              <div>
                <h4 className="font-semibold text-gray-800 mb-3 border-b pb-1">Equilíbrio Estático</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    { id: 'sustentacaoCabeca', label: 'Sustentação da cabeça' },
                    { id: 'sentadoSemApoio', label: 'Sentados sem apoio' },
                    { id: 'ortostaticaComApoio', label: 'Posição ortostática com apoio' },
                    { id: 'ortostaticaSemApoio', label: 'Posição ortostática sem apoio' },
                    { id: 'umPeOlhosAbertos', label: 'Em um pé só (olhos abertos)' },
                    { id: 'umPeOlhosFechados', label: 'Em um pé só (olhos fechados)' }
                  ].map((item) => (
                    <div key={item.id} className="flex items-start space-x-2">
                      <Checkbox 
                        id={`eq-${item.id}`} className="mt-1"
                        checked={data.equilibrioEstatico?.[item.id] || false}
                        onCheckedChange={(checked) => onChange({
                          ...data,
                          equilibrioEstatico: { ...data.equilibrioEstatico, [item.id]: checked === true }
                        })}
                      />
                      <Label htmlFor={`eq-${item.id}`} className="cursor-pointer font-normal leading-snug">{item.label}</Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Equilíbrio Dinâmico */}
              <div>
                <h4 className="font-semibold text-gray-800 mb-3 border-b pb-1 mt-6">Equilíbrio Dinâmico</h4>
                <div className="flex flex-wrap gap-6">
                  {[
                    { id: 'marchaInvoluntaria', label: 'Marcha involuntária' },
                    { id: 'saltoDoisPes', label: 'Salto com os dois pés juntos' },
                    { id: 'correrDesviando', label: 'Correr desviando obstáculos' }
                  ].map((item) => (
                    <div key={item.id} className="flex items-center space-x-2">
                      <Checkbox 
                        id={`eqd-${item.id}`}
                        checked={data.equilibrioDinamico?.[item.id] || false}
                        onCheckedChange={(checked) => onChange({
                          ...data,
                          equilibrioDinamico: { ...data.equilibrioDinamico, [item.id]: checked === true }
                        })}
                      />
                      <Label htmlFor={`eqd-${item.id}`} className="cursor-pointer font-normal">{item.label}</Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Reação de Proteção */}
              <div>
                <h4 className="font-semibold text-gray-800 mb-3 border-b pb-1 mt-6">Reação de Proteção</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="mb-1 block text-gray-700">Direita</Label>
                    <Input 
                      placeholder="Ex: Presente, Ausente, Lenta..."
                      value={data.reacaoProtecao?.direita || ''} 
                      onChange={(e) => onChange({
                        ...data, 
                        reacaoProtecao: { ...data.reacaoProtecao, direita: e.target.value }
                      })}
                    />
                  </div>
                  <div>
                    <Label className="mb-1 block text-gray-700">Esquerda</Label>
                    <Input 
                      placeholder="Ex: Presente, Ausente, Lenta..."
                      value={data.reacaoProtecao?.esquerda || ''} 
                      onChange={(e) => onChange({
                        ...data, 
                        reacaoProtecao: { ...data.reacaoProtecao, esquerda: e.target.value }
                      })}
                    />
                  </div>
                </div>
              </div>

              {/* Coordenação Motora */}
              <div>
                <h4 className="font-semibold text-gray-800 mb-3 border-b pb-1 mt-6">Coordenação Motora</h4>
                <div className="flex flex-wrap gap-6">
                  {[
                    { id: 'maoObjeto', label: 'Prova Mão/Objeto' },
                    { id: 'dedoNariz', label: 'Dedo/Nariz' },
                    { id: 'maoBoca', label: 'Mão/Boca' }
                  ].map((item) => (
                    <div key={item.id} className="flex items-center space-x-2">
                      <Checkbox 
                        id={`coord-${item.id}`}
                        checked={data.coordenacaoMotora?.[item.id] || false}
                        onCheckedChange={(checked) => onChange({
                          ...data,
                          coordenacaoMotora: { ...data.coordenacaoMotora, [item.id]: checked === true }
                        })}
                      />
                      <Label htmlFor={`coord-${item.id}`} className="cursor-pointer font-normal">{item.label}</Label>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* BONECOS E MARCAÇÕES (Salvos em estudoCasoData) */}
            <div className="space-y-6 mt-6">
              {/* Órtese e Prótese */}
              <div className="border border-gray-300 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-3 text-center">Órtese e Prótese</h4>
                <p className="text-xs text-gray-500 mb-3 text-center">Clique nas partes para marcar. Clique novamente para alternar.</p>
                <div className="flex flex-wrap gap-3 justify-center mb-4 text-xs">
                  <div className="flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-red-500"></div><span>Órtese</span></div>
                  <div className="flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-blue-500"></div><span>Prótese</span></div>
                  <div className="flex items-center gap-1"><div className="w-3 h-3 rounded-full" style={{ background: 'linear-gradient(90deg, #ef4444 50%, #3b82f6 50%)' }}></div><span>Ambos</span></div>
                </div>

                <svg viewBox="0 0 200 330" className="w-full max-w-[200px] mx-auto" style={{ cursor: 'pointer' }}>
                  {/* Visuais */}
                  {partes.map(parte => {
                    if (parte.tipo === 'circle') return <circle key={`visual-${parte.nome}`} cx={parte.cx} cy={parte.cy} r={parte.r} fill="#f0f0f0" stroke="#333" strokeWidth="2" />;
                    if (parte.tipo === 'rect') return <rect key={`visual-${parte.nome}`} x={parte.x} y={parte.y} width={parte.width} height={parte.height} rx={parte.rx || 0} fill="#f0f0f0" stroke="#333" strokeWidth="2" />;
                    if (parte.tipo === 'line') return <line key={`visual-${parte.nome}`} x1={parte.x1} y1={parte.y1} x2={parte.x2} y2={parte.y2} stroke="#333" strokeWidth={parte.width} />;
                    if (parte.tipo === 'ellipse') return <ellipse key={`visual-${parte.nome}`} cx={parte.cx} cy={parte.cy} rx={parte.rx} ry={parte.ry} fill="#f0f0f0" stroke="#333" strokeWidth="2" />;
                    return null;
                  })}
                  {/* Marcações */}
                  {partes.map(parte => {
                    const marcacao = estudoCasoData.marcacoesOrtese[parte.nome] || { ortese: false, protese: false };
                    if (!marcacao.ortese && !marcacao.protese) return null;
                    const cx = parte.cx || (parte.x || 0) + (parte.width || 0) / 2;
                    const cy = parte.cy || (parte.y || 0) + (parte.height || 0) / 2;
                    if (marcacao.ortese && marcacao.protese) {
                      return (
                        <g key={`mark-${parte.nome}`}>
                          <circle cx={cx - 3} cy={cy} r="6" fill="#ef4444" />
                          <circle cx={cx + 3} cy={cy} r="6" fill="#3b82f6" />
                        </g>
                      );
                    }
                    return <circle key={`mark-${parte.nome}`} cx={cx} cy={cy} r="7" fill={marcacao.ortese ? '#ef4444' : '#3b82f6'} />;
                  })}
                  {/* Clicáveis */}
                  {partes.map(parte => {
                    if (parte.tipo === 'circle') return <circle key={`click-${parte.nome}`} cx={parte.cx} cy={parte.cy} r={parte.rClick} fill="transparent" stroke="transparent" strokeWidth="6" className="cursor-pointer hover:fill-gray-200 hover:fill-opacity-20 transition-all" onClick={(e) => { e.stopPropagation(); toggleMarcacao(parte.nome); }} />;
                    if (parte.tipo === 'rect') return <rect key={`click-${parte.nome}`} x={parte.xClick || parte.x} y={parte.yClick || parte.y} width={parte.widthClick || parte.width} height={parte.heightClick || parte.height} fill="transparent" className="cursor-pointer hover:fill-gray-200 hover:fill-opacity-20 transition-all" onClick={(e) => { e.stopPropagation(); toggleMarcacao(parte.nome); }} />;
                    if (parte.tipo === 'line') return <line key={`click-${parte.nome}`} x1={parte.x1} y1={parte.y1} x2={parte.x2} y2={parte.y2} stroke="transparent" strokeWidth={parte.widthClick} className="cursor-pointer hover:stroke-gray-400 hover:stroke-opacity-30 transition-all" onClick={(e) => { e.stopPropagation(); toggleMarcacao(parte.nome); }} />;
                    if (parte.tipo === 'ellipse') return <ellipse key={`click-${parte.nome}`} cx={parte.cx} cy={parte.cy} rx={parte.rxClick || parte.rx} ry={parte.ryClick || parte.ry} fill="transparent" className="cursor-pointer hover:fill-gray-200 hover:fill-opacity-20 transition-all" onClick={(e) => { e.stopPropagation(); toggleMarcacao(parte.nome); }} />;
                    return null;
                  })}
                </svg>

                {Object.keys(estudoCasoData.marcacoesOrtese).filter(parte => {
                  const m = estudoCasoData.marcacoesOrtese[parte];
                  return m && (m.ortese || m.protese);
                }).length > 0 && (
                  <div className="mt-4 p-3 bg-gray-50 rounded border border-gray-200">
                    <p className="text-xs font-semibold text-gray-700 mb-2">Marcações selecionadas:</p>
                    <div className="space-y-1 text-xs text-gray-600">
                      {Object.entries(estudoCasoData.marcacoesOrtese).map(([parte, marcacao]) => {
                        if (!marcacao || (!marcacao.ortese && !marcacao.protese)) return null;
                        const nomeFormatado = parte.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
                        const tipos = [];
                        if (marcacao.ortese) tipos.push('Órtese');
                        if (marcacao.protese) tipos.push('Prótese');
                        return <div key={parte} className="flex items-center gap-2"><span className="font-medium">{nomeFormatado}:</span><span>{tipos.join(' + ')}</span></div>;
                      })}
                    </div>
                  </div>
                )}
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Observações sobre Órtese e Prótese</label>
                  <textarea value={estudoCasoData.observacoesOrtese} onChange={(e) => setEstudoCasoData({ ...estudoCasoData, observacoesOrtese: e.target.value })} rows={4} className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" placeholder="Digite aqui as observações sobre a órtese e prótese..." />
                </div>
              </div>

              {/* Boneco Físico */}
              <div className="border border-gray-300 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-3 text-center">Físico</h4>
                <p className="text-xs text-gray-500 mb-3 text-center">Clique nas partes do corpo para adicionar marcação</p>
                <div className="grid grid-cols-2 gap-1 mb-4 text-xs">
                  <div className="flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-purple-500"></div><span>Esqueleto</span></div>
                  <div className="flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-red-500"></div><span>Muscular</span></div>
                  <div className="flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-blue-500"></div><span>Motor</span></div>
                  <div className="flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-gray-500"></div><span>Ausência</span></div>
                  <div className="flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-yellow-500"></div><span>Má formação</span></div>
                  <div className="flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-orange-500"></div><span>Lesão</span></div>
                  <div className="flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-pink-500"></div><span>Doença</span></div>
                  <div className="flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-indigo-500"></div><span>Transtorno invisível</span></div>
                  <div className="flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-green-500"></div><span>Sem resposta</span></div>
                  <div className="flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-teal-500"></div><span>Sensibilidade</span></div>
                  <div className="flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-rose-600"></div><span>Dor</span></div>
                  <div className="flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-cyan-500"></div><span>Reflexo</span></div>
                  <div className="flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-lime-500"></div><span>Hipotonia</span></div>
                  <div className="flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-emerald-600"></div><span>Hipertonia</span></div>
                  <div className="flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-amber-600"></div><span>Força</span></div>
                  <div className="flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-slate-600"></div><span>Outros</span></div>
                </div>

                <svg viewBox="0 0 200 330" className="w-full max-w-[200px] mx-auto">
                  {/* Visuais */}
                  {partes.map(parte => {
                    if (parte.tipo === 'circle') return <circle key={`visual-${parte.nome}`} cx={parte.cx} cy={parte.cy} r={parte.r} fill="#f0f0f0" stroke="#333" strokeWidth="2" />;
                    if (parte.tipo === 'rect') return <rect key={`visual-${parte.nome}`} x={parte.x} y={parte.y} width={parte.width} height={parte.height} rx={parte.rx || 0} fill="#f0f0f0" stroke="#333" strokeWidth="2" />;
                    if (parte.tipo === 'line') return <line key={`visual-${parte.nome}`} x1={parte.x1} y1={parte.y1} x2={parte.x2} y2={parte.y2} stroke="#333" strokeWidth={parte.width} />;
                    if (parte.tipo === 'ellipse') return <ellipse key={`visual-${parte.nome}`} cx={parte.cx} cy={parte.cy} rx={parte.rx} ry={parte.ry} fill="#f0f0f0" stroke="#333" strokeWidth="2" />;
                    return null;
                  })}
                  {/* Marcações Físicas */}
                  {partes.map(parte => {
                    const marcacoesFisicaArray = Array.isArray(estudoCasoData.marcacoesFisica) ? estudoCasoData.marcacoesFisica : [];
                    const marcacoes = marcacoesFisicaArray.filter(m => m.parteCorpo === parte.nome);
                    if (marcacoes.length === 0) return null;
                    const cx = parte.cx || (parte.x ?? 0) + ((parte.width ?? 0) / 2);
                    const cy = parte.cy || (parte.y ?? 0) + ((parte.height ?? 0) / 2);
                    if (marcacoes.length === 1) {
                      return <circle key={`mark-${parte.nome}`} cx={cx} cy={cy} r="7" fill={getTipoColor(marcacoes[0].tipo)} />;
                    } else {
                      const offset = 4;
                      return (
                        <g key={`mark-${parte.nome}`}>
                          {marcacoes.slice(0, 3).map((marcacao, idx) => (
                            <circle key={`mark-${parte.nome}-${idx}`} cx={cx + (idx - 1) * offset} cy={cy} r="5" fill={getTipoColor(marcacao.tipo)} />
                          ))}
                        </g>
                      );
                    }
                  })}
                  {/* Clicáveis */}
                  {partes.map(parte => {
                    if (parte.tipo === 'circle') return <circle key={`click-${parte.nome}`} cx={parte.cx} cy={parte.cy} r={parte.rClick} fill="transparent" stroke="transparent" strokeWidth="6" className="cursor-pointer hover:fill-gray-200 hover:fill-opacity-20 transition-all" onClick={(e) => { e.stopPropagation(); handleClickParte(parte.nome); }} />;
                    if (parte.tipo === 'rect') return <rect key={`click-${parte.nome}`} x={parte.xClick || parte.x} y={parte.yClick || parte.y} width={parte.widthClick || parte.width} height={parte.heightClick || parte.height} fill="transparent" className="cursor-pointer hover:fill-gray-200 hover:fill-opacity-20 transition-all" onClick={(e) => { e.stopPropagation(); handleClickParte(parte.nome); }} />;
                    if (parte.tipo === 'line') return <line key={`click-${parte.nome}`} x1={parte.x1} y1={parte.y1} x2={parte.x2} y2={parte.y2} stroke="transparent" strokeWidth={parte.widthClick} className="cursor-pointer hover:stroke-gray-400 hover:stroke-opacity-30 transition-all" onClick={(e) => { e.stopPropagation(); handleClickParte(parte.nome); }} />;
                    if (parte.tipo === 'ellipse') return <ellipse key={`click-${parte.nome}`} cx={parte.cx} cy={parte.cy} rx={parte.rxClick || parte.rx} ry={parte.ryClick || parte.ry} fill="transparent" className="cursor-pointer hover:fill-gray-200 hover:fill-opacity-20 transition-all" onClick={(e) => { e.stopPropagation(); handleClickParte(parte.nome); }} />;
                    return null;
                  })}
                </svg>

                {Array.isArray(estudoCasoData.marcacoesFisica) && estudoCasoData.marcacoesFisica.length > 0 && (
                  <div className="mt-4 space-y-3">
                    <p className="text-sm font-semibold text-gray-700">Marcações cadastradas:</p>
                    {estudoCasoData.marcacoesFisica.map((marcacao, idx) => {
                      const nomeFormatado = marcacao.parteCorpo.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
                      return (
                        <div key={idx} className="p-3 bg-gray-50 rounded border border-gray-200">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: getTipoColor(marcacao.tipo) }}></div>
                              <span className="text-sm font-medium text-gray-900">{nomeFormatado} - {marcacao.tipo}</span>
                            </div>
                            <button
                              onClick={() => {
                                const marcacoesFisicaArray = Array.isArray(estudoCasoData.marcacoesFisica) ? estudoCasoData.marcacoesFisica : [];
                                const novasMarcacoes = marcacoesFisicaArray.filter((_, i) => i !== idx);
                                setEstudoCasoData({ ...estudoCasoData, marcacoesFisica: novasMarcacoes });
                              }}
                              className="text-red-500 hover:text-red-700 text-xs"
                            >
                              Remover
                            </button>
                          </div>
                          <textarea
                            value={marcacao.explicacao}
                            onChange={(e) => {
                              const marcacoesFisicaArray = Array.isArray(estudoCasoData.marcacoesFisica) ? estudoCasoData.marcacoesFisica : [];
                              const novasMarcacoes = [...marcacoesFisicaArray];
                              novasMarcacoes[idx] = { ...novasMarcacoes[idx], explicacao: e.target.value };
                              setEstudoCasoData({ ...estudoCasoData, marcacoesFisica: novasMarcacoes });
                            }}
                            rows={2} className="w-full border border-gray-300 rounded p-2 text-xs focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" placeholder="Explicação detalhada..."
                          />
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="sticky bottom-0 bg-gray-50 px-6 py-4 border-t border-gray-200 rounded-b-xl z-10">
            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={onClose} className="px-6">Cancelar</Button>
              <Button onClick={onSave} className="bg-indigo-600 hover:bg-indigo-700 px-6">
                <FileText className="h-4 w-4 mr-2" /> Salvar Avaliação Anatômica
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Secundário de Seleção de Marcação Física */}
      {showModalMarcacaoFisica && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[60] p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md">
            <div className="bg-white border-b border-gray-200 px-6 py-4 rounded-t-xl">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Selecione o tipo de marcação</h3>
                <button
                  onClick={() => { setShowModalMarcacaoFisica(false); setParteCorpoSelecionada(''); }}
                  className="text-gray-500 hover:text-gray-700 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div className="px-6 py-4 max-h-[60vh] overflow-y-auto custom-scrollbar">
              <p className="text-sm text-gray-600 mb-4">
                Parte selecionada: <span className="font-semibold">{parteCorpoSelecionada.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</span>
              </p>
              <div className="space-y-2">
                {[
                  { tipo: 'esqueleto', cor: '#a855f7' },
                  { tipo: 'muscular', cor: '#ef4444' },
                  { tipo: 'motor', cor: '#3b82f6' },
                  { tipo: 'ausência de membro', cor: '#6b7280' },
                  { tipo: 'má formação', cor: '#eab308' },
                  { tipo: 'lesão', cor: '#f97316' },
                  { tipo: 'doença', cor: '#ec4899' },
                  { tipo: 'transtorno patológica invisível', cor: '#6366f1' },
                  { tipo: 'sem resposta nervosa ou motora', cor: '#22c55e' },
                  { tipo: 'sensibilidade', cor: '#14b8a6' }, 
                  { tipo: 'dor', cor: '#b91c1c' },           
                  { tipo: 'reflexo', cor: '#8b5cf6' },       
                  { tipo: 'hipotonia', cor: '#38bdf8' },     
                  { tipo: 'hipertonia', cor: '#f43f5e' },    
                  { tipo: 'força', cor: '#16a34a' },         
                  { tipo: 'outros', cor: '#94a3b8' },
                ].map(({ tipo, cor }) => (
                  <button
                    key={tipo}
                    onClick={() => {
                      const marcacoesFisicaArray = Array.isArray(estudoCasoData.marcacoesFisica) ? estudoCasoData.marcacoesFisica : [];
                      const novasMarcacoes = [...marcacoesFisicaArray, { parteCorpo: parteCorpoSelecionada, tipo: tipo, explicacao: '' }];
                      setEstudoCasoData({ ...estudoCasoData, marcacoesFisica: novasMarcacoes });
                      setShowModalMarcacaoFisica(false);
                      setParteCorpoSelecionada('');
                    }}
                    className="w-full flex items-center gap-3 p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-left"
                  >
                    <div className="w-4 h-4 rounded-full flex-shrink-0" style={{ backgroundColor: cor }}></div>
                    <span className="text-sm text-gray-900 capitalize">{tipo}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}