import React from 'react';
import { FlatList, View, Text } from 'react-native';

import {styles} from '../style/ListaStyle';

const data =  Array.from({ length: 80 }, (_, i) => ({ id: i, name: `Item ${i + 1}` }));

export default function ListaScreen() {
  return (
   
    <FlatList
      data={data}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <View style={styles.item}>
          <Text style={styles.text}>{item.name}</Text>
        </View>
      )}
      contentContainerStyle={styles.container}
    />
  );
}


