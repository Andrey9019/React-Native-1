// import React from "react";
// import { useNavigation } from "@react-navigation/native";
// import { signOut } from "firebase/auth";
// import { auth } from "../firebase/config";

// import {
//   ImageBackground,
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   SafeAreaView,
// } from "react-native";

// import { authScreen } from "../styles/authScreen";

// export default function HomeScreen({ route }) {
//   const navigation = useNavigation();

//   const handleLogout = async () => {
//     try {
//       await signOut(auth);
//       navigation.navigate("Login");
//     } catch (error) {
//       console.error(error);
//     }
//   };
//   const { login, email } = route.params || {};
//   console.log(email);

//   return (
//     <SafeAreaView>
//       {/* <TouchableOpacity>
//         <Text style={styles.text} onPress={handleLogout}>
//           Вийти
//         </Text>
//       </TouchableOpacity> */}
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "#fff",
//   },
//   text: {
//     fontSize: 24,
//     fontWeight: "bold",
//   },
// });

// Home.js....///////////////////////////////////////////////

// import React from "react";
// import { View, Text, StyleSheet } from "react-native";
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// import PostsScreen from "./PostsScreen";
// import CreatePostsScreen from "./CreatePostsScreen";
// import ProfileScreen from "./ProfileScreen";

// const Tabs = createBottomTabNavigator();

// const Home = () => {
//   return (
//     <Tabs.Navigator>
//       <Tabs.Screen name="Публікації" component={PostsScreen} />
//       <Tabs.Screen name="Створити публікацію" component={CreatePostsScreen} />
//       <Tabs.Screen name="Профіль" component={ProfileScreen} />
//     </Tabs.Navigator>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "center",
//   },
// });

// export default Home;
////////////////////////////////////////////////////////////////////////////

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

// Компонент для PostsScreen із заголовком і кнопкою логауту
const PostsStackScreen = () => {
  const navigation = useNavigation();
  return (
    <Stack.Navigator>
      <Stack.Screen
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
    </Stack.Navigator>
  );
};

const Home = () => {
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
        tabBarStyle: { height: 60 },
      })}
    >
      <Tabs.Screen name="Публікації" component={PostsStackScreen} />
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
