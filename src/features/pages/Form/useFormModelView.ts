import { FormRepository } from "@features/api/repository/form.repository";
import { useNavigation } from "@react-navigation/native";
import { useRef, useState } from "react";
import { Alert, TextInputProps } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export function useFormModelView() {
    const navigation = useNavigation();
    const nomeRef = useRef<TextInputProps>(null);
    const contatoRef = useRef<TextInputProps>(null);
    const [errorNome, setErrorNome] = useState<string>("");
    const [errorContato, setErrorContato] = useState<string>("");
    const { inserirNovoForm } = FormRepository();
    const { top } = useSafeAreaInsets();
    const ValidandoForm = async () => {
        try {
            setErrorContato("");
            setErrorNome("");
            const nomeValue = nomeRef.current?.value?.trim() || "";
            const contatoValue = contatoRef.current?.value?.trim() || "";

            if (!nomeValue) {
                setErrorNome("Campo obrigatório");
            }

            if (!contatoValue) {
                setErrorContato("Campo obrigatório");
            }

            if (!nomeValue || !contatoValue) {
                return;
            }

            setErrorContato("");
            setErrorNome("");

            await inserirNovoForm({ nome: nomeValue, telefone: String(contatoValue) });
            navigation.goBack();
        } catch (error) {}
    };
    return {
        ValidandoForm,
        nomeRef,
        contatoRef,
        top,
        errorNome,
        errorContato,
    };
}
