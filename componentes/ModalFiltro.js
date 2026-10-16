
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Modal,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { styles } from '../style/ListaStyle';

export default function ModalFiltro({
  visible,
  categorias,
  categoriaSelecionada,
  onSelecionarCategoria,
  onSelecionarTodas,
  onFechar,
}) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onFechar}
    >
      <View style={styles.fundoModal}>
        <View style={styles.caixaModal}>
          <Text style={styles.tituloModal}>
            Filtrar por categoria
          </Text>

          <TouchableOpacity
            style={styles.opcaoCategoria}
            onPress={onSelecionarTodas}
          >
            <Text style={styles.textoOpcaoCategoria}>
              Todas as categorias
            </Text>

            {!categoriaSelecionada && (
              <Ionicons
                name="checkmark-circle"
                size={20}
                color="#00796B"
              />
            )}
          </TouchableOpacity>

          <FlatList
            data={categorias}
            keyExtractor={(item) => item.id}
            style={styles.listaCategorias}
            ListEmptyComponent={
              <Text style={styles.mensagemVazia}>
                Nenhuma categoria encontrada.
              </Text>
            }
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.opcaoCategoria}
                onPress={() => onSelecionarCategoria(item)}
              >
                <Text style={styles.textoOpcaoCategoria}>
                  {item.nome}
                </Text>

                {categoriaSelecionada?.id === item.id && (
                  <Ionicons
                    name="checkmark-circle"
                    size={20}
                    color="#00796B"
                  />
                )}
              </TouchableOpacity>
            )}
          />

          <TouchableOpacity
            style={styles.botaoFecharModal}
            onPress={onFechar}
          >
            <Text style={styles.textoFecharModal}>
              Fechar
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
