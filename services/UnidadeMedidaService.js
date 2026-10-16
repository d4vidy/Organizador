
import {
  collection,
  addDoc,
  getDocs,
  serverTimestamp,
} from 'firebase/firestore';

import { db } from '../config/Firebase';

const unidadesRef = collection(db, 'unidadesMedida');

export async function listarUnidadesMedida() {
  const resultado = await getDocs(unidadesRef);

  return resultado.docs
    .map((documento) => ({
      id: documento.id,
      ...documento.data(),
    }))
    .sort((a, b) => a.nome.localeCompare(b.nome, 'pt-BR'));
}

export async function cadastrarUnidadeMedida(nome) {
  const nomeFormatado = nome.trim().toUpperCase();

  if (!nomeFormatado) {
    throw new Error('Informe o nome da unidade de medida.');
  }

  const unidadesExistentes = await listarUnidadesMedida();

  const duplicada = unidadesExistentes.some(
    (unidade) =>
      unidade.nome?.toUpperCase() === nomeFormatado
  );

  if (duplicada) {
    throw new Error('Essa unidade de medida já está cadastrada.');
  }

  const documento = await addDoc(unidadesRef, {
    nome: nomeFormatado,
    criadoEm: serverTimestamp(),
  });

  return {
    id: documento.id,
    nome: nomeFormatado,
  };
}
