
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

import { db } from '../config/Firebase';

const produtosRef = collection(db, 'produtos');

export async function cadastrarProduto(produto) {
  const docRef = await addDoc(produtosRef, {
    ...produto,
    criadoEm: serverTimestamp(),
  });

  return docRef.id;
}

export async function listarProdutos() {
  const resultado = await getDocs(produtosRef);

  return resultado.docs.map((item) => ({
    id: item.id,
    ...item.data(),
  }));
}

export async function atualizarProduto(id, dados) {
  const produtoRef = doc(db, 'produtos', id);
  await updateDoc(produtoRef, dados);
}

export async function excluirProduto(id) {
  const produtoRef = doc(db, 'produtos', id);
  await deleteDoc(produtoRef);
}

export async function excluirTodosProdutos() {
  const resultado = await getDocs(produtosRef);

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