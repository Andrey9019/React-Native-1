import React from "react";
import { useNavigation } from "@react-navigation/native";

import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  SafeAreaView,
  Platform,
  Button,
} from "react-native";

import { authScreen } from "../styles/authScreen";
import { loginDB } from "../firebase/auth";
import { auth } from "../firebase/config";

export default function LoginScreen({}) {
  const navigation = useNavigation();

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleLogin = async () => {
    try {
      const user = await loginDB({ email, password });
      if (user) {
        navigation.navigate("Home", { user });
      }
    } catch (error) {
      Alert.alert("Помилка Реєстрації", error.message);
    }
  };
  return (
    <ImageBackground
      source={require("../assets/imageBackground.png")}
      style={authScreen.imageBackground}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView style={authScreen.container}>
          <KeyboardAvoidingView // визначаємо ОС та налаштовуємо поведінку клавіатури
            behavior={Platform.OS == "ios" ? "padding" : "height"}
          >
            <View style={[authScreen.formContainer, { paddingTop: "32" }]}>
              {/* <View style={authScreen.avatarContainer}></View> */}

              <Text style={authScreen.title}>Увійти</Text>

              {/* <View style={authScreen.inputContainer}>
                <TextInput style={authScreen.input} placeholder="Логін" />
              </View> */}
              <View style={authScreen.inputContainer}>
                <TextInput
                  style={authScreen.input}
                  placeholder="Адреса електронної пошти"
                  value={email}
                  onChangeText={(value) => setEmail(value)}
                  keyboardType="email-address"
                />
              </View>
              <View style={[authScreen.inputContainer, { marginBottom: "20" }]}>
                <TextInput
                  style={[authScreen.input, { flex: 1 }]}
                  placeholder="Пароль"
                  value={password}
                  onChangeText={(value) => setPassword(value)}
                  secureTextEntry
                />
                <TouchableOpacity>
                  <Text style={authScreen.showText}>Показати</Text>
                </TouchableOpacity>
              </View>
              {/* Кнопка Зареєструватися */}
              <TouchableOpacity
                style={authScreen.registerButton}
                onPress={handleLogin}
              >
                <Text style={authScreen.registerButtonText}>Увійти</Text>
              </TouchableOpacity>
              {/* Посилання */}
              <TouchableOpacity
                onPress={() => navigation.navigate("Registration")}
              >
                <Text style={authScreen.loginLink}>
                  Немає акаунту? Зареєструватися
                </Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </ImageBackground>
  );
}
