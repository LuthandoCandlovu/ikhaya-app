import { Ionicons } from "@expo/vector-icons";
import { Stack, useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

export default function AuthLayout() {
  const router = useRouter();

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: "#4361ee",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
        headerLeft: () => (
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.backButton}
          >
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
        ),
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "Khaya Residence",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="login"
        options={{
          title: "Secure Login",
          headerRight: () => (
            <TouchableOpacity onPress={() => router.push("/(auth)/register")}>
              <Text style={styles.headerButton}>Sign Up</Text>
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="register"
        options={{
          title: "Create Account",
          headerRight: () => (
            <TouchableOpacity onPress={() => router.push("/(auth)/login")}>
              <Text style={styles.headerButton}>Login</Text>
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="profile"
        options={{
          title: "My Profile",
          headerShown: false,
        }}
      />
    </Stack>
  );
}

const styles = StyleSheet.create({
  backButton: {
    marginLeft: 15,
    padding: 5,
  },
  headerButton: {
    color: "#fff",
    fontWeight: "bold",
    marginRight: 15,
    fontSize: 16,
  },
});
