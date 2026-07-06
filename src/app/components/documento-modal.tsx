import { useState } from 'react';
import { X, Plus, Trash2, Upload, FileText } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

interface DocumentoModalProps {
  documento: {
    id: string;
    tipo: string;
    praticante: string;
    colaboradores: string[];
    dataGeracao: string;
  };
  onClose: () => void;
}

const colaboradoresDisponiveis = [
  'Ana Silva - Fisioterapeuta',
  'Carlos Santos - Psicólogo',
  'Maria Oliveira - Terapeuta Ocupacional',
  'João Costa - Fonoaudiólogo',
  'Paula Lima - Educador Físico',
  'Pedro Alves - Mediador',
];

interface ArquivoAnexo {
  id: string;
  nome: string;
  colaborador: string;
  dataUpload: string;
}

export function DocumentoModal({ documento, onClose }: DocumentoModalProps) {
  const [colaboradores, setColaboradores] = useState<string[]>(documento.colaboradores);
  const [novoColaborador, setNovoColaborador] = useState('');
  const [arquivos, setArquivos] = useState<ArquivoAnexo[]>([
    {
      id: '1',
      nome: 'relatorio_avaliacao.pdf',
      colaborador: 'Ana Silva',
      dataUpload: '15/12/2024 14:30',
    },
    {
      id: '2',
      nome: 'notas_sessao.pdf',
      colaborador: 'Carlos Santos',
      dataUpload: '16/12/2024 09:15',
    },
  ]);
  const [colaboradorArquivo, setColaboradorArquivo] = useState('');

  const handleAdicionarColaborador = () => {
    if (novoColaborador && !colaboradores.includes(novoColaborador)) {
      setColaboradores([...colaboradores, novoColaborador]);
      setNovoColaborador('');
    }
  };

  const handleRemoverColaborador = (colaborador: string) => {
    setColaboradores(colaboradores.filter((c) => c !== colaborador));
  };

  const handleUploadArquivo = () => {
    if (!colaboradorArquivo) {
      alert('Por favor, selecione um colaborador antes de fazer upload');
      return;
    }

    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.pdf';
    input.onchange = (e: any) => {
      const file = e.target.files?.[0];
      if (file) {
        const novoArquivo: ArquivoAnexo = {
          id: String(arquivos.length + 1),
          nome: file.name,
          colaborador: colaboradorArquivo.split(' - ')[0],
          dataUpload: new Date().toLocaleString('pt-BR'),
        };
        setArquivos([...arquivos, novoArquivo]);
        setColaboradorArquivo('');
      }
    };
    input.click();
  };

  const handleRemoverArquivo = (id: string) => {
    setArquivos(arquivos.filter((arq) => arq.id !== id));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <div>
            <h2 className="text-gray-900 flex items-center gap-2">
              <FileText className="h-6 w-6 text-indigo-600" />
              {documento.tipo}
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              Praticante: {documento.praticante} | Gerado em: {documento.dataGeracao}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="h-6 w-6 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Seção de Colaboradores */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Colaboradores do Documento</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Lista de Colaboradores */}
              <div className="flex flex-wrap gap-2">
                {colaboradores.map((colaborador) => (
                  <Badge
                    key={colaborador}
                    variant="secondary"
                    className="px-3 py-2 flex items-center gap-2 bg-indigo-100 text-indigo-700 hover:bg-indigo-200"
                  >
                    {colaborador}
                    <button
                      onClick={() => handleRemoverColaborador(colaborador)}
                      className="hover:text-indigo-900"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>

              {/* Adicionar Novo Colaborador */}
              <div className="flex gap-2 pt-4 border-t border-gray-200">
                <Select value={novoColaborador} onValueChange={setNovoColaborador}>
                  <SelectTrigger className="flex-1">
                    <SelectValue placeholder="Adicionar colaborador" />
                  </SelectTrigger>
                  <SelectContent>
                    {colaboradoresDisponiveis
                      .filter((col) => !colaboradores.includes(col))
                      .map((colaborador) => (
                        <SelectItem key={colaborador} value={colaborador}>
                          {colaborador}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
                <Button
                  onClick={handleAdicionarColaborador}
                  className="bg-indigo-600 hover:bg-indigo-700"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Adicionar
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Seção de Arquivos */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Arquivos PDF Anexados</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Upload de Arquivo */}
              <div className="p-4 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                <div className="flex gap-2 mb-3">
                  <Select value={colaboradorArquivo} onValueChange={setColaboradorArquivo}>
                    <SelectTrigger className="flex-1">
                      <SelectValue placeholder="Selecione o colaborador responsável" />
                    </SelectTrigger>
                    <SelectContent>
                      {colaboradores.map((colaborador) => (
                        <SelectItem key={colaborador} value={colaborador}>
                          {colaborador}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button
                    onClick={handleUploadArquivo}
                    className="bg-indigo-600 hover:bg-indigo-700"
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Upload PDF
                  </Button>
                </div>
                <p className="text-xs text-gray-500 text-center">
                  Selecione o colaborador e clique para fazer upload de um arquivo PDF
                </p>
              </div>

              {/* Lista de Arquivos */}
              {arquivos.length > 0 ? (
                <div className="space-y-2">
                  {arquivos.map((arquivo) => (
                    <div
                      key={arquivo.id}
                      className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-center gap-3 flex-1">
                        <div className="p-2 bg-red-100 rounded-lg">
                          <FileText className="h-5 w-5 text-red-600" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-900">{arquivo.nome}</p>
                          <p className="text-xs text-gray-500">
                            Por: {arquivo.colaborador} • {arquivo.dataUpload}
                          </p>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoverArquivo(arquivo.id)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <FileText className="h-12 w-12 mx-auto mb-2 text-gray-400" />
                  <p className="text-sm">Nenhum arquivo anexado ainda</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 px-6 py-4 flex justify-end gap-3">
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button className="bg-indigo-600 hover:bg-indigo-700">
            Salvar Alterações
          </Button>
        </div>
      </div>
    </div>
  );
}
