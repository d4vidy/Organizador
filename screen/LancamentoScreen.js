import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Alert,
    Modal,
    FlatList,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { styles } from '../style/CadastroStyle';

const produtos = [
    { id: '1', nome: 'Arroz' },
    { id: '2', nome: 'Feijão' },
    { id: '3', nome: 'Macarrão' },
    { id: '4', nome: 'Óleo' },
];

export default function LancamentoScreen({ navigation }) {
    const [nome, setNome] = useState('');
    const [quantidade, setQuantidade] = useState('');
    const [tipoLancamento, setTipoLancamento] = useState('');
    const [modalProdutoAberto, setModalProdutoAberto] = useState(false);

    function selecionarProduto(produto) {
        setNome(produto.nome);
        setModalProdutoAberto(false);
    }

    function cadastrarLancamento() {
        if (
            nome.trim() === '' ||
            quantidade.trim() === '' ||
            tipoLancamento === ''
        ) {
            Alert.alert(
                'Atenção!',
                'Selecione um produto, informe a quantidade e o tipo de lançamento.'
            );
            return;
        }

        const quantidadeNumerica = Number(quantidade);

        if (
            !Number.isFinite(quantidadeNumerica) ||
            quantidadeNumerica <= 0
        ) {
            Alert.alert(
                'Quantidade inválida',
                'Informe uma quantidade numérica maior que zero.'
            );
            return;
        }

        Alert.alert(
            'Sucesso!',
            `Lançamento de ${tipoLancamento.toLowerCase()} registrado na demonstração.\n\n` +
            `Produto: ${nome}\n` +
            `Quantidade: ${quantidadeNumerica}`
        );

        setNome('');
        setQuantidade('');
        setTipoLancamento('');
    }

    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>
                Lançamento de Produto
            </Text>
            <Text style={styles.label}>
                Produto:
            </Text>
            <TouchableOpacity
                style={styles.dropdown}
                onPress={() => setModalProdutoAberto(true)}
                activeOpacity={0.7}
            >
                <Text
                    style={
                        nome
                        ? styles.textoSelecionado
                        : styles.placeholder
                    }
                >
                    {nome || 'Selecione um produto'}
                </Text>
                <Ionicons
                    name="caret-down"
                    size={20}
                    color="#000"
                />
            </TouchableOpacity>
            <Text style={[styles.label, styles.labelLancamento]}>
                Quantidade:
            </Text>
            <TextInput
                style={styles.input}
                placeholder="Ex: 10"
                keyboardType="numeric"
                value={quantidade}
                onChangeText={setQuantidade}
            />
            <Text style={styles.label}>
                Tipo de lançamento:
            </Text>
            <View style={styles.seletorLancamento}>
                <TouchableOpacity
                    style={[
                        styles.opcaoLancamento,
                        tipoLancamento === 'Entrada' &&
                        styles.entradaSelecionada,
                    ]}
                    onPress={() => setTipoLancamento('Entrada')}
                    activeOpacity={0.8}
                >
                    <Ionicons
                        name="add-circle-outline"
                        size={22}
                        color={
                            tipoLancamento === 'Entrada'
                                ? '#fff'
                                : '#16803c'
                        }
                    />
                    <Text
                        style={[
                            styles.textoOpcaoLancamento,
                            tipoLancamento === 'Entrada' &&
                            styles.textoOpcaoSelecionada,
                        ]}
                    >
                        Entrada
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[
                        styles.opcaoLancamento,
                        tipoLancamento === 'Saída' &&
                        styles.saidaSelecionada,
                    ]}
                    onPress={() => setTipoLancamento('Saída')}
                    activeOpacity={0.8}
                >
                    <Ionicons
                        name="remove-circle-outline"
                        size={22}
                        color={
                            tipoLancamento === 'Saída'
                                ? '#fff'
                                : '#d93025'
                        }
                    />
                    <Text
                        style={[
                            styles.textoOpcaoLancamento,
                            tipoLancamento === 'Saída' &&
                            styles.textoOpcaoSelecionada,
                        ]}
                    >
                        Saída
                    </Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity
                style={styles.botao}
                onPress={cadastrarLancamento}
                activeOpacity={0.8}
            >
                <Text style={styles.textoBotao}>
                    Cadastrar lançamento
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.botaoVoltar}
                onPress={() => navigation.goBack()}
                activeOpacity={0.8}
            >
                <Text style={styles.textoBotaoVoltar}>
                    Voltar
                </Text>
            </TouchableOpacity>
            <Modal
                visible={modalProdutoAberto}
                transparent={true}
                animationType="fade"
                onRequestClose={() => setModalProdutoAberto(false)}
            >
                <View style={styles.modalFundo}>
                    <View style={styles.modalCaixa}>

                        <Text style={styles.modalTitulo}>
                            Selecionar produto
                        </Text>

                        <FlatList
                            data={produtos}
                            keyExtractor={(item) => item.id}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    style={styles.modalOpcao}
                                    onPress={() => selecionarProduto(item)}
                                >
                                    <Text style={styles.modalTextoOpcao}>
                                        {item.nome}
                                    </Text>
                                </TouchableOpacity>
                            )}
                            ListEmptyComponent={
                                <Text>
                                    Nenhum produto cadastrado.
                                </Text>
                            }
                        />

                        <TouchableOpacity
                            style={styles.modalCancelar}
                            onPress={() => setModalProdutoAberto(false)}
                        >
                            <Text style={styles.modalTextoCancelar}>
                                Cancelar
                            </Text>
                        </TouchableOpacity>

                    </View>
                </View>
            </Modal>

        </View>
    );
}
