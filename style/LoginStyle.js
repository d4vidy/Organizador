
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7FAFA',
    justifyContent: 'center',
    padding: 24,
  },

  conteudo: {
    width: '100%',
  },

  titulo: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#00796B',
    textAlign: 'center',
    marginBottom: 8,
  },

  subtitulo: {
    fontSize: 16,
    color: '#607D8B',
    textAlign: 'center',
    marginBottom: 32,
  },

  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#CFD8DC',
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    marginBottom: 16,
  },

  botao: {
    backgroundColor: '#00796B',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 8,
  },

  textoBotao: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },

  textoRegistro: {
    color: '#00796B',
    textAlign: 'center',
    marginTop: 24,
    fontSize: 14,
  },

  textoLogin: {
    color: '#00796B',
    textAlign: 'center',
    marginTop: 24,
    fontSize: 14,
  },
});
