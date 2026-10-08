import React from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { styles } from '../style/ModalCadastroStyle';

export default function ModalNovaCategoria({
  visible,
  novaCategoria,
  setNovaCategoria,
  onAdicionar,
  onFechar,
}) {

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onFechar}
    >

      <View style={styles.fundo}>
        <View style={styles.caixa}>
          <Text style={styles.titulo}>
            Nova categoria
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Ex: Material Escolar"
            value={novaCategoria}
            onChangeText={setNovaCategoria}
          />
          <TouchableOpacity
            style={styles.botao}
            onPress={onAdicionar}
          >
            <Text style={styles.textoBotao}>
              Adicionar
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.cancelar}
            onPress={onFechar}
          >
            <Text style={styles.textoCancelar}>
              Cancelar
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
