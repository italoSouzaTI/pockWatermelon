import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useListaConteudo } from './useListaConteudo';


export function ListaConteudoPage() {
  const { top } = useSafeAreaInsets();
  const { usuarios, pedidos, ocorrencias } = useListaConteudo();

  return (
    <ScrollView style={[styles.container, { paddingTop: top }]}>      
      <Text style={styles.title}>Usuários</Text>
      {usuarios.map(usuario => (
        <View key={usuario.id} style={styles.card}>
          <Text>Nome: {usuario.nome} {usuario.sobrenome}</Text>
          <Text>Descrição: {usuario.descricao}</Text>
        </View>
      ))}

      <Text style={styles.title}>Pedidos</Text>
      {pedidos.map(pedido => (
        <View key={pedido.id} style={styles.card}>
          <Text>Descrição: {pedido.observacoes}</Text>
          <Text>Valor: R$ {pedido.valor.toFixed(2)}</Text>
        </View>
      ))}

      <Text style={styles.title}>Ocorrências</Text>
      {ocorrencias.map(ocorrencia => (
        <View key={ocorrencia.id} style={styles.card}>
          <Text>Descrição: {ocorrencia.descricao}</Text>
          <Text>Data: {ocorrencia.data.toLocaleDateString()}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 24,
    marginBottom: 8,
  },
  card: {
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
});
