import React, { useEffect, useState } from 'react';
import {
  View,
  ActivityIndicator
} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './config/Firebase';

import ListaScreen from './screen/ListaScreen';
import CadastroProduto from './screen/CadastroScreen';
import LancamentoScreen from './screen/LancamentoScreen';

import LoginScreen from './screen/LoginScreen';
import RegisterScreen from './screen/RegisterScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  const [usuario, setUsuario] = useState(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const cancelarObservador = onAuthStateChanged(
      auth,
      (usuarioAutenticado) => {
        setUsuario(usuarioAutenticado);
        setCarregando(false);
      },
      (erro) => {
        console.error('Erro de autenticação:', erro);
        setCarregando(false);
      }
    );

    return cancelarObservador;
  }, []);

  if (carregando) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#F7FAFA'
        }}
      >
        <ActivityIndicator size="large" color="#00796B" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {usuario ? (
          <>
            <Stack.Screen name="Lista" component={ListaScreen}/>
            <Stack.Screen name="Cadastro" component={CadastroProduto}/>
            <Stack.Screen name="Lançamento" component={LancamentoScreen}/>
          </>
        ) : (
          <>
            <Stack.Screen name="Login" component={LoginScreen}/>
            <Stack.Screen name="Registro" component={RegisterScreen}/>
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
