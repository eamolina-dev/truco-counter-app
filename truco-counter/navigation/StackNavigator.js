import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import GameScreen from '../screens/GameScreen';

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Game" component={GameScreen} options={{ title: 'Juego', headerShown: false }} />
      <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Inicio', headerShown: false }} />
    </Stack.Navigator>
  );
};

export default StackNavigator;
