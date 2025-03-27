import React from 'react';
import { StyleSheet, SafeAreaView, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const navigation = useNavigation();

  const handleOnPress = (points) => {
    console.log(points);
    navigation.navigate('Game', { points });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Button
        onPress={() => handleOnPress(18)}
        title="18 puntos"
        color="#841584"
      />
      <Button
        onPress={() => handleOnPress(30)}
        title="30 puntos"
        color="#841584"
      />
      <Button
        onPress={() => handleOnPress(24)}
        title="Personalizar"
        color="#841584"
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
  },
});

export default HomeScreen;
