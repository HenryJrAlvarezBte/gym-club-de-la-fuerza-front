import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import ClassesScreen from '../screens/ClassesScreen';
import ProfileScreen from "../screens/ProfileScreen";
import PlansScreen from "../screens/PlansScreen";
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

export default function AppNavigator() {
    return (
        <NavigationContainer>
            <Tab.Navigator>
                <Tab.Screen name="Inicio" component={HomeScreen}/>
                <Tab.Screen name="Clases" component={ClassesScreen}/>
                <Tab.Screen name="Planes" component={PlansScreen} />
                <Tab.Screen name="Perfil" component={ProfileScreen} />
            </Tab.Navigator>
        </NavigationContainer>
    )
}