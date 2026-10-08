import React from 'react';
import { View, Text } from 'react-native';

import { styles } from '../style/HomeStyle';


export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Organizador!</Text>
      <Text style={styles.subtitle}>Controle seu estoque com mais facilidade.</Text>
    </View>
  );
}
