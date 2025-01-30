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
  Alert,
} from "react-native";

import { authScreen } from "../styles/authScreen";
import { registerDB, updateUserProfile } from "../firebase/auth";
import { auth } from "../firebase/config";

export default function RegistrationScreen({}) {
  const navigation = useNavigation();

  const [login, setLogin] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleRegister = async () => {
    try {
      const user = await registerDB({ email, password });
      if (user) {
        await updateUserProfile({ displayName: login });

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
            <View style={[authScreen.formContainer, { paddingTop: "92" }]}>
              <View style={authScreen.avatarContainer}>
                <View style={authScreen.avatar}>
                  <TouchableOpacity style={authScreen.addButton}>
                    <Text style={authScreen.addButtonText}>+</Text>
                  </TouchableOpacity>
                </View>
              </View>
              {/* Реєстрація */}
              <Text style={authScreen.title}>Реєстрація</Text>

              <View style={authScreen.inputContainer}>
                <TextInput
                  style={authScreen.input}
                  placeholder="Логін"
                  value={login}
                  onChangeText={(value) => setLogin(value)}
                />
              </View>
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
                onPress={handleRegister}
              >
                <Text style={authScreen.registerButtonText}>
                  Зареєструватися
                </Text>
              </TouchableOpacity>
              {/* Посилання */}
              <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                <Text style={authScreen.loginLink}>Вже є акаунт? Увійти</Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </ImageBackground>
  );
}
