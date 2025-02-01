import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/config";
import { Ionicons } from "@expo/vector-icons";

import PostsScreen from "./PostsScreen";
import CreatePostsScreen from "./CreatePostsScreen";
import ProfileScreen from "./ProfileScreen";

const Tabs = createBottomTabNavigator();
const Stack = createStackNavigator();

const handleLogout = async (navigation) => {
  try {
    await signOut(auth);
    navigation.navigate("Login");
  } catch (error) {
    Alert.alert("Помилка", "Не вдалося вийти з акаунту");
  }
};

const Home = () => {
  const navigation = useNavigation();
  return (
    <Tabs.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "Публікації") {
            iconName = focused ? "grid" : "grid-outline";
          } else if (route.name === "Створити публікацію") {
            iconName = "add";
          } else if (route.name === "Профіль") {
            iconName = focused ? "person" : "person-outline";
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },

        tabBarShowLabel: false,
        tabBarActiveTintColor: "orange",
        tabBarInactiveTintColor: "gray",
        tabBarStyle: { height: 85, paddingTop: 20 },
      })}
    >
      <Tabs.Screen
        name="Публікації"
        component={PostsScreen}
        options={{
          headerRight: () => (
            <TouchableOpacity
              onPress={() => handleLogout(navigation)}
              style={{ marginRight: 20 }}
            >
              <Ionicons name="exit-outline" size={24} color="black" />
            </TouchableOpacity>
          ),
        }}
      />
      <Tabs.Screen name="Створити публікацію" component={CreatePostsScreen} />
      <Tabs.Screen name="Профіль" component={ProfileScreen} />
    </Tabs.Navigator>
  );
};

const styles = StyleSheet.create({
  createPostButton: {
    backgroundColor: "orange",
    padding: 10,
    borderRadius: 25,
  },
});

export default Home;
