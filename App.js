import "react-native-gesture-handler";
import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
// import { View } from "react-native";

import RegistrationScreen from "./components/RegistrationScreen";
import LoginScreen from "./components/LoginScreen";
import HomeScreen from "./components/HomeScreen";

// import { gStyle } from "./styles/style";

const MainStack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <MainStack.Navigator
        initialRouteName="Registration"
        screenOptions={{ headerShown: false }}
      >
        <MainStack.Screen name="Registration" component={RegistrationScreen} />
        <MainStack.Screen name="Login" component={LoginScreen} />
        <MainStack.Screen name="Home" component={HomeScreen} />
      </MainStack.Navigator>
      {/* <HomeScreen /> */}
    </NavigationContainer>
  );
}
