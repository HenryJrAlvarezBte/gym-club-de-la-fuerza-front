import { View, Text, FlatList } from "react-native";

const classes = [
    { id: 1, name: "CrossFit", time: "08:00 AM" },
    { id: 2, name: "Yoga", time: "10:00 AM" },
    { id: 3, name: "Boxeo", time: "17:00 PM" },
];

export default function ClassesScreen(){
    return(
        <View>
            <Text>
                Horario de Clases
            </Text>
            <FlatList
            data={classes}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({item}) => (
                <View>
                    <Text>{item.name}</Text>
                    <Text>{item.time}</Text>
                </View>
            )}
            />
        </View>
    )
}