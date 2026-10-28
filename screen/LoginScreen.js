
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  StyleSheet,
} from 'react-native';
import { styles } from '../style/LoginStyle';
import { SafeAreaView } from 'react-native-safe-area-context';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/Firebase';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [carregando, setCarregando] = useState(false);

  async function realizarLogin() {
    if (!email.trim() || !senha) {
      Alert.alert('Atenção', 'Preencha o e-mail e a senha.');
      return;
    }

    try {
      setCarregando(true);

      await signInWithEmailAndPassword(
        auth,
        email.trim(),
        senha
      );

    } catch (error) {

      if (error.code === 'auth/invalid-credential') {
        Alert.alert('Erro', 'E-mail ou senha incorretos.');
      } else if (error.code === 'auth/invalid-email') {
        Alert.alert('Erro', 'Informe um e-mail válido.');
      } else {
        Alert.alert('Erro', 'Não foi possível realizar o login.');
      }
    } finally {
      setCarregando(false);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.conteudo}>
        <Text style={styles.titulo}>Organizador</Text>
        <Text style={styles.subtitulo}>
          Entre na sua conta
        </Text>

        <TextInput
          style={styles.input}
          placeholder="E-mail"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          value={email}
          onChangeText={setEmail}
        />

        <TextInput
          style={styles.input}
          placeholder="Senha"
          secureTextEntry
          value={senha}
          onChangeText={setSenha}
        />

        <TouchableOpacity
          style={styles.botao}
          onPress={realizarLogin}
          disabled={carregando}
        >
          {carregando ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text style={styles.textoBotao}>Entrar</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate('Registro')}
        >
          <Text style={styles.textoRegistro}>
            Não possui uma conta? Cadastre-se
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}