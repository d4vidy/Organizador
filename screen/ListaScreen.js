import React from 'react';
import { FlatList, View, Text, Touchable } from 'react-native';
import { styles } from '../style/ListaStyle';
import {Ionicons} from '@expo/vector-icons';

import CadastroScreen from './CadastroScreen';
import LançamentoScreen from './LançamentoScreen';

const data = Array.from(
  { length: 80 },
  (_, i) => ({ id: i, name: `Item ${i + 1}` })
);

export default function ListaScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <TouchableOpacity style={styles.botao} onPress={() => navigation.navigate('Lançamento')}>
          <Text style={styles.textoBotao}>
            <Ionicons name="add" size={20} color="fff"/>
            Lançamento
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.botao} onPress={() => navigation.navigate(CadastroScreen)}>
          <Text style={styles.textoBotao}>
            <Ionicons name="create" size={20} color="fff"/>
            Cadastrar Item
          </Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.titulo}>Lista de Itens</Text>
      <Text style={styles.subtitulo}>
        Aqui estão os itens cadastrados:
      </Text>

      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.texto}>{item.name}</Text>
          </View>
        )}
      />

    </View>
  );
}

