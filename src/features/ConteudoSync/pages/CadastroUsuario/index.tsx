import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  ScrollView,
} from 'react-native';
import { useCadastroUsuario } from './useCadastroUsuario';


export const CadastroUsuarioPage = ({ navigation }: any) => {
  const [nome, setNome] = useState('');
  const [sobrenome, setSobrenome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [cidade, setCidade] = useState('');
  const [estado, setEstado] = useState('');

  const { salvarUsuario, isSaving } = useCadastroUsuario();

  const handleSalvar = async () => {
    const sucesso = await salvarUsuario({
      nome,
      sobrenome,
      descricao,
      cidade,
      estado,
    });

    if (sucesso) {
      Alert.alert('Sucesso', 'Usuário cadastrado com sucesso');
      navigation.goBack();
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Cadastro de Usuário</Text>

      <Text style={styles.label}>Nome</Text>
      <TextInput style={styles.input} value={nome} onChangeText={setNome} placeholder="Digite o nome" />

      <Text style={styles.label}>Sobrenome</Text>
      <TextInput style={styles.input} value={sobrenome} onChangeText={setSobrenome} placeholder="Digite o sobrenome" />

      <Text style={styles.label}>Descrição</Text>
      <TextInput style={styles.input} value={descricao} onChangeText={setDescricao} placeholder="Digite uma descrição" multiline />

      <Text style={styles.label}>Cidade</Text>
      <TextInput style={styles.input} value={cidade} onChangeText={setCidade} placeholder="Digite a cidade" />

      <Text style={styles.label}>Estado</Text>
      <TextInput style={styles.input} value={estado} onChangeText={setEstado} placeholder="Digite o estado" />

      <View style={styles.buttonContainer}>
        <Button title={isSaving ? 'Salvando...' : 'Salvar'} onPress={handleSalvar} disabled={isSaving} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 40,
    backgroundColor: '#fff',
    flexGrow: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  label: {
    fontSize: 14,
    marginBottom: 6,
    fontWeight: '500',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginBottom: 16,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  buttonContainer: {
    marginTop: 16,
  },
});

