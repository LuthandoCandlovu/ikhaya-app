import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import React from "react";
import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const AuthIndex = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header with Building Background */}
      <ImageBackground
        source={{
          uri: "https://images.unsplash.com/photo-1560448204-603b3fc33ddc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
        }}
        style={styles.header}
        resizeMode="cover"
      >
        <View style={styles.overlay}>
          {/* Updated UFH Logo from search results */}
          <Image
            source={{
              uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/Ufh_logo.jpg/179px-Ufh_logo.jpg",
            }}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.title}>Ikhaya Student Residence</Text>
          <Text style={styles.subtitle}>
            Your Home Away From Home at University of Fort Hare
          </Text>
        </View>
      </ImageBackground>

      <View style={styles.securitySection}>
        <Text style={styles.securityTitle}>🔒 POPIA Compliant Security</Text>
        <View style={styles.securityFeatures}>
          <View style={styles.securityItem}>
            <Ionicons name="shield-checkmark" size={20} color="#4361ee" />
            <Text style={styles.securityText}>Data Encryption</Text>
          </View>
          <View style={styles.securityItem}>
            <Ionicons name="lock-closed" size={20} color="#4361ee" />
            <Text style={styles.securityText}>Secure Login</Text>
          </View>
          <View style={styles.securityItem}>
            <Ionicons name="eye-off" size={20} color="#4361ee" />
            <Text style={styles.securityText}>Privacy Protected</Text>
          </View>
        </View>
      </View>

      <View style={styles.authOptions}>
        <Link href="/(auth)/login" asChild>
          <TouchableOpacity style={[styles.authButton, styles.loginButton]}>
            <Ionicons name="log-in" size={20} color="#fff" />
            <Text style={styles.authButtonText}>Sign In to My Ikhaya</Text>
          </TouchableOpacity>
        </Link>

        <Link href="/(auth)/register" asChild>
          <TouchableOpacity style={[styles.authButton, styles.registerButton]}>
            <Ionicons name="person-add" size={20} color="#4361ee" />
            <Text style={[styles.authButtonText, styles.registerButtonText]}>
              Create Student Account
            </Text>
          </TouchableOpacity>
        </Link>
      </View>

      <View style={styles.featuresSection}>
        <Text style={styles.featuresTitle}>Why Choose Ikhaya?</Text>
        <View style={styles.featuresGrid}>
          <View style={styles.featureCard}>
            <Ionicons name="wifi" size={32} color="#4361ee" />
            <Text style={styles.featureTitle}>High-Speed WiFi</Text>
            <Text style={styles.featureDescription}>
              Study and stream with our premium internet connection
            </Text>
          </View>
          <View style={styles.featureCard}>
            <Ionicons name="shield" size={32} color="#4361ee" />
            <Text style={styles.featureTitle}>24/7 Security</Text>
            <Text style={styles.featureDescription}>
              Safe and secure living environment with CCTV monitoring
            </Text>
          </View>
          <View style={styles.featureCard}>
            <Ionicons name="people" size={32} color="#4361ee" />
            <Text style={styles.featureTitle}>Community</Text>
            <Text style={styles.featureDescription}>
              Join a vibrant community of UFH students
            </Text>
          </View>
          <View style={styles.featureCard}>
            <Ionicons name="library" size={32} color="#4361ee" />
            <Text style={styles.featureTitle}>Study Spaces</Text>
            <Text style={styles.featureDescription}>
              Access to dedicated study areas and resources
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.popiaNotice}>
        <Ionicons name="information-circle" size={20} color="#4361ee" />
        <Text style={styles.popiaText}>
          We comply with POPIA Act 4 of 2013. Your personal information is
          protected and secure.
        </Text>
      </View>

      <View style={styles.stats}>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>500+</Text>
          <Text style={styles.statLabel}>Happy Residents</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>24/7</Text>
          <Text style={styles.statLabel}>Support</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>100%</Text>
          <Text style={styles.statLabel}>POPIA Compliant</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#f8f9fa",
  },
  header: {
    height: 300,
    justifyContent: "center",
    alignItems: "center",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 20,
    borderRadius: 15,
    alignItems: "center",
    width: "90%",
  },
  logo: {
    width: 100, // Adjusted for better proportions
    height: 100, // Adjusted for better proportions
    marginBottom: 15,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#e0e0e0",
    textAlign: "center",
  },
  securitySection: {
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 20,
    margin: 20,
    marginTop: -40,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
    zIndex: 1,
  },
  securityTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#3a0ca3",
    marginBottom: 15,
    textAlign: "center",
  },
  securityFeatures: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  securityItem: {
    alignItems: "center",
  },
  securityText: {
    fontSize: 12,
    color: "#333",
    marginTop: 5,
    textAlign: "center",
  },
  authOptions: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  authButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 18,
    borderRadius: 12,
    marginBottom: 15,
  },
  loginButton: {
    backgroundColor: "#4361ee",
  },
  registerButton: {
    backgroundColor: "#fff",
    borderWidth: 2,
    borderColor: "#4361ee",
  },
  authButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 10,
  },
  registerButtonText: {
    color: "#4361ee",
  },
  featuresSection: {
    padding: 20,
  },
  featuresTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#3a0ca3",
    textAlign: "center",
    marginBottom: 20,
  },
  featuresGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  featureCard: {
    width: "48%",
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  featureTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#3a0ca3",
    marginTop: 10,
    textAlign: "center",
  },
  featureDescription: {
    fontSize: 12,
    color: "#666",
    textAlign: "center",
    marginTop: 5,
  },
  popiaNotice: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#e9ecef",
    padding: 15,
    borderRadius: 10,
    margin: 20,
    marginTop: 10,
  },
  popiaText: {
    flex: 1,
    marginLeft: 10,
    fontSize: 12,
    color: "#495057",
  },
  stats: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 20,
    margin: 20,
    marginTop: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statItem: {
    alignItems: "center",
  },
  statNumber: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#3a0ca3",
  },
  statLabel: {
    fontSize: 10,
    color: "#6c757d",
    textAlign: "center",
    marginTop: 2,
  },
});

export default AuthIndex;
