import { database } from "@core/dataBase";
import { nameTable } from "@core/dataBase/nameTable";
import { QueryDB } from "@core/dataBase/QueryDB";
import { useIsFocused, useNavigation, useRoute } from "@react-navigation/native";
import { useEffect, useRef, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as Location from "expo-location";
import { Alert } from "react-native";
import { HomeRepository } from "@features/api/repository/home.repository";
import { Logrepository } from "@features/api/repository/log.repository";

export function useHomeModelView() {
    const { top } = useSafeAreaInsets();
    const params = useRoute();
    const isFocused = useIsFocused();
    const navigation = useNavigation();
    const [data, setData] = useState([]);
    const { getDB } = QueryDB();
    const { processandoDados } = HomeRepository();
    const { criandoLog } = Logrepository();
    const locationRef = useRef<Location.LocationObject>(null);

    async function transformandoDados() {
        try {
            let clientes = await getDB(nameTable.cliente);
            let log = await getDB(nameTable.log);
            let teste = log.map((ctx) => {
                return ctx._raw;
            });
            console.log("clientes", clientes);
            console.log("log", teste);
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
            let params = {
                action: "atualizarDados",
                details: {
                    details: "Processando Dados",
                    components: "renderItem",
                    processandoDados: id,
                    locationRef,
                    created_at: new Date().getTime(),
                },
                screen: "Home",
            };
            await criandoLog(params);
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
    async function handleForm() {
        try {
            let params = {
                action: "handleForm",
                details: {
                    handleForm: "navegando para tela de formulário de cadastro.",
                    created_at: new Date().getTime(),
                },
                screen: "Home",
            };
            await criandoLog(params);
            navigation.navigate("Form");
        } catch (error) {}
    }
    async function handleHistorico(item: any) {
        try {
            let params = {
                action: "handleHistorico",
                details: {
                    details: "Visualizando dados usuário",
                    handleHistorico: { id: item.id, nome: item.nome },
                    created_at: new Date().getTime(),
                },
                screen: "Home",
            };
            await criandoLog(params);
            navigation.navigate("History", { id: item.id, nome: item.nome });
        } catch (error) {}
    }
    useEffect(() => {
        getCurrentLocation();
    }, []);
    useEffect(() => {
        transformandoDados();
    }, [isFocused]);
    return {
        top,
        data,
        handleForm,
        atualizarDados,
        handleHistorico,
    };
}
