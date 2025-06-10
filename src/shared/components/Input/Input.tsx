import { Text, TextInput, View, TextInputProps } from "react-native";
import { InputStyles } from "./styles";

interface InputProps extends TextInputProps {
    label: string;
    errorLabel?: string;
}
export function Input({ label, errorLabel, ...props }: InputProps) {
    return (
        <View style={InputStyles.inputContainer}>
            <Text style={InputStyles.label}>{label}</Text>
            <TextInput style={InputStyles.input} {...props} />
            {errorLabel && <Text style={{ color: "red", fontWeight: "800" }}>{errorLabel}</Text>}
        </View>
    );
}
