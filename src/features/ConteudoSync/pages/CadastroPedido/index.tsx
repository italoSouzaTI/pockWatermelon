import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useCadastroPedido } from './useCadastroPedido';

export default function CadastroPedidoPage() {
  const navigation = useNavigation();
  const { salvarPedido, isSaving } = useCadastroPedido();

  const [titulo, setTitulo] = useState('');
  const [observacoes, setObservacoes] = useState('');
  const [valor, setValor] = useState('');
  const [data, setData] = useState(new Date());

  const handleSalvar = async () => {
    const sucesso = await salvarPedido({
      titulo,
      observacoes,
      valor: parseFloat(valor),
      data,
    });

    if (sucesso) {
            Alert.alert('Sucesso', 'Pedido cadastrado com sucesso');
      navigation.goBack();
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Título</Text>
      <TextInput style={styles.input} value={titulo} onChangeText={setTitulo} />

      <Text style={styles.label}>Observações</Text>
      <TextInput
        style={[styles.input, { height: 80 }]} multiline
        value={observacoes}
        onChangeText={setObservacoes}
      />

      <Text style={styles.label}>Valor</Text>
      <TextInput
        style={styles.input}
        value={valor}
        onChangeText={setValor}
        keyboardType="decimal-pad"
      />

      <Button title={isSaving ? 'Salvando...' : 'Salvar Pedido'} onPress={handleSalvar} disabled={isSaving} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 4,
    marginTop: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    borderRadius: 4,
  },
});
