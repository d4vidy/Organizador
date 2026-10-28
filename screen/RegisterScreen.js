
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
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/Firebase';

export default function RegisterScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [carregando, setCarregando] = useState(false);

  async function realizarCadastro() {
    if (!email.trim() || !senha || !confirmarSenha) {
      Alert.alert('Atenção', 'Preencha todos os campos.');
      return;
    }

    if (senha !== confirmarSenha) {
      Alert.alert('Atenção', 'As senhas não coincidem.');
      return;
    }

    if (senha.length < 6) {
      Alert.alert(
        'Atenção',
        'A senha deve conter pelo menos 6 caracteres.'
      );
      return;
    }

    try {
      setCarregando(true);

      await createUserWithEmailAndPassword(
        auth,
        email.trim(),
        senha
      );

      Alert.alert('Sucesso', 'Conta criada com sucesso!');

    } catch (error) {
      console.error('Erro ao cadastrar usuário:', error.code);

      if (error.code === 'auth/email-already-in-use') {
        Alert.alert('Erro', 'Este e-mail já está cadastrado.');
      } else if (error.code === 'auth/invalid-email') {
        Alert.alert('Erro', 'Informe um e-mail válido.');
      } else if (error.code === 'auth/weak-password') {
        Alert.alert('Erro', 'A senha informada é muito fraca.');
      } else {
        Alert.alert('Erro', 'Não foi possível criar a conta.');
      }
    } finally {
      setCarregando(false);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.conteudo}>
        <Text style={styles.titulo}>Criar conta</Text>
        <Text style={styles.subtitulo}>
          Cadastre-se para acessar o Organizador
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

        <TextInput
          style={styles.input}
          placeholder="Confirmar senha"
          secureTextEntry
          value={confirmarSenha}
          onChangeText={setConfirmarSenha}
        />

        <TouchableOpacity
          style={styles.botao}
          onPress={realizarCadastro}
          disabled={carregando}
        >
          {carregando ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text style={styles.textoBotao}>Cadastrar</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.textoLogin}>
            Já possui uma conta? Voltar ao login
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}