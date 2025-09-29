import { Ionicons } from "@expo/vector-icons";
import { Link, router } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const registeredUsers = [
  { email: "student@ufh.ac.za", password: "password123", name: "Student One" },
  { email: "luthando@khaya.com", password: "khaya123", name: "Luthando" },
];

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [secureEntry, setSecureEntry] = useState(true);

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert("Error", "Please enter both email and password");
      return;
    }

    if (!email.endsWith("@ufh.ac.za")) {
      Alert.alert(
        "Invalid Email",
        "Please use your University of Fort Hare email address (@ufh.ac.za)"
      );
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);

      const user = registeredUsers.find(
        (u) => u.email === email && u.password === password
      );

      if (user) {
        Alert.alert("Welcome Back!", `Successfully logged in as ${user.name}`);
        router.replace("/(tabs)");
      } else {
        Alert.alert(
          "Login Failed",
          "Invalid credentials. Please check your email and password or create an account.",
          [
            { text: "Try Again", style: "cancel" },
            {
              text: "Create Account",
              onPress: () => router.push("/(auth)/register"),
            },
          ]
        );
      }
    }, 2000);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.securityHeader}>
        <Ionicons name="shield-checkmark" size={40} color="#4361ee" />
        <Text style={styles.securityTitle}>Secure Login</Text>
        <Text style={styles.securitySubtitle}>
          POPIA Compliant Authentication
        </Text>
      </View>

      <View style={styles.formContainer}>
        <Text style={styles.formTitle}>Sign In to Your Account</Text>

        <View style={styles.inputContainer}>
          <Ionicons
            name="mail-outline"
            size={20}
            color="#4361ee"
            style={styles.inputIcon}
          />
          <TextInput
            style={styles.input}
            placeholder="University Email (@ufh.ac.za)"
            placeholderTextColor="#999"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoComplete="email"
          />
        </View>

        <View style={styles.inputContainer}>
          <Ionicons
            name="lock-closed-outline"
            size={20}
            color="#4361ee"
            style={styles.inputIcon}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#999"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={secureEntry}
            autoComplete="password"
          />
          <TouchableOpacity onPress={() => setSecureEntry(!secureEntry)}>
            <Ionicons
              name={secureEntry ? "eye-off-outline" : "eye-outline"}
              size={20}
              color="#999"
            />
          </TouchableOpacity>
        </View>

        <View style={styles.optionsContainer}>
          <TouchableOpacity style={styles.rememberMe}>
            <Ionicons name="checkbox-outline" size={20} color="#4361ee" />
            <Text style={styles.rememberText}>Remember this device</Text>
          </TouchableOpacity>

          <TouchableOpacity>
            <Text style={styles.forgotText}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={[styles.loginButton, isLoading && styles.loginButtonDisabled]}
          onPress={handleLogin}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <>
              <Ionicons name="lock-open" size={20} color="#fff" />
              <Text style={styles.loginButtonText}>Secure Login</Text>
            </>
          )}
        </TouchableOpacity>

        <View style={styles.signupContainer}>
          <Text style={styles.signupText}>Don't have an account? </Text>
          <Link href="/(auth)/register" asChild>
            <TouchableOpacity>
              <Text style={styles.signupLink}>Sign up here</Text>
            </TouchableOpacity>
          </Link>
        </View>
      </View>

      <View style={styles.securityFeatures}>
        <Text style={styles.featuresTitle}>🔒 Your Security Matters</Text>
        <View style={styles.featureItem}>
          <Ionicons name="shield-checkmark" size={16} color="#4361ee" />
          <Text style={styles.featureText}>End-to-end encryption</Text>
        </View>
        <View style={styles.featureItem}>
          <Ionicons name="time" size={16} color="#4361ee" />
          <Text style={styles.featureText}>Auto-logout after inactivity</Text>
        </View>
        <View style={styles.featureItem}>
          <Ionicons name="document-text" size={16} color="#4361ee" />
          <Text style={styles.featureText}>POPIA compliance guaranteed</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#f8f9fa",
    padding: 20,
  },
  securityHeader: {
    alignItems: "center",
    marginBottom: 30,
    marginTop: 20,
  },
  securityTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#3a0ca3",
    marginTop: 10,
  },
  securitySubtitle: {
    fontSize: 14,
    color: "#6c757d",
    marginTop: 5,
  },
  formContainer: {
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  formTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#3a0ca3",
    marginBottom: 20,
    textAlign: "center",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#dee2e6",
    borderRadius: 10,
    marginBottom: 15,
    paddingHorizontal: 15,
    height: 50,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#333",
  },
  optionsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  rememberMe: {
    flexDirection: "row",
    alignItems: "center",
  },
  rememberText: {
    fontSize: 14,
    color: "#6c757d",
    marginLeft: 8,
  },
  forgotText: {
    fontSize: 14,
    color: "#4361ee",
    fontWeight: "500",
  },
  loginButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#4361ee",
    borderRadius: 10,
    height: 50,
    marginBottom: 20,
  },
  loginButtonDisabled: {
    backgroundColor: "#8fa0e3",
  },
  loginButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 10,
  },
  signupContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  signupText: {
    color: "#6c757d",
    fontSize: 14,
  },
  signupLink: {
    color: "#4361ee",
    fontSize: 14,
    fontWeight: "bold",
  },
  securityFeatures: {
    backgroundColor: "#e9ecef",
    borderRadius: 15,
    padding: 20,
  },
  featuresTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#3a0ca3",
    marginBottom: 15,
    textAlign: "center",
  },
  featureItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  featureText: {
    marginLeft: 10,
    fontSize: 14,
    color: "#495057",
  },
});

export default LoginScreen;
