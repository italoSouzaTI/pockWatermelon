import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import { FloatButtonStyles } from "./styles";
import AntDesign from "@expo/vector-icons/AntDesign";
interface FloatButtonProps extends TouchableOpacityProps {}
export function FloatButton({ ...propsTouch }: FloatButtonProps) {
    return (
        <TouchableOpacity style={FloatButtonStyles.container} activeOpacity={0.8} {...propsTouch}>
            <AntDesign name="plus" size={30} color="black" />
        </TouchableOpacity>
    );
}
