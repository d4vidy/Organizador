import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

import HomeScreen from './screen/HomeScreen';
import ListaScreen from './screen/ListaScreen';
import CadastroProduto from './screen/CadastroScreen';

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Tela Inicial">
        <Stack.Screen name="Tela Inicial" component={HomeScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="Lista" component={ListaScreen} options={{ headerShown: false}}/>
        <Stack.Screen name="Cadastro" component={CadastroProduto} options={{ headerShown: false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
