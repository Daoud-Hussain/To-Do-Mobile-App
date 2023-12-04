import * as React from 'react';
import { View, Text, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, flexDirection: "row", alignItems: 'center', justifyContent: 'center' }}>
      <Button
        title="Details Screen"
        color={'gray'}
        onPress={() => {
          navigation.navigate('Details');
        }}></Button>

      <Text style={{ width: "5%" }}></Text>
      <Button
        title="Same Screen"
        color={'black'}
        onPress={() => {
          navigation.push('Home');
        }}></Button>
    </View>
  );
}
function DetailsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, flexDirection: "row", alignItems: 'center', justifyContent: 'center' }}>
      <Button
        title="Third Screen"
        color={'gray'}
        onPress={() => {
          navigation.navigate('ThirdScreen');
        }}></Button>
      <Text style={{ width: "5%" }}></Text>
      <Button
        title="Same Screen"
        color={'black'}
        onPress={() => {
          navigation.push('Details');
        }}></Button>
    </View>
  );
}

function ThirdScreen({ navigation }) {
  return (
    <View style={{ flex: 1, flexDirection: "row", alignItems: 'center', justifyContent: 'center' }}>
      <Button
        title="Previous Screen"
        color={'gray'}
        onPress={() => {
          navigation.goBack();
        }}></Button>
      <Text style={{ width: "5%" }}></Text>

      <Button
        title="First Screen"
        color={'black'}
        onPress={() => {
          navigation.popToTop();
        }}></Button>
    </View>
  );
}
const Stack = createNativeStackNavigator();

function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
        <Stack.Screen name="ThirdScreen" component={ThirdScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;