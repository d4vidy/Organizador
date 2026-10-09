import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Modal
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from '../style/CadastroStyle';

export default function LancamentoScreen({ navigation}){
    const [produto, setProduto] = useState('');
    const [quantidade, setQuantidade] = useState('');
    const [tipoLancamento, setTipoLancamento] = useState('');

    function cadastrarLancamento() {
        if (
            nome.trim() === '' ||
            quantidade.trim() === '' ||
            tipoLancamento.trim() === ''
        ) {
            Alert.alert('Atenção!', 'Preencha todos os campos.');
            return;
        }
        Alert.alert('Sucesso!', 'Lançamento cadastrado com sucesso.');
        setNome('');
        setQuantidade('');
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
            >
                <Text
                    style={categoria 
                    ? styles.textoSelecionado
                    : styles.placeholder}>
                    {produto || 'Selecione um produto.'}
                </Text>
                <Ionicons name="caret-down" size={20} color="#000" />
            </TouchableOpacity>

            <Text style={styles.label}>
                Quantidade:
            </Text>
            <TextInput
                style={styles.input}
                placeholder="Ex: 10"
                keyboardType="numeric"
                value={quantidade}
                onChangeText={setQuantidade}
            />
        </View>
    )
}