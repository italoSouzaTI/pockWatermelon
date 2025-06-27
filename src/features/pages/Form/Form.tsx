import { Platform, Text, TouchableOpacity, View, TextInput } from "react-native";
import { FormStyles } from "./styles";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Input } from "@shared/components/Input/Input";
import { useFormModelView } from "./useFormModelView";
export function Form() {
    const { ValidandoForm, nomeRef, contatoRef, top, errorNome, errorContato, handleVolta } = useFormModelView();
    return (
        <View style={[FormStyles.container, { top: Platform.OS == "android" ? top : 0 }]}>
            <View style={FormStyles.row}>
                <Text style={FormStyles.Title}>Cadastra novo cliente</Text>
                <TouchableOpacity style={FormStyles.close} onPress={handleVolta}>
                    <Ionicons name="close-sharp" size={30} color="black" />
                </TouchableOpacity>
            </View>
            <Input
                label="Nome"
                value={nomeRef.current}
                onChangeText={(e) => {
                    if (!nomeRef.current) {
                        nomeRef.current = { value: "" }; // Inicializa o objeto se necessário
                    }
                    nomeRef.current.value = e; // Atualiza o valor diretamente
                }}
                errorLabel={errorNome}
            />
            <Input
                label="Contato"
                value={contatoRef.current}
                onChangeText={(e) => {
                    if (!contatoRef.current) {
                        contatoRef.current = { value: "" }; // Inicializa o objeto se necessário
                    }
                    contatoRef.current.value = e; // Atualiza o valor diretamente
                }}
                keyboardType="numeric"
                errorLabel={errorContato}
            />
            <TouchableOpacity style={FormStyles.send} onPress={ValidandoForm}>
                <Text style={{ color: "white", fontSize: 20, fontWeight: "bold" }}>Enviar</Text>
            </TouchableOpacity>
        </View>
    );
}
