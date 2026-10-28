
import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
  writeBatch,
} from 'firebase/firestore';

import { db, auth } from '../config/Firebase';

function obterUid() {
  const usuario = auth.currentUser;

  if (!usuario) {
    throw new Error('Nenhum usuário autenticado.');
  }

  return usuario.uid;
}

function obterProdutosRef() {
  const uid = obterUid();

  return collection(db, 'usuarios', uid, 'produtos');
}


export async function cadastrarProduto(produto) {
  const nomeFormatado = produto.nome.trim();

  if (!nomeFormatado) {
    throw new Error('Informe o nome do produto.');
  }

  const produtos = await listarProdutos();

  const duplicado = produtos.some(
    (item) =>
      (item.nome || '').trim().toLowerCase() ===
      nomeFormatado.toLowerCase()
  );

  if (duplicado) {
    throw new Error('Já existe um produto com esse nome.');
  }

  const docRef = await addDoc(obterProdutosRef(), {
    ...produto,
    nome: nomeFormatado,
    criadoEm: serverTimestamp(),
  });

  return docRef.id;
}


export async function listarProdutos() {
  const resultado = await getDocs(obterProdutosRef());

  return resultado.docs.map((item) => ({
    id: item.id,
    ...item.data(),
  }));
}


export async function atualizarProduto(id, dados) {
  const uid = obterUid();
  const nomeFormatado = dados.nome.trim();

  if (!nomeFormatado) {
    throw new Error('Informe o nome do produto.');
  }

  const produtos = await listarProdutos();

  const duplicado = produtos.some(
    (item) =>
      item.id !== id &&
      (item.nome || '').trim().toLowerCase() ===
        nomeFormatado.toLowerCase()
  );

  if (duplicado) {
    throw new Error('Já existe outro produto com esse nome.');
  }

  const produtoRef = doc(
    db,
    'usuarios',
    uid,
    'produtos',
    id
  );

  await updateDoc(produtoRef, {
    ...dados,
    nome: nomeFormatado,
  });
}

export async function excluirProduto(id) {
  const uid = obterUid();

  const produtoRef = doc(
    db,
    'usuarios',
    uid,
    'produtos',
    id
  );

  await deleteDoc(produtoRef);
}

export async function excluirTodosProdutos() {
  const resultado = await getDocs(obterProdutosRef());

  if (resultado.empty) {
    return 0;
  }

  const documentos = resultado.docs;
  let quantidadeExcluida = 0;

  for (let i = 0; i < documentos.length; i += 500) {
    const lote = writeBatch(db);
    const grupo = documentos.slice(i, i + 500);

    grupo.forEach((item) => {
      lote.delete(item.ref);
    });

    await lote.commit();
    quantidadeExcluida += grupo.length;
  }

  return quantidadeExcluida;
}
