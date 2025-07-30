import { View, Text, StyleSheet } from "react-native";

export default function HomeScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                ¡Bienvenido a El Club de la Fuerza!
            </Text>
            <Text style={styles.subtitle}>
                Tu gimnasio de confianza
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#111827',
    },
    title: {
        color: 'white',
        fontSize: 30,
        fontWeight: 'bold',
    },
    subtitle: {
        color: '#9CA3AF',
        marginTop: 8,
    },
});