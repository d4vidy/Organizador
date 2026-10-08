import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Modal
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import ModalCategoria from '../componentes/ModalCategoria';
import ModalMedida from '../componentes/ModalMedida';
import ModalNovaCategoria from '../componentes/ModalNovaCategoria';

import { styles } from '../style/CadastroStyle';
import { FlatList } from 'react-native-gesture-handler';

export default function CadastroProduto({ navigation }) {
  const [nome, setNome] = useState('');
  const [categoria, setCategoria] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [unmedida, setUnMedida] = useState('');
  const [quantidade2, setQuantidade2] = useState('');

  const [unmedidas, setUnMedidas] = useState([ 
    'UN', 
    'FD', 
    'CX', 
    'DZ', 
    'PCT',
  ]);
  const [categorias, setCategorias] = useState([ 
    'Alimentos', 
    'Bebidas', 
    'Limpeza', 
    'Higiene', 
  ]);

  const [dropdownCategoriaAberto, setDropdownCategoriaAberto] = useState(false);
  const [dropdownMedidaAberto, setDropdownMedidaAberto] = useState(false);

  const [modalCategoria, setModalCategoria] = useState(false);
  const [novaCategoria, setNovaCategoria] = useState('');

  function adicionarCategoria() { 
    if (novaCategoria.trim() === '') { 
      Alert.alert( 'Atenção!', 'Digite o nome da categoria.' ); 
      return; 
    } 
    setCategorias([ ...categorias, novaCategoria.trim() ]); 
    setCategoria(novaCategoria.trim()); 
    setNovaCategoria(''); 
    setModalCategoria(false); }

  function cadastrarProduto() {
    if (
      nome.trim() === '' ||
      categoria.trim() === '' ||
      quantidade.trim() === '' ||
      unmedida.trim() === '' ||
      quantidade2.trim() === ''
    ) {
      Alert.alert('Atenção!', 'Preencha todos os campos');
      return;
    }

    Alert.alert('Produto cadastrado com sucesso!',
       `Nome: ${nome}\n
        Categoria: ${categoria}\n
        Quantidade: ${quantidade}\n 
        Unidade de medida:${unmedida}\n
        Quantidade por ${unmedida}: ${quantidade2}`);
    
    setNome('');
    setCategoria('');
    setQuantidade('');
    setUnMedida('');
    setQuantidade2('');
  }

  return (
    <View style={styles.container}>

      <Text style={styles.titulo}>Cadastro de Produto</Text>

      <Text style={styles.label}>Nome do produto</Text>
      <TextInput
        style={styles.input}
        placeholder="Ex: Arroz Tipo 1"
        //autoCapitalize="characters"
        value={nome}
        onChangeText={setNome}
      />

      <Text style={styles.label}>Selecione a categoria</Text>
      <TouchableOpacity
        style={styles.dropdown}
        onPress={() => setDropdownCategoriaAberto(true)}
      >
        <Text
         style={categoria 
          ? styles.textoSelecionado
          : styles.placeholder}>
          {categoria || 'Selecione uma categoria.'}
        </Text>
        <Ionicons name="caret-down" size={20} color="#000" />
      </TouchableOpacity> 

      <TouchableOpacity
       style={styles.botaoCategoria}
       onPress={() => setModalCategoria(true)}>
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
         style={unmedida 
          ? styles.textoSelecionado
          : styles.placeholder}>
          {unmedida || 'Selecione uma unidade de medida.'}
        </Text>
        <Ionicons name="caret-down" size={20} color="#000" />
      </TouchableOpacity>

      <Text style={styles.label}>Quantidade por {unmedida || 'Unidade de Medida'}</Text>
      <TextInput
       style={styles.input}
       placeholder={`Ex: 1 UN`}
       keyboardType="numeric"
       value={quantidade2}
       onChangeText={setQuantidade2}
      />

      <TouchableOpacity
        style={styles.botao}
        onPress={cadastrarProduto}
      >
        <Text style={styles.textoBotao}>Cadastrar Produto</Text>
      </TouchableOpacity>

      <ModalCategoria
        visible={dropdownCategoriaAberto}
        categorias={categorias}
        onSelecionar={(item) => {
          setCategoria(item);
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
    </View>
  );
}

