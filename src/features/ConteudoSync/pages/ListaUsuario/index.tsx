import { FloatButton } from "@shared/components";
import { Text, View, FlatList, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useListaUsuario } from "./useListaUsuario";

export const ListaUsuarioScreen = ({ navigation }: any) => {
  const { top } = useSafeAreaInsets();
  const { usuarios, loading } = useListaUsuario();

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <View style={{ paddingTop: top }}>
        {loading ? (
          <Text style={{ textAlign: 'center', marginTop: 20 }}>Carregando...</Text>
        ) : (
          <FlatList
            contentContainerStyle={{ padding: 16, gap: 16 }}
            data={usuarios}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.card}>
                <Text style={styles.nome}>{item.nome} {item.sobrenome}</Text>
                <Text style={styles.descricao}>{item.descricao}</Text>
                {item.cidade && item.estado && (
                  <Text style={styles.endereco}>{item.cidade} - {item.estado}</Text>
                )}
              </View>
            )}
            ListEmptyComponent={() => (
              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <Text>Nenhum usuário encontrado</Text>
              </View>
            )}
          />

        )}
      </View>

      <FloatButton onPress={() => navigation.navigate("CadastroUsuario")} />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 16,
    backgroundColor: '#f2f2f2',
    borderRadius: 8,
  },
  nome: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  descricao: {
    fontSize: 14,
    color: '#555',
  },
  endereco: {
    fontSize: 14,
    color: '#333',
    marginTop: 4,
  },
});
