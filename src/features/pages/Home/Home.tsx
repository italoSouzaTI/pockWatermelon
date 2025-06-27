import { Text, TouchableOpacity, View, FlatList } from "react-native";
import { HomeStyles } from "./styles";
import { FloatButton } from "@shared/components";

import { useHomeModelView } from "./useHomeModelView";
import { withObservables } from "@nozbe/watermelondb/react";
export function Home() {
    const { top, data, atualizarDados, handleForm, handleHistorico } = useHomeModelView();
    function renderItem({ item }: T) {
        return (
            <View style={HomeStyles.card}>
                <Text onPress={() => handleHistorico(item)} style={{ fontSize: 20, fontWeight: "bold" }}>
                    {item.nome}
                </Text>
                <TouchableOpacity
                    style={[HomeStyles.btn, item.is_start ? HomeStyles.end : HomeStyles.send]}
                    onPress={() => atualizarDados(item.id)}
                >
                    <Text style={{ color: "white", fontSize: 18, fontWeight: "bold" }}>
                        {item.is_start ? "Finalizar" : "Entregar"}
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }
    function ListEmptyComponent() {
        return (
            <View style={{ justifyContent: "center", alignItems: "center" }}>
                <Text>Nenhum cliente encontrado</Text>
            </View>
        );
    }
    return (
        <View style={{ flex: 1, backgroundColor: "#fff" }}>
            <View style={{ top: top }}>
                <FlatList
                    data={data}
                    // keyExtractor={}
                    renderItem={(item) => renderItem(item)}
                    contentContainerStyle={{
                        padding: 16,
                        gap: 16,
                    }}
                    ListEmptyComponent={ListEmptyComponent}
                />
            </View>
            <FloatButton onPress={handleForm} />
        </View>
    );
}
