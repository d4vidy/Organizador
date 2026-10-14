
import React, { useState, useCallback } from 'react';

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Modal,
  FlatList,
  ActivityIndicator,
} from 'react-native';

import { useFocusEffect } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

import { styles } from '../style/CadastroStyle';
import { listarProdutos } from '../services/Produto';
import { registrarLancamento } from '../services/LancamentoService';

export default function LancamentoScreen({ navigation }) {
  const [produtos, setProdutos] = useState([]);
  const [produtoSelecionado, setProdutoSelecionado] = useState(null);

  const [quantidade, setQuantidade] = useState('');
  const [tipoLancamento, setTipoLancamento] = useState('');

  const [modalProdutoAberto, setModalProdutoAberto] = useState(false);
  const [carregandoProdutos, setCarregandoProdutos] = useState(true);
  const [salvando, setSalvando] = useState(false);
  const [erroProdutos, setErroProdutos] = useState(false);

  useFocusEffect(
    useCallback(() => {
      let ativo = true;

      async function carregarProdutos() {
        setCarregandoProdutos(true);
        setErroProdutos(false);

        try {
          const resultado = await listarProdutos();

          if (ativo) {
            setProdutos(resultado);
          }
        } catch (erro) {
          console.error('Erro ao carregar produtos:', erro);

          if (ativo) {
            setErroProdutos(true);
          }
        } finally {
          if (ativo) {
            setCarregandoProdutos(false);
          }
        }
      }

      carregarProdutos();

      return () => {
        ativo = false;
      };
    }, [])
  );

  function selecionarProduto(produto) {
    setProdutoSelecionado(produto);
    setModalProdutoAberto(false);
  }

  async function cadastrarLancamento() {
    if (
      !produtoSelecionado ||
      quantidade.trim() === '' ||
      tipoLancamento === ''
    ) {
      Alert.alert(
        'Atenção!',
        'Selecione um produto, informe a quantidade e o tipo de lançamento.'
      );
      return;
    }

    const quantidadeNumerica = Number(
      quantidade.replace(',', '.')
    );

    if (
      !Number.isFinite(quantidadeNumerica) ||
      quantidadeNumerica <= 0
    ) {
      Alert.alert(
        'Quantidade inválida',
        'Informe uma quantidade numérica maior que zero.'
      );
      return;
    }

    setSalvando(true);

    try {
      await registrarLancamento({
        produtoId: produtoSelecionado.id,
        quantidade: quantidadeNumerica,
        tipo: tipoLancamento,
      });

      const mensagem =
        `${tipoLancamento} de ${quantidadeNumerica} ` +
        `${produtoSelecionado.unmedida || 'unidades'} registrado.\n\n` +
        `Produto: ${produtoSelecionado.nome}`;

      setQuantidade('');
      setTipoLancamento('');
      setProdutoSelecionado(null);

      Alert.alert('Sucesso!', mensagem);
    } catch (erro) {
      console.error('Erro ao registrar lançamento:', erro);

      Alert.alert(
        'Não foi possível registrar',
        erro?.message ||
          'Verifique sua conexão e as regras do Firestore.'
      );
    } finally {
      setSalvando(false);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>
        Lançamento de Produto
      </Text>

      <Text style={styles.label}>Produto:</Text>

      <TouchableOpacity
        style={styles.dropdown}
        onPress={() => setModalProdutoAberto(true)}
        activeOpacity={0.7}
        disabled={salvando}
      >
        <Text
          style={
            produtoSelecionado
              ? styles.textoSelecionado
              : styles.placeholder
          }
        >
          {produtoSelecionado
            ? produtoSelecionado.nome
            : 'Selecione um produto'}
        </Text>

        <Ionicons
          name="caret-down"
          size={20}
          color="#000"
        />
      </TouchableOpacity>

      {produtoSelecionado && (
        <Text>
          Estoque atual: {produtoSelecionado.quantidade}{' '}
          {produtoSelecionado.unmedida}
        </Text>
      )}

      <Text style={[styles.label, styles.labelLancamento]}>
        Quantidade:
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Ex: 10"
        keyboardType="decimal-pad"
        value={quantidade}
        onChangeText={setQuantidade}
        editable={!salvando}
      />

      <Text style={styles.label}>
        Tipo de lançamento:
      </Text>

      <View style={styles.seletorLancamento}>
        <TouchableOpacity
          style={[
            styles.opcaoLancamento,
            tipoLancamento === 'Entrada' &&
              styles.entradaSelecionada,
          ]}
          onPress={() => setTipoLancamento('Entrada')}
          activeOpacity={0.8}
          disabled={salvando}
        >
          <Ionicons
            name="add-circle-outline"
            size={22}
            color={
              tipoLancamento === 'Entrada'
                ? '#fff'
                : '#16803c'
            }
          />

          <Text
            style={[
              styles.textoOpcaoLancamento,
              tipoLancamento === 'Entrada' &&
                styles.textoOpcaoSelecionada,
            ]}
          >
            Entrada
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.opcaoLancamento,
            tipoLancamento === 'Saída' &&
              styles.saidaSelecionada,
          ]}
          onPress={() => setTipoLancamento('Saída')}
          activeOpacity={0.8}
          disabled={salvando}
        >
          <Ionicons
            name="remove-circle-outline"
            size={22}
            color={
              tipoLancamento === 'Saída'
                ? '#fff'
                : '#d93025'
            }
          />

          <Text
            style={[
              styles.textoOpcaoLancamento,
              tipoLancamento === 'Saída' &&
                styles.textoOpcaoSelecionada,
            ]}
          >
            Saída
          </Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.botao}
        onPress={cadastrarLancamento}
        activeOpacity={0.8}
        disabled={salvando}
      >
        {salvando ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.textoBotao}>
            Cadastrar lançamento
          </Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.botaoVoltar}
        onPress={() => navigation.goBack()}
        activeOpacity={0.8}
        disabled={salvando}
      >
        <Text style={styles.textoBotaoVoltar}>
          Voltar
        </Text>
      </TouchableOpacity>

      <Modal
        visible={modalProdutoAberto}
        transparent
        animationType="fade"
        onRequestClose={() => setModalProdutoAberto(false)}
      >
        <View style={styles.modalFundo}>
          <View style={styles.modalCaixa}>
            <Text style={styles.modalTitulo}>
              Selecionar produto
            </Text>

            {carregandoProdutos ? (
              <ActivityIndicator size="large" />
            ) : erroProdutos ? (
              <Text>
                Não foi possível carregar os produtos.
              </Text>
            ) : (
              <FlatList
                data={produtos}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.modalOpcao}
                    onPress={() => selecionarProduto(item)}
                  >
                    <Text style={styles.modalTextoOpcao}>
                      {item.nome}
                    </Text>

                    <Text>
                      Estoque: {item.quantidade}{' '}
                      {item.unmedida}
                    </Text>
                  </TouchableOpacity>
                )}
                ListEmptyComponent={
                  <Text>
                    Nenhum produto cadastrado.
                  </Text>
                }
              />
            )}

            <TouchableOpacity
              style={styles.modalCancelar}
              onPress={() => setModalProdutoAberto(false)}
            >
              <Text style={styles.modalTextoCancelar}>
                Cancelar
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}
