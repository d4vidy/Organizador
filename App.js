import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

import ListaScreen from './screen/ListaScreen';
import CadastroProduto from './screen/CadastroScreen';
import LancamentoScreen from './screen/LancamentoScreen';

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Lista">
        <Stack.Screen name="Lista" component={ListaScreen} options={{ headerShown: false}}/>
        <Stack.Screen name="Cadastro" component={CadastroProduto} options={{ headerShown: false}}/>
        <Stack.Screen name="Lançamento" component={LancamentoScreen} options={{ headerShown: false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
