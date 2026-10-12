import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import { styles } from '../style/HomeStyle';


export default function HomeScreen({ navigation}) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Organizador!</Text>
      <Text style={styles.subtitle}>Controle seu estoque com mais facilidade.</Text>
      <TouchableOpacity 
        style={styles.botao}
        onPress={() => navigation.navigate('Lista')}
      >
        <Text style={styles.textoBotao}>Ir para Lista</Text>
      </TouchableOpacity>
    </View>
  );
}
