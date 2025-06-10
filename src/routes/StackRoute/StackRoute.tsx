import { Form, History, Home } from "@features/pages";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();
export function StackRoute() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="History" component={History} />
            <Stack.Group screenOptions={{ presentation: "modal" }}>
                <Stack.Screen name="Form" component={Form} />
            </Stack.Group>
        </Stack.Navigator>
    );
}
