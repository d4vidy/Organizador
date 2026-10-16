import React from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { styles } from '../style/ModalCadastroStyle';

export default function ModalCategoria({
  visible,
  categorias,
  onSelecionar,
  onFechar,
}) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onFechar}
    >
      <View style={styles.fundo}>
        <View style={styles.caixa}>
          <Text style={styles.titulo}>
            Selecione uma categoria
          </Text>

          <FlatList
            data={categorias}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.opcao}
                onPress={() => onSelecionar(item)}
              >
                <Text style={styles.textoOpcao}>
                  {item.nome}
                </Text>
              </TouchableOpacity>
            )}
            ListEmptyComponent={
              <Text style={styles.textoOpcao}>
                Nenhuma categoria cadastrada.
              </Text>
            }
          />

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
