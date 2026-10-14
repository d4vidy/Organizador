
import {
  collection,
  doc,
  runTransaction,
  serverTimestamp,
} from 'firebase/firestore';

import { db } from '../config/Firebase';

export async function registrarLancamento({
  produtoId,
  quantidade,
  tipo,
}) {
  if (!produtoId) {
    throw new Error('Selecione um produto.');
  }

  if (!['Entrada', 'Saída'].includes(tipo)) {
    throw new Error('Tipo de lançamento inválido.');
  }

  if (
    !Number.isFinite(quantidade) ||
    quantidade <= 0
  ) {
    throw new Error('A quantidade deve ser maior que zero.');
  }

  const produtoRef = doc(db, 'produtos', produtoId);
  const lancamentoRef = doc(collection(db, 'lancamentos'));

  await runTransaction(db, async (transaction) => {
    const produtoSnapshot = await transaction.get(produtoRef);

    if (!produtoSnapshot.exists()) {
      throw new Error('O produto não foi encontrado.');
    }

    const produto = produtoSnapshot.data();
    const estoqueAtual = Number(produto.quantidade);

    if (
      !Number.isFinite(estoqueAtual) ||
      estoqueAtual < 0
    ) {
      throw new Error('O estoque atual do produto é inválido.');
    }

    const novaQuantidade =
      tipo === 'Entrada'
        ? estoqueAtual + quantidade
        : estoqueAtual - quantidade;

    if (novaQuantidade < 0) {
      throw new Error(
        `Estoque insuficiente. Disponível: ${estoqueAtual}.`
      );
    }

    transaction.update(produtoRef, {
      quantidade: novaQuantidade,
    });

    transaction.set(lancamentoRef, {
      produtoId,
      nomeProduto: produto.nome,
      tipo,
      quantidade,
      estoqueAnterior: estoqueAtual,
      estoquePosterior: novaQuantidade,
      criadoEm: serverTimestamp(),
    });
  });

  return true;
}
