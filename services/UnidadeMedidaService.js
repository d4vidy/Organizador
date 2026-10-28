
const unidadesMedida = [
  { id: 'UN', nome: 'UN' },
  { id: 'FD', nome: 'FD' },
  { id: 'CX', nome: 'CX' },
  { id: 'DZ', nome: 'DZ' },
  { id: 'PCT', nome: 'PCT' },
];

// Retorna as unidades de medida disponíveis
export async function listarUnidadesMedida() {
  return [...unidadesMedida].sort((a, b) =>
    a.nome.localeCompare(b.nome, 'pt-BR')
  );
}
