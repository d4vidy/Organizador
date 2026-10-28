
import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  serverTimestamp,
} from 'firebase/firestore';

import { db, auth } from '../config/Firebase';

function obterUid() {
  const usuario = auth.currentUser;

  if (!usuario) {
    throw new Error('Nenhum usuário autenticado.');
  }

  return usuario.uid;
}

function obterCategoriasRef() {
  const uid = obterUid();

  return collection(db, 'usuarios', uid, 'categorias');
}

export async function listarCategorias() {
  const resultado = await getDocs(obterCategoriasRef());

  return resultado.docs
    .map((item) => ({
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
      (item.nome || '').trim().toLowerCase() ===
      nomeFormatado.toLowerCase()
  );

  if (duplicada) {
    throw new Error('Essa categoria já existe.');
  }

  const documento = await addDoc(obterCategoriasRef(), {
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
  const uid = obterUid();

  const categoriaRef = doc(
    db,
    'usuarios',
    uid,
    'categorias',
    id
  );

  await updateDoc(categoriaRef, {
    ativa: false,
  });
}
