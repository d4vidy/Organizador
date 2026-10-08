import React from 'react';
import {
    Modal,
    View,
    Text,
    TouchableOpacity,
    FlatList,
} from 'react-native';
import { styles } from '../style/ModalStyle';

export default function ModalCategoria({ visible, categorias, onSelecionar, onFechar, }) {
    return (
        <Modal
            visible={visible}
            transparent={true}
            animationType="fade"
            onRequestClose={onFechar}
        >
            <View style={styles.fundo}>
                <View style={styles.caixa}>
                    <Text style={styles.titulo}> Selecione uma categoria </Text>
                    <FlatList
                        data={categorias}
                        keyExtractor={(item, index) => `${item}-${index}`}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                style={styles.opcao}
                                onPress={() => onSelecionar(item)}
                            >
                                <Text style={styles.textoOpcao}> {item} </Text>
                            </TouchableOpacity>
                        )}
                    />
                    <TouchableOpacity
                        style={styles.cancelar}
                        onPress={onFechar}
                    >
                        <Text style={styles.textoCancelar}> Cancelar </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>);
}

