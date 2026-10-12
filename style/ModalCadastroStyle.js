import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  fundo: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  caixa: {
    width: '85%',
    maxHeight: '60%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
  },
  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  opcao: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  textoOpcao: {
    fontSize: 17,
  },
  botao: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  textoBotao: {
    color: '#fff',
    fontSize: 17,
    fontWeight: 'bold',
  },
  cancelar: {
    alignItems: 'center',
    marginTop: 15,
  },

  textoCancelar: {
    color: '#ff3b30',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
