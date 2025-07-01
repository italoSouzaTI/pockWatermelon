import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ScrollView, Text, View, StyleSheet, Button } from 'react-native';
import { useSincronizacao } from './useSincronizacao';


export function SincronizacaoPage() {
  const { top } = useSafeAreaInsets();
  const { 
    syncAll, 
    isSyncing, 
    counts, 
    error,
  } = useSincronizacao();

  return (
    <ScrollView style={{ flex: 1, paddingTop: top, backgroundColor: '#fff' }} contentContainerStyle={styles.container}>
      <Text style={styles.title}>Sincronização de Dados</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Usuários pendentes: {counts.usuarios}</Text>
        {/* <Button title="Sincronizar Usuários" onPress={syncUsuarios} disabled={isSyncing} /> */}
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Pedidos pendentes: {counts.pedidos}</Text>
        {/* <Button title="Sincronizar Pedidos" onPress={syncPedidos} disabled={isSyncing} /> */}
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Ocorrências pendentes: {counts.ocorrencias}</Text>
        {/* <Button title="Sincronizar Ocorrências" onPress={syncOcorrencias} disabled={isSyncing} /> */}
      </View>

      <View style={{ marginTop: 24 }}>
        <Button title="Sincronizar Tudo" onPress={syncAll} disabled={isSyncing} />
        {isSyncing && <Text style={styles.syncingText}>Sincronizando...</Text>}
        {error && <Text style={styles.errorText}>Erro: {error}</Text>}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
  },
  card: {
    padding: 16,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
    gap: 8,
  },
  label: {
    fontSize: 16,
  },
  syncingText: {
    textAlign: 'center',
    marginTop: 12,
    color: 'blue',
  },
  errorText: {
    textAlign: 'center',
    marginTop: 12,
    color: 'red',
  },
});
