
import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
} from 'firebase/firestore';

import { db } from '../config/Firebase';

const produtosRef = collection(db, 'produtos');

// Cadastrar produto
export async function cadastrarProduto(produto) {
  const docRef = await addDoc(produtosRef, {
    ...produto,
    criadoEm: serverTimestamp(),
  });

  return docRef.id;
}

// Listar produtos
export async function listarProdutos() {
  const resultado = await getDocs(produtosRef);

  return resultado.docs.map((item) => ({
    id: item.id,
    ...item.data(),
  }));
}

// Editar produto
export async function atualizarProduto(id, dados) {
  const produtoRef = doc(db, 'produtos', id);
  await updateDoc(produtoRef, dados);
}

// Excluir produto
export async function excluirProduto(id) {
  const produtoRef = doc(db, 'produtos', id);
  await deleteDoc(produtoRef);
}
