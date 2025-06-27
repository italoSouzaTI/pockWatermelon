import { database } from "@core/dataBase";
import { nameTable } from "@core/dataBase/nameTable";
import { Q } from "@nozbe/watermelondb";
import { useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Text, View, FlatList } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export function History() {
    const { top } = useSafeAreaInsets();
    const { params } = useRoute();
    const [historico, setHistorico] = useState([]);

    async function data() {
        try {
            const localizacaoCurrent = await database
                .get(nameTable.localizacao)
                .query(Q.where("cliente_id", params.id))
                .fetch();
            const dadoTransformado = localizacaoCurrent.map((ctx) => {
                return ctx._raw;
            });
            setHistorico(dadoTransformado);
            console.log("dadoTransformado", dadoTransformado);
        } catch (error) {}
    }
    function renderItem({ item }: T) {
        return (
            <View style={{ gap: 8, borderWidth: 1, padding: 8, borderRadius: 4 }}>
                <Text>{`latitude inicial - ${item.latitude_inicial}`}</Text>
                <Text>{`longitude inicial - ${item.longitude_inicial}`}</Text>
                <Text>{`latitude final - ${item.latitude_final}`}</Text>
                <Text>{`longitude final - ${item.longitude_final}`}</Text>
                <Text>{`Status em andamento - ${item.is_start ? "SIM" : "Não"}`}</Text>
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
    useEffect(() => {
        data();
    }, []);
    return (
        <View
            style={{
                flex: 1,
                top: top,
            }}
        >
            <Text
                style={{
                    textAlign: "center",
                }}
            >
                {` Historico -${params.nome}`}
            </Text>
            <FlatList
                contentContainerStyle={{
                    padding: 16,
                }}
                data={historico}
                renderItem={(item) => renderItem(item)}
                ListEmptyComponent={ListEmptyComponent}
            />
        </View>
    );
}
