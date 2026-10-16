import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  query,
  where,
  orderBy,
  serverTimestamp,
} from 'firebase/firestore';

import { db } from '../config/Firebase';

const categoriasRef = collection(db, 'categoria');


export async function listarCategorias() {
  const resultado = await getDocs(categoriasRef);

  console.log(
    'Quantidade de documentos:',
    resultado.size
  );

  console.log(
    'Documentos encontrados:',
    resultado.docs.map((item) => ({
      id: item.id,
      dados: item.data(),
    }))
  );

  return resultado.docs.map((item) => ({
    id: item.id,
    ...item.data(),
  }))
  .filter((categoria) => categoria.ativa !== false)
  .sort((a, b) =>
    (a.nome || '').localeCompare(b.nome || '', 'pt-BR')
  );
}


export async function cadastrarCategoria(nome) {
  const nomeFormatado = nome.trim();

  if (!nomeFormatado) {
    throw new Error('Informe o nome da categoria.');
  }

  const categorias = await listarCategorias();

  const duplicada = categorias.some(
    (item) =>
      item.nome.trim().toLowerCase() ===
      nomeFormatado.toLowerCase()
  );

  if (duplicada) {
    throw new Error('Essa categoria já existe.');
  }

  const documento = await addDoc(categoriasRef, {
    nome: nomeFormatado,
    ativa: true,
    criadoEm: serverTimestamp(),
  });

  return {
    id: documento.id,
    nome: nomeFormatado,
    ativa: true,
  };
}

export async function desativarCategoria(id) {
  const categoriaRef = doc(db, 'categorias', id);

  await updateDoc(categoriaRef, {
    ativa: false,
  });
}
