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

const RegisterScreen = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    studentId: "",
    password: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleRegister = () => {
    const { firstName, lastName, email, studentId, password, confirmPassword } =
      formData;

    if (
      !firstName ||
      !lastName ||
      !email ||
      !studentId ||
      !password ||
      !confirmPassword
    ) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    if (!email.endsWith("@ufh.ac.za")) {
      Alert.alert(
        "Invalid Email",
        "Please use your University of Fort Hare email address (@ufh.ac.za)"
      );
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }

    if (password.length < 6) {
      Alert.alert("Error", "Password must be at least 6 characters long");
      return;
    }

    if (!acceptedTerms) {
      Alert.alert("Error", "You must accept the terms and conditions");
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      Alert.alert(
        "Success!",
        "Account created successfully. You can now login with your credentials.",
        [{ text: "Login Now", onPress: () => router.push("/(auth)/login") }]
      );
    }, 2000);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Ionicons name="person-add" size={40} color="#4361ee" />
        <Text style={styles.title}>Create Student Account</Text>
        <Text style={styles.subtitle}>Join Khaya Residence Portal</Text>
      </View>

      <View style={styles.formContainer}>
        <View style={styles.nameContainer}>
          <View style={[styles.inputContainer, { flex: 1, marginRight: 10 }]}>
            <TextInput
              style={styles.input}
              placeholder="First Name"
              value={formData.firstName}
              onChangeText={(text) => handleInputChange("firstName", text)}
            />
          </View>
          <View style={[styles.inputContainer, { flex: 1 }]}>
            <TextInput
              style={styles.input}
              placeholder="Last Name"
              value={formData.lastName}
              onChangeText={(text) => handleInputChange("lastName", text)}
            />
          </View>
        </View>

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
            value={formData.email}
            onChangeText={(text) => handleInputChange("email", text)}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <View style={styles.inputContainer}>
          <Ionicons
            name="id-card"
            size={20}
            color="#4361ee"
            style={styles.inputIcon}
          />
          <TextInput
            style={styles.input}
            placeholder="Student ID Number"
            value={formData.studentId}
            onChangeText={(text) => handleInputChange("studentId", text)}
            keyboardType="numeric"
          />
        </View>

        <View style={styles.inputContainer}>
          <Ionicons
            name="lock-closed"
            size={20}
            color="#4361ee"
            style={styles.inputIcon}
          />
          <TextInput
            style={styles.input}
            placeholder="Password (min. 6 characters)"
            value={formData.password}
            onChangeText={(text) => handleInputChange("password", text)}
            secureTextEntry
          />
        </View>

        <View style={styles.inputContainer}>
          <Ionicons
            name="lock-closed"
            size={20}
            color="#4361ee"
            style={styles.inputIcon}
          />
          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChangeText={(text) => handleInputChange("confirmPassword", text)}
            secureTextEntry
          />
        </View>

        <TouchableOpacity
          style={styles.termsContainer}
          onPress={() => setAcceptedTerms(!acceptedTerms)}
        >
          <Ionicons
            name={acceptedTerms ? "checkbox" : "square-outline"}
            size={20}
            color="#4361ee"
          />
          <Text style={styles.termsText}>
            I accept the Terms & Conditions and Privacy Policy (POPIA Compliant)
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.registerButton,
            isLoading && styles.registerButtonDisabled,
          ]}
          onPress={handleRegister}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <>
              <Ionicons name="person-add" size={20} color="#fff" />
              <Text style={styles.registerButtonText}>
                Create Secure Account
              </Text>
            </>
          )}
        </TouchableOpacity>

        <View style={styles.loginContainer}>
          <Text style={styles.loginText}>Already have an account? </Text>
          <Link href="/(auth)/login" asChild>
            <TouchableOpacity>
              <Text style={styles.loginLink}>Sign in here</Text>
            </TouchableOpacity>
          </Link>
        </View>
      </View>

      <View style={styles.securityAssurance}>
        <Ionicons name="shield-checkmark" size={24} color="#4361ee" />
        <Text style={styles.assuranceText}>
          Your data is protected under POPIA Act 4 of 2013. We never share your
          personal information.
        </Text>
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
  header: {
    alignItems: "center",
    marginBottom: 30,
    marginTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#3a0ca3",
    marginTop: 10,
  },
  subtitle: {
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
  nameContainer: {
    flexDirection: "row",
    marginBottom: 15,
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
  termsContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  termsText: {
    flex: 1,
    marginLeft: 10,
    fontSize: 12,
    color: "#6c757d",
  },
  registerButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#4361ee",
    borderRadius: 10,
    height: 50,
    marginBottom: 20,
  },
  registerButtonDisabled: {
    backgroundColor: "#8fa0e3",
  },
  registerButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 10,
  },
  loginContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  loginText: {
    color: "#6c757d",
    fontSize: 14,
  },
  loginLink: {
    color: "#4361ee",
    fontSize: 14,
    fontWeight: "bold",
  },
  securityAssurance: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#e9ecef",
    padding: 15,
    borderRadius: 10,
  },
  assuranceText: {
    flex: 1,
    marginLeft: 10,
    fontSize: 12,
    color: "#495057",
  },
});

export default RegisterScreen;
