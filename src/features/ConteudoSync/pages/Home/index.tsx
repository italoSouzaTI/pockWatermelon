import { View, Text, Button, StyleSheet, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ConteudoSyncRoutes } from "src/routes/StackRoute/StackRoute";

export default function HomePage() {
  const navigation =
    useNavigation<NativeStackNavigationProp<ConteudoSyncRoutes>>();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Conteúdo Offline</Text>

      <View style={styles.buttonContainer}>
        <Button
          title="Cadastrar Usuário"
          onPress={() => navigation.navigate("CadastroUsuario")}
        />
      </View>

      <View style={styles.buttonContainer}>
        <Button
          title="Registrar Ocorrência"
          onPress={() => navigation.navigate("CadastroOcorrencia")}
        />
      </View>

      <View style={styles.buttonContainer}>
        <Button
          title="Criar Pedido"
          onPress={() => navigation.navigate("CadastroPedido")}
        />
      </View>

      <View style={styles.buttonContainer}>
        <Button
          title="Sincronizar Dados"
          onPress={() => navigation.navigate("Sincronizacao")}
        />
      </View>

      <Button
        title="Ver Conteúdos Cadastrados"
        onPress={() => navigation.navigate("ListaConteudo")}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    gap: 16,
    backgroundColor: "#fff",
    flexGrow: 1,
    justifyContent: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 32,
  },
  buttonContainer: {
    marginBottom: 12,
  },
});
