import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

import { useNavigation } from '@react-navigation/native';
import { useCadastroOcorrencia } from './useCadastroOcorrencia';

const CadastroOcorrenciaPage = () => {
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [data, setData] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const navigation = useNavigation();
  const { salvarOcorrencia } = useCadastroOcorrencia();

  const handleSalvar = async () => {
    try {
      await salvarOcorrencia({ titulo, descricao, data });
      Alert.alert('Sucesso', 'Ocorrência cadastrada com sucesso');

      navigation.goBack();
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível salvar a ocorrência');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Título*</Text>
      <TextInput
        style={styles.input}
        value={titulo}
        onChangeText={setTitulo}
        placeholder="Digite o título"
      />

      <Text style={styles.label}>Descrição</Text>
      <TextInput
        style={[styles.input, { height: 100 }]}
        value={descricao}
        onChangeText={setDescricao}
        placeholder="Digite a descrição"
        multiline
      />

      <Text style={styles.label}>Data*</Text>
      <Button title={data.toLocaleDateString()} onPress={() => setShowDatePicker(true)} />

      {showDatePicker && (
        <DateTimePicker
          value={data}
          mode="date"
          display="default"
          onChange={(_, selectedDate) => {
            setShowDatePicker(false);
            if (selectedDate) setData(selectedDate);
          }}
        />
      )}

      <View style={{ marginTop: 24 }}>
        <Button title="Salvar Ocorrência" onPress={handleSalvar} />
      </View>
    </View>
  );
};

export default CadastroOcorrenciaPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  label: {
    marginTop: 16,
    marginBottom: 4,
    fontSize: 16,
    fontWeight: '500',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 8,
  },
});
