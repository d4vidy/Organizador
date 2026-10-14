
import React, { useState, useCallback } from 'react';
import {
  FlatList,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

import { styles } from '../style/ListaStyle';
import { listarProdutos } from '../services/Produto';

export default function ListaScreen({ navigation }) {
  const [produtos, setProdutos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(false);

  useFocusEffect(
    useCallback(() => {
      let ativo = true;

      async function carregarProdutos() {
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
        } finally {
          if (ativo) {
            setCarregando(false);
          }
        }
      }

      carregarProdutos();

      return () => {
        ativo = false;
      };
    }, [])
  );

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 20,
        }}
      >
        <TouchableOpacity
          style={styles.botao}
          onPress={() => navigation.navigate('Lançamento')}
        >
          <Text style={styles.textoBotao}>
            <Ionicons name="add" size={20} color="#fff" />
            {' '}Lançamento
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.botao}
          onPress={() => navigation.navigate('Cadastro')}
        >
          <Text style={styles.textoBotao}>
            <Ionicons name="create" size={20} color="#fff" />
            {' '}Cadastrar Item
          </Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.titulo}>Lista de Itens</Text>

      <Text style={styles.subtitulo}>
        Aqui estão os itens cadastrados:
      </Text>

      <FlatList
        data={produtos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.texto}>
              {item.nome}
            </Text>

            <Text>
              Categoria: {item.categoria}
            </Text>

            <Text>
              Quantidade: {item.quantidade} {item.unmedida}
            </Text>

            <Text>
              Quantidade por {item.unmedida}: {item.quantidade2}
            </Text>
          </View>
        )}
        ListEmptyComponent={
          <View style={{ alignItems: 'center', marginTop: 20 }}>
            {carregando ? (
              <>
                <ActivityIndicator size="large" />
                <Text>Carregando produtos...</Text>
              </>
            ) : erro ? (
              <Text>
                Não foi possível carregar os produtos.
                Verifique sua conexão e as regras do Firestore.
              </Text>
            ) : (
              <Text>Nenhum produto cadastrado.</Text>
            )}
          </View>
        }
      />
    </View>
  );
}
