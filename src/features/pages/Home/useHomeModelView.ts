import { database } from "@core/dataBase";
import { nameTable } from "@core/dataBase/nameTable";
import { QueryDB } from "@core/dataBase/QueryDB";
import { useIsFocused } from "@react-navigation/native";
import { useEffect, useRef, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as Location from "expo-location";
import { Alert } from "react-native";
import { Q } from "@nozbe/watermelondb";
import { HomeRepository } from "@features/api/repository/home.repository";
import { syncDB } from "@features/api/repository/sync.repository";

export function useHomeModelView() {
    const { top } = useSafeAreaInsets();
    const isFocused = useIsFocused();
    const [startSend, setStartSend] = useState(false);
    const [data, setData] = useState([]);
    const { getDB } = QueryDB();
    const { processandoDados } = HomeRepository();
    const locationRef = useRef<Location.LocationObject>(null);

    async function transformandoDados() {
        try {
            let clientes = await getDB(nameTable.cliente);
            console.log("clientes", clientes);
            const localizacaes = await getDB(nameTable.localizacao);
            if (localizacaes.length == 0) {
                setData(clientes);
                return;
            }
            clientes.forEach((cliente) => {
                cliente.is_start = false;
                localizacaes.forEach((localizacao) => {
                    if (cliente.id == localizacao.cliente_id) {
                        cliente.is_start = localizacao.is_start;
                    }
                });
            });
            console.log("clientes final", clientes);
            setData(clientes);
        } catch (error) {}
    }
    async function atualizarDados(id: string) {
        try {
            if (locationRef.current == undefined) {
                Alert.alert("Localização não encontrada", "busca novamente", [
                    {
                        text: "OK",
                        onPress: () => {
                            getCurrentLocation();
                            atualizarDados(id);
                        },
                    },
                ]);
                return;
            }
            await processandoDados(id, locationRef);
            await transformandoDados();
        } catch (error) {
            Alert.alert(error.message);
        }
    }
    async function getCurrentLocation() {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
            Alert.alert("Permission to access location was denied");
            return;
        }

        let location = await Location.getCurrentPositionAsync({});
        locationRef.current = location;
    }
    useEffect(() => {
        getCurrentLocation();
    }, []);
    useEffect(() => {
        transformandoDados();
        syncDB();
    }, [isFocused]);
    return {
        top,
        startSend,
        data,
        atualizarDados,
    };
}
