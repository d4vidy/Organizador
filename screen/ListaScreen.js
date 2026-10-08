import React from 'react';
import { FlatList, View, Text } from 'react-native';

import { styles } from '../style/ListaStyle';

const data = Array.from(
  { length: 80 },
  (_, i) => ({ id: i, name: `Item ${i + 1}` })
);

export default function ListaScreen({ navigation }) {
  return (
    <View style={styles.container}>
      
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

