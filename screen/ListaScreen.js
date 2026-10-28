
import React, { useState, useCallback, useMemo } from 'react';
import {
  FlatList,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { signOut } from 'firebase/auth';
import { auth } from '../config/Firebase';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

import { styles } from '../style/ListaStyle';

import  ModalFiltro from '../componentes/ModalFiltro';
import { listarProdutos, excluirTodosProdutos } from '../services/ProdutoService';
import { listarCategorias } from '../services/CategoriaService';

export default function ListaScreen({ navigation }) {
  const [produtos, setProdutos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(false);
  const [produtoExpandido, setProdutoExpandido] = useState(null);

  const [pesquisa, setPesquisa] = useState('');
  const [categoriaSelecionada, setCategoriaSelecionada] = useState(null);
  const [modalFiltroAberto, setModalFiltroAberto] = useState(false);

  useFocusEffect(
    useCallback(() => {
      let ativo = true;

      async function carregarDados() {
        setCarregando(true);
        setErro(false);

        try {
          const resultado = await listarProdutos();

          if (ativo) {
            setProdutos(resultado);
          }
        } catch (error) {
          console.error('Erro ao carregar produtos:', error);

          if (ativo) {
            setErro(true);
          }
        }

        try {
          const resultadoCategorias = await listarCategorias();

          if (ativo) {
            setCategorias(resultadoCategorias);
          }
        } catch (error) {
          console.error('Erro ao carregar categorias:', error);
        }

        if (ativo) {
          setCarregando(false);
        }
      }

      carregarDados();

      return () => {
        ativo = false;
      };
    }, [])
  );

  const executarExclusao = async () => {
    try {
      const quantidade = await excluirTodosProdutos();

      // Atualiza a lista imediatamente
      setProdutos([]);

      Alert.alert(
        'Operação concluída',
        quantidade === 0
          ? 'Não havia produtos cadastrados para excluir.'
          : `${quantidade} produto(s) excluído(s) com sucesso.`
      );
    } catch (erro) {
      console.error('Erro ao excluir produtos:', erro);

      Alert.alert(
        'Erro',
        'Não foi possível excluir todos os produtos. Verifique sua conexão e tente novamente.'
      );
    }
  };

  const confirmarExclusao = () => {
    Alert.alert(
      'Apagar todos os produtos?',
      'Essa ação excluirá permanentemente todos os produtos do banco de dados. Não será possível desfazê-la.',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Apagar tudo',
          style: 'destructive',
          onPress: executarExclusao,
        },
      ]
    );
  };

  const produtosFiltrados = useMemo(() => {
    return produtos.filter((produto) => {
      const nomeProduto = (produto.nome || '').toLowerCase();
      const termoPesquisa = pesquisa.trim().toLowerCase();

      const correspondeNome = nomeProduto.includes(termoPesquisa);

      const correspondeCategoria =
        !categoriaSelecionada ||
        (produto.categoriaId
          ? produto.categoriaId === categoriaSelecionada.id
          : produto.categoria === categoriaSelecionada.nome);

      return correspondeNome && correspondeCategoria;
    });
  }, [produtos, pesquisa, categoriaSelecionada]);

  const alternarExpansao = (id) => {
    setProdutoExpandido((atual) => atual === id ? null : id);
  };

  const renderizarProduto = ({ item }) => {
    const expandido = produtoExpandido === item.id;

    return (
      <TouchableOpacity
        style={styles.item}
        onPress={() => alternarExpansao(item.id)}
        activeOpacity={0.75}
      >
        <View style={styles.linhaProduto}>
          <Text style={styles.nomeProduto}>
            {item.nome}
          </Text>

          <View style={styles.quantidadeContainer}>
            <Text style={styles.quantidadeProduto}>
              {item.quantidade} {item.unmedida}
            </Text>

            <Ionicons
              name={expandido ? 'chevron-up' : 'chevron-down'}
              size={18}
              color="#00796B"
            />
          </View>
        </View>

        {expandido && (
          <View style={styles.detalhesProduto}>
            <View style={styles.linhaDetalhe}>
              <Text style={styles.rotuloDetalhe}>Categoria</Text>
              <Text style={styles.valorDetalhe}>
                {item.categoria}
              </Text>
            </View>

            <View style={styles.linhaDetalhe}>
              <Text style={styles.rotuloDetalhe}>
                Quantidade em estoque
              </Text>
              <Text style={styles.valorDetalhe}>
                {item.quantidade} {item.unmedida}
              </Text>
            </View>

            <View style={styles.linhaDetalhe}>
              <Text style={styles.rotuloDetalhe}>
                Quantidade por {item.unmedida}
              </Text>
              <Text style={styles.valorDetalhe}>
                {item.quantidade2}
              </Text>
            </View>
            <TouchableOpacity
              style={styles.botaoEditar}
              onPress={() => navigation.navigate('Cadastro', { produto: item })}
              activeOpacity={0.8}
            >
              <Ionicons name="create-outline" size={19} color="#FFFFFF" />
              <Text style={styles.textoBotaoEditar}>Editar produto</Text>
            </TouchableOpacity>
          </View>


        )}
      </TouchableOpacity>
    );
  };

  const realizarLogout = () => {
    Alert.alert(
      'Sair da conta',
      'Deseja realmente sair do Organizador?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Sair',
          onPress: async () => {
            try {
              await signOut(auth);
            } catch (error) {
              console.error('Erro ao sair da conta:', error);
              Alert.alert('Erro', 'Não foi possível sair da conta.');
            }
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.cabecalho}>
        <View style={styles.linhaCabecalho}>
          <Text style={styles.titulo}>Lista de Itens</Text>

          <View style={styles.acoesCabecalho}>
            {/* Botão de Logout */}
            <TouchableOpacity
              style={styles.botaoOpcoes}
              onPress={realizarLogout}
              activeOpacity={0.6}
              accessibilityRole="button"
              accessibilityLabel="Sair da conta"
            >
              <Ionicons
                name="log-out-outline"
                size={30}
                color="#d93025"
              />
            </TouchableOpacity>

            {/* Botão de apagar todos os produtos */}
            <TouchableOpacity
              style={styles.botaoOpcoes}
              onPress={confirmarExclusao}
              activeOpacity={0.6}
              accessibilityRole="button"
              accessibilityLabel="Apagar todos os produtos"
            >
              <Ionicons
                name="trash-outline"
                size={30}
                color="#d93025"
              />
            </TouchableOpacity>
          </View>
        </View>
        <Text style={styles.subtitulo}>
          Encontre e organize seus produtos
        </Text>

        <View style={styles.pesquisaContainer}>
          <Ionicons name="search" size={21} color="#78909C" />

          <TextInput
            style={styles.inputPesquisa}
            placeholder="Pesquisar produto..."
            placeholderTextColor="#78909C"
            value={pesquisa}
            onChangeText={setPesquisa}
            autoCapitalize="none"
            returnKeyType="search"
          />

          {pesquisa.length > 0 && (
            <TouchableOpacity onPress={() => setPesquisa('')}>
              <Ionicons name="close-circle" size={21} color="#78909C" />
            </TouchableOpacity>
          )}
        </View>

        <TouchableOpacity
          style={styles.botaoFiltro}
          onPress={() => setModalFiltroAberto(true)}
          activeOpacity={0.75}
        >
          <Ionicons name="filter-outline" size={20} color="#00796B" />

          <Text style={styles.textoFiltro}>
            {categoriaSelecionada
              ? categoriaSelecionada.nome
              : 'Todas as categorias'}
          </Text>

          <Ionicons name="chevron-down" size={18} color="#00796B" />
        </TouchableOpacity>
      </View>

      <View style={styles.areaLista}>
        {carregando ? (
          <View style={styles.estadoLista}>
            <ActivityIndicator size="large" color="#00796B" />
            <Text>Carregando produtos...</Text>
          </View>
        ) : erro ? (
          <View style={styles.estadoLista}>
            <Text>
              Não foi possível carregar os produtos.
              Verifique sua conexão e as regras do Firestore.
            </Text>
          </View>
        ) : (
          <FlatList
            data={produtosFiltrados}
            keyExtractor={(item) => item.id}
            renderItem={renderizarProduto}
            contentContainerStyle={styles.lista}
            keyboardShouldPersistTaps="handled"
            ListEmptyComponent={
              <Text style={styles.mensagemVazia}>
                {produtos.length === 0
                  ? 'Nenhum produto cadastrado.'
                  : 'Nenhum produto encontrado para essa pesquisa ou categoria.'}
              </Text>
            }
          />
        )}
      </View>

      <View style={styles.rodape}>
        <TouchableOpacity
          style={styles.botao}
          onPress={() => navigation.navigate('Lançamento')}
          activeOpacity={0.8}
        >
          <Ionicons name="swap-horizontal" size={20} color="#fff" />
          <Text style={styles.textoBotao}>Lançamento</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.botao}
          onPress={() => navigation.navigate('Cadastro')}
          activeOpacity={0.8}
        >
          <Ionicons name="add-circle-outline" size={20} color="#fff" />
          <Text style={styles.textoBotao}>Cadastrar Item</Text>
        </TouchableOpacity>
      </View>

      <ModalFiltro
        visible={modalFiltroAberto}
        categorias={categorias}
        categoriaSelecionada={categoriaSelecionada}
        onSelecionarCategoria={(item) => {
          setCategoriaSelecionada(item);
          setModalFiltroAberto(false);
        }}
        onSelecionarTodas={() => {
          setCategoriaSelecionada(null);
          setModalFiltroAberto(false);
        }}
        onFechar={() => setModalFiltroAberto(false)}
      />
    </SafeAreaView>
  );
}
