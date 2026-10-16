
import React, { useEffect, useState } from 'react';

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';

import { Ionicons } from '@expo/vector-icons';

import {
  cadastrarProduto as salvarProdutoNoBanco,
  atualizarProduto
} from '../services/ProdutoService';

import {
  listarCategorias,
  cadastrarCategoria as salvarCategoriaNoBanco,
} from '../services/CategoriaService';
import { listarUnidadesMedida } from '../services/UnidadeMedidaService'; 

import ModalCategoria from '../componentes/ModalCategoria';
import ModalMedida from '../componentes/ModalMedida';
import ModalNovaCategoria from '../componentes/ModalNovaCategoria';

import { styles } from '../style/CadastroStyle';

export default function CadastroProduto({ navigation, route }) {
  const produtoEditando = route.params?.produto;
  const [nome, setNome] = useState('');
  const [categoria, setCategoria] = useState('');
  const [categoriaId, setCategoriaId] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [unmedida, setUnMedida] = useState('');
  const [quantidade2, setQuantidade2] = useState('');

  const [unmedidas, setUnmedidas] = useState([]);
  const [categorias, setCategorias] = useState([]);

  const [dropdownCategoriaAberto, setDropdownCategoriaAberto] =
    useState(false);
  const [dropdownMedidaAberto, setDropdownMedidaAberto] =
    useState(false);

  const [modalCategoria, setModalCategoria] = useState(false);
  const [novaCategoria, setNovaCategoria] = useState('');

  useEffect(() => {
    async function carregarUnidades() {
      try {
        const resultado = await listarUnidadesMedida();

        setUnmedidas(resultado.map((unidade) => unidade.nome));
      } catch (erro) {
        console.error('Erro ao carregar unidades de medida:', erro);

        Alert.alert(
          'Erro',
          'Não foi possível carregar as unidades de medida.'
        );
      }
    }

    carregarUnidades();
  }, []);

  useEffect(() => {
    if (!produtoEditando) return;

    setNome(produtoEditando.nome ?? '');
    setCategoria(produtoEditando.categoria ?? '');
    setCategoriaId(produtoEditando.categoriaId ?? '');
    setQuantidade(String(produtoEditando.quantidade ?? ''));
    setUnMedida(produtoEditando.unmedida ?? '');
    setQuantidade2(String(produtoEditando.quantidade2 ?? ''));
  }, [produtoEditando]);

  useEffect(() => {
    async function carregarCategorias() {
      try {
        const resultado = await listarCategorias();
        console.log('Categorias carregadas:', resultado);
        setCategorias(resultado);
      } catch (erro) {
        console.error('Erro ao carregar categorias:', erro);

        Alert.alert(
          'Erro',
          'Não foi possível carregar as categorias.'
        );
      }
    }

    carregarCategorias();
    
  }, []);

  async function adicionarCategoria() {
    if (novaCategoria.trim() === '') {
      Alert.alert('Atenção!', 'Digite o nome da categoria.');
      return;
    }

    try {
      const nova = await salvarCategoriaNoBanco(novaCategoria);

      setCategorias((listaAtual) =>
        [...listaAtual, nova].sort((a, b) =>
          a.nome.localeCompare(b.nome, 'pt-BR')
        )
      );

      setCategoria(nova.nome);
      setCategoriaId(nova.id);

      setNovaCategoria('');
      setModalCategoria(false);

      Alert.alert('Sucesso!', 'Categoria cadastrada.');
    } catch (erro) {
      console.error('Erro ao cadastrar categoria:', erro);

      Alert.alert(
        'Não foi possível cadastrar',
        erro.message || 'Verifique sua conexão com o Firestore.'
      );
    }
  }

  async function cadastrarProduto() {
    if (
      nome.trim() === '' ||
      categoriaId === '' ||
      quantidade.trim() === '' ||
      unmedida.trim() === '' ||
      quantidade2.trim() === ''
    ) {
      Alert.alert(
        'Atenção!',
        'Preencha todos os campos e selecione uma categoria.'
      );
      return;
    }

    const qtd = Number(quantidade.replace(',', '.'));
    const qtdPorUnidade = Number(quantidade2.replace(',', '.'));

    if (
      !Number.isFinite(qtd) ||
      !Number.isFinite(qtdPorUnidade) ||
      qtd <= 0 ||
      qtdPorUnidade <= 0
    ) {
      Alert.alert(
        'Atenção!',
        'Informe quantidades numéricas maiores que zero.'
      );
      return;
    }

    try {
      const dadosProduto = {
        nome: nome.trim(),
        categoriaId,
        categoria: categoria.trim(),
        quantidade: qtd,
        unmedida,
        quantidade2: qtdPorUnidade,
      };

      if (produtoEditando?.id) {
        await atualizarProduto(produtoEditando.id, dadosProduto);

        Alert.alert(
          'Sucesso!',
          'Produto atualizado com sucesso.',
          [
            {
              text: 'OK',
              onPress: () => navigation.goBack(),
            },
          ]
        );
      } else {
        await salvarProdutoNoBanco(dadosProduto);

        setNome('');
        setCategoria('');
        setCategoriaId('');
        setQuantidade('');
        setUnMedida('');
        setQuantidade2('');

        Alert.alert(
          'Sucesso!',
          'Produto cadastrado no banco de dados.',
          [
            {
              text: 'OK',
              onPress: () => navigation.goBack(),
            },
          ]
        );
      }
    } catch (erro) {
      console.error('Erro ao salvar produto:', erro);

      Alert.alert(
        'Erro!',
        'Não foi possível salvar o produto. Verifique sua conexão e as regras do Firestore.'
      );
    }
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <ScrollView
            contentContainerStyle={{ flexGrow: 1, paddingBottom: 24 }}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <Text style={styles.titulo}>
              {produtoEditando ? 'Editar Produto' : 'Cadastro de Produto'}
            </Text>

            <Text style={styles.label}>Nome do produto</Text>
            <TextInput
              style={styles.input}
              placeholder="Ex: Arroz Tipo 1"
              value={nome}
              onChangeText={setNome}
            />

            <Text style={styles.label}>Selecione a categoria</Text>

            <TouchableOpacity
              style={styles.dropdown}
              onPress={() => setDropdownCategoriaAberto(true)}
            >
              <Text
                style={
                  categoria
                    ? styles.textoSelecionado
                    : styles.placeholder
                }
              >
                {categoria || 'Selecione uma categoria.'}
              </Text>

              <Ionicons name="caret-down" size={20} color="#000" />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.botaoCategoria}
              onPress={() => setModalCategoria(true)}
            >
              <Text style={styles.textoBotaoCategoria}>
                Adicionar nova categoria
              </Text>
            </TouchableOpacity>

            <Text style={styles.label}>Quantidade</Text>
            <TextInput
              style={styles.input}
              placeholder="Ex: 25"
              keyboardType="numeric"
              value={quantidade}
              onChangeText={setQuantidade}
            />

            <Text style={styles.label}>Unidade de Medida</Text>

            <TouchableOpacity
              style={styles.dropdown}
              onPress={() => setDropdownMedidaAberto(true)}
            >
              <Text
                style={
                  unmedida
                    ? styles.textoSelecionado
                    : styles.placeholder
                }
              >
                {unmedida || 'Selecione uma unidade de medida.'}
              </Text>

              <Ionicons name="caret-down" size={20} color="#000" />
            </TouchableOpacity>

            <Text style={styles.label}>
              Quantidade por {unmedida || 'Unidade de Medida'}
            </Text>

            <TextInput
              style={styles.input}
              placeholder="Ex: 1"
              keyboardType="numeric"
              value={quantidade2}
              onChangeText={setQuantidade2}
            />

            <TouchableOpacity
              style={styles.botao}
              onPress={cadastrarProduto}
            >
              <Text style={styles.textoBotao}>
                {produtoEditando ? 'Salvar Alterações' : 'Cadastrar Produto'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.botaoVoltar}
              onPress={() => navigation.goBack()}
            >
              <Text style={styles.textoBotaoVoltar}>Voltar</Text>
            </TouchableOpacity>
          </ScrollView>
        </KeyboardAvoidingView>

        <ModalCategoria
          visible={dropdownCategoriaAberto}
          categorias={categorias}
          onSelecionar={(item) => {
            setCategoria(item.nome);
            setCategoriaId(item.id);
            setDropdownCategoriaAberto(false);
          }}
          onFechar={() => setDropdownCategoriaAberto(false)}
        />

        <ModalMedida
          visible={dropdownMedidaAberto}
          unmedidas={unmedidas}
          onSelecionar={(item) => {
            setUnMedida(item);
            setDropdownMedidaAberto(false);
          }}
          onFechar={() => setDropdownMedidaAberto(false)}
        />

        <ModalNovaCategoria
          visible={modalCategoria}
          novaCategoria={novaCategoria}
          setNovaCategoria={setNovaCategoria}
          onAdicionar={adicionarCategoria}
          onFechar={() => {
            setNovaCategoria('');
            setModalCategoria(false);
          }}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
