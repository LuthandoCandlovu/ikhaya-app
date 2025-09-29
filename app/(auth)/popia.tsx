import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const PopiaScreen = () => {
  const router = useRouter();

  const handleAccept = async () => {
    await AsyncStorage.setItem("popiaConsent", "true");
    router.replace("/login");
  };

  const handleReject = async () => {
    await AsyncStorage.setItem("popiaConsent", "false");
    alert("You must accept POPIA to use this app.");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>POPIA Consent</Text>
      <Text style={styles.text}>
        By continuing, you agree that your data will be processed under POPIA.
      </Text>

      <TouchableOpacity style={styles.acceptBtn} onPress={handleAccept}>
        <Text style={styles.btnText}>Accept</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.rejectBtn} onPress={handleReject}>
        <Text style={styles.btnText}>Reject</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PopiaScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 20 },
  text: { textAlign: "center", marginBottom: 20 },
  acceptBtn: {
    backgroundColor: "green",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  rejectBtn: { backgroundColor: "red", padding: 15, borderRadius: 10 },
  btnText: { color: "white", fontWeight: "bold" },
});
