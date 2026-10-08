import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
  },

  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },

  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },

  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    fontSize: 16,
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

  dropdown: {
    height: 50,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  placeholder: {
    color: '#888',
    fontSize: 16,
  },

  textoSelecionado: {
    color: '#222',
    fontSize: 16,
  },

  seta: {
    fontSize: 16,
  },

  botaoCategoria: {
    marginTop: 8,
    marginBottom: 20,
  },

  textoBotaoCategoria: {
    color: '#007AFF',
    fontSize: 15,
    fontWeight: 'bold',
  },
  modalFundo: { 
    flex: 1, 
    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
    justifyContent: 'center', 
    alignItems: 'center', 
  }, 
  modalCaixa: { 
    width: '85%', 
    maxHeight: '60%', 
    backgroundColor: '#fff', 
    borderRadius: 12, 
    padding: 20, 
  }, 
  modalTitulo: { 
    fontSize: 20, 
    fontWeight: 'bold', 
    marginBottom: 15, 
  }, 
  modalOpcao: { 
    paddingVertical: 15, 
    borderBottomWidth: 1, 
    borderBottomColor: '#eee', 
  }, 
  modalTextoOpcao: { 
    fontSize: 17, 
  }, 
  modalCancelar: { 
    alignItems: 'center', 
    marginTop: 15, 
  }, 
  modalTextoCancelar: { 
    color: '#ff3b30', 
    fontSize: 16, 
    fontWeight: 'bold', 
  },
});
